import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useHomeView } from "@/lib/views";
import { MobileMenu } from "./MobileMenu";

/**
 * Title bar do workbench (doc 04 §6.6, Release 0.6.1) — 48px, largura
 * total, wordmark à esquerda e a navegação de views como itens de menu de
 * aplicação. Em telas menores, o menu overlay assume.
 */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const view = useHomeView();

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-surface px-3 md:px-4">
      {/* Wordmark: o domínio como marca (ADR-0009, doc 10 §1) */}
      <Link to="/" className="font-mono text-small font-semibold text-text">
        franciscopedro<span className="font-normal text-text-3">.dev</span>
      </Link>

      <nav aria-label="Principal" className="hidden items-center gap-0.5 md:flex">
        {site.nav.map((item) => {
          const isActive = pathname === "/" && view === item.href.split("#")[1];
          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-sm px-2.5 py-1 text-small transition-colors duration-150 ${
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

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
