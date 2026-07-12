import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { notFoundRoute, routes } from "@/content/routes";
import {
  SITE_URL,
  canonicalUrl,
  headTags,
  robotsTxt,
  sitemapXml,
} from "./seo";

/** Contratos do doc 09: nenhuma página existe sem SEO completo. */
describe("contratos de SEO (doc 09 §1)", () => {
  it("SITE_URL é https, sem www e sem barra final", () => {
    expect(SITE_URL).toMatch(/^https:\/\//);
    expect(SITE_URL).not.toMatch(/\/\/www\./);
    expect(SITE_URL).not.toMatch(/\/$/);
  });

  it("títulos ≤ 60 caracteres (exceção registrada: home, doc 09 §1)", () => {
    for (const route of routes) {
      const limit = route.path === "/" ? 70 : 60;
      expect(route.seo.title.length, route.path).toBeLessThanOrEqual(limit);
    }
  });

  it("descriptions entre 70 e 160 caracteres", () => {
    for (const route of routes) {
      expect(route.seo.description.length, route.path).toBeGreaterThanOrEqual(70);
      expect(route.seo.description.length, route.path).toBeLessThanOrEqual(160);
    }
  });

  it("todo projeto tem rota própria e nenhum caminho se repete", () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const project of projects) {
      expect(paths).toContain(`/projetos/${project.slug}`);
    }
  });

  it("canonical sem barra final, exceto a raiz (doc 09 §5)", () => {
    expect(canonicalUrl("/")).toBe(`${SITE_URL}/`);
    for (const route of routes) {
      const url = canonicalUrl(route.path);
      expect(url, route.path).toMatch(new RegExp(`^${SITE_URL}`));
      if (route.path !== "/") expect(url, route.path).not.toMatch(/\/$/);
    }
  });
});

describe("head por rota (doc 09 §2–6, §8)", () => {
  it("emite título (escapado), description, canonical e OG completo", () => {
    const home = routes.find((r) => r.path === "/");
    const head = headTags(home!);
    expect(head).toContain(
      "<title>Francisco Pedro — Desenvolvedor de Sistemas &amp; Analista de Dados</title>"
    );
    expect(head).toContain(`<link rel="canonical" href="${SITE_URL}/" />`);
    expect(head).toContain(`<meta property="og:url" content="${SITE_URL}/" />`);
    expect(head).toContain(
      `<meta property="og:image" content="${SITE_URL}/og/site-og-default.png" />`
    );
    expect(head).toContain('<meta name="twitter:card" content="summary_large_image" />');
    expect(head).toContain('"@type":"Person"');
    expect(head).toContain('"@type":"WebSite"');
  });

  it("cases são og:type article com BreadcrumbList", () => {
    const caseRoute = routes.find((r) => r.path === "/projetos/fastpass");
    const head = headTags(caseRoute!);
    expect(head).toContain('<meta property="og:type" content="article" />');
    expect(head).toContain('"@type":"BreadcrumbList"');
  });

  it("404 emite noindex e nada indexável (doc 09 §6)", () => {
    const head = headTags(notFoundRoute);
    expect(head).toContain('<meta name="robots" content="noindex" />');
    expect(head).not.toContain("canonical");
    expect(head).not.toContain("og:");
  });
});

describe("sitemap e robots (doc 09 §6–7)", () => {
  it("sitemap contém exatamente as rotas indexáveis", () => {
    const xml = sitemapXml(routes, new Date("2026-07-12"));
    for (const route of routes) {
      expect(xml).toContain(`<loc>${canonicalUrl(route.path)}</loc>`);
    }
    expect(xml).not.toContain("/404");
    expect(xml).toContain("<lastmod>2026-07-12</lastmod>");
    expect(xml.match(/<url>/g)).toHaveLength(routes.length);
  });

  it("robots.txt libera tudo e aponta o sitemap", () => {
    const txt = robotsTxt();
    expect(txt).toContain("Allow: /");
    expect(txt).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
