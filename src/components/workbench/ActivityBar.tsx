import {
  Command,
  ExternalLink,
  Files,
  GitBranch,
  Search,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { brandIcon } from "@/lib/brand";
import {
  type ActivityView,
  setWorkbench,
  useWorkbench,
} from "@/lib/workbench";

/**
 * Rail de atividades do workbench (doc 04 §6.13), no desenho do VS Code
 * (Release 0.10): só comutadores de painel lateral (Explorer, Search, Source
 * Control; Settings embaixo) — a navegação entre views é da barra de menu.
 * Item ativo: tinta cheia + marcador lateral no azul de ação.
 */

interface PanelItem {
  id: ActivityView;
  label: string;
  icon: LucideIcon;
}

const PANELS: PanelItem[] = [
  { id: "explorer", label: "Explorer", icon: Files },
  { id: "search", label: "Search", icon: Search },
  { id: "scm", label: "Source Control", icon: GitBranch },
];

const SETTINGS: PanelItem = { id: "settings", label: "Settings", icon: Settings };

const itemBase =
  "group relative flex h-12 w-12 items-center justify-center transition-colors duration-150";
const active = "text-text-hi";
const idle = "text-text-3 hover:text-text-hi";

/** Marcador lateral do item ativo — anima com micro-fade/scale. */
function ActiveMark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-accent motion-safe:animate-[mark-in_120ms_ease-out]"
    />
  );
}

function RailTooltip({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="elevated pointer-events-none absolute left-full top-1/2 z-50 ml-1 -translate-y-1/2 whitespace-nowrap rounded-md border border-border-strong bg-surface px-2 py-1 text-small text-text opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {children}
    </span>
  );
}

export function ActivityBar() {
  const { activeView, sidebarCollapsed, mobilePanelOpen } = useWorkbench();

  const panelActive = (id: ActivityView) => activeView === id && !sidebarCollapsed;

  // Comuta o painel: no desktop (lg+) recolhe/expande a sidebar; no mobile
  // (<lg) abre/fecha o drawer. Cada flag só tem efeito no seu breakpoint.
  const onPanel = (id: ActivityView) => {
    if (activeView === id) {
      setWorkbench({
        sidebarCollapsed: !sidebarCollapsed,
        mobilePanelOpen: !mobilePanelOpen,
      });
    } else {
      setWorkbench({ activeView: id, sidebarCollapsed: false, mobilePanelOpen: true });
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
        <Icon size={24} strokeWidth={1.3} aria-hidden="true" />
        <RailTooltip>{item.label}</RailTooltip>
      </button>
    );
  };

  return (
    <nav
      aria-label="Atividades"
      className="flex w-12 shrink-0 flex-col border-r border-border bg-surface"
    >
      <ul className="flex flex-1 flex-col items-center">
        {PANELS.map((item) => (
          <li key={item.id}>{panelButton(item)}</li>
        ))}

      </ul>

      <ul className="flex flex-col items-center">
        <li>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("wb:command-palette"))}
            aria-label="Abrir paleta de comandos"
            className={`${itemBase} ${idle}`}
          >
            <Command size={22} strokeWidth={1.3} aria-hidden="true" />
            <RailTooltip>Command Palette (Ctrl+Shift+P)</RailTooltip>
          </button>
        </li>
        {site.social.map((link) => {
          const Icon = brandIcon(link.label);
          return (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (abre em nova aba)`}
                className={`${itemBase} ${idle}`}
              >
                {Icon ? (
                  <Icon width={22} height={22} />
                ) : (
                  <ExternalLink size={22} strokeWidth={1.3} aria-hidden="true" />
                )}
                <RailTooltip>{link.label} ↗</RailTooltip>
              </a>
            </li>
          );
        })}
        <li>{panelButton(SETTINGS)}</li>
      </ul>
    </nav>
  );
}
