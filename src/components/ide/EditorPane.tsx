import { ChevronRight, X } from "lucide-react";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export interface EditorTab {
  /** Nome exibido na tab, ex.: "fastpass.tsx". */
  name: string;
  /** Rota da tab; sem `to`, a tab é apenas o arquivo aberto. */
  to?: string;
  active?: boolean;
}

const tabBase =
  "flex shrink-0 items-center gap-2 border-r border-border border-t-2 px-4 py-2 font-mono text-label font-normal normal-case tracking-normal transition-colors duration-150";

function TabItem({ tab }: { tab: EditorTab }) {
  if (tab.active) {
    const content = (
      <>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        {tab.name}
        {/* Botão de fechar decorativo — chrome da metáfora, sem função */}
        {!tab.to && (
          <X size={12} strokeWidth={1.5} aria-hidden="true" className="text-text-3" />
        )}
      </>
    );
    const activeClasses = `${tabBase} border-t-accent bg-bg text-text`;
    return tab.to ? (
      <Link to={tab.to} aria-current="page" className={activeClasses}>
        {content}
      </Link>
    ) : (
      <span className={activeClasses}>{content}</span>
    );
  }

  return (
    <Link
      to={tab.to ?? "/"}
      className={`${tabBase} border-t-transparent text-text-3 hover:bg-surface-2 hover:text-text-2`}
    >
      {tab.name}
    </Link>
  );
}

/**
 * Moldura de editor da IDE (doc 04 §6.15, Release 0.6): faixa de tabs,
 * breadcrumb decorativo e corpo. As tabs são links reais quando têm rota;
 * o breadcrumb é visual apenas (aria-hidden). Sem overflow-hidden no
 * contêiner — o position:sticky de filhos (índice do case) depende disso.
 */
export function EditorPane({
  tabs,
  breadcrumb,
  label,
  children,
}: {
  tabs: EditorTab[];
  /** Segmentos do caminho, ex.: ["portfolio", "src", "sobre.tsx"]. */
  breadcrumb: string[];
  /** Rótulo do nav quando as tabs navegam (mais de uma tab com rota). */
  label?: string;
  children: ReactNode;
}) {
  const strip = tabs.map((tab) => <TabItem key={tab.name} tab={tab} />);
  const navigable = tabs.some((tab) => tab.to);

  return (
    <div className="rounded-md border border-border bg-bg">
      {navigable ? (
        <nav
          aria-label={label ?? "Arquivos abertos"}
          className="flex overflow-x-auto rounded-t-md border-b border-border bg-surface"
        >
          {strip}
        </nav>
      ) : (
        <div className="flex overflow-x-auto rounded-t-md border-b border-border bg-surface">
          {strip}
        </div>
      )}

      <div
        aria-hidden="true"
        className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2 font-mono text-label font-normal normal-case tracking-normal text-text-3"
      >
        {breadcrumb.map((segment, index) => (
          <Fragment key={segment}>
            {index > 0 && <ChevronRight size={12} strokeWidth={1.5} />}
            <span>{segment}</span>
          </Fragment>
        ))}
      </div>

      <div className="px-5 py-8 md:px-10 md:py-10">{children}</div>
    </div>
  );
}
