import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { byOrder, findProject } from "@/content/projects";
import { site } from "@/content/site";
import { timeline } from "@/content/timeline";
import {
  applyChmod,
  evaluateMission,
  MISSION,
  octal,
  permissionString,
} from "@/lib/mission";
import { onTerminalCommand } from "@/lib/terminal-bus";
import { HOME_VIEWS, projectFile } from "@/lib/views";
import { setWorkbench, THEMES, useWorkbench } from "@/lib/workbench";

/**
 * Terminal do painel inferior (doc 04 §6.24; interativo na Release 0.10): um
 * shell de verdade para o portfólio — `ls`, `cat`, `open`, `theme`,
 * `git log` — e a mini-missão do Linux Lab (`lab`), com histórico (↑ ↓),
 * Tab para completar e Ctrl+L para limpar. Tudo que ele mostra vem do
 * conteúdo tipado (ADR-0003); nenhum dado novo nasce aqui.
 */

interface Line {
  id: number;
  node: ReactNode;
}

const G = ({ children }: { children: ReactNode }) => (
  <span className="text-term-green">{children}</span>
);
const B = ({ children }: { children: ReactNode }) => (
  <span className="text-term-blue">{children}</span>
);
const Y = ({ children }: { children: ReactNode }) => (
  <span className="text-term-yellow">{children}</span>
);
const R = ({ children }: { children: ReactNode }) => (
  <span className="text-term-red">{children}</span>
);
const Dim = ({ children }: { children: ReactNode }) => (
  <span className="text-text-3">{children}</span>
);

const COMMANDS = [
  "help",
  "ls",
  "cat",
  "open",
  "cd",
  "theme",
  "lab",
  "git log",
  "whoami",
  "contato",
  "history",
  "clear",
  "echo",
  "date",
];
const LAB_COMMANDS = ["ls", "chmod", "stat", "cat", "validar", "exit", "help", "whoami"];
const VIEW_IDS = HOME_VIEWS.map((v) => v.id);

const HELP: [string, string][] = [
  ["ls [projetos|src]", "lista arquivos"],
  ["cat <projeto>", "resumo de um projeto"],
  ["open <projeto|seção>", "abre no editor"],
  ["cd <pasta>", "entra numa pasta"],
  ["theme [nome]", "lista ou troca o tema de cores"],
  ["lab", "joga uma missão do Linux Lab"],
  ["git log", "a trajetória, em commits"],
  ["whoami · contato · history · clear", ""],
];

function MissionTree({ mode }: { mode: number }) {
  const result = evaluateMission(mode);
  const status = (s: string) => (s === "passed" ? <G>passed</G> : <R>failed</R>);
  return (
    <>
      <Dim>labctl probe coletou os fatos; a API avaliou as condições da missão.</Dim>
      {"\n"}
      {status(result.status)} all
      {result.checks.map((check, i) => (
        <span key={check.id}>
          {"\n"}
          {i === result.checks.length - 1 ? "└─ " : "├─ "}
          {status(check.status)} {check.id.padEnd(7)} <Dim>{check.type}</Dim>{" "}
          {check.detail}
        </span>
      ))}
    </>
  );
}

