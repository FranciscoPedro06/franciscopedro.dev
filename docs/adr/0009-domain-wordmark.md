# ADR-0009 — Wordmark: o domínio como marca

**Status:** Aceito (decisão do Francisco, Sprint 1.5)
**Data:** 2026-07-11

## Contexto

O conceito inicial do logo era o monograma `fp.` (doc 02 §3). Na revisão do
Sprint 1.5, o requisito foi reafirmado: wordmark extremamente discreta e
atemporal, sem aparência de startup genérica. Três alternativas foram
apresentadas e avaliadas.

## Decisão

A wordmark é o próprio domínio: **`franciscopedro.dev`** — JetBrains Mono,
`franciscopedro` em peso 600 na cor de texto, `.dev` em peso 400 na cor
`text-3`. Sem símbolo gráfico.

Para superfícies quadradas (favicon, app icons), deriva-se o **monograma
`fp.`** em tile escuro — o monograma sobrevive como glifo funcional, não como
marca principal.

## Alternativas consideradas

- **`fp.` como marca principal:** máxima discrição, mas monograma de duas
  letras com ponto colorido é padrão saturado em portfólios de dev — menos
  distintivo.
- **`Francisco Pedro.` (nome completo em Inter):** editorial e atemporal,
  porém menos alinhado à assinatura técnica (mono) da marca e mais largo no
  header mobile.

## Consequências

- A marca comunica a URL — cada exposição da wordmark ensina o endereço.
- Todos os assets (doc 10) derivam desta especificação; o header (`NavBar`)
  é atualizado.
- Compromisso implícito: o domínio `franciscopedro.dev` passa a ser parte da
  identidade — registrá-lo torna-se pré-requisito duro da v1.0 (antes era
  Should, doc 07 V1-8; promovido a Must).
