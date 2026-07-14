import {
  Braces,
  Briefcase,
  ExternalLink,
  Files,
  FolderGit2,
  GitBranch,
  Mail,
  Search,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "@/content/site";
import { useHomeView } from "@/lib/views";
import {
  type ActivityView,
  setWorkbench,
  useWorkbench,
} from "@/lib/workbench";

/**
 * Rail de atividades do workbench (doc 04 §6.13). Dois tipos de item:
 * comutadores de painel lateral (Explorer, Settings — governam `activeView`)
 * e atalhos de conteúdo (Projects, Skills, Experience, Contact — navegam).
 * Search e Source Control entram na M3, quando seus painéis existem.
 */

interface PanelItem {
  id: ActivityView;
  label: string;
  icon: LucideIcon;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  to: string;
  match: (pathname: string, view: string) => boolean;
}

const PANELS: PanelItem[] = [
  { id: "explorer", label: "Explorer", icon: Files },
  { id: "search", label: "Search", icon: Search },
  { id: "scm", label: "Source Control", icon: GitBranch },
];

const NAV_ITEMS: NavItem[] = [
  {
    id: "projetos",
    label: "Projects",
    icon: FolderGit2,
    to: "/projetos",
    match: (p) => p.startsWith("/projetos"),
  },
  {
    id: "engenharia",
    label: "Skills",
    icon: Braces,
    to: "/#engenharia",
    match: (p, v) => p === "/" && v === "engenharia",
  },
  {
    id: "trajetoria",
    label: "Experience",
    icon: Briefcase,
    to: "/#trajetoria",
    match: (p, v) => p === "/" && v === "trajetoria",
  },
  {
    id: "contato",
    label: "Contact",
    icon: Mail,
    to: "/#contato",
    match: (p, v) => p === "/" && v === "contato",
  },
];

const SETTINGS: PanelItem = { id: "settings", label: "Settings", icon: Settings };

const itemBase =
  "group relative flex size-10 items-center justify-center rounded-md transition-colors duration-150";
const active = "text-accent";
const idle = "text-text-3 hover:bg-surface-2 hover:text-text";

/** Marcador lateral do item ativo — anima com micro-fade/scale. */
function ActiveMark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-1/2 h-5 w-0.5 origin-center -translate-y-1/2 rounded-full bg-accent motion-safe:animate-[mark-in_120ms_ease-out]"
    />
  );
}

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

export function ActivityBar() {
  const { pathname } = useLocation();
  const view = useHomeView();
  const { activeView, sidebarCollapsed } = useWorkbench();

  const panelActive = (id: ActivityView) => activeView === id && !sidebarCollapsed;

  const onPanel = (id: ActivityView) => {
    if (activeView === id && !sidebarCollapsed) {
      setWorkbench({ sidebarCollapsed: true });
    } else {
      setWorkbench({ activeView: id, sidebarCollapsed: false });
    }
  };

  const panelButton = (item: PanelItem) => {
    const on = panelActive(item.id);
    const Icon = item.icon;
    return (
      <button
        type="button"
        onClick={() => onPanel(item.id)}
        aria-label={item.label}
        aria-pressed={on}
        className={`${itemBase} ${on ? active : idle}`}
      >
        {on && <ActiveMark />}
        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
        <RailTooltip>{item.label}</RailTooltip>
      </button>
    );
  };

  return (
    <nav
      aria-label="Atividades"
      className="hidden w-12 shrink-0 flex-col border-r border-border bg-surface md:flex"
    >
      <ul className="flex flex-1 flex-col items-center gap-1 pt-2">
        {PANELS.map((item) => (
          <li key={item.id}>{panelButton(item)}</li>
        ))}

        <li aria-hidden="true" className="my-1 h-px w-6 bg-border" />

        {NAV_ITEMS.map((item) => {
          const on = item.match(pathname, view);
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Link
                to={item.to}
                aria-label={item.label}
                aria-current={on ? "true" : undefined}
                className={`${itemBase} ${on ? active : idle}`}
              >
                {on && <ActiveMark />}
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
              className={`${itemBase} ${idle}`}
            >
              <ExternalLink size={20} strokeWidth={1.5} aria-hidden="true" />
              <RailTooltip>{link.label} ↗</RailTooltip>
            </a>
          </li>
        ))}
        <li>{panelButton(SETTINGS)}</li>
      </ul>
    </nav>
  );
}
