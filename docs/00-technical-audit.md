# Relatório Estratégico — Portfólio Francisco Pedro

> Gerado em 2026-07-11, a partir da auditoria dos repositórios de
> github.com/FranciscoPedro06 e dos repositórios FastPass em
> github.com/maatheusantanadev. Este documento orienta o design e a
> implementação do portfólio. Nenhuma implementação antes da validação.

---

## 1. Auditoria completa do FastPass

### 1.1 O produto

Plataforma de gestão de turismo e excursões (contexto Bahia) cujo diferencial é o
**embarque inteligente**: reconhecimento facial, QR Code e conferência manual.
Um único front-end atende três superfícies — app do passageiro (mobile-first),
app de operação do motorista (mobile-first, telas imersivas de validação) e
painel administrativo (desktop-first). 42 telas, 30 componentes próprios.

### 1.2 Autoria

Francisco é o autor principal: **30 de 34 commits no front, 12 de 16 no back**,
com commits convencionais descritivos (`feat:`, `fix:`, `chore:`, `docs:`).
Os commits do colega são "update files" sem descrição.

### 1.3 Arquitetura do ecossistema

```
┌─────────────────────┐        ┌──────────────────────┐       ┌─────────────────────┐
│  FastPass-FrontEnd  │  HTTP  │   FastPass-BackEnd   │ HTTP  │   FastPass-Facial   │
│  React 18 + Vite 6  │───────▶│  Laravel + Sanctum   │──────▶│  FastAPI + DeepFace │
│  Tailwind (tokens)  │ Bearer │  MySQL/SQLite        │       │  /register /verify  │
│  Vercel / Docker    │        │  Render + Docker     │       │  (não publicado)    │
└─────────────────────┘        └──────────┬───────────┘       └─────────────────────┘
                                          │ HTTP (removido do HEAD)
                                          ▼
                                 ┌──────────────────┐
                                 │   Mercado Pago   │
                                 │  Pix v1/payments │
                                 └──────────────────┘
```

**Front-end.** React 18 + Vite 6, Tailwind com design system próprio
(tokens `cobalt #2B50FF`, tipografia Jost + Inter), Framer Motion,
React Router 6. Camada `src/api/` com wrapper de fetch (`ApiError`
normalizado, `status: 0` = offline), adapters back→telas e **degradação
graciosa** para mocks quando o backend está fora do ar. Acessibilidade real
(labels, foco visível, alvos ≥44px, `prefers-reduced-motion`, safe-area).
Deploy: Vercel (rewrite SPA) + Docker multi-stage com Nginx.

**Back-end.** Laravel + Sanctum, middleware de roles
(passageiro/motorista/administrador), controllers finos + services
(`EmbarqueService`, `FacialRecognitionService`, `PagamentoService`),
migrations com índices e constraints, seeders, Docker com entrypoint que roda
`migrate --seed`, deploy no Render. O `routes/api.php` documenta o fluxo de
negócio inteiro em comentário — excelente prática.

**Microserviço facial.** FastAPI + DeepFace, consumido pelo Laravel via
`FacialRecognitionService` (rotas `/register` e `/verify`, com
`FACIAL_API_FAKE=true` para demos). **O repositório não está público** — só o
antecessor (`face-id` / `edupass-backend`).

### 1.4 Fluxo completo de autenticação e reconhecimento

1. **Cadastro/Login** — `POST /auth/register|login` → token Sanctum →
   `localStorage` no front, injetado como Bearer pelo `client.js`.
2. **Compra** — `POST /compras` com `DB::transaction` + `lockForUpdate` na
   excursão (proteção contra corrida na última vaga), débito de vaga, QR Code
   único (UUID) por compra.
3. **Pagamento (versão e2e960d, removida do HEAD)** — `PagamentoService` cria
   cobrança Pix no Mercado Pago (`X-Idempotency-Key`, `external_reference`);
   compra nasce `pendente_pagamento` e **a vaga só é debitada na
   confirmação**; front faz polling em `GET /compras/{id}/pagamento` +
   webhook `POST /webhooks/mercadopago`; modo simulado sem access token.
