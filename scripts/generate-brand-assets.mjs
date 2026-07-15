/**
 * Gera todos os assets de marca a partir dos tokens do design system.
 * Contrato: docs/10-brand-assets.md. Execução: `npm run assets:brand`.
 * Os PNGs gerados são commitados; o CI não roda este script.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

// Tokens (docs/04-design-system.md §1 — Dim Sage, Release 0.9, ADR-0016)
const C = {
  bg: "#0C110D",
  surface: "#141916",
  border: "#323934",
  text: "#E3E8E4",
  text2: "#B9C0BB",
  text3: "#8E9690",
  accent: "#5ACABA",
};

const FONT_DIR = "node_modules/@fontsource/jetbrains-mono/files";
const fonts = [
  {
    name: "JetBrains Mono",
    data: await readFile(`${FONT_DIR}/jetbrains-mono-latin-600-normal.woff`),
    weight: 600,
    style: "normal",
  },
  {
    name: "JetBrains Mono",
    data: await readFile(`${FONT_DIR}/jetbrains-mono-latin-400-normal.woff`),
    weight: 400,
    style: "normal",
  },
];

const div = (style, children) => ({ type: "div", props: { style, children } });
const span = (style, text) => ({ type: "span", props: { style, children: text } });

/** Monograma `fp.` em tile escuro (doc 10 §2). */
function monogramTile(size, { safeZone = false } = {}) {
  // Zona segura de 80% para ícones maskable: conteúdo menor, mesmo tile.
  const fontSize = size * (safeZone ? 0.3 : 0.4);
  return div(
    {
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: C.surface,
      border: `${Math.max(1, size / 64)}px solid ${C.border}`,
      borderRadius: size * 0.25,
      fontFamily: "JetBrains Mono",
      fontWeight: 600,
      fontSize,
    },
    [span({ color: C.text }, "fp"), span({ color: C.accent }, ".")]
  );
}

/** Composição Open Graph 1200×630 (doc 10 §4). `title` varia por template. */
function ogImage({ title, subtitle }) {
  return div(
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: C.bg,
      border: `2px solid ${C.border}`,
      padding: 72,
      fontFamily: "JetBrains Mono",
    },
    [
      div({ display: "flex", flexDirection: "column", marginTop: 96 }, [
        span(
          {
            color: C.text,
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          },
          title
        ),
        span({ color: C.text2, fontSize: 30, fontWeight: 400, marginTop: 28 }, subtitle),
      ]),
      div({ display: "flex", fontSize: 26, fontWeight: 600 }, [
        span({ color: C.text }, "franciscopedro"),
        span({ color: C.text3, fontWeight: 400 }, ".dev"),
      ]),
    ]
  );
}

async function renderSvg(node, width, height) {
  return satori(node, { width, height, fonts });
}

async function svgToPng(svg, widthPx) {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: widthPx } });
  return resvg.render().asPng();
}

await mkdir("public/icons", { recursive: true });
await mkdir("public/og", { recursive: true });

// favicon.svg — satori converte o texto em paths (não depende de fonte do SO)
const faviconSvg = await renderSvg(monogramTile(64), 64, 64);
await writeFile("public/favicon.svg", faviconSvg);

// App icons
const tile512 = await renderSvg(monogramTile(512, { safeZone: true }), 512, 512);
await writeFile("public/icons/icon-512.png", await svgToPng(tile512, 512));
await writeFile("public/icons/icon-192.png", await svgToPng(tile512, 192));

// Apple touch icon: 180px, fundo opaco, sem raio (o iOS aplica o dele)
const apple = await renderSvg(
  div(
    {
      width: 180,
      height: 180,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: C.surface,
      fontFamily: "JetBrains Mono",
      fontWeight: 600,
      fontSize: 72,
    },
    [span({ color: C.text }, "fp"), span({ color: C.accent }, ".")]
  ),
  180,
  180
);
await writeFile("public/apple-touch-icon.png", await svgToPng(apple, 180));

// OG default do site
const og = await renderSvg(
  ogImage({
    title: "Francisco Pedro",
    subtitle: "Desenvolvedor de Sistemas & Analista de Dados",
  }),
  1200,
  630
);
await writeFile("public/og/site-og-default.png", await svgToPng(og, 1200));

console.log("Brand assets gerados em public/.");
