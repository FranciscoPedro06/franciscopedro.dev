# 09 — SEO Foundation

> Estratégia completa de SEO. O copy (títulos e descriptions concretos) está
> no [05-content-strategy.md](05-content-strategy.md) §6; este documento
> define o **sistema** — padrões, mecanismos e como novas páginas entram sem
> decisão ad-hoc. Base técnica: pre-render no build (ADR-0002).

---

## 1. Arquitetura de metadados

Cada rota declara seu `SeoMeta` no conteúdo tipado (`seo` em `site.ts`,
`Project.seo`, futuramente `Post`). Um componente único (`lib/seo.ts`) aplica
os metadados por rota; o pre-render os grava no HTML estático. **Nenhuma
página existe sem SEO completo** — o teste de contrato falha o CI se `seo`
estiver ausente ou fora dos limites.

Limites validados por teste: título ≤ 60 caracteres; description entre 70 e
160.

## 2. Títulos

| Tipo de página | Padrão |
|---|---|
| Home | `Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados` |
| Estudo de caso | `{Projeto} — estudo de caso · Francisco Pedro` |
| Resume | `Currículo — Francisco Pedro` |
| 404 | `Página não encontrada · Francisco Pedro` |
| Artigo (v2) | `{Título do artigo} · Francisco Pedro` |

Regras: a marca sempre presente; o assunto sempre primeiro (exceto na home);
`·` como separador; sem palavras-chave artificiais.

## 3. Meta descriptions

Uma frase de valor + um concreto verificável. Sem call-to-action vazio
("confira!", "não perca"). Copy no doc 05 §6; limites no §1 acima.

## 4. Open Graph e Twitter Cards

Padrão em todas as páginas:

```
og:type         website (home, resume) | article (cases, posts v2)
og:title        = <title>
og:description  = meta description
og:image        1200×630 (doc 10 §4); default do site ou específica do case
og:image:alt    descrição textual da imagem
og:url          canonical da página
og:locale       pt_BR
og:site_name    Francisco Pedro
twitter:card    summary_large_image
```

Sem `twitter:site` (não há conta profissional a vincular na v1). Cases usam
`article:published_time`/`modified_time` quando fizer sentido factual.

## 5. Canonical URLs

- Host canônico: `https://franciscopedro.dev` `[PENDENTE — confirmar domínio;
  placeholder até o registro]`. Uma única forma: https, sem `www`, sem barra
  final (exceto a raiz).
- Toda página emite `<link rel="canonical">` absoluto e autorreferente.
- A plataforma (Vercel) redireciona 308: `www` → apex, `http` → `https`.
- Nenhum conteúdo acessível por duas URLs — variações de rota não existem
  por design (React Router com rotas exatas).

## 6. Robots e indexação

- `robots.txt`: `Allow: /` para todos os agentes + linha `Sitemap:`.
- 404: `noindex` via meta (SPA não controla status HTTP em fallback de
  hosting; o pre-render garante que apenas rotas reais tenham HTML).
- Preview deployments (Vercel) não indexam — a plataforma já emite
  `X-Robots-Tag: noindex` em previews; verificar após conectar o projeto.
- Sem cloaking, sem conteúdo condicional a user-agent.

## 7. Sitemap

`sitemap.xml` gerado no build a partir da **mesma lista de rotas do
pre-render** (fonte única — impossível divergirem). Inclui: home, 5 cases,
`/resume`. Exclui: 404. Sem `priority`/`changefreq` (ignorados pelos
buscadores; ruído). `lastmod` derivado do build.

## 8. Dados estruturados (schema.org / JSON-LD)

| Página | Schema | Campos |
|---|---|---|
| Home | `Person` | name, jobTitle, url, sameAs (GitHub, LinkedIn), knowsAbout |
| Home | `WebSite` | name, url |
| Estudo de caso | `BreadcrumbList` | Home → Projetos → {case} |
| Artigo (v2) | `Article` + `BreadcrumbList` | headline, datePublished, author → `Person` |

JSON-LD em `<script type="application/ld+json">` injetado no pre-render.
Decisão: **não** usar `SoftwareApplication` nos cases — a página descreve o
estudo de caso (obra autoral), não distribui o software; marcação enganosa é
pior que ausente.

## 9. Estratégia para páginas futuras

O processo para qualquer página nova (case, post, seção):

1. Conteúdo tipado com `seo` obrigatório (o build quebra sem ele).
2. Rota entra na lista única → pre-render + sitemap + canonical automáticos.
3. OG image: usa a default até existir específica (doc 10 §4).
4. Schema: cai no padrão da tabela do §8 conforme o tipo.

Para os **estudos de caso**, o ativo de SEO real é o conteúdo em si: são as
únicas páginas na web sobre esses projetos — profundidade e headings
semânticos (`h2` por seção canônica) valem mais que qualquer marcação.

Para os **artigos da v2**: slugs curtos e permanentes (`/escrita/{slug}`),
`Article` schema, OG image própria por post (template no doc 10 §4), RSS
(`/rss.xml`) gerado no build junto do sitemap.

## 10. O que este documento recusa

- Meta keywords (mortas desde 2009).
- Texto oculto para crawlers, FAQ schema sem FAQ visível, avaliações falsas.
- Blog spam de palavras-chave: a v2 publica engenharia real, no ritmo real.
