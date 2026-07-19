/**
 * Glifo de tipo de arquivo (Release 0.9.2): badge tipográfico mono derivado
 * da extensão — TS, PY, JA, JS… — no lugar de um ícone genérico único. O
 * reconhecimento é pela forma **tipográfica** (a identidade é de três vozes,
 * ADR-0016) e a cor vem do contexto (`currentColor`), mesmo princípio dos
 * ícones de marca (doc 04 §7). Nenhum mapeamento bespoke: as duas primeiras
 * letras da extensão, maiúsculas — regra derivável, como tudo no workbench.
 */
export function FileGlyph({
  file,
  className,
}: {
  file: string;
  className?: string;
}) {
  const ext = file.split(".").pop() ?? "";
  return (
    <span
      aria-hidden="true"
      className={`flex h-[15px] w-[17px] shrink-0 select-none items-center justify-center rounded-[3px] border border-border-strong font-mono text-[8px] font-semibold leading-none ${className ?? ""}`}
    >
      {ext.slice(0, 2).toUpperCase()}
    </span>
  );
}
