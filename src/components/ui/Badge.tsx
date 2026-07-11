/** Metadado de status do projeto (doc 04 §6.3): "TCC · 2026", "EM EQUIPE". */
export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      <span className="type-label text-text-3">{children}</span>
    </span>
  );
}
