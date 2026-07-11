import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * Seção da home: âncora navegável + ritmo vertical constante
 * (128px desktop / 96px mobile — doc 04 §3.1).
 */
export function Section({
  id,
  children,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="scroll-mt-16 py-24 lg:py-32"
    >
      <Container>{children}</Container>
    </section>
  );
}
