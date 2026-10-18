import { Link } from "react-router-dom";
import { notFoundRoute } from "@/content/routes";
import { usePageTitle } from "@/lib/seo";

/** Conteúdo do doc 05 §4 — o "arquivo não encontrado" do workbench. */
export function NotFound() {
  usePageTitle(notFoundRoute.seo.title);

  return (
    <div className="max-w-[64ch] px-5 py-5 md:px-8 md:py-7">
      <p className="font-mono text-small text-danger">
        <span aria-hidden="true" className="select-none text-sx-comment">
          //{" "}
        </span>
        404
      </p>
      <h1 className="mt-2 text-h1-sm text-text-hi lg:text-h1">Página não encontrada</h1>
      <p className="mt-3 max-w-[62ch] text-body text-text-2">
        O endereço pode ter mudado ou nunca existiu. O melhor caminho é começar de novo.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex items-center gap-1 text-small text-link hover:underline"
      >
        <span aria-hidden="true">←</span> voltar para a home
      </Link>
    </div>
  );
}
