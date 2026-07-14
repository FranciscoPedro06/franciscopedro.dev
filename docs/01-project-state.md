# 01 — Estado do projeto

> Fotografia atual do produto, atualizada no encerramento de cada Release.
> Meta-documento (ver [00-context.md](00-context.md)); a fonte normativa do
> plano é o [07-roadmap.md](07-roadmap.md).

**Última atualização:** 2026-07-14 · Release 0.7

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
- Gate permanente verde: testes **56/56** (os 44 originais intactos + 12
  novos de tema/shell/rail/explorer/search/tabs/palette/painel); **JS
  inicial 73,5 KB / 110 KB** (queda de ~36 KB com a saída do framer);
  maior chunk lazy 3,0 KB / 35 KB; **CSS 21,3 KB / 25 KB**; Lighthouse CI no
  workflow (a11y/BP/SEO ≥ 0,95; performance ≥ 0,90 como tripwire — critério
  ≥ 95 do M7 se mede no preview da Vercel).

## Pendências que bloqueiam a publicação (não o desenvolvimento)

Material do Francisco (doc 05 §7): foto profissional, e-mail público, URL do
LinkedIn, currículo PT/EN (PDF), 2–3 resultados reais do MIS, screenshots dos
5 projetos, confirmações factuais (FastPass é TCC? datas EduPass/MIS).
Pré-lançamento no GitHub (doc 07 §3): rotacionar chave Supabase, fork oficial
dos repos FastPass, READMEs profissionais.

## Próxima release (em curso)

**Release 0.8 — Redesign / Maturidade de produto.** Direção aprovada pelo
Francisco; planejamento em
[reviews/release-0.8-design-review.md](reviews/release-0.8-design-review.md).
Nasce de uma auditoria de design da 0.7 que expôs a dissonância entre a moldura
de IDE e um conteúdo ainda com linguagem de landing page. Eixo: **conteúdo como
documento** (ADR-0014) e **sem cenografia** (ADR-0015). Cinco marcos: M1 tokens
(linguagem visual), M2 modelo conteúdo-como-documento, M3 documentos de
conteúdo, M4 workspace vivo + descoberta, M5 refino transversal. Preserva o
cromo da 0.7 (ActivityBar/Explorer/EditorTabs/painéis), SSR/SEO e os 56 testes.
O **pré-lançamento** antes proposto para a 0.8 (roadmap GitHub, material do
Francisco, medição M7 ≥ 95) deslocou-se para a **0.9/v1.0** (doc 07 §7). A
validação da 0.7 em navegador real segue pendente e é a base assumida.
