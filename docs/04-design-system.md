# 04 — Design System

> Normatização completa do sistema visual. Implementado como tokens do
> Tailwind — este documento é a fonte da verdade; o `tailwind.config` /
> `@theme` apenas o transcreve. Princípios e justificativas de marca no
> [02-brand-guide.md](02-brand-guide.md).

---

## 1. Tokens de cor

> **Dois temas (mecanismo da ADR-0013; valores da Release 0.9, ADR-0016).** O
> escuro é o default (`:root`); o claro é override por atributo
> (`:root[data-theme="light"]`). A tabela §1.1–1.3 é o tema escuro; a §1.5 é o
> claro. Toda cor nova precisa de valor nos dois temas — **sempre medida** por
> script OKLCH → WCAG sobre os pixels renderizados (o Lighthouse é o juiz final;
> `axe` não pinta pixels — lição da 0.5).

### 1.1 Neutros (Dim Sage — Release 0.9, ADR-0016)

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0C110D` | Fundo global e do editor (canvas plano) |
| `surface` | `#141916` | Barras do workbench, painéis, blocos de código |
| `surface-2` | `#1D231F` | Elevação secundária (hover, tags, tooltips) |
| `surface-3` | `#272E29` | Estado ativo/selecionado, superfície elevada |
| `border` | `#323934` | Bordas padrão (1 px) — hairline afinada |
| `border-strong` | `#4A524C` | Bordas de elementos interativos em hover/foco |
| `text` | `#E3E8E4` | Texto primário, títulos (não é branco puro — baixo glare) |
| `text-2` | `#B9C0BB` | Texto secundário, parágrafos longos |
| `text-3` | `#8E9690` | Metadados, captions, placeholders |

Justificativa: neutros de undertone **verde-sálvia** em OKLCH — undertone único
e comprometido (M0 princípio 2), o oposto do cinza-neutro-por-comitê e do
âmbar-sobre-grafite da 0.8 que liam como template de IA. **Long-session first**
(M0 princípio 12): o texto primário **não é branco puro** e o contraste de topo é
contido — menos glare na leitura prolongada. A rampa é de **quatro superfícies**
— `bg` (canvas) < `surface` (cromo) < `surface-2` (hover) < `surface-3` (ativo)
— com definição entre planos ampliada e hairlines afinadas: profundidade por
plano **sem sombra** (ADR-0015). Três níveis de texto bastam; mais diluem a
hierarquia (a rampa tem folga medida para um 4º nível de cromo esmaecido, a
introduzir só quando houver consumidor — doc 04 §9).

Contrast check (medido, OKLCH → WCAG): `text` **15,4:1** sobre `bg` · `text-2`
**9,6:1** sobre `surface` · `text-3` **5,9:1** sobre `surface`. **`surface-3`
(linha ativa):** `text` 11,2:1 · `text-2` **7,5:1** — a restrição de pareamento
da 0.8 caiu: `text-3` agora atinge AA até sobre `surface-3`. Todos os pares de
texto ≥ AA (4,5:1) em qualquer tamanho; hairline `border-strong`/`surface`
2,2:1 (visível). Nos dois temas.

### 1.2 Acento (pinho — ADR-0016)

| Token | Hex | Uso |
|---|---|---|
| `accent` | `#5ACABA` | Foco, estados ativos, marcadores, ponto do logo |
| `accent-bright` | `#6CE2D1` | Hover de link, foco |
| `accent-dim` | `rgba(90, 202, 186, 0.13)` | Fundos sutis (item ativo do explorer, seleção) |

Contraste de `accent` sobre `surface`: **9,0:1** (sobre `bg` 9,6:1) — serve para
texto de qualquer tamanho e para o anel de foco (mais evidente que o âmbar da
0.8, ainda contido). O acento **indica** (foco, estado); nunca pinta superfícies.

**Regras de contenção** (invioláveis): o acento nunca preenche botões grandes,
nunca coloriza títulos inteiros, nunca aparece em mais de ~5% da área visível.

### 1.3 Estados semânticos

| Token | Hex | Uso |
|---|---|---|
| `success` | `#89D298` | Raro — indicadores "online/em produção", gate verde |
| `danger` | `#ED756E` | Raro — erros de navegação (404) |

