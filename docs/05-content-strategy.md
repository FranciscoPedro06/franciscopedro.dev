# 05 — Estratégia de Conteúdo

> Todo o texto do site, definido antes da implementação. As regras de voz
> estão no [02-brand-guide.md](02-brand-guide.md) e valem para cada linha
> daqui. Itens `[PENDENTE]` dependem de material do Francisco e bloqueiam a
> publicação, não o desenvolvimento.

---

## 1. Narrativa

### A história que o site conta

Em dois anos, Francisco foi de um programa em C no terminal a uma plataforma
com pagamento Pix, reconhecimento facial e três aplicações em produção — e
hoje trabalha do outro lado do ciclo, analisando os dados que sistemas como
esses geram. O site conta essa história uma única vez, em camadas: o hero a
resume numa frase, a timeline a mostra em marcos, os cases a provam em
profundidade.

### Mensagem principal

> Construo produtos digitais completos — e transformo os dados que eles geram
> em inteligência para o negócio.

### Mensagem secundária

> Evolução rápida e verificável: cada projeto resolve o problema do anterior
> de forma mais madura. O reconhecimento facial, por exemplo, atravessa três
> projetos até virar um microserviço.

### O que o site nunca diz

Que Francisco é apaixonado, dedicado, esforçado ou proativo. Adjetivos são
substituídos por evidência com link.

---

## 2. Home

### 2.1 Hero

- **Sobrenome de página (label mono):** `DESENVOLVEDOR DE SISTEMAS & ANALISTA DE DADOS`
- **H1 (display):** `Francisco Pedro`
- **Parágrafo (body-lg):**

> Construo produtos digitais de ponta a ponta — web, mobile e APIs — e
> trabalho com os dados que eles geram. Hoje atuo como Analista de Dados
> (MIS); meu projeto mais recente é o FastPass, uma plataforma de excursões
> com embarque por reconhecimento facial e pagamento Pix.

- **Ações:** `GitHub` · `LinkedIn` · `Currículo` (primário) · `Contato`
- **Foto:** `[PENDENTE — foto profissional, fundo neutro]`

### 2.2 Sobre (`#sobre`)

Label: `SOBRE` · Título: `Software e dados, no mesmo ciclo`

> Sou Técnico em Desenvolvimento de Sistemas e Analista de Dados na área de
> MIS. Comecei em 2024 escrevendo C no terminal; de lá para cá, passei por
> Java, Android, Spring Boot, Python e cheguei ao FastPass — um produto com
> front-end em React, back-end em Laravel e um microserviço de visão
> computacional em FastAPI, do qual sou o principal autor.
>
> No trabalho com dados, cuido de relatórios e indicadores que sustentam
> decisões de operação `[PENDENTE — 1 frase com o contexto real da função]`.
> É a combinação das duas áreas que me define profissionalmente: sei construir
> o sistema e sei o que perguntar aos números que ele produz. Uma coisa
> melhora a outra.

### 2.3 Projetos (`#projetos`)

Label: `PROJETOS` · Título: `Estudos de caso`
Parágrafo de apoio:

> Cinco projetos, apresentados como estudos de caso: problema, arquitetura,
> decisões e o que eu faria diferente. Código aberto em todos.

**Resumos dos cards** (1–2 linhas, `text-2`):

| Projeto | Badge | Resumo do card |
|---|---|---|
| FastPass | `TCC · 2026` | Plataforma de gestão de excursões com embarque por reconhecimento facial, QR Code e pagamento Pix. Três aplicações, três serviços, deploy real. |
| API de Reconhecimento Facial | `MICROSERVIÇO` | API de biometria facial com FastAPI e DeepFace. Nasceu num projeto escolar e evoluiu até virar o serviço de identidade do FastPass. |
| Carrinho Inteligente | `IOT · 2025` | Sistema de compras com ESP32-CAM, API Spring Boot em camadas e documentação de negócio — do hardware ao banco. |
| EduPass | `EM EQUIPE · 2025` | Plataforma de transporte estudantil com confirmação de embarque por biometria. Web, API e app — meu primeiro ecossistema. |
| Reviva | `ANDROID · 2025` | App de memórias com desbloqueio por data: o conteúdo fica selado até o dia que o usuário escolher. |

