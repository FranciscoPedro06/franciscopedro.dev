# Revisão técnica — Sprint 1 (Fundação)

**Data:** 2026-07-11 · **Commit de marco:** `6dcd028` · **Veredito:** Aprovado

## Escopo entregue × planejado

Planejado (doc 07 §7, S1 = M1–M3): fundação, tokens, CI, layout base.
Entregue integralmente, mais o modelo de conteúdo tipado (antecipação do M6
justificada: o teste de contrato precisava existir antes do primeiro conteúdo).

## Verificação

- ESLint: limpo · tsc: limpo · Vitest: 5/5 · Build: 92,9 KB gzip JS
  (orçamento então vigente: 150 KB).
- Menu mobile verificado nos contratos de teste: dialog, Esc, foco.

## Achados e correções durante o sprint

1. **ESLint 10 incompatível com `eslint-plugin-jsx-a11y`** → fixado ESLint 9.
   Reavaliar quando o plugin suportar a v10.
2. **`baseUrl` deprecado no TypeScript 6** → migrado para `paths` relativos.
3. **Teste de contrato reprovou a meta description da home (175 > 160)** →
   copy encurtado no doc 05 e no código. O teste pagou o investimento no
   primeiro dia.

## Pendências geradas

- Deploy de preview (Vercel) depende de ação do Francisco — critério de
  saída do S1 parcialmente transferido.
- Lighthouse CI adiado para o marco de SEO/performance (registrado no
  workflow).

## Aprovação

Revisado e aprovado pelo Francisco em 2026-07-11 ("implementação aprovada,
sem ressalvas" — estrutura, ADRs, commits, tokens, conteúdo tipado, CI e
governança).
