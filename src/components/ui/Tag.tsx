/** Tecnologia em card/case (doc 04 §6.2) — sem cor por tecnologia. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-sm border border-border bg-surface-2 px-2 py-1 font-mono text-label normal-case tracking-normal text-text-2">
      {children}
    </span>
  );
}
