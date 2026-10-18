/**
 * Mini-missão do Linux Lab (Release 0.10): a ideia central do projeto — a
 * plataforma confere o estado do sistema, não o comando digitado — reduzida
 * a um arquivo e uma condição de permissão. Lógica pura, usada pelo terminal
 * do painel inferior e pela aba "Código" do case.
 */

export const MISSION = {
  file: "deploy.sh",
  path: "/home/student/deploy.sh",
  /** Permissão inicial: legível e executável por qualquer usuário. */
  initialMode: 0o755,
  /** O que a missão exige: só o dono lê, escreve e executa. */
  wantedMode: 0o700,
} as const;

const PERMISSION_BITS: Record<string, number> = { r: 4, w: 2, x: 1 };
const WHO_SHIFT: Record<string, number> = { u: 6, g: 3, o: 0 };

/**
 * Aplica um modo do chmod (octal "700" ou simbólico "u=rwx,go=", "go-rwx")
 * a um modo atual. Devolve `null` para um modo inválido, como o chmod real.
 */
export function applyChmod(mode: number, spec: string): number | null {
  if (/^[0-7]{3,4}$/.test(spec)) return parseInt(spec.slice(-3), 8);
  let next = mode;
  for (const clause of spec.split(",")) {
    const match = /^([ugoa]*)([+\-=])([rwx]*)$/.exec(clause);
    if (!match) return null;
    const [, whoRaw, op, perms] = match;
    const who = (whoRaw || "a").replace("a", "ugo");
    let bits = 0;
    for (const p of perms) bits |= PERMISSION_BITS[p];
    for (const w of new Set(who)) {
      const shift = WHO_SHIFT[w];
      if (op === "+") next |= bits << shift;
      else if (op === "-") next &= ~(bits << shift);
      else next = (next & ~(7 << shift)) | (bits << shift);
    }
  }
  return next;
}

/** "-rwxr-xr-x", como no `ls -l`. */
export function permissionString(mode: number): string {
  return (
    "-" +
    [6, 3, 0]
      .map(
        (shift) =>
          ((mode >> shift) & 4 ? "r" : "-") +
          ((mode >> shift) & 2 ? "w" : "-") +
          ((mode >> shift) & 1 ? "x" : "-")
      )
      .join("")
  );
}

/** "0755". */
export const octal = (mode: number) => "0" + mode.toString(8).padStart(3, "0");

export type CheckStatus = "passed" | "failed";

export interface MissionResult {
  status: CheckStatus;
  checks: { id: string; type: string; status: CheckStatus; detail: string }[];
}

/** Avalia a árvore `all: [exists, mode]` da missão contra o estado do arquivo. */
export function evaluateMission(mode: number): MissionResult {
  const modeOk = mode === MISSION.wantedMode;
  return {
    status: modeOk ? "passed" : "failed",
    checks: [
      { id: "exists", type: "file_exists", status: "passed", detail: MISSION.path },
      {
        id: "mode",
        type: "file_permissions",
        status: modeOk ? "passed" : "failed",
        detail: `esperado ${octal(MISSION.wantedMode)}, encontrado ${octal(mode)}`,
      },
    ],
  };
}