`success`/`danger` sobre `surface` ≥ 6:1 (dark) e ≥ 4,4:1 (light), como sinal
(UI ≥ 3:1). Sem `warning` na v1: não há caso de uso. As **cores de documento do
git** (adicionado/modificado/removido) entram na M3, quando o Explorer as
consumir — nenhum token nasce sem uso (§9).

### 1.4 Canvas da IDE — retirado na Release 0.8 (ADR-0015)

O grid decorativo + ruído (`grid-line`, `body::before`) da 0.6 **deixou de
existir**: era textura sem função — um "tell" de screenshot e de estética de
IA. A estrutura passa a vir das réguas reais do cromo (bordas de painel); o
fundo é `bg` chapado, plano de software (Zed/Linear). Nenhum token de grid.

### 1.5 Tema claro (Dim Sage claro — Release 0.9, ADR-0016)

Paleta clara verde-sálvia, monocromática e de baixo contraste-de-topo (não
"site de IA"): papel off-white esverdeado e acento **pinho profundo** (o pinho
claro do escuro reprova o contraste no claro). Override dos mesmos tokens sob
`:root[data-theme="light"]`.

| Token | Hex / valor | Uso |
|---|---|---|
| `bg` | `#F5FAF6` | Fundo global e do editor |
| `surface` | `#E8EFE9` | Barras do workbench, painéis |
| `surface-2` | `#DCE4DD` | Elevação secundária (hover, tags, tooltips) |
| `surface-3` | `#D0DAD2` | Estado ativo/selecionado, superfície elevada |
| `border` | `#D1DAD3` | Bordas padrão |
| `border-strong` | `#B3BEB6` | Bordas interativas em hover/foco |
| `text` | `#1F2621` | Texto primário, títulos |
| `text-2` | `#475049` | Texto secundário |
| `text-3` | `#606962` | Metadados, captions, placeholders |
| `accent` | `#00706B` | Foco, estados ativos, marcadores |
| `accent-bright` | `#005A55` | Hover de link, texto sobre `accent-dim` |
| `accent-dim` | `rgba(0, 112, 107, 0.09)` | Fundos sutis (item ativo, seleção) |
| `success` | `#1D7D3E` | Indicadores "em produção" |
| `danger` | `#BE2323` | Erros de navegação (404) |

Contrast check (medido, OKLCH → WCAG): `text` **14,7:1** · `text-2` 7,9:1 ·
`text-3` 5,4:1 sobre `bg`; sobre `surface`, `text-2` 7,2:1 e `text-3` **4,9:1**;
sobre `surface-3` (linha ativa), `text-2` 5,8:1. `accent` sobre `surface`
**5,1:1** (serve como texto e foco); `accent-bright` 6,9:1. Todos os pares de
texto ≥ AA (4,5:1).

## 2. Tipografia

### 2.1 Famílias

| Papel | Família | Fallback |
|---|---|---|
| Display / títulos / corpo | **Inter** (variable, `wght` 400–700) | `system-ui, sans-serif` |
| Técnica (labels, datas, tags, números) | **JetBrains Mono** (400/600) | `ui-monospace, monospace` |

Carregamento: self-hosted, `woff2`, subset latin, `font-display: swap`,
preload apenas da Inter (a mono não bloqueia o primeiro render).

### 2.2 Escala tipográfica

Escala **contida, de infraestrutura** (Release 0.8): uma única voz, teto de
40 px, corpo denso de 15 px. A 0.7 usava escala de landing (display 56, body
16) — quatro vozes competindo; a 0.8 aperta e unifica. Base 15 px, razão ~1.2:

| Token | Tamanho / linha | Peso | Tracking | Uso |
|---|---|---|---|---|
| `display` | 40 / 44 (mobile: 32 / 36) | 600 | −0.03em | Identidade (cabeçalho do doc `overview`), 1× por página |
| `h1` | 28 / 34 (mobile: 24 / 30) | 600 | −0.02em | Título de case |
| `h2` | 21 / 28 | 600 | −0.02em | Título de documento/seção |
| `h3` | 17 / 24 | 600 | −0.01em | Subtítulo, título de linha |
| `body-lg` | 17 / 28 | 400 | 0 | Parágrafo de abertura (lead do documento) |
| `body` | 15 / 24 | 400 | 0 | Texto padrão |
| `small` | 13 / 20 | 400 | 0 | Notas, metadados de leitura |
| `label` | 12 / 16 · mono | 600 | +0.08em, caps | Rótulos, datas, tags, chrome |

