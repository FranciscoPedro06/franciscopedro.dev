import { Explorer } from "@/components/workbench/Explorer";
import { SettingsPanel } from "@/components/workbench/SettingsPanel";
import { useWorkbench } from "@/lib/workbench";

const TITLES: Record<string, string> = {
  explorer: "Explorer",
  settings: "Settings",
  search: "Search",
  scm: "Source Control",
};

/**
 * Painel lateral do workbench (doc 04 §6.14): o container que o rail comuta
 * via `activeView` (ADR-0012). Recolhível pela sidebar inteira; largura
 * arrastável entra na M3. Visível em `lg+` — abaixo disso o conteúdo é
 * alcançado pelo menu (M6 traz os drawers).
 */
export function SidePanel() {
  const { activeView, sidebarCollapsed, sidebarWidth } = useWorkbench();

  if (sidebarCollapsed) return null;

  const body = activeView === "settings" ? <SettingsPanel /> : <Explorer />;

  return (
    <aside
      aria-label={TITLES[activeView]}
      className="hidden shrink-0 flex-col border-r border-border bg-surface/60 lg:flex"
      style={{ width: sidebarWidth }}
    >
      <div className="flex h-8 shrink-0 items-center px-4">
        <span className="type-label text-text-3">{TITLES[activeView]}</span>
      </div>
      <div className="scrollbar-ide min-h-0 flex-1 overflow-y-auto">{body}</div>
    </aside>
  );
}
