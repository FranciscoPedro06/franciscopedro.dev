# 04 — Design System

> Normatização completa do sistema visual. Implementado como tokens do
> Tailwind — este documento é a fonte da verdade; o `tailwind.config` /
> `@theme` apenas o transcreve. Princípios e justificativas de marca no
> [02-brand-guide.md](02-brand-guide.md).

---

## 1. Tokens de cor

### 1.1 Neutros (base escura)

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0B0C0E` | Fundo global |
| `surface` | `#121316` | Cards, header com blur, blocos de código |
| `surface-2` | `#1A1C20` | Elevação secundária (hover de card, tags) |
| `border` | `#26282E` | Bordas padrão (1 px) |
| `border-strong` | `#34373F` | Bordas de elementos interativos em hover/foco |
| `text` | `#F4F4F5` | Texto primário, títulos |
| `text-2` | `#A1A1AA` | Texto secundário, parágrafos longos |
| `text-3` | `#898992` | Metadados, captions, placeholders |

Justificativa: neutros levemente frios, sem azul perceptível (evita o visual
"dashboard"). Três níveis de texto bastam; mais níveis diluem a hierarquia.

Contrast check (sobre `bg #0B0C0E`): `text` 17,8:1 · `text-2` 7,6:1 ·
`text-3` 5,6:1 — e `text-3` ≥ 4,9:1 até sobre `surface-2`, o fundo mais
claro. Todos os pares ≥ AA (4,5:1) em qualquer tamanho de texto. O valor
original de `text-3` (`#71717A`) declarava 4,6:1, mas media 4,05:1 — reprovado
pelo Lighthouse em produção e corrigido no pós-deploy da Release 0.5.

### 1.2 Acento

| Token | Hex | Uso |
|---|---|---|
| `accent` | `#2DD4BF` | Links, estados ativos, marcadores da timeline, ponto do logo |
| `accent-bright` | `#5EEAD4` | Hover de link, foco |
| `accent-dim` | `rgba(45, 212, 191, 0.12)` | Fundos sutis (tag ativa, seleção) |

Contraste de `accent` sobre `bg`: 10,3:1 — serve para texto de qualquer tamanho.

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
| `grid-line` | `rgba(244, 244, 245, 0.025)` | Linhas do grid do fundo global |

O fundo global é o canvas de uma IDE: grid de 48 px quase imperceptível +
ruído SVG (`feTurbulence`, opacidade 0,028) numa camada fixa atrás de todo o
conteúdo — CSS puro, sem canvas nem JS. Painéis e editores usam fundos
sólidos (`bg`, `surface`) por cima; o canvas só aparece no espaço negativo.

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

Base 4 px (escala Tailwind padrão). Valores canônicos do layout:

| Contexto | Valor |
|---|---|
| Entre seções da home | 128 px desktop · 96 px mobile |
| Título de seção → conteúdo | 48 px |
| Entre cards | 24 px |
| Padding interno de card | 24–32 px |
| Padding lateral da página | 24 px mobile · 32 px tablet |

### 3.2 Grid

- Container central: `max-width: 1120px`, centrado.
- Desktop: grid de 12 colunas, gutter 24 px. Hero usa 7+5 (texto+foto);
  cards de projeto secundários usam 2×2 (6+6) ou 4×3 conforme largura.
- Mobile: coluna única.

### 3.3 Raios e bordas

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 8 px | Tags, badges, inputs |
| `radius-md` | 12 px | Botões, cards |
| `radius-lg` | 16 px | Molduras de screenshot, cards grandes |

Bordas sempre 1 px. **Sem sombras** na v1: elevação por cor de fundo
(`surface` → `surface-2`) e borda — sombras em dark theme viram lama visual.

## 4. Breakpoints

Padrão Tailwind — sem customização (menos surpresa, mais documentação):

| Token | Largura | Layout |
|---|---|---|
| (base) | <640 px | Coluna única |
| `sm` | ≥640 px | Botões lado a lado, grade de tags |
| `md` | ≥768 px | Cards 2 colunas |
| `lg` | ≥1024 px | Grid completo, índice lateral nos cases, ActivityBar (§6.13) e status bar fixa (§6.7) |
| `xl` | ≥1280 px | Entra o Explorer (§6.14) — a moldura de IDE completa |

## 5. Motion

Faixa única da Release 0.6: **120–220 ms** — movimento de software, não de
site. Nada anima por mais de 220 ms.

| Token | Valor | Uso |
|---|---|---|
| `duration-fast` | 150 ms | Hover, foco, press, tooltips do rail |
| `duration-base` | 200 ms | Entrada de elementos, overlay do menu |
| `duration-slow` | 220 ms | Revelação de seção no scroll (uma vez só) |
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
virar banner. Desde a Release 0.6 é um **painel de IDE**, não um cartão.

