import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";
import { DEFAULTS, readWorkbench, setWorkbench } from "@/lib/workbench";

/**
 * Multi-tab do editor (doc 04 §6.15, ADR-0012): abrir um arquivo cria a aba
 * (conjunto persistido); a aba ativa deriva da URL; fechar remove e navega ao
 * vizinho. `overview.tsx` é fixa (não fecha).
 */
beforeEach(() => {
  localStorage.clear();
  setWorkbench({ ...DEFAULTS });
});

const tabs = () => screen.getByRole("navigation", { name: "Arquivos abertos" });

describe("EditorTabs (multi-tab)", () => {
  it("abre a aba do arquivo atual e a fecha voltando ao vizinho", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/projetos"]}>
        <App />
      </MemoryRouter>
    );

    // A aba do arquivo aberto entrou ao lado da overview (fixa).
    expect(within(tabs()).getByRole("link", { name: "projetos" })).toBeInTheDocument();
    expect(within(tabs()).getByRole("link", { name: "overview.tsx" })).toBeInTheDocument();
    expect(readWorkbench().openTabs).toContain("/projetos");

    // overview não é fechável.
    expect(
      within(tabs()).queryByRole("button", { name: "Fechar overview.tsx" })
    ).not.toBeInTheDocument();

    await user.click(within(tabs()).getByRole("button", { name: "Fechar projetos" }));

    expect(within(tabs()).queryByRole("link", { name: "projetos" })).not.toBeInTheDocument();
    expect(within(tabs()).getByRole("link", { name: "overview.tsx" })).toBeInTheDocument();
    expect(readWorkbench().openTabs).not.toContain("/projetos");
  });
});