4. **Cadastro facial** — selfie base64 → `POST /compras/{id}/facial` →
   Laravel → FastAPI `/register` → embedding Facenet512 → `facial_id` na compra.
5. **Embarque — duas gerações coexistem no histórico:**
   - *v1 (automática, do Francisco):* motorista captura o rosto → Laravel →
     FastAPI `/verify` → match por similaridade → `EmbarqueService` efetiva.
   - *v2 (human-in-the-loop, HEAD atual):* passageiro tira selfie e
     `POST /embarque/solicitar` cria um `PedidoEmbarque` pendente; o motorista
     compara as fotos e aprova/reprova. O passageiro nunca confirma o próprio
     embarque.
   - Alternativas: `POST /embarque/qrcode` e `/embarque/manual`, todas
     convergindo no `EmbarqueService` (regra única de efetivação).
6. **Gestão** — painel do admin (KPIs, excursões, validação em tempo real,
   relatórios) e visão do motorista (viagens, lista de embarque, encerramento).

### 1.5 Pontos fortes

- Separação de responsabilidades correta nos dois lados (services no Laravel,
  camada de API + adapters no React).
- Concorrência tratada de verdade (`lockForUpdate` no débito de vaga).
- Modos simulados (facial fake, Mercado Pago fake) — decisão madura de
  engenharia para demos sem dependências externas.
- Contrato de erro normalizado (`ApiError`) e degradação graciosa.
- README do front é nível profissional raro (arquitetura, design system,
  rotas, decisões).
- Migrations com índices compostos, constraints e cascatas bem pensadas.

### 1.6 Pontos fracos e dívidas

| # | Problema | Gravidade |
|---|---|---|
| 1 | Integração Mercado Pago **deletada do HEAD** pelos commits "update files" (07/07). Front ainda chama `GET /compras/{id}/pagamento` → contrato quebrado. Código recuperável em `e2e960d`. | Alta |
| 2 | `composer.lock` deletado → builds não reproduzíveis | Alta |
| 3 | README do back = 1 linha; intro do README do front desatualizada ("não há back-end") | Média |
| 4 | Selfies base64 em `longText` no banco (`pedidos_embarque.foto_enviada`) — deveria ser object storage com URL | Média |
| 5 | Microserviço FastPass-Facial não versionado publicamente | Média |
| 6 | Sem PRs/branch protection — trabalho sobrescrito direto na main | Alta (processo) |
| 7 | Zero testes automatizados (back e front) | Média |
| 8 | Sem CI | Média |
| 9 | Front em JS, não TS | Baixa |
| 10 | `FacialRecognitionService::verificar()` possivelmente órfão após a v2 do embarque | Baixa |

### 1.7 Refatorações recomendadas (em ordem)

1. **Restaurar o pagamento** de `e2e960d` (PagamentoService + webhook + config)
   e o `composer.lock`; reconciliar com o fluxo de PedidoEmbarque.
2. **Unificar os dois modelos de embarque**: verificação automática pela API
   facial com *score de confiança* — acima do threshold aprova direto, abaixo
   cai para aprovação manual do motorista. (Vira o melhor parágrafo de
   "decisões técnicas" do estudo de caso.)
3. Mover imagens para object storage (Supabase Storage/S3), guardando URL.
4. Publicar o **FastPass-Facial** com arquitetura profissional (routers/
   services/repositories, pgvector para busca vetorial, modelo pré-carregado
   no startup, HTTPException, anti-spoofing, testes).
5. Form Requests no Laravel; testes de feature nos fluxos críticos
   (compra concorrente, embarque, roles); CI no GitHub Actions.
6. Branch protection + PRs obrigatórios no repositório.

---

## 2. Comparação entre os projetos — a narrativa de cada um

A tese do portfólio: **"Construo produtos digitais completos e transformo os
dados que eles geram em inteligência para o negócio."** Cada projeto sustenta
um pedaço dessa tese:

