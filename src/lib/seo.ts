import { useEffect } from "react";
import type { SeoMeta } from "@/content/types";

/**
 * Host canônico único (doc 09 §5): todo URL absoluto do site — canonical,
 * OG, sitemap, robots, JSON-LD — deriva desta constante. Enquanto o domínio
 * https://franciscopedro.dev não estiver ativo, ela aponta para o endereço
 * do deploy na Vercel; ativar o domínio definitivo é alterar só esta linha.
 */
export const SITE_URL = "https://franciscopedro-dev.vercel.app";

/** OG image default do site (doc 10 §4); específica por case quando houver screenshots. */
const OG_IMAGE = {
  path: "/og/site-og-default.png",
  alt: "Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados — franciscopedro.dev",
};

const OG_SITE_NAME = "Francisco Pedro";
const OG_LOCALE = "pt_BR";

/**
 * Rota pré-renderizável (doc 09 §1): o conteúdo declara, o sistema deriva
 * canonical, head, sitemap e pre-render — nenhuma página existe sem SEO.
 */
export interface RouteDef {
  /** Caminho absoluto sem barra final ("/" apenas na raiz). */
  path: string;
  seo: SeoMeta;
  /** `website` (home, índices) ou `article` (cases, posts v2) — doc 09 §4. */
  ogType: "website" | "article";
  /** Fora do índice dos buscadores (404 — doc 09 §6). */
  noindex?: boolean;
  /** Dados estruturados da página (doc 09 §8). */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Coleção de rotas com a mesma fonte de conteúdo (doc 09 §1). Página nova na
 * v2 (Writing, Resume) = coleção nova registrada em `src/content/routes.ts`;
 * o sistema não muda.
 */
export interface RouteCollection {
  name: string;
  routes: RouteDef[];
}

export const flattenRoutes = (collections: RouteCollection[]): RouteDef[] =>
  collections.flatMap((c) => c.routes);

/** https, sem www, sem barra final — exceto a raiz (doc 09 §5). */
export const canonicalUrl = (path: string): string =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * Bloco de head de uma rota (doc 09 §2–6, §8), gravado no HTML estático pelo
 * pre-render (ADR-0010). Páginas `noindex` emitem só título e robots — um
 * 404 não precisa competir por snippet.
 */
export function headTags(route: RouteDef): string {
  const title = escapeHtml(route.seo.title);
  const lines = [`<title>${title}</title>`];

  if (route.noindex) {
    lines.push(`<meta name="robots" content="noindex" />`);
    return lines.join("\n    ");
  }

  const description = escapeHtml(route.seo.description);
  const url = canonicalUrl(route.path);
  lines.push(
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta property="og:site_name" content="${OG_SITE_NAME}" />`,
    `<meta property="og:locale" content="${OG_LOCALE}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}${OG_IMAGE.path}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`
  );

  for (const schema of route.jsonLd ?? []) {
    // `<` escapado impede fechamento prematuro da tag script (JSON válido).
    const json = JSON.stringify(schema).replaceAll("<", "\\u003c");
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }

  return lines.join("\n    ");
}

/**
 * sitemap.xml da mesma lista de rotas do pre-render (doc 09 §7) — fonte
 * única, impossível divergirem. Sem priority/changefreq; lastmod do build.
 */
export function sitemapXml(routes: RouteDef[], buildDate: Date): string {
  const lastmod = buildDate.toISOString().slice(0, 10);
  const urls = routes
    .filter((route) => !route.noindex)
    .map(
      (route) =>
        `  <url>\n    <loc>${canonicalUrl(route.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** robots.txt (doc 09 §6): tudo liberado + localização do sitemap. */
export const robotsTxt = (): string =>
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

/**
 * Título por rota na navegação client-side; o HTML estático de cada rota já
 * nasce com o head completo (ADR-0010).
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
