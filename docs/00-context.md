# 00 — Contexto do projeto

> Ponto de partida de qualquer sessão de trabalho. Este documento, o
> [01-project-state.md](01-project-state.md) e o
> [02-session-handoff.md](02-session-handoff.md) são **meta-documentos**:
> orientam quem chega, não normatizam o produto — a cadeia de precedência
> continua começando no [01-project-charter.md](01-project-charter.md).

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

## Política de contexto

Toda sessão de trabalho começa lendo **apenas**, nesta ordem:

1. Este documento;
2. [01-project-state.md](01-project-state.md) — estado atual;
3. [02-session-handoff.md](02-session-handoff.md) — passagem da última sessão.

Os demais documentos ([README](README.md), docs 01–13,
[ADRs](adr/README.md), [revisões](reviews/README.md),
[CHANGELOG](../CHANGELOG.md)) permanecem a fonte oficial de verdade, porém
são consultados **somente quando a tarefa atual exigir** — nunca relidos
integralmente por padrão.

## Fluxo oficial de release

1. Planejamento (escopo validado pelo Francisco);
2. Implementação;
3. Revisão técnica registrada em [reviews/](reviews/README.md);
4. Atualização da documentação impactada;
5. Atualização dos ADRs, quando necessário;
6. Atualização de [01-project-state.md](01-project-state.md);
7. Atualização de [02-session-handoff.md](02-session-handoff.md);
8. Atualização do [CHANGELOG](../CHANGELOG.md);
9. Um commit de marco (ADR-0005);
10. Encerramento da release.

## Regras editoriais que nunca relaxam

- Nenhum dado inventado; evidência acima de adjetivo (charter §5–7).
- Conteúdo pendente degrada com honestidade: seção ausente é omitida — nunca
  placeholder visível (doc 12 §5).
- Todo texto do site vive em `src/content/` tipado (ADR-0003); componentes
  nunca contêm texto editorial.
