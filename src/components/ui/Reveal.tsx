import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Revelação de entrada no scroll (doc 08 §5): uma vez, 16px, tokens do
 * doc 04 §5 — agora em CSS + IntersectionObserver (sem framer-motion, que
 * saiu da entrada na Release 0.7 para caber no orçamento). O estado oculto só
 * vale com JS (`:root[data-js]`), então sem script o conteúdo aparece normal.
 */
export function Reveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger opcional em ms (doc 08 §3: máx. 1 nível, 60ms, listas curtas). */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { root: document.getElementById("editor-scroll"), rootMargin: "-10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // O delay só governa a transição de entrada (one-shot); com motion
      // reduzido o CSS zera a transição inteira, delay incluído.
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${shown ? "reveal-in" : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
