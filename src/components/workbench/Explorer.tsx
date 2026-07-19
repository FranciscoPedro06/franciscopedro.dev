import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { FileGlyph } from "@/components/ui/FileGlyph";
import { byOrder } from "@/content/projects";
import { HOME_VIEWS, projectFile, useHomeView } from "@/lib/views";
import { toggleExplorerNode, useWorkbench } from "@/lib/workbench";

const row =
  "flex items-center gap-1.5 rounded-sm py-1 pr-2 transition-colors duration-150";
const leaf = (active: boolean) =>
  active
    ? "bg-accent-dim text-text"
    : "text-text-3 hover:bg-surface-2 hover:text-text-2";

function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronRight
      size={13}
      strokeWidth={1.5}
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
    />
  );
}

/**
 * Explorer (doc 04 §6.14): a árvore **real** da aplicação, agora com colapso
 * de pastas persistido (ADR-0012) e chevrons que giram. `src/` traz uma view
 * por arquivo e a pasta `projetos/` (cabeçalho abre o índice; filhos são os 5
 * cases com extensão derivada da stack). Tudo derivado da URL.
 */
export function Explorer() {
  const { pathname } = useLocation();
  const view = useHomeView();
  const { explorerExpanded } = useWorkbench();

  const srcOpen = explorerExpanded.src ?? true;
  const projOpen = explorerExpanded.projetos ?? true;
  const projActive = pathname === "/projetos";
  const fileViews = HOME_VIEWS.filter((item) => item.id !== "projetos");

  return (
    <nav aria-label="Explorador" className="px-1 pb-4 pt-1 font-mono text-small">
      <ul>
        <li>
          <button
            type="button"
            onClick={() => toggleExplorerNode("src")}
            aria-expanded={srcOpen}
            className={`${row} w-full pl-2 text-text-2 hover:bg-surface-2`}
          >
            <Chevron open={srcOpen} />
            src
          </button>

          {srcOpen && (
            // Guia de indentação (0.9.2): hairline vertical por nível, como
            // toda árvore de IDE — estrutura real, não textura (ADR-0015).
            <ul className="ml-[13px] border-l border-border">
              {fileViews.map((item) => {
                const active = pathname === "/" && view === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.id === "overview" ? "/" : `/#${item.id}`}
                      aria-current={active ? "true" : undefined}
                      className={`${row} pl-3 ${leaf(active)}`}
                    >
                      <FileGlyph file={item.file} />
                      {item.file}
                    </Link>
                  </li>
                );
              })}

              <li>
                <div
                  className={`${row} pl-1 ${projActive ? "bg-accent-dim text-text" : "text-text-2"}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExplorerNode("projetos")}
                    aria-expanded={projOpen}
                    aria-label={`${projOpen ? "Recolher" : "Expandir"} projetos`}
                    className="rounded-sm text-text-3 transition-colors duration-150 hover:text-text"
                  >
                    <Chevron open={projOpen} />
                  </button>
                  <Link
                    to="/projetos"
                    aria-current={projActive ? "page" : undefined}
                    className="flex flex-1 items-center gap-1.5 rounded-sm hover:text-text"
                  >
                    {/* Pasta reflete o estado real de colapso (0.9.2). */}
                    {projOpen ? (
                      <FolderOpen
                        size={13}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                    ) : (
                      <Folder
                        size={13}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0"
                      />
                    )}
                    projetos
                  </Link>
                </div>

                {projOpen && (
                  <ul className="ml-[13px] border-l border-border">
                    {byOrder.map((project) => {
                      const to = `/projetos/${project.slug}`;
                      const active = pathname === to;
                      return (
                        <li key={project.slug}>
                          <Link
                            to={to}
                            aria-current={active ? "true" : undefined}
                            className={`${row} pl-3 ${leaf(active)}`}
                          >
                            <FileGlyph file={projectFile(project)} />
                            {projectFile(project)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