Regras: medida de leitura 65–75ch (`max-w-prose`); títulos nunca em caixa alta
(caixa alta é exclusividade do `label` mono); um único `display` por página. A
mono (JetBrains) é a voz dos metadados (caminho, datas, git); a Inter é a voz
do documento — sem uma terceira "voz de marketing".

## 3. Espaçamento, grid e raios

### 3.1 Escala de espaçamento

Base 4 px (escala Tailwind padrão). **Dois ritmos intencionalmente diferentes**
(Release 0.8) — a quebra de cadência nasce da diferença de função, nunca de
aleatoriedade nem de múltiplos uniformes de 8:

- **Cromo (apertado):** `2 / 4 / 6 / 8 / 10 / 12 / 16` — controles, chips,
  árvore, tabs, status. É a densidade de software.
- **Leitura (respira):** `12 / 16 / 20 / 24 / 32` — dentro do documento, entre
  parágrafos e blocos. Respira o suficiente para ler, não para "landing".

Valores canônicos (Release 0.8 — mais densos que a 0.6.1):

| Contexto | Valor |
|---|---|
| Padding do documento no editor | 20 px · 28–32 px lateral em md+ |
| Cabeçalho do documento → corpo | 16 px (era 32 na 0.7) |
| Entre blocos do documento | 24 px |
| Entre painéis / padding interno de painel | 8–16 px |
| Chrome do workbench | title bar 48 px · tabs ~36 px · status bar ~28 px |

### 3.2 Grid

- A aplicação ocupa a viewport (`100dvh`); colunas do workbench: rail 48 px
  (md+) · explorer 240 px (lg+) · editor fluido.
- O conteúdo do editor é alinhado à esquerda com `max-w-prose` na leitura;
  grades internas (painéis, extensões) usam 2 colunas em md+.
- Mobile: coluna única dentro do editor.

### 3.3 Raios e bordas

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 4 px | Tags, badges, inputs, itens de chrome |
| `radius-md` | 6 px | Botões, molduras |
| `radius-lg` | 8 px | Molduras de screenshot, diagramas |

Raios apertados: cara de IDE, não de card. Bordas sempre 1 px. **Elevação por
plano, não por sombra:** o cromo fixo é plano (rampa `bg → surface → surface-2
→ surface-3` + hairline). A **única sombra** do sistema é a utilitária
`.elevated` (doc 04 §3.3, Release 0.8), reservada a superfícies de fato
**flutuantes** — paleta de comandos, menus, tooltips, drawer mobile. Fora
delas, sombra é lama visual, sobretudo no escuro.

### 3.4 Scrollbar (Release 0.7)

Utilitária `.scrollbar-ide` (CSS puro): fina, thumb `border-strong` que some
no fundo e vira `text-3` no hover; trilho transparente. Aplicada aos painéis
roláveis do workbench (editor, explorer, painel inferior). O único scroll da
aplicação continua sendo o do editor (`#editor-scroll`, ADR-0011).

## 4. Breakpoints

Padrão Tailwind — sem customização (menos surpresa, mais documentação):

| Token | Largura | Layout |
|---|---|---|
| (base) | <640 px | Coluna única no editor; navegação pelo menu overlay |
| `sm` | ≥640 px | Botões lado a lado, grade de tags |
| `md` | ≥768 px | Painéis 2 colunas, ActivityBar (§6.13), nav no title bar |
| `lg` | ≥1024 px | Explorer (§6.14) — o workbench completo; índice lateral nos cases |
| `xl` | ≥1280 px | Só aumenta respiro; nenhum elemento novo |

## 5. Motion

Faixa única da Release 0.7: **120–180 ms** — movimento de software, não de
site. Nada anima por mais de 180 ms (apertado desde a 0.6, que ia a 220).

