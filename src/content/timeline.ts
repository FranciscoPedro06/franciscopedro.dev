import type { TimelineEntry } from "./types";

/**
 * Trajetória — fonte editorial: docs/05-content-strategy.md §2.4.
 * Datas extraídas do histórico real dos repositórios (docs/00 §2).
 * O marco do início no MIS entra quando a data for confirmada ([PENDENTE]).
 */
export const timeline: TimelineEntry[] = [
  {
    date: "DEZ 2024",
    title: "Primeiro projeto em C",
    description:
      "Uma locadora de veículos no terminal. Structs, arquivos e a descoberta de que organizar código é metade do trabalho.",
  },
  {
    date: "MAI 2025",
    title: "Android com Java — Reviva",
    description:
      "Primeiro produto com usuários em mente: autenticação, storage e um conceito próprio.",
  },
  {
    date: "SET 2025",
    title: "Spring Boot — Carrinho Inteligente",
    description:
      "Primeira arquitetura deliberada: camadas, facades, repositórios — e um ESP32-CAM na ponta.",
  },
  {
    date: "NOV 2025",
    title: "Python e reconhecimento facial — EduPass",
    description:
      "O problema que mudou minha direção: confirmar presença por biometria. Primeira API com DeepFace.",
  },
  {
    date: "JUL 2026",
    title: "FastPass",
    description:
      "A síntese: React, Laravel, microserviço facial, Pix. Principal autor do front e do back.",
  },
  {
    date: "HOJE",
    title: "Os dois lados do ciclo",
    description:
      "Desenvolvimento de produto e análise dos dados que ele gera, como Analista de Dados (MIS).",
    current: true,
  },
];
