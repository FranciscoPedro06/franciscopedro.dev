import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { engineering } from "@/content/home";

/** Como o Francisco constrói: princípios com evidência + stack por categoria. */
export function Engineering() {
  return (
    <>
      <Reveal>
        <SectionHeading
          headingId="engenharia-titulo"
          label={engineering.label}
          title={engineering.title}
          description={engineering.description}
        />
      </Reveal>

      {/* Princípios como painéis numerados do workbench */}
      <Reveal className="mt-8 grid gap-3 md:grid-cols-2">
        {engineering.principles.map((principle, index) => (
          <div
            key={principle.title}
            className="rounded-md border border-border bg-surface p-4 md:p-5"
          >
            <span aria-hidden="true" className="type-label text-text-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-h3 text-text">{principle.title}</h3>
            <p className="mt-2 text-body text-text-2">{principle.evidence}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-10 grid gap-6 md:grid-cols-2">
        {engineering.stack.map((group) => (
          <div key={group.category}>
            <h3 className="type-label text-text-3">{group.category}</h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </>
  );
}
