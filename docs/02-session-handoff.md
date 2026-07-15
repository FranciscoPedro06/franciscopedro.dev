# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-14 · **Release encerrada:** 0.8 — "Redesign / Maturidade de produto"

## Próximo objetivo

**Validação em navegador real do redesign 0.8 pelo Francisco** antes de
qualquer novo código: as Releases 0.6–0.8 mudaram a experiência inteira e só
passaram pelo gate automatizado. Checklist: desktop/tablet/mobile, tema
light/dark, NVDA/Tab/zoom 200 %, e a **pergunta-guia do ADR-0014** — "sem os
ícones e o Explorer, ainda parece software?". Depois, **Release 0.9 —
Pré-lançamento / v1.0** (doc 07 §3): roadmap GitHub, medição do M7 (≥ 95) no
deploy e integração do material do Francisco (doc 05 §7) conforme chegar.

## Arquivos provavelmente envolvidos

- `src/components/ui/DocHeader.tsx` — a abertura de todo documento (ADR-0014):
  comentário mono de topo de arquivo + título + lead. Todo conteúdo novo passa
  por aqui, não mais por um `SectionHeading` (removido).
- `src/pages/Home.tsx` (wrapper `View`) + `src/components/sections/*` — as 7
  views como documentos densos alinhados à esquerda; `Hero` é o `overview`.
- `src/index.css` — tokens dos dois temas (escala 0.8, `surface-3`,
  `.elevated`); **sem** canvas de fundo. Fonte da verdade: doc 04.
- `src/components/layout/Footer.tsx` / `NavBar.tsx` — status bar com branch +
  último commit reais (`git-log`) e o gatilho command-first da title bar.
- `src/lib/seo.ts` (`SITE_URL`), `src/content/site.ts` (e-mail, LinkedIn,
  `resumeReady`) — pendências de material entram aqui (0.9).

## Decisões desta release

- **ADR-0014 (conteúdo como documento):** o editor renderiza o arquivo como
  documento (alinhado à esquerda, denso, cabeçalho de arquivo, ações como links
  de workspace), não como seção de marketing. HTML semântico intacto — SSR/SEO/
  axe/56 testes verdes. A navegação segue na URL/hash (ADR-0004/0011).
- **ADR-0015 (sem cenografia):** toda superfície tem função real; canvas e
  minimap decorativos removidos; a liveness vem de dados reais (git-log), nunca
  de atividade ou imperfeição fabricadas.
- **Linguagem visual 0.8:** escala tipográfica contida (teto 40 px, corpo
  15 px, uma voz), rampa de neutros com `surface-3`, elevação só em camadas
  flutuantes, densidade dupla (cromo/leitura). Planejamento e direção de arte
  completos em [reviews/release-0.8-design-review.md](reviews/release-0.8-design-review.md).

## Observações

- **Folga de orçamento** segue grande (JS 74,4/110, CSS 21,1/25) — a disciplina
  continua: features pesadas nascem lazy; medir a cada marco.
- **`Button`** existe só para chrome (Menu/Fechar); ações de conteúdo são links
  de workspace. Não reintroduzir botões preenchidos no conteúdo.
- A **overview** é propositalmente concisa (abertura de README); enriquecer só
  se a validação pedir — sem fabricar dados (charter §5–7).
- Pendências de material que bloqueiam a publicação: ver
  [01-project-state.md](01-project-state.md). As Releases 0.3–0.8 aguardam
  validação do Francisco em navegador real.
