import { DocHeader } from "@/components/ui/DocHeader";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/content/home";

/** Apresentação profissional em dois parágrafos (doc 05 §2.2). */
export function About() {
  return (
    <Reveal>
      <DocHeader
        headingId="sobre-titulo"
        comment={about.comment}
        title={about.title}
      />
      <div className="mt-5 max-w-[64ch] space-y-4">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-body text-text-2">
            {paragraph}
          </p>
        ))}
      </div>
    </Reveal>
  );
}
