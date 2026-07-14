import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";
import { DEFAULTS, readWorkbench, setWorkbench } from "@/lib/workbench";

/**
 * Comportamento do rail + painel lateral (doc 04 §6.13–6.14, ADR-0012): o
 * rail comuta a `activeView` e recolhe a sidebar; a navegação, o SEO e os
 * contratos seguem derivados da URL.
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

describe("ActivityBar + SidePanel", () => {
  it("comuta o painel lateral para Settings e volta para Explorer", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      screen.getByRole("navigation", { name: "Explorador" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByText("Appearance")).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Explorador" })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Explorer" }));
    expect(
      screen.getByRole("navigation", { name: "Explorador" })
    ).toBeInTheDocument();
  });

  it("recolhe a sidebar ao reclicar no painel já ativo", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(readWorkbench().sidebarCollapsed).toBe(false);

    // Reclicar o painel ativo alterna o colapso (desktop) / drawer (mobile).
    await user.click(screen.getByRole("button", { name: "Explorer" }));
    expect(readWorkbench().sidebarCollapsed).toBe(true);

    await user.click(screen.getByRole("button", { name: "Explorer" }));
    expect(readWorkbench().sidebarCollapsed).toBe(false);
  });
});
