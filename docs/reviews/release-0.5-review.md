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

## Adendo (2026-07-12) — correção do build no deploy real

O primeiro deploy de produção (`https://franciscopedro-dev.vercel.app`,
commit `ae7ef59`) servia apenas o output do SPA: `/` sem head pré-renderizado
(placeholder `seo:start` do dev server, sem canonical/OG/JSON-LD) e com o
`#root` vazio; `/projetos`, os 5 cases, `sitemap.xml`, `robots.txt` e
qualquer rota inexistente respondiam com o `NOT_FOUND` da própria plataforma.
**Causa:** o `vercel.json` da release não fixava o comando de build, e o
preset Vite da Vercel executou só `vite build` — sem `tsc` e sem o passo
`npm run prerender`. **Correção:** `framework`, `buildCommand`
(`npm run build`) e `outputDirectory` (`dist`) fixados no `vercel.json`
(doc 06 §11) — o build da plataforma passa a ser o mesmo do repositório e da
CI. `SITE_URL` confirmada no endereço permanente do projeto (a linha única de
`src/lib/seo.ts`, sem alteração).

## Adendo 2 (2026-07-12) — verificação em produção e contraste AA

Após a correção do build, o deploy foi auditado rota a rota: as 7 páginas
respondem 200 com HTML pré-renderizado (head completo, conteúdo real no
`#root`, `h1` correto), canonical/OG/JSON-LD conferem com `SITE_URL`,
`sitemap.xml` traz as 7 URLs, `robots.txt` aponta o sitemap, rota inexistente
serve a `404.html` com `noindex` e barra final redireciona 308.

Lighthouse CI (mediana de 3 runs × 3 URLs) contra a produção: best-practices
1,0 e SEO 1,0 nas 3 URLs (o audit `robots-txt` falhou de forma intermitente
em 3 de 9 runs — o arquivo foi verificado válido; artefato de fetch da
medição local). **Acessibilidade 0,95 com falha real de `color-contrast`**:
`text-3` (`#71717A`) media 4,05:1 sobre `bg` — o doc 04 §1.1 declarava
4,6:1 (cálculo incorreto), violando o piso AA do doc 13 §5/RNF02. O gate axe
não detecta contraste (jsdom não renderiza pixels — exclusão registrada em
`src/a11y.test.tsx`). **Correção**: token `text-3 = #898992` (5,64:1 sobre
`bg`, 5,36:1 sobre `surface`, 4,92:1 sobre `surface-2` — AA em qualquer
tamanho), doc 04 corrigido antes do código.

Performance em produção medida desta máquina é ruidosa (home: 0,98/0,65/0,88
— o outlier de 0,65 é rede local; TBT 0 ms e CLS ≤ 0,008 em todos os runs):
a pendência do critério M7 (≥ 95) segue aberta e deve ser medida em ambiente
estável (PageSpeed Insights ou runner de CI).
