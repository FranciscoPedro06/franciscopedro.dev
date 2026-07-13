# 01 — Estado do projeto

> Fotografia atual do produto, atualizada no encerramento de cada Release.
> Meta-documento (ver [00-context.md](00-context.md)); a fonte normativa do
> plano é o [07-roadmap.md](07-roadmap.md).

**Última atualização:** 2026-07-13 · Release 0.6

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
| Release 0.6 | Design "IDE" (100% visual): moldura de IDE (title bar, ActivityBar, Explorer, status bar), EditorPane com tabs e breadcrumb (Hero e cases como arquivos abertos), cards → painéis, skills como extensões, canvas com grid + ruído em CSS puro, motion 120–220ms — arquitetura, conteúdo, rotas, SEO e a11y intocados | [reviews/release-0.6-review.md](reviews/release-0.6-review.md) |

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
- **Design "IDE" (Release 0.6)**: a página inteira é uma moldura de
  aplicação — title bar, rail de atalhos (lg+), Explorer em árvore (xl+),
  status bar fixa; Hero e cases apresentados como arquivos abertos num
  editor (tabs + breadcrumb), cards como painéis, skills como extensões.
  100% visual: componentes, conteúdo, rotas, SEO, SSR e a11y preservados.
- Gate permanente verde: testes 44/44 (contratos de SEO, smoke do
  pre-render e axe-core inclusos); JS inicial 104,0 KB / 110 KB (entrada +
  chunk estático `modulepreload` — medição corrigida na 0.6); chunk do
  case 2,8 KB / 35 KB; CSS 19,9 KB / 25 KB; Lighthouse CI no workflow
  (a11y/BP/SEO ≥ 0,95; performance ≥ 0,90 como tripwire — critério ≥ 95 do
  M7 se mede no preview da Vercel).

## Pendências que bloqueiam a publicação (não o desenvolvimento)

Material do Francisco (doc 05 §7): foto profissional, e-mail público, URL do
LinkedIn, currículo PT/EN (PDF), 2–3 resultados reais do MIS, screenshots dos
5 projetos, confirmações factuais (FastPass é TCC? datas EduPass/MIS).
Pré-lançamento no GitHub (doc 07 §3): rotacionar chave Supabase, fork oficial
dos repos FastPass, READMEs profissionais.

## Próxima release (proposta)

**Release 0.7 — Pré-lançamento / v1.0** (S5 do doc 07; era a proposta de
0.6 antes de o Francisco definir a 0.6 como Release de Design): roadmap
GitHub pré-lançamento (doc 07 §3: rotação da chave Supabase, forks
oficiais, READMEs), medição do critério ≥ 95 do M7 no deploy da Vercel e
integração do material do Francisco conforme chegar. Escopo exato se
valida no planejamento.
