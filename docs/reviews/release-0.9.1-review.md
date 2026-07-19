# Revisão — Release 0.9.1 · Micro-interações funcionais

**Data:** 2026-07-19 · **ADR:** nenhum novo — aplica princípios vigentes
(ADR-0015/0016 anti-fabricação; doc 08 motion-é-informação)

## Escopo entregue × planejado

Pedido do Francisco: "mais interativa e animada sem perder os padrões de
estética". Enquadramento adotado: numa IDE, interatividade é **feedback
funcional**, não decoração — tornar a ferramenta mais real e responsiva
(o oposto do centroide que a 0.8/0.9 acabaram de deixar). Quatro marcos +
um fix de infraestrutura de testes.

| Marco | Entregue | Onde |
|---|---|---|
| M1 | Match highlight na Command Palette: trechos do label que casaram acendem por tecla (`<mark>` sem fundo, tinta + peso; tokens compartilhados entre filtro e highlight) | `CommandPalette.tsx`, doc 04 §6.23 |
| M2 | Status bar sem fabricação: `Build · Tests ✓` (texto fixo, débito da 0.9) → chip `build · 8 páginas` **derivado** do registro único de rotas (ADR-0010), clicável → aba Output | `Footer.tsx`, doc 04 §6.7 |
| M3 | Consistência de micro-feedback: setas deslizam no hover (padrão do ProjectCard aplicado a Hero, CTA da FeaturedWork e CaseNav — anterior desliza para a esquerda); fechar-tab com `focus-visible:opacity-100` (paridade de teclado) | `Hero`/`FeaturedWork`/`CaseNav`/`EditorTabs`, doc 08 §2 |
| M4 | Terminal digita: playback em duas velocidades — comandos `$` tecla a tecla (18ms), "Enter" após 240ms, output a 90ms/linha; cursor sólido na digitação, piscante no idle; one-shot; reduced-motion mostra tudo | `BottomPanel.tsx`, doc 04 §6.24 |
| fix | Estabilização da suíte: `testTimeout: 20s` + `asyncUtilTimeout: 5s` | `vite.config.ts`, `src/test/setup.ts` |

## Verificação (gate)

- ESLint limpo · `tsc --noEmit` limpo · Vitest **58/58** (2 testes novos:
  highlight da paleta; derivação + clique do chip de build) — **três rodadas
  completas consecutivas verdes** após o fix de timeouts.
- Build (8 HTMLs pré-renderizados) ok.
- Orçamentos doc 06 §7: **JS 75,6/110 KB** (+0,5 KB — import do registro de
  rotas no Footer) · **CSS 21,3/25 KB** · maior lazy 3,0/35 KB.

## Achados e correções

- **O flake "SearchPanel sob carga" era maior do que o documentado:** qualquer
  suíte que abre chunk lazy (paleta, painéis, rota de projetos) + o axe da home
  (~5s sozinho) estourava os defaults (testTimeout 5s, `findBy*` 1s) com a
  suíte em paralelo — o conjunto que falhava **variava por rodada** e tudo
  passava isolado. Corrigido por folga de timeout (rodada verde não fica mais
  lenta); deixou de ser pendência.
- **Doc 08 §3 proibia "texto digitando"** — o M4 exigiu registrar a exceção:
  no Terminal a digitação é o comportamento nativo do objeto representado
  (informação, não efeito). A proibição segue integral para prosa/títulos.

## Pendências geradas

- **Validação em navegador** desta release (junto com as 0.6–0.8): em
  particular o ritmo do terminal (M4) e o peso do highlight (M1) são decisões
  de sensação — o Francisco pode pedir ajuste de dial.
- `aria-live`/`role="log"` no Terminal ficou de fora (transcript é decorativo
  para leitor de tela; avaliar se o playback merece semântica própria).

## Veredito

Gate verde nos 5 commits. **Aguarda validação em navegador pelo Francisco**
(desktop + mobile, dois temas) — mesma fila das 0.6–0.8.
