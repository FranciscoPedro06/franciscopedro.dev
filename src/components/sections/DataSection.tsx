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

      {/* Skills como lista de extensões instaladas (Release 0.6) */}
      <Reveal className="mt-12 grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex gap-4 rounded-md border border-border bg-surface p-4 transition-colors duration-150 hover:border-border-strong"
          >
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-border bg-surface-2 font-mono text-label text-accent"
            >
              {skill.name.slice(0, 2)}
            </span>
            <div>
              <h3 className="text-body font-medium text-text">{skill.name}</h3>
              <p className="mt-1 text-small text-text-2">{skill.description}</p>
            </div>
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