CTA de todos os cards: `Ver estudo de caso →`

### 2.4 Trajetória (`#trajetoria`)

Label: `TRAJETÓRIA` · Título: `Dois anos, medidos em projetos`

| Data (mono) | Título | Descrição |
|---|---|---|
| `DEZ 2024` | Primeiro projeto em C | Uma locadora de veículos no terminal. Structs, arquivos e a descoberta de que organizar código é metade do trabalho. |
| `MAI 2025` | Android com Java — Reviva | Primeiro produto com usuários em mente: autenticação, storage e um conceito próprio. |
| `SET 2025` | Spring Boot — Carrinho Inteligente | Primeira arquitetura deliberada: camadas, facades, repositórios — e um ESP32-CAM na ponta. |
| `NOV 2025` | Python e reconhecimento facial — EduPass | O problema que mudou minha direção: confirmar presença por biometria. Primeira API com DeepFace. |
| `[PENDENTE data]` | Análise de Dados (MIS) | Início da atuação profissional com SQL, Power BI e automação de relatórios. |
| `JUL 2026` | FastPass | A síntese: React, Laravel, microserviço facial, Pix. Principal autor do front e do back. |
| `HOJE` | Os dois lados do ciclo | Desenvolvimento de produto e análise dos dados que ele gera. |

### 2.5 Dados & Analytics (`#dados`)

Label: `DADOS` · Título: `O outro lado do ciclo`

> Como Analista de Dados em MIS, meu trabalho é transformar operação em
> informação: extrair, tratar e apresentar dados de forma que alguém consiga
> decidir olhando para eles. `[PENDENTE — 2 a 3 resultados reais: relatório
> automatizado, tempo economizado, indicador criado. Sem material real, a
> seção publica apenas o parágrafo acima e as competências.]`

Competências (grade, sem ícones coloridos, sem barras de porcentagem):

| Item | Linha de apoio |
|---|---|
| SQL | Consultas analíticas, janelas, modelagem de relatórios |
| Power BI | Dashboards e medidas DAX para acompanhamento de operação |
| Python | Tratamento de dados e automação de rotinas com pandas |
| Excel | O idioma do negócio: fórmulas avançadas e relatórios recorrentes |
| ETL | Extração e padronização de dados de fontes diferentes |
| Automação | Rotinas que eliminam trabalho manual repetitivo |

Nota de fechamento da seção (liga ao roadmap):

> Próximo passo público: o FastPass Analytics — pipeline de dados do próprio
> FastPass, da extração ao dashboard.

### 2.6 Contato (`#contato`)

Label: `CONTATO` · Título: `Vamos conversar`

> O caminho mais rápido é o e-mail. Respondo mesmo.

- E-mail em destaque: `[PENDENTE — e-mail público]` (com ação de copiar)
- `GitHub ↗` → github.com/FranciscoPedro06
- `LinkedIn ↗` → `[PENDENTE — URL]`
- `Currículo (PDF)` → `[PENDENTE — arquivo]`

---

## 3. Estudos de caso — conteúdo completo

> Fatos técnicos extraídos da auditoria (doc 00). Tudo abaixo é verificável
> nos repositórios. Screenshots: `[PENDENTE]` em todos os cases.

### 3.1 FastPass — `/projetos/fastpass`

**Frase-resumo:** Plataforma de gestão de turismo e excursões em que o
diferencial é o embarque: reconhecimento facial, QR Code ou conferência
manual, num fluxo que o motorista controla.

**Metadados:** `2026 · TCC · Equipe de 2 — principal autor do código`
**Tags:** React · Laravel · FastAPI · DeepFace · Mercado Pago · Docker
**Links:** repositórios front e back (GitHub) `[+ demo, se restaurada]`

**Problema.** Empresas de excursão na Bahia administram vendas, listas de
passageiros e embarque com planilhas e mensagens. No dia da viagem, conferir
quem pagou e quem pode embarcar é lento e sujeito a erro — e o passageiro não
tem um lugar único para comprar, acompanhar avisos e apresentar seu bilhete.

