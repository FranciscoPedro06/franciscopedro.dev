import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/content/home";
import { site } from "@/content/site";

/** Contato direto, sem formulário (doc 05 §2.6). */
export function Contact() {
  return (
    <Section id="contato" labelledBy="contato-titulo">
      <Reveal>
        <SectionHeading
          headingId="contato-titulo"
          label={contact.label}
          title={contact.title}
          description={site.email ? contact.emailIntro : undefined}
        />

        {site.email && (
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-h3 text-accent transition-colors duration-150 hover:text-accent-bright"
          >
            {site.email}
          </a>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {site.social.map((link) => (
            <Button key={link.label} variant="secondary" href={link.url}>
              {link.label} ↗
            </Button>
          ))}
          {site.resumeReady && (
            <Button variant="secondary" to="/resume">
              Currículo
            </Button>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
