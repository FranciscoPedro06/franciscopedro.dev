import { DocHeader } from "@/components/ui/DocHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projectsPage } from "@/content/home";
import { byOrder } from "@/content/projects";
import { usePageTitle } from "@/lib/seo";

/** Índice completo dos 5 estudos de caso (doc 05 §3.7) — a pasta projetos/. */
export function Projects() {
  usePageTitle(projectsPage.seo.title);

  return (
    <div className="px-5 py-5 md:px-8 md:py-7">
      <DocHeader
        as="h1"
        size="h1"
        headingId="projetos-indice-titulo"
        comment={projectsPage.comment}
        title={projectsPage.title}
        lead={projectsPage.description}
      />
      <div className="mt-6 border-t border-border">
        {byOrder.map((project) => (
          <ProjectCard key={project.slug} project={project} headingAs="h2" />
        ))}
      </div>
    </div>
  );
}