**Objetivo.** Um produto único com três superfícies: o app do passageiro
(comprar, pagar por Pix, registrar biometria e embarcar), o app do motorista
(validar embarques por facial, QR ou conferência manual) e o painel da empresa
(excursões, vagas, validação em tempo real e relatórios).

**Arquitetura.** Três serviços independentes: front-end React (SPA servida na
Vercel), API Laravel com Sanctum (Render, Docker) e um microserviço de
reconhecimento facial em FastAPI com DeepFace. O Laravel orquestra tudo:
autentica, controla papéis (passageiro, motorista, administrador), fala com o
microserviço facial por HTTP e com o Mercado Pago para cobranças Pix.
*(Diagrama: doc 00 §1.3.)*

**Decisões técnicas.**

1. *Modos simulados como recurso de primeira classe.* Tanto a integração
   facial quanto a de pagamento têm um modo fake configurável por variável de
   ambiente. Uma demonstração do produto não pode depender de uma conta de
   PSP nem de uma GPU no ar.
2. *A vaga só é debitada quando o pagamento confirma.* A compra nasce
   pendente; a cobrança Pix é criada com chave de idempotência e referência
   externa; a confirmação chega por webhook ou polling. Reservar vaga antes
   do dinheiro é dar overbooking de graça.
3. *Trava de concorrência na última vaga.* O débito de vagas roda numa
   transação com `lockForUpdate` — duas compras simultâneas da última vaga
   eram o bug mais provável do sistema, e o mais barato de prevenir.
4. *Quem valida o embarque é sempre o motorista.* O passageiro solicita; a
   aprovação — automática por similaridade facial ou manual — é do outro
   lado. Decisão de produto antes de ser decisão técnica.
5. *Degradação graciosa no front.* O cliente HTTP normaliza erros e, se o
   back-end estiver fora do ar, o app cai em modo demonstração com dados
   locais em vez de quebrar.

**Desafios e soluções.**

- *Três aplicações, um código-base.* 42 telas atendem passageiro, motorista e
  admin sem duplicar layout: 30 componentes compartilhados e dois shells de
  composição (mobile e dashboard).
- *Trabalho em equipe sem pisar no código alheio.* Nem sempre funcionou: uma
  reestruturação feita direto na branch principal removeu a integração de
  pagamento já pronta. A lição virou prática — pull requests e proteção de
  branch deixaram de ser burocracia para mim.

**Resultados.** Produto publicado (front na Vercel, API no Render), fluxo
completo do cadastro ao embarque funcionando, autoria verificável no
histórico: 30 dos 34 commits do front e 12 dos 16 do back.

**Aprendizados.** Contratos entre serviços precisam de dono e versionamento —
quando front e back evoluem em ritmos diferentes, o contrato quebra em
silêncio. E documentação de rotas dentro do próprio código (`routes/api.php`
comentado) paga o custo em horas de integração economizadas.

### 3.2 API de Reconhecimento Facial — `/projetos/reconhecimento-facial`

**Frase-resumo:** O mesmo problema resolvido três vezes, cada vez melhor:
de um script acoplado a um projeto escolar a um microserviço de identidade
consumido pelo FastPass.

**Metadados:** `2025–2026 · Projeto individual`
**Tags:** Python · FastAPI · DeepFace · Facenet512 · Supabase · Docker

**Problema.** Confirmar a identidade de uma pessoa por uma foto, rápido o
bastante para uma fila de embarque e simples o bastante para rodar em
infraestrutura gratuita.

**Objetivo.** Uma API com duas operações: registrar um rosto e verificar uma
captura contra os rostos registrados — devolvendo quem é e com que confiança.

**Pesquisa.** Testei os detectores e modelos do DeepFace antes de fixar o
pipeline: Facenet512 para os embeddings (512 dimensões, melhor separação
entre pessoas parecidas que o Facenet padrão) e distância de cosseno com
threshold calibrado em 0.35 para a decisão.

