import { DocHeader } from "@/components/ui/DocHeader";
import { Reveal } from "@/components/ui/Reveal";
import { dataSection, skills } from "@/content/home";

/** A metade "dados" do posicionamento — sem gráficos fictícios (doc 05 §2.5). */
export function DataSection() {
  return (
    <>
      <Reveal>
        <DocHeader
          headingId="dados-titulo"
          comment={dataSection.comment}
          title={dataSection.title}
          lead={dataSection.description}
        />
      </Reveal>

      {/* Competências como lista de definição (nome mono → descrição), não
          cards com avatar decorativo. */}
      <Reveal>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="rounded-md border border-border-strong bg-surface p-4"
            >
              <dt className="font-mono text-body font-semibold text-sx-function">
                {skill.name}
              </dt>
              <dd className="mt-1.5 text-small text-text-2">{skill.description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <p className="mt-6 max-w-[72ch] border-l-[3px] border-accent bg-accent-dim px-3 py-2 text-small text-text">
          {dataSection.closingNote}
        </p>
      </Reveal>
    </>
  );
}
