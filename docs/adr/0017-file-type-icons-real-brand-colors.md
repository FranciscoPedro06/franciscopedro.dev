# ADR-0017 — Ícones reais de linguagem com cores de marca no FileGlyph

**Status:** Aceito (decisão do Francisco, validação da Release 0.9.2)
**Data:** 2026-07-19

## Contexto

O ADR-0016 estabeleceu o **acento sem hue**: ênfase por tinta, cor cromática
só onde é semântica (`success`/`danger`). Na Release 0.9.2, os glifos de tipo
de arquivo (`FileGlyph`) nasceram monocromáticos por esse princípio, e a
revisão registrou explicitamente: "cor por tipo seria decorativa; mudar isso
exige revisar o ADR". Na validação em navegador, o Francisco decidiu mudar:
**ícones reais das linguagens, nas cores reais** (React ciano, Python
azul/amarelo, Java azul/vermelho, JS amarelo, HTML laranja).

## Decisão

O `FileGlyph` usa os **logos oficiais das linguagens** (paths devicon inline,
mesmo padrão do `BrandIcon`) **com as cores de marca reais** — exceção
**escopada** ao ícone de tipo de arquivo.

A justificativa que a compatibiliza com o ADR-0016: no contexto de uma árvore
de arquivos, a cor do ícone de tipo **é informação, não decoração** — é
assim que toda IDE real funciona (VS Code, JetBrains): a cor identifica a
linguagem à distância, antes da leitura do nome. É o mesmo estatuto semântico
de `success`/`danger`, aplicado à identificação de tipo.

## Escopo (o que NÃO muda)

- **Ícones de marca de contato** (GitHub/LinkedIn) seguem monocromáticos —
  o LinkedIn **não** entra azul (ADR-0016 §5 intacto).
- **Conteúdo e cromo** seguem sob o acento-sem-hue: nenhuma cor decorativa
  em texto, links, superfícies ou estados.
- Gradientes dos SVGs originais são trocados por **cores chapadas oficiais**
  (IDs de gradiente colidiriam entre instâncias; menos ruído a 13 px) e
  ornamentos (sombra de chão do Python) removidos.

## Alternativas consideradas

- **Manter mono (stroked Lucide)**: era a versão anterior; recusada pelo
  Francisco — a forma sozinha a 13 px identifica menos que forma+cor.
- **Cor só no item ativo**: meio-termo rejeitado — perderia a identificação
  à distância, que é o valor da cor aqui.
- **Adicionar `devicon` como dependência**: rejeitado — só 5 ícones são
  usados; paths inline (como `BrandIcon`) custam ~2 KB gz e zero dependência.

## Consequências

- Doc 04 §7 atualizado; o fork "cor por tipo" registrado na 0.9.2 está
  **exercido e fechado**.
- Os ícones coloridos são os únicos pontos cromáticos não-estado da UI — se
  um dia a paleta de conteúdo ganhar cor, este ADR não serve de precedente:
  a exceção é do ícone de tipo, não da superfície.
- `FileGlyph` deixa de herdar `currentColor` (cores próprias); estados
  ativo/hover das linhas seguem legíveis pelo fundo (`accent-dim`) e pelo
  texto, não pelo ícone.
