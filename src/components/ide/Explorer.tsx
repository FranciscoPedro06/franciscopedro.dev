import { ChevronDown, FileCode } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { byOrder } from "@/content/projects";
import { site } from "@/content/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SPY_IDS = site.nav
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

const leafClasses = (active: boolean) =>
  `flex items-center gap-2 rounded-sm py-1 pl-9 pr-3 transition-colors duration-150 ${
    active
      ? "bg-accent-dim text-text"
      : "text-text-3 hover:bg-surface-2 hover:text-text-2"
  }`;

/** Cabeçalho de grupo da árvore — chevron decorativo, sempre expandido. */
function TreeGroup({ name, children }: { name: string; children: ReactNode }) {
  return (
    <li className="mt-1">
      <p className="flex items-center gap-1.5 px-3 py-1 text-text-2">
        <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" />
        {name}
      </p>
      <ul>{children}</ul>
    </li>
  );
}

/**
 * Explorer da moldura de IDE (doc 04 §6.14, Release 0.6): árvore de navegação
 * derivada de `site.nav` e das coleções de projetos — nenhum destino novo,
 * nenhum conteúdo novo. Só em telas xl+; a árvore é estática (sensação de
 * explorador, sem estado de colapso).
 */
export function Explorer() {
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(SPY_IDS);

  return (
    <nav
      aria-label="Explorador"
      className="fixed bottom-0 left-14 top-16 z-30 hidden w-60 overflow-y-auto border-r border-border bg-surface/60 pb-14 xl:block"
    >
      <p className="type-label px-4 pt-4 text-text-3">Portfolio</p>

      <ul className="mt-2 px-1 font-mono text-small">
        <TreeGroup name="home">
          <li>
            <Link
              to="/"
              aria-current={pathname === "/" && !activeSection ? "true" : undefined}
              className={leafClasses(pathname === "/" && !activeSection)}
            >
              <FileCode size={14} strokeWidth={1.5} aria-hidden="true" />
              francisco-pedro.tsx
            </Link>
          </li>
          {site.nav.map((item) => {
            const id = item.href.split("#")[1];
            const active = pathname === "/" && activeSection === id;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={active ? "true" : undefined}
                  className={`${leafClasses(active)} lowercase`}
                >
                  <FileCode size={14} strokeWidth={1.5} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </TreeGroup>

        <TreeGroup name="projetos">
          {byOrder.map((project) => {
            const to = `/projetos/${project.slug}`;
            const active = pathname === to;
            return (
              <li key={project.slug}>
                <Link
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={leafClasses(active)}
                >
                  <FileCode size={14} strokeWidth={1.5} aria-hidden="true" />
                  {project.slug}.tsx
                </Link>
              </li>
            );
          })}
        </TreeGroup>
      </ul>
    </nav>
  );
}
