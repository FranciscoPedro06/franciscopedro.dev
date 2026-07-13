import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/home";

/** Apresentação profissional em dois parágrafos (doc 05 §2.2). */
export function About() {
  return (
    <Reveal>
      <SectionHeading headingId="sobre-titulo" label={about.label} title={about.title} />
      <div className="mt-6 max-w-prose space-y-4">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-body text-text-2">
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}
