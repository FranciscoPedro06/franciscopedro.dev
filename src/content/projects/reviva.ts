import type { Project } from "../types";

/** Case mobile — fonte editorial: docs/05-content-strategy.md §3.5. */
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
  sections: [
    {
      kind: "problema",
      title: "Problema",
      paragraphs: [
        "Guardamos tudo e não revisitamos nada. O Reviva propõe o contrário do feed: a memória só volta quando chega a hora dela.",
      ],
    },
    {
      kind: "objetivo",
      title: "Objetivo",
      paragraphs: [
        "Cadastro e login, upload de mídia (imagem, vídeo, documento, áudio — com gravação no próprio app) e o mecanismo central: cada memória tem uma data de desbloqueio antes da qual o conteúdo fica inacessível.",
      ],
    },
    {
      kind: "arquitetura",
      title: "Arquitetura",
      paragraphs: [
        "App Android nativo em Java (activities, models e utils bem separados), Firebase Authentication para identidade, Firestore para os metadados das memórias e Storage para os arquivos.",
      ],
    },
    {
      kind: "decisoes",
      title: "Decisões técnicas",
      paragraphs: [],
      items: [
        {
          title: "A trava de tempo é regra de dados, não de tela",
          body: "A data de desbloqueio vive no modelo e é verificada no acesso — esconder o botão não é proteger o conteúdo.",
        },
        {
          title: "Fluxo de git como parte do produto",
          body: "Issues numeradas, commits referenciando cada uma (refs #8) e pull requests — o repositório mais organizado que eu tinha feito até então.",
        },
      ],
    },
    {
      kind: "resultados",
      title: "Resultados",
      paragraphs: [
        "App funcional de ponta a ponta na dupla com Matheus Santana; o repositório documenta o processo tão bem quanto o produto.",
      ],
    },
    {
      kind: "aprendizados",
      title: "Aprendizados",
      paragraphs: [
        "Conceito forte simplifica decisões: com uma ideia central clara (“memória com hora para voltar”), cada tela tinha um critério objetivo para existir ou não.",
      ],
    },
  ],
  order: 5,
};
