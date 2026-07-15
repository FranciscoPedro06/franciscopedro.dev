# Revisão técnica — Release 0.8 (Redesign / Maturidade de produto)

**Data:** 2026-07-14 · **Planejamento:** [release-0.8-design-review.md](release-0.8-design-review.md)
· **Decisões:** ADR-0014 (conteúdo como documento), ADR-0015 (sem cenografia).

## Objetivo

Eliminar a sensação de template/IA e fazer o produto parecer software
profissional com identidade própria, fechando a dissonância entre a moldura de
IDE e um conteúdo que ainda se comportava como landing page.

## Escopo entregue × planejado

| Marco | Planejado | Entregue |
|---|---|---|
| M1 | Linguagem visual (tokens) | ✅ Escala tipográfica contida (teto 40 px, corpo 15 px, uma voz); rampa de neutros +`surface-3`; elevação `.elevated` (só flutuante); canvas decorativo removido; `radius-lg` 8; densidade dupla no doc 04 §3.1 |
| M2 | Conteúdo como documento | ✅ `DocHeader` (comentário mono + título + lead) no lugar do `SectionHeading`; `overview` reconstruído (identidade = cabeçalho de arquivo, sem centralização/CTAs); `View` densa; `Minimap` decorativo removido |
| M3 | Documentos de conteúdo | ✅ 6 views + `/projetos` + cases migrados; de-carding de Engenharia/Dados (listas de documento, não grades de cards); ações de marketing → links de workspace; `SectionHeading` removido |
| M4 | Workspace vivo + descoberta | ✅ Status bar com branch + último commit reais (data relativa viva, SSR-safe) que abre o SCM; gatilho *command-first* visível na title bar. Sem datas por-arquivo fabricadas |
| M5 | Refino transversal + fecho | ✅ 404 re-vozeado (documento, `// 404` semântico); varredura de cards/containers (só molduras de mídia legítimas restam); docs, CHANGELOG e handoff atualizados |

**Fora de escopo (deslocado para 0.9/v1.0):** integração do material do Francisco
(foto, e-mail, CV, LinkedIn), roadmap GitHub pré-lançamento, medição do M7 ≥ 95.

## Verificação (gate de qualidade, doc 00)

- **ESLint:** limpo. **`tsc --noEmit`:** limpo. **Vitest:** **56/56** (os 44
  originais + os 12 do shell — todos intactos; nenhum contrato de heading, a11y
  ou navegação quebrado).
- **Build:** 8 HTMLs pré-renderizados; SSR/SEO/rotas intactos (ADR-0010/0011).
- **Orçamentos (doc 06 §7):** JS inicial **74,4 / 110 KB** · maior lazy 3,0 / 35
  · **CSS 21,1 / 25 KB**. Todos dentro do limite. (CSS caiu com a saída do
  canvas; JS subiu ~0,9 KB pelo ícone do gatilho de comandos.)
- **Contraste:** os pares AA da 0.7 preservados; `surface-3` só recebe
  texto primário/secundário (restrição registrada no doc 04 §1.1/§1.5). Medição
  real segue com o Lighthouse (jsdom não pinta pixels — lição da 0.5).

## Achados e decisões

- **Auditoria questionada, não seguida à risca:** rejeitados, com justificativa
  (design-review §3), "adicionar sombras" (profundidade por plano, não sombra),
  "trocar a paleta" (estendida, não substituída — AA preservado) e "acumular
  imperfeições" (assimetria só quando a função a justifica — ADR-0015). A nota
  "interatividade 4,5" foi tratada como problema de **descoberta**, não de
  movimento.
- **Pergunta-guia (ADR-0014) atendida:** sem os ícones e o Explorer, o conteúdo
  ainda lê como documento de workspace — cabeçalhos com comentário mono, prosa
  densa alinhada à esquerda, metadados reais, breadcrumb de caminho. A linguagem
  de landing (hero centralizado, labels de marketing, botões preenchidos) saiu.

## Pendências geradas

- **Validação em navegador real** (o Francisco): desktop/tablet/mobile, tema
  light/dark, checklist de a11y (NVDA/Tab/zoom 200 %). É a base que a 0.7 já
  aguardava e agora inclui o redesign.
- **Medição de contraste** do `surface-3` e das cores semânticas no Lighthouse
  (o script mede; o juiz é o navegador).
- **Overview** propositalmente concisa (abertura de README); enriquecer só se a
  validação pedir — sem fabricar dados.

## Veredito

**Aprovado (aguardando validação em navegador real).** O eixo "conteúdo como
documento" fechou a dissonância; o gate está verde; a identidade deixou de ser
cenográfica e passou a funcional. A publicação segue bloqueada pelo material do
Francisco (0.9/v1.0), não pelo desenvolvimento.
