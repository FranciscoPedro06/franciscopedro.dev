import { ChevronRight, X } from "lucide-react";
import { Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileGlyph } from "@/components/ui/FileGlyph";
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
    return { name: "overview.tsx", crumb: ["franciscopedro.dev", "src", "overview.tsx"] };
  }
  if (key.startsWith("/#")) {
    const file = `${key.slice(2)}.tsx`;
    return { name: file, crumb: ["franciscopedro.dev", "src", file] };
  }
  if (key === "/projetos") {
    return { name: "projetos", crumb: ["franciscopedro.dev", "src", "projetos"] };
  }
  const match = key.match(/^\/projetos\/(.+)$/);
  if (match) {
    const project = findProject(match[1]);
    if (project) {
      const file = projectFile(project);
      return { name: file, crumb: ["franciscopedro.dev", "src", "projetos", file] };
    }
  }
  return { name: "404.html", crumb: ["franciscopedro.dev", "404.html"] };
}

const tabBase =
  "group relative flex h-[35px] shrink-0 items-center gap-1.5 border-r border-border border-t pl-2.5 pr-1 text-small transition-colors duration-100 motion-safe:animate-[fade-in_150ms_ease-out]";

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
    <div className="shrink-0 bg-bg">
      <nav
        aria-label="Arquivos abertos"
        className="flex overflow-x-auto border-b border-border bg-surface [scrollbar-width:none]"
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
                  ? "-mb-px border-t-accent bg-bg text-text-hi"
                  : "border-t-transparent text-text-2 hover:bg-bg"
              }`}
            >
              <Link
                to={key}
                aria-current={active ? "page" : undefined}
                className="flex items-center gap-1.5"
              >
                <FileGlyph file={name} />
                {name}
              </Link>
              {closable ? (
                <button
                  type="button"
                  onClick={() => closeTab(key)}
                  aria-label={`Fechar ${name}`}
                  className={`flex size-5 items-center justify-center rounded-md text-text-2 transition duration-100 hover:bg-surface-3 hover:text-text focus-visible:opacity-100 group-hover:opacity-100 ${active ? "opacity-100" : "opacity-0"}`}
                >
                  <X size={14} strokeWidth={1.5} aria-hidden="true" />
                </button>
              ) : (
                <span aria-hidden="true" className="w-1.5" />
              )}
            </span>
          );
        })}
      </nav>

      <div
        aria-hidden="true"
        className="flex h-[22px] items-center gap-1 overflow-hidden whitespace-nowrap px-3 text-small text-text-2"
      >
        {current.crumb.map((segment, index) => {
          const last = index === current.crumb.length - 1;
          return (
            <Fragment key={`${segment}-${index}`}>
              {index > 0 && <ChevronRight size={14} strokeWidth={1.5} />}
              <span className={last ? "flex items-center gap-1 text-text" : ""}>
                {last && <FileGlyph file={segment} size={13} />}
                {segment}
              </span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
