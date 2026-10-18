import { Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { applyChmod, evaluateMission, MISSION, permissionString } from "@/lib/mission";
import { runInTerminal } from "@/lib/terminal-bus";

/**
 * "Teste a ideia central" (Release 0.10): a missão pede que só o dono acesse
 * deploy.sh; cada botão roda um chmod diferente sobre o arquivo em 0755 e a
 * árvore de validação avalia o estado — comandos diferentes que chegam ao
 * mesmo estado passam. A missão completa roda no terminal do painel.
 */
const COMMANDS = ["700", "u=rwx,go=", "go-rwx", "755", "600"];

export function MissionTry() {
  const [spec, setSpec] = useState<string | null>(null);
  const mode = spec ? applyChmod(MISSION.initialMode, spec) : null;
  const result = mode !== null ? evaluateMission(mode) : null;
  const status = (s: string) =>
    s === "passed" ? (
      <span className="text-term-green">passed</span>
    ) : (
      <span className="text-term-red">failed</span>
    );

  return (
    <div>
      <div
        role="group"
        aria-label="Comandos para testar"
        className="flex flex-wrap gap-1.5"
      >
        {COMMANDS.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={spec === c}
            onClick={() => setSpec(c)}
            className={`h-7 rounded-sm px-2.5 font-mono text-[12px] transition-colors duration-100 ${
              spec === c
                ? "bg-accent text-on-accent"
                : "bg-button-2 text-text hover:bg-button-2-hover"
            }`}
          >
            chmod {c} {MISSION.file}
          </button>
        ))}
      </div>
      <pre
        aria-live="polite"
        className="mt-3 min-h-[120px] overflow-x-auto rounded-md border border-border bg-surface px-3.5 py-2.5 font-mono text-[12.5px] leading-[1.75] text-text"
      >
        {mode === null || !result ? (
          <span className="text-text-3">Escolha um comando acima.</span>
        ) : (
          <>
            $ chmod {spec} {MISSION.file}
            {"\n"}$ ls -l {MISSION.file}
            {"\n"}
            {permissionString(mode)} 1 student student 142 {MISSION.file}
            {"\n"}$ validar{"\n"}
            {status(result.status)} all
            {result.checks.map((check, i) => (
              <span key={check.id}>
                {"\n"}
                {i === result.checks.length - 1 ? "└─ " : "├─ "}
                {status(check.status)} {check.id.padEnd(7)}{" "}
                <span className="text-text-3">{check.type}</span> {check.detail}
              </span>
            ))}
          </>
        )}
      </pre>
      <div className="mt-3">
        <Button variant="primary" onClick={() => runInTerminal("lab")}>
          <Terminal size={14} strokeWidth={1.5} aria-hidden="true" />
          Jogar a missão completa no terminal
        </Button>
      </div>
    </div>
  );
}
