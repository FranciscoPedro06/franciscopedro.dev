# ADR-0001 — Registrar decisões de arquitetura como ADRs

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

O projeto é orientado por documentação (Sprint 0, docs 00–07). Decisões
arquiteturais tomadas apenas em conversas ou commits se perdem; a auditoria do
FastPass (doc 00) mostrou o custo disso na prática — trabalho removido sem
registro do porquê.

## Decisão

Toda decisão arquitetural relevante é registrada em `docs/adr/` no formato do
`template.md`, numerada sequencialmente, **antes** da implementação. ADRs
aceitos são imutáveis; reverter uma decisão exige novo ADR que substitui o
anterior.

## Alternativas consideradas

- *Decisões só nos docs 01–07:* os docs descrevem o estado-alvo, não a
  cronologia nem as alternativas rejeitadas — os dois registros se complementam.
- *Decisões nas mensagens de commit:* commits de marco (ADR-0005) agregam
  entregas inteiras; não têm granularidade de decisão.

## Consequências

Cada mudança de rumo tem rastro auditável. Custo: disciplina de escrever o ADR
antes de codar — aceito como parte da metodologia.