| Projeto | Papel | Narrativa que conta |
|---|---|---|
| **FastPass** | Case principal | A síntese: React + Laravel + microserviço ML + pagamentos + 3 perfis de usuário + deploy real. "Sou capaz de conceber, arquitetar e entregar um produto inteiro." |
| **API de Reconhecimento Facial** | Case técnico | A especialização: nasceu como script do EduPass, virou microserviço reutilizado pelo FastPass. "Um componente que evoluiu para plataforma" — mostra pensamento de longo prazo e ML aplicado. |
| **Carrinho Inteligente** | Case de engenharia | A disciplina: camadas Controller→Facade→Application→Repository, docs de negócio (BMC, DER, requisitos), IoT ponta a ponta com ESP32-CAM. "Penso em arquitetura antes de escrever código." |
| **EduPass** | Case de produto/equipe | A origem do ecossistema: web + API + app Expo, 3 perfis, equipe de 4. Onde o reconhecimento facial nasceu. "Sei trabalhar em produto com outras pessoas." |
| **Reviva** | Case mobile | O conceito: cápsula do tempo de memórias com desbloqueio por data. Melhor higiene de git (issues referenciadas, PRs). "Produto com identidade própria." |

**Arco de evolução (aparece na timeline do portfólio):**
C (Locadora, dez/2024) → Java/POO → Android (Reviva, mai/2025) → Spring Boot
(Carrinho, set/2025) → Python + reconhecimento facial (EduPass/face-id,
nov/2025) → FastAPI (microserviço) → React + Laravel (FastPass, jul/2026) →
atuação profissional como Analista de Dados (MIS).

O fio condutor do reconhecimento facial atravessa três projetos
(EduPass → presence-confirmation → FastPass-Facial) e é a prova mais forte de
maturidade: o mesmo problema resolvido três vezes, cada vez melhor.
`presence-confirmation-system` (repo do Matheus) entra só como contexto nessa
narrativa, não como case próprio.

---

## 3. Roadmap do GitHub

### Imediato (esta semana)

1. **Rotacionar a chave Supabase** exposta em `face-id/app.py` e
   `edupass-backend/app.py`; mover para env vars; ativar RLS.
2. **Arquivar**: `testes-bi`, `placa-aguarde-sette`, `placa-aguarde-setteengenharia`,
   `office-powershell`, `selenium-web-driver` (ou limpar `node_modules`/`.history`
   e manter), `fastpass-tcc` (deletar — vazio e confunde), forks sem uso.
3. **Novo README de perfil** alinhado ao posicionamento (Software Developer &
   Data Analyst; a bio atual "Fullstack developer by day…" contradiz).
   Fixar (pin): FastPass-FrontEnd (fork), FastPass-BackEnd (fork), face-id
   (renomeado), carrinho-inteligente, EduPass, reviva-app.
4. **Fork oficial dos repos FastPass** para o seu perfil (mantém "forked from"
   e sua autoria nos insights) + seção "Equipe" nos READMEs deixando claro o
   papel de cada um.

### Curto prazo (2–4 semanas)

5. READMEs profissionais (padrão: 1 frase de valor, screenshots, diagrama de
   arquitetura, stack, como rodar, decisões técnicas, roadmap) para:
   carrinho-inteligente (hoje é "."), EduPass (ecossistema completo),
   reviva-app (adicionar screenshots), FastPass-BackEnd (hoje 1 linha).
6. Restaurar o Mercado Pago + `composer.lock` no FastPass-BackEnd (PR a partir
   de `e2e960d`); propor branch protection no repositório.
7. **Publicar o FastPass-Facial** como repositório próprio — a evolução do
   `face-id` com a arquitetura da seção 1.7. É o repositório com maior
   potencial de impressionar tecnicamente.
8. Limpar `.idea/`, `google-services.json` e arquivos de anotação dos repos.

### Médio prazo (1–3 meses) — projetos novos alinhados ao perfil de dados

9. **FastPass Analytics** (prioridade máxima): pipeline ETL dos dados do
   FastPass (compras, embarques, ocupação) → Postgres → transformação em
   Python/dbt → dashboard Power BI publicado. É o projeto que **materializa o
   posicionamento**: o mesmo autor constrói o produto e extrai inteligência
   dos dados dele.
