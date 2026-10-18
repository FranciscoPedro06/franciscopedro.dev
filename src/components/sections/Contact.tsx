import { Link } from "react-router-dom";
import { DocHeader } from "@/components/ui/DocHeader";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/content/home";
import { site } from "@/content/site";
import { brandIcon } from "@/lib/brand";

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
          className="mt-5 inline-block font-mono text-h3 text-link underline decoration-link/40 underline-offset-4 transition-colors duration-150 hover:decoration-link"
        >
          {site.email}
        </a>
      )}

      <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
        {site.social.map((link) => {
          const Icon = brandIcon(link.label);
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-border-strong bg-surface p-4 transition-colors duration-150 hover:border-accent"
            >
              {Icon && <Icon className="size-6 text-text" />}
              <span>
                <span className="block text-body font-semibold text-text-hi">{link.label}</span>
                <span className="block text-[12px] text-text-2">
                  {link.url.replace("https://", "").replace("www.", "")}
                </span>
              </span>
            </a>
          );
        })}
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
