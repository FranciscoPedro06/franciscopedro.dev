# 04 — Design System

> Normatização completa do sistema visual. Implementado como tokens do
> Tailwind — este documento é a fonte da verdade; o `tailwind.config` /
> `@theme` apenas o transcreve. Princípios e justificativas de marca no
> [02-brand-guide.md](02-brand-guide.md).

---

## 1. Tokens de cor

> **Dois temas (Release 0.7, ADR-0013).** O escuro é o default (`:root`); o
> claro é override por atributo (`:root[data-theme="light"]`). A tabela §1.1–1.3
> é o tema escuro; a §1.5 é o claro. Toda cor nova precisa de valor nos dois
> temas — sempre medida (o Lighthouse é o juiz; `axe` não pinta pixels).

### 1.1 Neutros (grafite quente — Release 0.6.1)

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#121110` | Fundo global e do editor |
| `surface` | `#191816` | Barras do workbench, painéis, blocos de código |
| `surface-2` | `#22201D` | Elevação secundária (hover, tags, tooltips) |
| `border` | `#2D2B27` | Bordas padrão (1 px) |
| `border-strong` | `#3C3934` | Bordas de elementos interativos em hover/foco |
| `text` | `#F2F0ED` | Texto primário, títulos |
| `text-2` | `#A7A29A` | Texto secundário, parágrafos longos |
| `text-3` | `#8E8981` | Metadados, captions, placeholders |

Justificativa: grafite **quente**, sem azul perceptível — a linguagem dos
editores profissionais (revisão 0.6.1: os neutros frios anteriores + teal
liam como "estética de IA"). Três níveis de texto bastam; mais níveis diluem
a hierarquia.

Contrast check (calculado na revisão 0.6.1): `text` 16,6:1 sobre `bg` ·
`text-2` 7,4:1 · `text-3` 5,4:1 — e `text-3` ≥ 4,68:1 até sobre
`surface-2`, o fundo mais claro. Todos os pares ≥ AA (4,5:1) em qualquer
tamanho de texto. (Lição da 0.5 mantida: contraste se mede, não se declara —
o Lighthouse real é o juiz.)

### 1.2 Acento

| Token | Hex | Uso |
|---|---|---|
| `accent` | `#D9A866` | Foco, estados ativos, marcadores, ponto do logo |
| `accent-bright` | `#ECC78F` | Hover de link, foco |
| `accent-dim` | `rgba(217, 168, 102, 0.12)` | Fundos sutis (item ativo do explorer, seleção) |

Contraste de `accent` sobre `bg`: 8,8:1 — serve para texto de qualquer
tamanho. O acento **indica** (foco, estado); nunca pinta superfícies.

**Regras de contenção** (invioláveis): o acento nunca preenche botões grandes,
nunca coloriza títulos inteiros, nunca aparece em mais de ~5% da área visível.

### 1.3 Estados semânticos

| Token | Hex | Uso |
|---|---|---|
| `success` | `#4ADE80` | Raro — indicadores "online/em produção" |
| `danger` | `#F87171` | Raro — erros de navegação (404) |

Sem `warning` na v1: não há caso de uso. Não criar token sem uso.

### 1.4 Canvas da IDE (Release 0.6)

| Token | Valor | Uso |
|---|---|---|
| `grid-line` | `rgba(242, 240, 237, 0.025)` | Linhas do grid do fundo global |

O fundo global é o canvas de uma IDE: grid de 48 px quase imperceptível +
ruído SVG (`feTurbulence`, opacidade 0,028) numa camada fixa atrás de todo o
conteúdo — CSS puro, sem canvas nem JS. Painéis e editores usam fundos
sólidos (`bg`, `surface`) por cima; o canvas só aparece no espaço negativo.
No tema claro `grid-line` é `rgba(28, 27, 25, 0.04)` (§1.5).

### 1.5 Tema claro (papel-quente — Release 0.7, ADR-0013)

Paleta clara, quente e monocromática (não "site de IA"): papel off-white e
acento **bronze** (o âmbar do escuro reprova o contraste no claro). Override
dos mesmos tokens sob `:root[data-theme="light"]`.

