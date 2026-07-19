import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { type PanelTab, setWorkbench, useWorkbench } from "@/lib/workbench";

/** Preferência de movimento reduzido sem depender de framer (fora da entrada). */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Painel inferior (doc 04 §6.24): abas ao estilo VS Code. Conteúdo honesto e
 * baseado no projeto real — o Terminal é um **transcript roteirizado** dos
 * comandos reais (playback), Problems reflete o gate, etc. Chunk `lazy`.
 */

const TABS: { id: PanelTab; label: string }[] = [
  { id: "problems", label: "Problems" },
  { id: "output", label: "Output" },
  { id: "terminal", label: "Terminal" },
  { id: "debug", label: "Debug Console" },
  { id: "ports", label: "Ports" },
];

/** Transcript real: comandos do projeto e saídas representativas. */
const TERMINAL: string[] = [
  "$ npm install",
  "  added 312 packages in 6s",
  "$ npm run test",
  "  ✓ src/ — suíte verde (contratos de SEO, axe, pre-render)",
  "$ npm run build",
  "  vite v8.1.4 building for production…",
  "  ✓ 52 modules transformed",
  "  gen-git-log: commits reais → src/content/generated/git-log.ts",
  "  pre-render: 8 páginas + sitemap.xml + robots.txt",
  "$ git status",
  "  On branch main — working tree clean",
];

const OUTPUT: string[] = [
  "[vite] pré-render (ADR-0010): react-dom/server sobre o entry SSR",
  "[seo] head por rota: canonical + OpenGraph + JSON-LD",
  "[budgets] JS inicial dentro do limite (doc 06 §7)",
  "[deploy] Vercel — build fixado no vercel.json",
];

const PROBLEMS: string[] = [
  "ESLint — 0 problemas",
  "tsc --noEmit — 0 erros",
  "Vitest — suíte verde",
  "Build — 8 páginas pré-renderizadas",
];

const PORTS: { port: string; label: string }[] = [
  { port: "5173", label: "vite (dev server)" },
  { port: "4173", label: "vite preview" },
];

function Terminal() {
  const reduced = prefersReducedMotion();
  // Playback em duas velocidades: comandos `$` são DIGITADOS caractere a
  // caractere (é alguém teclando); saídas caem em ritmo de output. One-shot
  // por montagem; com motion reduzido o transcript aparece inteiro.
  const [progress, setProgress] = useState(() => ({
    line: reduced ? TERMINAL.length : 0,
    char: 0,
  }));

  useEffect(() => {
    if (reduced || progress.line >= TERMINAL.length) return;
    const current = TERMINAL[progress.line];
    const typing = current.startsWith("$") && progress.char < current.length;
    const id = setTimeout(
      () =>
        setProgress((p) =>
          typing
            ? { line: p.line, char: p.char + 1 }
            : { line: p.line + 1, char: 0 }
        ),
      // 18ms/tecla; Enter "executa" após 240ms; output flui a 90ms/linha.
      typing ? 18 : current.startsWith("$") ? 240 : 90
    );
    return () => clearTimeout(id);
  }, [progress, reduced]);

  const done = progress.line >= TERMINAL.length;
  const current = done ? undefined : TERMINAL[progress.line];
  const typingLine =
    current?.startsWith("$") && progress.char <= current.length
      ? current.slice(0, progress.char)
      : undefined;

  return (
    <pre className="whitespace-pre-wrap px-4 py-2 text-small leading-relaxed">
      {TERMINAL.slice(0, progress.line).map((line, i) => (
        <span
          key={i}
          className={line.startsWith("$") ? "block text-text" : "block text-text-3"}
        >
          {line}
        </span>
      ))}
      {typingLine !== undefined && (
        <span className="block text-text">
          {typingLine}
          <span aria-hidden="true">▋</span>
        </span>
      )}
      {done && (
        <span className="text-text">
          $ <span className="motion-safe:animate-[blink_1s_step-end_infinite]">▋</span>
        </span>
      )}
    </pre>
  );
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul className="px-4 py-2 text-small text-text-3">
      {lines.map((line, i) => (
        <li key={i} className="py-0.5">
          {line}
        </li>
      ))}
    </ul>
  );
}

function ProblemsView() {
  return (
    <div className="px-4 py-2 text-small">
      <p className="mb-1.5 text-text-2">
        <span className="text-success">0 errors</span> ·{" "}
        <span className="text-text-2">0 warnings</span>
      </p>
      <Lines lines={PROBLEMS} />
    </div>
  );
}

function Ports() {
  return (
    <table className="w-full text-small">
      <thead>
        <tr className="text-left text-label text-text-3">
          <th className="px-4 py-1 font-normal">Port</th>
          <th className="px-4 py-1 font-normal">Process</th>
        </tr>
      </thead>
      <tbody className="text-text-2">
        {PORTS.map((row) => (
          <tr key={row.port}>
            <td className="px-4 py-0.5 text-accent">{row.port}</td>
            <td className="px-4 py-0.5">{row.label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function BottomPanel() {
  const { panelTab } = useWorkbench();

  const body =
    panelTab === "terminal" ? (
      <Terminal />
    ) : panelTab === "output" ? (
      <Lines lines={OUTPUT} />
    ) : panelTab === "ports" ? (
      <Ports />
    ) : panelTab === "debug" ? (
      <Lines lines={["Nenhuma sessão de debug ativa."]} />
    ) : (
      <ProblemsView />
    );

  return (
    <section
      aria-label="Painel inferior"
      className="flex h-52 shrink-0 flex-col border-t border-border bg-surface md:h-60"
    >
      <div className="flex shrink-0 items-center border-b border-border pr-1">
        <div role="tablist" aria-label="Painéis" className="flex overflow-x-auto">
          {TABS.map((tab) => {
            const on = tab.id === panelTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setWorkbench({ panelTab: tab.id })}
                className={`border-b-2 px-3 py-1.5 font-mono text-label font-normal normal-case tracking-normal transition-colors duration-150 ${
                  on
                    ? "border-accent text-text"
                    : "border-transparent text-text-3 hover:text-text-2"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setWorkbench({ panelOpen: false })}
          aria-label="Fechar painel inferior"
          className="ml-auto flex size-6 items-center justify-center rounded-sm text-text-3 transition-colors duration-150 hover:bg-surface-2 hover:text-text"
        >
          <X size={13} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="scrollbar-ide min-h-0 flex-1 overflow-y-auto font-mono">{body}</div>
    </section>
  );
}
