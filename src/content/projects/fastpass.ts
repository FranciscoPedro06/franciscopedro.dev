import type { Project } from "../types";

/** Case principal — fonte editorial: docs/05-content-strategy.md §3.1. */
export const fastpass: Project = {
  slug: "fastpass",
  name: "FastPass",
  summary:
    "Plataforma de gestão de excursões com embarque por reconhecimento facial, QR Code e pagamento Pix. Três aplicações, três serviços, deploy real.",
  badge: "TCC · 2026",
  tags: ["React", "Laravel", "FastAPI", "DeepFace", "Mercado Pago", "Docker"],
  links: {
    github: [
      {
        label: "Front-end",
        url: "https://github.com/maatheusantanadev/FastPass-FrontEnd",
      },
      {
        label: "Back-end",
        url: "https://github.com/maatheusantanadev/FastPass-BackEnd",
      },
    ],
  },
  seo: {
    title: "FastPass — estudo de caso · Francisco Pedro",
    description:
      "Plataforma de excursões com embarque por reconhecimento facial, QR Code e pagamento Pix. Arquitetura com React, Laravel e FastAPI, decisões e aprendizados.",
  },
  media: [],
  sections: [
    {
      kind: "problema",
      title: "Problema",
      paragraphs: [
        "Empresas de excursão na Bahia administram vendas, listas de passageiros e embarque com planilhas e mensagens. No dia da viagem, conferir quem pagou e quem pode embarcar é lento e sujeito a erro — e o passageiro não tem um lugar único para comprar, acompanhar avisos e apresentar seu bilhete.",
      ],
    },
    {
      kind: "objetivo",
      title: "Objetivo",
      paragraphs: [
        "Um produto único com três superfícies: o app do passageiro (comprar, pagar por Pix, registrar biometria e embarcar), o app do motorista (validar embarques por facial, QR ou conferência manual) e o painel da empresa (excursões, vagas, validação em tempo real e relatórios).",
      ],
    },
    {
      kind: "arquitetura",
      title: "Arquitetura",
      paragraphs: [
        "Três serviços independentes: front-end React (SPA servida na Vercel), API Laravel com Sanctum (Render, Docker) e um microserviço de reconhecimento facial em FastAPI com DeepFace. O Laravel orquestra tudo: autentica, controla papéis (passageiro, motorista, administrador), fala com o microserviço facial por HTTP e com o Mercado Pago para cobranças Pix.",
        "A integração entre os serviços é explícita: o front autentica com token Sanctum enviado como Bearer, um middleware de papéis decide o que cada perfil pode fazer, e cada integração externa vive num service isolado (FacialRecognitionService, PagamentoService) — o resto do sistema não sabe se a resposta veio da API real ou do modo simulado. Todo embarque — facial, QR Code ou manual — converge num único EmbarqueService: a regra de efetivação existe uma vez.",
      ],
      diagram: {
        id: "fastpass-arquitetura",
        ariaLabel:
          "Diagrama de arquitetura do FastPass: o front-end React chama a API Laravel com token Bearer; a API consome o microserviço facial FastAPI e o Mercado Pago para cobranças Pix.",
        caption:
          "Três serviços independentes; o Laravel é o único que fala com o microserviço facial e com o Mercado Pago.",
      },
    },
    {
      kind: "decisoes",
      title: "Decisões técnicas",
      paragraphs: [],
      items: [
        {
          title: "Modos simulados como recurso de primeira classe",
          body: "Tanto a integração facial quanto a de pagamento têm um modo fake configurável por variável de ambiente. Uma demonstração do produto não pode depender de uma conta de PSP nem de uma GPU no ar.",
        },
        {
          title: "A vaga só é debitada quando o pagamento confirma",
          body: "A compra nasce pendente; a cobrança Pix é criada com chave de idempotência e referência externa; a confirmação chega por webhook ou polling. Reservar vaga antes do dinheiro é dar overbooking de graça.",
        },
        {
          title: "Trava de concorrência na última vaga",
          body: "O débito de vagas roda numa transação com lockForUpdate — duas compras simultâneas da última vaga eram o bug mais provável do sistema, e o mais barato de prevenir.",
        },
        {
          title: "Quem valida o embarque é sempre o motorista",
          body: "O passageiro solicita; a aprovação — automática por similaridade facial ou manual — é do outro lado. Decisão de produto antes de ser decisão técnica. A evolução planejada é o meio-termo: verificação automática com score de confiança — acima do threshold aprova direto, abaixo cai para a conferência do motorista.",
        },
        {
          title: "Degradação graciosa no front",
          body: "O cliente HTTP normaliza erros e, se o back-end estiver fora do ar, o app cai em modo demonstração com dados locais em vez de quebrar.",
        },
      ],
    },
    {
      kind: "desafios",
      title: "Desafios e soluções",
      paragraphs: [],
      items: [
        {
          title: "Três aplicações, um código-base",
          body: "42 telas atendem passageiro, motorista e admin sem duplicar layout: 30 componentes compartilhados e dois shells de composição (mobile e dashboard).",
        },
        {
          title: "Trabalho em equipe sem pisar no código alheio",
          body: "Nem sempre funcionou: uma reestruturação feita direto na branch principal removeu a integração de pagamento já pronta. A lição virou prática — pull requests e proteção de branch deixaram de ser burocracia para mim.",
        },
      ],
    },
    {
      kind: "resultados",
      title: "Resultados",
      paragraphs: [
        "Produto publicado (front na Vercel, API no Render), fluxo completo do cadastro ao embarque funcionando, autoria verificável no histórico: 30 dos 34 commits do front e 12 dos 16 do back.",
      ],
    },
    {
      kind: "aprendizados",
      title: "Aprendizados",
      paragraphs: [
        "Contratos entre serviços precisam de dono e versionamento — quando front e back evoluem em ritmos diferentes, o contrato quebra em silêncio. E documentação de rotas dentro do próprio código (routes/api.php comentado) paga o custo em horas de integração economizadas.",
      ],
    },
  ],
  order: 1,
  featured: true,
  highlight: true,
};
