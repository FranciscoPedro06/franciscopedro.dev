# ADR-0002 — SPA com pre-render no build, não meta-framework

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

O site tem 8 rotas de conteúdo estático versionado em código. O SEO é
requisito (RNF03), o que normalmente empurra para Next/Astro. A stack, porém,
é restrição do charter (§14): React + Vite + React Router.

## Decisão

SPA em Vite com **pre-render das rotas para HTML estático no build**.
Crawlers e usuários recebem conteúdo sem depender de JS; a hidratação mantém a
navegação client-side.

## Alternativas consideradas

- *Next.js / Astro:* resolveriam SSG nativamente, mas violam a restrição de
  stack e adicionam um framework inteiro para 8 páginas.
- *SPA pura sem pre-render:* SEO dependente de renderização por crawler;
  LCP pior. Rejeitada por RNF01/RNF03.

## Consequências

Dev server simples (Vite puro); um passo extra de build a manter. A decisão é
revisitada na v2 quando o blog mudar a equação (registrado no doc 06 §1 e
doc 07 V2-2) — a estrutura de conteúdo tipado (ADR-0003) migra sem retrabalho.
