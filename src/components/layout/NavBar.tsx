import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { MobileMenu } from "./MobileMenu";

const SPY_IDS = site.nav
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

/**
 * Title bar da moldura de IDE (doc 04 §6.6, Release 0.6) — 64px, largura
 * total, borda inferior permanente; links como itens de menu de aplicação.
 */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(SPY_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="flex h-full items-center justify-between px-4 md:px-6"
      >
        {/* Wordmark: o domínio como marca (ADR-0009, doc 10 §1) */}
        <Link to="/" className="font-mono text-small font-semibold text-text">
          franciscopedro<span className="font-normal text-text-3">.dev</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {site.nav.map((item) => {
            const isActive =
              pathname === "/" && activeSection === item.href.split("#")[1];
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-sm px-3 py-1.5 text-small transition-colors duration-150 ${
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
        </div>

        <div className="sm:hidden">
          <Button
            variant="ghost"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            Menu
          </Button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
