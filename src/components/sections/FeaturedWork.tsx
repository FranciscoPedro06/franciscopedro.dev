import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredWork } from "@/content/home";
import { highlighted } from "@/content/projects";

/** Os 3 principais estudos de caso; o índice completo vive em /projetos. */
export function FeaturedWork() {
  const [main, ...rest] = highlighted;

  return (
    <Reveal>
      <SectionHeading
        headingId="projetos-titulo"
        label={featuredWork.label}
        title={featuredWork.title}
        description={featuredWork.description}
      />

      <div className="mt-8 border-t border-border">
        <ProjectCard project={main} variant="featured" />
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-1 text-body font-medium text-accent transition-colors duration-150 hover:text-accent-bright"
        >
          {featuredWork.allProjectsCta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  );
}
