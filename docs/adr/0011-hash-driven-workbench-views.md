# ADR-0011 — Workbench de views comutadas por hash

**Status:** Aceito (decisão do Francisco, Release 0.6.1)
**Data:** 2026-07-13

## Contexto

A Release 0.6 aplicou estética de IDE, mas manteve o paradigma de landing
page: uma home longa percorrida por scroll. O objetivo revisado exige que o
site se comporte como uma aplicação — viewport inteira, área principal que
muda com a navegação, scroll apenas no painel ativo — **sem** alterar
rotas, SEO, pre-render (ADR-0002/0010), acessibilidade nem os contratos de
teste aprovados.

## Decisão

1. **A home é um gestor de views.** As 7 seções aprovadas (doc 03 §4) viram
   views comutadas pelo **hash** (`/#sobre`, `/#projetos`…), que já era a
   URL de cada seção. O hash não é rota: React Router, `routes.ts`,
   pre-render e sitemap não mudam.
2. **Todas as views permanecem montadas no DOM**; só a ativa é exibida — as
   demais somem por CSS (`hidden`). O HTML pré-renderizado continua contendo
   a página completa (SEO e smoke SSR intactos) e a ordem do DOM continua
   sendo a ordem aprovada (contrato da Home preservado).
3. **A view ativa deriva exclusivamente da URL** (ADR-0004 — sem estado
   global): `useHomeView()` lê o hash; durante SSR/hidratação devolve
   "overview" (o servidor não vê hash) e assume o hash real no re-render
   pós-hidratação via `useSyncExternalStore` — sem mismatch.
4. **O único scroll da aplicação é o do painel do editor**
   (`#editor-scroll`); âncoras internas de case continuam funcionando por
   `scrollIntoView` dentro do painel, com foco gerenciado (doc 13 §2).

## Alternativas consideradas

- **Views como rotas (`/sobre`…):** quebraria a invariante "não alterar
  rotas", multiplicaria páginas no sitemap e mudaria o contrato de SEO.
- **Desmontar as views inativas:** quebraria o contrato da ordem das seções,
  removeria conteúdo do HTML pré-renderizado (custo de SEO) e reintroduziria
  o risco de mismatch de hidratação.
- **Manter a página longa com chrome de IDE (Release 0.6):** rejeitada pelo
  Francisco — continua parecendo site.

## Consequências

- O conteúdo das views inativas fica no HTML como `display: none` até o
  usuário navegar — aceitável: o conteúdo indexável primário (cases) vive em
  rotas próprias totalmente visíveis.
- Toda a navegação da home precisa listar todas as views (não há mais
  descoberta por scroll) — `site.nav` passou a ter 6 itens (doc 03 §2).
- Views novas na v2 (`/escrita`, `/resume`) são rotas, não views — este ADR
  só governa as seções da home.
