# Revisão — Release 0.10 · Workbench VS Code + Linux Lab

**Data:** 2026-10-18 · **ADR:** [0018](../adr/0018-vscode-editor-themes.md)
(substitui o ADR-0016, amplia o ADR-0017)

## Escopo entregue × planejado

Pedido do Francisco: o portfólio "lindo e interativo" no estilo de um
portfólio-IDE de referência, e o **Linux Lab** como novo projeto, no mesmo
formato dos outros. Fluxo: dois mockups navegáveis antes do código — o
primeiro (degradês, brilho, ciano) foi recusado como "cara de IA"; o segundo
(VS Code real: cores oficiais, logos oficiais, código real) foi aprovado com
três decisões: Linux Lab fixado no lugar do Carrinho, títulos em sans e
Aprendizados do Linux Lab escritos. Um ajuste pedido na aprovação: a grade de
contribuições escreve palavras da stack em pixels, sem fingir histórico.

| Marco | Entregue | Onde |
|---|---|---|
| M1 | **Linux Lab** como 6º estudo de caso (fonte: READMEs e código dos dois repositórios): problema, objetivo, arquitetura com diagrama, limites do contêiner, 6 decisões, 3 desafios, resultados, **aprendizados**, passo a passo e roadmap por incrementos. Fixado na home no lugar do Carrinho; entrada na trajetória (SET 2026) | `content/projects/linux-lab.ts`, `LinuxLabArchitecture.tsx`, `timeline.ts` |
| M2 | **Temas reais de editor** (ADR-0018): Dark Modern (default) e Light Modern do VS Code, GitHub Dark, Dracula e Monokai; painel Color Theme com prévias; tokens de sintaxe, terminal e heatmap | `index.css`, `workbench.ts`, `SettingsPanel`, `index.html` |
| M3 | **Logos oficiais** (devicon, MIT) em arquivos, abas, chips, tags e filtros, servidos como arquivo | `public/icons/tech/`, `lib/tech.ts`, `TechIcon`, `FileGlyph`, `Tag` |
| M4 | **Shell no desenho do VS Code**: title bar com command center e alternadores de layout, rail só de painéis, explorer de 22px com guias, abas com borda de ação, status bar de 22px, paleta no topo, **painel de detalhes** à direita (perfil/linguagens ou linguagens/estrutura do case) | `NavBar`, `ActivityBar`, `Explorer`, `EditorTabs`, `Footer`, `CommandPalette`, `Inspector` |
| M5 | **Home**: nome grande, perfil como código (`perfil.ts`), projetos fixados com barra de linguagens, **grade de pixels** escrevendo DEVELOPER/REACT/JAVA/SQL/PYTHON/LINUX, commits reais do repositório e atalhos do terminal | `Hero`, `ContributionArt`, `pixel-font.ts` |
| M6 | **Projetos**: lista ↔ grade, busca e filtro por linguagem; a capa de cada projeto é um **trecho real** do repositório com a linha e o link | `Projects`, `ProjectCard`, `CodeBlock`, `highlight.ts` |
| M7 | **Case no formato de página de extensão**: ícone, repositórios, linguagens e ações; abas pelo hash (todas no HTML); coluna "Em números / Stack / Recursos"; aba Código com o trecho real — no Linux Lab, a **mini-missão** que aprova `chmod 700` e `chmod u=rwx,go=` e reprova `755` | `CasePage`, `caseTabs`, `CaseSection`, `MissionTry`, `lib/mission.ts` |
| M8 | **Terminal interativo**: `help`, `ls`, `cd`, `cat`, `open`, `theme`, `lab`, `git log`, `whoami`, `contato`, `history`, `clear`; histórico ↑↓, Tab, Ctrl+L; comandos pedidos pela interface chegam por uma fila | `Terminal`, `terminal-bus.ts` |

## Verificação (gate)

- ESLint limpo · `tsc --noEmit` limpo · Vitest **66/66** (8 testes novos:
  mini-missão, terminal, temas, abas do case, linguagens e trecho de código).
- Build ok — **9 HTMLs** pré-renderizados (6 cases) + sitemap + robots.
- Orçamentos: **JS inicial 85,7/110 KB** (+10,1) · maior lazy 5,9/35 KB ·
  **CSS 23,7/25 KB** (+2,3; ficou perto do teto — próxima release que somar
  CSS precisa compensar).
- Conferência visual em Chromium (desktop 1440/1920, celular 390; Dark
  Modern, Light Modern, Dracula): terminal, mini-missão, filtros, abas, grade
  de pixels e paleta funcionando; sem rolagem horizontal no celular.

## Observações técnicas

- **Hidratação e `vite preview`:** o preview local serve a home para
  `/projetos` (sem barra) e isso gera erro de hidratação **só localmente**
  (já acontecia antes). A Vercel serve a página certa (`trailingSlash: false`
  no `vercel.json`). Servindo o HTML certo, as rotas hidratam sem erro.
- **Abas do case pelo hash:** o SSR entrega a primeira aba visível e as
  outras com `hidden` (conteúdo no HTML para SEO); links antigos para seções
  (`#desafios`) abrem a aba que as contém. O `ScrollManager` não rola o
  editor ao trocar de aba.
- **Contraste:** `text-3` subiu para `#8b8b8b` (Dark Modern) e `#6e6e6e`
  (Light Modern); links usam o azul de link do tema, não o de ação.
- **Linguagens por projeto** são aproximadas (bytes de código por extensão nos
  repositórios públicos, sem testes/dependências) e a interface diz isso.

## O que foi recusado (e por quê)

- **Degradês, brilho, pulsação e manchas borradas** (mockup v1): recusados
  pelo Francisco; proibidos pelo ADR-0018.
- **Histórico real na grade de pixels:** pedido explícito de usar palavras; o
  texto não chama de contribuição e aponta para o histórico real no GitHub.
- **Screenshots ou ilustrações nas capas:** sem material real ainda; o trecho
  de código é verificável.

## Pendências geradas

- **Validação em navegador pelo Francisco** desta release (preview da
  Vercel), em especial: legibilidade das palavras na grade, tamanho do texto
  dos diagramas na aba Arquitetura e os temas Dracula/Monokai.
- **CSS a 1,3 KB do teto.**
- Números do Linux Lab (127 commits, 69 arquivos de teste, incrementos 01–09)
  são de 2026-10-18 — atualizar quando o projeto avançar.
- O selo "Novo" do Linux Lab é conteúdo (`isNew`) — retirar quando deixar de
  ser novo.

## Veredito

Gate verde. Release pronta para validação no preview da branch.
