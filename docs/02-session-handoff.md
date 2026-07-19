# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-18 · **Release encerrada:** 0.9 — "Identidade visual editorial-técnica"

## Próximo objetivo

A 0.9 (identidade) foi **validada em navegador pelo Francisco** e publicada na
Vercel (dois commits de marco). Segue pendente a **validação manual das
0.6–0.8** — a mecânica de IDE (workbench, painéis, mobile, tema light/dark,
NVDA/Tab/zoom 200 %) mudou a experiência inteira e só passou pelo gate
automatizado; a 0.9 tocou só a pele por cima. Depois, **Pré-lançamento / v1.0**
(doc 07 §3): roadmap GitHub (rotação da chave Supabase, forks oficiais, READMEs),
medição do M7 (≥ 95) no deploy e integração do material restante do Francisco
(foto, e-mail, CV PT/EN, resultados do MIS, screenshots).

## Arquivos provavelmente envolvidos

- `src/index.css` — tokens dos dois temas (ardósia-fria no escuro, papel-quente
  no claro; **acento sem hue**; três famílias). Fonte da verdade: doc 04, ADR-0016.
- `src/components/ui/DocHeader.tsx` / `src/case/CasePage.tsx` — títulos em serifa
  (`font-serif` = Newsreader).
- `src/components/ui/BrandIcon.tsx` (componentes GitHub/LinkedIn, `currentColor`)
  + `src/lib/brand.ts` (resolvedor por label). Ícone de marca em `Hero`,
  `Contact`, `Footer`, `ActivityBar`; comando em `CommandPalette`.
- `src/content/site.ts` (`social` com LinkedIn; `email`, `resumeReady` seguem
  pendentes) · `src/lib/seo.ts` (`SITE_URL`).
- `scripts/generate-brand-assets.mjs` — cores da marca (regenera `public/*` com
  `npm run assets:brand` se a paleta mudar).

## Decisões desta release

- **ADR-0016 (identidade editorial-técnica):** o centroide da "cara de IA" se
  move — a 0.6.1 fugiu do teal/ciano, mas a textura pousou no "premium/dark de
  IA". A 0.9 sai dele mantendo a estrutura: serifa nos títulos (voz humana dentro
  do editor), **acento sem hue** (ênfase por tinta; cor só em success/danger),
  canvas de editor **frio**, cromo fabricado removido, ícones de marca
  monocromáticos. O mecanismo de theming do ADR-0013 permanece intacto.

## Observações

- **Não reintroduzir cor decorativa:** cor cromática só onde é semântica
  (success/danger). O LinkedIn **não** entra azul — ícone monocromático por
  princípio (charter §5–7 + ADR-0016).
- **Assimetria de temperatura** (escuro frio × claro papel-quente) é estado
  conhecido e assumido (doc 04 §1.5) — harmonizar o claro é dial futuro.
- **`Build · Tests ✓`** na status bar ainda é texto fixo — próximo candidato se
  o anti-fabricação for adiante.
- **Folga de orçamento** segue confortável (JS 75,1/110, CSS 21,3/25); features
  pesadas nascem lazy; medir a cada marco.
- Flake **pré-existente** em `SearchPanel.test` sob carga total da suíte (timeout
  de painel lazy) — passa isolado; não é regressão.
