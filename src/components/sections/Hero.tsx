import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { site } from "@/content/site";

/**
 * View overview (doc 03 §5.1): quem, o quê e como contatar — o arquivo
 * aberto por padrão no workbench. O slot da foto entra quando o asset for
 * fornecido ([PENDENTE], doc 05 §7).
 */
export function Hero() {
  return (
    <div className="flex min-h-[60dvh] flex-col justify-center">
      <p className="type-label text-text-3">{site.role}</p>
      <h1 className="mt-4 text-h1-sm text-text lg:text-h1">{site.name}</h1>
      <p className="mt-5 max-w-[62ch] text-body-lg text-text-2">{hero.paragraph}</p>

      <div className="mt-8 flex flex-wrap gap-3">
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
    </div>
  );
}
