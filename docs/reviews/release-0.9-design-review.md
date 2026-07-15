# Release 0.9 — Design Review & Direção de Arte ("Design Maturity II")

> Documento de **planejamento** (etapa 1 do fluxo, doc 00 §4). Nasce da pesquisa
> M0 ([release-0.9-visual-language-research.md](release-0.9-visual-language-research.md))
> e a converte em direção estrutural e decisão de identidade. A revisão técnica
> de encerramento virá em `release-0.9-review.md`. A fonte da verdade dos tokens
> é o [doc 04](../04-design-system.md); as decisões, a [ADR-0016](../adr/0016-visual-language-dim-sage.md).

**Data:** 2026-07-14 · **Objetivo:** reescrever a **linguagem visual** do produto
como identidade própria — eliminando definitivamente qualquer traço estético de
interface gerada por IA — sem tocar na arquitetura nem nos princípios aprovados.

---

## 1. O novo objetivo (decisão do Francisco)

Deixamos de perseguir "parecer uma IDE". O alvo passa a ser **parecer um software
profissional que, por acaso, usa a metáfora estrutural de uma IDE**. Estrutura
inspirada em IDEs; identidade visual completamente própria. **As IDEs são
referência estrutural, não visual.** Critério de sucesso da release:

> A primeira reação de quem abre o site não deve ser *"portfólio inspirado numa
> IDE"* nem *"VS Code customizado"*, e sim *"software profissional de uma empresa
> que tem sua própria linguagem visual"*.

**Pergunta-guia da implementação** (a cada marco): *"se eu removesse a Activity
Bar e o Explorer, esta interface ainda pareceria um software profissional?"*

## 2. Base: a pesquisa M0

Treze princípios extraídos de Linear/Arc/Zed/Fleet/IntelliJ/Raycast/Warp/
Superhuman/Tana/Craft (ver M0). Os que governam a direção: neutros fazem o
trabalho e cor significa (1); cinza é família com undertone comprometido (2);
profundidade por superfície + hairline (3); densidade com ritmo (4); contenção
tipográfica (5); estado real, não atmosfera (9); ponto de vista comprometido
(11); **Long-session Design** (12); **Design by Subtraction** (13).

## 3. A decisão de identidade: três propostas → Dim Sage (evoluída)

Três identidades **completas e distintas** foram materializadas (não três tons de
cinza) e comparadas num artifact navegável, cada uma renderizada como o próprio
workbench nos dois temas, com contraste medido:

- **A · Cool Graphite** — frio/preciso, acento latão; densidade máxima. Preterida:
  soa mais severa/corporativa.
- **B · Warm Ink** — quente/editorial, acento terracota. Preterida: o quente
  reincide no risco do âmbar-sobre-grafite que estamos aposentando.
- **C · Dim Sage** — verde-sálvia, baixo glare, acento pinho. **Escolhida** — a que
  mais encarna Long-session (12) e Subtraction (13) e a que mais se distancia do
  *tell* de IA.

**Evolução pedida sobre a C** (implementada na M1): mais definição entre os planos;
secundários mais legíveis **sem** voltar ao branco puro; hairlines mais precisas;
foco mais evidente; menos sensação de SaaS; aparência de ferramenta de uso diário.
Raios mantidos apertados (4/6/8) — raio grande lê como SaaS (decisão de subtração).
Valores e métricas finais no doc 04 §1; a decisão na ADR-0016.

## 4. Plano de marcos

Cada marco fecha com o gate (ESLint, `tsc`, Vitest, build, orçamentos doc 06 §7),
responde à pergunta-guia (§1) e é **um commit** (ADR-0005).

| Marco | Escopo estrutural | Estado |
|---|---|---|
| **M0 — Visual Language Research** | 13 princípios + anti-assinatura de IA + novo objetivo; base canônica. | ✅ |
| **M1 — Linguagem visual (tokens)** | Nova paleta **Dim Sage** (ADR-0016) em `index.css` + doc 04 §1; planos/hairlines/legibilidade/foco evoluídos; assets de marca regenerados; acento decidido por último. | ✅ |
| **M2 — Vivacidade honesta** | Terminal e status/Problems/Output com **dado real** no lugar de log fabricado (estende `gen-git-log`); sinais estáticos viram reais ou saem. | ⏳ |
| **M3 — Explorer como mapa vivo** | Árvore real mais rica, ícones por extensão, **estados de git reais** (add/mod) com cor semântica de documento (novos tokens entram aqui — §9). | ⏳ |
| **M4 — Poder de IDE descoberto** | Command Palette mais poderosa (mais ações reais, fuzzy, agrupada); afordância de descoberta; interação com propósito, **sem** nova animação. | ⏳ |
| **M5 — Refino, remedição e fecho** | Varredura de *tells* sob a nova paleta; pergunta-guia; sign-off AA + Lighthouse; a11y/mobile; docs, CHANGELOG, 01/02; commit de fecho. | ⏳ |

## 5. Governança e invariantes

- **SSR/SEO/pre-render** (ADR-0010), 8 HTMLs, `axe` e os **56 testes** verdes —
  quebrar qualquer um é regressão, não trade-off.
- **Honestidade editorial** (charter §5–7): nenhum dado inventado; a "vida" vem de
  dados reais (git, build, estados de arquivo).
- **Orçamentos** (doc 06 §7): JS 74,4/110 · CSS 21,1/25 — folga preservada;
  features pesadas nascem lazy; medir a cada marco.
- **ADR-0014/0015 preservados** (conteúdo-como-documento; sem cenografia) e
  **estendidos**, nunca contraditos. O mecanismo da ADR-0013 permanece; só a cor
  foi superada (ADR-0016).
- **Design by Subtraction** como decisão padrão: na dúvida, remover.
