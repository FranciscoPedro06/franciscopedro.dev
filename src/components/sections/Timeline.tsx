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

      <ol className="mt-6 max-w-[64ch] border-l border-border">
        {timeline.map((entry, index) => (
          <li key={entry.date} className="relative pb-6 pl-6 last:pb-0">
            {/* Nó de commit */}
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 bg-bg ${
                entry.current ? "border-accent" : "border-border-strong"
              }`}
            />
            {/* Stagger de 60ms (doc 08 §3 — itens da timeline). */}
            <Reveal delay={index * 60}>
              <p className="font-mono text-label text-text-3">{entry.date}</p>
              <h3 className="mt-1 text-h3 text-text">{entry.title}</h3>
              <p className="mt-1 max-w-[58ch] text-body text-text-2">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}
