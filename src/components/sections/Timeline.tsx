import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineSection } from "@/content/home";
import { timeline } from "@/content/timeline";

/** Trajetória com marcos reais (doc 04 §6.8). */
export function Timeline() {
  return (
    <Section id="trajetoria" labelledBy="trajetoria-titulo">
      <Reveal>
        <SectionHeading
          headingId="trajetoria-titulo"
          label={timelineSection.label}
          title={timelineSection.title}
        />
      </Reveal>

      <ol className="mt-12 max-w-prose border-l border-border">
        {timeline.map((entry) => (
          <li key={entry.date} className="relative pb-12 pl-8 last:pb-0">
            {/* Nó de commit da trajetória (Release 0.6 — painel source control) */}
            <span
              aria-hidden="true"
              className={`absolute -left-[5.5px] top-1.5 size-2.5 rounded-full border-2 bg-bg ${
                entry.current ? "border-accent" : "border-border-strong"
              }`}
            />
            <Reveal>
              <p className="type-label text-text-3">{entry.date}</p>
              <h3 className="mt-2 text-h3 text-text">{entry.title}</h3>
              <p className="mt-2 text-body text-text-2">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
