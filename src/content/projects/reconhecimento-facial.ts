import type { Project } from "../types";

/** Case técnico — fonte editorial: docs/05-content-strategy.md §3.2. */
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
  sections: [
    {
      kind: "problema",
      title: "Problema",
      paragraphs: [
        "Confirmar a identidade de uma pessoa por uma foto, rápido o bastante para uma fila de embarque e simples o bastante para rodar em infraestrutura gratuita.",
      ],
    },
    {
      kind: "objetivo",
      title: "Objetivo",
      paragraphs: [
        "Uma API com duas operações: registrar um rosto e verificar uma captura contra os rostos registrados — devolvendo quem é e com que confiança.",
      ],
    },
    {
      kind: "pesquisa",
      title: "Pesquisa",
      paragraphs: [
        "Testei os detectores e modelos do DeepFace antes de fixar o pipeline: Facenet512 para os embeddings (512 dimensões, melhor separação entre pessoas parecidas que o Facenet padrão) e distância de cosseno com threshold calibrado em 0.35 para a decisão.",
      ],
    },
    {
      kind: "arquitetura",
      title: "Arquitetura",
      paragraphs: [
        "O serviço atravessou três projetos, e cada versão corrigiu um defeito estrutural da anterior. A primeira nasceu dentro do back-end do EduPass — funcionava, mas carregava os erros de estreia: detectores diferentes no cadastro e na verificação, credencial publicada no repositório. A segunda vida foi no sistema de confirmação de presença construído em equipe, que provou que o componente valia mais do que o projeto que o criou. A versão atual fecha o ciclo como microserviço independente, e a separação resolveu três problemas de uma vez: o stack de ML (Python, modelos pesados) deixou de morar dentro do back-end do produto, o mesmo serviço passou a atender projetos diferentes sem retrabalho, e o deploy ganhou ciclo próprio — evoluir o modelo não mexe na API de negócio.",
        "A versão atual: FastAPI com DeepFace; embeddings persistidos no Supabase; verificação por similaridade de cosseno contra a base; Docker para deploy no Render. O Laravel do FastPass consome as rotas /register e /verify através de um service isolado.",
      ],
      diagram: {
        id: "facial-arquitetura",
        ariaLabel:
          "Diagrama de arquitetura da API de Reconhecimento Facial: o back-end Laravel do FastPass chama as rotas /register e /verify da API FastAPI, que gera embeddings com Facenet512 e os persiste no Supabase.",
        caption:
          "A API não conhece o produto: o FastPass é só o consumidor atual das duas rotas.",
      },
    },
    {
      kind: "decisoes",
      title: "Decisões técnicas",
      paragraphs: [],
      items: [
        {
          title: "Embedding + distância, não classificação",
          body: "Registrar um usuário não pode exigir retreinar nada: cada rosto vira um vetor, e reconhecer é buscar o vetor mais próximo.",
        },
        {
          title: "Threshold explícito",
          body: "0.35 de distância de cosseno separa “é a pessoa” de “parecido demais para arriscar” — e o valor está no código como decisão nomeada, não como número mágico.",
        },
        {
          title: "A API não conhece o produto",
          body: "Ela registra e verifica rostos; quem decide o que fazer com o resultado (aprovar embarque, pedir validação manual) é o sistema que a consome.",
        },
      ],
    },
    {
      kind: "desafios",
      title: "Desafios e soluções",
      paragraphs: [],
      items: [
        {
          title: "Um bug silencioso de acurácia",
          body: "Na primeira versão, o cadastro usava um detector (SSD) e a verificação usava outro (OpenCV). Detectores recortam e alinham o rosto de formas diferentes — comparar embeddings gerados por pipelines distintos degrada a precisão sem lançar nenhum erro. A correção é trivial; percebê-la, não.",
        },
        {
          title: "Credencial no código",
          body: "A primeira versão publicou a chave do banco no repositório. Rotacionei a chave e movi a configuração para variáveis de ambiente — o tipo de erro que se comete uma vez.",
        },
      ],
    },
    {
      kind: "resultados",
      title: "Resultados",
      paragraphs: [
        "Serviço em produção como componente de identidade do FastPass, com modo simulado para demonstrações.",
      ],
    },
    {
      kind: "aprendizados",
      title: "Aprendizados e evolução planejada",
      paragraphs: [
        "A busca hoje é linear: baixa todos os embeddings e compara em Python. O próximo passo é o pgvector no Postgres — a comparação vira uma consulta indexada no banco. Também planejados: pré-carga do modelo no startup (elimina o cold start), anti-spoofing e a estrutura em camadas (routers, services, repositories) que o serviço merece.",
      ],
    },
  ],
  order: 2,
  highlight: true,
};
