# 13 — Accessibility Foundation

> Filosofia e normas de acessibilidade. As regras pontuais já normatizadas
> vivem no [04-design-system.md](04-design-system.md) §8 (tokens e
> componentes) e no [08-motion-guidelines.md](08-motion-guidelines.md) §6
> (motion reduction); este documento é o guarda-chuva: princípios, padrões de
> interação e o processo de verificação.

---

## 1. Princípios

1. **Acessibilidade é requisito, não feature.** WCAG 2.1 AA é o piso
   (RNF02), não a meta de marketing. Não existe "versão acessível" do site —
   existe o site.
2. **Semântica antes de ARIA.** O elemento HTML correto (`nav`, `button`,
   `a`, headings) resolve 90% dos casos; ARIA entra apenas onde a semântica
   nativa não alcança. ARIA errado é pior que ARIA nenhum.
3. **Teclado é cidadão de primeira classe.** Tudo que o mouse faz, o teclado
   faz — na mesma ordem em que o olho lê.
4. **Quem depende de tecnologia assistiva recebe o mesmo conteúdo**, não um
   resumo. Diagramas têm descrição textual equivalente; imagens têm `alt`
   real.
5. **O site é a prova.** Um portfólio que prega qualidade e falha com leitor
   de tela desmente a própria tese (charter §11).

## 2. Navegação por teclado

- **Ordem de tabulação = ordem visual de leitura.** Nunca `tabindex` positivo.
- **Skip link** como primeiro elemento focável de toda página
  (implementado: `SkipLink` → `#conteudo`).
- **Focus trap** apenas em contexto modal (menu mobile) — Tab circula dentro,
  Esc fecha e devolve o foco ao elemento que abriu. Nenhum outro trap é
  permitido.
- **Sem armadilhas:** todo estado alcançável por teclado é abandonável por
  teclado.
- Âncoras da home movem o foco junto com o scroll (o alvo recebe
  `tabindex="-1"` programático quando necessário) — rolar sem mover o foco
  desorienta leitores de tela.

## 3. Foco visível

- `:focus-visible` global: anel 2px `accent`, offset 2px (doc 04 §8.2).
  Proibido `outline: none` sem substituto equivalente.
- O anel nunca é animado (doc 08 §5 — latência em feedback de foco prejudica
  navegação por teclado).
- Foco visível é testado sobre todos os fundos (`bg`, `surface`,
  `surface-2`) — o contraste do anel com o fundo deve ser ≥ 3:1.

## 4. Landmarks e estrutura

- Um `header`, um `nav` principal (rotulado `aria-label="Principal"`), um
  `main`, um `footer` por página. Navegações secundárias (contatos no footer,
  menu mobile) com rótulos próprios.
- **Headings:** um `h1` por página; hierarquia sem saltos; seções da home
  ligadas por `aria-labelledby` ao seu heading (`Section` já aceita).
  O heading descreve o conteúdo, não o design ("Estudos de caso", não
  "O que eu fiz").

## 5. Contraste

Garantido **por construção**: os pares texto/fundo permitidos são apenas os
da tabela de tokens (doc 04 §1.1, todos ≥ AA; `text-3` restrito a ≥14px
médio). Criar par novo = atualizar o doc 04 primeiro, com o contraste
calculado. Elementos não textuais interativos (bordas de input futuro, anel
de foco): ≥ 3:1 contra o fundo adjacente.

## 6. Motion reduction

Política integral no doc 08 §6: variants retornam estado final sem transição,
rotas cortam seco, scroll suave vira salto. Transições de cor são preservadas
(não são movimento). Nenhum conteúdo é exclusivo de quem vê animação.

## 7. Estados e comunicação

| Padrão | Regra |
|---|---|
| Menu mobile | botão com `aria-expanded` + `aria-controls`; painel `role="dialog"` + `aria-modal` |
| Link da rota/seção atual | `aria-current="page"` (rota) / sublinhado + `aria-current="true"` (scroll-spy) |
| Links externos | sufixo visível `↗` — informação no texto, não só na cor |
| Feedback transitório ("Copiado") | `role="status"` (anunciado sem roubar o foco) |
| Ícones | `aria-hidden="true"`; o texto adjacente carrega o significado (doc 04 §7) |
| Idioma | `lang="pt-BR"` no documento; na página `/resume`, o conteúdo EN recebe `lang="en"` no container |

## 8. Imagens e diagramas

- `alt` obrigatório e descritivo, definido no conteúdo tipado e validado por
  teste de contrato (doc 12 §7).
- Diagramas: `role="img"` + `aria-label` de uma frase, com a explicação
  completa no texto adjacente (doc 11 §4) — o diagrama nunca é a única fonte.

## 9. Verificação

**Automática (CI):** `eslint-plugin-jsx-a11y` em todo componente; Lighthouse
A11y ≥ 95 (entra com o Lighthouse CI); testes de componente cobrem contratos
de interação (Esc fecha o menu, foco preso, `aria-expanded` correto).

**Manual (checklist por release, registrado em `docs/reviews/`):**

1. Percurso completo por Tab em cada página — ordem lógica, foco sempre
   visível, nenhum trap.
2. Leitura das páginas com NVDA — landmarks, headings e anúncios de estado.
3. Zoom 200% e viewport 320px — sem quebra nem scroll horizontal.
4. `prefers-reduced-motion` ativo — nenhuma animação de entrada.
5. Modo de alto contraste do SO — conteúdo permanece legível.

## 10. Boas práticas de revisão

- Acessibilidade entra na revisão de cada sprint, não numa "auditoria final".
- Bug de acessibilidade tem a mesma severidade que bug funcional.
- Não usar `title` como única forma de informação; não usar cor como único
  canal (regra do `↗` nos links externos é o exemplo canônico).
