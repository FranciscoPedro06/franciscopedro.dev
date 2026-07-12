import type { DiagramRef } from "@/content/types";
import { DIAGRAMS } from "./diagrams";

/**
 * Moldura dos diagramas (doc 04 §6.10): fundo surface, borda, radius-lg,
 * legenda opcional. O SVG carrega `role="img"` + `aria-label`; a descrição
 * completa vive na prosa da seção (o diagrama nunca é a única fonte).
 */
export function ArchitectureDiagram({ diagram }: { diagram: DiagramRef }) {
  const Diagram = DIAGRAMS[diagram.id];
  if (!Diagram) return null;

  return (
    <figure className="mt-8 rounded-lg border border-border bg-surface p-4 sm:p-8">
      <Diagram ariaLabel={diagram.ariaLabel} />
      {diagram.caption && (
        <figcaption className="mt-4 text-small text-text-3">
          {diagram.caption}
        </figcaption>
      )}
    </figure>
  );
}
