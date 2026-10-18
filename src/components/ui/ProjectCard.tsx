import { Link } from "react-router-dom";
import type { Project } from "@/content/types";
import { projectFile } from "@/lib/views";
import { Badge } from "./Badge";
import { CodeBlock } from "./CodeBlock";
import { FileGlyph } from "./FileGlyph";
import { LanguageBar } from "./LanguageBar";
import { Tag } from "./Tag";

/**
 * Porta de entrada dos estudos de caso (doc 04 §6.4). Release 0.10: no
 * desenho do explorador de projetos — a capa é um trecho **real** do
 * repositório (CodeBlock compacto, com a linha de verdade) e ao lado ficam
 * nome, status, resumo, linguagens e stack com logos. `row` é a linha da
 * lista; `tile` é o cartão da grade. A linha inteira é um link.
 * O nível do heading segue o contexto (doc 04 §8.1).
 */
export function ProjectCard({
  project,
  layout = "row",
  headingAs: Heading = "h3",
}: {
  project: Project;
  layout?: "row" | "tile";
  headingAs?: "h2" | "h3";
}) {
  const file = projectFile(project);
  const code = project.code;
  const preview = (
    <CodeBlock
      compact
      code={code.code}
      lang={code.lang}
      file={code.path.split("/").pop() ?? code.path}
      path={`${code.repo} › ${code.path}`}
      startLine={code.startLine}
    />
  );
  const title = (
    <div className="flex flex-wrap items-center gap-2">
      <FileGlyph file={file} size={16} />
      <Heading className="text-h3 text-text-hi">{project.name}</Heading>
      {project.isNew ? <Badge variant="new">Novo</Badge> : <Badge>{project.badge}</Badge>}
    </div>
  );

  if (layout === "tile") {
    return (
      <Link
        to={`/projetos/${project.slug}`}
        aria-label={`Ver estudo de caso: ${project.name}`}
        className="group flex h-full flex-col overflow-hidden rounded-md border border-border-strong bg-surface transition-colors duration-150 hover:border-accent"
      >
        <div className="[&>div]:rounded-none [&>div]:border-0 [&>div]:border-b">{preview}</div>
        <div className="flex flex-1 flex-col gap-2.5 p-3.5">
          {title}
          <LanguageBar languages={project.languages} bar={false} />
          <p className="text-small text-text-2">{project.summary}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/projetos/${project.slug}`}
      className="group grid gap-4 border-b border-border px-2 py-4 transition-colors duration-100 hover:bg-surface-2 sm:grid-cols-[220px_minmax(0,1fr)] md:px-3"
    >
      <div className="hidden sm:block">{preview}</div>
      <div className="flex min-w-0 flex-col gap-2">
        {title}
        <p className="max-w-[72ch] text-small text-text-2">{project.summary}</p>
        <LanguageBar languages={project.languages} bar={false} />
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="mt-0.5 inline-flex items-center gap-1 text-small text-link">
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
