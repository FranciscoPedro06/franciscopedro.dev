import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/Button";

/**
 * Menu mobile em overlay de tela cheia (doc 04 §6.6): foco preso enquanto
 * aberto, Esc fecha, itens em h3.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>("a, button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          variants={fadeIn(reduced)}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex flex-col bg-bg px-6 pb-8 pt-4"
        >
          <div className="flex h-12 items-center justify-end">
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
          </div>

          <nav aria-label="Menu principal" className="mt-8 flex flex-col gap-2">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="rounded-md py-3 text-h3 text-text"
              >
                {item.label}
              </Link>
            ))}
            {site.resumeReady && (
              <Link
                to="/resume"
                onClick={onClose}
                className="rounded-md py-3 text-h3 text-text"
              >
                Currículo
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
