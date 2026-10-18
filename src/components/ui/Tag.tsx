import { TechIcon } from "./TechIcon";

/**
 * Tecnologia em card/case (doc 04 §6.2). Release 0.10: com o logo oficial
 * quando existe (devicon, ADR-0018); sem logo, só o nome.
 */
export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex h-[22px] items-center gap-1.5 rounded-sm border border-border-strong px-1.5 text-[11.5px] text-text">
      <TechIcon name={children} size={13} />
      {children}
    </span>
  );
}
