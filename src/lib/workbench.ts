import { useSyncExternalStore } from "react";

/**
 * Store do "shell" do Workbench (ADR-0012): o primeiro — e único — estado de
 * cliente do projeto, restrito a **cromo de UI**. Conteúdo, navegação e SEO
 * seguem derivados da URL/hash (ADR-0004/0011). SSR-safe pelo mesmo padrão do
 * `useHomeView`: o snapshot de servidor é sempre `DEFAULTS` e o valor
 * persistido só assume após hidratar (gate `useHydrated`) — sem mismatch.
 */

/**
 * Temas de cores (ADR-0013 + ADR-0018): Dark Modern e Light Modern do VS Code
 * (`dark`/`light`, os ids históricos) e três temas populares de editor.
 */
export const THEMES = [
  { id: "dark", label: "Dark Modern", note: "padrão do VS Code", surface: "#181818", bg: "#1f1f1f", swatches: ["#569cd6", "#ce9178", "#dcdcaa"] },
  { id: "light", label: "Light Modern", note: "claro do VS Code", surface: "#f8f8f8", bg: "#ffffff", swatches: ["#0000ff", "#a31515", "#795e26"] },
  { id: "github-dark", label: "GitHub Dark", note: "tema oficial do GitHub", surface: "#010409", bg: "#0d1117", swatches: ["#ff7b72", "#a5d6ff", "#d2a8ff"] },
  { id: "dracula", label: "Dracula", note: "draculatheme.com", surface: "#21222c", bg: "#282a36", swatches: ["#ff79c6", "#f1fa8c", "#50fa7b"] },
  { id: "monokai", label: "Monokai", note: "incluso no VS Code", surface: "#1e1f1c", bg: "#272822", swatches: ["#f92672", "#e6db74", "#a6e22e"] },
] as const;

export type Theme = (typeof THEMES)[number]["id"];

export const isTheme = (value: unknown): value is Theme =>
  THEMES.some((theme) => theme.id === value);
export type ActivityView = "explorer" | "search" | "scm" | "settings";
export type PanelTab = "terminal" | "problems" | "output" | "debug" | "ports";

export interface WorkbenchState {
  theme: Theme;
  /** Sidebar inteira recolhida (lg+; rail permanece). */
  sidebarCollapsed: boolean;
  /** Painel lateral aberto como drawer no mobile (<lg). */
  mobilePanelOpen: boolean;
  /** Largura do explorer em px, arrastável (M3). */
  sidebarWidth: number;
  /** View do painel lateral que o rail comuta. */
  activeView: ActivityView;
  /** Pastas expandidas do explorer, por id de nó. */
  explorerExpanded: Record<string, boolean>;
  /** Conjunto de "arquivos" abertos como tabs (a aba ativa vem da URL). */
  openTabs: string[];
  /** Painel inferior aberto (M5). */
  panelOpen: boolean;
  /** Aba ativa do painel inferior. */
  panelTab: PanelTab;
  /** Painel de detalhes à direita (Release 0.10), visível em telas largas. */
  inspectorOpen: boolean;
}

/** Contrato de SSR: o que o servidor e a primeira renderização enxergam. */
export const DEFAULTS: WorkbenchState = {
  theme: "dark",
  sidebarCollapsed: false,
  mobilePanelOpen: false,
  sidebarWidth: 248,
  activeView: "explorer",
  explorerExpanded: { src: true, projetos: true },
  openTabs: [],
  panelOpen: false,
  panelTab: "terminal",
  inspectorOpen: true,
};

const KEY = "fp.workbench.v1";
const THEME_COLOR = Object.fromEntries(THEMES.map((t) => [t.id, t.surface])) as Record<Theme, string>;

const listeners = new Set<() => void>();

function readStorage(): WorkbenchState {
  if (typeof window === "undefined") return DEFAULTS;
  let stored: Partial<WorkbenchState> = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Partial<WorkbenchState>;
  } catch {
    stored = {};
  }
  // O tema pintado antes do React (script anti-flash, ADR-0013) é a verdade
  // quando não há valor salvo — mantém o store em sincronia com o DOM.
  const domTheme = document.documentElement.dataset.theme;
  const theme = isTheme(stored.theme)
    ? stored.theme
    : isTheme(domTheme)
      ? domTheme
      : DEFAULTS.theme;
  return { ...DEFAULTS, ...stored, theme };
}

// Carregado uma vez no cliente; em SSR/jsdom sem storage cai nos DEFAULTS.
let state: WorkbenchState = typeof window === "undefined" ? DEFAULTS : readStorage();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // modo privado / storage cheio — o estado segue só em memória
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

const getSnapshot = () => state;
const getServerSnapshot = () => DEFAULTS;

/** Aplica o tema ao DOM (atributo + `theme-color`). Só roda no cliente. */
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
}

/** Atualização parcial e persistida do shell. */
export function setWorkbench(patch: Partial<WorkbenchState>): void {
  state = { ...state, ...patch };
  persist();
  if (patch.theme) applyTheme(patch.theme);
  emit();
}

export function toggleTheme(): void {
  setWorkbench({ theme: state.theme === "light" ? "dark" : "light" });
}

export function toggleExplorerNode(id: string): void {
  setWorkbench({
    explorerExpanded: {
      ...state.explorerExpanded,
      [id]: !(state.explorerExpanded[id] ?? false),
    },
  });
}

/** Leitura direta (fora de componente React). */
export function readWorkbench(): WorkbenchState {
  return state;
}

/**
 * `true` só após a hidratação — antes disso todo consumidor recebe `DEFAULTS`,
 * igual ao servidor. Mesmo mecanismo do `useHomeView` (ADR-0011).
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/** Estado do shell, SSR-safe. */
export function useWorkbench(): WorkbenchState {
  const hydrated = useHydrated();
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return hydrated ? snapshot : DEFAULTS;
}
