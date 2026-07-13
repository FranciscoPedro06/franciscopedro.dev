import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { engineering } from "@/content/home";

/** Como o Francisco constrói: princípios com evidência + stack por categoria. */
export function Engineering() {
  return (
    <Section id="engenharia" labelledBy="engenharia-titulo">
      <Reveal>
        <SectionHeading
          headingId="engenharia-titulo"
          label={engineering.label}
          title={engineering.title}
          description={engineering.description}
        />
      </Reveal>

      {/* Princípios como painéis numerados da IDE (Release 0.6) */}
      <Reveal className="mt-12 grid gap-4 md:grid-cols-2">
        {engineering.principles.map((principle, index) => (
          <div
            key={principle.title}
            className="rounded-md border border-border bg-surface p-5 md:p-6"
          >
            <span aria-hidden="true" className="type-label text-text-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-h3 text-text">{principle.title}</h3>
            <p className="mt-2 text-body text-text-2">{principle.evidence}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-16 grid gap-8 md:grid-cols-2">
        {engineering.stack.map((group) => (
          <div key={group.category}>
            <h3 className="type-label text-text-3">{group.category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
