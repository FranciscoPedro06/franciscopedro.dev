# Revisão — Release 0.9 · Identidade visual editorial-técnica

**Data:** 2026-07-18 · **ADR:** [0016](../adr/0016-visual-identity-editorial-technical.md)

## Escopo entregue × planejado

Partiu de uma leitura de design em produção: a estrutura de IDE é autoral, mas a
**textura** havia pousado no centroide "premium/dark de IA" (grafite-quente +
acento-ouro + Inter + cromo fabricado). Objetivo: sair dele mantendo a estrutura.

| Entregue | Onde |
|---|---|
| Tipografia de três vozes: Newsreader (serifa) nos títulos, IBM Plex Sans no corpo/cromo (ex-Inter), JetBrains Mono no código | `index.css`, `DocHeader`, `CasePage`, doc 04 §2 |
| Acento sem hue (ênfase por tinta; cromático só em `success`/`danger`); link de e-mail com sublinhado | `index.css`, `Contact`, doc 04 §1.2 |
| Canvas grafite-quente → cinza-ardósia frio; rampa de neutros reconstruída | `index.css`, doc 04 §1.1 |
| Cromo fabricado removido: controles de janela (NavBar) + faixa de "fatos" (Footer) | `NavBar`, `Footer`, doc 04 §6.6/§6.7 |
| LinkedIn integrado + ícones de marca SVG monocromáticos (GitHub/LinkedIn); resolvedor `src/lib/brand.ts`; comando "Open LinkedIn" | `site.ts`, `BrandIcon.tsx`, `lib/brand.ts`, `Hero`/`Contact`/`Footer`/`ActivityBar`/`CommandPalette`, doc 04 §7 |
| Assets de marca regenerados no novo tom | `scripts/generate-brand-assets.mjs`, `public/*` |

## Verificação (gate)

- ESLint limpo · `tsc --noEmit` limpo · Vitest **56/56** · build (8 HTMLs
  pré-renderizados) ok.
- Orçamentos doc 06 §7: **JS 75,1/110 KB · CSS 21,3/25 KB** — dentro do limite.
- Contraste: rampa dos dois temas medida ≥ AA (o teste axe-core no `a11y.test`
  segue verde; validação real de pixels é o Lighthouse, lição da 0.5).

## Achados e correções

- **`react-refresh/only-export-components`** em `BrandIcon.tsx` (mistura de
  componentes + função utilitária): o resolvedor `brandIcon` foi movido para
  `src/lib/brand.ts`, deixando o arquivo de ícones só com componentes.
- **`SearchPanel.test`** falha de forma intermitente sob carga total da suíte
  (timeout de `findByLabelText` no painel lazy) — **pré-existente**, confirmado
  na árvore limpa antes das mudanças; passa isolado. Não introduzido aqui.

## Pendências geradas

- **Assimetria de temperatura** entre temas (escuro frio · claro papel-quente):
  estado conhecido e assumido (doc 04 §1.5); harmonizar o claro é dial futuro.
- **`Build · Tests ✓`** na status bar segue como texto fixo — próximo candidato
  se o princípio anti-fabricação for levado adiante.
- Fork em aberto: um ponto de **cor comprometida** (vermelho-carimbo/chartreuse)
  em vez da tinta monocromática — descartado por ora (profissionalismo + colisão
  com `danger`).

## Veredito

**Aprovado pelo Francisco em validação no navegador** (dev server, tema escuro).
Diferente das 0.6–0.8, que aguardam validação, esta passou pela conferência
visual direta antes do commit. Deploy publicado na Vercel (dois commits de marco:
identidade e depois contatos/ícones).