| Token | Valor | Uso |
|---|---|---|
| `duration-fast` | 120 ms | Hover, foco, press, tooltips, ripple |
| `duration-base` | 150 ms | Comutação de view (`view-in`), overlay do menu |
| `duration-slow` | 180 ms | Revelação no scroll do painel (uma vez só) |
| `ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Tudo |

Padrões permitidos: fade + deslocamento vertical ≤8 px na entrada de seções
(`whileInView`, `once: true`); transição de opacidade entre rotas; `scale`
0.98 em press de botão. Padrões proibidos: parallax, loops infinitos,
stagger longo (>80 ms por item), animação de texto letra a letra.

`prefers-reduced-motion`: todas as animações de entrada viram render direto
(sem fade/translate); transições de rota viram corte seco. Implementação em
**CSS** (`@media (prefers-reduced-motion: reduce)`) e, no JS, via `matchMedia`
— o `framer-motion` saiu da entrada na Release 0.7 (a revelação de scroll é
CSS + IntersectionObserver no `Reveal`).

## 6. Componentes

Cada componente existe por uma razão; se dois casos de uso divergem, criam-se
variantes — nunca `props` booleanas empilhadas sem critério.

### 6.1 `Button`

Justificativa: unificar as ações (hero, header, cases) num único contrato.

| Variante | Aparência | Uso |
|---|---|---|
| `primary` | Fundo `text` (claro), texto `bg` (escuro) | 1 por contexto — ação principal (Currículo no hero) |
| `secondary` | Fundo `surface-2`, borda `border`, texto `text` | GitHub, LinkedIn, ações paralelas |
| `ghost` | Sem fundo, texto `text-2` → `text` em hover | Header, navegação de case |

Anatomia: altura 40 px (44 px de alvo garantido), padding 16–20 px, `radius-md`,
ícone opcional 16 px à esquerda, sempre com rótulo textual.
Estados: hover (fundo um nível acima + borda `border-strong`), focus-visible
(anel 2 px `accent` com offset 2 px), press (`scale` 0.98), disabled não existe
na v1 (nenhum caso de uso).
Decisão notável: o botão primário é **claro, não teal** — reforça a regra de
contenção do acento e dá aparência editorial.

**Release 0.8:** os variants preenchidos (`primary`/`secondary`) saíram do
**conteúdo** — as ações dos documentos (overview, contato, cases) são
**afordâncias de workspace**: links mono em linha (`GitHub ↗`, `Contato →`),
não botões de campanha (ADR-0014). O `Button` permanece para controles de
**chrome** (o gatilho "Menu" no mobile, o "Fechar" do menu — `ghost`).

### 6.2 `Tag`

Justificativa: vocabulário visual único para tecnologias em cards e cases.
Mono 13 px, `surface-2`, borda `border`, `radius-sm`, sem interação na v1.
Nunca usar cor por tecnologia (arco-íris de badges é ruído).

### 6.3 `Badge`

Justificativa: metadado de status de um projeto (ex.: `EM PRODUÇÃO`, `TCC`,
`EM EQUIPE`). Mesmo estilo do `label` mono + ponto de 6 px (`accent` ou
`success`). Diferença para `Tag`: `Badge` qualifica o projeto, `Tag` lista
tecnologia.

### 6.4 `Card` (projeto)

Justificativa: porta de entrada dos cases; precisa vender profundidade sem
virar banner. Desde a Release 0.6.1 é uma **linha de arquivo** do workbench,
não um cartão nem um painel.

- Anatomia: linha de arquivo (`projectFile` — `{slug}.{ext}`, extensão
  derivada da primeira tag real do projeto — em mono decorativo + `Badge`
  de status), título `h3`, resumo de 1–2 linhas (`text-2`), linha de `Tag`s
  e seta `Ver estudo de caso →`. Linhas separadas por borda inferior, sem
  caixa. A moldura de screenshot entra quando os assets existirem.
- Variantes: `featured` (FastPass — resumo em `body-lg`) e `default`.
- Interação: a linha inteira é um link (`<a>` único envolvendo o conteúdo);
  hover eleva o fundo (`surface-2` a 50%) e desloca a seta 4 px. Sem zoom
  de imagem, sem glow.

### 6.5 `DocHeader` (Release 0.8, ADR-0014) — sucede `SectionHeading`

Abertura de **documento**, não de seção de marketing. Substitui o
`SectionHeading` (que tinha um `label` mono em caixa alta gritando a categoria
— "PROJETOS" — acima do título, o vocabulário de landing). A voz agora é de
documentação: um **comentário mono de topo de arquivo** (`// {propósito real}`,
com o `//` decorativo e `aria-hidden`) + título semântico + lead opcional. A
escala visual (`display`/`h1`/`h2`) é independente do nível do heading
(hierarquia sem saltos). No `overview`, a identidade é o cabeçalho: papel como
comentário, nome em `display`, ações como afordâncias de workspace (links mono),
não botões de campanha. `SectionHeading` sai à medida que as views migram (M3).

