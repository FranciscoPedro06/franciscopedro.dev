import { FileCode } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/content/types";
import { projectFile } from "@/lib/views";
import { Badge } from "./Badge";
import { Tag } from "./Tag";

/**
 * Porta de entrada dos estudos de caso (doc 04 §6.4) — na Release 0.6.1,
 * uma linha de arquivo do workbench, não um card: nome do arquivo + status,
 * título, resumo, tags e a ação. A linha inteira é um link; hover eleva o
 * fundo e desloca a seta 4px (doc 08 §2).
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
      className="group flex flex-col gap-2 border-b border-border px-2 py-4 transition-colors duration-150 hover:bg-surface-2/50 md:px-3 md:py-5"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          aria-hidden="true"
          className="flex items-center gap-1.5 font-mono text-label font-normal normal-case tracking-normal text-text-3 transition-colors duration-150 group-hover:text-text-2"
        >
          <FileCode size={14} strokeWidth={1.5} />
          {projectFile(project)}
        </span>
        <Badge>{project.badge}</Badge>
      </div>

      <Heading className="text-h3 text-text">{project.name}</Heading>
      <p className={`max-w-prose text-text-2 ${featured ? "text-body-lg" : "text-body"}`}>
        {project.summary}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <span className="mt-1 flex items-center gap-1 text-small font-medium text-text">
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
