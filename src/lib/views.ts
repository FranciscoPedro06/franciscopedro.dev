import { useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { site } from "@/content/site";
import type { Project } from "@/content/types";

/**
 * Views do workbench (Release 0.6.1): a home é uma aplicação de viewport
 * inteira e cada seção aprovada do doc 03 §4 vira uma view comutada pelo
 * hash — as âncoras existentes (`/#sobre`…) continuam sendo as URLs.
 * Nenhuma rota nova: o hash não é rota.
 */
export interface HomeView {
  id: string;
  label: string;
  file: string;
}

export const HOME_VIEWS: HomeView[] = [
  { id: "overview", label: "Overview", file: "overview.tsx" },
  ...site.nav
    .map((item) => ({ id: item.href.split("#")[1], label: item.label }))
    .filter((item): item is { id: string; label: string } => Boolean(item.id))
    .map(({ id, label }) => ({ id, label, file: `${id}.tsx` })),
];

export function viewFromHash(hash: string): string {
  const id = hash.replace(/^#/, "");
  return HOME_VIEWS.some((view) => view.id === id) ? id : "overview";
}

const emptySubscribe = () => () => {};

/**
 * View ativa da home, derivada do hash. Durante SSR e hidratação o valor é
 * sempre "overview" — o mesmo que o pre-render emite (o servidor não vê
 * hash) — e o hash real assume no re-render pós-hidratação
 * (`useSyncExternalStore` com server snapshot), sem mismatch.
 */
export function useHomeView(): string {
  const { hash } = useLocation();
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  return hydrated ? viewFromHash(hash) : "overview";
}

/** Extensão do "arquivo" de um projeto, derivada da primeira tag real. */
const EXTENSION_BY_TAG: Record<string, string> = {
  React: "tsx",
  JavaScript: "js",
  Python: "py",
  Java: "java",
};

export function projectFile(project: Project): string {
  const ext = EXTENSION_BY_TAG[project.tags[0] ?? ""] ?? "tsx";
  return `${project.slug}.${ext}`;
}
