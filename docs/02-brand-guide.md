# 02 — Brand Guide

> Define a identidade da marca pessoal: posicionamento, voz, identidade visual
> e a experiência emocional pretendida. Os valores exatos (hex, escalas,
> medidas) estão normatizados no [04-design-system.md](04-design-system.md);
> este documento define o *porquê*.

---

## 1. Posicionamento

**Quem sou.** Francisco Pedro — Técnico em Desenvolvimento de Sistemas e
Analista de Dados (MIS). Construo software de ponta a ponta (web, mobile,
APIs, ML aplicado) e trabalho diariamente transformando dados operacionais em
informação para decisão.

**Como desejo ser percebido.** Como um engenheiro jovem com maturidade acima
da idade: alguém que documenta antes de codar, justifica decisões, entrega
produtos que funcionam em produção e entende o negócio por trás do código.

**Qual problema resolvo.** Empresas precisam de gente que faça as duas pontas:
construir o sistema e entender o que os dados dele dizem. Eu faço o ciclo
completo.

**Proposta de valor.**

> Construo produtos digitais completos — e transformo os dados que eles geram
> em inteligência para o negócio.

## 2. Personalidade da marca

### Arquétipo

**O Criador, com traços de Sábio.** O Criador porque a evidência central é o
que foi construído (FastPass, a API facial, o carrinho com IoT). O Sábio
porque a forma de apresentar é analítica: decisões justificadas, trade-offs
explicados, aprendizados admitidos. Nunca o Herói: a marca não se
autoproclama; ela mostra.

### Tom de voz

| Atributo | Significa | Não significa |
|---|---|---|
| Direto | Frases curtas, informação na frente | Seco ou robótico |
| Preciso | Termos técnicos corretos, números com fonte | Jargão para impressionar |
| Calmo | Confiança sem exclamações | Frieza ou distância |
| Honesto | Limitações e erros aparecem | Autodepreciação |

### Como escrever

- Primeira pessoa, voz ativa: "Implementei o pagamento Pix", não
  "foi implementado o pagamento Pix".
- Toda afirmação de qualidade acompanha evidência: em vez de "código limpo",
  "controllers finos com regras isoladas em services".
- Números reais ou nenhum número.
- Parágrafos de no máximo 4 linhas; um assunto por parágrafo.
- Termos técnicos em inglês quando são o nome da coisa (deploy, embedding,
  webhook); prosa em português.

### Como NÃO escrever

Frases proibidas em qualquer parte do site (do charter, herdado do brief):

- "Sou apaixonado por tecnologia."
- "Bem-vindo ao meu portfólio."
- "Desde criança gosto de programação."
- "Tenho facilidade para aprender."
- "Busco novos desafios."

Padrões igualmente proibidos:

- Adjetivos vazios: *incrível, inovador, robusto, poderoso, disruptivo*.
- Frases de efeito motivacionais ou emojis decorativos.
- Estruturas com cheiro de IA: "Em um mundo cada vez mais…", "É importante
  ressaltar que…", tríades retóricas artificiais, conclusões que resumem o
  parágrafo anterior.
- Voz passiva para esconder o sujeito; superlativos sem comparação.

**Teste prático:** se a frase pudesse estar no portfólio de qualquer outra
pessoa, ela não entra.

## 3. Identidade visual

### Princípios de design

1. **Conteúdo primeiro.** A interface é um suporte de leitura, não um cenário.
2. **Um acento só.** A cor de destaque aponta o que importa; se tudo destaca,
   nada destaca.
3. **Espaço é hierarquia.** Separação por espaço em branco antes de bordas,
   e bordas antes de fundos.
4. **Elegância é contenção.** Nada neon, nada gamer, nada futurista.

### Paleta

Base escura em **cinza-ardósia frio** (família de editor, temperatura própria),
**sem acento cromático** (Release 0.9, ADR-0016; escala completa no doc 04 §1).
Histórico: a 0.6.1 tinha adotado grafite-quente + âmbar para fugir do centroide
"teal/ciano de IA" — e funcionou contra *aquele* centroide. Mas o centroide se
move: grafite-quente + um acento-ouro tasteful virou, ele próprio, o centroide
"premium/dark de ferramenta de IA". A 0.9 sai dele.

