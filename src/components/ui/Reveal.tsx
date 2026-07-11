import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp } from "@/lib/motion";

/**
 * Revelação de entrada no scroll (doc 08 §5): uma vez, 16px, tokens do
 * doc 04 §5. Único caminho permitido para animar seções.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      variants={fadeInUp(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  );
}
