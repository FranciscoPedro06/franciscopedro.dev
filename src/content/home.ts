import type { Skill } from "./types";

/** Copy da home — fonte editorial: docs/05-content-strategy.md §2. */

export const hero = {
  paragraph:
    "Construo produtos digitais de ponta a ponta — web, mobile e APIs — e trabalho com os dados que eles geram. Hoje atuo como Analista de Dados (MIS); meu projeto mais recente é o FastPass, uma plataforma de excursões com embarque por reconhecimento facial e pagamento Pix.",
};

export const featuredWork = {
  label: "PROJETOS",
  title: "Estudos de caso",
  description:
    "Três projetos em profundidade: problema, arquitetura, decisões e o que eu faria diferente. Código aberto em todos.",
  allProjectsCta: "Ver todos os projetos",
};

export const engineering = {
  label: "ENGENHARIA",
  title: "Como eu construo",
  description:
    "Método importa tanto quanto resultado. Estes são os princípios que aplico — inclusive neste site, que tem charter, design system e decisões arquiteturais documentadas no repositório.",
  principles: [
    {
      title: "Documentação antes de código",
      evidence:
        "Este site nasceu de oito documentos e nove ADRs — o código veio depois.",
    },
    {
      title: "Decisões com trade-off explícito",
      evidence:
        "No FastPass, a vaga só é debitada quando o pagamento confirma: reservar antes do dinheiro é overbooking de graça.",
    },
    {
      title: "Contratos verificáveis",
      evidence:
        "Conteúdo tipado, testes de contrato e orçamentos de performance que falham o build no CI.",
    },
    {
      title: "Acessibilidade e performance como requisito",
      evidence:
        "Contraste AA por construção, navegação completa por teclado, JS inicial abaixo de 110 KB.",
    },
  ],
  stack: [
    { category: "Linguagens", items: ["TypeScript", "Java", "Python", "PHP", "SQL", "C"] },
    { category: "Back-end", items: ["Laravel", "Spring Boot", "FastAPI"] },
    {
      category: "Front-end & Mobile",
      items: ["React", "Tailwind CSS", "Vite", "Android", "Expo"],
    },
    {
      category: "Dados & Infra",
      items: [
        "Power BI",
        "pandas",
        "Docker",
        "GitHub Actions",
        "PostgreSQL",
        "Firebase",
        "Supabase",
      ],
    },
  ],
};

export const dataSection = {
  label: "DADOS",
  title: "O outro lado do ciclo",
  description:
    "Como Analista de Dados em MIS, meu trabalho é transformar operação em informação: extrair, tratar e apresentar dados de forma que alguém consiga decidir olhando para eles.",
  closingNote:
    "Próximo passo público: o FastPass Analytics — pipeline de dados do próprio FastPass, da extração ao dashboard.",
};

export const skills: Skill[] = [
  { name: "SQL", description: "Consultas analíticas, janelas, modelagem de relatórios" },
  { name: "Power BI", description: "Dashboards e medidas DAX para acompanhamento de operação" },
  { name: "Python", description: "Tratamento de dados e automação de rotinas com pandas" },
  { name: "Excel", description: "O idioma do negócio: fórmulas avançadas e relatórios recorrentes" },
  { name: "ETL", description: "Extração e padronização de dados de fontes diferentes" },
  { name: "Automação", description: "Rotinas que eliminam trabalho manual repetitivo" },
];

export const timelineSection = {
  label: "TRAJETÓRIA",
  title: "Dois anos, medidos em projetos",
};

export const about = {
  label: "SOBRE",
  title: "Software e dados, no mesmo ciclo",
  paragraphs: [
    "Sou Técnico em Desenvolvimento de Sistemas e Analista de Dados na área de MIS. Comecei em 2024 escrevendo C no terminal; de lá para cá, passei por Java, Android, Spring Boot, Python e cheguei ao FastPass — um produto com front-end em React, back-end em Laravel e um microserviço de visão computacional em FastAPI, do qual sou o principal autor.",
    "É a combinação das duas áreas que me define profissionalmente: sei construir o sistema e sei o que perguntar aos números que ele produz. Uma coisa melhora a outra.",
  ],
};

export const contact = {
  label: "CONTATO",
  title: "Vamos conversar",
  /** Exibida apenas quando o e-mail público existir (doc 05 §2.6). */
  emailIntro: "O caminho mais rápido é o e-mail. Respondo mesmo.",
};

export const projectsPage = {
  label: "PROJETOS",
  title: "Todos os projetos",
  description:
    "Cinco sistemas, cinco estudos de caso — do firmware ao dashboard. Cada um registra o problema, as decisões e o que eu levaria para o próximo.",
  seo: {
    title: "Projetos — Francisco Pedro",
    description:
      "Cinco sistemas apresentados como estudos de caso: FastPass, reconhecimento facial, IoT, mobile e mais. Problema, arquitetura, decisões e aprendizados.",
  },
};
