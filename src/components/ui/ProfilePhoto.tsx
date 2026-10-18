import { site } from "@/content/site";

interface ProfilePhotoProps {
  /** Largura exibida em CSS px (vai em `sizes`; o `srcset` escolhe 1×/2×). */
  size: number;
  className?: string;
  /** Foto LCP do hero: eager + fetchpriority alta (doc 12 §4). */
  priority?: boolean;
  /**
   * Ao lado do nome escrito, a foto repete a informação — alt vazio, para o
   * leitor de tela não anunciar o nome duas vezes.
   */
  besideName?: boolean;
}

/** Foto pessoal em `<picture>` AVIF → WebP, quadrada e redonda (doc 12). */
export function ProfilePhoto({ size, className = "", priority = false, besideName = false }: ProfilePhotoProps) {
  const { base, widths, alt } = site.photo;
  const srcSet = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const sizes = `${size}px`;
  const largest = widths[widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <img
        src={`${base}-${largest}.webp`}
        srcSet={srcSet("webp")}
        sizes={sizes}
        alt={besideName ? "" : alt}
        width={size}
        height={size}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // React 18 não conhece `fetchPriority`; o atributo em minúsculas passa direto.
        {...(priority ? { fetchpriority: "high" } : {})}
        className={`rounded-full border border-border-strong bg-surface-3 object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    </picture>
  );
}
