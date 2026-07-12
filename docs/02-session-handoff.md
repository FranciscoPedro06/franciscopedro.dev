# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-12 · **Release encerrada:** 0.4 — Engineering Case Studies

## Próximo objetivo

**Release 0.5 — Production Readiness** (nome definido pelo Francisco):
SEO/pre-render + 404 noindex (M7), otimizações finais e refinamentos de
publicação. Escopo exato se valida no planejamento com o Francisco.

## Arquivos provavelmente envolvidos

- Doc de referência normativa: [09-seo-foundation.md](09-seo-foundation.md)
  (M7) e doc 05 §6 (títulos, descriptions, OG, JSON-LD).
- `index.html`, `vite.config.ts` e `scripts/` — pre-render/geração de
  sitemap e robots entram pelo build.
- `src/lib/seo.ts` — hoje só título por rota (`usePageTitle`).

## Decisões desta release

- Os 5 cases estão completos; **diagrama só onde responde uma pergunta**
  (doc 11 §1): FastPass, API Facial e Carrinho têm; EduPass e Reviva não —
  decisão validada pelo Francisco, não é pendência.
- A narrativa de evolução da API Facial (EduPass → confirmação de presença →
  microserviço do FastPass) foi acrescentada ao doc 05 §3.2 **antes** do
  código, com fatos do doc 00 §2.
- Orçamento de entrada subiu para 100,3 KB / 110 KB (prosa dos 4 cases entra
  no bundle inicial via índice de projetos). Folga de ~9,7 KB: se um marco
  futuro estourar, apresentar análise ao Francisco antes de mudar
  arquitetura (diretriz registrada na revisão da 0.4).

## Observações

- As Releases 0.3 e 0.4 aguardam validação do Francisco em navegador real,
  incluindo o checklist manual de acessibilidade das páginas de case
  (NVDA, Tab, zoom 200%).
- As pendências de material do Francisco que bloqueiam a publicação estão
  no [01-project-state.md](01-project-state.md).
