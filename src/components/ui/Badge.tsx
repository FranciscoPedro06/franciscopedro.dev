/**
 * Metadado de status do projeto (doc 04 §6.3): "TCC · 2026", "EM EQUIPE".
 * Release 0.10: etiqueta contornada como os badges do VS Code; a variante
 * `new` usa o azul de ação para marcar projeto recém-adicionado.
 */
export function Badge({
  children,
  variant = "default",
}: {
  children: string;
  variant?: "default" | "new";
}) {
  return (
    <span
      className={`inline-flex h-[18px] items-center rounded-sm border px-1.5 text-[10.5px] font-semibold uppercase tracking-[0.02em] ${
        variant === "new"
          ? "border-accent bg-accent text-on-accent"
          : "border-border-strong text-text-2"
      }`}
    >
      {children}
    </span>
  );
}
