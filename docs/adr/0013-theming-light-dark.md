# ADR-0013 — Theming light + dark

**Status:** Aceito (decisão do Francisco, Release 0.7)
**Data:** 2026-07-14
**Nota (Release 0.9):** o **mecanismo** aqui decidido (dark default, light por
`data-theme`, script anti-flash, SSR-safe, contraste medido) segue em vigor. Os
**valores de paleta** (grafite-quente + âmbar/bronze) foram **superados pela
ADR-0016** (Dim Sage). Onde este ADR cita hexes, a fonte atual é o doc 04 §1.

## Contexto

Até a 0.6.1 o tema era fixo (grafite-quente escuro). Uma IDE de verdade tem
tema claro e escuro, e a paleta de comandos da 0.7 expõe "Change Theme" como
comando funcional. O desafio: introduzir tema claro **sem** flash na carga,
**sem** mismatch de hidratação, **sem** tocar no pipeline de pre-render/SSR
(ADR-0010) e mantendo o contraste AA que o projeto mede (lição da 0.5).

## Decisão

1. **Dark é o default; light é override por atributo.** No `index.css`, o
   bloco `@theme` mantém os neutros/acento escuros (o `:root`); um seletor
   `:root[data-theme="light"]` sobrescreve os mesmos `--color-*` com a paleta
   light. As utilitárias do Tailwind referenciam `var(--color-*)`, então a
   troca é puramente de cascata — zero JS por token.
2. **Paleta light medida (AA).** Neutros papel-quente e acento bronze
   (`#9A6B16`) — todos os pares de texto ≥ 4,5:1 e o acento ≥ 3:1 para
   foco/UI (tabela no doc 04 §1.5, validada por script de contraste).
3. **Anti-flash:** um `<script>` clássico e inline no `<head>` do
   `index.html` lê `localStorage` (chave do ADR-0012) ou
   `prefers-color-scheme` e aplica `data-theme` no `<html>` **antes do
   primeiro paint**; também atualiza `<meta name="theme-color">`.
4. **SSR intacto:** o pre-render (`prerender.mjs`) só troca o bloco `seo` e
   injeta o `#root` — o script sobrevive em todas as páginas. O `data-theme`
   vive **fora** do `#root`, então não há mismatch de hidratação; o default de
   servidor é dark, igual ao HTML emitido. O toggle vive no store (ADR-0012).

## Alternativas consideradas

- **`@media (prefers-color-scheme)` puro, sem toggle:** não atende ao comando
  "Change Theme" nem à escolha explícita do usuário.
- **Classe `.light`/`.dark` no `body` via React:** causaria flash (o React só
  roda depois do HTML) e risco de mismatch; o atributo pré-paint evita ambos.
- **Dois arquivos de CSS trocados em runtime:** dobraria o CSS e adicionaria
  requisição; a cascata por variável é mais barata.

## Consequências

- Toda cor nova precisa de valor **nos dois temas** e entra na tabela do doc
  04 §1 (dark) + §1.5 (light), sempre medida.
- O `axe` continua ignorando `color-contrast` (jsdom não pinta pixels); a
  validação real de contraste do tema claro é o Lighthouse, como no dark.
- `data-theme` é a única fonte de verdade visual do tema; nada de estilos de
  tema inline em componentes.
