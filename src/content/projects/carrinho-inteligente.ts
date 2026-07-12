import type { Project } from "../types";

/** Fonte editorial: docs/05-content-strategy.md §3.3. Seções entram no S4. */
export const carrinhoInteligente: Project = {
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
};
