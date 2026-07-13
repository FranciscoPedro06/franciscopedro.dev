import { Link, useParams } from "react-router-dom";
import { EditorPane } from "@/components/ide/EditorPane";
import { Container } from "@/components/layout/Container";
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
 * este componente com dados diferentes. Seções sem conteúdo são omitidas —
 * nunca preenchidas (doc 03 §6); mídia entra quando os screenshots reais
 * existirem (doc 12 §5).
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
    <Container className="pb-24 pt-28 lg:pt-32">
      <Link
        to="/projetos"
        className="text-small text-text-2 transition-colors duration-150 hover:text-text"
      >
        ← Projetos
      </Link>

      {/* Os 5 cases como arquivos abertos no editor (Release 0.6) */}
      <div className="mt-6">
        <EditorPane
          label="Estudos de caso"
          tabs={byOrder.map((p) => ({
            name: `${p.slug}.tsx`,
            to: `/projetos/${p.slug}`,
            active: p.slug === project.slug,
          }))}
          breadcrumb={["portfolio", "src", "projetos", `${project.slug}.tsx`]}
        >
          <header>
            <Badge>{project.badge}</Badge>
            <h1 className="mt-4 text-h1-sm text-text lg:text-h1">{project.name}</h1>
            <p className="mt-5 max-w-prose text-body-lg text-text-2">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.github.map((repo) => (
                <Button key={repo.url} variant="secondary" href={repo.url}>
                  GitHub — {repo.label} ↗
                </Button>
              ))}
            </div>
          </header>

          {project.sections.length > 0 && (
            <div className="mt-16 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
              <CaseIndex sections={project.sections} />
              <div className="space-y-16">
                {project.sections.map((section) => (
                  <CaseSection key={section.kind} section={section} />
                ))}
              </div>
            </div>
          )}
        </EditorPane>
      </div>

      <CaseNav previous={previous} next={next} />
    </Container>
  );
}
