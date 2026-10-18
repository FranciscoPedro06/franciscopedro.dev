import { CircleX, GitBranch, Terminal, TriangleAlert } from "lucide-react";
import { ThemeToggle } from "@/components/workbench/ThemeToggle";
import { branch, commits } from "@/content/generated/git-log";
import { routes } from "@/content/routes";
import { readWorkbench, setWorkbench, useHydrated } from "@/lib/workbench";

/**
 * Status bar do workbench (doc 04 §6.7; Release 0.10 no desenho do VS Code):
 * 22px, texto 12px, itens clicáveis com hover de fundo. À esquerda o item de
 * ação em azul (abre o terminal), branch e último commit reais do git-log,
 * problemas e build refletindo o gate; à direita o tema atual. Itens menos
 * críticos cedem espaço por breakpoint (somem via CSS).
 */

const item =
  "flex h-full items-center gap-1 px-1.5 transition-colors duration-100 hover:bg-surface-2 hover:text-text";

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
    <footer className="flex h-[22px] shrink-0 items-stretch border-t border-border bg-surface text-[12px] text-text-2">
      <button
        type="button"
        onClick={() =>
          setWorkbench({ panelOpen: !readWorkbench().panelOpen, panelTab: "terminal" })
        }
        aria-label="Alternar terminal"
        title="Terminal"
        className="flex items-center bg-accent px-2.5 text-on-accent transition-colors duration-100 hover:bg-accent-bright"
      >
        <Terminal size={14} strokeWidth={1.75} aria-hidden="true" />
      </button>

      <span className="flex items-center gap-1 px-2">
        <GitBranch size={13} strokeWidth={1.5} aria-hidden="true" />
        {branch}
      </span>

      {last && (
        <button
          type="button"
          onClick={() =>
            setWorkbench({ activeView: "scm", sidebarCollapsed: false, mobilePanelOpen: true })
          }
          aria-label={`Último commit ${last.hash}, ${last.date}. Abrir Source Control`}
          className={`hidden md:flex ${item}`}
        >
          <span className="font-mono">{last.hash}</span>
          <span aria-hidden="true">·</span>
          {/* Data relativa só após hidratar — o SSR emite a data absoluta, sem mismatch. */}
          <span>{hydrated ? relativeDate(last.date) : last.date}</span>
        </button>
      )}

      <button
        type="button"
        onClick={() => setWorkbench({ panelOpen: true, panelTab: "problems" })}
        aria-label="Abrir painel Problems: 0 erros, 0 avisos"
        className={`hidden sm:flex ${item}`}
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          <CircleX size={13} strokeWidth={1.5} />0
        </span>
        <span aria-hidden="true" className="flex items-center gap-1">
          <TriangleAlert size={13} strokeWidth={1.5} />0
        </span>
      </button>
      {/* Sinal real: a contagem vem do registro único de rotas (ADR-0010 —
          rotas indexáveis + 404 = páginas do build). Abre o Output. */}
      <button
        type="button"
        onClick={() => setWorkbench({ panelOpen: true, panelTab: "output" })}
        aria-label={`Build: ${routes.length + 1} páginas pré-renderizadas. Abrir painel Output`}
        className={`hidden lg:flex ${item}`}
      >
        build · {routes.length + 1} páginas
      </button>

      <div className="ml-auto flex items-stretch">
        <span className="hidden items-center px-1.5 md:flex">UTF-8</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
