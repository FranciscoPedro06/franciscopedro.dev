/**
 * Pre-render das rotas para HTML estático (ADR-0010, doc 06 §6, doc 09).
 * Roda após `vite build` (cliente) + `vite build --ssr` (bundle em
 * dist-server/): renderiza cada rota da fonte única, injeta o head por rota
 * no template e grava sitemap.xml + robots.txt derivados da mesma lista.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const SERVER_BUNDLE = "dist-server/entry-server.js";
const SEO_START = "<!-- seo:start";
const SEO_END = "<!-- seo:end -->";

const { render, headTags, sitemapXml, robotsTxt, routes, notFoundRoute } =
  await import(pathToFileURL(path.resolve(SERVER_BUNDLE)).href);

const template = await readFile(path.join(DIST, "index.html"), "utf8");

/** Substitui o bloco seo do template e injeta o HTML da rota no #root. */
function buildHtml(head, appHtml) {
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);
  if (start === -1 || end === -1) {
    throw new Error("index.html sem os marcadores seo:start/seo:end");
  }

  const withHead =
    template.slice(0, start) + head + template.slice(end + SEO_END.length);

  const rootTag = '<div id="root"></div>';
  if (!withHead.includes(rootTag)) {
    throw new Error("index.html sem <div id=\"root\"></div> vazio");
  }
  return withHead.replace(rootTag, `<div id="root">${appHtml}</div>`);
}

/** "/" → dist/index.html · "/projetos/fastpass" → dist/projetos/fastpass/index.html */
async function writeRoute(route) {
  const html = buildHtml(headTags(route), await render(route.path));
  const dir = path.join(DIST, ...route.path.split("/").filter(Boolean));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
  return path.join(dir, "index.html");
}

const written = [];
for (const route of routes) {
  written.push(await writeRoute(route));
}

// 404.html: a Vercel a serve para toda rota sem HTML próprio (doc 09 §6).
const notFoundHtml = buildHtml(
  headTags(notFoundRoute),
  await render(notFoundRoute.path)
);
await writeFile(path.join(DIST, "404.html"), notFoundHtml);
written.push(path.join(DIST, "404.html"));

await writeFile(path.join(DIST, "sitemap.xml"), sitemapXml(routes, new Date()));
await writeFile(path.join(DIST, "robots.txt"), robotsTxt());

// O bundle SSR é insumo do build, não artefato de deploy.
await rm("dist-server", { recursive: true, force: true });

console.log(
  `pre-render: ${written.length} páginas + sitemap.xml + robots.txt\n` +
    written.map((f) => `  ${f}`).join("\n")
);
