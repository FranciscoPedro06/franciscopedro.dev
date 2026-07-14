import type { Transition, Variants } from "framer-motion";

/**
 * Tokens de motion — fonte: docs/04-design-system.md §5.
 * Faixa da Release 0.7: 120–180ms — movimento de software, não de site.
 */
export const DURATION = { fast: 0.12, base: 0.15, slow: 0.18 } as const;
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const;

const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT_SOFT,
};

/**
 * Variants centralizados (doc 06 §10): componentes consomem estas fábricas e
 * nunca definem timings próprios. `reduced` vem de `useReducedMotion` — com
 * motion reduzido os estados finais são renderizados sem transição.
 */
export function fadeInUp(reduced: boolean): Variants {
  if (reduced) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
  return {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...baseTransition, duration: DURATION.slow },
    },
  };
}

export function fadeIn(reduced: boolean): Variants {
  if (reduced) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: baseTransition },
  };
}
