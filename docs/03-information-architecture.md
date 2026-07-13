# 03 — Arquitetura da Informação

> Estrutura completa do site: mapa, navegação, fluxos, hierarquia de cada
> página e wireframes de baixa fidelidade. O conteúdo textual de cada bloco
> está no [05-content-strategy.md](05-content-strategy.md).

---

## 1. Mapa do site

```
/                                Home
├─ /projetos                     Índice de projetos (todos os 5 estudos de caso)
├─ /projetos/fastpass            Estudo de caso — FastPass (principal)
├─ /projetos/reconhecimento-facial  Estudo de caso — API Facial
├─ /projetos/carrinho-inteligente   Estudo de caso — Carrinho Inteligente
├─ /projetos/edupass             Estudo de caso — EduPass
├─ /projetos/reviva              Estudo de caso — Reviva
├─ /resume                       Currículo — visualização PT/EN + download PDF
└─ *                             404
```

Nove páginas navegáveis. Os PDFs (`/cv-pt.pdf`, `/cv-en.pdf`) permanecem
assets estáticos linkados pela página `/resume`.

> Revisão do Sprint 2 (aprovada): a home destaca apenas os **3 principais**
> estudos de caso (Featured Work); o índice completo vive em `/projetos`. Sem modais, sem popups, sem rotas aninhadas além de
`/projetos/:slug`. URLs em português, curtas e permanentes.

> **Adendo — Release 0.6.1 (workbench, decisão do Francisco):** a home
> deixou de ser uma página longa de scroll. As mesmas 7 seções do §4, na
> mesma ordem e com as mesmas âncoras, viram **views** de um workspace que
> ocupa a viewport inteira (ADR-0011): navegar comuta a view na área do
> editor; o único scroll é o do painel ativo. Nenhuma rota mudou — o hash
> continua sendo a URL de cada seção. A navegação principal passou a listar
> **todas** as views (`Projetos · Engenharia · Dados · Trajetória · Sobre ·
> Contato`): sem scroll, Trajetória e Sobre precisam de link direto.

## 2. Navegação

**Header fixo** (blur sutil sobre o conteúdo), presente em todas as páginas:

- Esquerda: wordmark `fp.` → home.
- Direita: `Projetos` · `Engenharia` · `Dados` · `Trajetória` · `Sobre` ·
  `Contato` (views da home, Release 0.6.1) + botão discreto `Currículo` →
  rota `/resume` (o botão só aparece quando o conteúdo do currículo existir
  — nunca link para página vazia).
- Na página de case, os itens levam à home na view correspondente
  (`/#projetos` etc.).
- Mobile: os itens + botão viram menu de tela cheia (overlay), acionado
  por botão com `aria-expanded`; fecha com Esc e ao navegar.
- Desktop (Release 0.6.1): o workbench soma o rail de atalhos (md+) e o
  explorer em árvore (lg+) — espelhos da mesma navegação, nenhum destino
  novo.

**Navegação secundária (páginas de case):**

- Breadcrumb mínimo no topo: `← Projetos`.
- No fim de cada case: navegação `Projeto anterior / próximo` para manter o
  visitante no circuito sem voltar à home.

**Footer** (todas as páginas): repetição dos contatos (GitHub, LinkedIn,
e-mail), currículo e nota de rodapé com colofão ("feito com…" técnico, sem
frase fofa).

## 3. Fluxos principais

### Fluxo 1 — Recrutador com 15 segundos

```
Chega na home → lê hero (nome + posicionamento + 1 parágrafo)
             → vê os botões GitHub/LinkedIn/CV
             → decisão: baixa o CV ou rola para projetos
```

Tudo que o fluxo exige está na primeira dobra. Nenhum scroll é necessário
para entender quem, o quê e como contatar (O1 do charter).

### Fluxo 2 — Tech lead avaliando profundidade

```
Home → card FastPass → /projetos/fastpass
     → lê problema/arquitetura/decisões → clica no repositório no GitHub
     → volta → próximo case (navegação anterior/próximo)
```

Meta: em 3 minutos o avaliador explica o que é o FastPass e o papel de
Francisco (critério de sucesso do charter).

### Fluxo 3 — Recrutador de dados

```
Home → nav "Dados" → seção Dados & Analytics
     → contexto MIS + stack (SQL, Power BI, Python, ETL)
     → timeline confirma a transição → contato
```

## 4. Hierarquia da Home

Ordem e propósito de cada seção — desde a Release 0.6.1, cada uma é uma
**view** do workbench, comutada pela mesma âncora (a ordem segue valendo
como ordem do DOM e da navegação):

Ordem revisada no Sprint 2 (aprovada pelo Francisco):

