import type { Project } from "../types";

/** Case de engenharia — fonte editorial: docs/05-content-strategy.md §3.3. */
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
  sections: [
    {
      kind: "problema",
      title: "Problema",
      paragraphs: [
        "Fila de caixa é o gargalo do supermercado. A proposta: o cliente escaneia os produtos no próprio carrinho e paga sem passar pelo caixa tradicional.",
      ],
    },
    {
      kind: "objetivo",
      title: "Objetivo",
      paragraphs: [
        "O sistema completo: firmware de câmera no carrinho, API para sessões de compra, estoque, pagamento — e a documentação de negócio que um produto de verdade exige.",
      ],
    },
    {
      kind: "arquitetura",
      title: "Arquitetura",
      paragraphs: [
        "API Spring Boot em quatro camadas — controllers finos, facades como fronteira de caso de uso, applications com as regras, e repositórios JPA — com entidades de domínio separadas dos modelos de persistência. Na ponta física, um ESP32-CAM com servidor de câmera e uma API auxiliar de leitura de QR em Python.",
      ],
      diagram: {
        id: "carrinho-arquitetura",
        ariaLabel:
          "Diagrama de arquitetura do Carrinho Inteligente: o ESP32-CAM alimenta a API auxiliar de leitura de QR em Python, que chama a API Spring Boot organizada em quatro camadas — controllers, facades, applications e repositórios JPA — sobre o MySQL.",
        caption:
          "As quatro camadas em destaque: a request atravessa controllers, facades e applications antes de tocar a persistência.",
      },
    },
    {
      kind: "decisoes",
      title: "Decisões técnicas",
      paragraphs: [],
      items: [
        {
          title: "Camadas antes de features",
          body: "O custo inicial de facades e applications se pagou quando o domínio cresceu para 8 recursos (cliente, loja, estoque, sessão, item, pagamento…) sem que os controllers engordassem.",
        },
        {
          title: "Logging estruturado desde o primeiro endpoint",
          body: "Cada operação loga entrada, sucesso e falha — depurar integração com hardware sem log é adivinhação.",
        },
        {
          title: "Documentação de negócio no repositório",
          body: "Business Model Canvas, diagrama EER e requisitos versionados junto do código, porque a decisão de produto também é artefato de engenharia.",
        },
      ],
    },
    {
      kind: "desafios",
      title: "Desafios e soluções",
      paragraphs: [],
      items: [
        {
          title: "Relacionamentos JPA entre 8 entidades",
          body: "A modelagem do EER para o JPA exigiu iterações (o histórico registra a briga) até as cascatas e os lados de propriedade ficarem corretos.",
        },
      ],
    },
    {
      kind: "resultados",
      title: "Resultados",
      paragraphs: [
        "API funcional com CRUD completo das 8 entidades, fluxo com pull requests e branch de desenvolvimento, e a documentação de negócio no repositório.",
      ],
    },
    {
      kind: "aprendizados",
      title: "Aprendizados",
      paragraphs: [
        "Arquitetura em camadas sem testes automatizados é uma promessa pela metade — a estrutura está pronta para testes de unidade nas applications, e essa é a primeira coisa que eu adicionaria hoje.",
      ],
    },
  ],
  languages: [
    { name: "C", percent: 43 },
    { name: "Java", percent: 32 },
    { name: "HTML", percent: 8 },
    { name: "JavaScript", percent: 8 },
  ],
  code: {
    repo: "carrinho-inteligente",
    path: "src/main/java/br/com/carrinhoInteligente/controllers/CarrinhoItemController.java",
    url: "https://github.com/FranciscoPedro06/carrinho-inteligente/blob/main/src/main/java/br/com/carrinhoInteligente/controllers/CarrinhoItemController.java#L24-L34",
    startLine: 24,
    lang: "java",
    code: "    @PostMapping(\"/adicionar\")\n    public ResponseEntity<?> salvar(@RequestBody CarrinhoItem item) {\n        try {\n            CarrinhoItem salvo = facade.salvar(item);\n            return ResponseEntity.status(HttpStatus.CREATED).body(salvo);\n        } catch (IllegalArgumentException e) {\n            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());\n        } catch (Exception e) {\n            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(\"Erro ao salvar item do carrinho\");\n        }\n    }",
    note: "O controller só traduz HTTP; a regra de negócio fica na facade, como manda a arquitetura em camadas do projeto.",
  },
  order: 4,
};
