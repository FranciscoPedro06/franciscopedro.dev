import type { Project } from "../types";

/** Fonte editorial: docs/05-content-strategy.md §3.2. Seções entram no S4. */
export const reconhecimentoFacial: Project = {
  slug: "reconhecimento-facial",
  name: "API de Reconhecimento Facial",
  summary:
    "API de biometria facial com FastAPI e DeepFace. Nasceu num projeto escolar e evoluiu até virar o serviço de identidade do FastPass.",
  badge: "MICROSERVIÇO",
  tags: ["Python", "FastAPI", "DeepFace", "Facenet512", "Supabase", "Docker"],
  links: {
    github: [
      { label: "Repositório", url: "https://github.com/FranciscoPedro06/face-id" },
    ],
  },
  seo: {
    title: "Reconhecimento Facial — estudo de caso · Francisco Pedro",
    description:
      "De script escolar a microserviço de identidade: FastAPI, DeepFace e as decisões por trás de uma API de biometria facial em produção.",
  },
  media: [],
  sections: [],
  order: 2,
  highlight: true,
};
