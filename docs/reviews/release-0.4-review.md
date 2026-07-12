# Revisão técnica — Release 0.4 (Engineering Case Studies)

**Data:** 2026-07-12 · **Commit de marco:** (este commit) · **Veredito:** Aprovado internamente; aguarda validação do Francisco

## Objetivo e escopo

Concluir os quatro estudos de caso restantes no padrão do FastPass, para que
o portfólio apresente a evolução técnica completa. Diretrizes validadas no
planejamento: API Facial como segundo case mais importante (narrativa de
evolução explícita), diagramas apenas onde agregam entendimento (FastPass,
API Facial, Carrinho — EduPass e Reviva sem), foco em decisões de engenharia
e erros corrigidos. Fora do escopo: SEO/pre-render, 404 noindex e
refinamentos de publicação (→ Release de Production Readiness).

## Entregue

- **4 cases completos** em `src/content/projects/` — transcrição fiel do
  doc 05 §3.2–3.5 para o modelo tipado, no template existente de `src/case/`:
  - **API de Reconhecimento Facial** (§3.2): única com seção *Pesquisa*
    (Facenet512, threshold 0.35 como decisão nomeada); desafios registram os
    erros corrigidos (detectores distintos no cadastro/verificação,
    credencial no repositório); aprendizados incluem a evolução planejada
    (pgvector, pré-carga do modelo, anti-spoofing, camadas).
  - **Carrinho Inteligente** (§3.3), **EduPass** (§3.4) e **Reviva** (§3.5),
    cada um com problema → decisões → desafios → resultados → aprendizados.
- **Narrativa de evolução da API Facial** (pedido do Francisco): parágrafo
  novo abrindo a Arquitetura — EduPass → sistema de confirmação de presença →
  microserviço do FastPass — explicando os três problemas que a extração
  resolveu (stack de ML isolado, reuso entre projetos, deploy com ciclo
  próprio). Acrescentado **antes ao doc 05 §3.2** (bloco "Evolução"), com
  fatos do doc 00 §2; o código transcreve.
- **2 diagramas novos** em `src/case/diagrams/` (padrão doc 11, SVG inline
  com tokens do tema, conectores ortogonais, um caminho em acento):
  - `facial-arquitetura`: FastPass-BackEnd → face-id → Supabase (nó externo
    tracejado); acento no consumo `/register · /verify`.
  - `carrinho-arquitetura`: ESP32-CAM → leitor de QR → API Spring Boot como
    agrupamento com as quatro camadas → MySQL; acento na travessia das
    camadas (a tese do case). 7 nós — o teto do doc 11 §1.2.

## Decisões de implementação (interpretações registradas)

1. **EduPass e Reviva sem diagrama** (validado no planejamento): doc 11 §1.1
   — a arquitetura do EduPass é a mesma história do diagrama facial, e o
   Reviva (app + Firebase) renderia 3 nós sem pergunta própria a responder.
2. **Reviva sem seção "Desafios e soluções":** o doc 05 §3.5 não a define; a
   página omite a seção em vez de preencher (doc 03 §6 / doc 12 §5).
3. **Título "Aprendizados e evolução planejada"** no case facial, mantendo o
   `kind: "aprendizados"` — o título é conteúdo, a âncora é contrato.
4. **Nó `face-id` com nome do repositório**, seguindo a convenção do diagrama
   do FastPass (nós nomeados pelos repos).
5. **Sem nó de front-end no diagrama do Carrinho:** o teto de 7 nós foi gasto
   nas camadas — que são a pergunta que o diagrama responde; o texto da seção
   cobre o restante.
6. **Sem ADR novo:** nenhuma decisão contraria ou estende a arquitetura
   registrada — a release preenche estruturas existentes.

## Verificação

- ESLint limpo · `tsc --noEmit` limpo · Vitest **26/26** · build ok.
- Orçamentos (CI): JS entrada **100,3 KB / 110 KB** (+3,2 KB — a prosa dos 4
  cases entra no bundle de entrada via índice de projetos; dentro do limite,
  sem mudança arquitetural) · chunk do case **2,8 KB / 35 KB** (+0,7 KB dos
  2 diagramas) · CSS **19,3 KB / 25 KB** (estável).
- Testes novos (3): contrato de história completa nos 5 cases (seções não
  vazias, `problema` primeiro, `aprendizados` por último, ordem canônica do
  doc 03 §6), renderização dos 5 cases (h1 + seções na ordem do conteúdo) e
  acessibilidade dos 2 diagramas novos (`role="img"` + descrição).

## Pendências geradas

- **Release de Production Readiness** (próxima): SEO/pre-render + 404
  noindex (M7) e refinamentos de publicação.
- Screenshots dos 5 projetos (`media`) seguem `[PENDENTE]` — as páginas
  publicam sem mídia (doc 12 §5).
- Checklist manual de acessibilidade (doc 06 §9) das 4 páginas novas de case:
  executar na validação em navegador real (NVDA, Tab, zoom 200%) — junto com
  a validação pendente da Release 0.3.
- Confirmações factuais do doc 05 §7 (datas EduPass/MIS, FastPass como TCC)
  seguem bloqueando apenas a publicação.
