# ADR-0018 — Visual de editor real: temas do VS Code, logos oficiais e código real

**Status:** Aceito (decisão do Francisco, aprovada sobre mockup navegável) ·
Substitui o ADR-0016 e amplia o ADR-0017
**Data:** 2026-10-18

## Contexto

O Francisco pediu o portfólio "lindo e interativo", no estilo de um portfólio
de referência construído como uma IDE ([arnofrxdd/ide-portfolio](https://arnofrxdd.github.io/ide-portfolio/)),
e a inclusão do Linux Lab como novo estudo de caso. A identidade da 0.9
(ADR-0016: serifa nos títulos, acento sem hue, cinza-ardósia) foi validada na
época, mas o pedido agora é outro: cor e interatividade.

Uma primeira proposta (mockup v1) usou degradês ciano→azul, logo com brilho,
selo pulsando e capas com manchas borradas. Foi **recusada** pelo Francisco
como "cara de IA". A proposta aprovada (mockup v2) é a de um **VS Code de
verdade**: as cores oficiais dos temas do editor, logos oficiais das
linguagens e código real dos repositórios.

## Decisão

1. **Cores = temas reais de editor.** O default é o **Dark Modern** do VS Code
   (editor `#1f1f1f`, cromo `#181818`); o claro é o **Light Modern**. Entram
   também **GitHub Dark**, **Dracula** e **Monokai**, com as cores oficiais de
   cada um. Mesmo mecanismo do ADR-0013 (`:root[data-theme=…]`, script
   anti-flash, estado de cromo do ADR-0012); os ids `dark`/`light` se mantêm.
2. **Onde há cor:** sintaxe (Dark+/Light+, tokens `sx-*`), logo de linguagem,
   estado (git/diagnóstico), o **azul de ação** do editor (botão primário, aba
   ativa, foco, badge) e o verde da grade de contribuições do GitHub. Texto de
   link usa o azul de link do tema (`link`), não o de ação — contraste AA.
3. **Proibido:** degradê, brilho/glow, pulsação, sombras neon, manchas
   borradas e qualquer cor sem papel. Movimento continua sob o doc 08.
4. **Logos oficiais** (devicon v2.16.0, MIT, `public/icons/tech/`) em
   arquivos, abas, chips de linguagem e tags — servidos como arquivo (zero
   bytes de JS, sem colisão de ids de gradiente). Amplia o ADR-0017 para além
   do `FileGlyph`.
5. **Código real como imagem de projeto.** Enquanto não há screenshots
   ([PENDENTE] doc 05 §7), a capa de cada projeto é um trecho **copiado** do
   repositório, com a linha real e o link para o arquivo (`Project.code`).
   Nada de código escrito para o site.
6. **Tipografia:** duas vozes — IBM Plex Sans (leitura, títulos, cromo) e
   JetBrains Mono (código). A serifa (Newsreader) sai.
7. **Página de projeto no formato de página de extensão do VS Code**: ícone,
   repositórios, linguagens e ações no topo; seções em abas comutadas pelo
   hash (todas no HTML, para pre-render e SEO); coluna de detalhes.

## Alternativas consideradas

- **Manter o ADR-0016 e só adicionar o Linux Lab:** não atende o pedido
  explícito de cor e interatividade.
- **Mockup v1 (degradês, brilho, ciano):** recusado pelo Francisco.
- **Ícones como SVG inline no JS (padrão anterior do FileGlyph):** ~60 KB de
  logos no bundle inicial; arquivos estáticos custam zero no orçamento.
- **Screenshots inventadas ou ilustrações nas capas:** violam a regra de
  nenhum dado inventado; o trecho real de código é verificável.

## Consequências

- O ADR-0016 deixa de valer (status na tabela de ADRs).
- Todo token de cor novo precisa de valor nos 5 temas (ou herdar o default
  com contraste aceitável).
- Contraste: `text-3` sobe para `#8b8b8b` no Dark Modern (≥ 4,5:1 sobre o
  editor) e `#6e6e6e` no Light Modern; o Lighthouse continua sendo o juiz.
- `Project` ganha `languages`, `code`, `facts`, `steps`, `milestones` e
  `isNew` — o contrato de conteúdo testa linguagens e o link do trecho.
- Os logos de terceiros ficam sob a licença do devicon
  (`public/icons/tech/LICENSE.txt`); as marcas seguem dos seus donos.
