import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";
import { DEFAULTS, readWorkbench, setWorkbench } from "@/lib/workbench";

/**
 * Command Palette (doc 04 §6.23): Ctrl+Shift+P abre o modal (lazy); buscar +
 * Enter executa uma ação real. Aqui: abrir e rodar "View: Settings".
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

describe("CommandPalette", () => {
  it("abre por Ctrl+Shift+P e executa um comando", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.keyboard("{Control>}{Shift>}P{/Shift}{/Control}");

    const dialog = await screen.findByRole("dialog", { name: "Paleta de comandos" });
    const input = within(dialog).getByRole("combobox");

    await user.type(input, "settings");
    await user.keyboard("{Enter}");

    // O comando trocou a view do painel para Settings e fechou a paleta.
    expect(await screen.findByText("Appearance")).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: "Paleta de comandos" })
    ).not.toBeInTheDocument();
    expect(readWorkbench().activeView).toBe("settings");
  });
});
