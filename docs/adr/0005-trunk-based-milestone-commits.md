# ADR-0005 — Trunk-based com commits de marco

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

Projeto solo com metodologia de sprints (doc 07 §7) e exigência de histórico
limpo onde cada commit representa uma entrega completa e validada — não
trabalho intermediário. O doc 06 §11 prescrevia branches curtas com PR,
prática herdada da lição do FastPass (trabalho sobrescrito na main).

## Decisão

Trunk-based adaptado ao contexto solo:

1. O trabalho de cada sprint acontece localmente (branch de sprint quando útil).
2. Só chega à `main` **um commit por marco concluído e validado** (lint,
   typecheck, testes e build passando), em Conventional Commits.
3. A `main` é sempre publicável; push apenas de marcos.
4. Se o projeto ganhar segundo colaborador, PRs obrigatórios voltam
   imediatamente (novo ADR formaliza).

## Alternativas consideradas

- *PR por sprint com squash-merge:* mesmo resultado no histórico, com o custo
  de abrir PRs de si mesmo; a revisão técnica já é etapa do fluxo do sprint.
- *Commits pequenos contínuos:* melhor para bisect, mas contraria o requisito
  explícito de histórico como narrativa de marcos do produto.

## Consequências

O histórico conta a evolução do produto e cada commit é um estado íntegro.
Custo: menor granularidade para `git bisect` — mitigado pelo CI verde
obrigatório em cada marco.
