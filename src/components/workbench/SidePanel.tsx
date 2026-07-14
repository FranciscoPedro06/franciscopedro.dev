import { lazy, Suspense, useState } from "react";
import { Explorer } from "@/components/workbench/Explorer";
import { ResizeHandle } from "@/components/workbench/ResizeHandle";
import { SettingsPanel } from "@/components/workbench/SettingsPanel";
import { setWorkbench, useWorkbench } from "@/lib/workbench";

// Painéis pesados (índice de busca, histórico git) em chunks próprios — não
// entram no orçamento inicial nem no HTML de SSR (montam só ao abrir).
const SearchPanel = lazy(() =>
  import("./SearchPanel").then((m) => ({ default: m.SearchPanel }))
);
const SourceControlPanel = lazy(() =>
  import("./SourceControlPanel").then((m) => ({ default: m.SourceControlPanel }))
);

const TITLES: Record<string, string> = {
  explorer: "Explorer",
  settings: "Settings",
  search: "Search",
  scm: "Source Control",
};

const MIN_WIDTH = 208;
const MAX_WIDTH = 480;

/**
 * Painel lateral do workbench (doc 04 §6.14): container que o rail comuta via
 * `activeView` (ADR-0012). Recolhível pela sidebar inteira e com largura
 * arrastável e persistida. Visível em `lg+` — abaixo disso o conteúdo é
 * alcançado pelo menu (M6 traz os drawers).
 */
export function SidePanel() {
  const { activeView, sidebarCollapsed, sidebarWidth } = useWorkbench();
  const [dragWidth, setDragWidth] = useState<number | null>(null);

  if (sidebarCollapsed) return null;

  const width = dragWidth ?? sidebarWidth;

  const body =
    activeView === "settings" ? (
      <SettingsPanel />
    ) : activeView === "search" ? (
      <Suspense fallback={null}>
        <SearchPanel />
      </Suspense>
    ) : activeView === "scm" ? (
      <Suspense fallback={null}>
        <SourceControlPanel />
      </Suspense>
    ) : (
      <Explorer />
    );

  return (
    <aside
      aria-label={TITLES[activeView]}
      className="relative hidden shrink-0 flex-col border-r border-border bg-surface/60 lg:flex"
      style={{ width }}
    >
      <div className="flex h-8 shrink-0 items-center px-4">
        <span className="type-label text-text-3">{TITLES[activeView]}</span>
      </div>
      <div className="scrollbar-ide min-h-0 flex-1 overflow-y-auto">{body}</div>

      <ResizeHandle
        width={width}
        min={MIN_WIDTH}
        max={MAX_WIDTH}
        onDrag={setDragWidth}
        onCommit={(next) => {
          setDragWidth(null);
          setWorkbench({ sidebarWidth: next });
        }}
      />
    </aside>
  );
}
