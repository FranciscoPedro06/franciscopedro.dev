# ADR-0006 — Currículo como rota `/resume` com PT/EN de fonte única

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

Ajuste aprovado pós-Sprint 0: o currículo deve ter visualização em página e
download em PDF, em português e inglês (RF10). O site permanece pt-BR na v1
(charter §14) — o currículo é a exceção bilíngue, porque é o artefato que
circula em processos seletivos internacionais.

## Decisão

- Rota `/resume` com alternador `PT/EN` (estado local, PT padrão).
- O conteúdo do currículo é um modelo tipado em `src/content/resume/`,
  isolado por locale (`pt.ts`, `en.ts`) — **uma fonte** alimenta a página; os
  PDFs (`/cv-pt.pdf`, `/cv-en.pdf`) são derivados dela.
- URL em inglês (`/resume`, não `/curriculo`): é a URL compartilhada com
  recrutadores, inclusive internacionais.

## Alternativas consideradas

- *Apenas link para PDF:* PDF não indexa bem, não adapta a mobile e quebra a
  experiência de navegação.
- *i18n do site inteiro:* custo editorial ×2 sem demanda comprovada
  (doc 07 §9). A estrutura por locale do currículo prepara o caminho sem
  antecipar o custo.

## Consequências

Recrutador lê o currículo sem sair do site e baixa o PDF no idioma que
precisa. Obrigação nova: manter página e PDF sincronizados — mitigada pela
fonte única tipada.
