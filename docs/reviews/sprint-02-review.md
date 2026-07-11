# Revisão técnica — Sprint 2 (Home)

**Data:** 2026-07-11 · **Commit de marco:** (este commit) · **Veredito:** Aprovado internamente; aguarda validação do Francisco

## Escopo entregue × planejado

Planejado: home completa com o conteúdo do doc 05, na ordem revisada
(Hero → Featured Work → Engineering → Data → Timeline → About → Contact),
Featured Work com apenas os 3 principais cases.

Entregue: as 7 seções; página `/projetos` (índice dos 5 cases — implicada
pela diretriz "manter os demais na página de projetos"); template `CasePage`
antecipado em versão mínima honesta (cabeçalho com dados reais + navegação
anterior/próximo — as seções canônicas entram no S3); scroll-spy na NavBar;
gestão de scroll/foco por rota; título por rota.

## Decisões do sprint (documentadas antes do código)

- Nova ordem da home e racional: doc 03 §4. Seção Engineering: conteúdo novo
  no doc 05 §2.7 (princípios com evidência + stack por categoria).
- Featured = FastPass (destaque) + API Facial + Carrinho Inteligente — os
  três de maior densidade de engenharia (doc 05 §2.3).
- Acessos pendentes degradam com honestidade: sem botão Currículo enquanto
  `resumeReady=false`; sem e-mail no contato até existir; cards sem imagem
  até haver screenshots reais (doc 12 §5). Nenhum placeholder visível.
- Timeline omite o marco do MIS até a data ser confirmada (o marco "Hoje"
  cobre a atuação atual sem inventar data).

## Verificação

- ESLint limpo · tsc limpo · Vitest 13/13 · build ok.
- Orçamentos (CI): JS entrada 95,4 KB / 110 KB · CSS 19,0 KB / 25 KB ·
  chunks lazy ≤0,7 KB / 35 KB.
- Testes novos: contrato dos 5 projetos (slugs, ordem, 1 featured,
  3 highlighted, limites de SEO, repos https, mídia com alt), ordem das 7
  seções da home, 3 cards + link para o índice, currículo oculto.

## Achados e correções durante o sprint

1. Título SEO do case da API Facial com 65 caracteres (limite 60) → encurtado
   para "Reconhecimento Facial — estudo de caso · Francisco Pedro" (doc 05 e
   conteúdo). Segunda captura real do teste de contrato de SEO.
2. jsdom sem `IntersectionObserver`/`scrollTo` → mocks no setup de teste.

## Pendências geradas

- Ver `[PENDENTE]` doc 05 §7 (foto, e-mail, LinkedIn, CV, resultados MIS,
  screenshots) — degradação já implementada.
- Wireframe do hero (doc 03 §5.1) prevê foto à direita; layout atual é
  coluna única até o asset existir.
