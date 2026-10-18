import { ExternalLink } from "lucide-react";
import { highlight, type Lang } from "@/lib/highlight";
import { FileGlyph } from "./FileGlyph";

/**
 * Bloco de código no visual do editor (Release 0.10): cabeçalho com o logo
 * da linguagem e o caminho, números de linha a partir da linha real do
 * arquivo e realce Dark+/Light+. `compact` é a prévia usada como capa dos
 * projetos (fonte menor, altura fixa, sem rolagem, `aria-hidden`).
 */
export function CodeBlock({
  code,
  lang,
  file,
  path,
  href,
  startLine = 1,
  compact = false,
}: {
  code: string;
  lang: Lang;
  file: string;
  path?: string;
  href?: string;
  startLine?: number;
  compact?: boolean;
}) {
  const lines = highlight(code, lang);
  const gutter = String(startLine + lines.length - 1).length;

  return (
    <div
      aria-hidden={compact || undefined}
      className={`overflow-hidden border border-border bg-bg ${compact ? "rounded-sm" : "rounded-md"}`}
    >
      <div
        className={`flex items-center gap-1.5 border-b border-border bg-surface px-2.5 text-text ${
          compact ? "h-6 text-[11.5px]" : "h-8 text-small"
        }`}
      >
        <FileGlyph file={file} size={compact ? 12 : 14} />
        <span className="shrink-0">{file}</span>
        {path && <span className="min-w-0 truncate text-text-3">{path}</span>}
        {href && !compact && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex shrink-0 items-center gap-1 text-[12px] text-link hover:underline"
          >
            ver no GitHub
            <ExternalLink size={12} strokeWidth={1.5} aria-hidden="true" />
          </a>
        )}
      </div>
      <pre
        className={`overflow-x-auto font-mono text-text ${
          compact
            ? "h-[118px] overflow-hidden py-1.5 text-[10.5px] leading-[1.55] [mask-image:linear-gradient(#000_65%,transparent)]"
            : "py-2.5 text-[12.5px] leading-[1.6]"
        }`}
      >
        <code>
          {lines.map((tokens, i) => (
            <span key={i} className="block whitespace-pre pr-4">
              <span
                aria-hidden="true"
                className="inline-block select-none pr-4 text-right text-text-3"
                style={{ width: `${gutter + (compact ? 2.2 : 3)}ch` }}
              >
                {startLine + i}
              </span>
              {tokens.length === 0
                ? " "
                : tokens.map((token, j) => (
                    <span key={j} className={token.className}>
                      {token.text}
                    </span>
                  ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
