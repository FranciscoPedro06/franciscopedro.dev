# ADR-0014 — Conteúdo como documento

**Status:** Aceito (decisão do Francisco, Release 0.8)
**Data:** 2026-07-14

## Contexto

Até a 0.7 a moldura de IDE era fiel — `ActivityBar`, `Explorer`, `EditorTabs`
(abas derivadas da URL, fecháveis, persistidas), theming, painéis lazy —, mas
cada arquivo aberto no painel do editor renderizava uma **seção de landing
page centralizada**: `Hero` é literalmente `min-h-[60dvh] flex-col
justify-center` com `max-w-[62ch]`, e as demais views usam o padrão
`SectionHeading` (label mono + `h2` + descrição), o vocabulário de abertura de
seção de marketing. A aba diz `overview.tsx`; o conteúdo é um folheto.

Essa dissonância entre a casca (software) e o conteúdo (landing) foi o **achado
número 1 da Design Review da 0.8** ([release-0.8-design-review.md](../reviews/release-0.8-design-review.md)).
A metáfora da IDE estava cenográfica: o Explorer navega de verdade, mas o
destino trai a metáfora. Nenhuma quantidade de ajuste de espaçamento resolve
isso — o problema é de composição e de voz, não de padding.

## Decisão

O painel do editor renderiza o arquivo ativo **como um documento**, não como
uma seção de marketing. Concretamente:

1. **Leitura alinhada à esquerda e densa; sem centralização vertical.**
   `min-h`/`justify-center` no conteúdo estão proibidos. O conteúdo começa no
   topo do documento, como um arquivo aberto.
2. **Cabeçalho de documento no lugar do `SectionHeading` de marketing.** A
   identidade (nome, papel) vira o cabeçalho do arquivo `overview` — com
   metadados reais —, não um `display`-hero. Uma única voz tipográfica
   (infraestrutura da interface, não peça de marketing).
3. **Periferia funcional.** Uma trilha de símbolos/outline à direita, derivada
   dos próprios títulos do documento, distribui a atenção e usa a periferia
   (elimina a concentração central e a "direita morta").
4. **Restrição inviolável: o documento é HTML semântico.** Títulos reais,
   landmarks, prosa — o pre-render (ADR-0010), o SEO por rota e os contratos do
   `axe` sobrevivem inalterados. A metáfora é honrada por layout, tipografia e
   metadados **reais**, nunca por fingir um editor de código (sem `<canvas>`,
   sem texto de "código" falso, sem numeração de linha sobre prosa).

As views seguem comutadas por hash (ADR-0011) e a aba ativa segue derivada da
URL (ADR-0004/0011); **só a apresentação muda** — nenhuma rota ou arquitetura
de dados nova.

## Alternativas consideradas

- **Manter as seções centralizadas, só apertando o espaçamento:** rejeitado —
  trata o sintoma (densidade) e não a causa (composição de landing); a
  dissonância permanece.
- **Emulação completa do VS Code (renderizar código-fonte literal, numeração de
  linha na prosa, syntax highlighting falso):** rejeitado — vira gimmick, briga
  com conteúdo/SEO/a11y e é "uma cópia do VS Code", que o Francisco vetou
  explicitamente. Extraímos o princípio (*o arquivo é o meio*), não a pele.
- **Nova arquitetura de rotas/estado para "documentos":** rejeitado —
  desnecessário; as views continuam hash-driven (ADR-0011). A mudança é de
  camada de apresentação.

## Consequências

- Reconstruídos: o wrapper `View` (`pages/Home`), `SectionHeading` (como unidade
  de marketing repetida), a centralização do `Hero`, os variants de marketing do
  `Button`, e a apresentação de `FeaturedWork`, `Engineering`, `DataSection`,
  `Timeline`, `About`, `Contact`, `ProjectCard`, `CasePage`/`CaseSection`.
- O exemplo canônico de composição do doc 04 §9 é substituído.
- **Critério de aceite de toda a release** (regra do Francisco): *"se eu
  removesse todos os ícones e o Explorer, isto ainda pareceria software
  profissional?"* Se não, ainda há linguagem de landing escondida.
- SSR/SEO/`axe` e os 56 testes seguem verdes — o documento é HTML semântico;
  quebra qualquer um deles é regressão, não trade-off.
