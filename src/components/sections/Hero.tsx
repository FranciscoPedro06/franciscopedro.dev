import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { site } from "@/content/site";

/**
 * Primeira dobra (doc 03 §5.1): quem, o quê e como contatar, sem scroll.
 * O slot da foto entra quando o asset for fornecido ([PENDENTE], doc 05 §7).
 */
export function Hero() {
  return (
    <Container className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center pb-24 pt-32 lg:pt-40">
      <p className="type-label text-text-3">{site.role}</p>
      <h1 className="mt-5 text-display-sm text-text lg:text-display">{site.name}</h1>
      <p className="mt-6 max-w-[62ch] text-body-lg text-text-2">{hero.paragraph}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        {site.social.map((link) => (
          <Button key={link.label} variant="secondary" href={link.url}>
            {link.label} ↗
          </Button>
        ))}
        {site.resumeReady && (
          <Button variant="primary" to="/resume">
            Currículo
          </Button>
        )}
        <Button variant="ghost" to="/#contato">
          Contato
        </Button>
      </div>
    </Container>
  );
}
