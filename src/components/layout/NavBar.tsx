import { GitBranch, Minus, Square, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useHomeView } from "@/lib/views";
import { MobileMenu } from "./MobileMenu";

/**
 * Title bar do workbench (doc 04 §6.6): a faixa superior da aplicação — 48px,
 * com aparência de software desktop. Glyph + wordmark (nome do workspace), a
 * navegação de views como barra de menu, indicador de branch e controles de
 * janela decorativos. Abaixo de md, o menu overlay assume (contrato do
 * NavBar.test: os 6 links e o botão "Menu" seguem presentes).
 */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const view = useHomeView();

  return (
    <header className="flex h-12 shrink-0 items-center gap-1 border-b border-border bg-surface pl-3 pr-2 md:gap-2">
      {/* Glyph + wordmark: o domínio como marca (ADR-0009) */}
      <Link
        to="/"
        className="flex shrink-0 items-center gap-2 font-mono text-small font-semibold text-text"
      >
        <span aria-hidden="true" className="size-3 rounded-[3px] bg-accent" />
        franciscopedro<span className="font-normal text-text-3">.dev</span>
      </Link>

      <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-border md:block" />

      {/* Barra de menu: as views como itens de aplicação */}
      <nav aria-label="Principal" className="hidden items-center md:flex">
        {site.nav.map((item) => {
          const isActive = pathname === "/" && view === item.href.split("#")[1];
          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-sm px-2 py-1 text-small transition-colors duration-150 ${
                isActive
                  ? "bg-surface-2 text-text"
                  : "text-text-2 hover:bg-surface-2/60 hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        {site.resumeReady && (
          <span className="ml-2">
            <Button variant="secondary" to="/resume">
              Currículo
            </Button>
          </span>
        )}
      </nav>

      {/* Cluster direito: branch + controles de janela decorativos */}
      <div className="ml-auto flex items-center gap-1">
        <span
          className="hidden items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-label font-normal normal-case tracking-normal text-text-3 md:flex"
          title="Branch atual"
        >
          <GitBranch size={13} strokeWidth={1.5} aria-hidden="true" />
          main
        </span>

        <div aria-hidden="true" className="hidden items-center md:flex">
          {[Minus, Square].map((Icon, i) => (
            <span
              key={i}
              className="flex size-8 items-center justify-center text-text-3"
            >
              <Icon size={13} strokeWidth={1.5} />
            </span>
          ))}
          <span className="flex size-8 items-center justify-center text-text-3 transition-colors duration-150 hover:bg-danger/80 hover:text-text">
            <X size={14} strokeWidth={1.5} />
          </span>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            Menu
          </Button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
