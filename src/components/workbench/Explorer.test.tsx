import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";
import { DEFAULTS, readWorkbench, setWorkbench } from "@/lib/workbench";

/**
 * Árvore do Explorer (doc 04 §6.14, ADR-0012): pastas recolhem e o estado
 * persiste no store. Navegação/URL seguem intactas.
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

const explorer = () => screen.getByRole("navigation", { name: "Explorador" });

describe("Explorer", () => {
  it("recolhe a pasta src e persiste o estado", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      within(explorer()).getByRole("link", { name: "overview.tsx" })
    ).toBeInTheDocument();

    await user.click(within(explorer()).getByRole("button", { name: "src" }));

    expect(
      within(explorer()).queryByRole("link", { name: "overview.tsx" })
    ).not.toBeInTheDocument();
    expect(readWorkbench().explorerExpanded.src).toBe(false);
  });

  it("recolhe apenas a subpasta projetos sem afetar as views", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      within(explorer()).getByRole("button", { name: /projetos/ })
    );

    expect(readWorkbench().explorerExpanded.projetos).toBe(false);
    // As views seguem visíveis (src continua aberta)
    expect(
      within(explorer()).getByRole("link", { name: "overview.tsx" })
    ).toBeInTheDocument();
  });
});
