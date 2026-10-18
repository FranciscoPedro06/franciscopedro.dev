import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

/** Botões do VS Code (Release 0.10): primário azul de ação, secundário cinza. */
const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-bright",
  secondary: "bg-button-2 text-text hover:bg-button-2-hover",
  ghost: "text-text-2 hover:bg-surface-2 hover:text-text",
};

const baseClasses =
  "inline-flex h-7 items-center justify-center gap-1.5 rounded-sm px-3 text-small transition-colors duration-150 active:scale-[0.98]";

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  /** Rota interna (React Router). */
  to?: string;
  /** URL externa — abre em nova aba com `rel` seguro. */
  href?: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

export function Button({
  variant = "secondary",
  children,
  to,
  href,
  onClick,
  className: extra,
  ...aria
}: ButtonProps) {
  const className = `${baseClasses} ${variantClasses[variant]} ${extra ?? ""}`;

  if (to) {
    return (
      <Link to={to} className={className} aria-label={aria["aria-label"]}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={aria["aria-label"]}
      >
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
