# Revisão técnica — Release 0.3 (FastPass Case Study)

**Data:** 2026-07-11 · **Commit de marco:** (este commit) · **Veredito:** Aprovado internamente; aguarda validação do Francisco

## Objetivo e escopo

Transformar o template mínimo de case no estudo de caso completo, provado com
o FastPass — a página que demonstra capacidade de engenharia (prioridades do
handoff: contexto, arquitetura, decisões, trade-offs, integração, segurança,
erros, aprendizados, evolução). Fora do escopo desta release: pre-render/SEO
(M7) e o conteúdo dos 4 cases restantes.

## Entregue

- **Conteúdo por arquivo** (`src/content/projects/`, doc 06 §2): um case = um
  arquivo (RNF06); `projects.ts` monolítico removido.
- **FastPass integral** (doc 05 §3.1): 7 seções canônicas. O doc 05 foi
  estendido **antes do código** com dois acréscimos factuais do doc 00:
  parágrafo de integração/segurança na Arquitetura (Sanctum Bearer,
  middleware de papéis, services isolados, `EmbarqueService` como regra
  única) e a evolução planejada do embarque (score de confiança) na decisão 4.
- **Template completo em `src/case/`** (estrutura do doc 06 §2): `CasePage`,
  `CaseSection` (seções canônicas; decisões numeradas em `ol`, desafios em
  `ul`), `CaseNav`, `CaseIndex` (índice lateral fixo com scroll-spy — doc 03
  §5.3, V1-5) e `ArchitectureDiagram` (moldura do doc 04 §6.10).
- **Diagrama de arquitetura do FastPass** em SVG inline (doc 11): 4 nós,
  conectores ortogonais, um único caminho em acento (front → API), Mercado
  Pago como nó externo tracejado. Antecipação parcial de V1-2 justificada: o
  case principal sem diagrama não cumpre o doc 03 §6 item 6.
- **Modelo de conteúdo:** `CaseSectionItem` e `DiagramRef` em `types.ts` — o
  conteúdo referencia diagramas por id; só o template importa componentes
  (fronteira do doc 06 §3.1 preservada).
- **Meta-documentos** `docs/00-context.md` e `docs/01-project-state.md`
  (pedido do handoff), listados no índice fora da cadeia de precedência.

## Decisões de implementação (interpretações registradas)

1. **Headings das seções: `h2` semântico em escala visual `h3`.** O doc 04
   §6.9 pede "SectionHeading reduzido (h3)" e o doc 09 §9 pede "h2 por seção
   canônica"; h1→h3 saltaria hierarquia (doc 04 §8.1). Resolvido como
   semântica h2 + tipografia `text-h3`.
2. **Âncoras do índice via `Link`** (não `<a>`): a navegação passa pelo
   router e o `ScrollManager` move o foco junto com o scroll (doc 13 §2).
3. **SVG inline, não `<img>`:** o diagrama herda tokens e fontes do tema
   (doc 11 §4); custo de 1,4 KB gzip no chunk lazy do case (2,1/35 KB).
4. **Sem ADR novo:** nenhuma decisão contraria ou estende a arquitetura
   registrada — a release implementa estruturas já normatizadas.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **23/23** · build ok.
- Orçamentos (CI): JS entrada 97,1 KB / 110 KB · chunk do case 2,1 KB /
  35 KB · CSS 19,3 KB / 25 KB.
- Testes novos: contrato de seções (ordem canônica sem repetição, nenhuma
  seção vazia, estrutura mínima do case principal, diagrama com descrição
  acessível e id existente no registro) e template (ordem de renderização,
  omissão de seções ausentes, `ol`/`ul` por tipo, índice lateral, diagrama
  acessível, anterior/próximo, 404).

## Pendências geradas

- Seções dos 4 cases restantes + diagramas API Facial/Carrinho → Release 0.4.
- Pre-render + SEO por rota + OG (M7) → release dedicada.
- Screenshots do FastPass (`media`) seguem `[PENDENTE]` — o case publica sem
  mídia (doc 12 §5).
- Checklist manual de acessibilidade (doc 06 §9) da página de case: executar
  quando a release for validada em navegador real (NVDA, Tab, zoom 200%).
