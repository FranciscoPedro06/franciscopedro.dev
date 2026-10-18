import { DocHeader } from "@/components/ui/DocHeader";
import { Reveal } from "@/components/ui/Reveal";
import { timelineSection } from "@/content/home";
import { timeline } from "@/content/timeline";

/** Trajetória com marcos reais (doc 04 §6.8) — grafo de commits do workbench. */
export function Timeline() {
  return (
    <>
      <Reveal>
        <DocHeader
          headingId="trajetoria-titulo"
          comment={timelineSection.comment}
          title={timelineSection.title}
        />
      </Reveal>

      <ol className="mt-6 max-w-[68ch] border-l-2 border-border-strong">
        {timeline.map((entry, index) => (
          <li key={entry.date} className="relative pb-6 pl-6 last:pb-0">
            {/* Nó de commit */}
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-1 size-3 rounded-full border-2 ${
                entry.current ? "border-accent bg-accent" : "border-text-2 bg-bg"
              }`}
            />
            {/* Stagger de 60ms (doc 08 §3 — itens da timeline). */}
            <Reveal delay={index * 60}>
              <p className="font-mono text-[12px] text-text-2">
                {entry.date}
                {entry.current && (
                  <span className="ml-2 rounded-full bg-accent px-1.5 py-px text-[10.5px] text-on-accent">
                    HEAD → main
                  </span>
                )}
              </p>
              <h3 className="mt-1 text-h3 text-text-hi">{entry.title}</h3>
              <p className="mt-1 max-w-[58ch] text-body text-text-2">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}
