import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Home } from "./Home";

describe("Home", () => {
  it("apresenta as 7 seções na ordem aprovada (doc 03 §4)", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const headings = screen
      .getAllByRole("heading")
      .map((h) => h.textContent ?? "");

    const expectedOrder = [
      "Francisco Pedro", // Hero (h1)
      "Estudos de caso", // Featured Work
      "Como eu construo", // Engineering
      "O outro lado do ciclo", // Data
      "Dois anos, medidos em projetos", // Timeline
      "Software e dados, no mesmo ciclo", // About
      "Vamos conversar", // Contact
    ];

    const indices = expectedOrder.map((title) =>
      headings.findIndex((text) => text === title)
    );
    for (const [i, index] of indices.entries()) {
      expect(index, `seção "${expectedOrder[i]}" ausente`).toBeGreaterThanOrEqual(0);
    }
    expect(indices).toEqual([...indices].sort((a, b) => a - b));
  });

  it("destaca 3 estudos de caso com link para o índice completo", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const caseLinks = screen.getAllByRole("link", { name: /Ver estudo de caso/ });
    expect(caseLinks).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: /Ver todos os projetos/ })
    ).toHaveAttribute("href", "/projetos");
  });
});
