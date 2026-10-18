import { LayoutGrid, List, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DocHeader } from "@/components/ui/DocHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { projectsPage } from "@/content/home";
import { byOrder } from "@/content/projects";
import { usePageTitle } from "@/lib/seo";

/**
 * Índice completo dos estudos de caso (doc 05 §3.7) — a pasta projetos/.
 * Release 0.10: explorador de projetos com busca, filtro por linguagem e
 * lista ↔ grade. O filtro é estado local de UI; o SSR entrega a lista
 * completa (SEO e contratos intactos).
 */
const ALL = "Todas";

/** Linguagens presentes, na ordem de quantos projetos as usam. */
const LANGUAGES = (() => {
  const count = new Map<string, number>();
  for (const p of byOrder) for (const l of p.languages) count.set(l.name, (count.get(l.name) ?? 0) + 1);
  return [...count.entries()]
    .filter(([name]) => !["HTML", "CSS"].includes(name))
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
})();

export function Projects() {
  usePageTitle(projectsPage.seo.title);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState(ALL);
  const [layout, setLayout] = useState<"row" | "tile">("row");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return byOrder.filter(
      (p) =>
        (language === ALL || p.languages.some((l) => l.name === language)) &&
        (!q || [p.name, p.summary, ...p.tags].join(" ").toLowerCase().includes(q))
    );
  }, [query, language]);

  const chip = (on: boolean) =>
    `inline-flex h-6 items-center gap-1.5 rounded-sm px-2 text-[12px] transition-colors duration-100 ${
      on ? "bg-accent text-on-accent" : "bg-button-2 text-text hover:bg-button-2-hover"
    }`;

  return (
    <div className="px-5 py-6 md:px-10 md:py-8">
      <DocHeader
        as="h1"
        size="h1"
        headingId="projetos-indice-titulo"
        comment={projectsPage.comment}
        title={projectsPage.title}
        lead={projectsPage.description}
      />

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <label className="flex h-[26px] min-w-0 flex-[1_1_220px] items-center gap-1.5 rounded-sm border border-border-strong bg-input px-1.5 text-text-2 focus-within:border-accent sm:max-w-[340px]">
          <Search size={14} strokeWidth={1.5} aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por nome ou tecnologia"
            aria-label="Filtrar projetos"
            className="min-w-0 flex-1 bg-transparent text-small text-text placeholder:text-text-3 focus:outline-none"
          />
        </label>
        <div className="ml-auto flex gap-0.5" role="group" aria-label="Visualização">
          {(
            [
              ["row", List, "Lista"],
              ["tile", LayoutGrid, "Grade"],
            ] as const
          ).map(([id, Icon, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setLayout(id)}
              aria-pressed={layout === id}
              aria-label={label}
              title={label}
              className={`flex size-[26px] items-center justify-center rounded-md transition-colors duration-100 ${
                layout === id ? "bg-surface-3 text-text-hi" : "text-text-2 hover:bg-surface-2"
              }`}
            >
              <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="flex basis-full flex-wrap gap-1.5" role="group" aria-label="Filtrar por linguagem">
          {[ALL, ...LANGUAGES].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setLanguage(name)}
              aria-pressed={language === name}
              className={chip(language === name)}
            >
              {name !== ALL && <TechIcon name={name} size={13} />}
              {name}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 border border-dashed border-border-strong p-8 text-center text-small text-text-2">
          Nenhum projeto com esse filtro.{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLanguage(ALL);
            }}
            className="text-link hover:underline"
          >
            Limpar filtro
          </button>
        </p>
      ) : layout === "row" ? (
        // Stagger de 60ms nas linhas (doc 08 §3 — lista curta).
        <div className="mt-4 border-t border-border">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard project={project} headingAs="h2" />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} layout="tile" headingAs="h2" />
          ))}
        </div>
      )}
    </div>
  );
}
