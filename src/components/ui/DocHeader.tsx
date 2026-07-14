import type { ReactNode } from "react";

/**
 * Cabeçalho de documento (ADR-0014, Release 0.8) — a abertura de um "arquivo"
 * aberto no editor, no lugar do `SectionHeading` de marketing. A voz é de
 * documentação, não de campanha: um comentário mono de topo de arquivo (o
 * propósito real do documento) + o título semântico + um lead opcional. O
 * `//` é decorativo (`aria-hidden`) — honra a metáfora de código sem inventar
 * conteúdo; o texto do comentário é sempre um fato real.
 *
 * O nível do heading segue o contexto (h1 quando abre a página; h2 sob ela);
 * a escala visual é independente do nível (hierarquia sem saltos, doc 04 §8).
 */
export function DocHeader({
  comment,
  title,
  lead,
  headingId,
  as: Heading = "h2",
  size = "h2",
  children,
}: {
  comment?: string;
  title: string;
  lead?: string;
  headingId: string;
  as?: "h1" | "h2";
  size?: "display" | "h1" | "h2";
  children?: ReactNode;
}) {
  const sizeClass =
    size === "display" ? "text-display" : size === "h1" ? "text-h1" : "text-h2";

  return (
    <header>
      {comment && (
        <p className="font-mono text-small text-text-3">
          <span aria-hidden="true" className="select-none text-text-3/60">
            //{" "}
          </span>
          {comment}
        </p>
      )}
      <Heading id={headingId} className={`mt-2 ${sizeClass} text-text`}>
        {title}
      </Heading>
      {lead && (
        <p className="mt-3 max-w-[62ch] text-body-lg text-text-2">{lead}</p>
      )}
      {children}
    </header>
  );
}
