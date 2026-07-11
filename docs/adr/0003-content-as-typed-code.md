# ADR-0003 — Conteúdo como módulos TypeScript tipados

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

Todo o texto do site foi definido no doc 05 antes da implementação. O risco é
esse conteúdo se fragmentar em strings hardcoded dentro de componentes, ou
exigir um CMS que o charter exclui (§8).

## Decisão

O conteúdo vive em `src/content/` como módulos TypeScript tipados
(`Project`, `TimelineEntry`, `Resume`, futuramente `Post`). Componentes nunca
contêm texto editorial; a camada `sections` liga dados a UI. Um teste de
contrato valida todos os dados contra o schema no CI.

## Alternativas consideradas

- *CMS headless:* infraestrutura e latência para um autor único; fora do escopo.
- *Markdown/MDX na v1:* melhor para prosa longa (blog), pior para dados
  estruturados dos cases (seções ordenadas, tags, links). Adotado apenas para
  os posts na v2 (ADR-0007).
- *Strings nos componentes:* elimina a fonte única editorial (doc 05) e
  impede o teste de contrato. Rejeitada.

## Consequências

Adicionar um case = criar um arquivo (RNF06); typo em campo obrigatório quebra
o build, não a produção. Custo: editar texto exige commit — aceitável, pois
conteúdo passa pelo mesmo fluxo de revisão que código.
