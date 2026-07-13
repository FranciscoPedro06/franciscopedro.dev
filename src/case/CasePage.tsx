import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { byOrder, findProject } from "@/content/projects";
import { notFoundRoute } from "@/content/routes";
import { usePageTitle } from "@/lib/seo";
import { NotFound } from "@/pages/NotFound";
import { CaseIndex } from "./CaseIndex";
import { CaseNav } from "./CaseNav";
import { CaseSection } from "./CaseSection";

/**
 * Template único de estudo de caso (doc 06 §3): as 5 páginas de projeto são
 * este componente com dados diferentes, abertas como arquivo do workbench
 * (a tab e o breadcrumb vêm do `EditorTabs`). Seções sem conteúdo são
 * omitidas — nunca preenchidas (doc 03 §6); mídia entra quando os
 * screenshots reais existirem (doc 12 §5).
 */
export function CasePage() {
  const { slug } = useParams();
  const project = slug ? findProject(slug) : undefined;

  usePageTitle(project?.seo.title ?? notFoundRoute.seo.title);

  if (!project) return <NotFound />;

  const index = byOrder.findIndex((p) => p.slug === project.slug);
  const previous = byOrder[index - 1];
  const next = byOrder[index + 1];

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 lg:px-10">
      <Link
        to="/projetos"
        className="text-small text-text-2 transition-colors duration-150 hover:text-text"
      >
        ← Projetos
      </Link>

      <header className="mt-6">
        <Badge>{project.badge}</Badge>
        <h1 className="mt-3 text-h1-sm text-text lg:text-h1">{project.name}</h1>
        <p className="mt-4 max-w-prose text-body-lg text-text-2">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.github.map((repo) => (
            <Button key={repo.url} variant="secondary" href={repo.url}>
              GitHub — {repo.label} ↗
            </Button>
          ))}
        </div>
      </header>

      {project.sections.length > 0 && (
        <div className="mt-12 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <CaseIndex sections={project.sections} />
          <div className="space-y-12">
            {project.sections.map((section) => (
              <CaseSection key={section.kind} section={section} />
            ))}
          </div>
        </div>
      )}

      <CaseNav previous={previous} next={next} />
    </div>
  );
}
