// @vitest-environment node
import { describe, expect, it } from "vitest";
import { render } from "./entry-server";

/**
 * Smoke test do pre-render (ADR-0010): o HTML estático de cada tipo de rota
 * carrega o conteúdo real — inclusive das rotas em React.lazy, que o
 * renderToPipeableStream precisa esperar (o fallback do Suspense é vazio).
 */
describe("entry-server (pre-render)", () => {
  it("renderiza a home com o conteúdo do hero", async () => {
    const html = await render("/");
    expect(html).toContain("Francisco Pedro");
    expect(html).toContain("FastPass");
  });

  it("renderiza uma rota lazy com o conteúdo do case, não o fallback", async () => {
    const html = await render("/projetos/fastpass");
    expect(html).toContain("Decisões técnicas");
    expect(html).toContain("EmbarqueService");
  });

  it("renderiza o índice de projetos com os 5 cards", async () => {
    const html = await render("/projetos");
    expect(html).toContain("Todos os projetos");
    expect(html).toContain("Carrinho Inteligente");
  });

  it("renderiza a 404 para rota desconhecida", async () => {
    const html = await render("/rota-que-nao-existe");
    expect(html).toContain("Página não encontrada");
  });
});
