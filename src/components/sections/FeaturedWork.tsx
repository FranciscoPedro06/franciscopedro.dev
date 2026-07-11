import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredWork } from "@/content/home";
import { highlighted } from "@/content/projects";

/** Os 3 principais estudos de caso; o índice completo vive em /projetos. */
export function FeaturedWork() {
  const [main, ...rest] = highlighted;

  return (
    <Section id="projetos" labelledBy="projetos-titulo">
      <Reveal>
        <SectionHeading
          headingId="projetos-titulo"
          label={featuredWork.label}
          title={featuredWork.title}
          description={featuredWork.description}
        />
      </Reveal>

      <Reveal className="mt-12">
        <ProjectCard project={main} variant="featured" />
      </Reveal>

      <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Reveal>

      <div className="mt-10">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-1 text-body font-medium text-accent transition-colors duration-150 hover:text-accent-bright"
        >
          {featuredWork.allProjectsCta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
