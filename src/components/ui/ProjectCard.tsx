import { Link } from "react-router-dom";
import type { Project } from "@/content/types";
import { Badge } from "./Badge";
import { Tag } from "./Tag";

/**
 * Porta de entrada dos estudos de caso (doc 04 §6.4). O card inteiro é um
 * link; hover eleva o fundo e desloca a seta 4px (doc 08 §2). Sem mídia
 * enquanto os screenshots não existem (doc 12 §5 — nunca imagem falsa).
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
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-150 hover:border-border-strong hover:bg-surface-2 md:p-8"
    >
      <Badge>{project.badge}</Badge>
      <Heading className={`mt-4 text-text ${featured ? "text-h2" : "text-h3"}`}>
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
    </Link>
  );
}
