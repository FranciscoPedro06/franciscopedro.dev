import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { byOrder, findProject } from "@/content/projects";
import { usePageTitle } from "@/lib/seo";
import { NotFound } from "./NotFound";

/**
 * Template único de estudo de caso (doc 06 §3). Neste marco renderiza o
 * cabeçalho (dados reais: badge, resumo, stack, repositórios) e a navegação
 * entre cases; as seções canônicas entram no S3 junto do conteúdo.
 */
export function CasePage() {
  const { slug } = useParams();
  const project = slug ? findProject(slug) : undefined;

  usePageTitle(project?.seo.title ?? "Página não encontrada · Francisco Pedro");

  if (!project) return <NotFound />;

  const index = byOrder.findIndex((p) => p.slug === project.slug);
  const previous = byOrder[index - 1];
  const next = byOrder[index + 1];

  return (
    <Container className="pb-24 pt-32 lg:pt-40">
      <Link
        to="/projetos"
        className="text-small text-text-2 transition-colors duration-150 hover:text-text"
      >
        ← Projetos
      </Link>

      <header className="mt-10">
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

      <nav
        aria-label="Outros projetos"
        className="mt-24 flex justify-between gap-4 border-t border-border pt-8"
      >
        {previous ? (
          <Link
            to={`/projetos/${previous.slug}`}
            className="text-small text-text-2 transition-colors duration-150 hover:text-text"
          >
            ← {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/projetos/${next.slug}`}
            className="text-small text-text-2 transition-colors duration-150 hover:text-text"
          >
            {next.name} →
          </Link>
        )}
      </nav>
    </Container>
  );
}
