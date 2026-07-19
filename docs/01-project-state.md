# 01 — Estado do projeto

> Fotografia atual do produto, atualizada no encerramento de cada Release.
> Meta-documento (ver [00-context.md](00-context.md)); a fonte normativa do
> plano é o [07-roadmap.md](07-roadmap.md).

**Última atualização:** 2026-07-19 · Release 0.9.2

---

## Releases concluídas

| Release | Escopo | Registro |
|---|---|---|
| Sprint 0 | Auditoria + documentação (docs 00–07, ADRs 0001–0007) | aprovado na validação dos docs |
| Sprint 1 | Fundação: Vite + React 18 + TS strict + Tailwind 4, tokens, layout base, content model tipado, CI | [reviews/sprint-01-review.md](reviews/sprint-01-review.md) |
| Sprint 1.5 | Brand & experience: docs 08–12, wordmark `franciscopedro.dev` (ADR-0009), assets por código, orçamentos por recurso, ADR-0008 | [reviews/sprint-1.5-review.md](reviews/sprint-1.5-review.md) |
| Sprint 2 | Home completa (7 seções), `/projetos`, case mínimo, scroll-spy, doc 13, orçamentos na CI | [reviews/sprint-02-review.md](reviews/sprint-02-review.md) — validado pelo Francisco |
| Release 0.3 | FastPass Case Study: template completo de case (`src/case/`), conteúdo integral do FastPass, diagrama de arquitetura, índice lateral com scroll-spy | [reviews/release-0.3-review.md](reviews/release-0.3-review.md) |
| Release 0.3.1 | Project Continuity: meta-documento `02-session-handoff.md`, política de contexto e fluxo oficial de release no `00-context.md`, `CLAUDE.md` na raiz | [reviews/release-0.3.1-review.md](reviews/release-0.3.1-review.md) |
| Release 0.4 | Engineering Case Studies: os 4 cases restantes completos (doc 05 §3.2–3.5), narrativa de evolução da API Facial, diagramas da API Facial e do Carrinho | [reviews/release-0.4-review.md](reviews/release-0.4-review.md) |
| Release 0.5 | Production Readiness (M7): pre-render com react-dom/server (ADR-0010), SEO por coleções com `SITE_URL` única, sitemap/robots no build, 404 noindex, contratos de SEO, axe-core e Lighthouse CI, `vercel.json` | [reviews/release-0.5-review.md](reviews/release-0.5-review.md) |
| Release 0.6 | Design "IDE" (100% visual): moldura de IDE (title bar, ActivityBar, Explorer, status bar), EditorPane com tabs e breadcrumb, cards → painéis, canvas grid + ruído, motion 120–220ms — objetivo revisado pela 0.6.1 | [reviews/release-0.6-review.md](reviews/release-0.6-review.md) |
| Release 0.6.1 | Workbench: fim da página longa — a aplicação ocupa a viewport, as 7 seções viram views comutadas por hash (ADR-0011), EditorTabs derivadas da URL com fechar funcional, explorer real (`src/` + `projetos/` com extensões por stack), cards → linhas de arquivo, paleta grafite-quente + acento âmbar (assets regenerados), espaçamento denso — SEO, SSR, rotas, conteúdo e os 44 testes intactos | [reviews/release-0.6.1-review.md](reviews/release-0.6.1-review.md) |
| Release 0.7 | "É uma IDE no navegador" (6 marcos): theming light+dark real (ADR-0013) + estado do shell client-persistido (ADR-0012); title/activity/status bars de software; explorer recursivo com colapso/resize persistidos, Search e Source Control (commits reais) como painéis lazy; editor multi-tab + breadcrumb + minimap; Command Palette e painel inferior (Terminal transcript) lazy; adaptação mobile (drawer); framer-motion removido da entrada (JS 110→73,5 KB) — SEO, SSR, rotas, conteúdo e os 44 testes originais intactos | [reviews/release-0.7-review.md](reviews/release-0.7-review.md) |
| Release 0.8 | "Redesign / Maturidade de produto" (5 marcos): fecha a dissonância moldura×conteúdo a partir de uma auditoria de design. **Conteúdo como documento** (ADR-0014): `DocHeader` no lugar do `SectionHeading`, `overview` como cabeçalho de arquivo (sem hero centralizado), ações como links de workspace. **Sem cenografia** (ADR-0015): canvas e minimap decorativos removidos. Linguagem visual contida (teto 40 px, corpo 15 px, `surface-3`, elevação só flutuante); de-carding de Engenharia/Dados; status bar com branch+commit reais e gatilho command-first — SSR/SEO/rotas e os 56 testes intactos | [reviews/release-0.8-review.md](reviews/release-0.8-review.md) |
| Release 0.9 | "Identidade visual editorial-técnica" (ADR-0016): mantém a estrutura de IDE e troca a textura, que havia pousado no centroide "premium/dark de IA". Três vozes tipográficas (Newsreader serifa nos títulos, IBM Plex Sans no corpo/cromo ex-Inter, JetBrains Mono no código); **acento sem hue** (ênfase por tinta; cromático só em success/danger); canvas grafite-quente → cinza-ardósia frio; cromo fabricado removido (controles de janela + faixa de "fatos"); **LinkedIn** integrado + ícones de marca SVG monocromáticos (GitHub/LinkedIn). Gate verde, 56 testes intactos — **validado pelo Francisco em navegador** | [reviews/release-0.9-review.md](reviews/release-0.9-review.md) |
| Release 0.9.1 | "Micro-interações funcionais" (4 marcos + fix): interatividade como **feedback de ferramenta**, não decoração — match highlight na Command Palette (tinta + peso, por tecla), chip de build **derivado** do registro de rotas na status bar (fim do `Build · Tests ✓` fixo), setas deslizando em todos os links-seta + paridade de teclado no fechar-tab, Terminal digitando comandos tecla a tecla (exceção registrada no doc 08 §3). Suíte estabilizada (timeouts folgados; o flake era mais amplo que o SearchPanel). Gate verde 58/58 | [reviews/release-0.9.1-review.md](reviews/release-0.9.1-review.md) |
| Release 0.9.2 | "Craft do workbench" (3 marcos): a beleza aprofunda a ficção da IDE — **FileGlyph** (badge tipográfico por tipo de arquivo, `currentColor`) no Explorer/tabs/linhas de projeto, guias de indentação + pasta com estado na árvore, **stagger de 60ms** (permitido no doc 08 §3, inédito) nas três listas curtas, pop do ícone de tema, fade de tab nova e press `scale` estendido ao cromo. Cor por tipo recusada (decorativa). Gate verde 58/58 | [reviews/release-0.9.2-review.md](reviews/release-0.9.2-review.md) |

