/** Abertura padrão de seção (doc 04 §6.5): label mono + h2 + parágrafo. */
export function SectionHeading({
  label,
  title,
  description,
  headingId,
}: {
  label: string;
  title: string;
  description?: string;
  headingId: string;
}) {
  return (
    <div className="max-w-prose">
      <p className="type-label text-accent">{label}</p>
      <h2 id={headingId} className="mt-3 text-h2 text-text">
        {title}
      </h2>
      {description && <p className="mt-4 text-body text-text-2">{description}</p>}
    </div>
  );
}
