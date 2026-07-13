# Revisão técnica — Release 0.6 (Design "IDE")

**Data:** 2026-07-13 · **Commit de marco:** (este commit) · **Veredito:** Aprovado internamente; aguarda validação visual do Francisco em navegador real

## Objetivo e escopo

Release 100% visual, definida pelo Francisco: transformar a apresentação do
portfólio para que a página inteira pareça uma IDE moderna — filosofia de
layout de VS Code/GitHub/Raycast/Linear/Vercel, **sem copiar o VS Code** e
mantendo a identidade da marca. Invariantes explícitos: arquitetura,
conteúdo, rotas, SEO, SSR/pre-render, acessibilidade e performance
inalterados; nenhuma biblioteca nova; nenhum efeito caro (canvas, shader,
three.js). Mobile prioriza UX, não reproduz a IDE inteira.

## Entregue

- **Moldura de IDE no shell** (`App.tsx`): title bar (NavBar em largura
  total, borda permanente, links como itens de menu), `ActivityBar` (rail de
  ícones Lucide em `lg+`, tooltips decorativos, estado ativo pelo scroll-spy
  existente), `Explorer` (árvore de navegação em `xl+`, derivada de
  `site.nav` + coleções de projetos — nenhum destino novo) e Footer como
  **status bar** fixa na base em `lg+` (mesmos contatos, colofão e
  copyright). Landmarks novos rotulados ("Atalhos", "Explorador"); os
  existentes intocados.
- **`EditorPane`** (doc 04 §6.15): moldura de editor com faixa de tabs,
  breadcrumb decorativo (`aria-hidden`) e corpo. Aplicada ao Hero
  (`francisco-pedro.tsx`, tab com indicador e fechar decorativo), a
  `/projetos` (tab `projetos`) e ao `CasePage` — os **5 cases viram tabs
  navegáveis** (`{slug}.tsx`, `nav` com `aria-current="page"`), a troca de
  case usa a revelação existente. Sem `overflow-hidden` no contêiner: o
  `position: sticky` do índice lateral do case continua funcionando.
- **Cards → painéis**: `ProjectCard` com cabeçalho de arquivo
  (`{slug}.tsx` decorativo + `Badge`), corpo e hover por borda; skills da
  seção Dados como **lista de extensões** (tile mono derivado do nome +
  descrição); princípios de Engenharia como painéis numerados; nós da
  Timeline em estilo source control (anel, `accent` no atual).
- **Canvas da IDE** (doc 04 §1.4): grid de 48 px a 2,5% + ruído
  `feTurbulence` a 2,8% num pseudo-elemento fixo — CSS puro, sem JS, sem
  canvas, `pointer-events: none`.
- **Motion 120–220ms** (doc 04 §5, doc 08): `base` 250→200ms, `slow`
  500→220ms, deslocamento de entrada 16→8px. Curva e fábricas de
  `src/lib/motion.ts` inalteradas; `prefers-reduced-motion` preservado.
- **Docs**: doc 04 (§1.4, §4, §5, §6.4/6.6/6.7 revisados, §6.13–6.15 novos,
  §7) e doc 08 (§2, §4) atualizados — decisão registrada antes do fechamento,
  como manda o fluxo.

## Decisões de implementação (interpretações registradas)

1. **"Ícones já existentes"** = Lucide: `lucide-react` já era dependência e o
   doc 04 §7 já o normatizava; nenhum ícone do VS Code, nenhuma biblioteca
   nova. Sem ícone de marca GitHub no Lucide 1.x, o atalho externo usa
   `GitBranch` + tooltip.
2. **Chrome da metáfora não é conteúdo editorial**: nomes de tab/breadcrumb
   (`francisco-pedro.tsx`, `portfolio › src › …`) derivam de slugs e rotas
   existentes e vivem nos componentes, como os demais textos de interface
   ("Menu", "Fechar") — ADR-0003 intocado, zero conteúdo inventado.
3. **Botão de fechar da tab do Hero é decorativo** (`aria-hidden`): o pedido
   era estético ("Visual apenas. Sem funcionalidade extra."); um fechar
   funcional seria rota nova ou mentira de UX. Nas tabs dos cases não há
   fechar — a navegação real é a própria tab.
4. **Explorer só em `xl+`, ActivityBar em `lg+`**: entre 1024–1280 px os
   296 px da moldura completa espremeriam a prosa dos cases abaixo da medida
   de leitura. Doc 04 §4 atualizado (o "nenhum elemento novo em xl" caiu).
5. **Medição do orçamento de JS corrigida** (`scripts/check-budgets.mjs`): o
   compartilhamento do `EditorPane` entre entrada e rotas lazy fez o Rollup
   dividir a entrada em dois chunks estáticos (`index` + chunk comum com
   `modulepreload` no `index.html`). O script assumia entrada = um chunk e
   classificava o segundo como lazy (35 KB), estourando um orçamento que na
   verdade está folgado. Correção fiel à intenção do doc 06 §7: **JS inicial
   = entrada + chunks `modulepreload`**, somados contra os 110 KB. Nenhum
   limite mudou.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **44/44** (contratos de SEO,
  smoke SSR, axe nos 4 tipos de página — todos sobre o markup novo) · build
  com pre-render ok (8 páginas + sitemap + robots).
- Orçamentos (doc 06 §7): **JS inicial 104,0 KB / 110 KB** (dois chunks
  estáticos; +3,6 KB da release — ícones Lucide + componentes da moldura) ·
  case 2,8 KB / 35 KB · CSS **19,9 KB / 25 KB**.
- SEO inspecionado no `dist`: title/canonical/OG/JSON-LD por rota idênticos
  em estrutura à 0.5, sitemap com 7 URLs, robots com `Sitemap:`, `404.html`
  com `noindex`. A moldura (Atalhos, Explorador, tabs) está no HTML
  pré-renderizado.
- Smoke no `vite preview`: `/`, `/projetos`, `/projetos/fastpass` e rota
  inexistente respondem.
- Nenhum arquivo de conteúdo (`src/content/`) alterado; rotas, `vercel.json`,
  `src/lib/seo.ts` e pipeline de build intocados.

## Pendências geradas

- **Validação visual do Francisco em navegador real** (desktop lg/xl, tablet,
  mobile), incluindo o checklist manual de acessibilidade (NVDA, Tab, zoom
  200%) — as tabs dos cases e o rail são os pontos novos de teclado.
- Medir Lighthouse no preview da Vercel após o deploy (o critério M7 ≥ 95
  segue aberto da 0.5); o canvas de fundo e a moldura não adicionam JS de
  runtime, mas a medição real é a prova.
- O `.gitignore` chegou à sessão com uma alteração staged (anterior à
  release) adicionando `/docs` ao ignore — contradiz a memória oficial no
  repositório e foi tirada do stage; no fechamento a alteração já não
  existia no working tree (revertida fora desta sessão). Nada entrou no
  commit; `docs/` segue versionado. Registrado para o Francisco confirmar
  que a reversão foi intencional.