## Onde o produto está

- Home navegável nas 7 seções aprovadas; índice `/projetos` com os 5 cases.
- **Os 5 estudos de caso estão completos** — cada um conta a história de
  engenharia (problema → decisões → desafios → resultados → aprendizados),
  com índice lateral e navegação entre cases. A API Facial traz a narrativa
  de evolução (EduPass → confirmação de presença → microserviço do FastPass)
  e a seção de Pesquisa; três cases têm diagrama de arquitetura (FastPass,
  API Facial, Carrinho) — EduPass e Reviva ficam sem, por decisão (doc 11 §1).
- **Production-ready (M7 implementado)**: build gera 8 HTMLs pré-renderizados
  (ADR-0010) com head completo por rota (canonical, OG, JSON-LD), sitemap.xml,
  robots.txt e 404 noindex — tudo derivado da lista única de rotas em
  coleções (`src/content/routes.ts`). Host canônico numa constante
  (`SITE_URL`), **confirmada** no endereço permanente do projeto Vercel:
  `https://franciscopedro-dev.vercel.app`. O build da plataforma é fixado
  no `vercel.json` (adendo da revisão 0.5): o primeiro deploy publicou só o
  SPA porque o preset da Vercel rodava `vite build` sem o pre-render.
- **IDE completa (Release 0.7)**: sobre o workbench da 0.6.1, a experiência
  virou uma IDE de verdade — theming light+dark (ADR-0013), primeiro estado
  de cliente do projeto restrito a cromo (ADR-0012), title/activity/status
  bars de software, explorer recursivo (colapso/resize persistidos), Search
  e Source Control (commits reais) como painéis lazy, editor multi-tab +
  breadcrumb + minimap, Command Palette (Ctrl+Shift+P) e painel inferior
  (Terminal transcript) lazy, e adaptação mobile (rail + drawer). Navegação,
  conteúdo e SEO seguem derivados da URL/hash (ADR-0004/0011); o cromo de UI
  é o único estado persistido. Detalhe fundador: **framer-motion saiu da
  entrada** (Reveal/menu/terminal → CSS), abrindo a folga de orçamento.
