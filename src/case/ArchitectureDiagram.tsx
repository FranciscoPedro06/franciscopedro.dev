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
    <figure className="mt-6 rounded-md border border-border bg-surface p-4 sm:p-6">
      {/* Largura mínima para o texto do SVG seguir legível; rola no estreito. */}
      <div className="scrollbar-ide overflow-x-auto">
        <div className="min-w-[760px]">
          <Diagram ariaLabel={diagram.ariaLabel} />
        </div>
      </div>
      {diagram.caption && (
        <figcaption className="mt-4 text-small text-text-3">
          {diagram.caption}
        </figcaption>
      )}
    </figure>
  );
}
