import type { Project } from "./types";

/**
 * Os 5 estudos de caso — fonte editorial: docs/05-content-strategy.md §2.3/§3.
 * As `sections` completas entram no S3 (template de case); `media` aguarda
 * screenshots reais ([PENDENTE], doc 05 §7).
 */
export const projects: Project[] = [
  {
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
    sections: [],
    order: 1,
    featured: true,
    highlight: true,
  },
  {
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
  },
  {
    slug: "carrinho-inteligente",
    name: "Carrinho Inteligente",
    summary:
      "Sistema de compras com ESP32-CAM, API Spring Boot em camadas e documentação de negócio — do hardware ao banco.",
    badge: "IOT · 2025",
    tags: ["Java", "Spring Boot", "JPA", "MySQL", "ESP32"],
    links: {
      github: [
        {
          label: "Back-end",
          url: "https://github.com/FranciscoPedro06/carrinho-inteligente",
        },
        {
          label: "Front-end + IoT",
          url: "https://github.com/FranciscoPedro06/carrinho-inteligente-front-end",
        },
      ],
    },
    seo: {
      title: "Carrinho Inteligente — estudo de caso · Francisco Pedro",
      description:
        "Sistema de compras com ESP32-CAM e API Spring Boot em camadas: arquitetura, modelagem e documentação de negócio de um projeto IoT completo.",
    },
    media: [],
    sections: [],
    order: 3,
    highlight: true,
  },
  {
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
  },
  {
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
  },
];

export const byOrder = [...projects].sort((a, b) => a.order - b.order);
export const highlighted = byOrder.filter((p) => p.highlight);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
