# 11 — Diagramas e Mockups

> Padrão único para toda visualização técnica (diagramas) e de produto
> (mockups/screenshots). Diagramas e mockups são conteúdo de primeira classe
> nos estudos de caso — a consistência entre eles é o que faz cinco projetos
> diferentes parecerem um portfólio só.

---

## 1. Diagramas — princípios

1. **Um diagrama responde uma pergunta.** "Como os serviços conversam?" é um
   diagrama; "tudo sobre o sistema" são três.
2. **Máximo 7 nós.** Acima disso, dividir em dois diagramas ou subir o nível
   de abstração.
3. **A mesma identidade do site.** Tokens do doc 04 — nada de cores novas,
   nada de estilo "ferramenta de diagrama".
4. **Nunca a única fonte.** O texto do case descreve o mesmo fluxo; o
   diagrama acelera, não substitui (acessibilidade — doc 04 §6.10).

## 2. Anatomia visual (todos os tipos)

| Elemento | Especificação |
|---|---|
| Fundo do diagrama | `surface` (#121316), moldura `ArchitectureDiagram` |
| Nó (caixa) | fundo `surface-2`, borda 1px `border`, raio 8px |
| Título do nó | Inter 14px/600 `text` |
| Subtítulo do nó (stack/detalhe) | JetBrains Mono 11px `text-3`, caixa alta |
| Conector padrão | linha 1.5px `border-strong`, seta fechada pequena |
| Conector do fluxo protagonista | linha 1.5px `accent` — **no máximo um caminho por diagrama** |
| Rótulo de conector | JetBrains Mono 11px `text-2` (ex.: `HTTP · BEARER`) |
| Agrupamento (plataforma/contexto) | borda tracejada 1px `border`, rótulo mono 11px `text-3` no topo |
| Nó externo (terceiros: Mercado Pago, Supabase) | mesma caixa com borda tracejada |
| Legenda | canto inferior, `small` `text-3`, apenas se houver símbolo não óbvio |

Conectores ortogonais (ângulos retos), nunca curvas livres. Grid de 8px.

## 3. Tipos de diagrama

| Tipo | Layout | Uso |
|---|---|---|
| **Arquitetura** | Caixas por serviço, esquerda→direita seguindo o request | Visão de containers de cada case (FastPass: front → API → facial/pagamento) |
| **Integração/sequência** | Colunas por ator, tempo descendo | Fluxos multi-passo (embarque: passageiro → Laravel → FastAPI → motorista) |
| **Fluxo de usuário** | Passos horizontais numerados, um destaque | Jornadas (compra → pagamento → biometria → embarque) |
| **Pipeline** | Estágios esquerda→direita com artefatos entre eles | FastPass ETL/Analytics (v3) |
| **Banco de dados** | Cards de tabela: nome + 3–5 campos-chave apenas | Modelagem (esquema estrela no DW da v3) |
| **Infraestrutura** | Agrupamentos por plataforma (Vercel/Render), nós dentro | Deploy dos cases |

Nunca UML formal (setas de herança, losangos): a audiência avalia clareza,
não notação.

## 4. Produção e formato

- **Formato:** SVG otimizado (SVGO), desenhado sobre grid de 8px, exportado
  para `public/images/diagrams/`. Inline quando precisar herdar tokens do
  tema; `<img>` caso contrário.
- **Fonte de edição:** os SVGs são editados como código (os valores vêm dos
  tokens; um diagrama é revisável em diff como qualquer arquivo).
- **Acessibilidade:** `role="img"` + `aria-label` de uma frase; a descrição
  completa vive no texto adjacente do case.
- **Dimensões:** largura de conteúdo 1056px (container − padding da moldura),
  altura livre; mobile faz scale-down proporcional (mínimo legível testado a
  360px — se ilegível, o diagrama tem nós demais; ver §1.2).

## 5. Mockups — princípios

1. **Screenshot real, moldura neutra.** O produto é a estrela; a moldura só
   dá contexto de dispositivo. Nada de mockups 3D, perspectivas, mãos
   segurando telefone ou reflexos.
2. **Uma moldura por dispositivo, sempre a mesma.**
3. **Conteúdo real nas telas** — nunca lorem ipsum ou dados borrados
   artificialmente (dado sensível se recorta, não se borra).

## 6. Molduras por dispositivo

| Dispositivo | Moldura | Proporção do viewport |
|---|---|---|
| **Desktop/Notebook** | Janela de navegador: barra com 3 pontos (`border-strong`) + campo de URL em mono 11px `text-3`; raio 16px; borda 1px `border`; fundo da barra `surface-2` | 16:10 (1600×1000) |
| **Tablet** | Bezel `surface-2` de 16px, raio 24px, borda 1px | 4:3 vertical (820×1093) |
| **Mobile** | Bezel `surface-2` de 12px, raio 32px, borda 1px | 19.5:9 vertical (390×844) |

- Desktop e notebook usam a **mesma** moldura de navegador — dois frames
  diferentes de laptop/desktop não acrescentam informação.
- O campo de URL mostra a URL real do produto quando existir deploy
  (reforça "isso está no ar"); caso contrário, o nome do produto em mono.
- Composições multi-dispositivo (ex.: as 3 superfícies do FastPass lado a
  lado): máximo 3 molduras, alinhadas pela base, sem sobreposição.

## 7. Implementação

A moldura é o componente `MediaFrame` (doc 04 §6.11) com variante por
dispositivo (`browser` | `tablet` | `phone`) — CSS, não imagem: o screenshot
é o único asset baixado; a moldura pesa zero no orçamento de imagens
(doc 06 §7).
