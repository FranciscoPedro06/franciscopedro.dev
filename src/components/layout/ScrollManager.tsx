import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll e foco por navegação (doc 06 §4, doc 13 §2) — no workbench o único
 * scroll é o do painel do editor (`#editor-scroll`). Âncora existente ganha
 * foco e rola dentro do painel; navegação sem âncora reseta o painel ao
 * topo. O rAF espera a comutação de view (efeito da Home) tornar o alvo
 * visível antes de focar. Suave/instantâneo decidido no CSS
 * (`.editor-scroll` + prefers-reduced-motion).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.scrollIntoView();
          return;
        }
      }
      const editor = document.getElementById("editor-scroll");
      if (editor) editor.scrollTop = 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
