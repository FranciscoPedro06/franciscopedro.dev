import type { Project } from "../types";
import { carrinhoInteligente } from "./carrinho-inteligente";
import { edupass } from "./edupass";
import { fastpass } from "./fastpass";
import { reconhecimentoFacial } from "./reconhecimento-facial";
import { reviva } from "./reviva";

/**
 * Os 5 estudos de caso — um arquivo por case (doc 06 §2; RNF06: adicionar um
 * case = adicionar um arquivo). `media` aguarda screenshots reais
 * ([PENDENTE], doc 05 §7); as seções dos 4 cases restantes entram no S4.
 */
export const projects: Project[] = [
  fastpass,
  reconhecimentoFacial,
  carrinhoInteligente,
  edupass,
  reviva,
];

export const byOrder = [...projects].sort((a, b) => a.order - b.order);
export const highlighted = byOrder.filter((p) => p.highlight);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
