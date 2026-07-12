# 01 — Estado do projeto

> Fotografia atual do produto, atualizada no encerramento de cada Release.
> Meta-documento (ver [00-context.md](00-context.md)); a fonte normativa do
> plano é o [07-roadmap.md](07-roadmap.md).

**Última atualização:** 2026-07-12 · Release 0.4

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

## Onde o produto está

- Home navegável nas 7 seções aprovadas; índice `/projetos` com os 5 cases.
- **Os 5 estudos de caso estão completos** — cada um conta a história de
  engenharia (problema → decisões → desafios → resultados → aprendizados),
  com índice lateral e navegação entre cases. A API Facial traz a narrativa
  de evolução (EduPass → confirmação de presença → microserviço do FastPass)
  e a seção de Pesquisa; três cases têm diagrama de arquitetura (FastPass,
  API Facial, Carrinho) — EduPass e Reviva ficam sem, por decisão (doc 11 §1).
- Gate permanente verde: testes 26/26; JS entrada 100,3 KB / 110 KB;
  chunk do case 2,8 KB / 35 KB; CSS 19,3 KB / 25 KB.

## Pendências que bloqueiam a publicação (não o desenvolvimento)

Material do Francisco (doc 05 §7): foto profissional, e-mail público, URL do
LinkedIn, currículo PT/EN (PDF), 2–3 resultados reais do MIS, screenshots dos
5 projetos, confirmações factuais (FastPass é TCC? datas EduPass/MIS).
Pré-lançamento no GitHub (doc 07 §3): rotacionar chave Supabase, fork oficial
dos repos FastPass, READMEs profissionais.

## Próxima release (proposta)

**Release 0.5 — Production Readiness** (definida pelo Francisco no
planejamento da 0.4): SEO/pre-render + 404 noindex (M7), otimizações finais
e refinamentos de publicação. Escopo exato se valida no planejamento.
