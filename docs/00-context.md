# 00 — Contexto do projeto

> Ponto de partida de qualquer sessão de trabalho. Este documento e o
> [01-project-state.md](01-project-state.md) são **meta-documentos**: orientam
> quem chega, não normatizam o produto — a cadeia de precedência continua
> começando no [01-project-charter.md](01-project-charter.md).

---

## O que é

**franciscopedro.dev** — o site da marca profissional de Francisco Pedro
(Desenvolvedor de Sistemas & Analista de Dados). Não é um portfólio; é um
produto: documentado, tipado, testado e com orçamentos de performance na CI.
A tese que tudo sustenta: *constrói produtos digitais completos e transforma
os dados que eles geram em inteligência para o negócio.*

Repositório oficial: `github.com/FranciscoPedro06/franciscopedro.dev`.

## Como se trabalha aqui

- **Documentação antes de código.** Toda decisão nasce nos docs; o código
  transcreve. Conflitos entre documentos se resolvem no de menor número.
- **Releases, não sprints.** Cada entrega é uma Release com objetivo, escopo,
  critérios de aceite, revisão técnica registrada em `docs/reviews/`,
  atualização de docs/ADRs/CHANGELOG e **um commit de marco** (ADR-0005).
  Nenhum commit representa trabalho incompleto.
- **Decisões arquiteturais viram ADR** em `docs/adr/` antes da implementação
  (ADR-0001). ADRs aceitos são imutáveis.
- **Gate de qualidade de todo marco:** ESLint limpo, `tsc --noEmit` limpo,
  Vitest verde, build ok, orçamentos do doc 06 §7 dentro do limite.

## Ordem de leitura

1. Este documento e o estado atual ([01-project-state.md](01-project-state.md)).
2. [README.md](README.md) — índice e precedência.
3. Docs 01–13, na ordem numérica.
4. ADRs ([adr/](adr/README.md)) e revisões ([reviews/](reviews/README.md)).
5. [CHANGELOG](../CHANGELOG.md).

## Regras editoriais que nunca relaxam

- Nenhum dado inventado; evidência acima de adjetivo (charter §5–7).
- Conteúdo pendente degrada com honestidade: seção ausente é omitida — nunca
  placeholder visível (doc 12 §5).
- Todo texto do site vive em `src/content/` tipado (ADR-0003); componentes
  nunca contêm texto editorial.
