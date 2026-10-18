import type { CaseSectionKind, Project } from "@/content/types";

/**
 * Abas do estudo de caso (Release 0.10): as seções canônicas (doc 03 §6)
 * agrupadas como na página de extensão do VS Code. A aba ativa vem do hash
 * (`#arquitetura`) — e o hash de uma seção (`#desafios`) abre a aba que a
 * contém, então os links antigos continuam funcionando.
 */
export interface CaseTab {
  id: string;
  label: string;
  kinds: CaseSectionKind[];
}

const GROUPS: CaseTab[] = [
  {
    id: "visao-geral",
    label: "Visão geral",
    kinds: ["problema", "objetivo", "pesquisa"],
  },
  { id: "arquitetura", label: "Arquitetura", kinds: ["arquitetura", "tecnologias"] },
  { id: "decisoes", label: "Decisões", kinds: ["decisoes", "desafios"] },
  { id: "codigo", label: "Código", kinds: [] },
  { id: "resultados", label: "Resultados", kinds: ["resultados", "aprendizados"] },
];

/** Abas com conteúdo para este projeto ("Código" sempre existe: todo case tem trecho real). */
export function caseTabs(project: Project): CaseTab[] {
  const kinds = new Set(project.sections.map((s) => s.kind));
  return GROUPS.filter(
    (tab) => tab.id === "codigo" || tab.kinds.some((k) => kinds.has(k))
  );
}

/** Aba ativa a partir do hash (id da aba ou da seção); default: a primeira. */
export function tabFromHash(project: Project, hash: string): string {
  const id = hash.replace(/^#/, "");
  const tabs = caseTabs(project);
  const direct = tabs.find((tab) => tab.id === id);
  if (direct) return direct.id;
  const owner = tabs.find((tab) => tab.kinds.includes(id as CaseSectionKind));
  return owner?.id ?? tabs[0].id;
}
