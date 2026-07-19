# ADR-0016 — Identidade visual editorial-técnica: serifa, tinta sem hue, canvas de editor frio

**Status:** Aceito (decisão do Francisco, Release 0.9)
**Data:** 2026-07-18

## Contexto

O centroide da "cara de IA" se move. A 0.6.1 adotou grafite-quente + acento
âmbar para fugir do centroide **teal/ciano de IA** (doc 02 §3) — e funcionou
contra *aquele* centroide. A estrutura de IDE (workbench, views por hash,
explorer/git reais) é autoria genuína e afastou o portfólio do centroide
"SaaS-índigo".

Mas, olhando de novo em produção, a **textura de superfície** havia pousado no
*próximo* centroide de IA — o "premium/dark de ferramenta", também chamado
"dev-brutalist": grafite-quente + um acento-ouro tasteful + Inter (a sans-default
da IA) + cromo técnico fabricado (controles de janela decorativos, faixa de
"fatos" `UTF-8 · TypeScript · …` em voz de *read-out*). A estrutura era autoral;
a pele, não. O Francisco sentiu isso diretamente ("ainda tem cara de IA") e
pediu para sair — mantendo a estrutura de IDE, trocando a textura.

Uma tentativa anterior de identidade própria na 0.9 ("Dim Sage", commit
`b8cff3d`) foi revertida (`dfd1e89`) por ter sido decidida "antes da hora". Este
ADR registra a identidade que substitui aquela tentativa.

## Decisão

A identidade passa a ser **editorial-técnica** — "um engenheiro que escreve
bem". Mantém a estrutura de IDE (ADR-0011/0012), o conteúdo-documento (ADR-0014)
e o "sem cenografia" (ADR-0015); muda a **textura**:

1. **Tipografia de três vozes** (doc 04 §2): **Newsreader** (serifa) nos títulos
   de documento — voz humana, à esquerda e densa **dentro** do editor (não hero
   centrado de landing, que seria o *outro* centroide editorial); **IBM Plex
   Sans** no corpo e no cromo, no lugar da Inter; **JetBrains Mono** só onde é
   código/metadado.
2. **Acento sem hue** (doc 04 §1.2): a ênfase vira **tinta** (brilho, não cor) —
   clara no escuro (`#F4F6F9`), escura no claro (`#14120F`). Cor cromática só em
   `success`/`danger`. Links de conteúdo ganham afordância própria (sublinhado
   ou seta/ícone de marca). O reflexo da IA é *adicionar* um "pop of color";
   **não** adicionar é o desvio.
3. **Canvas de editor frio** (doc 04 §1.1): o grafite-quente `#121110` vira
   **cinza-ardósia frio** `#1A1C20` — no bairro do VS Code (calmo, de
   ferramenta), mas com temperatura própria. O tema claro segue papel-quente
   (assimetria de temperatura assumida como estado conhecido; harmonização é dial
   futuro).
4. **Cromo fabricado removido** (doc 04 §6.6/§6.7): controles de janela
   decorativos (NavBar) e a faixa de "fatos técnicos" (Footer) saem — o mesmo
   princípio do ADR-0015, aplicado à pele.
5. **Ícones de marca monocromáticos** (doc 04 §7): GitHub e LinkedIn ganham SVG
   de marca via `currentColor` — reconhecimento pela forma, cor pelo contexto (o
   LinkedIn **não** entra azul; honra a "tinta sem hue").

Relação com o ADR-0013: seu **mecanismo** de theming (dark default + override
`data-theme` + anti-flash) permanece **em vigor e inalterado**. O que este ADR
revisa são os **valores** de paleta/tipografia do doc 04 §1–2 e as escolhas de
marca do doc 02 §3 — não o mecanismo.

## Alternativas consideradas

- **Trocar só o hue do acento** (ouro → argila/terracota): rejeitado — move de um
  acento-IA para outro (terracota é hoje o coral do centroide editorial-IA). O
  delator é a *estrutura* "um acento tasteful sobre neutro", não o hue.
- **Clonar o `#1E1E1E` do VS Code:** rejeitado — é o cinza-dev mais genérico que
  existe; some a autoria. A ardósia fria fica no bairro, com temperatura própria.
- **Serifa em hero gigante centrado + bege:** rejeitado — é o centroide
  editorial-premium de IA. A serifa fica à esquerda, densa, dentro do editor.
- **Manter um ponto de cor comprometida** (vermelho-carimbo, chartreuse):
  registrado como fork em aberto; para um portfólio profissional, a tinta
  monocromática ganhou (e o vermelho colidiria com `danger`).
- **Renderizar o LinkedIn no azul da marca:** rejeitado — reintroduziria cor por
  decoração, contra a decisão 2.

## Consequências

- Doc 04 §1–2, §6.6/§6.7, §7 e doc 02 §3, doc 10 e doc 11 atualizados com a nova
  identidade; o `index.css` e o `generate-brand-assets.mjs` transcrevem.
- Toda cor cromática nova precisa de justificativa semântica — não há mais
  "acento decorativo" para onde fugir.
- Assets de marca regenerados (favicon/OG) no novo tom; ponto do monograma vira
  tinta.
- Gate verde na entrega (ESLint, `tsc`, Vitest 56/56, build; JS 75,1/110 KB, CSS
  21,3/25 KB). Contraste AA medido nos dois temas.
- Fica como estado conhecido a **assimetria de temperatura** entre os temas
  (escuro frio, claro quente) — harmonizar é decisão de release futura.
