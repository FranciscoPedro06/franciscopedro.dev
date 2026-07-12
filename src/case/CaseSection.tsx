import { Reveal } from "@/components/ui/Reveal";
import type { CaseSection as CaseSectionData } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

/**
 * Seção canônica do estudo de caso (doc 04 §6.9): âncora própria, heading
 * semântico h2 (hierarquia sem saltos, doc 04 §8.1) em escala visual h3,
 * prosa em max-w-prose. Decisões são numeradas; desafios, lista simples.
 */
export function CaseSection({ section }: { section: CaseSectionData }) {
  const headingId = `${section.kind}-titulo`;
  const List = section.kind === "decisoes" ? "ol" : "ul";

  return (
    <section id={section.kind} aria-labelledby={headingId} className="scroll-mt-24">
      <Reveal>
        <h2 id={headingId} className="text-h3 text-text">
          {section.title}
        </h2>

        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 max-w-prose text-body text-text-2">
            {paragraph}
          </p>
        ))}

        {section.diagram && <ArchitectureDiagram diagram={section.diagram} />}

        {section.items && (
          <List className="mt-6 space-y-6">
            {section.items.map((item, index) => (
              <li key={item.title} className="max-w-prose">
                <h3 className="flex items-baseline gap-3 text-body font-semibold text-text">
                  {List === "ol" && (
                    <span aria-hidden="true" className="type-label text-text-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                  {item.title}
                </h3>
                <p className="mt-2 text-body text-text-2">{item.body}</p>
              </li>
            ))}
          </List>
        )}
      </Reveal>
    </section>
  );
}
