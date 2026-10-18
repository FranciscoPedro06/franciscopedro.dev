import { DocHeader } from "@/components/ui/DocHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { engineering } from "@/content/home";

/** Como o Francisco constrói: princípios com evidência + stack por categoria. */
export function Engineering() {
  return (
    <>
      <Reveal>
        <DocHeader
          headingId="engenharia-titulo"
          comment={engineering.comment}
          title={engineering.title}
          lead={engineering.description}
        />
      </Reveal>

      {/* Princípios (título + evidência) em painéis do editor (Release 0.10). */}
      <Reveal className="mt-6 grid gap-3 md:grid-cols-2">
        {engineering.principles.map((principle) => (
          <div key={principle.title} className="rounded-md border border-border-strong bg-surface p-4">
            <h3 className="text-body font-semibold text-text-hi">{principle.title}</h3>
            <p className="mt-1.5 text-small text-text-2">{principle.evidence}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {engineering.stack.map((group) => (
          <div key={group.category}>
            <h3 className="text-small text-text-2">{group.category}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
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
