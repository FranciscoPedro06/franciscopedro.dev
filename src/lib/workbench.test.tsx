import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/workbench/ThemeToggle";
import {
  DEFAULTS,
  readWorkbench,
  setWorkbench,
  toggleTheme,
} from "@/lib/workbench";

/**
 * Contrato do shell (ADR-0012) e do theming (ADR-0013). O `axe` não pinta
 * pixels, então contraste do tema claro é medido à parte (doc 04 §1.5); aqui
 * garantimos o mecanismo: default de SSR, persistência e troca de `data-theme`.
 */
beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  setWorkbench({ ...DEFAULTS });
});

describe("workbench shell state", () => {
  it("o default (contrato de SSR) é o tema escuro", () => {
    expect(DEFAULTS.theme).toBe("dark");
  });

  it("setWorkbench persiste em localStorage e aplica o tema ao DOM", () => {
    setWorkbench({ theme: "light" });

    expect(readWorkbench().theme).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    const stored = JSON.parse(localStorage.getItem("fp.workbench.v1") ?? "{}");
    expect(stored.theme).toBe("light");
  });

  it("toggleTheme alterna entre escuro e claro", () => {
    expect(readWorkbench().theme).toBe("dark");
    toggleTheme();
    expect(readWorkbench().theme).toBe("light");
    toggleTheme();
    expect(readWorkbench().theme).toBe("dark");
  });
});

describe("ThemeToggle", () => {
  it("reflete o tema atual e o alterna ao clicar", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /Alternar tema/ });
    expect(button).toHaveAccessibleName(/escuro/);

    await user.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(button).toHaveAccessibleName(/claro/);
  });
});
