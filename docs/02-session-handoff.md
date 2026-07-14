# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-14 · **Release encerrada:** 0.7 — "É uma IDE no navegador"

## Próximo objetivo

**Validação em navegador real da 0.7 pelo Francisco** antes de qualquer novo
código: a release mudou a experiência inteira (theming, estado de cliente,
palette, painel inferior, drawer mobile) e só passou pelo gate automatizado.
Depois, **Release 0.8 — Pré-lançamento / v1.0** (doc 07 §3): roadmap GitHub,
medição do M7 (≥ 95) no deploy e integração do material do Francisco (doc 05
§7) conforme chegar.

## Arquivos provavelmente envolvidos

- `src/lib/workbench.ts` — o store do shell (ADR-0012). Todo cromo novo passa
  por aqui; todo campo tem um `DEFAULT` (contrato de SSR).
- `src/components/workbench/` — ActivityBar, SidePanel (+ Explorer, Settings,
  Search‡, SourceControl‡), EditorTabs, Minimap, CommandPalette‡ (+ Host),
  BottomPanel‡ (+ Host), ResizeHandle, ThemeToggle. (‡ = chunk lazy.)
- `src/index.css` — tokens dos dois temas (dark `:root` + light
  `[data-theme=light]`), `.scrollbar-ide`, `.reveal`, keyframes.
- `index.html` — script anti-flash (tema + `data-js`) antes do paint.
- `scripts/gen-git-log.mjs` → `src/content/generated/git-log.ts` — commits
  reais do Source Control; regenerado no `build` (e por `npm run gen:gitlog`).
- `src/lib/seo.ts` (`SITE_URL`), `src/content/site.ts` (e-mail, LinkedIn,
  `resumeReady`) — pendências de material entram aqui.

## Decisões desta release

- **ADR-0012 (estado do shell):** primeiro estado de cliente do projeto, só
  cromo de UI, SSR-safe. Navegação/SEO seguem na URL/hash (ADR-0004/0011); a
  aba ativa vem da URL, só o *conjunto* de abas é client-state.
- **ADR-0013 (theming light+dark):** dark default; light por `data-theme`;
  anti-flash inline; SSR intacto; paleta light medida (doc 04 §1.5).
- **framer-motion saiu da entrada:** Reveal/MobileMenu/Terminal → CSS +
  IntersectionObserver + matchMedia. JS inicial 110 → **73,5 KB**. A regra do
  orçamento (doc 06 §7) não se ajusta — o cromo novo coube porque o framer saiu.
- **Superfícies pesadas são lazy:** Search, Source Control, Command Palette e
  painel inferior — fora da entrada e do HTML de SSR.

## Observações

- **Folga de orçamento agora é grande** (73,5/110 KB) — mas a disciplina
  continua: features pesadas nascem lazy; medir a cada marco.
- Pontos novos do checklist manual de a11y: drawer mobile (backdrop, Esc,
  foco), combobox da paleta (`aria-activedescendant`), `role=separator` do
  resize (setas), tablist do painel inferior, tema light/dark sem flash.
- As Releases 0.3–0.7 aguardam validação do Francisco em navegador real
  (NVDA, Tab, zoom 200%, mobile).
- O critério M7 (performance ≥ 95) segue aberto; a saída do framer deve
  ajudar. Medir no PageSpeed/CI (no Windows local o Lighthouse CI precisa de
  `CHROME_PATH` apontando para o Edge).
- Pendências de material que bloqueiam a publicação: ver
  [01-project-state.md](01-project-state.md).
