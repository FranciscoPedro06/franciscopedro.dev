import type { ComponentType } from "react";
import { FastPassArchitecture } from "./FastPassArchitecture";

/**
 * Resolve `DiagramRef.id` → SVG. O conteúdo (dados puros, doc 06 §3.1)
 * aponta ids; só o template importa componentes. Diagrama novo = arquivo
 * novo + uma entrada aqui.
 */
export const DIAGRAMS: Record<string, ComponentType<{ ariaLabel: string }>> = {
  "fastpass-arquitetura": FastPassArchitecture,
};
