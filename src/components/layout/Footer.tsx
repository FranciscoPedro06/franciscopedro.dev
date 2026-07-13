import { footerCopy, site } from "@/content/site";

const itemClasses =
  "font-mono text-label font-normal normal-case tracking-normal transition-colors duration-150";

/**
 * Status bar do workbench (doc 04 §6.7, Release 0.6.1): uma linha fina na
 * base da aplicação com os mesmos contatos, colofão e copyright de sempre.
 * O colofão cede espaço em telas estreitas (some via CSS, segue no DOM).
 */
export function Footer() {
  return (
    <footer className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-surface px-3 py-1.5 md:px-4">
      <nav aria-label="Contatos" className="flex flex-wrap items-center gap-x-4">
        {site.social.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${itemClasses} text-text-2 hover:text-text`}
          >
            {link.label} ↗
          </a>
        ))}
        {site.email && (
          <a
            href={`mailto:${site.email}`}
            className={`${itemClasses} text-text-2 hover:text-text`}
          >
            {site.email}
          </a>
        )}
      </nav>

      <p className={`${itemClasses} hidden text-text-3 md:block`}>
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

      <p className={`${itemClasses} ml-auto text-text-3`}>{footerCopy.copyright}</p>
    </footer>
  );
}
