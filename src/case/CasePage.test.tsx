import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { fastpass } from "@/content/projects/fastpass";
import { projects } from "@/content/projects";
import { CASE_SECTION_KINDS } from "@/content/types";
import { CasePage } from "./CasePage";
import { caseTabs } from "./caseTabs";
import { DIAGRAMS } from "./diagrams";

function renderCase(path: string) {
  return render(
    <MemoryRouter initialEntries={[path.startsWith("/") ? path : `/projetos/${path}`]}>
      <Routes>
        <Route path="/projetos/:slug" element={<CasePage />} />
      </Routes>
    </MemoryRouter>
  );
}

/** Títulos das seções canônicas no HTML, em ordem — inclusive nas abas ocultas. */
const sectionTitles = () =>
  [...document.querySelectorAll("section[id] > h2")].map((h) => h.textContent);

describe("CasePage", () => {
  it("renderiza as seções presentes na ordem do conteúdo e omite as ausentes", () => {
    renderCase("fastpass");

    expect(sectionTitles()).toEqual(fastpass.sections.map((s) => s.title));
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

  it("exibe as abas do estudo de caso como links de hash", () => {
    renderCase("fastpass");

    const abas = screen.getByRole("navigation", {
      name: "Seções deste estudo de caso",
    });
    const links = within(abas).getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual(
      caseTabs(fastpass).map((tab) => `/projetos/fastpass#${tab.id}`)
    );
    // Sem hash, a primeira aba (Visão geral) é a visível.
    expect(screen.getByRole("heading", { level: 2, name: "Problema" })).toBeVisible();
    expect(
      screen.queryByRole("heading", { level: 2, name: "Decisões técnicas" })
    ).toBeNull();
  });

  it("abre a aba pelo hash da aba ou da seção (links antigos seguem valendo)", () => {
    const view = renderCase("/projetos/fastpass#desafios");
    expect(
      screen.getByRole("heading", { level: 2, name: "Desafios e soluções" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Problema" })).toBeNull();
    view.unmount();

    renderCase("/projetos/fastpass#arquitetura");
    expect(
      screen.getByRole("img", { name: /Diagrama de arquitetura do FastPass/ })
    ).toBeInTheDocument();
  });

  it("todos os cases contam a história completa, do problema aos aprendizados", () => {
    for (const project of projects) {
      const kinds = project.sections.map((s) => s.kind);
      expect(kinds.length, project.slug).toBeGreaterThan(0);
      expect(kinds[0], project.slug).toBe("problema");
      expect(kinds[kinds.length - 1], project.slug).toBe("aprendizados");

      // As seções presentes seguem a ordem canônica do doc 03 §6
      const positions = kinds.map((k) => CASE_SECTION_KINDS.indexOf(k));
      expect(positions, project.slug).toEqual(
        [...positions].sort((a, b) => a - b)
      );
    }
  });

  it("renderiza cada um dos 6 cases com título, seções e trecho real de código", () => {
    for (const project of projects) {
      const view = renderCase(project.slug);

      expect(
        screen.getByRole("heading", { level: 1, name: project.name })
      ).toBeInTheDocument();
      expect(sectionTitles(), project.slug).toEqual(
        project.sections.map((s) => s.title)
      );
      expect(document.body.textContent, project.slug).toContain(
        project.code.code.split("\n")[0].trim()
      );

      view.unmount();
    }
  });

  it("renderiza os diagramas de arquitetura com descrição acessível", () => {
    for (const [slug, name] of [
      ["reconhecimento-facial", /Diagrama de arquitetura da API de Reconhecimento Facial/],
      ["carrinho-inteligente", /Diagrama de arquitetura do Carrinho Inteligente/],
      ["linux-lab", /Diagrama de arquitetura do Linux Lab/],
    ] as const) {
      const view = renderCase(`/projetos/${slug}#arquitetura`);
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
      view.unmount();
    }
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

  it("a mini-missão do Linux Lab aprova estados iguais e reprova os diferentes", async () => {
    const user = userEvent.setup();
    renderCase("/projetos/linux-lab#codigo");

    await user.click(screen.getByRole("button", { name: "chmod u=rwx,go= deploy.sh" }));
    expect(screen.getByText(/esperado 0700, encontrado 0700/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "chmod 755 deploy.sh" }));
    expect(screen.getByText(/esperado 0700, encontrado 0755/)).toBeInTheDocument();
  });

  it("mantém a navegação anterior/próximo", () => {
    renderCase("fastpass");

    const nav = screen.getByRole("navigation", { name: "Outros projetos" });
    expect(
      within(nav).getByRole("link", { name: /Linux Lab/ })
    ).toBeInTheDocument();
  });

  it("cai na página 404 para slug inexistente", () => {
    renderCase("nao-existe");
    expect(
      screen.getByRole("heading", { name: "Página não encontrada" })
    ).toBeInTheDocument();
  });
});
