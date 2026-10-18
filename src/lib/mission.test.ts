import { describe, expect, it } from "vitest";
import { applyChmod, evaluateMission, MISSION, octal, permissionString } from "./mission";

/**
 * A mini-missão do Linux Lab precisa se comportar como o chmod real: modos
 * diferentes que chegam ao mesmo estado passam; o resto falha.
 */
describe("mini-missão do Linux Lab", () => {
  it("aceita octal e simbólico que chegam ao mesmo estado", () => {
    const start = MISSION.initialMode;
    for (const spec of ["700", "0700", "u=rwx,go=", "go-rwx", "g-rx,o-rx"]) {
      const mode = applyChmod(start, spec);
      expect(mode, spec).toBe(0o700);
      expect(evaluateMission(mode ?? 0).status, spec).toBe("passed");
    }
  });

  it("reprova estados diferentes do pedido", () => {
    for (const spec of ["755", "600", "u-x", "o-r"]) {
      const mode = applyChmod(MISSION.initialMode, spec) ?? 0;
      const result = evaluateMission(mode);
      expect(result.status, spec).toBe("failed");
      expect(result.checks.find((c) => c.id === "mode")?.status, spec).toBe("failed");
    }
  });

  it("recusa modos inválidos como o chmod", () => {
    expect(applyChmod(0o755, "abc")).toBeNull();
    expect(applyChmod(0o755, "u+z")).toBeNull();
  });

  it("formata como ls -l e stat", () => {
    expect(permissionString(0o755)).toBe("-rwxr-xr-x");
    expect(permissionString(0o700)).toBe("-rwx------");
    expect(octal(0o700)).toBe("0700");
  });
});
