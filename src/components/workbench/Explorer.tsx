import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { FileGlyph } from "@/components/ui/FileGlyph";
import { byOrder } from "@/content/projects";
import { HOME_VIEWS, projectFile, useHomeView } from "@/lib/views";
import { toggleExplorerNode, useWorkbench } from "@/lib/workbench";

/**
 * Explorer (doc 04 §6.14; Release 0.10 no desenho do VS Code): linhas de
 * 22px, guias de indentação, logo oficial da linguagem em cada arquivo e
 * seleção em `surface-3`. A árvore é a real da aplicação: `src/` com uma view
 * por arquivo e a pasta `projetos/` (o cabeçalho abre o índice; os filhos são
 * os cases). Colapso persistido (ADR-0012); tudo derivado da URL.
 */
const row =
  "relative flex h-[22px] items-center gap-1.5 pr-3 text-small transition-colors duration-100";
const leaf = (active: boolean) =>
  active ? "bg-surface-3 text-text-hi" : "text-text hover:bg-surface-2";

function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronRight
      size={16}
      strokeWidth={1.5}
      aria-hidden="true"
      className={`shrink-0 text-text-2 transition-transform duration-100 ${open ? "rotate-90" : ""}`}
    />
  );
}

/** Guia vertical de indentação (estrutura real da árvore, ADR-0015). */
function Guides({ depth }: { depth: number }) {
  return (
    <>
      {Array.from({ length: depth }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute inset-y-0 w-px bg-border-strong/70"
          style={{ left: 15 + i * 8 }}
        />
      ))}
    </>
  );
}

export function Explorer() {
  const { pathname } = useLocation();
  const view = useHomeView();
  const { explorerExpanded } = useWorkbench();

  const srcOpen = explorerExpanded.src ?? true;
  const projOpen = explorerExpanded.projetos ?? true;
  const projActive = pathname === "/projetos";
  const fileViews = HOME_VIEWS.filter((item) => item.id !== "projetos");

  return (
    <nav aria-label="Explorador" className="pb-4">
      <p className="flex h-[22px] items-center gap-0.5 px-1 text-label uppercase text-text-hi">
        <Chevron open />
        franciscopedro.dev
      </p>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => toggleExplorerNode("src")}
            aria-expanded={srcOpen}
            className={`${row} w-full pl-2 text-text hover:bg-surface-2`}
          >
            <Chevron open={srcOpen} />
            src
          </button>

          {srcOpen && (
            <ul>
              {fileViews.map((item) => {
                const active = pathname === "/" && view === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.id === "overview" ? "/" : `/#${item.id}`}
                      aria-current={active ? "true" : undefined}
                      className={`${row} pl-[34px] ${leaf(active)}`}
                    >
                      <Guides depth={1} />
                      <FileGlyph file={item.file} />
                      {item.file}
                    </Link>
                  </li>
                );
              })}

              <li>
                <div
                  className={`${row} pl-4 ${projActive ? "bg-surface-3 text-text-hi" : "text-text hover:bg-surface-2"}`}
                >
                  <Guides depth={1} />
                  <button
                    type="button"
                    onClick={() => toggleExplorerNode("projetos")}
                    aria-expanded={projOpen}
                    aria-label={`${projOpen ? "Recolher" : "Expandir"} projetos`}
                    className="rounded-sm"
                  >
                    <Chevron open={projOpen} />
                  </button>
                  <Link
                    to="/projetos"
                    aria-current={projActive ? "page" : undefined}
                    className="flex flex-1 items-center gap-1.5"
                  >
                    projetos
                  </Link>
                </div>

                {projOpen && (
                  <ul>
                    {byOrder.map((project) => {
                      const to = `/projetos/${project.slug}`;
                      const active = pathname === to;
                      return (
                        <li key={project.slug}>
                          <Link
                            to={to}
                            aria-current={active ? "true" : undefined}
                            className={`${row} pl-[42px] ${leaf(active)}`}
                          >
                            <Guides depth={2} />
                            <FileGlyph file={projectFile(project)} />
                            <span className="truncate">{projectFile(project)}</span>
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
