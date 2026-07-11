import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dataSection, skills } from "@/content/home";

/** A metade "dados" do posicionamento — sem gráficos fictícios (doc 05 §2.5). */
export function DataSection() {
  return (
    <Section id="dados" labelledBy="dados-titulo">
      <Reveal>
        <SectionHeading
          headingId="dados-titulo"
          label={dataSection.label}
          title={dataSection.title}
          description={dataSection.description}
        />
      </Reveal>

      <Reveal className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill.name}>
            <h3 className="text-body font-medium text-text">{skill.name}</h3>
            <p className="mt-1 text-small text-text-2">{skill.description}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-14">
        <p className="max-w-prose border-l border-accent/40 pl-6 text-small text-text-3">
          {dataSection.closingNote}
        </p>
      </Reveal>
    </Section>
  );
}