### 6.6 `NavBar` (title bar — Release 0.7)

A primeira faixa da aplicação (48 px, `surface`, borda inferior) com
aparência de software desktop. Esquerda: glyph âmbar + wordmark (nome do
workspace) · divisória · as views como **barra de menu** (item ativo
`surface-2` + `text`). Direita: **gatilho da paleta de comandos** (Release 0.8
— "Comandos ⇧⌘P", a entrada *command-first* visível que faltava para a
descoberta; dispara o mesmo evento do rail), indicador de **branch** (real, do
`git-log`), **controles de janela** decorativos (min/max/close, `aria-hidden`)
e, abaixo de md, o botão de menu que abre o overlay tela cheia (foco preso, Esc
fecha). Contrato: os 6 links de `site.nav` e o botão "Menu" seguem sempre
presentes (o `NavBar.test` os exige).

### 6.7 `Footer` (status bar — Release 0.7)

A última faixa (28 px, mono, `surface`, borda superior), densa como a de uma
IDE. Esquerda: branch (real, do `git-log`), **último commit** (hash em `accent`
+ data relativa viva — "hoje", "há 3d"; a relativa só após hidratar, o SSR
emite a data absoluta, sem mismatch — Release 0.8; clicar abre o Source
Control), contador de problemas (`✓ 0  △ 0`, verdadeiro), `Build · Tests ✓`.
Direita: fatos técnicos estáveis (UTF-8, TypeScript,
React, Vite, Pre-render, SSR, SEO, Vercel — que codificam o colofão + o
pipeline), os contatos de sempre, o link do repositório e o copyright
(conteúdo editorial preservado), e o `ThemeToggle`. Itens menos críticos
cedem espaço por breakpoint (somem por CSS, seguem no DOM).

### 6.8 `TimelineItem`

Justificativa: a trajetória é conteúdo central (O3) e merece componente
próprio. Linha vertical `border` à esquerda, marcador de 8 px (`accent` no
item atual, `border-strong` nos demais), data em `label` mono, título `h3`,
descrição 1–2 linhas `text-2`.

### 6.9 `CaseSection`

Wrapper das seções internas do estudo de caso: âncora própria, `SectionHeading`
reduzido (`h3`), `max-w-prose`. Garante que todos os cases tenham exatamente a
mesma tipografia e ritmo (RF04).

### 6.10 `ArchitectureDiagram`

Moldura para os diagramas SVG: fundo `surface`, borda, `radius-lg`, padding
32 px, legenda opcional em `small`. SVG com `role="img"` + `aria-label`
descrevendo o fluxo, e a mesma descrição disponível em texto no corpo do case
(diagrama nunca é a única fonte da informação).

### 6.11 `MediaFrame`

Moldura padrão de screenshot: borda 1 px, `radius-lg`, fundo `surface` durante
o carregamento, `<img>` com `width/height` explícitos (zero CLS), `loading="lazy"`
fora da primeira dobra, legenda opcional. Justificativa: screenshots são a
prova visual — moldura única impede a colagem de estilos diferentes.

### 6.12 `Inputs`

**Não existem na v1.** Não há formulário (decisão do charter §8). Registrado
para impedir que um formulário de contato entre "de brinde" na implementação.

### 6.13 `ActivityBar` (Release 0.7)

Rail de atividades (48 px, `surface`, borda direita), **visível em todas as
larguras** (adapta o mobile em vez de esconder), com dois tipos de item de
20 px (Lucide, monocromático): **comutadores de painel** (Explorer, Search,
Source Control, Settings — governam `activeView` no store, ADR-0012) e
**atalhos de conteúdo** (Projects, Skills, Experience, Contact — navegam),
separados por divisória; na base, gatilho da **Command Palette** e GitHub.
Estado ativo: ícone `accent` + marcador lateral de 2 px que anima (`mark-in`,
120 ms); press com `scale` sutil. Reclicar o painel ativo **recolhe** a
sidebar (lg+) ou fecha o **drawer** (mobile). Tooltip decorativo em mono;
nome acessível pelo `aria-label`. `nav` rotulado "Atividades".

