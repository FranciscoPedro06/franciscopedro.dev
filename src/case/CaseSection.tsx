import { ChevronRight } from "lucide-react";
import type { CaseSection as CaseSectionData } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

/**
 * Seção canônica do estudo de caso (doc 04 §6.9): âncora própria e heading
 * semântico h2. Release 0.10: decisões numeradas e desafios em acordeão
 * (`details`, a primeira aberta — o conteúdo segue no HTML para SEO e sem
 * JS); itens de "tecnologias" viram tabela opção → efeito.
 */
export function CaseSection({ section }: { section: CaseSectionData }) {
  const headingId = `${section.kind}-titulo`;
  const List = section.kind === "decisoes" ? "ol" : "ul";
  const asTable = section.kind === "tecnologias";

  return (
    <section id={section.kind} aria-labelledby={headingId} className="scroll-mt-6">
      <h2 id={headingId} className="text-h3 text-text-hi">
        {section.title}
      </h2>

      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-2.5 max-w-[72ch] text-body text-text">
          {paragraph}
        </p>
      ))}

      {section.diagram && <ArchitectureDiagram diagram={section.diagram} />}

      {section.items && asTable && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-small">
            <tbody>
              {section.items.map((item) => (
                <tr key={item.title} className="border-b border-border">
                  <th
                    scope="row"
                    className="whitespace-nowrap py-1.5 pr-4 text-left font-mono font-normal text-sx-property"
                  >
                    {item.title}
                  </th>
                  <td className="py-1.5 text-text-2">{item.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.items && !asTable && (
        <List className="mt-3 border-t border-border">
          {section.items.map((item, index) => (
            <li key={item.title} className="border-b border-border">
              <details open={index === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 px-1 py-2 text-body text-text-hi hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
                  <ChevronRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 text-text-2 transition-transform duration-100 group-open:rotate-90"
                  />
                  {List === "ol" && (
                    <span aria-hidden="true" className="font-mono text-[12px] text-text-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                  <h3 className="font-normal">{item.title}</h3>
                </summary>
                <p className="max-w-[76ch] pb-3 pl-7 text-small text-text">{item.body}</p>
              </details>
            </li>
          ))}
        </List>
      )}
    </section>
  );
}
