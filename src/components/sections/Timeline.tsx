import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineSection } from "@/content/home";
import { timeline } from "@/content/timeline";

/** Trajetória com marcos reais (doc 04 §6.8) — grafo de commits do workbench. */
export function Timeline() {
  return (
    <>
      <Reveal>
        <SectionHeading
          headingId="trajetoria-titulo"
          label={timelineSection.label}
          title={timelineSection.title}
        />
      </Reveal>

      <ol className="mt-8 max-w-prose border-l border-border">
        {timeline.map((entry) => (
          <li key={entry.date} className="relative pb-8 pl-7 last:pb-0">
            {/* Nó de commit (Release 0.6) */}
            <span
              aria-hidden="true"
              className={`absolute -left-[5.5px] top-1.5 size-2.5 rounded-full border-2 bg-bg ${
                entry.current ? "border-accent" : "border-border-strong"
              }`}
            />
            <Reveal>
              <p className="type-label text-text-3">{entry.date}</p>
              <h3 className="mt-1.5 text-h3 text-text">{entry.title}</h3>
              <p className="mt-1.5 text-body text-text-2">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}
