import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";

/** Conteúdo do doc 05 §4. */
export function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center pt-16">
      <h1 className="text-h1-sm text-text lg:text-h1">Página não encontrada</h1>
      <p className="mt-4 max-w-prose text-body text-text-2">
        O endereço pode ter mudado ou nunca existiu. O melhor caminho é começar de novo.
      </p>
      <Link
        to="/"
        className="mt-8 text-body text-accent transition-colors duration-150 hover:text-accent-bright"
      >
        ← Voltar para a home
      </Link>
    </Container>
  );
}
