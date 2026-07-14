# ADR-0015 — Sem cenografia: toda superfície tem função real

**Status:** Aceito (decisão do Francisco, Release 0.8)
**Data:** 2026-07-14

## Contexto

A construção da IDE acumulou cenografia. A 0.6 introduziu um **canvas
decorativo** de fundo (grid de 48 px + ruído `feTurbulence`, `body::before`,
doc 04 §1.4). A 0.7 introduziu um **`Minimap` decorativo** (`aria-hidden`, que o
próprio doc 04 §6.22 descreve como "não representa conteúdo real; é chrome que
completa a leitura de 'editor'"). A Design Review da 0.8 identifica esses
elementos como "tell" de screenshot e de interface gerada por IA: textura sem
função, widgets sem trabalho.

O Francisco fixou um requisito duro para a 0.8: **software, não uma IDE
cenográfica.** Sem terminal falso, sem minimap falso, sem painéis apenas
decorativos. Cada superfície precisa existir porque resolve um problema real —
o oposto da "moldura pronta" preenchida com atmosfera.

## Decisão

Toda superfície visível carrega função real ou informação real. Especificamente:

1. **Remover o canvas decorativo de fundo** (grid + ruído, `body::before`). A
   estrutura passa a vir das réguas reais do cromo (bordas de painel), não de
   textura falsa. O doc 04 §1.4 é aposentado.
2. **O `Minimap` decorativo é removido** — a menos que reflita o documento
   renderizado de verdade (minimap real de conteúdo real). A versão decorativa
   (silhueta de "código" gerada uma vez) deixa de existir.
3. **Painel/widget só existe se faz algo real:** navegação, descoberta, estado
   ou produtividade. Qualquer coisa presente apenas "para parecer uma IDE" é
   removida.
4. **A sensação de "vivo" vem de dados reais** — `git-log` gerado, estado de
   build/test, outline real do documento — **nunca** de atividade fabricada ou
   de imperfeição/assimetria manufaturada (charter §5–7). Assimetria só quando
   **a função a justifica**; assimetria decorativa lê como desleixo.

## Alternativas consideradas

- **Manter canvas/minimap como "atmosfera de IDE":** rejeitado — é exatamente a
  cenografia que o Francisco vetou e que a auditoria lê como textura de IA.
- **Adicionar mais widgets falsos** (terminal digitando sozinho, notificações
  fictícias) para "parecer vivo": rejeitado — gimmick; viola a honestidade
  editorial (charter §5–7).
- **Fabricar imperfeição/assimetria** para parecer "humano/usado ao longo do
  tempo": rejeitado — imperfeição decorativa lê como falta de acabamento, não
  como maturidade. Naturalidade vem de dados reais, não de wobble aplicado.

## Consequências

- `body::before` (canvas) sai do `index.css`; doc 04 §1.4 é retirado.
- `Minimap` (doc 04 §6.22) é removido ou reconstruído como real; doc 04 é
  atualizado no marco correspondente.
- **Restrição de governança para todo trabalho futuro:** nenhuma superfície
  entra sem um trabalho real. Vira pergunta de aceite em cada marco, ao lado da
  do ADR-0014.
- Troca-se alguma "riqueza" visual por credibilidade — de propósito. Menos
  elementos, cada um com função (economia de elementos da direção de arte).
