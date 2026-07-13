import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsPage } from "@/content/home";
import { byOrder } from "@/content/projects";
import { usePageTitle } from "@/lib/seo";

/** Índice completo dos 5 estudos de caso (doc 05 §3.7) — a pasta projetos/. */
export function Projects() {
  usePageTitle(projectsPage.seo.title);

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 lg:px-10">
      <SectionHeading
        as="h1"
        headingId="projetos-indice-titulo"
        label={projectsPage.label}
        title={projectsPage.title}
        description={projectsPage.description}
      />
      <div className="mt-8 border-t border-border">
        {byOrder.map((project) => (
          <ProjectCard key={project.slug} project={project} headingAs="h2" />
        ))}
      </div>
    </div>
  );
}
