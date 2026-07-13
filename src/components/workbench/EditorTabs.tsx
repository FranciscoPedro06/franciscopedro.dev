import { ChevronRight, X } from "lucide-react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { findProject } from "@/content/projects";
import { projectFile, useHomeView } from "@/lib/views";

interface OpenFile {
  name: string;
  /** Fechar o arquivo navega para cá (a tab overview não fecha). */
  closeTo: string;
  crumb: string[];
}

/** Resolve o "arquivo aberto" a partir da URL — nenhum estado além dela (ADR-0004). */
function useOpenFile(): OpenFile | null {
  const { pathname } = useLocation();
  const view = useHomeView();

  if (pathname === "/") {
    if (view === "overview") return null;
    return {
      name: `${view}.tsx`,
      closeTo: "/",
      crumb: ["portfolio", "src", `${view}.tsx`],
    };
  }
  if (pathname === "/projetos") {
    return {
      name: "projetos",
      closeTo: "/",
      crumb: ["portfolio", "src", "projetos"],
    };
  }
  const caseMatch = pathname.match(/^\/projetos\/([^/]+)$/);
  if (caseMatch) {
    const project = findProject(caseMatch[1]);
    if (project) {
      const file = projectFile(project);
      return {
        name: file,
        closeTo: "/projetos",
        crumb: ["portfolio", "src", "projetos", file],
      };
    }
  }
  return {
    name: "404.html",
    closeTo: "/",
    crumb: ["portfolio", "404.html"],
  };
}

const tabBase =
  "flex shrink-0 items-center gap-2 border-r border-border border-t-2 px-3 py-1.5 font-mono text-label font-normal normal-case tracking-normal transition-colors duration-150";

/**
 * Faixa de tabs do editor (doc 04 §6.15, Release 0.6.1): a tab `overview.tsx`
 * é fixa (a "welcome page" do workbench) e o arquivo aberto entra ao lado,
 * com fechar funcional — fechar volta ao contexto de origem. Tudo derivado
 * da URL; o breadcrumb é visual apenas (aria-hidden).
 */
export function EditorTabs() {
  const file = useOpenFile();

  return (
    <div className="shrink-0 border-b border-border bg-surface">
      <nav aria-label="Arquivos abertos" className="flex overflow-x-auto">
        {file ? (
          <Link
            to="/"
            className={`${tabBase} border-t-transparent text-text-3 hover:bg-surface-2 hover:text-text-2`}
          >
            overview.tsx
          </Link>
        ) : (
          <span
            aria-current="page"
            className={`${tabBase} border-t-accent bg-bg text-text`}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            overview.tsx
          </span>
        )}

        {file && (
          <span
            aria-current="page"
            className={`${tabBase} gap-2.5 border-t-accent bg-bg pr-1.5 text-text`}
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {file.name}
            <Link
              to={file.closeTo}
              aria-label={`Fechar ${file.name}`}
              className="flex size-6 items-center justify-center rounded-sm text-text-3 transition-colors duration-150 hover:bg-surface-2 hover:text-text"
            >
              <X size={12} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </span>
        )}
      </nav>

      <div
        aria-hidden="true"
        className="flex flex-wrap items-center gap-1.5 border-t border-border px-4 py-1.5 font-mono text-label font-normal normal-case tracking-normal text-text-3"
      >
        {(file?.crumb ?? ["portfolio", "src", "overview.tsx"]).map((segment, index) => (
          <Fragment key={`${segment}-${index}`}>
            {index > 0 && <ChevronRight size={12} strokeWidth={1.5} />}
            <span>{segment}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