| # | Seção | Âncora | Propósito | Prioridade visual |
|---|---|---|---|---|
| 1 | Hero | — | Responder quem/o quê/contato em 15 s | Máxima |
| 2 | Featured Work | `#projetos` | Os **3 principais** cases (FastPass em destaque) + link para `/projetos` | Alta |
| 3 | Engineering | `#engenharia` | Como o Francisco constrói: princípios com evidência + stack por categoria | Média |
| 4 | Data | `#dados` | Sustentar a metade "dados" do posicionamento | Média |
| 5 | Timeline | `#trajetoria` | Evolução técnica com datas reais | Média |
| 6 | About | `#sobre` | Apresentação profissional em 2 parágrafos | Baixa |
| 7 | Contact | `#contato` | E-mail, GitHub, LinkedIn, CV — sem formulário | Alta |

Racional da ordem: trabalho primeiro (prova), método em seguida (Engineering
+ Data — as duas metades do posicionamento), contexto depois (Timeline,
About), ação no fim (Contact). A stack por categoria vive na seção
Engineering, sempre vinculada aos projetos — o "muro de ícones" segue vetado.

## 5. Wireframes — baixa fidelidade

### 5.1 Home — desktop (≥1024 px)

```
┌────────────────────────────────────────────────────────────┐
│ fp.                    Projetos  Trajetória  Dados  Contato │ ← header fixo
├────────────────────────────────────────────────────────────┤
│                                                            │
│   FRANCISCO PEDRO                          ┌──────────┐    │
│   Desenvolvedor de Sistemas                │   foto   │    │
│   & Analista de Dados                      │          │    │
│                                            └──────────┘    │
│   Parágrafo de posicionamento (2 linhas).                  │
│                                                            │
│   [GitHub] [LinkedIn] [Currículo]  Contato →               │
│                                                            │
├────────────────────────────────────────────────────────────┤
│   SOBRE                                                    │
│   Dois parágrafos, medida de ~70ch, sem foto repetida.     │
├────────────────────────────────────────────────────────────┤
│   PROJETOS                                                 │
│   ┌──────────────────────────────────────────────────┐     │
│   │  FASTPASS (card largo, destaque)                 │     │
│   │  screenshot · resumo · stack · Ver estudo →      │     │
│   └──────────────────────────────────────────────────┘     │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────┐   │
│   │ API Facial│ │ Carrinho  │ │ EduPass   │ │ Reviva   │   │
│   └───────────┘ └───────────┘ └───────────┘ └──────────┘   │
├────────────────────────────────────────────────────────────┤
│   TRAJETÓRIA                                               │
│   2024 ●───────────────────────────────────────── hoje     │
│        C → Java → Android → Spring → Python/facial →       │
│        FastAPI → React/Laravel → FastPass → Dados          │
│   (lista vertical de marcos; datas em mono)                │
├────────────────────────────────────────────────────────────┤
│   DADOS & ANALYTICS                                        │
│   Parágrafo de contexto (MIS) + grade de competências:     │
│   SQL · Power BI · Python · Excel · ETL · Automação        │
├────────────────────────────────────────────────────────────┤
│   CONTATO                                                  │
│   e-mail em destaque · GitHub · LinkedIn · Currículo       │
├────────────────────────────────────────────────────────────┤
│ fp. · colofão técnico · links                              │ ← footer
└────────────────────────────────────────────────────────────┘
```

### 5.2 Home — mobile (<640 px)

```
┌──────────────────┐
│ fp.          ☰   │
├──────────────────┤
│ ┌──────┐         │
│ │ foto │         │  foto menor, acima do texto
│ └──────┘         │
│ FRANCISCO PEDRO  │
│ Dev de Sistemas  │
│ & Analista Dados │
│ parágrafo…       │
│ [GitHub][LinkedIn]│  botões em linha, quebram em 2 col
│ [Currículo][Contato]
├──────────────────┤
│ SOBRE …          │
├──────────────────┤
│ PROJETOS         │
│ ┌──────────────┐ │
│ │ FastPass     │ │  cards empilhados,
│ └──────────────┘ │  FastPass primeiro
│ ┌──────────────┐ │
│ │ API Facial   │ │
│ └──────────────┘ │
│      …           │
├──────────────────┤
│ TRAJETÓRIA       │
│ ● 2024  C        │  linha vertical à esquerda,
│ ● 2025  Android  │  marcos empilhados
│ ● 2026  FastPass │
├──────────────────┤
│ DADOS  …         │
│ CONTATO …        │
│ footer           │
└──────────────────┘
```

### 5.3 Página de estudo de caso — desktop

