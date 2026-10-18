import type { LanguageShare } from "@/content/types";
import { languageColor } from "@/lib/tech";
import { TechIcon } from "./TechIcon";

/**
 * Linguagens de um projeto (Release 0.10): a barra segmentada do GitHub, nas
 * cores do linguist, e a legenda com o logo oficial de cada linguagem.
 * `bar={false}` mostra só a legenda.
 */
export function LanguageBar({
  languages,
  bar = true,
}: {
  languages: LanguageShare[];
  bar?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {bar && (
        <div aria-hidden="true" className="flex h-2 gap-0.5 overflow-hidden rounded-full">
          {languages.map((l) => (
            <span
              key={l.name}
              className="block h-full"
              style={{ width: `${l.percent}%`, background: languageColor(l.name) }}
            />
          ))}
        </div>
      )}
      <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-text-2">
        {languages.map((l) => (
          <li key={l.name} className="inline-flex items-center gap-1.5">
            <TechIcon name={l.name} size={13} />
            <span className="font-semibold text-text">{l.name}</span> {l.percent}%
          </li>
        ))}
      </ul>
    </div>
  );
}
