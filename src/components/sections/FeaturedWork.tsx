import { Link } from "react-router-dom";
import { DocHeader } from "@/components/ui/DocHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { featuredWork } from "@/content/home";
import { highlighted } from "@/content/projects";

/** Os 3 principais estudos de caso; o índice completo vive em /projetos. */
export function FeaturedWork() {
  const [main, ...rest] = highlighted;

  return (
    <Reveal>
      <DocHeader
        headingId="projetos-titulo"
        comment={featuredWork.comment}
        title={featuredWork.title}
        lead={featuredWork.description}
      />

      <div className="mt-6 border-t border-border">
        <ProjectCard project={main} variant="featured" />
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-5">
        <Link
          to="/projetos"
          className="group inline-flex items-center gap-1 font-mono text-small text-accent transition-colors duration-150 hover:text-accent-bright"
        >
          {featuredWork.allProjectsCta}{" "}
          {/* Seta desliza no hover — padrão do ProjectCard (doc 08 §2). */}
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
