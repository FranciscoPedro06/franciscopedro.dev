# ADR-0004 — Nenhum gerenciador de estado global na v1

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

Portfólios costumam importar bibliotecas de estado por hábito. Este site tem
tema fixo, conteúdo estático e nenhum formulário.

## Decisão

Nenhum estado global (sem Redux, Zustand, Context de aplicação). Os únicos
estados são locais: menu mobile aberto, scroll-spy, feedback "copiado" e o
idioma da página `/resume`.

## Alternativas consideradas

- *Context para tema:* não há alternância de tema na v1 (charter §8).
- *Zustand "para o futuro":* especulação sem requisito; viola o charter §7.

## Consequências

Bundle menor, zero indireção. Se um requisito real de estado global surgir
(ex.: tema claro na v2+), novo ADR o introduz junto do requisito.
