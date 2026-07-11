import { describe, expect, it } from "vitest";
import { site } from "./site";

/**
 * Teste de contrato do conteúdo (ADR-0003 / doc 06 §13): dados inválidos
 * quebram o CI, não a produção. Cresce junto com o modelo (projects,
 * timeline, resume) nos próximos sprints.
 */
describe("contrato de conteúdo: site", () => {
  it("navegação aponta apenas para âncoras da home ou rotas internas", () => {
    for (const item of site.nav) {
      expect(item.href).toMatch(/^\/(#[a-z-]+)?$|^\/[a-z-]+$/);
      expect(item.label.length).toBeGreaterThan(0);
    }
  });

  it("links sociais externos são https", () => {
    for (const link of site.social) {
      expect(link.url).toMatch(/^https:\/\//);
    }
  });

  it("seo da home está completo", () => {
    expect(site.seo.title).toContain(site.name);
    expect(site.seo.description.length).toBeGreaterThan(50);
    expect(site.seo.description.length).toBeLessThan(170);
  });
});
