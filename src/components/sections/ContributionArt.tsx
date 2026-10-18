import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { contributionArt } from "@/content/home";
import { site } from "@/content/site";
import { GRID_COLUMNS, GRID_ROWS, renderWord } from "@/lib/pixel-font";

/**
 * Grade no formato da de contribuições do GitHub (Release 0.10) escrevendo
 * palavras da stack em pixels, pedido do Francisco. Não é histórico: o texto
 * diz isso e aponta para o perfil real. As palavras trocam sozinhas (pausa no
 * hover/foco) ou pelos botões; com movimento reduzido, fica na primeira.
 * O SSR entrega a primeira palavra — a página está completa sem JS.
 */

const MONTHS = [
  "out",
  "nov",
  "dez",
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
];
const LEVEL = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];

/** Ruído determinístico (mesmo valor no servidor e no cliente). */
const noise = (col: number, row: number) => {
  const x = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ContributionArt() {
  const { words } = contributionArt;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const word = words[index];
  const grid = useMemo(() => renderWord(word), [word]);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % words.length), 3200);
    return () => clearTimeout(id);
  }, [index, paused, words.length]);

  // Letra no verde mais forte (alguns quadrados um tom abaixo, como um
  // histórico real); fundo quase vazio para a palavra ler de longe.
  const level = (col: number, row: number) => {
    const n = noise(col, row);
    if (grid[col][row]) return n > 0.85 ? 3 : 4;
    return n > 0.93 ? 1 : 0;
  };

  return (
    <section
      aria-labelledby="pixels-titulo"
      className="rounded-lg border border-border-strong bg-bg p-4 md:p-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="pixels-titulo" className="text-body text-text-hi">
          {contributionArt.title}
        </h2>
        <a
          href={site.social.find((s) => s.label === "GitHub")?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] text-link hover:underline"
        >
          {contributionArt.realHistory}
          <ExternalLink size={12} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>

      {/* Grade fluida: 53 colunas de quadrados que acompanham a largura do
          editor — a palavra inteira sempre à vista, inclusive no celular. */}
      <div className="mt-3">
        <div
          role="img"
          aria-label={`Grade no formato da de contribuições do GitHub escrevendo ${word}`}
          className="grid grid-cols-[minmax(0,1fr)] gap-x-1.5 sm:grid-cols-[26px_minmax(0,1fr)]"
        >
          <span aria-hidden="true" className="hidden sm:block" />
          <div
            aria-hidden="true"
            className="hidden h-4 gap-x-[3px] text-[10.5px] text-text-2 sm:grid"
            style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
          >
            {MONTHS.map((month, i) => (
              <span
                key={month}
                className="whitespace-nowrap"
                style={{ gridColumnStart: 1 + Math.round(i * 4.42) }}
              >
                {month}
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="hidden gap-[3px] text-[10px] text-text-2 sm:grid"
            style={{ gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))` }}
          >
            {["", "seg", "", "qua", "", "sex", ""].map((day, i) => (
              <span key={i} className="flex items-center">
                {day}
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="grid grid-flow-col gap-[2px] sm:gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${GRID_ROWS}, auto)`,
            }}
          >
            {grid.map((column, col) =>
              column.map((_, row) => (
                <span
                  key={`${col}-${row}`}
                  className={`aspect-square rounded-[2px] outline outline-1 -outline-offset-1 outline-text/5 transition-colors duration-300 motion-reduce:transition-none ${LEVEL[level(col, row)]}`}
                  style={{ transitionDelay: `${col * 9}ms` }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Palavra exibida na grade"
          className="flex flex-wrap gap-1.5"
        >
          {words.map((w, i) => (
            <button
              key={w}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={`h-6 rounded-sm px-2 font-mono text-[11.5px] transition-colors duration-100 ${
                i === index
                  ? "bg-accent text-on-accent"
                  : "bg-button-2 text-text hover:bg-button-2-hover"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex items-center gap-[3px] text-[11.5px] text-text-2"
        >
          Menos
          {LEVEL.map((c) => (
            <span key={c} className={`mx-[1px] size-3 rounded-[2px] ${c}`} />
          ))}
          Mais
        </div>
      </div>
    </section>
  );
}