```
┌────────────────────────────────────────────────────────────┐
│ fp.                    Projetos  Trajetória  Dados  Contato │
├────────────────────────────────────────────────────────────┤
│  ← Projetos                                                 │
│                                                            │
│  FASTPASS                              [mono] 2026 · TCC   │
│  Uma frase-resumo do produto.                              │
│  [tag React] [tag Laravel] [tag FastAPI] [GitHub ↗]        │
│                                                            │
│  ┌──────────────────────────────────────────────────┐      │
│  │ screenshot principal                             │      │
│  └──────────────────────────────────────────────────┘      │
│                                                            │
│  Problema ······· (índice lateral fixo     │  PROBLEMA     │
│  Objetivo         em desktop, some no      │  texto…       │
│  Arquitetura      mobile)                  │               │
│  Decisões                                  │  OBJETIVO     │
│  Desafios                                  │  texto…       │
│  Resultados                                │               │
│  Aprendizados                              │  ARQUITETURA  │
│                                            │  [diagrama]   │
│                                            │  …            │
│                                                            │
│  ┌──────────────────────────┬─────────────────────────┐    │
│  │ ← API Facial             │        Carrinho Int. →  │    │
│  └──────────────────────────┴─────────────────────────┘    │
│  footer                                                    │
└────────────────────────────────────────────────────────────┘
```

Mobile: mesmo conteúdo em coluna única; o índice lateral vira nada (a leitura
é linear); screenshots em largura total com scroll natural.

## 6. Estrutura interna de cada estudo de caso

Ordem fixa das seções (RF04 do charter). Seções sem conteúdo real são
omitidas — nunca preenchidas com texto genérico:

1. **Cabeçalho** — nome, frase-resumo, ano/contexto, tags de stack, links
   (GitHub; demo quando existir).
2. **Mídia principal** — screenshot ou composição de telas.
3. **Problema** — o contexto de negócio, sem tecnologia.
4. **Objetivo** — o que o sistema precisava entregar.
5. **Pesquisa** — o que foi investigado antes de construir (quando houver).
6. **Arquitetura** — diagrama + explicação dos componentes.
7. **Tecnologias** — stack com o porquê de cada escolha relevante.
8. **Decisões técnicas** — 3 a 5 decisões com trade-off explicado.
9. **Desafios e soluções** — pares problema→resposta, honestos.
10. **Resultados** — o que existe hoje, verificável.
11. **Aprendizados** — o que Francisco faria diferente.
12. **Galeria / fluxo** — telas adicionais, vídeo quando existir.
13. **Rodapé do case** — link do repositório + navegação anterior/próximo.

## 6.1 Estrutura da página `/resume`

1. Cabeçalho: título + alternador de idioma `PT / EN` (estado local; PT padrão).
2. Ações: `Baixar PDF (PT)` / `Download PDF (EN)` — o botão acompanha o idioma ativo.
3. Corpo: o currículo renderizado como página (mesma tipografia do site),
   gerado do mesmo modelo de conteúdo tipado — uma fonte para página e PDF.
4. Rodapé: contato + retorno à home.

O idioma alterna apenas o conteúdo desta página (o site permanece pt-BR na v1
— charter §14); a estrutura já isola os textos do currículo por locale,
preparando a i18n futura sem comprometê-la agora.

## 7. Experiência mobile vs desktop

| Aspecto | Mobile | Desktop |
|---|---|---|
| Navegação | Menu overlay tela cheia | Links no header |
| Hero | Foto acima, texto abaixo, botões em grade 2×2 | Texto à esquerda, foto à direita |
| Cards de projeto | Empilhados, largura total | FastPass largo + grade de 4 |
| Timeline | Linha vertical à esquerda | Linha vertical central-esquerda com mais respiro |
| Case: índice | Omitido | Lateral fixa (scroll-spy) |
| Alvos de toque | ≥ 44 px | — |
| Imagens | `srcset` com variantes menores | Variante maior, mesma arte |

## 8. Mapa de conteúdo

| Conteúdo | Fonte | Status |
|---|---|---|
| Textos de todas as seções e cases | Doc 05 | A redigir (doc 05) |
| Datas da timeline | Histórico real dos repositórios (doc 00) | Disponível |
| Diagramas de arquitetura | A produzir a partir da auditoria (doc 00 §1.3) | A produzir |
| Screenshots FastPass/EduPass/Reviva/Carrinho | Usuário | `[PENDENTE]` |
| Foto pessoal | Usuário | `[PENDENTE]` |
| Currículo PDF | Usuário | `[PENDENTE]` |
| URL LinkedIn + e-mail público | Usuário | `[PENDENTE]` |
| Resultados da atuação MIS | Usuário | `[PENDENTE]` |
