# Revisão técnica — Release 0.6.1 (Workbench)

**Data:** 2026-07-13 · **Commit de marco:** (este commit) · **Veredito:** Aprovado internamente; aguarda validação visual do Francisco em navegador real

## Objetivo e escopo

Revisão do objetivo da 0.6, definida pelo Francisco: a 0.6 aplicou estética
de IDE mas continuou se comportando como landing page. A 0.6.1 abandona o
paradigma de página longa: **a tela inteira é uma aplicação** — title bar,
rail, explorer, editor e status bar ocupando a viewport; cada seção é uma
view; o scroll global desaparece (só o painel do editor rola). Referência de
comportamento (não de visual): o ide-portfolio indicado pelo Francisco.
Invariantes: SEO, SSR/pre-render, acessibilidade, performance, contratos,
conteúdo, rotas e arquitetura de dados intactos; liberdade total na camada
de apresentação.

## Entregue

- **ADR-0011 — Workbench de views comutadas por hash**: as 7 seções da home
  (doc 03 §4) viram views comutadas pelas âncoras existentes (`/#sobre`…);
  hash não é rota — `routes.ts`, pre-render, sitemap e SEO não mudam. Todas
  as views ficam montadas (o HTML pré-renderizado contém a página completa;
  1 view visível + 6 `hidden` verificadas no `dist`); a ativa deriva da URL
  via `useSyncExternalStore` (SSR-safe, sem mismatch de hidratação, sem
  estado global — ADR-0004).
- **Workbench de viewport inteira** (`App`): `100dvh`, sem scroll global;
  faixas title bar (48 px) · rail de views com ícones e tooltips (md+) ·
  explorer em árvore (lg+) · editor com **EditorTabs** + breadcrumb ·
  status bar de uma linha. O único scroll é `#editor-scroll` (suave,
  respeitando `prefers-reduced-motion`); `ScrollManager` reescrito para o
  painel (âncoras de case continuam com foco gerenciado, via rAF pós-comutação).
- **EditorTabs derivadas da URL**: tab `overview.tsx` fixa; o arquivo aberto
  (view, pasta `projetos`, case ou `404.html`) entra ao lado com
  `aria-current="page"` e **fechar funcional** (view → overview; case →
  `/projetos`). Breadcrumb decorativo `portfolio › src › …`.
- **Explorer real**: `src/` com uma view por arquivo e `projetos/` com os 5
  cases, extensão derivada da primeira tag real (`fastpass.tsx`,
  `reconhecimento-facial.py`, `edupass.js`, `reviva.java`,
  `carrinho-inteligente.java`) — casa com o exemplo do briefing sem inventar
  nada.
- **Fim dos cards**: `ProjectCard` virou linha de arquivo (borda inferior,
  sem caixa); `/projetos` e a view Projetos são listas de arquivos; skills
  seguem como extensões e princípios como painéis, ambos compactados.
  Espaçamento denso em tudo (doc 04 §3.1 novo).
- **Paleta grafite-quente + acento âmbar** (doc 02 §3, doc 04 §1): sai o
  neutro frio + teal ("estética de IA", nos termos do Francisco), entra
  `bg #121110 … text #F2F0ED` com acento `#D9A866`. Contrastes calculados:
  todos os pares ≥ 4,68:1 (AA). Assets de marca regenerados
  (favicon, app icons, apple-touch, OG) pelo script oficial.
- **Navegação completa**: `site.nav` ganhou Trajetória e Sobre — sem página
  longa não existe descoberta por scroll; toda view precisa de link (doc 03
  §2 atualizado). `useScrollSpy` segue apenas no índice de case.

## Decisões de implementação (interpretações registradas)

1. **Views todas montadas + `hidden` por CSS** (ADR-0011): preserva contrato
   da ordem das seções, o conteúdo integral no HTML pré-renderizado e o axe
   — o custo é conteúdo `display:none` até navegar, aceito porque os cases
   (conteúdo indexável primário) vivem em rotas próprias visíveis.
2. **`useSyncExternalStore` para a view**: SSR/hidratação sempre "overview"
   (o servidor não vê hash), hash real assume no re-render pós-hidratação —
   zero mismatch e zero `setState` em efeito (regra nova do
   eslint-plugin-react-hooks v7 pegou a primeira versão com estado+efeito).
3. **Fechar tab é funcional** (diferente do fechar decorativo da 0.6): agora
   fechar tem um destino natural — o contexto de origem. Alvo de 24 px,
   `aria-label` próprio.
4. **Home.test, CasePage.test, axe e SSR smoke passaram sem nenhuma
   alteração** — os contratos aprovados valeram como especificação do
   refactor.
5. **0.6.1, não 0.7**: revisão do objetivo da 0.6 (precedente da 0.3.1); o
   pré-lançamento continua sendo a 0.7.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **44/44 sem alterar testes** ·
  build com pre-render ok (8 páginas + sitemap + robots).
- Orçamentos (doc 06 §7): JS inicial **103,3 KB / 110 KB** (voltou a um
  chunk único — o compartilhamento que dividia a entrada saiu com o
  EditorPane) · case 2,9 KB / 35 KB · CSS **19,8 KB / 25 KB**.
- `dist` inspecionado: canonical/OG/JSON-LD por rota, sitemap 7 URLs, robots,
  `404.html` noindex; home pré-renderizada com o conteúdo das 7 views
  (1 visível + 6 `hidden`), tabs/explorer/status bar no HTML; preview
  responde nas 4 rotas-tipo.
- Conteúdo (`src/content/`) intocado exceto `site.nav` (+2 itens de
  navegação, rótulos das seções existentes); rotas, `vercel.json`, `seo.ts`
  e pipeline intocados.

## Pendências geradas

- **Validação visual do Francisco em navegador real** — desktop (workbench
  completo), tablet (rail sem explorer) e mobile (menu overlay + editor).
  Pontos novos de teclado: comutação de views (foco vai à view), tabs com
  fechar, rail e árvore.
- Checklist manual de acessibilidade (NVDA, Tab, zoom 200%) acumulado das
  Releases 0.3–0.6.1.
- Lighthouse no deploy da Vercel (critério M7 ≥ 95 segue aberto): a mudança
  não adiciona JS relevante, mas a medição real é a prova.
- Screenshots dos projetos ([PENDENTE] doc 05 §7) entram nas linhas de
  arquivo e nos cases quando existirem.
