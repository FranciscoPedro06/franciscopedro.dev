# Release 0.9 — Visual Language Research (M0)

> Documento **canônico** da etapa M0: a pesquisa de linguagem visual que
> fundamenta toda a Release 0.9. Não é verificação nem plano de tarefas — é a
> base de princípios da qual as decisões de tokens (doc 04), a ADR-0016 e a
> implementação derivam. Aprovado pelo Francisco antes da materialização.

**Data:** 2026-07-14 · **Objetivo:** extrair os princípios recorrentes que
fazem software profissional parecer maduro — e nunca template de IA — para
construir uma **linguagem visual própria**, não uma cópia de IDE.

---

## 0. Mudança de objetivo (decisão do Francisco)

A partir da 0.9 **deixamos de perseguir "parecer uma IDE"**. O objetivo passa a
ser: **parecer um software profissional que, por acaso, usa a metáfora
estrutural de uma IDE.** A estrutura (workbench, explorer, editor, painéis)
segue inspirada em IDEs; a **identidade visual é completamente própria**.
Reconhecer influência é aceitável; parecer clone é falha.

**As IDEs (VS Code, IntelliJ, Zed, Fleet) passam a ser referência estrutural,
não visual.** Nenhuma cor, componente, layout ou detalhe é copiado.

**Pergunta-guia permanente da implementação:** *"se eu removesse a Activity Bar
e o Explorer, esta interface ainda pareceria um software profissional?"* Se não,
ainda dependemos da estética do VS Code em vez de uma linguagem própria.

## 1. Método

Analisada a **linguagem visual** (não os layouts) de Linear, Arc, Zed, Fleet,
IntelliJ, Raycast, Warp, Superhuman, Tana e Craft. Buscam-se princípios
recorrentes, não componentes. Onde um produto é exceção (Arc é o mais colorido),
extrai-se o princípio que ele ensina, não a superfície.

## 2. Os 13 princípios

1. **Neutros fazem o trabalho; cor é rara e significa.** Quase-monocromático;
   um acento contido para foco/estado/seleção, nunca para decorar.
2. **Cinza é uma família com intenção.** Rampas OKLCH com *undertone* único e
   comprometido — nunca cinza puro neutro-por-comitê.
3. **Profundidade por rampa de superfície + hairline, não por sombra.** Planos
   nomeados (canvas < cromo < flutuante); sombra só no que de fato flutua.
4. **Densidade com ritmo — duas escalas espaciais.** Cromo apertado, leitura
   respira; a quebra nasce da função, não de múltiplos uniformes de 8.
5. **Contenção tipográfica.** Uma/duas famílias, escala contida, hierarquia por
   **peso e cor** — não por saltos de tamanho. O texto é a interface.
6. **Command-first: a paleta é navegação primária.**
7. **Movimento funcional e rápido, nunca ambiente.** Sub-200 ms.
8. **O cromo recua; controles aparecem quando relevantes (noiseless UI).**
   Nada de widget permanente só para "parecer ferramenta".
9. **Estado real no lugar de atmosfera.** A "vida" é verdade do sistema (git,
   build, estados de arquivo), não enfeite.
10. **Precisão óptica é o que soa "equipe sênior".** Ícones equalizados, raios
    afinados, hairlines sub-pixel, alinhamento a grid real.
11. **Um ponto de vista comprometido.** Cada produto assume uma temperatura e um
    caráter. Blandness (neutro-por-comitê) é o *tell*; identidade é a cura.
12. **Long-session Design.** A métrica não é o screenshot, é a hora nº 3 de uso:
    conforto visual, legibilidade, baixa fadiga, contraste equilibrado (nunca
    branco puro sobre preto puro), acento contido, superfícies discretas, zero
    brilho/efeito. Software profissional, não showcase.
13. **Design by Subtraction.** Na dúvida entre somar ou remover um elemento
    visual, **remover**. Cada componente justifica a existência; a release
    caminha continuamente para menos ruído e maior clareza.

## 3. A assinatura do template de IA (anti-princípios — caçar em M5)

Cinza sem undertone; acento neon (teal/roxo/azul elétrico); 8px em tudo; grade
genérica de cards; gradiente + glow + glass; sombra decorativa para
"profundidade"; hero centralizado gigante; ícones decorativos; simetria total;
peso visual igual em toda parte; **ausência de caráter comprometido**.

## 4. Tradução para a Release 0.9

A linguagem escolhida (**Dim Sage**, ADR-0016) nasce obrigada a: **(a)** rampa
OKLCH de undertone verde-sálvia, comprometido e único; **(b)** planos por
superfície + hairline, sombra só no flutuante; **(c)** acento pinho contido e
semântico; **(d)** contraste de topo deliberadamente contido (long-session, sem
branco puro) — mas **AA medido nos dois temas**; **(e)** subtração como decisão
padrão. A direção completa e as três propostas comparadas estão registradas na
[release-0.9-design-review.md](release-0.9-design-review.md); os valores finais
vivem no [doc 04](../04-design-system.md).