### 6.14 `SidePanel` + `Explorer` (Release 0.7)

O `SidePanel` é o container do painel lateral (fundo `surface` a 60%, borda
direita) que o rail comuta pela `activeView`. Em `lg+` é coluna inline,
recolhível pela sidebar inteira, com largura `sidebarWidth` **arrastável e
persistida** por um `ResizeHandle` (`role="separator"`, ponteiro + setas,
clamp 208–480 px). Em **mobile (<lg)** vira **drawer** sobre o editor
(backdrop, Esc e botão fechar; `mobilePanelOpen` no store) — fica `invisible`
quando fechado (fora da árvore de acessibilidade).
Cabeçalho com o nome da view (`type-label`); corpo rolável com
`.scrollbar-ide`. Painéis pesados (Search, Source Control) são `lazy`.

O `Explorer` é o corpo da view `explorer`: a árvore **real** da aplicação,
com **colapso de pastas persistido** (ADR-0012) e chevrons que giram. `src/`
traz uma view por arquivo (`overview.tsx`, `engenharia.tsx`…) e a pasta
`projetos/` (o chevron recolhe; o nome abre `/projetos`; filhos são os 5
cases com extensão derivada da stack, via `projectFile`). Mono 14 px; item
ativo `accent-dim`. `nav` rotulado "Explorador".

### 6.15 `EditorTabs` (multi-tab — Release 0.7)

Numa IDE, navegar é abrir arquivos — e aqui há **multi-tab real**. A aba
`overview.tsx` é fixa; abrir qualquer arquivo (view, `projetos`, case,
`404.html`) cria a sua aba ao lado. O *conjunto* de abas abertas é estado de
cliente persistido (`openTabs`, ADR-0012); a **aba ativa deriva da URL**
(ADR-0004/0011 — SEO e voltar intactos), com linha superior `accent`, ponto
indicador e `aria-current="page"`. Fechar remove a aba e navega ao vizinho
(a overview é o piso); botão de 20 px com `aria-label` próprio, revelado no
hover. Overflow horizontal com `.scrollbar-ide`. Abaixo, o **breadcrumb**
(`aria-hidden`) reflete a trilha do arquivo atual (portfolio › src ›
projetos › case), com o último segmento realçado. Regra editorial: tabs e
breadcrumb são chrome (nomes derivados de rotas/slugs) — nunca inventados.

### 6.16 `Workbench` (Release 0.6.1)

O frame da aplicação (implementado no `App`): `100dvh`, `overflow-hidden`,
em faixas — title bar (§6.6) · [rail (§6.13) | side panel (§6.14) | editor] ·
status bar (§6.7). **Não existe scroll global**: o único
scroll é o do painel do editor (`#editor-scroll`), suave (respeitando
`prefers-reduced-motion`). As views da home ficam todas montadas e a ativa é
comutada pelo hash (ADR-0011); a comutação anima com `view-in` (180 ms, fade
+ 4 px). Landmarks: `header`, `nav`s rotulados, `main` único, `footer`.

### 6.17 `ThemeToggle` (Release 0.7)

Justificativa: uma IDE alterna tema, e a paleta de comandos expõe "Change
Theme". Botão da status bar (e comando da palette, M5) com ícone Lucide
(`Moon`/`Sun`, 13 px) + rótulo `Dark`/`Light` em mono. `aria-label` diz o
tema atual ("Alternar tema (atual: escuro)"). O tema já foi pintado antes do
React pelo script anti-flash (ADR-0013); o botão só troca e persiste (store
do ADR-0012). Sem estilo de tema inline — só alterna `data-theme` no `<html>`.

### 6.18 `SettingsPanel` (Release 0.7)

Corpo da view `settings` do `SidePanel`. Seção **Appearance**: seleção de
tema (a única parte funcional). Seção **Workspace**: retrato **verdadeiro** e
read-only do ferramental do repositório (Prettier, ESLint flat, TS strict,
Tailwind v4, Vitest, Vite + pre-render) — framed como `.vscode/settings`,
nada inventado ("Settings decorativo" do brief, mas honesto).

### 6.20 `SourceControlPanel` (Release 0.7, lazy)

