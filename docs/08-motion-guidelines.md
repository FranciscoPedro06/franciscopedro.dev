# 08 — Motion Guidelines

> Filosofia e normas de animação. Os tokens (durações, easing) estão no
> [04-design-system.md](04-design-system.md) §5; este documento define quando,
> onde e por quê. Implementação: `src/lib/motion.ts` (variants centralizados —
> componentes nunca definem timings próprios).

---

## 1. Princípios

1. **Motion é informação, não decoração.** Cada animação responde a uma
   pergunta do usuário: "o que mudou?", "de onde veio?", "meu clique
   funcionou?". Se não responde a nenhuma, não existe.
2. **Precisão acima de personalidade.** O movimento reforça a sensação de um
   instrumento calibrado: curto, determinístico, sem elasticidade. Nada de
   bounce, spring exagerado ou overshoot.
3. **O conteúdo nunca espera.** Animação não pode atrasar leitura nem
   interação — o texto está legível e clicável desde o primeiro frame útil.
4. **Uma vez só.** Revelações de entrada acontecem na primeira visualização
   e nunca se repetem no mesmo pageview.
5. **Silêncio como padrão.** Na dúvida entre animar e não animar, não animar.

## 2. Quando usar

| Contexto | Motion | Por quê |
|---|---|---|
| Comutação de view do workbench | fade + translateY 4px, 200ms (`view-in`, CSS puro) | Marca a troca do painel sem teatro |
| Entrada de bloco no scroll do painel | fade + translateY 8px, 220ms, uma vez | Orienta a chegada do conteúdo sem retê-lo |
| Hover em interativos | transição de **cor/borda**, 150ms | Confirma que o elemento responde |
| Press de botão/card | `scale(0.98)`, 150ms | Feedback tátil do clique |
| Seta de card **e de link-seta** em hover (0.9.1: Hero, CTA, CaseNav — anterior desliza p/ esquerda) | translateX 4px, 150ms | Reforça a direção da ação |
| Tooltip do rail (ActivityBar) | fade de opacidade 150ms | Nomeia o ícone sem saltar |
| Abertura do menu mobile | fade 200ms | Suaviza a troca de contexto |
| Transição de rota | fade 200ms | Continuidade entre páginas |
| Alternador PT/EN (`/resume`) | crossfade 150ms do conteúdo | Marca a troca sem "piscar" |

## 3. Quando evitar (proibições)

- **Parallax, partículas, gradientes animados, cursores customizados.**
- **Texto letra a letra ou "digitando"** — em prosa, títulos ou qualquer
  conteúdo editorial. **Exceção única (0.9.1):** o Terminal do painel
  inferior digita os comandos `$` do transcript — ali a digitação é o
  comportamento nativo do objeto representado (princípio 1: é informação —
  representa a execução real dos comandos), não efeito sobre texto. One-shot,
  som nenhum, `prefers-reduced-motion` mostra o transcript inteiro.
- **Loops infinitos** (exceto um único indicador de status pontual, ex.: dot
  "em produção" com pulso sutil — e mesmo esse é opcional).
- **Animação em prosa:** parágrafos de estudo de caso nunca animam
  individualmente; anima-se a seção, uma vez.
- **Movimento em hover** além dos 4px da seta — cards não crescem, imagens
  não dão zoom, nada "flutua".
- **Stagger longo:** máximo 1 nível, 60ms entre itens, apenas em listas
  curtas (cards, timeline). Nunca em texto.

## 4. Parâmetros normativos

Faixa única desde a Release 0.6: **120–220ms**. Movimento de software — se
uma animação precisa de mais de 220ms para ser percebida, ela não entra.

| Parâmetro | Valor | Token |
|---|---|---|
| Duração — feedback (hover/focus/press) | 150ms | `duration-fast` |
| Duração — transições de contexto (menu, rota, crossfade) | 200ms | `duration-base` |
| Duração — revelação de seção | 220ms | `duration-slow` |
| Curva única | `cubic-bezier(0.16, 1, 0.3, 1)` | `ease-out-soft` |
| Distância máxima de deslocamento | 8px (entrada) / 4px (hover) | — |
| Propriedades animáveis | `opacity`, `transform` apenas | — |

`opacity`/`transform` somente: são compostas na GPU e não causam reflow —
animação nunca degrada o orçamento de performance (doc 06 §7) nem gera CLS.

## 5. Estados específicos

### Hover
Cor de texto, cor de fundo ou cor de borda — 150ms. Nunca sombra, nunca
escala (exceto press).

### Focus
**Sem animação.** O anel de foco (`:focus-visible`, doc 04 §8) aparece
instantaneamente — latência em feedback de foco prejudica navegação por
teclado.

### Loading
- Troca de rota (lazy chunk): fallback do `Suspense` é fundo `bg` puro —
  **sem spinner**; a troca leva milissegundos e um spinner criaria mais ruído
  que a espera.
- Imagens: fundo `surface` no `MediaFrame` até o carregamento (doc 12 §5).
  Sem skeleton shimmer — brilho pulsante viola o princípio 2.

### Page transitions
Fade de 250ms na entrada da rota nova. Sem transição de saída elaborada
(exit apenas opacity) — o usuário pediu para ir embora; não o segure.

### Scroll reveal
`whileInView` com `once: true` e `margin: "-10%"`; anima a **seção**, nunca
elementos internos individualmente (exceção: stagger de 60ms em grades de
cards e itens da timeline).

## 6. `prefers-reduced-motion`

Comportamento integral, não parcial:

- Todos os variants retornam o estado final sem transição (implementado nas
  fábricas de `src/lib/motion.ts` — consumir `useReducedMotion` fora delas é
  violação de revisão).
- Transições de rota viram corte seco; scroll suave de âncoras vira salto
  (`scroll-behavior: auto` via media query no CSS base).
- Transições de **cor** em hover/focus são preservadas — não são movimento e
  ajudam a percepção de interatividade.

## 7. Critério de revisão

Antes de aprovar qualquer animação nova, as cinco perguntas:

1. Que pergunta do usuário ela responde?
2. Usa apenas `opacity`/`transform` e tokens existentes?
3. Funciona corretamente com `prefers-reduced-motion`?
4. Compete com a leitura de algum conteúdo?
5. Aconteceria mais de uma vez por pageview?

Reprovada em qualquer uma (4 e 5 devem ser "não"): não entra.
