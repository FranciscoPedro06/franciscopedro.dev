import { setWorkbench, type Theme, useWorkbench } from "@/lib/workbench";

/**
 * Painel Settings (doc 04 §6.13): a única parte funcional é a aparência
 * (tema, ADR-0013); o restante é o retrato **verdadeiro** do ferramental do
 * projeto (read-only) — nada inventado (doc 00 "evidência acima de adjetivo").
 */

const THEMES: { id: Theme; label: string }[] = [
  { id: "dark", label: "Dark (grafite)" },
  { id: "light", label: "Light (papel)" },
];

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
    <div className="border-b border-border px-4 py-3">
      <p className="type-label mb-2 text-text-3">{title}</p>
      {children}
    </div>
  );
}

export function SettingsPanel() {
  const { theme } = useWorkbench();

  return (
    <div className="font-mono text-small">
      <Section title="Appearance">
        <div className="flex flex-col gap-1">
          {THEMES.map((option) => {
            const on = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setWorkbench({ theme: option.id })}
                aria-pressed={on}
                className={`flex items-center gap-2 rounded-sm px-2 py-1 text-left transition-colors duration-150 ${
                  on
                    ? "bg-accent-dim text-text"
                    : "text-text-3 hover:bg-surface-2 hover:text-text-2"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full border ${
                    on ? "border-accent bg-accent" : "border-border-strong"
                  }`}
                />
                {option.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Workspace">
        <dl className="flex flex-col gap-1.5">
          {WORKSPACE.map((row) => (
            <div key={row.key} className="flex items-baseline justify-between gap-3">
              <dt className="truncate text-text-3">{row.key}</dt>
              <dd className="shrink-0 text-text-2">{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-label text-text-3">read-only · .vscode/settings</p>
      </Section>
    </div>
  );
}
