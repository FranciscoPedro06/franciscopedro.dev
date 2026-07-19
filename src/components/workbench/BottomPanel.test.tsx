import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";
import { DEFAULTS, setWorkbench } from "@/lib/workbench";

/**
 * Painel inferior (doc 04 §6.24): abre pela status bar (lazy), troca de abas
 * e fecha. Conteúdo honesto do projeto real.
 */
beforeEach(() => {
  localStorage.clear();
  setWorkbench({ ...DEFAULTS });
});

function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("BottomPanel", () => {
  it("abre pela status bar, troca de aba e fecha", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      screen.getByRole("button", { name: /Abrir painel Problems/ })
    );

    expect(
      await screen.findByRole("region", { name: "Painel inferior" })
    ).toBeInTheDocument();
    expect(screen.getByText("ESLint — 0 problemas")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Terminal" }));
    expect(screen.getByRole("tab", { name: "Terminal" })).toHaveAttribute(
      "aria-selected",
      "true"
    );

    await user.click(
      screen.getByRole("button", { name: "Fechar painel inferior" })
    );
    expect(
      screen.queryByRole("region", { name: "Painel inferior" })
    ).not.toBeInTheDocument();
  });

  it("o chip de build da status bar deriva do registro de rotas e abre o Output", async () => {
    const user = userEvent.setup();
    renderApp();

    // 8 = rotas indexáveis + 404 (ADR-0010) — derivado, nunca texto fixo.
    const chip = screen.getByRole("button", {
      name: "Build: 8 páginas pré-renderizadas. Abrir painel Output",
    });
    await user.click(chip);

    expect(
      await screen.findByRole("region", { name: "Painel inferior" })
    ).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Output" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
