import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";
import { DEFAULTS, setWorkbench } from "@/lib/workbench";

/**
 * Search view (doc 04 §6.21): filtro instantâneo sobre conteúdo existente. O
 * painel é lazy — o rail o abre e o índice já cobre views, cases e trajetória.
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

describe("SearchPanel", () => {
  it("abre pelo rail e filtra o conteúdo em tempo real", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(screen.getByRole("button", { name: "Search" }));

    const input = await screen.findByLabelText("Buscar no portfolio");
    await user.type(input, "reviva");

    // O conteúdo do Reviva (case + trajetória) entra nos resultados.
    expect(screen.getAllByText(/reviva/i).length).toBeGreaterThan(0);

    await user.clear(input);
    await user.type(input, "zzqqxx");
    expect(screen.getByText("0 resultados")).toBeInTheDocument();
  });
});
