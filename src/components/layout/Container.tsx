import type { ReactNode } from "react";

/** Container central do grid — 1120px, padding lateral do doc 04 §3. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
