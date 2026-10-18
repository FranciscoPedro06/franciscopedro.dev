import { ChevronDown, ExternalLink, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { TechIcon } from "@/components/ui/TechIcon";
import { byOrder, findProject } from "@/content/projects";
import { site } from "@/content/site";
import { brandIcon } from "@/lib/brand";
import { languageColor } from "@/lib/tech";
import { setWorkbench, useWorkbench } from "@/lib/workbench";
import { caseTabs } from "@/case/caseTabs";

/**
 * Painel de detalhes à direita (Release 0.10): muda com o arquivo aberto.
 * Num estudo de caso, as linguagens do projeto e as abas; no resto, o
 * perfil, as linguagens que aparecem nos projetos e os contatos. Só em
 * telas largas (xl+) e recolhível pela title bar (estado de cromo, ADR-0012).
 */
function Section({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="pb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex h-[22px] w-full items-center gap-0.5 px-1 text-label uppercase text-text-hi"
      >
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          className={`transition-transform duration-100 ${open ? "" : "-rotate-90"}`}
        />
        {title}
      </button>
      {open && <div className="pt-1">{children}</div>}
    </div>
  );
}

function Bar({ name, value, percent }: { name: string; value: string; percent: number }) {
  return (
    <div className="flex flex-col gap-1.5 px-5 py-1.5">
      <span className="flex items-center gap-1.5 text-small text-text">
        <TechIcon name={name} size={14} />
        {name}
        <span className="ml-auto font-mono text-[11px] text-text-2">{value}</span>
      </span>
      <span
        aria-hidden="true"
        className="block h-1.5 overflow-hidden rounded-full bg-surface-3"
      >
        <span
          className="block h-full"
          style={{ width: `${percent}%`, background: languageColor(name) }}
        />
      </span>
    </div>
  );
}

/** Em quantos projetos cada linguagem aparece (das linguagens medidas). */
const PRESENCE = (() => {
  const count = new Map<string, number>();
  for (const p of byOrder)
    for (const l of p.languages) count.set(l.name, (count.get(l.name) ?? 0) + 1);
  return [...count.entries()]
    .filter(([name]) => !["HTML", "CSS"].includes(name))
    .sort((a, b) => b[1] - a[1]);
})();

export function Inspector() {
  const { pathname } = useLocation();
  const { inspectorOpen } = useWorkbench();
  if (!inspectorOpen) return null;

  const project = findProject(pathname.match(/^\/projetos\/([^/]+)/)?.[1] ?? "");

  return (
    <aside
      aria-label="Painel de detalhes"
      className="hidden w-[260px] shrink-0 flex-col border-l border-border bg-surface xl:flex"
    >
      <div className="flex h-[35px] shrink-0 items-center pl-5 pr-2">
        <span className="text-label uppercase tracking-[0.04em] text-text-2">
          {project ? "Detalhes" : "Perfil"}
        </span>
        <button
          type="button"
          onClick={() => setWorkbench({ inspectorOpen: false })}
          aria-label="Fechar painel de detalhes"
          className="ml-auto flex size-6 items-center justify-center rounded-md text-text-2 hover:bg-surface-2 hover:text-text"
        >
          <X size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="scrollbar-ide min-h-0 flex-1 overflow-y-auto">
        {project ? (
          <>
            <Section title="Linguagens">
              {project.languages.map((l) => (
                <Bar
                  key={l.name}
                  name={l.name}
                  value={`${l.percent}%`}
                  percent={l.percent}
                />
              ))}
              <p className="px-5 pt-1 text-[11.5px] text-text-2">
                Aproximado, por bytes de código nos repositórios.
              </p>
            </Section>
            <Section title="Estrutura">
              <ul>
                {caseTabs(project).map((tab) => (
                  <li key={tab.id}>
                    <Link
                      to={`#${tab.id}`}
                      replace
                      className="block px-5 py-1 text-small text-text-2 hover:bg-surface-2 hover:text-text"
                    >
                      {tab.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          </>
        ) : (
          <>
            <Section title="Perfil">
              <div className="flex items-center gap-3 px-5 py-1">
                <ProfilePhoto size={44} besideName className="shrink-0" />
                <span>
                  <span className="block text-small font-semibold text-text-hi">
                    {site.name}
                  </span>
                  <span className="block text-[12px] leading-snug text-text-2">
                    {site.role}
                  </span>
                </span>
              </div>
            </Section>
            <Section title="Linguagens nos projetos">
              {PRESENCE.map(([name, n]) => (
                <Bar
                  key={name}
                  name={name}
                  value={`${n} de ${byOrder.length}`}
                  percent={(n / byOrder.length) * 100}
                />
              ))}
              <p className="px-5 pt-1 text-[11.5px] text-text-2">
                Em quantos dos {byOrder.length} projetos a linguagem aparece.
              </p>
            </Section>
            <Section title="Conectar">
              <ul>
                {[
                  ...site.social,
                  { label: "Código deste site", url: site.repositoryUrl, external: true },
                ].map((link) => {
                  const Icon = brandIcon(link.label);
                  return (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-1 text-small text-text hover:bg-surface-2"
                      >
                        {Icon ? (
                          <Icon className="size-4" />
                        ) : (
                          <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                        )}
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Section>
          </>
        )}
      </div>
    </aside>
  );
}
