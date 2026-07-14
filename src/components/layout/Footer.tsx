import { Check, GitBranch, TriangleAlert } from "lucide-react";
import { ThemeToggle } from "@/components/workbench/ThemeToggle";
import { footerCopy, site } from "@/content/site";
import { setWorkbench } from "@/lib/workbench";

/**
 * Status bar do workbench (doc 04 §6.7): a faixa inferior da aplicação — uma
 * linha densa em mono, com indicadores técnicos **verdadeiros** do projeto à
 * esquerda e os contatos/colofão/copyright de sempre à direita (conteúdo
 * editorial preservado), além do alternador de tema. Itens menos críticos
 * cedem espaço por breakpoint (somem via CSS, seguem no DOM).
 */

const chip =
  "font-mono text-label font-normal normal-case tracking-normal text-text-3";
const link = `${chip} transition-colors duration-150 hover:text-text`;

/** Fatos técnicos estáveis do projeto (a stack do colofão + o pipeline). */
const FACTS = ["UTF-8", "TypeScript", "React", "Vite", "Pre-render", "SSR", "SEO", "Vercel"];

export function Footer() {
  return (
    <footer className="flex h-7 shrink-0 items-center gap-3 border-t border-border bg-surface px-3 text-text-3">
      {/* Esquerda: branch, problemas, build */}
      <span className={`flex items-center gap-1.5 ${chip}`}>
        <GitBranch size={12} strokeWidth={1.5} aria-hidden="true" />
        main
      </span>
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
      <span className={`hidden items-center gap-1.5 text-success md:flex ${chip}`}>
        <Check size={12} strokeWidth={2} aria-hidden="true" />
        <span className="text-text-3">Build · Tests ✓</span>
      </span>

      {/* Direita: fatos técnicos + contatos + colofão + copyright + tema */}
      <div className="ml-auto flex items-center gap-3">
        <span aria-hidden="true" className="hidden items-center gap-3 lg:flex">
          {FACTS.map((fact) => (
            <span key={fact} className={chip}>
              {fact}
            </span>
          ))}
        </span>

        <nav
          aria-label="Contatos"
          className="flex items-center gap-3 border-l border-border pl-3"
        >
          {site.social.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              {item.label} ↗
            </a>
          ))}
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
