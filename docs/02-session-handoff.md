# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-19 · **Release encerrada:** 0.9.1 — "Micro-interações funcionais"

## Próximo objetivo

A 0.9.1 (4 marcos + fix de suíte) está commitada com gate verde, **sem
validação em navegador ainda** — entra na mesma fila das 0.6–0.8. A validação
manual (desktop/tablet/mobile, tema light/dark, NVDA/Tab/zoom 200 %) é o
próximo passo natural; da 0.9.1 interessam os dials de sensação: **ritmo do
terminal** (18/240/90ms) e **peso do highlight** da paleta. Depois,
**Pré-lançamento / v1.0** (doc 07 §3): roadmap GitHub (rotação da chave
Supabase, forks oficiais, READMEs), medição do M7 (≥ 95) no deploy e
integração do material restante do Francisco (foto, e-mail, CV PT/EN,
resultados do MIS, screenshots).

## Arquivos provavelmente envolvidos

- `src/components/workbench/CommandPalette.tsx` — match highlight
  (`matchRanges` + `Highlighted`; tokens compartilhados com o filtro).
- `src/components/layout/Footer.tsx` — chip de build derivado de
  `src/content/routes.ts` (rotas + 404), abre a aba Output.
- `src/components/workbench/BottomPanel.tsx` — Terminal em duas velocidades
  (tecla 18ms · Enter 240ms · output 90ms/linha).
- `Hero`/`FeaturedWork`/`CaseNav`/`EditorTabs` — setas deslizantes + foco.
- `vite.config.ts` + `src/test/setup.ts` — timeouts da suíte (20s/5s).

## Decisões desta release

- **Sem ADR novo** — a release aplica princípios vigentes: anti-fabricação
  (ADR-0015/0016) e "motion é informação" (doc 08 §1).
- **Exceção registrada no doc 08 §3**: o Terminal digita os comandos `$` —
  digitação é o comportamento nativo do objeto representado; a proibição de
  "texto digitando" segue integral para prosa/títulos. Sujeita a veto do
  Francisco na validação.
- **Interatividade = feedback funcional**, nunca decoração: highlight por
  tinta, chip derivado de dado real, vocabulário de motion existente (4px,
  150ms) aplicado por inteiro — nenhum timing novo, nenhuma cor nova.

## Observações

- **O flake de testes foi resolvido de verdade**: não era só o
  `SearchPanel` — qualquer suíte com chunk lazy + o axe da home (~5s)
  estourava os defaults sob carga; conjunto variável por rodada, tudo verde
  isolado. `testTimeout: 20s` + `asyncUtilTimeout: 5s`; três rodadas
  completas consecutivas 58/58. Não tratar mais como pendência.
- **Folga de orçamento** segue confortável (JS 75,6/110 — +0,5 KB do import
  de rotas no Footer; CSS 21,3/25).
- `aria-live`/`role="log"` no Terminal ficou de fora por decisão (transcript
  é visual; avaliar na validação de a11y).
- **Não reintroduzir cor decorativa** (ADR-0016) e **assimetria de
  temperatura** entre temas seguem como estado conhecido.
