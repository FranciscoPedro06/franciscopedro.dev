import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { site } from "@/content/site";
import {
  type ActivityView,
  readWorkbench,
  setWorkbench,
  toggleTheme,
} from "@/lib/workbench";

/**
 * Command Palette (doc 04 §6.23): Ctrl/⌘+Shift+P ou F1. Todos os comandos são
 * ações reais ou rotas existentes — nada decorativo. Padrão combobox/listbox:
 * input com `aria-activedescendant`, setas navegam, Enter executa, Esc fecha.
 */

interface Command {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  run: () => void;
}

/** Faixas [início, fim) onde os tokens casam no texto (case-insensitive), fundidas. */
function matchRanges(text: string, tokens: string[]): [number, number][] {
  const lower = text.toLowerCase();
  const raw: [number, number][] = [];
  for (const token of tokens) {
    let from = 0;
    for (;;) {
      const at = lower.indexOf(token, from);
      if (at === -1) break;
      raw.push([at, at + token.length]);
      from = at + 1;
    }
  }
  raw.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of raw) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  return merged;
}

/**
 * Label com os trechos que casaram acesos (doc 04 §6.23): feedback vivo por
 * tecla, ênfase por TINTA (accent + peso — ADR-0016), nunca cor decorativa.
 */
function Highlighted({ text, tokens }: { text: string; tokens: string[] }) {
  const ranges = tokens.length > 0 ? matchRanges(text, tokens) : [];
  if (ranges.length === 0) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={start} className="bg-transparent font-semibold text-accent">
        {text.slice(start, end)}
      </mark>
    );
    cursor = end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const openView = (view: ActivityView) =>
      setWorkbench({ activeView: view, sidebarCollapsed: false });

    const list: Command[] = [
      { id: "go-overview", label: "Go: Overview", hint: "/", run: () => navigate("/") },
      { id: "go-projects", label: "Go: Projects", hint: "/projetos", run: () => navigate("/projetos") },
      { id: "go-skills", label: "Go: Skills", hint: "/#engenharia", keywords: "engenharia", run: () => navigate("/#engenharia") },
      { id: "go-data", label: "Go: Data", hint: "/#dados", keywords: "dados", run: () => navigate("/#dados") },
      { id: "go-experience", label: "Go: Experience", hint: "/#trajetoria", keywords: "trajetoria timeline", run: () => navigate("/#trajetoria") },
      { id: "go-about", label: "Go: About", hint: "/#sobre", keywords: "sobre", run: () => navigate("/#sobre") },
      { id: "go-contact", label: "Go: Contact", hint: "/#contato", keywords: "contato contact", run: () => navigate("/#contato") },
      { id: "open-fastpass", label: "Open Case: FastPass", hint: "/projetos/fastpass", run: () => navigate("/projetos/fastpass") },
      { id: "view-explorer", label: "View: Explorer", hint: "painel", run: () => openView("explorer") },
      { id: "view-search", label: "Focus Search", hint: "painel", keywords: "buscar search", run: () => { openView("search"); requestAnimationFrame(() => document.getElementById("wb-search-input")?.focus()); } },
      { id: "view-scm", label: "View: Source Control", hint: "painel", keywords: "git commits", run: () => openView("scm") },
      { id: "view-settings", label: "View: Settings", hint: "painel", run: () => openView("settings") },
      { id: "toggle-sidebar", label: "Toggle Sidebar", hint: "layout", keywords: "collapse expand explorer", run: () => setWorkbench({ sidebarCollapsed: !readWorkbench().sidebarCollapsed }) },
      { id: "toggle-panel", label: "Toggle Panel", hint: "layout", keywords: "terminal problems", run: () => setWorkbench({ panelOpen: !readWorkbench().panelOpen }) },
      { id: "open-terminal", label: "Terminal: Focus", hint: "painel inferior", run: () => setWorkbench({ panelOpen: true, panelTab: "terminal" }) },
      { id: "change-theme", label: "Preferences: Change Theme", hint: "aparência", keywords: "dark light tema", run: toggleTheme },
    ];
    for (const s of site.social) {
      list.push({ id: `open-${s.label.toLowerCase()}`, label: `Open ${s.label}`, hint: "externo ↗", run: () => window.open(s.url, "_blank", "noopener") });
    }
    list.push({ id: "open-repo", label: "Open Repository", hint: "externo ↗", keywords: "codigo source", run: () => window.open(site.repositoryUrl, "_blank", "noopener") });
    return list;
  }, [navigate]);

  const tokens = useMemo(
    () => query.toLowerCase().split(/\s+/).filter(Boolean),
    [query]
  );

  const results = useMemo(() => {
    if (tokens.length === 0) return commands;
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.hint} ${command.keywords ?? ""}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    });
  }, [tokens, commands]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    command.run();
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[selected]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-center bg-black/40 px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Fechar paleta de comandos"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Paleta de comandos"
        className="elevated relative flex h-fit w-full max-w-xl flex-col overflow-hidden rounded-md border border-border-strong bg-surface motion-safe:animate-[view-in_120ms_ease-out]"
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={results[selected] ? `cmd-${results[selected].id}` : undefined}
          aria-label="Buscar comando"
          placeholder="Buscar comando…  (↑↓ navega · Enter executa · Esc fecha)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onKeyDown}
          className="border-b border-border bg-transparent px-4 py-3 font-mono text-small text-text placeholder:text-text-3 focus:outline-none"
        />

        <ul
          id="cmd-list"
          ref={listRef}
          role="listbox"
          aria-label="Comandos"
          className="scrollbar-ide max-h-[50vh] overflow-y-auto py-1 font-mono text-small"
        >
          {results.length === 0 && (
            <li className="px-4 py-2 text-text-3">Nenhum comando encontrado.</li>
          )}
          {results.map((command, index) => {
            const on = index === selected;
            return (
              // Padrão combobox/listbox: o teclado é do input (aria-activedescendant);
              // o clique é atalho de mouse. A regra jsx-a11y não modela esse caso.
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <li
                key={command.id}
                id={`cmd-${command.id}`}
                role="option"
                aria-selected={on}
                onClick={() => run(command)}
                onMouseMove={() => setSelected(index)}
                className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-1.5 ${
                  on ? "bg-accent-dim text-text" : "text-text-2"
                }`}
              >
                <span className="truncate">
                  <Highlighted text={command.label} tokens={tokens} />
                </span>
                <span className="shrink-0 text-label text-text-3">{command.hint}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