| Token | Hex / valor | Uso |
|---|---|---|
| `bg` | `#FAF9F7` | Fundo global e do editor |
| `surface` | `#F1EEE9` | Barras do workbench, painéis |
| `surface-2` | `#E7E3DC` | Elevação secundária (hover, tags, tooltips) |
| `border` | `#DED9D1` | Bordas padrão |
| `border-strong` | `#C7C0B4` | Bordas interativas em hover/foco |
| `text` | `#1C1B19` | Texto primário, títulos |
| `text-2` | `#55514B` | Texto secundário |
| `text-3` | `#5F5A52` | Metadados, captions, placeholders |
| `accent` | `#9A6B16` | Foco, estados ativos, marcadores |
| `accent-bright` | `#7A5410` | Hover de link, texto sobre `accent-dim` |
| `accent-dim` | `rgba(154, 107, 22, 0.14)` | Fundos sutis (item ativo, seleção) |
| `success` | `#15803D` | Indicadores "em produção" |
| `danger` | `#DC2626` | Erros de navegação (404) |

Contrast check (medido por script, mesma regra da §1.1): `text` 16,4:1 ·
`text-2` 7,5:1 · `text-3` 6,5:1 sobre `bg`; todos os três ≥ 5,3:1 até sobre
`surface-2`. `accent` sobre `bg` 4,45:1 (≥ 3:1 para foco/UI); `accent-bright`
6,4:1 (serve como texto). Todos os pares de texto ≥ AA (4,5:1).

## 2. Tipografia

### 2.1 Famílias

| Papel | Família | Fallback |
|---|---|---|
| Display / títulos / corpo | **Inter** (variable, `wght` 400–700) | `system-ui, sans-serif` |
| Técnica (labels, datas, tags, números) | **JetBrains Mono** (400/600) | `ui-monospace, monospace` |

Carregamento: self-hosted, `woff2`, subset latin, `font-display: swap`,
preload apenas da Inter (a mono não bloqueia o primeiro render).

### 2.2 Escala tipográfica

Base 16 px, razão ~1.25, ajustada à mão nos extremos:

| Token | Tamanho / linha | Peso | Tracking | Uso |
|---|---|---|---|---|
| `display` | 56 / 60 (mobile: 36 / 40) | 650 | −0.03em | Nome no hero |
| `h1` | 40 / 44 (mobile: 30 / 36) | 600 | −0.02em | Título de case |
| `h2` | 28 / 34 | 600 | −0.02em | Título de seção |
| `h3` | 20 / 28 | 600 | −0.01em | Subtítulo, título de card |
| `body-lg` | 18 / 29 | 400 | 0 | Parágrafo de destaque (hero, aberturas) |
| `body` | 16 / 26 | 400 | 0 | Texto padrão |
| `small` | 14 / 21 | 400 | 0 | Notas, footer |
| `label` | 13 / 16 · mono | 600 | +0.08em, caps | Rótulos de seção ("PROJETOS"), datas, tags |

Regras: medida de leitura 65–75ch (`max-w-prose`); títulos nunca em caixa alta
(caixa alta é exclusividade do `label` mono); um único `display` por página.

## 3. Espaçamento, grid e raios

### 3.1 Escala de espaçamento

Base 4 px (escala Tailwind padrão). Valores canônicos do workbench
(Release 0.6.1 — denso como software, não como landing page):

| Contexto | Valor |
|---|---|
| Padding da view / página no editor | 20–24 px · 32–40 px lateral em md+ |
| Título de view → conteúdo | 32 px |
| Entre painéis | 10–16 px |
| Padding interno de painel | 14–20 px |
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
| `radius-md` | 6 px | Botões, cards |
| `radius-lg` | 10 px | Molduras de screenshot, cards grandes |

Raios apertados (Release 0.7): cara de IDE, não de card. Bordas sempre 1 px.
**Sem sombras** na v1: elevação por cor de fundo (`surface` → `surface-2`) e
borda — sombras viram lama visual, sobretudo no tema escuro.

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
(sem fade/translate); transições de rota viram corte seco. Implementação via
`useReducedMotion` do Framer Motion — obrigatório em todo componente animado.

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

### 6.5 `SectionHeading`

Justificativa: ritmo repetido de abertura de seção — `label` mono
("PROJETOS") + `h2` + parágrafo opcional (`text-2`). Garante consistência de
hierarquia em todas as seções.

### 6.6 `NavBar` (title bar — Release 0.7)

