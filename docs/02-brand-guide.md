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

Base escura em cinzas neutros levemente frios, e **um único acento: teal
dessaturado** (`#2DD4BF` como valor de referência; escala completa no doc 04).

Justificativa do acento: (a) diferencia-se do azul-cobalto que é a identidade
do FastPass — o portfólio apresenta o produto, não se veste dele; (b) teal
carrega associação com precisão e dados sem cair no azul corporativo genérico;
(c) mantém contraste AA sobre o fundo escuro mesmo em texto pequeno.

Regra de contenção: o acento aparece em links, estados ativos, marcadores e
detalhes — nunca em grandes superfícies ou títulos inteiros.

### Tipografia

- **Inter** (variable) para tudo: display, títulos e corpo. Uma família única
  garante coesão; a variação vem de peso, tamanho e cor.
- **JetBrains Mono** como voz secundária: labels técnicos, datas, tags de
  stack e números. O mono em caixa alta com tracking largo é a "assinatura de
  engenheiro" da marca — usado com parcimônia.

### Espaçamento

Generoso e rítmico: seções respiram (espaço vertical grande e constante entre
seções), leitura confortável (medida de 65–75 caracteres). O site deve parecer
"caro" pela quantidade de espaço, não por efeitos.

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

Wordmark tipográfico: **`fp.`** em JetBrains Mono, peso 600, com o ponto no
teal de acento. Discreto no header, favicon derivado dele. Sem símbolo
gráfico: a marca é o nome e o trabalho.

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