Decisão do Francisco (0.9): a jogada menos-IA é **recusar a cor de marca**. A
ênfase passa a ser **tinta** (brilho, não hue); cor cromática só onde é
semântica real (`success`/`danger`). O reflexo da IA é *adicionar* um "pop of
color" — não adicionar é o desvio. O calor não some: mora no tipo (serifa) e na
temperatura do neutro, não numa bala colorida.

Regra de contenção: a tinta de ênfase aparece em foco, estados ativos e o link
primário — nunca em grandes superfícies ou títulos inteiros. Ela indica; não
pinta. Nenhuma cor entra por decoração.

### Tipografia

Três vozes (Release 0.9, ADR-0016) — a identidade "editorial-técnica", *um
engenheiro que escreve bem*. A Inter (a sans-default da IA) saiu:

- **Newsreader** (serif, variable) nos **títulos de documento** (display/h1/h2):
  a voz humana. Vive à esquerda, densa, **dentro** do editor — a tensão
  serifa×código é o ponto, não um hero centrado de landing.
- **IBM Plex Sans** (variable) para **corpo e cromo**: sans de engenharia com
  caráter, no lugar da Inter.
- **JetBrains Mono** onde é **código/metadado**: labels, datas, tags, números,
  caminhos, git. Caixa alta com tracking largo é a "assinatura de engenheiro" —
  com parcimônia.

### Espaçamento

Denso e deliberado, como software profissional (Release 0.6.1): o workbench
usa bem o espaço — painéis compactos, chrome fino, leitura confortável
(medida de 65–75 caracteres). O site deve parecer "caro" pela precisão do
layout, não por hectares de respiro nem por efeitos.

### Ícones

Lucide, stroke 1.5, tamanho consistente, sempre acompanhando texto (nunca
ícone sozinho como única affordance). Ícones ilustram; não decoram.

### Fotografia

- Foto pessoal: profissional, fundo neutro, tratamento sóbrio (sem filtros).
- Projetos: screenshots reais dos sistemas, apresentados em molduras discretas
  com cantos arredondados e borda de 1 px. Nada de mockups 3D flutuantes.

### Ilustrações

Não há ilustrações decorativas. Os únicos elementos gráficos além de
screenshots são **diagramas de arquitetura**: SVG próprio, monocromático com
acento, mesma tipografia mono dos labels. Diagramas são conteúdo, não enfeite.

### Motion

- Movimento comunica entrada e resposta; nunca chama atenção para si.
- Fades e deslocamentos curtos (≤ 16 px), durações de 150–500 ms,
  easing suave de saída.
- Nada de parallax, partículas, cursores customizados ou texto digitando.
- `prefers-reduced-motion` desativa tudo que não for essencial.

### Logo

Wordmark tipográfico: **`franciscopedro.dev`** — o domínio como marca
(ADR-0009). JetBrains Mono: `franciscopedro` em 600 na cor de texto, `.dev`
em 400 na cor `text-3`. Sem símbolo gráfico: a marca é o nome-domínio.
Em superfícies quadradas (favicon, app icons) usa-se o monograma derivado
`fp.` em tile escuro. Especificação completa dos assets no doc 10.

## 4. Experiência

**Como o visitante deve se sentir:** em um produto sério — a mesma sensação de
abrir a documentação de uma ferramenta bem construída. Orientado desde o
primeiro segundo, sem esforço para encontrar nada.

**Emoções a transmitir, em ordem:**

1. *Clareza* — "entendi quem ele é em segundos".
2. *Respeito técnico* — "esses cases têm profundidade de verdade".
3. *Confiança* — "esse perfil entrega".

**Como construir confiança:**

- Evidência verificável: links diretos para repositórios e commits reais.
- Honestidade: seções de desafios e aprendizados admitem o que deu errado.
- Consistência: o site cumpre o que os cases pregam (performance,
  acessibilidade, organização) — o meio é a mensagem.
- Zero exagero: nenhuma promessa que o GitHub não sustente.
