import { describe, expect, it } from "vitest";
import { projects, highlighted } from "./projects";
import { CASE_SECTION_KINDS } from "./types";

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

  it("segue a ordem canônica de seções, sem repetição (doc 03 §6)", () => {
    for (const p of projects) {
      const indices = p.sections.map((s) =>
        CASE_SECTION_KINDS.indexOf(s.kind)
      );
      expect(indices, p.slug).not.toContain(-1);
      expect(new Set(indices).size, p.slug).toBe(indices.length);
      expect(indices, p.slug).toEqual([...indices].sort((a, b) => a - b));
    }
  });

  it("nenhuma seção publica vazia; diagramas têm descrição acessível", () => {
    for (const p of projects) {
      for (const s of p.sections) {
        expect(s.title.length, `${p.slug}/${s.kind}`).toBeGreaterThan(0);
        const conteudo = s.paragraphs.length + (s.items?.length ?? 0);
        expect(conteudo, `${p.slug}/${s.kind}`).toBeGreaterThan(0);
        for (const paragraph of s.paragraphs) {
          expect(paragraph.trim().length, `${p.slug}/${s.kind}`).toBeGreaterThan(0);
        }
        for (const item of s.items ?? []) {
          expect(item.title.trim().length, `${p.slug}/${s.kind}`).toBeGreaterThan(0);
          expect(item.body.trim().length, `${p.slug}/${s.kind}`).toBeGreaterThan(0);
        }
        if (s.diagram) {
          expect(s.diagram.ariaLabel.length, `${p.slug}/${s.kind}`).toBeGreaterThan(20);
        }
      }
    }
  });

  it("o case principal cobre a estrutura mínima do doc 03 §6", () => {
    const fastpass = projects.find((p) => p.featured);
    const kinds = fastpass?.sections.map((s) => s.kind) ?? [];
    for (const kind of [
      "problema",
      "objetivo",
      "arquitetura",
      "decisoes",
      "desafios",
      "resultados",
      "aprendizados",
    ]) {
      expect(kinds, kind).toContain(kind);
    }
    const arquitetura = fastpass?.sections.find((s) => s.kind === "arquitetura");
    expect(arquitetura?.diagram, "diagrama de arquitetura").toBeDefined();
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
