import { ChevronRight, FileCode, X } from "lucide-react";
import { Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { findProject } from "@/content/projects";
import { projectFile, useHomeView } from "@/lib/views";
import { setWorkbench, useWorkbench } from "@/lib/workbench";

/**
 * Faixa de tabs do editor (doc 04 §6.15, Release 0.7): multi-tab **real**. A
 * aba ativa deriva da URL (SEO/voltar intactos, ADR-0004/0011); o *conjunto*
 * de abas abertas é estado de cliente persistido (ADR-0012). `overview.tsx` é
 * fixa. Abrir um arquivo cria a tab; fechar remove e navega ao vizinho. O
 * breadcrumb é chrome (aria-hidden). Nomes derivam de rotas/slugs — nunca
 * conteúdo inventado.
 */

const OVERVIEW = "/";

interface FileMeta {
  name: string;
  crumb: string[];
}

/** Chave de aba a partir da localização (home usa hash; rotas usam pathname). */
function keyFromLocation(pathname: string, view: string): string {
  if (pathname === "/") return view === "overview" ? OVERVIEW : `/#${view}`;
  return pathname;
}

/** Nome de arquivo e trilha para uma chave de aba. */
function describe(key: string): FileMeta {
  if (key === OVERVIEW) {
    return { name: "overview.tsx", crumb: ["portfolio", "src", "overview.tsx"] };
  }
  if (key.startsWith("/#")) {
    const file = `${key.slice(2)}.tsx`;
    return { name: file, crumb: ["portfolio", "src", file] };
  }
  if (key === "/projetos") {
    return { name: "projetos", crumb: ["portfolio", "src", "projetos"] };
  }
  const match = key.match(/^\/projetos\/(.+)$/);
  if (match) {
    const project = findProject(match[1]);
    if (project) {
      const file = projectFile(project);
      return { name: file, crumb: ["portfolio", "src", "projetos", file] };
    }
  }
  return { name: "404.html", crumb: ["portfolio", "404.html"] };
}

const tabBase =
  "group relative flex shrink-0 items-center gap-2 border-r border-border border-t-2 pl-3 pr-1.5 py-1.5 font-mono text-label font-normal normal-case tracking-normal transition-colors duration-150";

export function EditorTabs() {
  const { pathname } = useLocation();
  const view = useHomeView();
  const navigate = useNavigate();
  const { openTabs } = useWorkbench();

  const currentKey = keyFromLocation(pathname, view);

  // Abrir um arquivo cria sua aba (pós-hidratação; overview é implícita).
  useEffect(() => {
    if (currentKey === OVERVIEW) return;
    if (!openTabs.includes(currentKey)) {
      setWorkbench({ openTabs: [...openTabs, currentKey] });
    }
  }, [currentKey, openTabs]);

  // Ordem exibida: overview fixa + abas abertas + a atual (caso ainda não
  // persistida — mantém render idêntico ao SSR antes da hidratação).
  const keys = [OVERVIEW, ...openTabs.filter((key) => key !== OVERVIEW)];
  if (currentKey !== OVERVIEW && !keys.includes(currentKey)) keys.push(currentKey);

  const closeTab = (key: string) => {
    const index = keys.indexOf(key);
    const next = openTabs.filter((item) => item !== key);
    setWorkbench({ openTabs: next });
    if (key === currentKey) navigate(keys[index - 1] ?? OVERVIEW);
  };

  const current = describe(currentKey);

  return (
    <div className="shrink-0 border-b border-border bg-surface">
      <nav
        aria-label="Arquivos abertos"
        className="scrollbar-ide flex overflow-x-auto"
      >
        {keys.map((key) => {
          const active = key === currentKey;
          const { name } = describe(key);
          const closable = key !== OVERVIEW;
          return (
            <span
              key={key}
              className={`${tabBase} ${
                active
                  ? "border-t-accent bg-bg text-text"
                  : "border-t-transparent text-text-3 hover:bg-surface-2/60 hover:text-text-2"
              }`}
            >
              <Link
                to={key}
                aria-current={active ? "page" : undefined}
                className="flex items-center gap-1.5"
              >
                {active ? (
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-accent"
                  />
                ) : (
                  <FileCode size={13} strokeWidth={1.5} aria-hidden="true" />
                )}
                {name}
              </Link>
              {closable ? (
                <button
                  type="button"
                  onClick={() => closeTab(key)}
                  aria-label={`Fechar ${name}`}
                  className="flex size-5 items-center justify-center rounded-sm text-text-3 opacity-60 transition-colors duration-150 hover:bg-surface-2 hover:text-text hover:opacity-100 group-hover:opacity-100"
                >
                  <X size={12} strokeWidth={1.5} aria-hidden="true" />
                </button>
              ) : (
                <span aria-hidden="true" className="w-1" />
              )}
            </span>
          );
        })}
      </nav>

      <div
        aria-hidden="true"
        className="flex flex-wrap items-center gap-1.5 border-t border-border px-4 py-1.5 font-mono text-label font-normal normal-case tracking-normal text-text-3"
      >
        {current.crumb.map((segment, index) => (
          <Fragment key={`${segment}-${index}`}>
            {index > 0 && <ChevronRight size={12} strokeWidth={1.5} />}
            <span className={index === current.crumb.length - 1 ? "text-text-2" : ""}>
              {segment}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
