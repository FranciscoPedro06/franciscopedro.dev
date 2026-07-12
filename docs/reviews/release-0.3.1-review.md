# Revisão técnica — Release 0.3.1 (Project Continuity)

**Data:** 2026-07-12 · **Commit de marco:** (este commit) · **Veredito:** Aprovado

## Objetivo e escopo

Tornar o repositório a única memória do projeto entre sessões, eliminando a
dependência do histórico de conversas. Release exclusivamente de
documentação e governança — nenhuma alteração em `src/`.

O escopo original ("Release 0.2.1") já havia sido parcialmente entregue na
Release 0.3, que criou `00-context.md` e `01-project-state.md`. Esta release
entrega o delta e foi renumerada para **0.3.1** (validado pelo Francisco),
mantendo a cronologia do CHANGELOG.

## Entregue

- **`docs/02-session-handoff.md`** (novo): meta-documento de passagem entre
  sessões, reescrito a cada release — próximo objetivo, arquivos
  provavelmente envolvidos, decisões da release, observações; sem histórico.
- **Política de contexto** no `00-context.md`: toda sessão lê apenas
  00 → 01 → 02; docs 01–13, ADRs, revisões e CHANGELOG permanecem
  normativos, consultados somente sob demanda (substitui a antiga "Ordem de
  leitura", que mandava ler tudo).
- **Fluxo oficial de release em 10 passos** no `00-context.md`:
  planejamento → implementação → revisão → docs → ADRs → estado → handoff →
  CHANGELOG → commit de marco → encerramento.
- **`CLAUDE.md`** (raiz, novo): aplica a política automaticamente às sessões
  do Claude Code — leitura inicial dos 3 meta-documentos, consulta sob
  demanda, fluxo de release e gate de qualidade.
- Índices atualizados: `docs/README.md` (meta-documentos), tabela de
  releases do `01-project-state.md`, `CHANGELOG.md`.

## Decisões de implementação

1. **Numeração 0.3.1, não 0.2.1:** a 0.3 já estava concluída; registrar
   0.2.1 depois dela quebraria a ordem do CHANGELOG (SemVer).
2. **`02-session-handoff` coexiste com `02-brand-guide`:** meta-documentos
   reutilizam numeração fora da cadeia de precedência — precedente já aberto
   por 00-context/00-technical-audit e 01-project-state/01-project-charter.
3. **Sem ADR novo:** a release formaliza processo já praticado (ADR-0005);
   nenhuma decisão arquitetural de produto.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **23/23** · build ok.
- Orçamentos (doc 06 §7): JS entrada 97,1 KB / 110 KB · chunk do case
  2,1 KB / 35 KB · CSS 19,3 KB / 25 KB · lazy restantes ok.
- Links internos dos documentos alterados conferidos contra os arquivos
  existentes; `00-context.md` permanece pequeno e sem informação temporária.

## Pendências geradas

- Nenhuma nova. As pendências ativas (validação da 0.3 em navegador real,
  material do Francisco) seguem registradas no `01-project-state.md` e no
  handoff.
