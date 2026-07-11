# 12 — Sistema de Imagens

> Estratégia completa de imagens: formatos, compressão, responsividade,
> carregamento, placeholders, nomenclatura e organização. Orçamentos no
> [06-technical-architecture.md](06-technical-architecture.md) §7; molduras
> de apresentação no [11-diagrams-and-mockups.md](11-diagrams-and-mockups.md).

---

## 1. Formatos

| Conteúdo | Formato | Fallback |
|---|---|---|
| Screenshots e foto | AVIF | WebP (via `<picture>`) |
| Diagramas | SVG (SVGO) | — |
| Ícones de marca (favicon, app icons) | SVG + PNG nos tamanhos exigidos | — |
| OG images | PNG (compatibilidade máxima com scrapers) | — |

Sem JPEG/PNG para fotografia: todo navegador do escopo (doc 01 RNF05)
suporta WebP; AVIF cobre ~95% e o `<picture>` resolve o resto.

## 2. Pipeline de produção

```
assets-src/            (originais, fora do bundle — PNG/screenshot cru)
   └─ {projeto}/
        fastpass-hero.png
            │  npm run assets:images  (script com sharp)
            ▼
public/images/{projeto}/
        fastpass-hero-1600.avif / -1600.webp
        fastpass-hero-800.avif  / -800.webp
```

- Conversão e redimensionamento **no script, nunca à mão** — reprodutível e
  com parâmetros de compressão fixos no código.
- Compressão: AVIF `quality 55`, WebP `quality 78` (calibrados para
  screenshot de UI: texto nítido, gradientes limpos). Ajustes só por exceção
  documentada.
- Originais em `assets-src/` são versionados (fonte da verdade; o repositório
  aguenta — screenshots de UI comprimem bem).

## 3. Tamanhos canônicos

| Uso | Larguras geradas | `sizes` |
|---|---|---|
| Card de projeto | 800, 1200 | `(min-width: 1024px) 544px, 100vw` |
| Hero do case | 1600, 1200, 800 | `(min-width: 1024px) 1056px, 100vw` |
| Galeria do case | 1200, 800 | idem hero |
| Foto pessoal (hero) | 480, 720 | `(min-width: 1024px) 360px, 60vw` |
| OG image | 1200×630 fixo | — |

Duas a três larguras por asset bastam: mais variantes = mais build e cache
sem ganho perceptível.

## 4. Carregamento

- `loading="lazy"` + `decoding="async"` em tudo **abaixo da dobra**.
- A imagem LCP de cada página (foto no hero da home; hero do case) carrega
  eager com `fetchpriority="high"`.
- `width`/`height` explícitos em **toda** imagem — CLS zero por construção
  (validado por lint de revisão no `MediaFrame`, único caminho de renderização
  de imagem).

## 5. Placeholders

- Padrão: fundo `surface` do `MediaFrame` até o load — sem LQIP/blur-up.
  Justificativa: LQIP embute base64 no HTML pre-renderizado (peso em todas as
  páginas) para mascarar um carregamento que, dentro do orçamento do doc 06
  §7, é rápido demais para justificar a máscara.
- Screenshot ainda não fornecido (`[PENDENTE]`, doc 05 §7): o case publica
  **sem** a mídia — nunca imagem falsa, nunca caixa vazia com "em breve"
  (charter §7: nenhum dado inventado; seção ausente é omitida, doc 03 §6).

## 6. Nomenclatura

```
{projeto}-{contexto}[-{nn}]-{largura}.{ext}
fastpass-hero-1600.avif
fastpass-galeria-02-800.webp
edupass-card-800.avif
site-og-default.png          (assets de marca: prefixo "site")
```

Minúsculas, sem acentos, hífens; `{contexto}` ∈ `hero | card | galeria | og`;
numeração `nn` só quando há série. O nome descreve o uso, não o conteúdo —
renomear tela não renomeia arquivo.

## 7. Organização

```
public/
├─ images/
│  ├─ fastpass/ | facial/ | carrinho/ | edupass/ | reviva/
│  ├─ diagrams/           (SVGs — doc 11)
│  └─ site/               (foto pessoal, marca)
├─ og/                    (og-*.png, 1200×630)
├─ icons/                 (app icons PNG)
└─ favicon.svg
```

- `alt` obrigatório e descritivo, definido no conteúdo tipado (`MediaItem.alt`
  — o teste de contrato reprova `alt` vazio); decorativa não existe no
  sistema (toda imagem do site é informativa).
- Imagem sem dono no modelo de conteúdo não entra em `public/` — o que não é
  referenciado é apagado (revisão de sprint).
