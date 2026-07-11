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

      <Reveal className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {engineering.principles.map((principle) => (
          <div key={principle.title} className="border-l border-border pl-6">
            <h3 className="text-h3 text-text">{principle.title}</h3>
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
