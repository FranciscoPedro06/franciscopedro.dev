import {
  Braces,
  Database,
  ExternalLink,
  FolderGit2,
  GitBranch,
  House,
  Mail,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "@/content/site";
import { HOME_VIEWS, useHomeView } from "@/lib/views";

/** Ícone por view — Lucide, o sistema de ícones do doc 04 §7. */
const VIEW_ICONS: Record<string, LucideIcon> = {
  overview: House,
  projetos: FolderGit2,
  engenharia: Braces,
  dados: Database,
  trajetoria: GitBranch,
  sobre: User,
  contato: Mail,
};

const itemClasses = (active: boolean) =>
  `group relative flex size-10 items-center justify-center rounded-md transition-colors duration-150 ${
    active ? "text-accent" : "text-text-3 hover:bg-surface-2 hover:text-text"
  }`;

/** Tooltip decorativo do rail — o nome acessível vem do aria-label. */
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

/**
 * Rail de atalhos do workbench (doc 04 §6.13, Release 0.6.1): uma view por
 * ícone, em md+. Estado ativo pela view do hash; tooltips decorativos.
 */
export function ActivityBar() {
  const { pathname } = useLocation();
  const view = useHomeView();

  return (
    <nav
      aria-label="Atalhos"
      className="hidden w-12 shrink-0 flex-col border-r border-border bg-surface md:flex"
    >
      <ul className="flex flex-1 flex-col items-center gap-1 pt-2">
        {HOME_VIEWS.map((item) => {
          const Icon = VIEW_ICONS[item.id];
          if (!Icon) return null;
          const active =
            (pathname === "/" && view === item.id) ||
            (item.id === "projetos" && pathname.startsWith("/projetos"));
          return (
            <li key={item.id}>
              <Link
                to={item.id === "overview" ? "/" : `/#${item.id}`}
                aria-label={item.label}
                aria-current={active ? "true" : undefined}
                className={itemClasses(active)}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                  />
                )}
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <RailTooltip>{item.label}</RailTooltip>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col items-center gap-1 pb-2">
        {site.social.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} (abre em nova aba)`}
              className={itemClasses(false)}
            >
              <ExternalLink size={20} strokeWidth={1.5} aria-hidden="true" />
              <RailTooltip>{link.label} ↗</RailTooltip>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
