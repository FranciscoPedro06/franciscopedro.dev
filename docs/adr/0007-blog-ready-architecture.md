# ADR-0007 — Arquitetura blog-ready desde a v1

**Status:** Aceito
**Data:** 2026-07-11

## Contexto

Ajuste aprovado pós-Sprint 0: a seção Writing continua na v2, mas a
arquitetura deve nascer preparada. O risco a evitar: a v2 exigir refatoração
de roteamento, conteúdo ou SEO para acomodar posts.

## Decisão

A v1 reserva as fronteiras, sem implementar a feature:

1. **Namespace de rota** `/escrita` e `/escrita/:slug` reservado na tabela de
   rotas (doc 06 §4) — nenhuma outra feature o ocupa.
2. **Tipo `Post`** definido em `src/content/types.ts` junto dos demais tipos,
   com o campo `body` apontando para MDX (prosa longa não é dado estruturado —
   complemento do ADR-0003).
3. **Infra agnóstica de coleção:** pre-render, sitemap e metadados SEO operam
   sobre uma lista de rotas derivada do conteúdo — adicionar uma coleção nova
   (posts) alarga a lista, não o mecanismo.
4. Nenhum componente, página ou dependência de blog na v1 (charter §8).

## Alternativas consideradas

- *Implementar o blog oculto na v1:* código morto em produção, custo de
  manutenção antecipado. Rejeitada.
- *Não preparar nada:* a v2 começaria refatorando SEO/pre-render/rotas.
  Rejeitada pelo ajuste aprovado.

## Consequências

A v2 adiciona arquivos (posts, página de listagem, template) sobre estrutura
existente. Custo presente: um tipo não usado e disciplina de namespace —
desprezível.
