import { X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
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
  const { activeView, sidebarCollapsed, mobilePanelOpen, sidebarWidth } =
    useWorkbench();
  const [dragWidth, setDragWidth] = useState<number | null>(null);

  // Esc fecha o drawer no mobile.
  useEffect(() => {
    if (!mobilePanelOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWorkbench({ mobilePanelOpen: false });
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobilePanelOpen]);

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
    <>
      {mobilePanelOpen && (
        <button
          type="button"
          aria-label="Fechar painel lateral"
          onClick={() => setWorkbench({ mobilePanelOpen: false })}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        aria-label={TITLES[activeView]}
        style={{ width }}
        className={`fixed inset-y-0 left-12 z-40 flex max-w-[80vw] flex-col border-r border-border bg-surface shadow-lg transition-transform duration-150 lg:static lg:z-auto lg:max-w-none lg:translate-x-0 lg:bg-surface/60 lg:shadow-none lg:transition-none ${
          mobilePanelOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        } lg:visible ${sidebarCollapsed ? "lg:hidden" : "lg:flex"}`}
      >
        <div className="flex h-8 shrink-0 items-center px-4">
          <span className="type-label text-text-3">{TITLES[activeView]}</span>
          <button
            type="button"
            onClick={() => setWorkbench({ mobilePanelOpen: false })}
            aria-label="Fechar painel lateral"
            className="ml-auto flex size-6 items-center justify-center rounded-sm text-text-3 transition-colors duration-150 hover:bg-surface-2 hover:text-text lg:hidden"
          >
            <X size={14} strokeWidth={1.5} aria-hidden="true" />
          </button>
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
    </>
  );
}
