import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/home";

/** Apresentação profissional em dois parágrafos (doc 05 §2.2). */
export function About() {
  return (
    <Section id="sobre" labelledBy="sobre-titulo">
      <Reveal>
        <SectionHeading
          headingId="sobre-titulo"
          label={about.label}
          title={about.title}
        />
        <div className="mt-8 max-w-prose space-y-5">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body text-text-2">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
