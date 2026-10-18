import { FileCode, Folder } from "lucide-react";
import { extIcon } from "@/lib/tech";

/**
 * Glifo de tipo de arquivo (Release 0.9.2 → 0.10): o logo oficial da
 * linguagem (devicon, `public/icons/tech/`), como nos temas de ícones do
 * VS Code — React para `.tsx`, Python para `.py` (ADR-0017, ampliado no
 * ADR-0018). Servido como arquivo: zero bytes no JS e sem colisão de ids de
 * gradiente entre instâncias. Extensão sem logo cai no ícone genérico.
 */
export function FileGlyph({
  file,
  className,
  size = 14,
}: {
  file: string;
  className?: string;
  size?: number;
}) {
  const src = extIcon(file);
  if (!src) {
    const Icon = file.includes(".") ? FileCode : Folder;
    return (
      <Icon
        size={size}
        strokeWidth={1.5}
        aria-hidden="true"
        className={`shrink-0 ${className ?? ""}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      decoding="async"
      className={`shrink-0 ${className ?? ""}`}
    />
  );
}
