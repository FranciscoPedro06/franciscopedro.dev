import { ChevronDown, FileCode, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { byOrder } from "@/content/projects";
import { HOME_VIEWS, projectFile, useHomeView } from "@/lib/views";

const leafClasses = (active: boolean, indent: string) =>
  `flex items-center gap-2 rounded-sm py-1 pr-3 transition-colors duration-150 ${indent} ${
    active
      ? "bg-accent-dim text-text"
      : "text-text-3 hover:bg-surface-2 hover:text-text-2"
  }`;

/**
 * Explorer do workbench (doc 04 §6.14, Release 0.6.1): a árvore real da
 * aplicação — `src/` com uma view por arquivo e a pasta `projetos/` com os
 * 5 cases, extensão derivada da stack de cada um (`projectFile`). Nenhum
 * destino novo; só em lg+.
 */
export function Explorer() {
  const { pathname } = useLocation();
  const view = useHomeView();

  return (
    <nav
      aria-label="Explorador"
      className="hidden w-60 shrink-0 overflow-y-auto border-r border-border bg-surface/60 lg:block"
    >
      <p className="type-label px-4 pb-1 pt-3 text-text-3">Portfolio</p>

      <ul className="px-1 pb-4 font-mono text-small">
        <li>
          <p className="flex items-center gap-1.5 px-3 py-1 text-text-2">
            <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
            src
          </p>
          <ul>
            {HOME_VIEWS.map((item) => {
              if (item.id === "projetos") {
                // A view de projetos é a pasta: o cabeçalho abre o índice
                // e os filhos são os 5 cases.
                const folderActive = pathname === "/projetos";
                return (
                  <li key={item.id}>
                    <Link
                      to="/projetos"
                      aria-current={folderActive ? "page" : undefined}
                      className={leafClasses(folderActive, "pl-6")}
                    >
                      <FolderOpen size={14} strokeWidth={1.5} aria-hidden="true" />
                      projetos
                    </Link>
                    <ul>
                      {byOrder.map((project) => {
                        const to = `/projetos/${project.slug}`;
                        const active = pathname === to;
                        return (
                          <li key={project.slug}>
                            <Link
                              to={to}
                              aria-current={active ? "page" : undefined}
                              className={leafClasses(active, "pl-11")}
                            >
                              <FileCode size={14} strokeWidth={1.5} aria-hidden="true" />
                              {projectFile(project)}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              const active = pathname === "/" && view === item.id;
              return (
                <li key={item.id}>
                  <Link
                    to={item.id === "overview" ? "/" : `/#${item.id}`}
                    aria-current={active ? "true" : undefined}
                    className={leafClasses(active, "pl-8")}
                  >
                    <FileCode size={14} strokeWidth={1.5} aria-hidden="true" />
                    {item.file}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
