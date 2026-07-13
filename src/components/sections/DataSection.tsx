import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dataSection, skills } from "@/content/home";

/** A metade "dados" do posicionamento — sem gráficos fictícios (doc 05 §2.5). */
export function DataSection() {
  return (
    <>
      <Reveal>
        <SectionHeading
          headingId="dados-titulo"
          label={dataSection.label}
          title={dataSection.title}
          description={dataSection.description}
        />
      </Reveal>

      {/* Skills como lista de extensões instaladas */}
      <Reveal className="mt-8 grid gap-2.5 sm:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex gap-3.5 rounded-md border border-border bg-surface p-3.5 transition-colors duration-150 hover:border-border-strong"
          >
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-surface-2 font-mono text-label text-accent"
            >
              {skill.name.slice(0, 2)}
            </span>
            <div>
              <h3 className="text-body font-medium text-text">{skill.name}</h3>
              <p className="mt-0.5 text-small text-text-2">{skill.description}</p>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-8">
        <p className="max-w-prose border-l border-accent/40 pl-5 text-small text-text-3">
          {dataSection.closingNote}
        </p>
      </Reveal>
    </>
  );
}
