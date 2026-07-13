import { Link } from "react-router-dom";
import type { Project } from "@/content/types";
import { Badge } from "./Badge";
import { Tag } from "./Tag";

/**
 * Porta de entrada dos estudos de caso (doc 04 §6.4) — na Release 0.6, um
 * painel de IDE: cabeçalho de arquivo ({slug}.tsx + status) e corpo. O painel
 * inteiro é um link; hover eleva a borda e desloca a seta 4px (doc 08 §2).
 * Sem mídia enquanto os screenshots não existem (doc 12 §5).
 * O nível do heading segue o contexto — h3 sob seção da home (h2), h2 sob o
 * h1 de /projetos: hierarquia sem saltos (doc 04 §8.1).
 */
export function ProjectCard({
  project,
  variant = "default",
  headingAs: Heading = "h3",
}: {
  project: Project;
  variant?: "default" | "featured";
  headingAs?: "h2" | "h3";
}) {
  const featured = variant === "featured";

  return (
    <Link
      to={`/projetos/${project.slug}`}
      className="group flex h-full flex-col rounded-md border border-border bg-surface transition-colors duration-150 hover:border-border-strong"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-2.5 md:px-6">
        <span
          aria-hidden="true"
          className="truncate font-mono text-label font-normal normal-case tracking-normal text-text-3 transition-colors duration-150 group-hover:text-text-2"
        >
          {project.slug}.tsx
        </span>
        <Badge>{project.badge}</Badge>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Heading className={`text-text ${featured ? "text-h2" : "text-h3"}`}>
          {project.name}
        </Heading>
        <p
          className={`mt-3 text-text-2 ${featured ? "max-w-prose text-body-lg" : "text-body"}`}
        >
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="mt-auto flex items-center gap-1 pt-8 text-small font-medium text-text">
          Ver estudo de caso
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
