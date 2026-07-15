# ADR-0016 — Linguagem visual "Dim Sage"

**Status:** Aceito (decisão do Francisco, Release 0.9)
**Data:** 2026-07-14
**Supersede:** a **seção de cor** da ADR-0013 (a paleta grafite-quente + âmbar).
O *mecanismo* de theming da ADR-0013 (escuro default, claro por atributo, script
anti-flash, SSR-safe) permanece **em vigor e inalterado** — só os valores mudam.

## Contexto

Até a 0.8 a paleta era grafite-quente com acento âmbar (`#d9a866`). A Design
Review da 0.8 rejeitara *trocá-la* (AA já medido), optando por estendê-la. A
validação da direção 0.9, porém, concluiu que o **âmbar-sobre-grafite é o maior
"tell" residual de template**: quente-dourado sobre cinza é assinatura de tema
gerado. A pesquisa M0 ([release-0.9-visual-language-research.md](../reviews/release-0.9-visual-language-research.md))
fixou o objetivo — *software profissional com identidade própria, não IDE
copiada* — e três identidades completas foram materializadas e comparadas
([release-0.9-design-review.md](../reviews/release-0.9-design-review.md)). O
Francisco escolheu a **Dim Sage**, com evolução.

## Decisão

A linguagem visual do produto passa a ser a **Dim Sage** — neutros de undertone
**verde-sálvia** em OKLCH, acento **pinho**, otimizada para **long-session**
(princípio 12 do M0). Concretamente:

1. **Neutros verde-sálvia, baixo glare.** Rampa de quatro superfícies
   (`bg` < `surface` < `surface-2` < `surface-3`) com definição entre planos
   ampliada e hairlines (`border`/`border-strong`) afinadas. O texto primário
   **não é branco puro** (`#e3e8e4`/`#1f2621`) — reduz o glare na leitura
   prolongada sem perder AA.
2. **Acento pinho** (`#5acaba` escuro · `#00706b` claro), mais evidente que o
   âmbar mas ainda **contido**: foco, estado ativo, não-salvo, atenção — nunca
   decora, nunca preenche superfície (regra de contenção do doc 04 §1.2).
3. **Profundidade por superfície + hairline, nunca por sombra** (ADR-0015
   preservado). Sombra só em camada flutuante (`.elevated`).
4. **Contraste medido, não declarado.** Todos os pares de texto ≥ AA (4,5:1) e
   os de UI/estado ≥ 3:1, **nos dois temas**, medidos por script OKLCH → WCAG
   sobre os pixels renderizados (a régua da §1 do doc 04). O Lighthouse segue
   como juiz final (o `axe` não pinta pixels — lição da 0.5).
5. **Raios mantidos apertados** (4/6/8): raio grande lê como SaaS/friendly; o
   objetivo é ferramenta profissional. Decisão de subtração (princípio 13).

## Alternativas consideradas

- **Cool Graphite (proposta A)** e **Warm Ink (proposta B)**: identidades
  completas e válidas (design-review §), preteridas — A soa mais severa/corporativa;
  B (quente) reincide no risco do âmbar-sobre-grafite que estamos aposentando.
- **Estender a grafite-quente (postura da 0.8):** rejeitada — não remove o tell
  cromático; era exatamente o que a validação 0.9 apontou como pendente.
- **Substituir também o mecanismo de theming (ADR-0013):** desnecessário — o
  mecanismo é sólido; só os valores precisavam mudar.

## Consequências

- `src/index.css` (`@theme` + override `:root[data-theme="light"]`), o
  `THEME_COLOR` do store (`workbench.ts`) e o script anti-flash + `<meta
  theme-color>` do `index.html` passam aos valores Dim Sage.
- O doc 04 §1 é reescrito (fonte da verdade); a ADR-0013 ganha nota de supersessão
  de cor. As cores semânticas de documento (git add/mod/del) entram na M3, quando
  o Explorer as consumir (doc 04 §9: nenhum token sem uso).
- SSR/SEO/`axe` e os 56 testes seguem verdes — a mudança é de valor de token, não
  de estrutura, HTML ou contrato. Quebrar qualquer um é regressão.
- **Critério de aceite contínuo:** a pergunta-guia do M0 — *"sem a Activity Bar e
  o Explorer, ainda parece software profissional?"*.
