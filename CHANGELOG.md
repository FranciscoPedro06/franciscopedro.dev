# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/);
versionamento [SemVer](https://semver.org/lang/pt-BR/). Cada entrada
corresponde a um marco do [roadmap](docs/07-roadmap.md).

## [Unreleased]

### Added

- Release 0.9: "Identidade visual editorial-técnica" (ADR-0016) — mantém a
  estrutura de IDE e troca a **textura**, que havia pousado no centroide
  "premium/dark de IA" (grafite-quente + acento-ouro + Inter + cromo fabricado).
  **Três vozes tipográficas**: Newsreader (serifa) nos títulos de documento — voz
  humana à esquerda, densa, dentro do editor; IBM Plex Sans no corpo/cromo, no
  lugar da Inter; JetBrains Mono só onde é código. **LinkedIn** integrado aos
  contatos (fim do `[PENDENTE]` do doc 05 §7) e **ícones de marca SVG**
  (GitHub/LinkedIn) inline, monocromáticos via `currentColor` — reconhecimento
  pela forma, cor pelo contexto (o LinkedIn não entra azul); resolvedor em
  `src/lib/brand.ts`, comando "Open LinkedIn" na paleta. Gate verde: ESLint,
  `tsc`, Vitest 56/56, build; JS 75,1/110 KB, CSS 21,3/25 KB.
- Release 0.8: "Redesign / Maturidade de produto" — fecha a dissonância entre a
  moldura de IDE e um conteúdo que ainda tinha linguagem de landing page (5
  marcos), a partir de uma auditoria de design da 0.7. **Conteúdo como
  documento** (ADR-0014): o editor abre o arquivo como documento, não como
  seção de marketing — `DocHeader` (comentário mono de topo de arquivo +
  título + lead) no lugar do `SectionHeading`; `overview` reconstruído como
  cabeçalho de arquivo (papel como comentário, nome em `display`), alinhado à
  esquerda e denso, sem hero centralizado; ações como afordâncias de workspace
  (links mono), não botões de campanha. **Linguagem visual** (M1): escala
  tipográfica contida (teto 40 px, corpo 15 px, uma voz), rampa de neutros com
  `surface-3`, elevação `.elevated` (só camadas flutuantes), densidade dupla
  (cromo/leitura). **De-carding**: princípios de Engenharia e competências de
  Dados viram listas de documento, não grades de cards com borda. **Workspace
  vivo de dados reais** (M4): status bar com branch e último commit reais do
  `git-log` (data relativa viva, SSR-safe) que abre o Source Control, e um
  gatilho *command-first* visível na title bar (a descoberta que faltava). 404
  re-vozeado como documento. Contratos de SSR/SEO/rotas e os 56 testes intactos.
- Release 0.7: "É uma IDE no navegador" — transformação completa da
  experiência (6 marcos). **Theming light + dark real** (ADR-0013): dark é o
  default, light é override por `data-theme` com paleta papel-quente + acento
  bronze e contraste AA medido; script anti-flash inline aplica o tema antes
  do paint (SSR intacto). **Estado do shell** (ADR-0012): primeiro estado de
  cliente do projeto, restrito a cromo de UI e SSR-safe, guardando tema,
  colapso/largura da sidebar, pastas do explorer, abas abertas e painel
  inferior. **Title bar** de software (glyph, wordmark, menu de views, branch,
  controles de janela). **Activity bar** com comutadores de painel (Explorer,
  Search, Source Control, Settings) + atalhos de conteúdo + paleta de
  comandos. **Explorer** com árvore recursiva de colapso persistido e largura
  arrastável; **Search** (filtro instantâneo do conteúdo existente) e **Source
  Control** (commits reais via `gen-git-log`) como painéis lazy; **Settings**
  com aparência + retrato read-only do ferramental. **Editor multi-tab** real
  (conjunto persistido, aba ativa pela URL, fechar/reabrir), breadcrumb e
  **minimap** decorativo. **Command Palette** (Ctrl/⌘+Shift+P, F1) e **painel
  inferior** (Problems/Output/Terminal/Debug/Ports; Terminal é transcript
  roteirizado dos comandos reais) — ambos lazy. Adaptação **mobile** (rail
  sempre visível, painel lateral vira drawer). **Status bar** rica.
  SEO/SSR/pre-render/rotas/conteúdo e os 44 testes originais 100% intactos.
- Release 0.6.1: Workbench — fim do paradigma de landing page: a aplicação
  ocupa a viewport inteira (title bar, rail de views, explorer, editor,
  status bar) e não existe scroll global — as 7 seções aprovadas da home
  viram views comutadas pelas âncoras existentes (ADR-0011), todas montadas
  no DOM para preservar SEO, pre-render e contratos; o único scroll é o do
  painel do editor. EditorTabs derivadas da URL com fechar funcional,
  explorer com a árvore real (`src/` + `projetos/` com extensão por stack:
  `fastpass.tsx`, `reconhecimento-facial.py`…), projetos como linhas de
  arquivo em vez de cards, espaçamento denso, navegação completa (entraram
  Trajetória e Sobre) e paleta grafite-quente com acento âmbar `#D9A866`
  no lugar do teal (doc 02 §3; assets de marca regenerados). Rotas,
  conteúdo, SEO, SSR e os 44 testes intactos.
- Release 0.6: Design "IDE" — release 100% visual que transforma a página
  numa moldura de aplicação: title bar em largura total, rail de atalhos
  com ícones Lucide e tooltips (lg+), Explorer em árvore de navegação
  derivada das rotas existentes (xl+), footer como status bar fixa,
  `EditorPane` com tabs e breadcrumb decorativo (Hero como
  `francisco-pedro.tsx`; os 5 cases como tabs navegáveis), cards de projeto
  como painéis com cabeçalho de arquivo, skills como lista de extensões,
  princípios numerados, nós da timeline em estilo source control, canvas de
  fundo com grid e ruído em CSS puro e motion restrito a 120–220ms.
  Arquitetura, conteúdo, rotas, SEO, SSR/pre-render e acessibilidade
  intocados; nenhuma dependência nova.

### Changed

- Release 0.9 (ADR-0016) — **acento sem hue**: a ênfase deixou de ser cor e
  virou **tinta** (brilho, não hue — clara no escuro, escura no claro); cor
  cromática só em `success`/`danger`. **Canvas** grafite-quente `#121110` →
  **cinza-ardósia frio** `#1A1C20` (família de editor, temperatura própria; tema
  claro segue papel-quente — assimetria assumida). **Removidos** (mesmo princípio
  do ADR-0015, aplicado à pele): os controles de janela decorativos da title bar
  e a faixa de "fatos técnicos" da status bar — cromo fabricado / voz de
  *read-out*. Assets de marca regenerados no novo tom. Escala tipográfica com
  peso do `display` a 500 e tracking relaxado para a serifa.
- Release 0.8 — **removidos** (ADR-0015, "sem cenografia"): o canvas decorativo
  de fundo (grid + ruído, `body::before`) e o `Minimap` decorativo — textura e
  widget sem função, "tells" de screenshot/IA; a estrutura passa a vir das
  réguas reais do cromo e a direita do editor vira espaço em branco honesto de
  documento. `SectionHeading` (padrão de abertura de marketing) foi retirado em
  favor do `DocHeader`. Os variants preenchidos do `Button` saíram do conteúdo
  (agora links de workspace); o `Button` permanece só para chrome.
- Release 0.7: `framer-motion` saiu da entrada — `Reveal`, `MobileMenu` e o
  Terminal passaram a usar CSS + IntersectionObserver + `matchMedia`. O JS
  inicial caiu de ~110 KB para ~73 KB gzip, abrindo margem para o cromo de IDE
  e o mobile sem tocar no limite do doc 06 §7. As superfícies pesadas (Search,
  Source Control, Command Palette, painel inferior) são lazy.
- Medição do orçamento de JS (`scripts/check-budgets.mjs`): "JS inicial"
  passou a somar o chunk de entrada e os chunks estáticos com
  `modulepreload` no `index.html` — o Rollup divide a entrada quando módulos
  são compartilhados com rotas lazy e o script classificava o pedaço
  estático como lazy. Limites do doc 06 §7 inalterados (110 KB).

### Fixed

- O botão "Contato" do Hero abria nova aba: a âncora interna `#contato`
  passava pela prop `href` do `Button` (contrato de URL externa,
  `target="_blank"`); agora navega com `to="/#contato"` via React Router,
  como o restante da navegação interna.
- Contraste AA do texto terciário: o token `text-3` passou de `#71717A`
  (4,05:1 sobre o fundo — o doc 04 declarava 4,6:1 por erro de cálculo) para
  `#898992` (≥ 4,9:1 sobre todos os fundos), reprovação real de
  `color-contrast` apontada pelo Lighthouse em produção (adendo 2 da revisão
  da Release 0.5).
- Deploy na Vercel: `vercel.json` passou a fixar `framework`, `buildCommand`
  e `outputDirectory` — o preset da plataforma executava apenas `vite build`,
  publicando o SPA sem o HTML pré-renderizado, sem `sitemap.xml`/`robots.txt`
  e sem a `404.html` (adendo na revisão da Release 0.5).

### Added

- Release 0.5: Production Readiness — pre-render das rotas para HTML
  estático com `react-dom/server` sobre o entry SSR do Vite (ADR-0010),
  sistema de SEO orientado a coleções de conteúdo com host canônico em
  constante única (`SITE_URL`), head completo por rota (canonical, Open
  Graph, JSON-LD Person/WebSite/BreadcrumbList), sitemap.xml e robots.txt
  gerados no build da mesma lista de rotas, 404 pré-renderizada com
  noindex, contratos automáticos de SEO no CI, varredura axe-core por tipo
  de página (dois achados de hierarquia de headings corrigidos), Lighthouse
  CI no workflow e `vercel.json` para o deploy.
- Release 0.4: Engineering Case Studies — os 4 estudos de caso restantes
  completos no padrão do FastPass (API de Reconhecimento Facial, Carrinho
  Inteligente, EduPass e Reviva, doc 05 §3.2–3.5), narrativa de evolução da
  API Facial (EduPass → confirmação de presença → microserviço do FastPass)
  acrescentada ao doc 05 antes do código, diagramas de arquitetura da API
  Facial e do Carrinho Inteligente em SVG inline (doc 11) e testes de
  contrato da história completa dos 5 cases.
- Release 0.3.1: sistema de continuidade entre sessões — meta-documento
  `docs/02-session-handoff.md` (reescrito a cada release), política de
  contexto (toda sessão lê apenas os meta-documentos 00 → 01 → 02; o
  restante sob demanda) e fluxo oficial de release em 10 passos no
  `docs/00-context.md`, e `CLAUDE.md` na raiz aplicando a política
  automaticamente às sessões do Claude Code.
- Release 0.3: estudo de caso completo do FastPass — template definitivo de
  case em `src/case/` (seções canônicas, índice lateral com scroll-spy,
  navegação anterior/próximo), diagrama de arquitetura em SVG inline no
  padrão do doc 11, conteúdo integral do doc 05 §3.1 (com integração,
  segurança e evolução planejada), conteúdo dividido em um arquivo por case
  (`src/content/projects/`) e meta-documentos `docs/00-context.md` e
  `docs/01-project-state.md`.
- Sprint 2: home completa nas 7 seções aprovadas (Hero, Featured Work,
  Engineering, Data, Timeline, About, Contact), página `/projetos` com os 5
  estudos de caso, template inicial de case com navegação anterior/próximo,
  scroll-spy na navegação, gestão de scroll e foco por rota e testes de
  contrato dos projetos.
- Pré-S2: Accessibility Foundation (doc 13), revisões de sprint em
  `docs/reviews/` e orçamentos de performance verificados automaticamente na
  CI (`scripts/check-budgets.mjs`).
- Sprint 1.5: fundação de marca e experiência — Motion Guidelines (doc 08),
  SEO Foundation (doc 09), Brand Assets (doc 10) com wordmark
  `franciscopedro.dev` (ADR-0009) e geração de assets por código (favicon,
  app icons, OG image), padrão de diagramas e mockups (doc 11), sistema de
  imagens (doc 12), orçamentos de performance por recurso (doc 06 §7) e
  decisão de analytics: Umami na v2 (ADR-0008).
- Sprint 1: fundação do projeto — Vite + React 18 + TypeScript strict +
  Tailwind 4 com todos os tokens do design system, tipografia self-hosted
  (Inter Variable + JetBrains Mono), layout base (NavBar com menu mobile
  acessível, Footer, SkipLink, Section/Container), Button, modelo de conteúdo
  tipado com teste de contrato, variants de motion centralizados e CI
  (lint, typecheck, test, build).
- Sprint 0: documentação completa do produto (`docs/00`–`07`), Architecture
  Decision Records (`docs/adr/0001`–`0007`) e governança do repositório.