**Arquitetura (versão atual).** FastAPI com DeepFace; embeddings persistidos
no Supabase; verificação por similaridade de cosseno contra a base; Docker
para deploy no Render. O Laravel do FastPass consome as rotas `/register` e
`/verify` através de um service isolado.

**Decisões técnicas.**

1. *Embedding + distância, não classificação.* Registrar um usuário não pode
   exigir retreinar nada: cada rosto vira um vetor, e reconhecer é buscar o
   vetor mais próximo.
2. *Threshold explícito.* 0.35 de distância de cosseno separa "é a pessoa" de
   "parecido demais para arriscar" — e o valor está no código como decisão
   nomeada, não como número mágico.
3. *A API não conhece o produto.* Ela registra e verifica rostos; quem decide
   o que fazer com o resultado (aprovar embarque, pedir validação manual) é o
   sistema que a consome.

**Desafios e soluções.**

- *Um bug silencioso de acurácia.* Na primeira versão, o cadastro usava um
  detector (SSD) e a verificação usava outro (OpenCV). Detectores recortam e
  alinham o rosto de formas diferentes — comparar embeddings gerados por
  pipelines distintos degrada a precisão sem lançar nenhum erro. A correção é
  trivial; percebê-la, não.
- *Credencial no código.* A primeira versão publicou a chave do banco no
  repositório. Rotacionei a chave e movi a configuração para variáveis de
  ambiente — o tipo de erro que se comete uma vez.

**Resultados.** Serviço em produção como componente de identidade do FastPass,
com modo simulado para demonstrações.

**Aprendizados e evolução planejada.** A busca hoje é linear: baixa todos os
embeddings e compara em Python. O próximo passo é o pgvector no Postgres —
a comparação vira uma consulta indexada no banco. Também planejados:
pré-carga do modelo no startup (elimina o cold start), anti-spoofing e a
estrutura em camadas (routers, services, repositories) que o serviço merece.

### 3.3 Carrinho Inteligente — `/projetos/carrinho-inteligente`

**Frase-resumo:** Sistema de compras em supermercado com um carrinho físico:
ESP32-CAM lê os produtos, uma API Spring Boot em camadas cuida do resto.

**Metadados:** `2025 · Equipe · Back-end e arquitetura`
**Tags:** Java · Spring Boot · JPA · MySQL · ESP32 · Firebase

**Problema.** Fila de caixa é o gargalo do supermercado. A proposta: o
cliente escaneia os produtos no próprio carrinho e paga sem passar pelo
caixa tradicional.

**Objetivo.** O sistema completo: firmware de câmera no carrinho, API para
sessões de compra, estoque, pagamento — e a documentação de negócio que um
produto de verdade exige.

**Arquitetura.** API Spring Boot em quatro camadas — controllers finos,
facades como fronteira de caso de uso, applications com as regras, e
repositórios JPA — com entidades de domínio separadas dos modelos de
persistência. Na ponta física, um ESP32-CAM com servidor de câmera e uma API
auxiliar de leitura de QR em Python.

**Decisões técnicas.**

1. *Camadas antes de features.* O custo inicial de facades e applications se
   pagou quando o domínio cresceu para 8 recursos (cliente, loja, estoque,
   sessão, item, pagamento…) sem que os controllers engordassem.
2. *Logging estruturado desde o primeiro endpoint.* Cada operação loga
   entrada, sucesso e falha — depurar integração com hardware sem log é
   adivinhação.
3. *Documentação de negócio no repositório.* Business Model Canvas, diagrama
   EER e requisitos versionados junto do código, porque a decisão de produto
   também é artefato de engenharia.

**Desafios e soluções.**

- *Relacionamentos JPA entre 8 entidades.* A modelagem do EER para o JPA
  exigiu iterações (o histórico registra a briga) até as cascatas e os lados
  de propriedade ficarem corretos.

**Resultados.** API funcional com CRUD completo das 8 entidades, fluxo com
pull requests e branch de desenvolvimento, e a documentação de negócio no
repositório.

