import { lazy, Suspense } from "react";
import { useWorkbench } from "@/lib/workbench";

const BottomPanel = lazy(() =>
  import("./BottomPanel").then((m) => ({ default: m.BottomPanel }))
);

/**
 * Host do painel inferior (doc 04 §6.24): monta o painel (lazy) só quando
 * `panelOpen` (ADR-0012). Fica no fluxo do layout, acima da status bar.
 */
export function BottomPanelHost() {
  const { panelOpen } = useWorkbench();
  if (!panelOpen) return null;
  return (
    <Suspense fallback={null}>
      <BottomPanel />
    </Suspense>
  );
}
