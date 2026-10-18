import { ArrowRight, GitCommitHorizontal, Pin, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { FileGlyph } from "@/components/ui/FileGlyph";
import { LanguageBar } from "@/components/ui/LanguageBar";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { commits } from "@/content/generated/git-log";
import { hero, profileCode, terminalHint } from "@/content/home";
import { byOrder, highlighted } from "@/content/projects";
import { site } from "@/content/site";
import { brandIcon } from "@/lib/brand";
import { runInTerminal } from "@/lib/terminal-bus";
import { projectFile } from "@/lib/views";
import { ContributionArt } from "./ContributionArt";

/**
 * Documento `overview` (doc 03 §5.1, ADR-0014) no desenho da Release 0.10:
 * comentário de topo com o papel, o nome grande, o lead e ações no padrão de
 * botão do VS Code; ao lado, o perfil como código. Abaixo, os projetos
 * fixados, a grade de pixels e os commits reais deste repositório. A foto
 * fica ao lado do nome, como o avatar de um perfil do GitHub (no celular,
 * acima — doc 03 §7).
 */
export function Hero() {
  const recent = commits.slice(0, 5);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <ProfilePhoto size={128} priority className="shrink-0" />
          <div>
            <p className="font-mono text-small text-sx-comment">
              <span aria-hidden="true" className="select-none">
                //{" "}
              </span>
              {site.role}
            </p>
            <p className="mt-3 text-h2 font-medium text-text-2">{hero.greeting}</p>
            <h1 id="overview-titulo" className="text-display-sm text-text-hi md:text-display">
              {site.name}
            </h1>
          </div>
        </div>

        <div className="mt-6 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div>
            <p className="max-w-[62ch] text-body-lg text-text-2">{hero.paragraph}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" to="/projetos">
                Ver projetos
              </Button>
              <Button variant="secondary" onClick={() => runInTerminal("help")}>
                <Terminal size={14} strokeWidth={1.5} aria-hidden="true" />
                Abrir terminal
              </Button>
              {site.social.map((link) => {
                const Icon = brandIcon(link.label);
                return (
                  <Button key={link.label} variant="secondary" href={link.url}>
                    {Icon && <Icon className="size-3.5" />}
                    {link.label}
                  </Button>
                );
              })}
              {site.resumeReady && (
                <Button variant="secondary" to="/resume">
                  Currículo
                </Button>
              )}
            </div>
          </div>
          <CodeBlock code={profileCode.code} lang="ts" file={profileCode.file} path={profileCode.path} />
        </div>
      </header>

      <section aria-labelledby="fixados-titulo">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="fixados-titulo" className="flex items-center gap-2 text-h2 text-text-hi">
            <Pin size={17} strokeWidth={1.5} aria-hidden="true" className="text-text-2" />
            Projetos fixados
          </h2>
          <Link to="/projetos" className="group inline-flex items-center gap-1 text-small text-link hover:underline">
            Ver os {byOrder.length} projetos
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <ul className="grid gap-3 lg:grid-cols-3">
          {highlighted.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projetos/${project.slug}`}
                className="flex h-full flex-col gap-2.5 rounded-md border border-border-strong bg-surface p-3.5 transition-colors duration-150 hover:border-accent"
              >
                <span className="flex items-center gap-2">
                  <FileGlyph file={projectFile(project)} size={16} />
                  <span className="text-body font-semibold text-text-hi">{project.name}</span>
                  {project.isNew && <Badge variant="new">Novo</Badge>}
                </span>
                <span className="line-clamp-3 text-small text-text-2">{project.summary}</span>
                <span className="mt-auto pt-1">
                  <LanguageBar languages={project.languages} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContributionArt />

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section aria-labelledby="commits-titulo" className="rounded-lg border border-border-strong p-4">
          <h2 id="commits-titulo" className="text-body text-text-hi">
            Commits recentes
            <span className="ml-2 text-[12px] font-normal text-text-2">franciscopedro.dev</span>
          </h2>
          {recent.length === 0 ? (
            <p className="mt-2 text-small text-text-2">Histórico indisponível neste build.</p>
          ) : (
            <ol className="mt-2">
              {recent.map((commit) => (
                <li
                  key={commit.hash}
                  className="grid grid-cols-[16px_minmax(0,1fr)] gap-2.5 border-b border-border py-1.5 last:border-0"
                >
                  <GitCommitHorizontal size={15} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 text-text-3" />
                  <span className="min-w-0">
                    <span className="block truncate text-small text-text">
                      {commit.subject.replace(/^@\s*/, "")}
                    </span>
                    <span className="block text-[11.5px] text-text-3">
                      <span className="font-mono">{commit.hash}</span> · {commit.date}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section aria-labelledby="terminal-titulo" className="flex flex-col gap-2.5 rounded-lg border border-border-strong p-4">
          <h2 id="terminal-titulo" className="flex items-center gap-2 text-body text-text-hi">
            <Terminal size={15} strokeWidth={1.5} aria-hidden="true" className="text-text-2" />
            {terminalHint.title}
          </h2>
          <p className="text-small text-text-2">{terminalHint.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {terminalHint.commands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => runInTerminal(command)}
                className="h-6 rounded-sm bg-button-2 px-2 font-mono text-[12px] text-text transition-colors duration-100 hover:bg-button-2-hover"
              >
                {command}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
