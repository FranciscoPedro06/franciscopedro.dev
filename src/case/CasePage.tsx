import { Play, Terminal } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FileGlyph } from "@/components/ui/FileGlyph";
import { LanguageBar } from "@/components/ui/LanguageBar";
import { Tag } from "@/components/ui/Tag";
import { byOrder, findProject } from "@/content/projects";
import { notFoundRoute } from "@/content/routes";
import { brandIcon } from "@/lib/brand";
import { usePageTitle } from "@/lib/seo";
import { runInTerminal } from "@/lib/terminal-bus";
import { projectFile } from "@/lib/views";
import { useHydrated } from "@/lib/workbench";
import { NotFound } from "@/pages/NotFound";
import { CaseNav } from "./CaseNav";
import { CaseSection } from "./CaseSection";
import { caseTabs, tabFromHash } from "./caseTabs";
import { MissionTry } from "./MissionTry";

const MISSION_YAML = `validation:
  all:
    - id: exists
      type: file_exists
      path: /home/student/deploy.sh
    - id: mode
      type: file_permissions
      path: /home/student/deploy.sh
      mode: "0700"`;

/**
 * Template único de estudo de caso (doc 06 §3), no desenho da página de
 * extensão do VS Code (Release 0.10, ADR-0018): ícone da linguagem, nome,
 * repositórios, linguagens e ações no topo; abas por grupo de seções; coluna
 * de detalhes à direita. Todas as abas vão no HTML (pre-render/SEO) — só a
 * ativa aparece; a ativa vem do hash, então `#decisoes` abre a aba certa.
 * Seções sem conteúdo são omitidas — nunca preenchidas (doc 03 §6).
 */
