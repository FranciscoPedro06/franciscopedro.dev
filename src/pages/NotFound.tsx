import { Link } from "react-router-dom";
import { notFoundRoute } from "@/content/routes";
import { usePageTitle } from "@/lib/seo";

/** Conteúdo do doc 05 §4 — o "arquivo não encontrado" do workbench. */
export function NotFound() {
  usePageTitle(notFoundRoute.seo.title);

  return (
    <div className="flex min-h-full flex-col items-start justify-center px-5 py-6 md:px-8 lg:px-10">
      <h1 className="text-h1-sm text-text lg:text-h1">Página não encontrada</h1>
      <p className="mt-4 max-w-prose text-body text-text-2">
        O endereço pode ter mudado ou nunca existiu. O melhor caminho é começar de novo.
      </p>
      <Link
        to="/"
        className="mt-6 text-body text-accent transition-colors duration-150 hover:text-accent-bright"
      >
        ← Voltar para a home
      </Link>
    </div>
  );
}
