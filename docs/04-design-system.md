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
| `lg` | ≥1024 px | Grid completo, hero 2 colunas, índice lateral nos cases |
| `xl` | ≥1280 px | Só aumenta respiro; nenhum elemento novo |

## 5. Motion

| Token | Valor | Uso |
|---|---|---|
| `duration-fast` | 150 ms | Hover, foco, press |
| `duration-base` | 250 ms | Entrada de elementos, overlay do menu |
| `duration-slow` | 500 ms | Revelação de seção no scroll (uma vez só) |
| `ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Tudo |

Padrões permitidos: fade + deslocamento vertical ≤16 px na entrada de seções
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
virar banner.

- Anatomia: moldura de screenshot (`radius-lg`) + título `h3` + resumo de
  1–2 linhas (`text-2`) + linha de `Tag`s + seta `Ver estudo de caso →`.
- Variantes: `featured` (FastPass — largura total, screenshot maior, resumo
  mais longo) e `default` (grade).
- Interação: o card inteiro é um link (`<a>` único envolvendo o conteúdo);
  hover eleva o fundo (`surface` → `surface-2`) e desloca a seta 4 px.
  Sem zoom de imagem, sem glow.

### 6.5 `SectionHeading`

Justificativa: ritmo repetido de abertura de seção — `label` mono
("PROJETOS") + `h2` + parágrafo opcional (`text-2`). Garante consistência de
hierarquia em todas as seções.

### 6.6 `NavBar`

Header fixo, 64 px, fundo `bg` a 80% com `backdrop-blur`, borda inferior
`border` que só aparece após 8 px de scroll. Esquerda: wordmark. Direita:
links `ghost` + `Button secondary` (Currículo). Mobile: botão de menu
(44 px) abre overlay tela cheia com os mesmos itens em `h3`, foco preso
(focus trap), fecha com Esc. Link ativo: texto `text` + sublinhado 2 px
`accent` (scroll-spy nas âncoras).

### 6.7 `Footer`

Três linhas: contatos (mesmos links do hero), colofão técnico curto
("React · Vite · TypeScript — código no GitHub"), copyright. Fundo `bg`,
separado por borda superior. Sem newsletter, sem mapa do site duplicado.

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

## 7. Ícones

Lucide, 16 px (inline com texto) ou 20 px (botões), stroke 1.5, cor herdada
do texto. Ícones externos (`↗`) marcam links que saem do site. `aria-hidden`
por padrão — o texto adjacente carrega o significado.

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
