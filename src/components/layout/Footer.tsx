import { Check, GitBranch, TriangleAlert } from "lucide-react";
import { ThemeToggle } from "@/components/workbench/ThemeToggle";
import { branch, commits } from "@/content/generated/git-log";
import { footerCopy, site } from "@/content/site";
import { brandIcon } from "@/lib/brand";
import { setWorkbench, useHydrated } from "@/lib/workbench";

/**
 * Status bar do workbench (doc 04 §6.7): a faixa inferior — densa em mono, com
 * indicadores técnicos **verdadeiros** à esquerda (branch e último commit reais
 * do git-log; problemas e build refletindo o gate) e contatos/colofão à
 * direita. Itens menos críticos cedem espaço por breakpoint (somem via CSS).
 */

const chip =
  "font-mono text-label font-normal normal-case tracking-normal text-text-3";
const link = `${chip} transition-colors duration-150 hover:text-text`;

/** Data relativa curta e honesta (pt-BR). Só roda no cliente (ver `useHydrated`). */
function relativeDate(iso: string): string {
  const then = new Date(`${iso}T12:00:00`).getTime();
  const days = Math.round((Date.now() - then) / 86_400_000);
  if (days <= 0) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days}d`;
  const months = Math.round(days / 30);
  if (months < 12) return `há ${months} ${months > 1 ? "meses" : "mês"}`;
  const years = Math.round(months / 12);
  return `há ${years} ${years > 1 ? "anos" : "ano"}`;
}

export function Footer() {
  const hydrated = useHydrated();
  const last = commits[0];

  return (
    <footer className="flex h-7 shrink-0 items-center gap-3 border-t border-border bg-surface px-3 text-text-3">
      {/* Esquerda: branch + último commit (reais) + problemas + build */}
      <span className={`flex items-center gap-1.5 ${chip}`}>
        <GitBranch size={12} strokeWidth={1.5} aria-hidden="true" />
        {branch}
      </span>

      {last && (
        <button
          type="button"
          onClick={() =>
            setWorkbench({ activeView: "scm", sidebarCollapsed: false, mobilePanelOpen: true })
          }
          aria-label={`Último commit ${last.hash}, ${last.date}. Abrir Source Control`}
          className={`hidden items-center gap-1.5 rounded-sm px-1 transition-colors duration-150 hover:text-text md:flex ${chip}`}
        >
          <span className="text-accent">{last.hash}</span>
          <span aria-hidden="true">·</span>
          {/* Data relativa só após hidratar — o SSR emite a data absoluta, sem mismatch. */}
          <span>{hydrated ? relativeDate(last.date) : last.date}</span>
        </button>
      )}

      <button
        type="button"
        onClick={() => setWorkbench({ panelOpen: true, panelTab: "problems" })}
        aria-label="Abrir painel Problems: 0 erros, 0 avisos"
        className={`hidden items-center gap-2 rounded-sm px-1 transition-colors duration-150 hover:text-text sm:flex ${chip}`}
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          <Check size={12} strokeWidth={2} />0
        </span>
        <span aria-hidden="true" className="flex items-center gap-1">
          <TriangleAlert size={11} strokeWidth={1.5} />0
        </span>
      </button>
      <span className={`hidden items-center gap-1.5 text-success lg:flex ${chip}`}>
        <Check size={12} strokeWidth={2} aria-hidden="true" />
        <span className="text-text-3">Build · Tests ✓</span>
      </span>

      {/* Direita: contatos + colofão + copyright + tema */}
      <div className="ml-auto flex items-center gap-3">
        <nav
          aria-label="Contatos"
          className="flex items-center gap-3 border-l border-border pl-3"
        >
          {site.social.map((item) => {
            const Icon = brandIcon(item.label);
            return (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 ${link}`}
              >
                {Icon && <Icon className="size-3.5" />}
                {item.label}
              </a>
            );
          })}
          {site.email && (
            <a href={`mailto:${site.email}`} className={`hidden sm:inline ${link}`}>
              {site.email}
            </a>
          )}
          <a
            href={site.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline ${link}`}
          >
            {footerCopy.colophon.split(" — ")[0]}
          </a>
        </nav>

        <span className={`hidden xl:inline ${chip}`}>{footerCopy.copyright}</span>

        <span className="border-l border-border pl-3">
          <ThemeToggle />
        </span>
      </div>
    </footer>
  );
}
