import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll por rota (doc 06 §4): âncora rola até a seção e move o foco junto
 * (doc 13 §2); rota nova começa no topo. O suave/instantâneo é decidido pelo
 * CSS (`scroll-behavior` + prefers-reduced-motion).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
