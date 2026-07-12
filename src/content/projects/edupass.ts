import type { Project } from "../types";

/** Fonte editorial: docs/05-content-strategy.md §3.4. Seções entram no S4. */
export const edupass: Project = {
  slug: "edupass",
  name: "EduPass",
  summary:
    "Plataforma de transporte estudantil com confirmação de embarque por biometria. Web, API e app — meu primeiro ecossistema.",
  badge: "EM EQUIPE · 2025",
  tags: ["JavaScript", "Firebase", "Supabase", "FastAPI", "Expo"],
  links: {
    github: [
      { label: "Web", url: "https://github.com/FranciscoPedro06/EduPass" },
      {
        label: "API facial",
        url: "https://github.com/FranciscoPedro06/edupass-backend",
      },
      { label: "App", url: "https://github.com/FranciscoPedro06/edupass-app" },
    ],
  },
  seo: {
    title: "EduPass — estudo de caso · Francisco Pedro",
    description:
      "Plataforma de transporte estudantil com confirmação de embarque por biometria facial. Web, API e app mobile construídos em equipe.",
  },
  media: [],
  sections: [],
  order: 4,
};