**Aprendizados.** Arquitetura em camadas sem testes automatizados é uma
promessa pela metade — a estrutura está pronta para testes de unidade nas
applications, e essa é a primeira coisa que eu adicionaria hoje.

### 3.4 EduPass — `/projetos/edupass`

**Frase-resumo:** Plataforma de transporte estudantil com confirmação de
embarque por reconhecimento facial — o projeto onde meu ecossistema começou.

**Metadados:** `2025 · Equipe de 4`
**Tags:** JavaScript · Firebase · Supabase · FastAPI · Expo

**Problema.** O transporte estudantil municipal controla embarque com lista
de papel: sem garantia de que quem embarca é o aluno cadastrado, sem
histórico e sem visão para a administração.

**Objetivo.** Cadastro de estudantes e motoristas, confirmação de presença no
embarque por biometria facial e um painel administrativo — para três perfis
de usuário diferentes.

**Arquitetura.** Aplicação web (23 telas em HTML/CSS/JS com Firebase Auth e
Firestore), uma API de reconhecimento facial em FastAPI com DeepFace
(embeddings no Supabase) e um app mobile em Expo/React Native iniciado como
terceira superfície.

**Decisões técnicas.**

1. *Biometria fora do app.* O reconhecimento facial nasceu como serviço
   separado desde o início — a decisão que permitiu reaproveitá-lo depois no
   FastPass.
2. *Firebase para acelerar.* Auth e Firestore resolveram autenticação e dados
   em dias, não semanas — a escolha certa para validar o produto com uma
   equipe de quatro estudantes.

**Desafios e soluções.**

- *Vanilla JS em 23 telas.* Sem framework, a duplicação entre telas cresceu
  rápido. Foi o projeto que me fez adotar React em seguida — dor sentida
  ensina mais que tutorial.

**Resultados.** Plataforma funcional com os três perfis e o fluxo de
confirmação por biometria; a API facial seguiu viva e evoluiu para o
FastPass.

**Aprendizados.** Ecossistemas começam pequenos: o que parecia um detalhe do
EduPass (a API facial) acabou sendo a peça de maior valor — componentes bem
isolados sobrevivem ao projeto que os criou.

### 3.5 Reviva — `/projetos/reviva`

**Frase-resumo:** Um app Android de memórias com trava de tempo: fotos,
vídeos e áudios ficam selados até a data que o usuário escolher.

**Metadados:** `2025 · Dupla`
**Tags:** Java · Android · Firebase Auth · Firestore · Storage

**Problema.** Guardamos tudo e não revisitamos nada. O Reviva propõe o
contrário do feed: a memória só volta quando chega a hora dela.

**Objetivo.** Cadastro e login, upload de mídia (imagem, vídeo, documento,
áudio — com gravação no próprio app) e o mecanismo central: cada memória tem
uma data de desbloqueio antes da qual o conteúdo fica inacessível.

**Arquitetura.** App Android nativo em Java (activities, models e utils bem
separados), Firebase Authentication para identidade, Firestore para os
metadados das memórias e Storage para os arquivos.

**Decisões técnicas.**

1. *A trava de tempo é regra de dados, não de tela.* A data de desbloqueio
   vive no modelo e é verificada no acesso — esconder o botão não é proteger
   o conteúdo.
2. *Fluxo de git como parte do produto.* Issues numeradas, commits
   referenciando cada uma (`refs #8`) e pull requests — o repositório mais
   organizado que eu tinha feito até então.

**Resultados.** App funcional de ponta a ponta na dupla com Matheus Santana;
o repositório documenta o processo tão bem quanto o produto.

**Aprendizados.** Conceito forte simplifica decisões: com uma ideia central
clara ("memória com hora para voltar"), cada tela tinha um critério objetivo
para existir ou não.

---

## 3.6 Página `/resume`

- **Título:** `Currículo`
- **Alternador:** `PT` / `EN` (PT padrão)
- **Ações:** `Baixar PDF` (aponta para `/cv-pt.pdf` ou `/cv-en.pdf` conforme o
  idioma ativo)
