import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "@/App";

/**
 * Varredura axe-core por tipo de página (doc 13). Zero violações é
 * contrato de CI; `color-contrast` fica de fora porque o jsdom não
 * renderiza pixels — contraste é AA por construção (doc 04 §2) e entra no
 * checklist manual (doc 06 §9) e no Lighthouse CI.
 */
async function axeViolations(path: string, readyHeading: RegExp) {
  const { container, unmount } = render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
  await screen.findByRole("heading", { level: 1, name: readyHeading });

  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  unmount();
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}

describe("acessibilidade automatizada (axe-core)", () => {
  it("home sem violações", async () => {
    expect(await axeViolations("/", /Francisco Pedro/)).toEqual([]);
  });

  it("índice de projetos sem violações", async () => {
    expect(await axeViolations("/projetos", /Todos os projetos/)).toEqual([]);
  });

  it("página de case sem violações", async () => {
    expect(await axeViolations("/projetos/fastpass", /FastPass/)).toEqual([]);
  });

  it("404 sem violações", async () => {
    expect(await axeViolations("/nao-existe", /Página não encontrada/)).toEqual([]);
  });
});