10. Repositório de SQL avançado / modelagem dimensional (window functions,
    esquema estrela, otimização) com cases resolvidos.
11. Automação de relatório estilo MIS (Python + openpyxl / Power Query) com
    dados anonimizados/sintéticos, documentando ganho de tempo.
12. ML aplicado leve: previsão de demanda de excursões com dados sintéticos do
    FastPass (scikit-learn, notebook + endpoint FastAPI).

Regra: 2–3 projetos novos bem-feitos, não dezenas.

---

## 4. Plano do portfólio

### Posicionamento

**Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados.**
Sub-headline: constrói produtos digitais completos e transforma os dados que
eles geram em inteligência para o negócio.

### Rotas

```
/                              home (hero, sobre, projetos, timeline, dados, contato)
/projetos/fastpass             case principal (o mais profundo)
/projetos/reconhecimento-facial
/projetos/carrinho-inteligente
/projetos/edupass
/projetos/reviva
*                              404
```

### Home (ordem das seções)

1. **Hero** — foto, nome, posicionamento, 1 parágrafo, botões GitHub /
   LinkedIn / Currículo / Contato.
2. **Sobre** — apresentação profissional curta (técnico em desenvolvimento de
   sistemas + analista de dados MIS; ponte entre as duas áreas).
3. **Projetos** — 5 cards discretos, FastPass em destaque, cada um → página própria.
4. **Timeline** — o arco C → Java → Android → Spring → Python/facial →
   FastAPI → React/Laravel → FastPass → Dados, com anos reais.
5. **Dados & Analytics** — SQL, Power BI, Python, Excel, ETL, automação;
   sem gráficos fictícios; ponte futura para o FastPass Analytics.
6. **Contato** — e-mail, GitHub, LinkedIn, currículo. Sem formulário.

### Estrutura de cada estudo de caso

Problema → Objetivo → Pesquisa → Arquitetura (diagrama) → Tecnologias →
Decisões técnicas → Desafios → Soluções → Resultados → Aprendizados →
Screenshots/fluxo → GitHub. O case do FastPass inclui o fluxo completo de
autenticação/reconhecimento da seção 1.4 e as decisões: modos simulados,
lockForUpdate, degradação graciosa, human-in-the-loop vs automático.

### Identidade visual

- Dark theme, cinzas neutros (base ~`#0A0A0B` a `#18181B`), **um** acento
  próprio — não reutilizar o cobalto do FastPass (o portfólio não é o produto).
  Definir no design system; candidatos: azul-acinzentado frio ou verde-sálvia
  discreto, contraste AA/AAA.
- Tipografia: Inter (ou Geist), hierarquia por peso e tamanho, medida de
  leitura ~65–75ch.
- Animações: fade/slide sutis de entrada, `prefers-reduced-motion` respeitado.
  Nada chamativo.

### Arquitetura técnica do site

React + Vite + TypeScript + Tailwind + Framer Motion + React Router.

```
src/
├─ components/
│  ├─ ui/          # Button, Tag, Card, SectionHeading…
│  ├─ layout/      # Header, Footer, Container
│  └─ sections/    # Hero, About, Projects, Timeline, DataSection, Contact
├─ content/        # dados dos cases em TS tipado (1 arquivo por projeto)
├─ pages/          # Home, ProjectPage (renderiza content), NotFound
├─ hooks/
└─ lib/            # SEO helpers, formatação
```

Cases data-driven: as páginas de projeto são um template único alimentado por
`content/*.ts` tipado — zero duplicação, fácil adicionar projetos. Lazy loading
por rota, meta tags/OG por página, sitemap, Lighthouse ≥95 nas quatro métricas.

### Pendências do usuário (bloqueiam conteúdo, não o design system)

- Foto profissional, currículo (PDF), URL do LinkedIn, e-mail a exibir.
- 2–3 resultados reais da atuação como Analista de Dados (não inventar impacto).
- Screenshots reais dos projetos (FastPass, EduPass, Reviva, Carrinho).
