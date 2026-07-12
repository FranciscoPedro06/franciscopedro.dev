import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectsPage } from "@/content/home";
import { byOrder } from "@/content/projects";
import { usePageTitle } from "@/lib/seo";

/** Índice completo dos 5 estudos de caso (doc 05 §3.7). */
export function Projects() {
  usePageTitle(projectsPage.seo.title);

  return (
    <Container className="pb-24 pt-32 lg:pt-40">
      <SectionHeading
        as="h1"
        headingId="projetos-indice-titulo"
        label={projectsPage.label}
        title={projectsPage.title}
        description={projectsPage.description}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {byOrder.map((project) => (
          <ProjectCard key={project.slug} project={project} headingAs="h2" />
        ))}
      </div>
    </Container>
  );
}