export function Terminal() {
  const navigate = useNavigate();
  const { theme } = useWorkbench();
  const [lines, setLines] = useState<Line[]>(() => [
    {
      id: 0,
      node: (
        <>
          Digite <span className="font-semibold">help</span> para ver os comandos.{" "}
          <Dim>Tab completa; ↑ e ↓ percorrem o histórico.</Dim>
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [lab, setLab] = useState<{ mode: number; done: boolean } | null>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // O handler do bus precisa do `run` mais recente (estado de lab/cwd atual).
  const runRef = useRef<(raw: string) => void>(() => {});

  const prompt = (
    <>
      <span className="font-semibold text-term-green">
        {lab ? "student@lab" : "francisco@portfolio"}
      </span>
      :<span className="font-semibold text-term-blue">{lab ? "~" : cwd}</span>$
    </>
  );

  const print = (...nodes: ReactNode[]) =>
    setLines((prev) => [
      ...prev,
      ...nodes.map((node) => ({ id: nextId.current++, node })),
    ]);

  const runLab = (name: string, args: string[]) => {
    if (!lab) return;
    const isFile = (s = "") =>
      ["deploy.sh", "./deploy.sh", "~/deploy.sh", MISSION.path].includes(s);
    switch (name) {
      case "":
        return;
      case "ls":
        print(
          args.some((a) => a.startsWith("-") && a.includes("l")) ? (
            <>
              total 4{"\n"}
              {permissionString(lab.mode)} 1 student student 142 out 18 10:12{" "}
              <G>deploy.sh</G>
            </>
          ) : (
            <G>deploy.sh</G>
          )
        );
        return;
      case "chmod": {
        const [spec, file] = args;
        if (!spec || !file) return print("chmod: falta operando");
        if (!isFile(file))
          return print(
            `chmod: não foi possível acessar '${file}': Arquivo ou diretório inexistente`
          );
        const mode = applyChmod(lab.mode, spec);
        if (mode === null) return print(`chmod: modo inválido: '${spec}'`);
        setLab({ ...lab, mode });
        return;
      }
      case "stat":
        return print(
          isFile(args[args.length - 1])
            ? `  Arquivo: deploy.sh\n   Acesso: (${octal(lab.mode)}/${permissionString(lab.mode)})  Uid: ( 1000/ student)`
            : `stat: não foi possível acessar '${args.join(" ")}'`
        );
      case "cat":
        return print(
          isFile(args[0])
            ? '#!/bin/bash\n# publica a aplicação\necho "deploying..."'
            : `cat: ${args.join(" ")}: Arquivo ou diretório inexistente`
        );
      case "whoami":
        return print("student");
      case "help":
        return print(
          "ls -l, chmod <modo> deploy.sh, stat deploy.sh, cat deploy.sh, validar, exit"
        );
      case "validar": {
        const passed = evaluateMission(lab.mode).status === "passed";
        print(<MissionTree mode={lab.mode} />);
        if (passed) {
          print(
            lab.done ? (
              "Missão já concluída. A conclusão continua valendo."
            ) : (
              <>
                <span className="font-semibold text-term-green">Missão concluída.</span>{" "}
                Primeira validação aprovada registrada. Digite exit para sair do lab.
              </>
            )
          );
          setLab({ ...lab, done: true });
        } else {
          print(<Dim>Dica: o dono precisa de rwx; grupo e outros, de nada.</Dim>);
        }
        return;
      }
      case "exit":
        print("Lab encerrado. Contêiner removido.");
        setLab(null);
        return;
      case "sudo":
        return print("student não está no arquivo sudoers.");
      default:
        return print(`bash: ${name}: comando não encontrado`);
    }
  };

  const run = (raw: string) => {
    const command = raw.trim();
    print(
      <>
        {prompt} {raw}
      </>
    );
    if (command) history.current = [...history.current, command].slice(-50);
    cursor.current = -1;
    const [name = "", ...args] = command.split(/\s+/);
    const arg = args.join(" ");
    if (lab) return runLab(name, args);

    switch (name) {
      case "":
        return;
      case "help":
        return print(
          <>
            Comandos:
            {HELP.map(([cmd, what]) => (
              <span key={cmd}>
                {"\n  "}
                <span className="font-semibold">{cmd.padEnd(26)}</span>
                {what}
              </span>
            ))}
          </>
        );
      case "ls": {
        const target = (arg || (cwd === "~" ? "" : cwd.slice(2))).replace(/\/$/, "");
        if (target === "projetos")
          return print(
            <>
              {byOrder.map((p) => (
                <span key={p.slug}>
                  <Link
                    to={`/projetos/${p.slug}`}
                    className="text-link underline underline-offset-2"
                  >
                    {projectFile(p)}
                  </Link>
                  {"  "}
                </span>
              ))}
            </>
          );
        if (target === "src")
          return print(
            <>
              {HOME_VIEWS.map((v) => (
                <span key={v.id}>
                  <Link
                    to={v.id === "overview" ? "/" : `/#${v.id}`}
                    className="text-link underline underline-offset-2"
                  >
                    {v.file}
                  </Link>
                  {"  "}
                </span>
              ))}
            </>
          );
        if (!target)
          return print(
            <>
              <B>projetos</B>
              {"  "}
              <B>src</B>
              {"  "}README.md
            </>
          );
        return print(
          `ls: não foi possível acessar '${target}': Arquivo ou diretório inexistente`
        );
      }
      case "cd":
        if (!arg || arg === "~" || arg === "..") return setCwd("~");
        if (["projetos", "src"].includes(arg.replace(/\/$/, "")))
          return setCwd(`~/${arg.replace(/\/$/, "")}`);
        return print(`bash: cd: ${arg}: Arquivo ou diretório inexistente`);
      case "cat": {
        const project = findProject(
          arg.replace(/^projetos\//, "").replace(/\.(tsx|py|java|js)$/, "")
        );
        if (!project)
          return print(
            arg
              ? `cat: ${arg}: Arquivo ou diretório inexistente`
              : "cat: informe um projeto, por exemplo: cat linux-lab"
          );
        return print(
          <>
            <span className="font-semibold">{project.name}</span>{" "}
            <Dim>({project.badge})</Dim>
            {"\n"}
            {project.summary}
            {"\n\n"}
            <Y>linguagens</Y>
            {"  "}
            {project.languages.map((l) => `${l.name} ${l.percent}%`).join(", ")}
            {"\n"}
            <Y>stack</Y>
            {"       "}
            {project.tags.join(", ")}
            {project.links.github.map((repo) => (
              <span key={repo.url}>
                {"\n"}
                <Y>repo</Y>
                {"        "}
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link underline underline-offset-2"
                >
                  {repo.url.replace("https://", "")}
                </a>
              </span>
            ))}
            {"\n\n"}
            <Dim>Estudo de caso completo:</Dim>{" "}
            <Link
              to={`/projetos/${project.slug}`}
              className="text-link underline underline-offset-2"
            >
              open {project.slug}
            </Link>
          </>
        );
      }
      case "open": {
        const target = arg.replace(/\.(tsx|py|java|js)$/, "");
        if (findProject(target)) {
          print(`Abrindo ${projectFile(findProject(target)!)}`);
          return navigate(`/projetos/${target}`);
        }
        if (target === "projetos") return navigate("/projetos");
        if (VIEW_IDS.includes(target))
          return navigate(target === "overview" ? "/" : `/#${target}`);
        return print(`open: '${arg}' não existe. Tente: open linux-lab`);
      }
      case "theme": {
        if (!arg)
          return print(
            <>
              {THEMES.map((t) => (
                <span key={t.id}>
                  {t.id === theme ? "* " : "  "}
                  {t.id.padEnd(12)}
                  <Dim>
                    {t.label}, {t.note}
                  </Dim>
                  {"\n"}
                </span>
              ))}
              <Dim>uso: theme dracula</Dim>
            </>
          );
        const next = THEMES.find(
          (t) => t.id === arg.toLowerCase() || t.label.toLowerCase() === arg.toLowerCase()
        );
        if (!next)
          return print(`theme: '${arg}' não existe. Rode theme para ver a lista.`);
        setWorkbench({ theme: next.id });
        return print(`Tema de cores: ${next.label}`);
      }
      case "lab":
        setLab({ mode: MISSION.initialMode, done: false });
        return print(
          <>
            <Dim>
              Criando o lab (no Linux Lab real: contêiner sob gVisor, sem rede, raiz
              somente leitura)...
            </Dim>
            {"\n"}Lab pronto.{"\n\n"}
            <span className="font-semibold text-term-yellow">Missão:</span> o script
            deploy.sh está legível por qualquer usuário do sistema.{"\n"}Deixe que só o
            dono possa ler, escrever e executar o arquivo.{"\n\n"}
            <Dim>Comandos: ls -l, chmod, stat, cat, validar, exit</Dim>
          </>
        );
      case "git":
        if (args[0] !== "log") return print('git: só "git log" funciona aqui.');
        return print(
          <>
            {[...timeline].reverse().map((entry, i) => (
              <span key={entry.title}>
                {i > 0 && "\n"}
                <Y>* {entry.date.padEnd(8)}</Y>
                {i === 0 && <B> (HEAD -&gt; main)</B>} {entry.title}
              </span>
            ))}
          </>
        );
      case "whoami":
        return print("francisco");
      case "contato":
        return print(
          <>
            {site.social.map((s, i) => (
              <span key={s.url}>
                {i > 0 && "\n"}
                {s.label.padEnd(10)}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link underline underline-offset-2"
                >
                  {s.url.replace("https://", "").replace("www.", "")}
                </a>
              </span>
            ))}
          </>
        );
      case "history":
        return print(
          history.current.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`).join("\n")
        );
      case "clear":
        return setLines([]);
      case "echo":
        return print(arg);
      case "date":
        return print(
          new Date().toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "short" })
        );
      case "sudo":
        return print("francisco não está no arquivo sudoers.");
      default:
        return print(`${name}: comando não encontrado`);
    }
  };
  // Sempre o `run` da última renderização; declarado antes do registro no
  // bus para que a fila (comandos pedidos antes do painel montar) já o use.
  useEffect(() => {
    runRef.current = run;
  });
  useEffect(() => onTerminalCommand((command) => runRef.current(command)), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const complete = () => {
    const parts = input.split(" ");
    const last = parts[parts.length - 1];
    let pool: string[] = [];
    if (parts.length === 1) pool = lab ? LAB_COMMANDS : COMMANDS;
    else if (lab) pool = [MISSION.file];
    else if (parts[0] === "cat") pool = byOrder.map((p) => p.slug);
    else if (parts[0] === "open")
      pool = [...byOrder.map((p) => p.slug), "projetos", ...VIEW_IDS];
    else if (parts[0] === "theme") pool = THEMES.map((t) => t.id);
    else if (parts[0] === "cd") pool = ["projetos", "src", ".."];
    const matches = pool.filter((c) => c.startsWith(last));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      setInput(
        parts.join(" ") + (parts.length === 1 && matches[0] !== "git log" ? " " : "")
      );
    } else if (matches.length > 1) {
      print(
        <>
          {prompt} {input}
        </>,
        matches.join("   ")
      );
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const items = history.current;
    if (event.key === "Enter") {
      run(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!items.length) return;
      cursor.current =
        cursor.current < 0 ? items.length - 1 : Math.max(0, cursor.current - 1);
      setInput(items[cursor.current]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor.current < 0) return;
      cursor.current += 1;
      if (cursor.current >= items.length) {
        cursor.current = -1;
        setInput("");
      } else setInput(items[cursor.current]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      complete();
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    // Clicar na área do terminal devolve o foco ao prompt, como num terminal
    // real; o teclado já está no input, então não há ação de teclado a espelhar.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={scrollRef}
      onClick={(e) => {
        if (
          !(e.target as HTMLElement).closest("a") &&
          !window.getSelection()?.toString()
        ) {
          inputRef.current?.focus({ preventScroll: true });
        }
      }}
      className="scrollbar-ide h-full overflow-y-auto px-5 py-1 font-mono text-small leading-[1.55] text-text"
    >
      <div role="log" aria-label="Saída do terminal" aria-live="polite">
        {lines.map((line) => (
          <div key={line.id} className="min-h-[1.55em] whitespace-pre-wrap break-words">
            {line.node}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-baseline">
        <span className="whitespace-pre">{prompt} </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Comando do terminal"
          autoComplete="off"
          spellCheck={false}
          className="min-w-[8rem] flex-1 bg-transparent font-mono text-small text-text caret-text outline-none focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
