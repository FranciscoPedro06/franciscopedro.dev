import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Minimap decorativo (doc 04 §6.22): a silhueta de "código" à direita do
 * editor com um indicador de viewport que acompanha o scroll de
 * `#editor-scroll`. Puramente visual (`aria-hidden`) e só em `xl+`; CSS +
 * um listener de scroll com rAF. Não representa conteúdo real — é chrome.
 */

// Larguras/indentação estáveis (aparência de código), geradas uma vez.
const LINES = Array.from({ length: 96 }, (_, i) => {
  const noise = ((i * 9301 + 49297) % 233280) / 233280;
  const blank = i % 12 === 5;
  const indent = i % 7 < 2 ? 10 : i % 5 === 0 ? 5 : 0;
  return { blank, indent, width: blank ? 0 : 22 + Math.floor(noise * 62) };
});

export function Minimap() {
  const { pathname, hash } = useLocation();
  const [box, setBox] = useState({ top: 0, height: 100 });

  useEffect(() => {
    const el = document.getElementById("editor-scroll");
    if (!el) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const total = Math.max(el.scrollHeight, 1);
      setBox({
        top: (el.scrollTop / total) * 100,
        height: Math.min((el.clientHeight / total) * 100, 100),
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname, hash]);

  return (
    <div
      aria-hidden="true"
      className="relative hidden w-16 shrink-0 overflow-hidden border-l border-border bg-surface/30 xl:block"
    >
      <div className="flex flex-col gap-[3px] px-2 py-2">
        {LINES.map((line, i) => (
          <span
            key={i}
            style={{ marginLeft: line.indent, width: `${line.width}%` }}
            className={`h-[2px] rounded-full ${line.blank ? "" : "bg-text-3/20"}`}
          />
        ))}
      </div>
      <div
        style={{ top: `${box.top}%`, height: `${box.height}%` }}
        className="pointer-events-none absolute left-0 w-full border-y border-border-strong/40 bg-text/[0.04]"
      />
    </div>
  );
}
