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
        <dl className="mt-6 border-t border-border">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col gap-0.5 border-b border-border py-3 sm:flex-row sm:gap-6"
            >
              <dt className="font-mono text-small text-text sm:w-28 sm:shrink-0">
                {skill.name}
              </dt>
              <dd className="max-w-[58ch] text-small text-text-2">{skill.description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <p className="mt-6 max-w-[62ch] border-l-2 border-accent/40 pl-4 text-small text-text-3">
          {dataSection.closingNote}
        </p>
      </Reveal>
    </>
  );
}
