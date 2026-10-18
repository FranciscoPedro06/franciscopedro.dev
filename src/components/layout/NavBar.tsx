import { PanelBottom, PanelLeft, PanelRight, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useHomeView } from "@/lib/views";
import { readWorkbench, setWorkbench, useWorkbench } from "@/lib/workbench";
import { MobileMenu } from "./MobileMenu";

/**
 * Title bar do workbench (doc 04 §6.6; Release 0.10 no desenho do VS Code):
 * ícone do app + barra de menu com as views, o "command center" no centro
 * (o nome do workspace; abre a paleta) e os alternadores de layout à direita.
 * Abaixo de md, o menu overlay assume (contrato do NavBar.test).
 */
function LayoutToggle({
  icon: Icon,
  label,
  pressed,
  onClick,
  className,
}: {
  icon: LucideIcon;
  label: string;
  pressed: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={`size-7 items-center justify-center rounded-md text-text-2 transition-colors duration-150 hover:bg-surface-2 hover:text-text ${className ?? "flex"}`}
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const view = useHomeView();
  const { sidebarCollapsed, panelOpen, inspectorOpen } = useWorkbench();

  return (
    <header className="relative flex h-[35px] shrink-0 items-center gap-1 border-b border-border bg-surface pl-2.5 pr-1.5">
      <Link to="/" aria-label="franciscopedro.dev — início" className="flex shrink-0 items-center">
        <img src="/favicon.svg" alt="" width={18} height={18} className="rounded-sm" />
      </Link>

      {/* Barra de menu: as views como itens de aplicação */}
      <nav aria-label="Principal" className="ml-1 hidden items-center md:flex">
        {site.nav.map((item) => {
          const isActive = pathname === "/" && view === item.href.split("#")[1];
          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-md px-2 py-0.5 text-small transition-colors duration-150 ${
                isActive ? "bg-surface-3 text-text-hi" : "text-text hover:bg-surface-2"
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

      {/* Command center: o nome do workspace; clicar abre a paleta. */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("wb:command-palette"))}
        aria-label="Abrir paleta de comandos"
        className="mx-auto hidden h-6 w-[min(36vw,520px)] items-center justify-center gap-1.5 rounded-md border border-border-strong bg-surface-2/60 text-small text-text-2 transition-colors duration-150 hover:bg-surface-2 hover:text-text lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
      >
        <Search size={13} strokeWidth={1.5} aria-hidden="true" />
        franciscopedro.dev
      </button>

      <div className="ml-auto flex items-center gap-0.5">
        <LayoutToggle
          icon={PanelLeft}
          label="Alternar barra lateral"
          pressed={!sidebarCollapsed}
          onClick={() => setWorkbench({ sidebarCollapsed: !readWorkbench().sidebarCollapsed })}
          className="hidden lg:flex"
        />
        <LayoutToggle
          icon={PanelBottom}
          label="Alternar painel inferior"
          pressed={panelOpen}
          onClick={() => setWorkbench({ panelOpen: !readWorkbench().panelOpen })}
          className="hidden md:flex"
        />
        <LayoutToggle
          icon={PanelRight}
          label="Alternar painel de detalhes"
          pressed={inspectorOpen}
          onClick={() => setWorkbench({ inspectorOpen: !readWorkbench().inspectorOpen })}
          className="hidden xl:flex"
        />

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
