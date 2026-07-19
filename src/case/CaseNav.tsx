import { Link } from "react-router-dom";
import type { Project } from "@/content/types";

/** Navegação anterior/próximo (doc 03 §2): mantém o visitante no circuito. */
export function CaseNav({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  return (
    <nav
      aria-label="Outros projetos"
      className="mt-16 flex justify-between gap-4 border-t border-border pt-6"
    >
      {/* Setas deslizam na direção da navegação — padrão do ProjectCard (doc 08 §2). */}
      {previous ? (
        <Link
          to={`/projetos/${previous.slug}`}
          className="group inline-flex items-center gap-1 text-small text-text-2 transition-colors duration-150 hover:text-text"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:-translate-x-1"
          >
            ←
          </span>
          {previous.name}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={`/projetos/${next.slug}`}
          className="group inline-flex items-center gap-1 text-small text-text-2 transition-colors duration-150 hover:text-text"
        >
          {next.name}
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      )}
    </nav>
  );
}
