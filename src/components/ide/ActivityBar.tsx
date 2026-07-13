import { Braces, Database, FolderGit2, GitBranch, House, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "@/content/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";

/** Ícone por âncora da home — Lucide, o sistema de ícones do doc 04 §7. */
const SECTION_ICONS: Record<string, LucideIcon> = {
  projetos: FolderGit2,
  engenharia: Braces,
  dados: Database,
  contato: Mail,
};

const SPY_IDS = site.nav
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

const itemClasses = (active: boolean) =>
  `group relative flex size-11 items-center justify-center rounded-md transition-colors duration-150 ${
    active ? "text-accent" : "text-text-3 hover:bg-surface-2 hover:text-text"
  }`;

/** Tooltip decorativo do rail — o nome acessível vem do aria-label do link. */
function RailTooltip({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-sm border border-border bg-surface-2 px-2 py-1 font-mono text-label font-normal normal-case tracking-normal text-text-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

function ActiveMarker() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent"
    />
  );
}

/**
 * Rail de atalhos da moldura de IDE (doc 04 §6.13, Release 0.6): espelha a
 * navegação principal em ícones, só em desktop (lg+). Estado ativo pelo
 * mesmo scroll-spy da NavBar; tooltips decorativos, nomes via aria-label.
 */
export function ActivityBar() {
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(SPY_IDS);

  return (
    <nav
      aria-label="Atalhos"
      className="fixed bottom-0 left-0 top-16 z-30 hidden w-14 flex-col border-r border-border bg-surface lg:flex"
    >
      <ul className="flex flex-1 flex-col items-center gap-1 pt-3">
        <li>
          <Link
            to="/"
            aria-label="Início"
            aria-current={pathname === "/" && !activeSection ? "true" : undefined}
            className={itemClasses(pathname === "/" && !activeSection)}
          >
            {pathname === "/" && !activeSection && <ActiveMarker />}
            <House size={22} strokeWidth={1.5} aria-hidden="true" />
            <RailTooltip>Início</RailTooltip>
          </Link>
        </li>
        {site.nav.map((item) => {
          const id = item.href.split("#")[1];
          const Icon = id ? SECTION_ICONS[id] : undefined;
          if (!Icon) return null;
          const active =
            (pathname === "/" && activeSection === id) ||
            (id === "projetos" && pathname.startsWith("/projetos"));
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                aria-label={item.label}
                aria-current={active ? "true" : undefined}
                className={itemClasses(active)}
              >
                {active && <ActiveMarker />}
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <RailTooltip>{item.label}</RailTooltip>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col items-center gap-1 pb-14">
        {site.social.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (abre em nova aba)`}
              className={itemClasses(false)}
            >
              <GitBranch size={22} strokeWidth={1.5} aria-hidden="true" />
              <RailTooltip>{link.label} ↗</RailTooltip>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