- Anatomia: cabeçalho de arquivo (`{slug}.tsx` em mono decorativo + `Badge`
  de status, separado por borda) + corpo com título `h3`, resumo de 1–2
  linhas (`text-2`), linha de `Tag`s e seta `Ver estudo de caso →`.
  `radius-md`, fundo `surface`, borda `border`. A moldura de screenshot
  (`radius-lg`) entra no corpo quando os assets existirem.
- Variantes: `featured` (FastPass — largura total, resumo mais longo) e
  `default` (grade).
- Interação: o painel inteiro é um link (`<a>` único envolvendo o conteúdo);
  hover eleva a borda (`border` → `border-strong`) e desloca a seta 4 px.
  Sem zoom de imagem, sem glow.

### 6.5 `SectionHeading`

Justificativa: ritmo repetido de abertura de seção — `label` mono
("PROJETOS") + `h2` + parágrafo opcional (`text-2`). Garante consistência de
hierarquia em todas as seções.

### 6.6 `NavBar`

Title bar da moldura de IDE (Release 0.6): header fixo, 64 px, **largura
total**, fundo `bg` a 85% com `backdrop-blur`, borda inferior `border`
permanente. Esquerda: wordmark. Direita: links como itens de menu de
aplicação + `Button secondary` (Currículo). Mobile: botão de menu (44 px)
abre overlay tela cheia com os mesmos itens em `h3`, foco preso (focus
trap), fecha com Esc. Link ativo: fundo `surface-2` + texto `text`
(scroll-spy nas âncoras).

### 6.7 `Footer`

Status bar da moldura de IDE (Release 0.6): os mesmos contatos do hero, o
colofão técnico curto ("React · Vite · TypeScript — código no GitHub") e o
copyright, tudo em mono 13 px numa barra fina de fundo `surface` com borda
superior — **fixa na base em `lg+`**, empilhada no fluxo em telas menores.
Sem newsletter, sem mapa do site duplicado.

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

### 6.13 `ActivityBar` (Release 0.6)

Justificativa: a moldura de IDE precisa de um rail de atalhos que transmita
"aplicação", não "site". Rail vertical fixo à esquerda (56 px, fundo
`surface`, borda direita), visível só em `lg+`. Espelha a navegação
principal em ícones Lucide 22 px (`Início` + itens de `site.nav` + GitHub) —
nenhum destino novo. Estado ativo pelo mesmo scroll-spy da NavBar: ícone
`accent` + marcador de 2 px na borda esquerda. Tooltip decorativo em mono ao
hover/foco (o nome acessível vem do `aria-label`). `nav` rotulado "Atalhos".

### 6.14 `Explorer` (Release 0.6)

Justificativa: a sensação de árvore de arquivos é o coração da metáfora.
Painel fixo ao lado do rail (240 px, fundo `surface` a 60%, borda direita),
visível só em `xl+`. Árvore estática (sem estado de colapso) derivada de
`site.nav` e das coleções de projetos: grupo `home` (o arquivo
`francisco-pedro.tsx` + âncoras das seções) e grupo `projetos` (os 5 cases
como `{slug}.tsx`). Mono 14 px; item ativo com fundo `accent-dim`; chevrons
e ícones de arquivo decorativos. `nav` rotulado "Explorador".

### 6.15 `EditorPane` (Release 0.6)

Justificativa: o conteúdo principal deve parecer um arquivo aberto, não um
bloco flutuando. Moldura de editor com três faixas: tabs (mono 13 px, tab
ativa com linha superior `accent` de 2 px, ponto indicador e — quando é o
único arquivo — botão de fechar decorativo), breadcrumb decorativo
(`aria-hidden`, ex.: `portfolio › src › francisco-pedro.tsx`) e corpo.
Fundo `bg` sólido, borda `border`, `radius-md`; a faixa de tabs usa
`surface`. Quando as tabs navegam (os 5 cases), a faixa é um `nav` rotulado
com `aria-current="page"` na ativa. **Sem `overflow-hidden` no contêiner** —
o `position: sticky` do índice do case depende disso. Regra editorial: as
tabs e breadcrumbs são chrome da metáfora (nomes de arquivo derivados de
slugs/rotas existentes) — nunca código falso, nunca conteúdo inventado.

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
- Exemplo canônico de composição de uma seção da home:

```
<Section id="projetos">
  <SectionHeading label="PROJETOS" title="Estudos de caso" />
  <Card variant="featured" project={fastpass} />
  <div class="grid md:grid-cols-2 gap-6">
    <Card project={apiFacial} /> …
  </div>
</Section>
```