- **Corpo:** currículo renderizado do modelo tipado — mesmas informações do
  PDF, mesma tipografia do site. Estrutura: cabeçalho (nome, posicionamento,
  contatos) → experiência → projetos selecionados (linkando os cases) →
  formação → competências.
- **Conteúdo:** `[PENDENTE — currículo real em PT e EN fornecido pelo
  Francisco; a página não publica com placeholder]`

## 4. Página 404

- **Título:** `Página não encontrada`
- **Texto:** `O endereço pode ter mudado ou nunca existiu. O melhor caminho é começar de novo.`
- **Ação:** `← Voltar para a home`

---

## 5. Microcopy e CTAs

| Contexto | Texto |
|---|---|
| Skip link | `Pular para o conteúdo` |
| Nav | `Projetos` · `Trajetória` · `Dados` · `Contato` · `Currículo` |
| CTA de card | `Ver estudo de caso →` |
| Voltar (case) | `← Projetos` |
| Navegação entre cases | `← {Projeto anterior}` / `{Próximo projeto} →` |
| Link externo | sufixo `↗` (GitHub, LinkedIn) |
| Copiar e-mail | `Copiar` → confirmação `Copiado` |
| Botão do menu mobile | `Menu` / `Fechar` (com `aria-expanded`) |
| Colofão (footer) | `React · Vite · TypeScript — o código deste site também é público.` |
| Copyright | `© 2026 Francisco Pedro` |

Regra geral de CTA: verbo + objeto, sem exclamação, sem "clique aqui".

---

## 6. SEO

### Títulos e descrições

| Página | `<title>` | Meta description |
|---|---|---|
| Home | `Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados` | `Construo produtos digitais completos — web, mobile e APIs — e transformo os dados que eles geram em inteligência para o negócio. Destaque: FastPass.` |
| FastPass | `FastPass — estudo de caso · Francisco Pedro` | `Plataforma de excursões com embarque por reconhecimento facial, QR Code e pagamento Pix. Arquitetura com React, Laravel e FastAPI, decisões técnicas e aprendizados.` |
| API Facial | `API de Reconhecimento Facial — estudo de caso · Francisco Pedro` | `De script escolar a microserviço de identidade: FastAPI, DeepFace e as decisões por trás de uma API de biometria facial em produção.` |
| Carrinho Inteligente | `Carrinho Inteligente — estudo de caso · Francisco Pedro` | `Sistema de compras com ESP32-CAM e API Spring Boot em camadas: arquitetura, modelagem e documentação de negócio de um projeto IoT completo.` |
| EduPass | `EduPass — estudo de caso · Francisco Pedro` | `Plataforma de transporte estudantil com confirmação de embarque por biometria facial. Web, API e app mobile construídos em equipe.` |
| Reviva | `Reviva — estudo de caso · Francisco Pedro` | `App Android de memórias com desbloqueio por data. Java, Firebase e as decisões de produto por trás da trava de tempo.` |
| Resume | `Currículo — Francisco Pedro` | `Currículo de Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados. Visualize online ou baixe em PDF (português e inglês).` |
| 404 | `Página não encontrada · Francisco Pedro` | — (noindex) |

### Regras

- Open Graph por página: `og:title`, `og:description`, `og:image` (imagem
  padrão do site na v1; por case quando houver screenshots), `og:locale: pt_BR`.
- Uma única `<h1>` por página, igual ou próxima ao `<title>`.
- `sitemap.xml` e `robots.txt` gerados no build.
- JSON-LD `Person` na home (nome, cargo, links de perfil).

---

## 7. Pendências de conteúdo (bloqueiam publicação)

| Item | Onde entra |
|---|---|
| Foto profissional | Hero |
| E-mail público | Hero, contato, footer |
| URL do LinkedIn | Hero, contato, footer, JSON-LD |
| Currículo PDF | `/cv.pdf` |
| 1 frase de contexto + 2–3 resultados reais do MIS | Sobre, seção Dados, timeline |
| Screenshots dos 5 projetos | Cards e cases |
| Confirmações factuais: FastPass é TCC? datas de EduPass/MIS | Metadados dos cases e timeline |
