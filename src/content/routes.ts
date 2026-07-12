import {
  SITE_URL,
  canonicalUrl,
  flattenRoutes,
  type RouteCollection,
  type RouteDef,
} from "@/lib/seo";
import { projectsPage } from "./home";
import { byOrder } from "./projects";
import { site } from "./site";

/**
 * Registro das coleções de rotas (doc 09 §1): a fonte única de pre-render,
 * sitemap, canonical e testes de contrato. Coleção nova na v2 (Writing,
 * Resume) entra aqui — o sistema de SEO não muda. `/resume` só nasce quando
 * a rota existir (ADR-0006); o sitemap a incorpora automaticamente.
 */

/** JSON-LD Person + WebSite da home (doc 09 §8). LinkedIn entra via `site.social` quando existir. */
const homeJsonLd: Record<string, unknown>[] = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: SITE_URL,
    sameAs: site.social.map((s) => s.url),
    knowsAbout: [...new Set(byOrder.flatMap((p) => p.tags))],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: SITE_URL,
  },
];

/** BreadcrumbList Home → Projetos → case (doc 09 §8). */
const caseJsonLd = (name: string, path: string): Record<string, unknown>[] => [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projetos",
        item: canonicalUrl("/projetos"),
      },
      { "@type": "ListItem", position: 3, name, item: canonicalUrl(path) },
    ],
  },
];

const pages: RouteCollection = {
  name: "pages",
  routes: [
    { path: "/", seo: site.seo, ogType: "website", jsonLd: homeJsonLd },
    { path: "/projetos", seo: projectsPage.seo, ogType: "website" },
  ],
};

const projects: RouteCollection = {
  name: "projects",
  routes: byOrder.map((project) => {
    const path = `/projetos/${project.slug}`;
    return {
      path,
      seo: project.seo,
      ogType: "article" as const,
      jsonLd: caseJsonLd(project.name, path),
    };
  }),
};

export const routeCollections: RouteCollection[] = [pages, projects];

/** Todas as rotas pré-renderizáveis, na ordem das coleções. */
export const routes: RouteDef[] = flattenRoutes(routeCollections);

/** 404 (doc 05 §4, doc 09 §6): pré-renderizada como `404.html`, fora do sitemap. */
export const notFoundRoute: RouteDef = {
  path: "/404",
  seo: { title: "Página não encontrada · Francisco Pedro", description: "" },
  ogType: "website",
  noindex: true,
};
