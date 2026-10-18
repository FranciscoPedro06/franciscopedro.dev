import type { Project } from "../types";
import { carrinhoInteligente } from "./carrinho-inteligente";
import { edupass } from "./edupass";
import { fastpass } from "./fastpass";
import { linuxLab } from "./linux-lab";
import { reconhecimentoFacial } from "./reconhecimento-facial";
import { reviva } from "./reviva";

/**
 * Os 6 estudos de caso — um arquivo por case (doc 06 §2; RNF06: adicionar um
 * case = adicionar um arquivo; o Linux Lab entrou assim na Release 0.10). `media` aguarda screenshots reais
 * ([PENDENTE], doc 05 §7).
 */
export const projects: Project[] = [
  fastpass,
  linuxLab,
  reconhecimentoFacial,
  carrinhoInteligente,
  edupass,
  reviva,
];

export const byOrder = [...projects].sort((a, b) => a.order - b.order);
export const highlighted = byOrder.filter((p) => p.highlight);
export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
