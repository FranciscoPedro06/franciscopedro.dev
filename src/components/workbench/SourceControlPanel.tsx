import { GitCommitHorizontal } from "lucide-react";
import { branch, commits } from "@/content/generated/git-log";

/**
 * Painel Source Control (doc 04 §6.20): os commits **reais** do repositório
 * (gerados por scripts/gen-git-log.mjs). Nada de histórico inventado — se o
 * snapshot estiver vazio, o painel diz isso.
 */
export function SourceControlPanel() {
  return (
    <div className="font-mono text-small">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2 text-text-2">
        <GitCommitHorizontal size={14} strokeWidth={1.5} aria-hidden="true" />
        <span className="truncate">{branch}</span>
        <span className="ml-auto shrink-0 text-label text-text-3">
          {commits.length} commits
        </span>
      </div>

      {commits.length === 0 ? (
        <p className="px-4 py-3 text-text-3">Histórico indisponível neste build.</p>
      ) : (
        <ol className="py-1">
          {commits.map((commit) => (
            <li
              key={commit.hash}
              className="group flex flex-col gap-0.5 px-4 py-1.5 transition-colors duration-150 hover:bg-surface-2"
            >
              <span className="flex items-baseline gap-2">
                <code className="shrink-0 text-accent">{commit.hash}</code>
                <span className="shrink-0 text-label text-text-3">{commit.date}</span>
              </span>
              <span className="text-text-2">{commit.subject}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
