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

    // 9 = rotas indexáveis (home, índice e 6 cases) + 404 (ADR-0010) —
    // derivado do registro de rotas, nunca texto fixo.
    const chip = screen.getByRole("button", {
      name: "Build: 9 páginas pré-renderizadas. Abrir painel Output",
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

  it("o terminal aceita comandos e roda a mini-missão do Linux Lab", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Alternar terminal" }));
    const input = await screen.findByRole("textbox", { name: "Comando do terminal" });

    await user.type(input, "cat linux-lab{Enter}");
    const log = screen.getByRole("log", { name: "Saída do terminal" });
    expect(log).toHaveTextContent("github.com/FranciscoPedro06/linux-lab-api");

    await user.type(input, "lab{Enter}chmod u=rwx,go= deploy.sh{Enter}validar{Enter}");
    expect(log).toHaveTextContent("esperado 0700, encontrado 0700");
    expect(log).toHaveTextContent("Missão concluída.");

    await user.type(input, "exit{Enter}nao-existe{Enter}");
    expect(log).toHaveTextContent("nao-existe: comando não encontrado");
  });
});
