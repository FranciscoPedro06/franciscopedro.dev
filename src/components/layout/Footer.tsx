import { footerCopy, site } from "@/content/site";

const itemClasses =
  "font-mono text-label font-normal normal-case tracking-normal transition-colors duration-150";

/**
 * Footer como status bar da moldura de IDE (doc 04 §6.7, Release 0.6):
 * os mesmos contatos, colofão e copyright de sempre, numa barra fina fixa
 * em desktop (lg+) e empilhada no fluxo em telas menores.
 */
export function Footer() {
  return (
    <footer className="z-40 border-t border-border bg-surface lg:fixed lg:inset-x-0 lg:bottom-0">
      <div className="flex flex-col gap-2 px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:gap-6 lg:py-2">
        <nav
          aria-label="Contatos"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
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

        <p className={`${itemClasses} text-text-3`}>
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

        <p className={`${itemClasses} text-text-3 lg:ml-auto`}>{footerCopy.copyright}</p>
      </div>
    </footer>
  );
}
