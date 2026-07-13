import type { SiteConfig } from "./types";

/** Textos e links globais — fonte editorial: docs/05-content-strategy.md. */
export const site: SiteConfig = {
  name: "Francisco Pedro",
  role: "Desenvolvedor de Sistemas & Analista de Dados",
  email: null, // [PENDENTE] doc 05 §7
  repositoryUrl: "https://github.com/FranciscoPedro06/franciscopedro.dev",
  resumeReady: false, // vira true quando o CV (PT/EN) for fornecido
  // No workbench (Release 0.6.1) cada item é uma view — a navegação
  // precisa alcançar todas; Trajetória e Sobre deixaram de ser "alcançáveis
  // por scroll" quando a página longa acabou.
  nav: [
    { label: "Projetos", href: "/#projetos" },
    { label: "Engenharia", href: "/#engenharia" },
    { label: "Dados", href: "/#dados" },
    { label: "Trajetória", href: "/#trajetoria" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Contato", href: "/#contato" },
  ],
  social: [
    {
      label: "GitHub",
      url: "https://github.com/FranciscoPedro06",
      external: true,
    },
    // LinkedIn: [PENDENTE] doc 05 §7
  ],
  seo: {
    title: "Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados",
    description:
      "Construo produtos digitais completos — web, mobile e APIs — e transformo os dados que eles geram em inteligência para o negócio. Destaque: FastPass.",
  },
};

export const footerCopy = {
  colophon: "React · Vite · TypeScript — o código deste site também é público.",
  copyright: "© 2026 Francisco Pedro",
};
