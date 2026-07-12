/**
 * Abertura padrão de seção (doc 04 §6.5): label mono + heading + parágrafo.
 * Nas seções da home o heading é h2; quando abre uma página própria
 * (/projetos), é o h1 dela — uma única h1 por página (doc 09 §6, regras).
 */
export function SectionHeading({
  label,
  title,
  description,
  headingId,
  as: Heading = "h2",
}: {
  label: string;
  title: string;
  description?: string;
  headingId: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-prose">
      <p className="type-label text-accent">{label}</p>
      <Heading id={headingId} className="mt-3 text-h2 text-text">
        {title}
      </Heading>
      {description && <p className="mt-4 text-body text-text-2">{description}</p>}
    </div>
  );
}