A primeira faixa da aplicação (48 px, `surface`, borda inferior) com
aparência de software desktop. Esquerda: glyph âmbar + wordmark (nome do
workspace) · divisória · as views como **barra de menu** (item ativo
`surface-2` + `text`). Direita: indicador de **branch** (`⎇ main`, mono),
**controles de janela** decorativos (min/max/close, `aria-hidden`) e, abaixo
de md, o botão de menu que abre o overlay tela cheia (foco preso, Esc
fecha). Contrato: os 6 links de `site.nav` e o botão "Menu" seguem sempre
presentes (o `NavBar.test` os exige).

### 6.7 `Footer` (status bar — Release 0.7)

A última faixa (28 px, mono, `surface`, borda superior), densa como a de uma
IDE. Esquerda: branch, contador de problemas (`✓ 0  △ 0`, verdadeiro),
`Build · Tests ✓`. Direita: fatos técnicos estáveis (UTF-8, TypeScript,
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

Rail de atividades (48 px, `surface`, borda direita), visível em `md+`, com
dois tipos de item de 20 px (Lucide, monocromático): **comutadores de
painel** (Explorer, Settings — governam `activeView` no store, ADR-0012; e
Search + Source Control na M3) e **atalhos de conteúdo** (Projects, Skills,
Experience, Contact — navegam), separados por divisória; GitHub na base.
Estado ativo: ícone `accent` + marcador lateral de 2 px que anima (`mark-in`,
120 ms). Reclicar o painel ativo **recolhe** a sidebar (comportamento VS
Code). Tooltip decorativo em mono; nome acessível pelo `aria-label`. `nav`
rotulado "Atividades".

### 6.14 `SidePanel` + `Explorer` (Release 0.7)

O `SidePanel` é o container do painel lateral (fundo `surface` a 60%, borda
direita, `lg+`) que o rail comuta pela `activeView`; recolhível pela sidebar
inteira; largura `sidebarWidth` (arrastável na M3). Cabeçalho com o nome da
view (`type-label`); corpo rolável com `.scrollbar-ide`.

O `Explorer` é o corpo da view `explorer`: a árvore **real** da aplicação —
`src/` com uma view por arquivo (`overview.tsx`, `engenharia.tsx`…) e a
pasta `projetos/` (cabeçalho abre `/projetos`; filhos são os 5 cases com
extensão derivada da stack, via `projectFile`). Mono 14 px; item ativo
`accent-dim`. A árvore recursiva com colapso persistido entra na M3. `nav`
rotulado "Explorador".

### 6.15 `EditorTabs` (Release 0.6.1)

Justificativa: numa IDE, navegar é abrir arquivos. Faixa de tabs no topo do
editor + breadcrumb decorativo (`aria-hidden`), tudo **derivado da URL**
(ADR-0004/0011): a tab `overview.tsx` é fixa (a "welcome page") e o arquivo
aberto — view (`sobre.tsx`), pasta (`projetos`), case (`fastpass.tsx`) ou
`404.html` — entra ao lado, ativa (linha superior `accent` de 2 px, ponto
indicador, `aria-current="page"`), com **fechar funcional**: fecha para o
contexto de origem (view → overview; case → `/projetos`), alvo de 24 px,
`aria-label` próprio. A faixa é um `nav` rotulado "Arquivos abertos". Regra
editorial: tabs e breadcrumbs são chrome da metáfora (nomes derivados de
slugs/rotas existentes) — nunca código falso, nunca conteúdo inventado.

### 6.16 `Workbench` (Release 0.6.1)

O frame da aplicação (implementado no `App`): `100dvh`, `overflow-hidden`,
em faixas — title bar (§6.6) · [rail (§6.13) | explorer (§6.14) | editor] ·
status bar (§6.7). **Não existe scroll global**: o único scroll é o do
painel do editor (`#editor-scroll`), suave (respeitando
`prefers-reduced-motion`). As views da home ficam todas montadas e a ativa
é comutada pelo hash (ADR-0011); a comutação anima com `view-in` (200 ms,
fade + 4 px). Landmarks: `header`, `nav`s rotulados, `main` único,
`footer`.

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
- Exemplo canônico de composição de uma view da home (Release 0.6.1 — a
  `View` é o wrapper do gestor de views em `pages/Home`):

```
<View id="projetos" active={active} labelledBy="projetos-titulo">
  <SectionHeading label="PROJETOS" title="Estudos de caso" />
  <div class="border-t border-border">
    <Card variant="featured" project={fastpass} />
    <Card project={apiFacial} /> …
  </div>
</View>
```
