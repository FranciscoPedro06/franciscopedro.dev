import { Moon, Sun } from "lucide-react";
import { toggleTheme, useWorkbench } from "@/lib/workbench";

/**
 * Alternador de tema (ADR-0013) — item da status bar. O tema já foi pintado
 * antes do React pelo script anti-flash; este botão só troca e persiste.
 */
export function ThemeToggle() {
  const { theme } = useWorkbench();
  const isDark = theme === "dark";
  const Icon = isDark ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Alternar tema (atual: ${isDark ? "escuro" : "claro"})`}
      className="flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-text-3 transition duration-150 hover:bg-surface-2 hover:text-text motion-safe:active:scale-[0.98]"
    >
      {/* `key` remonta o ícone na troca — o pop marca o estado novo (doc 08 §2). */}
      <span
        key={theme}
        className="motion-safe:animate-[icon-pop_150ms_ease-out]"
      >
        <Icon size={13} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span aria-hidden="true">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
