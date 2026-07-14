import { FileCode, FolderGit2, Milestone, Search, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { byOrder } from "@/content/projects";
import { timeline } from "@/content/timeline";
import { HOME_VIEWS, projectFile } from "@/lib/views";

/**
 * Search view (doc 04 §6.21): filtro instantâneo sobre o conteúdo **que já
 * existe** — views, cases e trajetória (nome, resumo, stack, datas). Nenhum
 * dado novo; cada resultado navega para a rota/hash correspondente.
 */

type Group = "Views" | "Projects" | "Timeline";

interface Item {
  id: string;
  group: Group;
  icon: LucideIcon;
  label: string;
  detail: string;
  to: string;
  haystack: string;
}

const INDEX: Item[] = [
  ...HOME_VIEWS.map((view) => ({
    id: `view:${view.id}`,
    group: "Views" as const,
    icon: FileCode,
    label: view.file,
    detail: view.label,
    to: view.id === "overview" ? "/" : `/#${view.id}`,
    haystack: `${view.label} ${view.file}`.toLowerCase(),
  })),
  ...byOrder.map((project) => ({
    id: `project:${project.slug}`,
    group: "Projects" as const,
    icon: FolderGit2,
    label: projectFile(project),
    detail: project.summary,
    to: `/projetos/${project.slug}`,
    haystack:
      `${project.name} ${project.summary} ${project.tags.join(" ")} ${project.slug}`.toLowerCase(),
  })),
  ...timeline.map((entry, i) => ({
    id: `timeline:${i}`,
    group: "Timeline" as const,
    icon: Milestone,
    label: entry.title,
    detail: entry.date,
    to: "/#trajetoria",
    haystack: `${entry.title} ${entry.description} ${entry.date}`.toLowerCase(),
  })),
];

const GROUP_ORDER: Group[] = ["Views", "Projects", "Timeline"];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Ao abrir a view, o foco vai para o campo (comando "Focus Search", M5).
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return INDEX;
    return INDEX.filter((item) => tokens.every((t) => item.haystack.includes(t)));
  }, [query]);

  return (
    <div className="flex flex-col">
      <div className="border-b border-border p-2">
        <div className="flex items-center gap-2 rounded-sm border border-border bg-bg px-2 py-1 focus-within:border-border-strong">
          <Search size={13} strokeWidth={1.5} aria-hidden="true" className="text-text-3" />
          <input
            ref={inputRef}
            id="wb-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar no portfolio"
            placeholder="Buscar…"
            className="min-w-0 flex-1 bg-transparent font-mono text-small text-text placeholder:text-text-3 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Limpar busca"
              className="text-text-3 transition-colors duration-150 hover:text-text"
            >
              <X size={13} strokeWidth={1.5} aria-hidden="true" />
            </button>
          )}
        </div>
        <p aria-live="polite" className="px-1 pt-1.5 text-label text-text-3">
          {results.length} {results.length === 1 ? "resultado" : "resultados"}
        </p>
      </div>

      <div className="font-mono text-small">
        {GROUP_ORDER.map((group) => {
          const items = results.filter((r) => r.group === group);
          if (items.length === 0) return null;
          return (
            <div key={group} className="border-b border-border py-1">
              <p className="type-label px-4 py-1 text-text-3">{group}</p>
              <ul>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.to}
                        className="flex items-start gap-2 px-4 py-1 text-text-3 transition-colors duration-150 hover:bg-surface-2 hover:text-text-2"
                      >
                        <Icon
                          size={13}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-text-2">{item.label}</span>
                          <span className="block truncate text-label text-text-3">
                            {item.detail}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
