import { techIcon } from "@/lib/tech";

/**
 * Logo oficial de uma tecnologia (devicon, ADR-0018). Decorativo: o nome
 * sempre acompanha o ícone no texto, então o `alt` é vazio. Sem logo
 * conhecido, não renderiza nada (nunca um ícone inventado).
 */
export function TechIcon({
  name,
  size = 14,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const src = techIcon(name);
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`shrink-0 ${className ?? ""}`}
    />
  );
}
