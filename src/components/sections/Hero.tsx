import { Link } from "react-router-dom";
import { DocHeader } from "@/components/ui/DocHeader";
import { hero } from "@/content/home";
import { site } from "@/content/site";

/**
 * Documento `overview` (doc 03 §5.1, ADR-0014): o arquivo aberto por padrão.
 * Não é mais um hero centralizado de landing — é a abertura de um documento:
 * identidade como cabeçalho de arquivo (papel como comentário de topo, nome
 * em `display`), lead à esquerda e ações como **afordâncias de workspace**
 * (links mono), não botões de campanha. O slot da foto entra quando o asset
 * for fornecido ([PENDENTE], doc 05 §7).
 */
export function Hero() {
  return (
    <div className="max-w-[68ch]">
      <DocHeader
        comment={site.role}
        title={site.name}
        headingId="overview-titulo"
        as="h1"
        size="display"
        lead={hero.paragraph}
      >
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
          <Link
            to="/#contato"
            className="inline-flex items-center gap-1 text-accent transition-colors duration-150 hover:text-accent-bright"
          >
            Contato
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </DocHeader>
    </div>
  );
}
