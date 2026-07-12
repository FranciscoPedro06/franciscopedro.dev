import { Link } from "react-router-dom";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { CaseSection } from "@/content/types";

/**
 * Índice lateral do estudo de caso (doc 03 §5.3): fixo em desktop com
 * scroll-spy, omitido no mobile — lá a leitura é linear.
 */
export function CaseIndex({ sections }: { sections: CaseSection[] }) {
  const active = useScrollSpy(sections.map((s) => s.kind));

  return (
    <nav aria-label="Seções deste estudo de caso" className="hidden lg:block">
      <ul className="sticky top-28 space-y-3 border-l border-border pl-5">
        {sections.map((section) => (
          <li key={section.kind}>
            {/* Link (não <a>) para o ScrollManager mover o foco junto (doc 13 §2) */}
            <Link
              to={`#${section.kind}`}
              aria-current={active === section.kind ? "true" : undefined}
              className={`text-small transition-colors duration-150 ${
                active === section.kind
                  ? "text-text"
                  : "text-text-3 hover:text-text-2"
              }`}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
