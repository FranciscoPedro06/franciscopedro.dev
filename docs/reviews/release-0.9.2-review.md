# Revisão — Release 0.9.2 · Craft do workbench

**Data:** 2026-07-19 · **ADR:** nenhum novo — aprofunda a ficção da IDE dentro
dos princípios vigentes (ADR-0015/0016, doc 08)

## Escopo entregue × planejado

Pedido do Francisco: "mais bonito, ícones e tudo mais, mais animado — sem
alterar coisas drásticas como cores". Enquadramento: a beleza deste produto
mora em **aprofundar a ficção da IDE** (o detalhe amoroso que uma IDE real
tem), não em decorar a superfície. Dois itens já eram permitidos pelo doc 08
e nunca tinham sido usados (stagger, press).

| Marco | Entregue | Onde |
|---|---|---|
| M1 | **FileGlyph**: badge tipográfico mono derivado da extensão (TS/PY/JA/JS — duas primeiras letras, regra derivável) no lugar do `FileCode` genérico, em Explorer, EditorTabs e ProjectCard; craft de árvore no Explorer — **guias de indentação** (hairline por nível) e pasta `projetos/` refletindo o colapso (Folder/FolderOpen) | `FileGlyph.tsx`, `Explorer`, `EditorTabs`, `ProjectCard` |
| M2 | **Stagger de 60ms** (doc 08 §3, permitido e inédito): `Reveal` ganha `delay`; cascata nas linhas da FeaturedWork (4), no índice `/projetos` (5) e na timeline — máx. 240ms de defasagem | `Reveal.tsx`, `FeaturedWork`, `Projects`, `Timeline` |
| M3 | **Vida no cromo**: ThemeToggle com pop do ícone na troca (keyframe `icon-pop`, opacity+rotate+scale 150ms), tabs novas entram com fade, press `scale(0.98/0.90)` (doc 08 §2, antes só no rail) em fechar-tab, abas/fechar do painel inferior, gatilho Comandos e o toggle | `index.css`, `ThemeToggle`, `EditorTabs`, `BottomPanel`, `NavBar` |

## Verificação (gate)

- ESLint limpo · `tsc --noEmit` limpo · Vitest **58/58** (primeira rodada,
  sem flake — timeouts da 0.9.1 seguram).
- Build (8 HTMLs) ok · Orçamentos: **JS 75,6/110 KB · CSS 21,4/25 KB** (+0,1).
- Tudo `opacity`/`transform`, tudo `motion-safe`, nenhuma cor nova, nenhum
  timing fora da faixa 120–220ms.

## O que foi recusado (e por quê)

- **Cores por tipo de arquivo** (VS Code usa): violaria o acento sem hue
  (ADR-0016) — a cor por tipo é decorativa, não semântica. Fica como fork:
  exigiria revisão do ADR.
- **Partículas/parallax/gradiente animado**: proibições do doc 08 §3, mantidas.
- **Cursor piscante no Hero / voz de terminal no conteúdo**: fabricação sobre
  conteúdo editorial (ADR-0015) — o terminal já tem o dele.

## Pendências geradas

- **Validação visual fina**: o alinhamento das guias de indentação com
  chevrons/glifos e o tamanho do badge (8px) foram calibrados às cegas —
  conferir em navegador; são dials de um commit.
- O `SearchPanel` ainda usa `FileCode` genérico nos resultados — adotar
  `FileGlyph` ali é candidato natural se a validação aprovar os glifos.

## Veredito

Gate verde nos 3 commits. **Aguarda validação em navegador pelo Francisco**
(fila: 0.6–0.8, 0.9.1, 0.9.2).