Corpo da view `scm`. Lista os commits **reais** do repositório — gerados por
`scripts/gen-git-log.mjs` para `src/content/generated/git-log.ts` (snapshot
commitado, regenerado no `build`; `npm run gen:gitlog` avulso). Cabeçalho com
branch + contagem; cada item traz hash (`accent`), data e subject. Sem
histórico inventado: snapshot vazio vira um aviso honesto. Chunk `lazy`.

### 6.21 `SearchPanel` (Release 0.7, lazy)

Corpo da view `search`: input com ícone, contador `aria-live` e filtro
instantâneo (todos os termos, substring) sobre um índice do conteúdo **que
já existe** — views, cases (nome/resumo/stack/slug) e trajetória. Resultados
agrupados navegam para a rota/hash. Foco automático ao abrir (comando "Focus
Search"). Nenhum dado novo. Chunk `lazy`.

### 6.22 `Minimap` — removido na Release 0.8 (ADR-0015)

O minimap decorativo (silhueta de "código" que não representava conteúdo real)
**deixou de existir**: era cenografia — o "tell" máximo de screenshot. A
direita do editor passa a ser o espaço em branco honesto de um documento
alinhado à esquerda (Zed/JetBrains com minimap desligado), não uma régua falsa.

### 6.23 `CommandPalette` (Release 0.7, lazy)

Modal de comandos: `Ctrl/⌘+Shift+P` ou `F1` (host eager minúsculo só com o
listener; a paleta é `lazy`). Padrão combobox/listbox — input com
`aria-activedescendant`, setas navegam, Enter executa, Esc fecha, clique no
backdrop fecha. **Todo comando é ação real ou rota existente**: Go/Open
(navegação), View/Focus Search/Toggle Sidebar/Toggle Panel (store), Change
Theme, Open GitHub/Repository (externos). Nada decorativo.

### 6.24 `BottomPanel` (Release 0.7, lazy)

Painel inferior estilo VS Code (`Ctrl/⌘+J` ou clique no indicador de
problemas da status bar; `lazy`). Abas: **Problems** (reflete o gate — 0/0,
ESLint/tsc/Vitest/build), **Output** (pipeline real), **Terminal**
(transcript roteirizado dos comandos reais do projeto, com playback e cursor;
respeita `prefers-reduced-motion`), **Debug Console**, **Ports** (portas de
dev reais). Conteúdo honesto, derivado do projeto. `role="tablist"`.

## 7. Ícones

Lucide, 16 px (inline com texto), 20 px (botões), 22 px (ActivityBar) ou
12–14 px (chrome da IDE: tabs, breadcrumb, árvore), stroke 1.5, cor herdada
do texto. Ícones externos (`↗`) marcam links que saem do site. `aria-hidden`
por padrão — o texto adjacente (ou o `aria-label` do interativo) carrega o
significado.

## 8. Acessibilidade (regras transversais)

1. Um `h1` por página; hierarquia de headings sem saltos.
2. `:focus-visible` com anel `accent` em todo interativo — nunca `outline: none` sem substituto.
3. Skip link ("Pular para o conteúdo") como primeiro elemento focável.
4. Landmarks: `header`, `main`, `nav`, `footer` únicos e rotulados.
5. Contraste AA garantido pelos tokens (§1.1) — proibido criar pares fora da tabela.
6. Alvos de toque ≥ 44 px no mobile.
7. Imagens com `alt` descritivo real; decorativas com `alt=""`.
8. Testes com teclado e leitor de tela antes do deploy (checklist no doc 06).

## 9. Boas práticas de uso

- Nenhuma cor, tamanho ou espaçamento fora dos tokens deste documento —
  se faltar um valor, o token nasce aqui primeiro.
- Componente novo só com justificativa escrita (adenda a este doc).
- Variantes antes de novos componentes; composição antes de variantes.
- Exemplo canônico de composição de um documento da home (Release 0.8 — a
  `View` é o wrapper do gestor de views em `pages/Home`; o documento abre com
  `DocHeader`, não `SectionHeading`):

```
<View id="projetos" active={active} labelledBy="projetos-titulo">
  <DocHeader
    headingId="projetos-titulo"
    comment="seleção · 3 de 5 estudos de caso"
    title="Estudos de caso"
    lead="…"
  />
  <div class="mt-6 border-t border-border">
    <Card variant="featured" project={fastpass} />
    <Card project={apiFacial} /> …
  </div>
</View>
```