export function CasePage() {
  const { slug } = useParams();
  const { hash } = useLocation();
  const hydrated = useHydrated();
  const project = slug ? findProject(slug) : undefined;

  usePageTitle(project?.seo.title ?? notFoundRoute.seo.title);

  if (!project) return <NotFound />;

  const index = byOrder.findIndex((p) => p.slug === project.slug);
  const previous = byOrder[index - 1];
  const next = byOrder[index + 1];
  const tabs = caseTabs(project);
  // SSR e hidratação veem a primeira aba (o servidor não vê hash) — sem mismatch.
  const active = hydrated ? tabFromHash(project, hash) : tabs[0].id;
  const file = projectFile(project);
  const code = project.code;
  const facts = project.facts ?? [
    { label: "Repositórios", value: String(project.links.github.length) },
    { label: "Tecnologias", value: String(project.tags.length) },
    {
      label: "Decisões e desafios",
      value: String(project.sections.reduce((n, s) => n + (s.items?.length ?? 0), 0)),
    },
  ];
  const GitHub = brandIcon("GitHub");

  const panel = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    const sections = project.sections.filter((s) => tab?.kinds.includes(s.kind));
    return (
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <CaseSection key={section.kind} section={section} />
        ))}

        {tabId === "visao-geral" && project.steps && (
          <div>
            <h3 className="text-h3 text-text-hi">Como funciona</h3>
            <ol className="mt-3 flex max-w-[76ch] flex-col gap-2">
              {project.steps.map((step, i) => (
                <li key={step} className="grid grid-cols-[24px_minmax(0,1fr)] gap-2 text-body text-text">
                  <span aria-hidden="true" className="text-right font-mono text-small text-text-3">
                    {i + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {tabId === "resultados" && project.milestones && (
          <div>
            <h3 className="text-h3 text-text-hi">Incrementos</h3>
            <ol className="mt-3 border-t border-border">
              {project.milestones.map((m) => (
                <li
                  key={m.id}
                  className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-1.5 text-small"
                >
                  <span className="font-mono text-text-3">{m.id}</span>
                  <span className={m.status === "planned" ? "text-text-2" : "text-text"}>{m.title}</span>
                  <span
                    className={`text-[12px] ${
                      m.status === "done" ? "text-success" : m.status === "next" ? "text-warning" : "text-text-3"
                    }`}
                  >
                    {m.status === "done" ? "entregue" : m.status === "next" ? "próximo" : "planejado"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {tabId === "codigo" && (
          <section aria-labelledby="codigo-titulo" className="flex flex-col gap-4">
            <h2 id="codigo-titulo" className="text-h3 text-text-hi">
              {project.slug === "linux-lab" ? "Teste a ideia central" : "Trecho do repositório"}
            </h2>
            {project.slug === "linux-lab" && (
              <>
                <p className="max-w-[72ch] text-body text-text">
                  A missão pede que só o dono possa acessar deploy.sh, que começa com permissão
                  0755. Rode um comando e veja a árvore de validação avaliar o resultado:
                  comandos diferentes que chegam ao mesmo estado passam.
                </p>
                <MissionTry />
                <h3 className="mt-4 text-h3 text-text-hi">A missão declara condições</h3>
                <p className="max-w-[72ch] text-body text-text">
                  Formato de validação descrito no README do linux-lab-api.
                </p>
                <CodeBlock code={MISSION_YAML} lang="yml" file="mission.yml" path="content › mission.yml" />
                <h3 className="mt-4 text-h3 text-text-hi">A API combina os resultados</h3>
              </>
            )}
            <p className="max-w-[72ch] text-body text-text">{code.note}</p>
            <CodeBlock
              code={code.code}
              lang={code.lang}
              file={code.path.split("/").pop() ?? code.path}
              path={`${code.repo} › ${code.path}`}
              href={code.url}
              startLine={code.startLine}
            />
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="px-5 py-6 md:px-10 md:py-8">
      <header className="grid gap-5 sm:grid-cols-[128px_minmax(0,1fr)]">
        <div className="hidden size-32 items-center justify-center rounded-md border border-border bg-surface sm:flex">
          <FileGlyph file={file} size={72} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-h1-sm text-text-hi lg:text-h1">{project.name}</h1>
            {project.isNew && <Badge variant="new">Novo</Badge>}
          </div>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-text-2">
            <span>Francisco Pedro</span>
            <Badge>{project.badge}</Badge>
            {project.links.github.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:underline"
              >
                {repo.url.replace("https://github.com/", "")}
              </a>
            ))}
          </p>
          <p className="mt-3 max-w-[72ch] text-body-lg text-text">{project.summary}</p>
          <div className="mt-3">
            <LanguageBar languages={project.languages} bar={false} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.github.map((repo, i) => (
              <Button key={repo.url} variant={i === 0 ? "primary" : "secondary"} href={repo.url}>
                {GitHub && <GitHub className="size-3.5" />}
                {project.links.github.length > 1 ? `GitHub — ${repo.label}` : "Repositório"}
              </Button>
            ))}
            <Button variant="secondary" onClick={() => runInTerminal(`cat ${project.slug}`)}>
              <Terminal size={14} strokeWidth={1.5} aria-hidden="true" />
              cat {project.slug}
            </Button>
            {project.slug === "linux-lab" && (
              <Button variant="secondary" onClick={() => runInTerminal("lab")}>
                <Play size={14} strokeWidth={1.5} aria-hidden="true" />
                Jogar uma missão
              </Button>
            )}
          </div>
        </div>
      </header>

      <nav
        aria-label="Seções deste estudo de caso"
        className="mt-6 flex overflow-x-auto border-b border-border-strong [scrollbar-width:none]"
      >
        {tabs.map((tab) => {
          const on = tab.id === active;
          const count = project.sections
            .filter((s) => tab.kinds.includes(s.kind) && (s.kind === "decisoes" || s.kind === "desafios"))
            .reduce((n, s) => n + (s.items?.length ?? 0), 0);
          return (
            <Link
              key={tab.id}
              to={`#${tab.id}`}
              replace
              data-case-tab={tab.id}
              aria-current={on ? "page" : undefined}
              className={`relative flex h-[34px] shrink-0 items-center gap-1.5 px-2.5 text-[11.5px] uppercase tracking-[0.03em] transition-colors duration-100 ${
                on
                  ? "text-text-hi after:absolute after:inset-x-1.5 after:-bottom-px after:h-px after:bg-text-hi"
                  : "text-text-2 hover:text-text"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className="rounded-full bg-surface-3 px-1.5 text-[10px] text-text-hi">{count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 grid gap-8 2xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              id={`aba-${tab.id}`}
              hidden={tab.id !== active}
              className="motion-safe:animate-[view-in_180ms_ease-out]"
            >
              {panel(tab.id)}
            </div>
          ))}
        </div>

        <aside aria-label="Detalhes do projeto" className="flex flex-col gap-5 text-small">
          <div>
            <h2 className="mb-2 text-label uppercase text-text-2">Em números</h2>
            <dl>
              {facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-3 py-0.5">
                  <dt className="text-text-2">{fact.label}</dt>
                  <dd className="text-right text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="mb-2 text-label uppercase text-text-2">Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-label uppercase text-text-2">Recursos</h2>
            <ul className="flex flex-col gap-1">
              {project.links.github.map((repo) => (
                <li key={repo.url}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-link hover:underline"
                  >
                    {GitHub && <GitHub className="size-3.5" />}
                    {repo.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <CaseNav previous={previous} next={next} />
    </div>
  );
}