- **Redesign da Release 0.8 (maturidade de produto)**: sobre a IDE da 0.7, o
  conteúdo deixou de ser landing e virou **documento** (ADR-0014) — cada view é
  um arquivo aberto no editor, com cabeçalho de comentário mono, prosa densa
  alinhada à esquerda e ações como links de workspace; a identidade (`overview`)
  é o cabeçalho do arquivo, não um hero centralizado. A **cenografia** saiu
  (ADR-0015: canvas e minimap decorativos). Linguagem visual contida (teto
  40 px, corpo 15 px, `surface-3`, elevação só flutuante), de-carding de
  Engenharia/Dados e sinais reais de workspace (status bar com branch + último
  commit do git-log; gatilho command-first). Aguarda validação em navegador.
- **Identidade visual própria (Release 0.9, ADR-0016)**: sobre a estrutura de
  IDE (autoral), a **textura** saiu do centroide "premium/dark de IA". Três vozes
  — Newsreader (serifa) nos títulos, IBM Plex Sans no corpo/cromo (ex-Inter),
  JetBrains Mono no código; **acento sem hue** (ênfase por tinta, cor só em
  success/danger); canvas grafite-quente → **cinza-ardósia frio**; cromo
  fabricado removido (controles de janela + faixa de "fatos"). **LinkedIn**
  integrado e **ícones de marca SVG** monocromáticos (GitHub/LinkedIn). Foi a
  primeira release **validada pelo Francisco em navegador** antes do commit.
- **Micro-interações funcionais (Release 0.9.1)**: a interatividade subiu sem
  decoração — highlight de match na paleta, chip de build derivado e clicável
  na status bar, setas que deslizam em todos os links-seta, terminal que digita
  os comandos. Nenhum timing novo (vocabulário do doc 08), nenhuma cor nova.
- **Craft do workbench (Release 0.9.2)**: a ficção da IDE ganhou o detalhe que
  uma IDE real tem — glifos tipográficos por tipo de arquivo (`FileGlyph`),
  guias de indentação e pasta com estado no Explorer, cascata de 60ms nas
  listas curtas, pop no toggle de tema, fade em tab nova e press no cromo.
- Gate permanente verde: testes **58/58** (estabilizados — timeouts folgados
  para axe + chunks lazy; o "flake do SearchPanel" era mais amplo e variável);
  **JS inicial 75,6 KB / 110 KB**;
  maior chunk lazy 3,0 KB / 35 KB; **CSS 21,3 KB / 25 KB**; Lighthouse CI no workflow (a11y/BP/SEO ≥ 0,95;
  performance ≥ 0,90 como tripwire — critério ≥ 95 do M7 se mede no preview da
  Vercel).

## Pendências que bloqueiam a publicação (não o desenvolvimento)

Material do Francisco (doc 05 §7): foto profissional, e-mail público,
currículo PT/EN (PDF), 2–3 resultados reais do MIS, screenshots dos
5 projetos, confirmações factuais (FastPass é TCC? datas EduPass/MIS). — a
**URL do LinkedIn foi integrada na 0.9**.
Pré-lançamento no GitHub (doc 07 §3): rotacionar chave Supabase, fork oficial
dos repos FastPass, READMEs profissionais.

## Próxima release (proposta)

Segue pendente a **validação em navegador das 0.6–0.8 e agora da 0.9.1**
(desktop/tablet/mobile, tema light/dark, checklist de a11y) — mudaram a
experiência e só passaram pelo gate automatizado (a 0.9 foi a única com
conferência visual direta). Da 0.9.1, os dials de sensação (ritmo do terminal,
peso do highlight) são decisão do Francisco.

Depois, **Pré-lançamento / v1.0** (doc 07 §3, deslocada — a numeração 0.9 foi
usada pela identidade): roadmap GitHub (rotação da chave Supabase, forks
oficiais, READMEs), medição do critério ≥ 95 do M7 no deploy da Vercel e
integração do material restante do Francisco (foto, e-mail, CV PT/EN, resultados
do MIS, screenshots) conforme chegar. Escopo exato se valida no planejamento.
