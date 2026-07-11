import { footerCopy, site } from "@/content/site";
import { Container } from "./Container";

/** Footer do doc 04 §6.7: contatos, colofão técnico, copyright. */
export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col gap-6">
        <nav aria-label="Contatos" className="flex flex-wrap gap-x-6 gap-y-2">
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small text-text-2 transition-colors duration-150 hover:text-text"
            >
              {link.label} ↗
            </a>
          ))}
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="text-small text-text-2 transition-colors duration-150 hover:text-text"
            >
              {site.email}
            </a>
          )}
        </nav>

        <p className="text-small text-text-3">
          {footerCopy.colophon.split(" — ")[0]} —{" "}
          <a
            href={site.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-2 underline underline-offset-4 transition-colors duration-150 hover:text-accent-bright"
          >
            o código deste site também é público
          </a>
          .
        </p>

        <p className="font-mono text-label text-text-3">{footerCopy.copyright}</p>
      </Container>
    </footer>
  );
}
