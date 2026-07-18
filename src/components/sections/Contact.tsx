import { Link } from "react-router-dom";
import { DocHeader } from "@/components/ui/DocHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/content/home";
import { site } from "@/content/site";

/** Contato direto, sem formulário (doc 05 §2.6). */
export function Contact() {
  return (
    <Reveal>
      <DocHeader
        headingId="contato-titulo"
        comment={contact.comment}
        title={contact.title}
        lead={site.email ? contact.emailIntro : undefined}
      />

      {site.email && (
        <a
          href={`mailto:${site.email}`}
          className="mt-5 inline-block font-mono text-h3 text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-150 hover:decoration-accent"
        >
          {site.email}
        </a>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-small">
        {site.social.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-text-2 transition-colors duration-150 hover:text-text"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
        {site.resumeReady && (
          <Link
            to="/resume"
            className="text-text-2 transition-colors duration-150 hover:text-text"
          >
            Currículo
          </Link>
        )}
      </div>
    </Reveal>
  );
}
