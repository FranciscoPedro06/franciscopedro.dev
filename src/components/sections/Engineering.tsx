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

      {/* Princípios como entradas de documento (NN + título — evidência), não
          grade de cards com borda — densidade de spec, não de landing. */}
      <Reveal className="mt-6 border-t border-border">
        {engineering.principles.map((principle, index) => (
          <div key={principle.title} className="flex gap-4 border-b border-border py-4">
            <span aria-hidden="true" className="shrink-0 font-mono text-small text-text-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-body font-semibold text-text">{principle.title}</h3>
              <p className="mt-1 max-w-[62ch] text-body text-text-2">{principle.evidence}</p>
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {engineering.stack.map((group) => (
          <div key={group.category}>
            <h3 className="type-label text-text-3">{group.category}</h3>
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
