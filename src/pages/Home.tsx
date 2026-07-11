import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";

/**
 * Casca do S1: prova tokens, tipografia e layout base.
 * As seções da home (doc 03 §4) entram no S2 com o conteúdo do doc 05.
 */
export function Home() {
  return (
    <Container className="flex min-h-[70dvh] flex-col justify-center pt-16">
      <p className="type-label text-text-3">{site.role}</p>
      <h1 className="mt-4 text-display-sm text-text lg:text-display">{site.name}</h1>
    </Container>
  );
}
