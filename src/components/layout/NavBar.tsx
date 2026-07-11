import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

/** Header fixo do doc 04 §6.6 — 64px, blur, borda que aparece após 8px de scroll. */
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 h-16 bg-bg/80 backdrop-blur-md transition-colors duration-150 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-6 md:px-8"
      >
        {/* Wordmark: o domínio como marca (ADR-0009, doc 10 §1) */}
        <Link to="/" className="font-mono text-small font-semibold text-text">
          franciscopedro<span className="font-normal text-text-3">.dev</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-small text-text-2 transition-colors duration-150 hover:text-text"
            >
              {item.label}
            </a>
          ))}
          <span className="ml-2">
            <Button variant="secondary" to="/resume">
              Currículo
            </Button>
          </span>
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
