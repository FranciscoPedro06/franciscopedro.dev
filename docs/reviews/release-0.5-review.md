# Revisão técnica — Release 0.5 (Production Readiness)

**Data:** 2026-07-12 · **Commit de marco:** (este commit) · **Veredito:** Aprovado internamente; aguarda validação do Francisco

## Objetivo e escopo

Implementar o M7 (pre-render + SEO por rota + 404 noindex) conforme docs 09 e
06 §6, com sitemap/robots gerados no build, contratos automáticos de SEO,
Lighthouse CI, varredura automatizada de acessibilidade e preparação para o
deploy na Vercel. Ajustes aprovados no planejamento: host canônico como
constante única `SITE_URL` (sem placeholder) e sistema de SEO orientado a
coleções de conteúdo, escalável para a v2.

## Entregue

- **ADR-0010 — pre-render com `react-dom/server`**: `scripts/prerender.mjs`
  orquestra o build cliente + bundle SSR (`src/entry-server.tsx`,
  `vite build --ssr`); `renderToPipeableStream` + `onAllReady` esperam os
  chunks de `React.lazy` (o `renderToString` emitiria o fallback vazio do
  Suspense nas rotas secundárias). Saída: 8 HTMLs (7 rotas + `404.html`) com
  conteúdo real no `#root` e hidratação via `hydrateRoot` (dev server segue
  com `createRoot` — zero impacto, critério do doc 06 §6).
- **Sistema de SEO por coleções** (doc 09 §1): `src/lib/seo.ts` é o sistema
  (tipos `RouteDef`/`RouteCollection`, `SITE_URL`, canonical, geradores de
  head/sitemap/robots — funções puras testáveis); `src/content/routes.ts`
  registra as coleções (`pages`, `projects`). Coleção nova na v2 = registrar
  a fonte; pre-render, sitemap, canonical e contratos a cobrem sem mudança.
- **Head completo por rota**: title, description, canonical autorreferente,
  OG completo (`article` nos cases; image default do doc 10 §4), Twitter
  Card, JSON-LD (`Person` + `WebSite` na home, `BreadcrumbList` nos cases),
  gravado no HTML estático entre marcadores `seo:start/seo:end` do template.
- **sitemap.xml + robots.txt** derivados da mesma lista de rotas do
  pre-render (fonte única, doc 09 §7); `404.html` com `noindex` e título da
  fonte única (`notFoundRoute` — `NotFound` e `CasePage` a consomem).
- **Contratos de SEO no CI** (doc 09 §1): limites de título/description,
  canonical sem barra final, rota por projeto, caminhos únicos, sitemap sem
  404, robots com `Sitemap:`.
- **Acessibilidade automatizada**: axe-core (dev-dependency) nos 4 tipos de
  página; zero violações é contrato. **Dois achados reais corrigidos**:
  `/projetos` não tinha `h1` (`SectionHeading` ganhou a prop `as`) e os cards
  saltavam `h1→h3` no índice (`ProjectCard` ganhou `headingAs`; na home
  seguem `h3` sob as seções `h2`).
- **Lighthouse CI**: `lighthouserc.json` (home, índice e case do FastPass,
  mediana de 3 runs contra o `dist` pré-renderizado) + passo no workflow.
- **Vercel**: `vercel.json` com `trailingSlash: false` e cache imutável para
  `/assets/*`; sem rewrite de SPA — só rotas reais têm HTML, `404.html`
  cobre o resto (doc 09 §6). Smoke test do pre-render no Vitest (ambiente
  node) prova o conteúdo real das rotas lazy.

## Decisões de implementação (interpretações registradas)

1. **`SITE_URL = https://franciscopedro-dev.vercel.app`** (ajuste 1 do
   Francisco: sem placeholders): previsão do endereço de produção da Vercel
   para o projeto; **confirmar/ajustar essa única linha ao criar o projeto na
   plataforma** e, depois, ao ativar `https://franciscopedro.dev`.
2. **Exceção de limite no título da home** (63 > 60): o copy do doc 05 §6 tem
   precedência (documento de menor número); registrada no doc 09 §1 e no
   teste de contrato.
3. **`/resume` fora do sitemap** até a rota existir (ADR-0006) — a lista
   única garante entrada automática quando nascer.
4. **Asserção de performance do LHCI em 0,90 (tripwire)**, decidida com o
   Francisco durante a release: o servidor estático do LHCI mede 0,94 no case
   (FCP 2,3s por contenção de banda simulada em mobile/slow 4G; TBT 0ms,
   CLS 0,001) e o critério oficial do M7 (≥ 95, doc 07) se mede no preview da
   Vercel (brotli + HTTP/2). Acessibilidade, best-practices e SEO seguem
   ≥ 0,95 como erro.
5. **Stubs de DOM do setup de teste condicionados a `window`** para o smoke
   test SSR rodar em ambiente node.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **44/44** (+18: 10 contratos
  de SEO, 4 smoke SSR, 4 axe) · build com pre-render ok (8 páginas +
  sitemap + robots).
- Orçamentos (CI): JS entrada **100,4 KB / 110 KB** · chunk do case 2,7 KB /
  35 KB · CSS 19,3 KB / 25 KB — pre-render não adiciona JS ao cliente.
- Lighthouse local (Edge/Chromium, mediana de 3): acessibilidade,
  best-practices e SEO ≥ 0,95 nas 3 URLs; performance 0,94–0,95 —
  asserções verdes.
- HTML estático inspecionado: head por rota, canonical, BreadcrumbList,
  conteúdo integral no `#root`, `noindex` no 404, sitemap com as 7 URLs.

## Pendências geradas

- **Confirmar `SITE_URL`** ao criar o projeto na Vercel; ativar o domínio
  definitivo é a mesma linha. Redirects `www`→apex/`http`→`https` são
  configuração da plataforma no deploy real.
- **Medir o critério do M7 (≥ 95) no preview da Vercel** quando o deploy
  existir — fecha a decisão 4.
- Checklist manual de acessibilidade (doc 06 §9, NVDA/Tab/zoom 200%) das
  Releases 0.3–0.5 segue com o Francisco; bloqueia publicação, não release.
- OG image específica por case entra com os screenshots (`[PENDENTE]`).
