import { Check } from "lucide-react";
import { setWorkbench, THEMES, useWorkbench } from "@/lib/workbench";

/**
 * Painel Settings (doc 04 §6.13): a parte funcional é a aparência — os temas
 * de cores reais de editor (ADR-0013 + ADR-0018), cada um com uma prévia nas
 * próprias cores; o restante é o retrato **verdadeiro** do ferramental do
 * projeto (read-only) — nada inventado (doc 00 "evidência acima de adjetivo").
 */

/** Fatos reais do repositório — não inventar. */
const WORKSPACE: { key: string; value: string }[] = [
  { key: "editor.formatter", value: "Prettier" },
  { key: "editor.linter", value: "ESLint (flat)" },
  { key: "typescript.strict", value: "true" },
  { key: "css.framework", value: "Tailwind v4" },
  { key: "test.runner", value: "Vitest" },
  { key: "build.tool", value: "Vite + pre-render" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-3">
      <p className="mb-2 px-5 text-label uppercase text-text-hi">{title}</p>
      {children}
    </div>
  );
}

export function SettingsPanel() {
  const { theme } = useWorkbench();

  return (
    <div className="text-small">
      <Section title="Appearance">
        <div className="flex flex-col">
          {THEMES.map((option) => {
            const on = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setWorkbench({ theme: option.id })}
                aria-pressed={on}
                className={`flex items-center gap-3 px-5 py-1.5 text-left transition-colors duration-100 ${
                  on ? "bg-surface-3 text-text-hi" : "text-text hover:bg-surface-2"
                }`}
              >
                {/* Prévia nas cores reais do tema (barra lateral + editor + sintaxe) */}
                <span
                  aria-hidden="true"
                  className="grid h-8 w-12 shrink-0 grid-cols-[9px_1fr] overflow-hidden rounded-md border border-border-strong"
                >
                  <span style={{ background: option.surface }} />
                  <span
                    className="flex flex-col justify-center gap-[3px] px-1"
                    style={{ background: option.bg }}
                  >
                    {option.swatches.map((color, i) => (
                      <span
                        key={color}
                        className="h-[3px] rounded-[1px]"
                        style={{ background: color, width: `${[70, 90, 50][i]}%` }}
                      />
                    ))}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block">{option.label}</span>
                  <span className="block text-label font-normal text-text-2">
                    {option.note}
                  </span>
                </span>
                {on && <Check size={14} strokeWidth={1.75} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Workspace">
        <dl className="flex flex-col gap-1.5 px-5 font-mono">
          {WORKSPACE.map((row) => (
            <div key={row.key} className="flex items-baseline justify-between gap-3">
              <dt className="truncate text-sx-property">{row.key}</dt>
              <dd className="shrink-0 text-sx-string">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 px-5 text-label font-normal text-text-3">
          read-only · .vscode/settings
        </p>
      </Section>
    </div>
  );
}
