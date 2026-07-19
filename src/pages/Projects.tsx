import { DocHeader } from "@/components/ui/DocHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
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
      {/* Stagger de 60ms nas linhas (doc 08 §3 — lista curta, 5 itens). */}
      <div className="mt-6 border-t border-border">
        {byOrder.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} headingAs="h2" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
