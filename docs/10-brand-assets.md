# 10 — Brand Assets

> Especificação de todos os ativos de marca reutilizáveis. Wordmark decidida
> no ADR-0009; princípios visuais no [02-brand-guide.md](02-brand-guide.md).
> Os assets são **gerados por código** (`npm run assets:brand`) — a
> especificação abaixo é o contrato do script; nada é desenhado à mão.

---

## 1. Wordmark

```
franciscopedro.dev
└────────┬───────┘└┬┘
  JetBrains Mono   JetBrains Mono
  600 · text       400 · text-3
```

- Uso no header: 14px (`text-small`); nunca maior que os links de navegação
  em mais de um passo da escala.
- Em fundo claro (não existe na v1): inverter para os neutros equivalentes.
- Nunca: colorir o domínio inteiro, aplicar a tinta de ênfase em `.dev`, render
  a wordmark na sans de corpo (IBM Plex Sans) — ela é sempre mono.

## 2. Monograma (superfícies quadradas)

`fp.` em JetBrains Mono 600 — `fp` na cor de texto, ponto na tinta de ênfase —
sobre tile `#212429` (surface) com borda 1px `#2E323A` e raio proporcional (25%
do lado); valores da paleta ardósia-fria da Release 0.9 (doc 04 §1, ADR-0016).
Uso exclusivo: favicon, app icons, avatares. O monograma nunca aparece dentro
das páginas — lá, a marca é a wordmark.

## 3. Matriz de ícones

| Asset | Tamanho | Notas |
|---|---|---|
| `favicon.svg` | vetorial (base 64px) | Texto convertido em paths — não depende de fonte instalada |
| `icons/icon-192.png` | 192×192 | Manifest |
| `icons/icon-512.png` | 512×512 | Manifest, `purpose: maskable` — conteúdo dentro da zona segura de 80% |
| `apple-touch-icon.png` | 180×180 | Fundo opaco (iOS não aceita transparência), sem raio (o iOS aplica o dele) |

## 4. Open Graph / Social Preview

**`og/site-og-default.png`** — 1200×630, PNG:

- Fundo `#1A1C20` com borda interna 2px `#2E323A` (evita "sangrar" no card
  claro de quem incorpora).
- Nome `Francisco Pedro` — mono 600, grande, cor de texto.
- Papel `Desenvolvedor de Sistemas & Analista de Dados` — mono 400, `text-2`.
- Rodapé: wordmark `franciscopedro.dev` pequena, com ponto na tinta de ênfase.
- Sem foto, sem screenshot: a default precisa funcionar para qualquer página.

Derivações (mesma composição, título variável):

| Template | Título | Quando |
|---|---|---|
| Case (v1) | nome do projeto + `estudo de caso` | Uma por case, gerada pelo mesmo script |
| Artigo (v2) | título do post | **Imagem padrão de artigos**: template com o título; nenhum artigo publica sem OG própria |

**Social preview do repositório GitHub:** usar o mesmo `site-og-default.png`
(upload manual em Settings → Social preview — passo único do Francisco).

## 5. Placeholders

Política definida no doc 12 §5 (fundo `surface`, nunca imagem falsa). Não
existe "imagem placeholder de marca" — a ausência de mídia omite a seção;
isso é decisão de honestidade editorial (charter §7), não falta de asset.

## 6. Consistência

- Qualquer asset novo de marca nasce no script de geração com os tokens do
  doc 04 — se o acento mudar um dia, `npm run assets:brand` regenera tudo.
- Os PNGs gerados são commitados (assets estáticos; o CI não os regenera).
- Proibido: variações de cor por contexto, versões "comemorativas",
  logo animado.
