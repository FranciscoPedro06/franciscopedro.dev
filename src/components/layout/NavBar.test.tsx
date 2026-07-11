import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { NavBar } from "./NavBar";

function renderNavBar() {
  return render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
}

describe("NavBar", () => {
  it("exibe todos os itens de navegação e o acesso ao currículo", () => {
    renderNavBar();
    for (const item of site.nav) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href
      );
    }
    expect(screen.getByRole("link", { name: "Currículo" })).toHaveAttribute(
      "href",
      "/resume"
    );
  });

  it("abre o menu mobile como dialog e fecha com Escape", async () => {
    const user = userEvent.setup();
    renderNavBar();

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    // AnimatePresence mantém o dialog montado até o fim da animação de saída
    await waitFor(() =>
      expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument()
    );
  });
});
