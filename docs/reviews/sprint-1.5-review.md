# Revisão técnica — Sprint 1.5 (Brand Assets & Experience Foundation)

**Data:** 2026-07-11 · **Commit de marco:** `e31f52a` · **Veredito:** Aprovado

## Escopo entregue × planejado

Planejado (solicitação de sprint intermediário): motion guidelines, SEO
foundation, analytics strategy, brand assets, wordmark, padrão de diagramas,
padrão de mockups, sistema de imagens, performance budget rigoroso.
Entregue integralmente: docs 08–12, ADR-0008 e ADR-0009, assets gerados e
commitados, orçamentos por recurso no doc 06 §7.

## Decisões do sprint

- **Wordmark:** `franciscopedro.dev` (escolha do Francisco entre 3 opções
  apresentadas; ADR-0009). Consequência: domínio promovido a Must da v1.0.
- **Analytics:** Umami Cloud gratuito para a v2 (ADR-0008); Plausible
  reprovado por custo, Vercel Analytics por acoplamento.
- **Assets por código:** satori + resvg, texto convertido em paths;
  regeneráveis com `npm run assets:brand`.

## Verificação

- ESLint: limpo · tsc: limpo · Vitest: 5/5 · Build: 92,89 KB gzip JS.
- OG image e app icons verificados visualmente contra o doc 10.

## Achados

Nenhum defeito. Observação registrada: os orçamentos do doc 06 §7 ainda eram
verificação manual — automatização solicitada na aprovação do sprint
(implementada no refinamento pós-sprint: `scripts/check-budgets.mjs` na CI).

## Pendências geradas (ações do Francisco)

- Registrar `franciscopedro.dev` (Must da v1.0).
- Conectar o repositório à Vercel.
- Upload do social preview no GitHub (Settings → Social preview).

## Aprovação

Revisado e aprovado pelo Francisco em 2026-07-11, com refinamentos
solicitados: doc 13 (acessibilidade), pasta `docs/reviews/` e orçamentos na
CI — todos atendidos antes do início do Sprint 2.
