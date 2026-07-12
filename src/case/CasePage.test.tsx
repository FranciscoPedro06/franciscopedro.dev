import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { fastpass } from "@/content/projects/fastpass";
import { projects } from "@/content/projects";
import { CasePage } from "./CasePage";
import { DIAGRAMS } from "./diagrams";

function renderCase(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/projetos/${slug}`]}>
      <Routes>
        <Route path="/projetos/:slug" element={<CasePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("CasePage", () => {
  it("renderiza as seções presentes na ordem do conteúdo e omite as ausentes", () => {
    renderCase("fastpass");

    const headings = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(headings).toEqual(fastpass.sections.map((s) => s.title));

    // FastPass não tem "Pesquisa" — a seção some, nunca vira placeholder
    expect(screen.queryByText("Pesquisa")).toBeNull();
  });

  it("numera as decisões técnicas e lista os desafios sem numeração", () => {
    renderCase("fastpass");

    const decisoes = document.getElementById("decisoes");
    expect(decisoes?.querySelector("ol")).not.toBeNull();
    const desafios = document.getElementById("desafios");
    expect(desafios?.querySelector("ul")).not.toBeNull();
  });

  it("exibe o índice lateral com um link por seção", () => {
    renderCase("fastpass");

    const indice = screen.getByRole("navigation", {
      name: "Seções deste estudo de caso",
    });
    const links = within(indice).getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual(
      fastpass.sections.map((s) => `/projetos/fastpass#${s.kind}`)
    );
  });

  it("renderiza o diagrama de arquitetura com descrição acessível", () => {
    renderCase("fastpass");

    expect(
      screen.getByRole("img", { name: /Diagrama de arquitetura do FastPass/ })
    ).toBeInTheDocument();
  });

  it("todo diagrama referenciado no conteúdo existe no registro", () => {
    for (const project of projects) {
      for (const section of project.sections) {
        if (section.diagram) {
          expect(DIAGRAMS[section.diagram.id], section.diagram.id).toBeDefined();
        }
      }
    }
  });

  it("mantém a navegação anterior/próximo", () => {
    renderCase("fastpass");

    const nav = screen.getByRole("navigation", { name: "Outros projetos" });
    expect(
      within(nav).getByRole("link", { name: /API de Reconhecimento Facial/ })
    ).toBeInTheDocument();
  });

  it("cai na página 404 para slug inexistente", () => {
    renderCase("nao-existe");
    expect(
      screen.getByRole("heading", { name: "Página não encontrada" })
    ).toBeInTheDocument();
  });
});
