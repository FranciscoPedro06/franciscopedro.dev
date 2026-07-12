import type { Project } from "../types";

/** Case de produto/equipe — fonte editorial: docs/05-content-strategy.md §3.4. */
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
  sections: [
    {
      kind: "problema",
      title: "Problema",
      paragraphs: [
        "O transporte estudantil municipal controla embarque com lista de papel: sem garantia de que quem embarca é o aluno cadastrado, sem histórico e sem visão para a administração.",
      ],
    },
    {
      kind: "objetivo",
      title: "Objetivo",
      paragraphs: [
        "Cadastro de estudantes e motoristas, confirmação de presença no embarque por biometria facial e um painel administrativo — para três perfis de usuário diferentes.",
      ],
    },
    {
      kind: "arquitetura",
      title: "Arquitetura",
      paragraphs: [
        "Aplicação web (23 telas em HTML/CSS/JS com Firebase Auth e Firestore), uma API de reconhecimento facial em FastAPI com DeepFace (embeddings no Supabase) e um app mobile em Expo/React Native iniciado como terceira superfície.",
      ],
    },
    {
      kind: "decisoes",
      title: "Decisões técnicas",
      paragraphs: [],
      items: [
        {
          title: "Biometria fora do app",
          body: "O reconhecimento facial nasceu como serviço separado desde o início — a decisão que permitiu reaproveitá-lo depois no FastPass.",
        },
        {
          title: "Firebase para acelerar",
          body: "Auth e Firestore resolveram autenticação e dados em dias, não semanas — a escolha certa para validar o produto com uma equipe de quatro estudantes.",
        },
      ],
    },
    {
      kind: "desafios",
      title: "Desafios e soluções",
      paragraphs: [],
      items: [
        {
          title: "Vanilla JS em 23 telas",
          body: "Sem framework, a duplicação entre telas cresceu rápido. Foi o projeto que me fez adotar React em seguida — dor sentida ensina mais que tutorial.",
        },
      ],
    },
    {
      kind: "resultados",
      title: "Resultados",
      paragraphs: [
        "Plataforma funcional com os três perfis e o fluxo de confirmação por biometria; a API facial seguiu viva e evoluiu para o FastPass.",
      ],
    },
    {
      kind: "aprendizados",
      title: "Aprendizados",
      paragraphs: [
        "Ecossistemas começam pequenos: o que parecia um detalhe do EduPass (a API facial) acabou sendo a peça de maior valor — componentes bem isolados sobrevivem ao projeto que os criou.",
      ],
    },
  ],
  order: 4,
};
