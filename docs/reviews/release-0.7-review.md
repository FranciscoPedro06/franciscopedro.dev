# Revisão técnica — Release 0.7 ("É uma IDE no navegador")

**Data:** 2026-07-14 · **Commits de marco:** M1–M6 (6 commits) · **Veredito:** Aprovado internamente; aguarda validação visual do Francisco em navegador real

## Objetivo e escopo

Definido pelo Francisco: não evoluir o design da 0.6.1, mas **mudar a
experiência inteira** — depois de 30 s, um dev deve esquecer que é um site e
sentir que abriu uma IDE. Referência de princípios de UX (não de código nem
identidade): `arnofrxdd.github.io/ide-portfolio` e o VS Code. Liberdade total
na camada de apresentação; **invariantes intocáveis**: conteúdo, dados, rotas,
SEO, SSR/pre-render, sitemap/robots/canonical/OG/JSON-LD, 404, os 44 testes
originais, build e orçamentos.

## Entregue (6 marcos, 1 commit cada)

- **M1 — Fundação.** ADR-0012 (store do shell, `src/lib/workbench.ts`:
  primeiro estado de cliente, restrito a cromo de UI, SSR-safe pelo padrão do
  `useHomeView`) + ADR-0013 (theming light+dark: dark default no `:root`,
  light override em `:root[data-theme="light"]`, paleta papel-quente + acento
  bronze com AA medido por script — doc 04 §1.5; script anti-flash inline no
  `index.html`, SSR e hidratação intactos). Motion apertado para 120–180 ms,
  raios menores, `.scrollbar-ide`, `ThemeToggle`.
- **M2 — Barras.** Title bar de software (glyph, wordmark, views como menu,
  branch, controles de janela decorativos); Activity bar com comutadores de
  painel + atalhos de conteúdo; Status bar densa com fatos técnicos
  verdadeiros + contatos/repo/copyright preservados. `SidePanel` como
  container comutado por `activeView`; `SettingsPanel` (aparência funcional +
  retrato read-only do ferramental real).
- **M3 — Painel lateral.** Explorer recursivo com colapso persistido e
  chevrons que giram; `ResizeHandle` acessível (`role="separator"`, ponteiro +
  setas, clamp) com largura persistida; `SearchPanel` (lazy) com filtro
  instantâneo sobre o conteúdo existente; `SourceControlPanel` (lazy) com
  commits **reais** via `scripts/gen-git-log.mjs` → `src/content/generated/`.
- **M4 — Editor.** `EditorTabs` multi-tab real (conjunto persistido, aba ativa
  pela URL, fechar/reabrir, overflow), breadcrumb com trilha do arquivo,
  `Minimap` decorativo (`aria-hidden`, xl+) com indicador de viewport.
- **M5 — Poderes de IDE.** Command Palette (Ctrl/⌘+Shift+P, F1; host eager
  minúsculo, modal lazy combobox/listbox; todo comando é ação real/rota) e
  painel inferior (lazy; Problems/Output/Terminal/Debug/Ports; Terminal é
  transcript roteirizado dos comandos reais com playback).
- **M6 — Microinterações, mobile, orçamento.** Press feedback e transições
  120–180 ms; **mobile**: rail sempre visível, painel lateral vira drawer
  (backdrop, Esc, botão fechar), gatilho de paleta no rail; **remoção do
  framer-motion da entrada** (Reveal/MobileMenu/Terminal → CSS +
  IntersectionObserver + matchMedia).

## Decisões de implementação (interpretações registradas)

1. **Orçamento é lei (doc 06 §7):** as superfícies pesadas (Search, Source
   Control, Command Palette, painel inferior) são lazy; o único caminho para
   caber o cromo novo + mobile foi **tirar o framer-motion da entrada** — o JS
   inicial caiu de ~110 KB para **73,5 KB gzip**. Nenhum limite foi afrouxado.
2. **Estado de cliente restrito (ADR-0012):** só cromo. A **aba ativa** e a
   **navegação** seguem derivadas da URL/hash (ADR-0004/0011); o *conjunto* de
   abas é que é client-state. Todo flag tem `DEFAULT` (contrato de SSR) e o
   valor persistido só assume pós-hidratação (gate `useHydrated`).
3. **Theming sem tocar no SSR (ADR-0013):** `data-theme` vive fora do `#root`
   e é pintado por script inline antes do paint — sem flash, sem mismatch. O
   `axe` segue ignorando `color-contrast`; a paleta light foi medida à parte.
4. **Honestidade do chrome:** Source Control mostra commits reais (script);
   Settings/Terminal/Problems/Output/Ports refletem o ferramental e o pipeline
   verdadeiros; nada inventado (doc 00). Menu de views mantido no title bar
   porque o `NavBar.test` exige os 6 links + o botão Menu.
5. **Reveal sem regressão de no-JS:** o estado oculto é gated por `data-js`
   (marcado pelo script inline), então sem JS o conteúdo aparece normal — o
   comportamento antigo (framer renderizava oculto no SSR) melhorou.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **56/56** (44 originais
  intocados + 12 novos de tema/shell/rail/explorer/search/tabs/palette/panel) ·
  build com pre-render ok (8 páginas + sitemap + robots + git-log).
- Orçamentos (doc 06 §7): **JS inicial 73,5 KB / 110 KB** · maior chunk lazy
  3,0 KB / 35 KB · **CSS 21,3 KB / 25 KB**. Palette/panel/search/scm em chunks
  lazy de 1,4–2,0 KB.
- Invariantes: `src/content/**` (dados/texto), `routes.ts`, `seo.ts`,
  `entry-server.tsx`, `prerender.mjs` intocados; os 44 testes originais verdes
  sem alteração.

## Pendências geradas

- **Validação visual do Francisco em navegador real** — desktop (workbench
  completo, resize/collapse, multi-tab, palette, painel inferior), tablet e
  **mobile** (rail + drawer + paleta pelo rail); tema light/dark sem flash.
- Checklist manual de acessibilidade (NVDA, Tab, zoom 200%) acumulado das
  Releases 0.3–0.7, incluindo os focos novos: drawer mobile, combobox da
  paleta, `role=separator` do resize, tablist do painel inferior.
- Lighthouse no deploy da Vercel (critério M7 ≥ 95): a saída do framer deve
  ajudar; a medição real é a prova.
- Pré-lançamento/v1.0 (era o escopo original da 0.7): roadmap GitHub (doc 07
  §3) e material do Francisco (doc 05 §7) seguem pendentes — a 0.7 virou a
  Release de experiência; o pré-lançamento é a próxima.
