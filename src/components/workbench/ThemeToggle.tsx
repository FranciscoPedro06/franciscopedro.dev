import { Moon, Sun } from "lucide-react";
import { THEMES, toggleTheme, useWorkbench } from "@/lib/workbench";

/**
 * Alternador claro/escuro da status bar (ADR-0013): troca entre Light Modern
 * e Dark Modern e mostra o nome do tema atual — os demais temas ficam no
 * painel Color Theme (ADR-0018). O tema já foi pintado antes do React pelo
 * script anti-flash; este botão só troca e persiste.
 */
export function ThemeToggle() {
  const { theme } = useWorkbench();
  const isDark = theme !== "light";
  const Icon = isDark ? Moon : Sun;
  const label = THEMES.find((t) => t.id === theme)?.label ?? "Dark Modern";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Alternar tema (atual: ${isDark ? "escuro" : "claro"})`}
      className="flex h-full items-center gap-1 px-1.5 transition-colors duration-100 hover:bg-surface-2 hover:text-text"
    >
      {/* `key` remonta o ícone na troca — o pop marca o estado novo (doc 08 §2). */}
      <span key={theme} className="motion-safe:animate-[icon-pop_150ms_ease-out]">
        <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span aria-hidden="true">{label}</span>
    </button>
  );
}
