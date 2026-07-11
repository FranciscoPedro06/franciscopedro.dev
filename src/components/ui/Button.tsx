import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

// Variantes do doc 04 §6.1 — o primário é claro, não colorido
// (regra de contenção do acento, doc 04 §1.2).
const variantClasses: Record<Variant, string> = {
  primary: "bg-text text-bg hover:bg-white",
  secondary:
    "bg-surface-2 text-text border border-border hover:border-border-strong",
  ghost: "text-text-2 hover:text-text",
};

const baseClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-md px-5 text-small font-medium transition-colors duration-150 active:scale-[0.98]";

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  /** Rota interna (React Router). */
  to?: string;
  /** URL externa — abre em nova aba com `rel` seguro. */
  href?: string;
  onClick?: () => void;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

export function Button({
  variant = "secondary",
  children,
  to,
  href,
  onClick,
  ...aria
}: ButtonProps) {
  const className = `${baseClasses} ${variantClasses[variant]}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className} {...aria}>
      {children}
    </button>
  );
}
