# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-12 · **Release encerrada:** 0.3.1 — Project Continuity

## Próximo objetivo

**Release 0.4** — conteúdo dos 4 cases restantes (doc 05 §3.2–3.5) +
diagramas da API Facial e do Carrinho (V1-2) e/ou SEO/pre-render + 404
noindex (M7). A ordem exata se decide no planejamento da release
([01-project-state.md](01-project-state.md)).

## Arquivos provavelmente envolvidos

- `src/content/projects/` — um arquivo por case (`reconhecimento-facial`,
  `edupass`, `reviva`, `carrinho-inteligente`); o `fastpass.ts` é o modelo.
- `src/case/` — template pronto; novos diagramas entram pelo registro usado
  por `ArchitectureDiagram`.
- Docs de referência: 05 §3.2–3.5 (conteúdo), 11 (diagramas), 09 (se for M7).

## Decisões desta release

- O repositório é a única memória do projeto: toda sessão nova lê apenas
  00 → 01 → 02 e consulta o resto sob demanda (política no
  [00-context.md](00-context.md)).
- Fluxo oficial de release formalizado em 10 passos no
  [00-context.md](00-context.md).
- `CLAUDE.md` na raiz aplica a política automaticamente às sessões do
  Claude Code.

## Observações

- A Release 0.3 segue aguardando validação do Francisco em navegador real
  (checklist manual de acessibilidade da página de case: NVDA, Tab,
  zoom 200%).
- As pendências de material do Francisco que bloqueiam a publicação estão
  no [01-project-state.md](01-project-state.md).
