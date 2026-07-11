# ADR-0008 — Analytics com Umami (v2)

**Status:** Aceito (implementação na v2 — doc 07 V2-3)
**Data:** 2026-07-11

## Contexto

A v2 prevê analytics de audiência. Requisitos: respeito à privacidade (sem
cookies, sem banner de consentimento, conformidade LGPD/GDPR por design),
custo zero (charter §14), script leve que não ameace os orçamentos do doc 06
§7, e independência de plataforma (o site não deve se acoplar à Vercel além
do deploy).

## Decisão

**Umami** (umami.is), no plano Cloud gratuito, com possibilidade de
self-hosting futuro sem troca de ferramenta.

## Alternativas consideradas

- **Plausible** — a referência da categoria; tecnicamente equivalente ao
  Umami para este caso de uso (sem cookies, script ~1 KB, dashboard simples).
  Reprovada por um único critério objetivo: não tem plano gratuito (trial de
  30 dias; a partir de ~€9/mês), violando a restrição de orçamento zero.
  Self-hosting do Plausible (CE) exige infraestrutura própria — mesmo custo
  disfarçado.
- **Vercel Web Analytics** — integração zero-config com o deploy e tier
  gratuito; reprovada por acoplamento: métricas presas à plataforma de
  hosting contradizem a independência desejada, e o tier gratuito é limitado
  a 2.500 eventos/mês sem exportação.
- **Cloudflare Web Analytics** — gratuito e sem cookies, mas métricas rasas
  (sem páginas de saída/duração confiáveis via beacon) e exige proxy/DNS na
  Cloudflare para o modo completo.
- **Google Analytics 4** — reprovada sem análise extensa: cookies,
  consentimento, peso de script e postura de privacidade incompatíveis com a
  marca (doc 02).

## Consequências

- Sem banner de consentimento: coleta anônima, agregada, sem identificador
  persistente — LGPD por design.
- Script de ~2 KB async fora do caminho crítico; orçamento intacto.
- Plano gratuito tem retenção limitada (~6 meses–1 ano) — suficiente para a
  pergunta que o site precisa responder ("quais cases interessam a quem
  visita?"). Se um dia precisar de retenção longa: self-host do mesmo Umami,
  sem migração de ferramenta.
- Nada é implementado na v1 (doc 07); este ADR fixa a escolha para eliminar
  a decisão do caminho crítico da v2.
