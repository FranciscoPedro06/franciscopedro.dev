import { Atom, Braces, Coffee, CodeXml, FileCode, Worm } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Glifo de tipo de arquivo (Release 0.9.2; forma SVG por decisão do Francisco
 * na validação — substituiu o badge de letras): ícone derivado da extensão,
 * na mesma voz stroked do cromo (Lucide, stroke 1.5) — não logos de marca
 * preenchidos, que destoariam a 13 px. Reconhecimento pela forma
 * (Atom→React, Worm→Python, Coffee→Java), cor pelo contexto (`currentColor`)
 * — mesmo princípio dos ícones de marca (doc 04 §7).
 */
const ICON_BY_EXT: Record<string, LucideIcon> = {
  tsx: Atom,
  ts: Atom,
  js: Braces,
  py: Worm,
  java: Coffee,
  html: CodeXml,
};

export function FileGlyph({
  file,
  className,
}: {
  file: string;
  className?: string;
}) {
  const ext = file.split(".").pop() ?? "";
  const Icon = ICON_BY_EXT[ext] ?? FileCode;
  return (
    <Icon
      size={13}
      strokeWidth={1.5}
      aria-hidden="true"
      className={`shrink-0 ${className ?? ""}`}
    />
  );
}
