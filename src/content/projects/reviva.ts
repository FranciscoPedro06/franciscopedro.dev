import type { Project } from "../types";

/** Fonte editorial: docs/05-content-strategy.md §3.5. Seções entram no S4. */
export const reviva: Project = {
  slug: "reviva",
  name: "Reviva",
  summary:
    "App de memórias com desbloqueio por data: o conteúdo fica selado até o dia que o usuário escolher.",
  badge: "ANDROID · 2025",
  tags: ["Java", "Android", "Firebase"],
  links: {
    github: [
      { label: "Repositório", url: "https://github.com/FranciscoPedro06/reviva-app" },
    ],
  },
  seo: {
    title: "Reviva — estudo de caso · Francisco Pedro",
    description:
      "App Android de memórias com desbloqueio por data. Java, Firebase e as decisões de produto por trás da trava de tempo.",
  },
  media: [],
  sections: [],
  order: 5,
};
