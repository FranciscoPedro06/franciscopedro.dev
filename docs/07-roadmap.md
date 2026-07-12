# 07 — Roadmap

> Organiza a evolução do produto: do MVP às versões futuras, incluindo o
> ecossistema de dados que sustenta o posicionamento. Prioridades seguem
> MoSCoW (Must/Should/Could/Won't-for-now). Datas assumem dedicação parcial;
> o compromisso é com a ordem, não com o calendário.

---

## 1. Visão de versões

```
MVP ──────▶ v1.0 ──────▶ v1.x ──────▶ v2.0 ──────▶ v3.0
home +      5 cases +    conteúdo     escrita +    ecossistema de dados
1 case      polimento    pendente     analytics    (FastPass Analytics)
(privado)   (público)    integrado
```

O site só se torna público na **v1.0**. O MVP é um marco interno de
validação, não um lançamento.

## 2. MVP — fundação + prova do template

Objetivo: provar que a fundação sustenta o produto inteiro antes de escalar
conteúdo.

| # | Entrega | Prioridade |
|---|---|---|
| M1 | Projeto Vite + TS strict + Tailwind com todos os tokens do doc 04 | Must |
| M2 | CI completo (lint, typecheck, test, build, Lighthouse) desde o 1º commit | Must |
| M3 | Layout base: NavBar (com menu mobile), Footer, Section, SkipLink | Must |
| M4 | Home completa com conteúdo do doc 05 (placeholders onde `[PENDENTE]`) | Must |
| M5 | Template de case (`CasePage`) renderizando **1 case completo (FastPass)** | Must |
| M6 | Modelo de conteúdo tipado + teste de contrato dos dados | Must |
| M7 | Pre-render + SEO por rota + 404 | Must |

**Critério de saída:** Lighthouse ≥ 95 nas 4 métricas com o case do FastPass
no ar (preview privado da Vercel); adicionar um case novo não exige tocar em
componente.

## 3. v1.0 — lançamento público

| # | Entrega | Prioridade |
|---|---|---|
| V1-1 | 4 cases restantes (API Facial, Carrinho, EduPass, Reviva) — só dados | Must |
| V1-2 | Diagramas de arquitetura (FastPass, API Facial, Carrinho) em SVG | Must |
| V1-3 | Conteúdo pendente integrado: foto, CV, LinkedIn, e-mail, resultados MIS | Must |
| V1-4 | Screenshots reais tratados (AVIF/WebP, variantes) nos 5 cases | Must |
| V1-5 | Navegação anterior/próximo entre cases + scroll-spy do índice lateral | Should |
| V1-6 | OG images por case | Should |
| V1-7 | Checklist manual de acessibilidade (doc 06 §9) executado e registrado | Must |
| V1-8 | Domínio `franciscopedro.dev` registrado e configurado | Must (promovido — a wordmark é o domínio, ADR-0009) |
| V1-9 | Rota `/resume` com currículo PT/EN + PDFs para download (RF10) | Must |

**Critério de lançamento:** zero `[PENDENTE]` visível; critérios de sucesso
do charter §11 verificados; roadmap do GitHub (doc 00 §3, fase imediata)
executado — o portfólio não pode apontar para repositórios com chave exposta
e READMEs vazios.

### Dependência externa — GitHub (pré-lançamento)

Do doc 00 §3, bloqueiam a v1.0 por serem o destino dos links do site:

1. Rotacionar chave Supabase exposta (`face-id`, `edupass-backend`).
2. Fork oficial dos repositórios FastPass para o perfil do Francisco.
3. READMEs profissionais nos 5 repositórios linkados pelos cases.
4. Arquivar repositórios vazios/ruído; atualizar perfil e pins.

## 4. v1.x — refinamento contínuo

Backlog de melhorias sem mudança estrutural:

- Vídeos de demonstração nos cases (quando gravados).
- Ajustes de copy pós-feedback de recrutadores reais.
- Página de imprensa do FastPass restaurado (se a demo voltar ao ar,
  linkar demo ao vivo no case).
- Micro-interações adicionais dentro dos limites do doc 04 §5.

## 5. v2.0 — escrita e audiência

| # | Entrega | Prioridade |
|---|---|---|
| V2-1 | Seção **Writing**: artigos técnicos em MDX, mesma identidade (rota `/escrita`) | Must (da v2) |
| V2-2 | Reavaliação SPA → SSG (decisão registrada no doc 06 §1: o blog muda a equação) | Must (da v2) |
| V2-3 | Web analytics respeitoso à privacidade (Plausible/Umami, sem cookies, sem banner) | Should |
| V2-4 | RSS do blog | Could |

Pauta editorial inicial (nasce dos cases — conteúdo já validado):

1. "O bug silencioso de usar dois detectores faciais" (da API Facial).
2. "Vaga só confirmada com pagamento: modelando concorrência no Laravel."
3. "O dia em que um push na main apagou meu trabalho — e o que mudou depois."

## 6. v3.0 — o ecossistema de dados

A versão que completa a tese do posicionamento: o mesmo autor constrói o
produto **e** a esteira de dados dele. Cada peça vira um case novo no
portfólio e um repositório público.

| # | Entrega | Descrição | Prioridade |
|---|---|---|---|
| V3-1 | **FastPass ETL** | Pipeline Python extraindo dados operacionais do FastPass (compras, embarques, ocupação), com tratamento e cargas incrementais documentadas | Must (da v3) |
| V3-2 | **FastPass Data Warehouse** | Modelagem dimensional (esquema estrela: fato embarque/venda, dimensões excursão/passageiro/tempo) em Postgres | Must (da v3) |
| V3-3 | **FastPass Analytics** | Dashboard Power BI publicado sobre o DW: ocupação por excursão, conversão de pagamento, método de embarque | Must (da v3) |
| V3-4 | Case "FastPass Analytics" no portfólio | O estudo de caso que fecha o ciclo produto → dados → decisão, linkando os três repositórios | Must (da v3) |
| V3-5 | **Machine Learning aplicado** | Previsão de demanda de excursões (scikit-learn) sobre o DW; notebook + endpoint | Could |
| V3-6 | Seção Dados da home atualizada | De "competências" para "competências + ecossistema vivo" | Should |

Pré-requisito técnico: FastPass com a integração de pagamento restaurada
(doc 00 §1.7 item 1) — sem dados de compra reais/simulados não há pipeline.

## 7. Sprints — planejamento

Sprints de escopo (1–2 semanas cada, dedicação parcial):

> A partir do fim do S2, os marcos passam a ser tratados como **Releases**
> numeradas (0.3, 0.4, …), mantendo o mesmo escopo planejado abaixo. O S3 foi
> dividido: a Release 0.3 entregou M5 (template completo + FastPass, com o
> diagrama do FastPass antecipado de V1-2); M7 (pre-render + SEO) fica para
> release dedicada. Estado corrente: [01-project-state.md](01-project-state.md).

| Sprint | Escopo | Marco |
|---|---|---|
| S0 ✅ | Auditoria + documentação (docs 00–07) | Documentação aprovada |
| S1 ✅ | M1–M3: fundação, tokens, CI, layout base | Deploy de preview com layout vazio |
| S2 ✅ | M4: home completa | Home navegável |
| S3 | M5–M7: template de case + FastPass + SEO | **MVP** — M5 entregue na Release 0.3 |
| S4 | V1-1, V1-2: 4 cases + diagramas | Conteúdo completo |
| S5 | V1-3 a V1-8 + roadmap GitHub pré-lançamento | **v1.0 pública** |

Regra de corte: se um sprint estourar, corta-se escopo Should/Could — nunca
qualidade dos Must (charter §7).

## 8. Priorização — critérios

1. **Fundação antes de conteúdo** (S1 antes de S2): retrabalho de fundação é
   o mais caro.
2. **Template provado com o case mais complexo** (FastPass no MVP): se o
   template aguenta o FastPass, aguenta os outros quatro.
3. **Pendências externas não bloqueiam desenvolvimento**: placeholders
   tipados marcam o que falta; a integração é um sprint, não uma espera.
4. **GitHub antes do lançamento, não antes do código**: os links precisam
   estar limpos quando o público chegar — não antes.

## 9. Melhorias e integrações futuras (backlog aberto, sem versão)

- Tema claro (se houver demanda real de leitura).
- Internacionalização en-US (se o alcance justificar o custo editorial ×2).
- Modo de impressão do currículo gerado a partir do conteúdo do site
  (uma fonte para CV PDF e página).
- Case do FastPass-Facial reescrito quando o microserviço for publicado com
  a arquitetura evoluída (pgvector, anti-spoofing — doc 00 §1.7).
- Repositório de SQL/modelagem dimensional como material de apoio da seção
  Dados (doc 00 §3, médio prazo).
- Testes E2E (Playwright) se o site ganhar interatividade real na v2+.

## 10. O que este roadmap recusa

Para proteger o charter:

- Formulário de contato, chatbot, newsletter — contato é direto.
- Contadores de visitas, badges de tecnologia animados, "skills" com barras
  de porcentagem.
- Qualquer seção que exija dados fictícios para parecer cheia.
- Migração de stack sem requisito novo documentado.
