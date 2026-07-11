import { describe, expect, it } from "vitest";
import { projects, highlighted } from "./projects";

/** Contrato dos estudos de caso (ADR-0003; limites de SEO do doc 09 §1). */
describe("contrato de conteúdo: projects", () => {
  it("tem 5 projetos com slugs e ordens únicos", () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(5);
    expect(new Set(projects.map((p) => p.order)).size).toBe(5);
  });

  it("tem exatamente 1 destaque e 3 na Featured Work (doc 05 §2.3)", () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1);
    expect(highlighted).toHaveLength(3);
    expect(highlighted[0]?.featured).toBe(true);
  });

  it("respeita os limites de SEO (título ≤60, description 70–160)", () => {
    for (const p of projects) {
      expect(p.seo.title.length, p.slug).toBeLessThanOrEqual(60);
      expect(p.seo.description.length, p.slug).toBeGreaterThanOrEqual(70);
      expect(p.seo.description.length, p.slug).toBeLessThanOrEqual(160);
    }
  });

  it("tem resumo, badge, tags e repositórios válidos", () => {
    for (const p of projects) {
      expect(p.summary.length, p.slug).toBeGreaterThan(40);
      expect(p.summary.length, p.slug).toBeLessThanOrEqual(200);
      expect(p.badge.length, p.slug).toBeGreaterThan(0);
      expect(p.tags.length, p.slug).toBeGreaterThanOrEqual(1);
      expect(p.tags.length, p.slug).toBeLessThanOrEqual(6);
      expect(p.links.github.length, p.slug).toBeGreaterThanOrEqual(1);
      for (const repo of p.links.github) {
        expect(repo.url, p.slug).toMatch(/^https:\/\/github\.com\//);
        expect(repo.label.length, p.slug).toBeGreaterThan(0);
      }
    }
  });

  it("não publica mídia sem alt (doc 12 §7)", () => {
    for (const p of projects) {
      for (const media of p.media) {
        expect(media.alt.length, p.slug).toBeGreaterThan(0);
        expect(media.width, p.slug).toBeGreaterThan(0);
        expect(media.height, p.slug).toBeGreaterThan(0);
      }
    }
  });
});
