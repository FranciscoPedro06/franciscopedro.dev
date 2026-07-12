# franciscopedro.dev — instruções de sessão

A memória oficial do projeto é o repositório, não o histórico de conversas.

**Início de toda sessão — ler apenas, nesta ordem:**

1. `docs/00-context.md` — como o projeto funciona;
2. `docs/01-project-state.md` — estado atual;
3. `docs/02-session-handoff.md` — passagem da última sessão.

Os demais documentos (docs 01–13, ADRs, reviews, CHANGELOG) são a fonte
oficial de verdade, mas consultados **somente quando a tarefa exigir**.

Todo marco segue o fluxo oficial de release do `docs/00-context.md` e fecha
com o gate de qualidade: ESLint limpo, `tsc --noEmit` limpo, Vitest verde,
build ok, orçamentos do doc 06 §7 dentro do limite. Um commit por marco;
nenhum commit representa trabalho incompleto.
