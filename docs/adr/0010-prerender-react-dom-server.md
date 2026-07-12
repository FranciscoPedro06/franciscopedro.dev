# ADR-0010 — Pre-render com react-dom/server sobre o entry SSR do Vite

**Status:** Aceito
**Data:** 2026-07-12

## Contexto

O ADR-0002 fixou SPA com pre-render das rotas no build; o doc 06 §6 deixou o
mecanismo em aberto (`vite-prerender-plugin` ou script próprio com
`puppeteer`), com o critério "zero impacto no dev server". A escolha precisa
resolver `React.lazy` (as rotas secundárias vivem em chunks próprios) e
injetar os metadados por rota do doc 09.

## Decisão

Script próprio (`scripts/prerender.mjs`) orquestrando dois artefatos do
próprio Vite: o build cliente e um bundle SSR (`src/entry-server.tsx`,
`vite build --ssr`). O entry SSR renderiza cada rota com
`renderToPipeableStream` do `react-dom/server` (que espera `React.lazy`/
`Suspense` resolver — `renderToString` emitiria o fallback) sob
`StaticRouter`, e reexporta a lista única de rotas e os geradores de
head/sitemap/robots de `src/lib/seo.ts`. O cliente usa `hydrateRoot` quando o
HTML pré-renderizado existe e `createRoot` no dev server.

## Alternativas consideradas

- *puppeteer:* renderização por navegador headless — pesado, lento e instável
  em CI para um site cujo conteúdo é 100% determinístico em código.
- *vite-prerender-plugin:* dependência de terceiro para um problema que
  `react-dom/server` (já instalado) resolve com um script auditável.

## Consequências

Um passo de build a mais; nenhum impacto no dev server; nenhuma dependência
nova de runtime. Componentes só podem tocar `window`/`document` em efeitos ou
handlers — o build SSR quebra ruidosamente se a regra for violada. Rotas,
sitemap, canonical e testes de contrato derivam da mesma fonte
(`src/content/routes.ts`), organizada em coleções de conteúdo: página nova na
v2 (Writing, Resume) é uma coleção registrada, não mudança no sistema.
