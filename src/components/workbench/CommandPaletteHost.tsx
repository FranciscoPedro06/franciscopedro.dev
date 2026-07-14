import { lazy, Suspense, useEffect, useState } from "react";
import { readWorkbench, setWorkbench } from "@/lib/workbench";

// A paleta em si (lista de comandos + modal) é lazy: só carrega ao abrir.
const CommandPalette = lazy(() =>
  import("./CommandPalette").then((m) => ({ default: m.CommandPalette }))
);

/**
 * Host eager e minúsculo (doc 04 §6.23): registra os atalhos globais —
 * Ctrl/⌘+Shift+P e F1 abrem a paleta; Ctrl/⌘+J alterna o painel inferior —
 * e monta a paleta (lazy) só quando aberta. Zero peso na entrada além do
 * listener.
 */
export function CommandPaletteHost() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.ctrlKey || event.metaKey;
      if (mod && event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "F1") {
        event.preventDefault();
        setOpen(true);
      } else if (mod && event.key.toLowerCase() === "j") {
        event.preventDefault();
        setWorkbench({ panelOpen: !readWorkbench().panelOpen });
      }
    };
    // Gatilho por clique (rail) — abre a paleta sem teclado (mobile).
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wb:command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wb:command-palette", onOpen);
    };
  }, []);

  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <CommandPalette onClose={() => setOpen(false)} />
    </Suspense>
  );
}
