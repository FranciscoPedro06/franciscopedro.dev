# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-13 · **Release encerrada:** 0.6.1 — Workbench

## Próximo objetivo

**Release 0.7 — Pré-lançamento / v1.0** (S5 do doc 07), a validar com o
Francisco: roadmap GitHub pré-lançamento (doc 07 §3), medição do critério
M7 (≥ 95) no deploy da Vercel e integração do material dele (doc 05 §7)
conforme chegar. Antes disso, o Francisco precisa **validar o workbench em
navegador real**: a 0.6.1 mudou o paradigma inteiro (aplicação de viewport
inteira, views por hash) e só passou pelo gate automatizado.

## Arquivos provavelmente envolvidos

- `src/components/workbench/` (ActivityBar, Explorer, EditorTabs),
  `src/lib/views.ts` e `src/pages/Home.tsx` (gestor de views) — ajustes que
  a validação pedir começam aqui; a norma é doc 04 §6.13–6.16 + ADR-0011.
- `src/lib/seo.ts` — `SITE_URL` confirmada; ativar `franciscopedro.dev` é a
  mesma linha.
- `src/content/site.ts` — e-mail, LinkedIn, `resumeReady` quando o material
  chegar.
- Doc de referência: 07 §3 (roadmap GitHub), 05 §7 (pendências de material).

## Decisões desta release

- **ADR-0011**: as 7 seções da home são views comutadas pelo hash; todas
  ficam montadas no DOM (`hidden` nas inativas) — SEO, ordem aprovada e
  contratos preservados; a view deriva da URL via `useSyncExternalStore`
  (sem estado global, sem mismatch de hidratação). Hash não é rota.
- **Sem scroll global**: o único scroll é `#editor-scroll`; o
  `ScrollManager` opera nesse painel (âncoras de case com foco gerenciado).
- **Paleta grafite-quente + acento âmbar `#D9A866`** (doc 02 §3 revisado —
  sai o teal "estética de IA"); contrastes AA calculados no doc 04 §1;
  assets de marca regenerados por `npm run assets:brand`.
- `site.nav` tem 6 itens (entraram Trajetória e Sobre): sem página longa,
  toda view precisa de link direto (doc 03 §2).
- Releases 0.6 e 0.6.1 são o mesmo marco de design em duas iterações; o
  pré-lançamento segue sendo a 0.7.

## Observações

- **JS inicial em 103,3/110 KB** — margem de ~6 KB; qualquer adição à
  entrada (ícones, libs) deve ser pesada antes.
- Pontos novos do checklist manual de a11y: comutação de view move o foco à
  view; tabs do editor têm fechar próprio (24 px, `aria-label`); rail e
  árvore são `nav`s rotulados ("Atalhos", "Explorador").
- As Releases 0.3–0.6.1 aguardam validação do Francisco em navegador real,
  incluindo o checklist manual de acessibilidade (NVDA, Tab, zoom 200%).
- O critério M7 (performance ≥ 95) segue aberto: medir no PageSpeed
  Insights ou num runner de CI (no Windows local o Lighthouse CI precisa de
  `CHROME_PATH` apontando para o Edge).
- As pendências de material que bloqueiam a publicação estão no
  [01-project-state.md](01-project-state.md).
