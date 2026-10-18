import { X } from "lucide-react";
import { type PanelTab, setWorkbench, useWorkbench } from "@/lib/workbench";
import { Terminal } from "./Terminal";

/**
 * Painel inferior (doc 04 §6.24): abas ao estilo VS Code. Conteúdo honesto e
 * baseado no projeto real — o Terminal é um shell interativo sobre o conteúdo
 * do site (Release 0.10), Problems reflete o gate, etc. Chunk `lazy`.
 */

const TABS: { id: PanelTab; label: string }[] = [
  { id: "problems", label: "Problems" },
  { id: "output", label: "Output" },
  { id: "terminal", label: "Terminal" },
  { id: "debug", label: "Debug Console" },
  { id: "ports", label: "Ports" },
];

const OUTPUT: string[] = [
  "[vite] pré-render (ADR-0010): react-dom/server sobre o entry SSR",
  "[seo] head por rota: canonical + OpenGraph + JSON-LD",
  "[budgets] JS inicial dentro do limite (doc 06 §7)",
  "[deploy] Vercel — build fixado no vercel.json",
];

const PROBLEMS: string[] = [
  "ESLint — 0 problemas",
  "tsc --noEmit — 0 erros",
  "Vitest — suíte verde",
  "Build — 8 páginas pré-renderizadas",
];

const PORTS: { port: string; label: string }[] = [
  { port: "5173", label: "vite (dev server)" },
  { port: "4173", label: "vite preview" },
];

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul className="px-4 py-2 text-small text-text-3">
      {lines.map((line, i) => (
        <li key={i} className="py-0.5">
          {line}
        </li>
      ))}
    </ul>
  );
}

function ProblemsView() {
  return (
    <div className="px-4 py-2 text-small">
      <p className="mb-1.5 text-text-2">
        <span className="text-success">0 errors</span> ·{" "}
        <span className="text-text-2">0 warnings</span>
      </p>
      <Lines lines={PROBLEMS} />
    </div>
  );
}

function Ports() {
  return (
    <table className="w-full text-small">
      <thead>
        <tr className="text-left text-label text-text-3">
          <th className="px-4 py-1 font-normal">Port</th>
          <th className="px-4 py-1 font-normal">Process</th>
        </tr>
      </thead>
      <tbody className="text-text-2">
        {PORTS.map((row) => (
          <tr key={row.port}>
            <td className="px-4 py-0.5 text-link">{row.port}</td>
            <td className="px-4 py-0.5">{row.label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function BottomPanel() {
  const { panelTab } = useWorkbench();

  const body =
    panelTab === "terminal" ? (
      <Terminal />
    ) : panelTab === "output" ? (
      <Lines lines={OUTPUT} />
    ) : panelTab === "ports" ? (
      <Ports />
    ) : panelTab === "debug" ? (
      <Lines lines={["Nenhuma sessão de debug ativa."]} />
    ) : (
      <ProblemsView />
    );

  return (
    <section
      aria-label="Painel inferior"
      className="flex h-56 shrink-0 flex-col border-t border-border bg-surface md:h-64"
    >
      <div className="flex h-[35px] shrink-0 items-center px-2">
        <div role="tablist" aria-label="Painéis" className="flex overflow-x-auto">
          {TABS.map((tab) => {
            const on = tab.id === panelTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setWorkbench({ panelTab: tab.id })}
                className={`mx-1.5 flex h-[35px] items-center border-b px-0.5 text-[11px] uppercase tracking-[0.02em] transition-colors duration-100 ${
                  on
                    ? "border-text-hi text-text-hi"
                    : "border-transparent text-text-2 hover:text-text"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setWorkbench({ panelOpen: false })}
          aria-label="Fechar painel inferior"
          className="ml-auto flex size-6 items-center justify-center rounded-md text-text-2 transition-colors duration-100 hover:bg-surface-2 hover:text-text"
        >
          <X size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div
        className={`min-h-0 flex-1 font-mono ${panelTab === "terminal" ? "" : "scrollbar-ide overflow-y-auto"}`}
      >
        {body}
      </div>
    </section>
  );
}
