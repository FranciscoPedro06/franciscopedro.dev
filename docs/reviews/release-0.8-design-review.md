# Release 0.8 — Design Review & Direção de Arte

> Documento de **planejamento** (não de verificação): a etapa 1 do fluxo
> oficial (doc 00 §4) para a Release 0.8. Nasce de uma auditoria de design
> externa da 0.7 e a converte em direção estrutural. A revisão técnica de
> encerramento (escopo × planejado, gate, achados) virá em
> `release-0.8-review.md`. A fonte da verdade dos tokens continua sendo o
> [doc 04](../04-design-system.md), reescrito durante a implementação.

**Data:** 2026-07-14 · **Objetivo:** eliminar a sensação de template/IA e
fazer o produto parecer software profissional, com identidade própria.

---

## 1. O diagnóstico (o que o código confirma)

A auditoria tem ~50 problemas; ela é o ponto de partida, não a lista de
tarefas. O código confirma que **o problema não são componentes isolados**: a
casca de IDE (ActivityBar, Explorer, EditorTabs, theming, painéis lazy) é
sólida e fiel. A falha está inteiramente no que o painel do editor **renderiza**
— abrir `overview.tsx` entrega um hero de marketing (`min-h-[60dvh]
justify-center`). A moldura diz *software*; o conteúdo diz *landing page*.

Toda a review cabe numa frase, e é por isso que o redesign **reconstrói a
camada de conteúdo e a camada de tokens, e preserva o cromo caro que já
funciona**.

## 2. Os 50 problemas → 7 causas raiz

Agrupados por causa, não por componente; duplicações eliminadas.

| Causa raiz | Problemas da auditoria |
|---|---|
| **A. Conteúdo em linguagem de landing** (tom + diagramação) | 1, 2, 6, 8, 9, 22, 29, 40, 44, 45 + "quatro vozes tipográficas" |
| **B. Metáfora de IDE cenográfica, não é o meio** | 21, 23, 44, 49, "IDE virou decoração", "cenográfico" |
| **C. Espaço/escala uniforme de landing** | 3, 4, 5, 7, 11, 12, 34 |
| **D. Ausência de sistema de planos/profundidade** | 16, 17, 18, 36 |
| **E. Paleta decorativa, não semântica** | 14, 15, "cinzas iguais" |
| **F. Sem sinais de uso; lê como recém-gerado** | 19, 25, 26, 33, 38 |
| **G. Composição centralizada, periferia sem função** | 5, 7, 10, 12, 30, 31, 32, 33 |
| **(meta) H. Referências literais, sem ponto de vista** | 20, 46, 47, 48, 50 — a tese da auditoria |

**A alavanca:** A, B e G colapsam numa única decisão — se o conteúdo passar a
ser renderizado *como o documento que a aba promete* (alinhado à esquerda,
denso, com periferia funcional), as três caem juntas. É a espinha do redesign
(ADR-0014).

## 3. Onde questionamos a auditoria (não implementado, com justificativa)

Um Staff Designer rejeita o que piora o produto e registra o porquê:

- **"Interatividade 4.5 / tudo congelado"** — *parcialmente inválido.* A
  auditoria foi feita sobre screenshot ("mesmo sem ver interação, consigo
  inferir"). A 0.7 entregou paleta de comandos, painéis redimensionáveis
  persistidos, terminal e troca de tema. **Não** vamos "adicionar movimento em
  tudo" para responder a uma imagem estática. O núcleo válido é a **descoberta**
  baixa — as interações existem, mas ninguém as encontra. É isso que tratamos.
- **"Adicionar sombras / falta profundidade"** — *rejeitada a leitura literal.*
  Zed, Linear e o próprio VS Code são deliberadamente planos; profundidade vem
  de rampa de superfícies e hairlines, não de drop-shadows. Sombra fica só para
  camadas de fato flutuantes (paleta, menus, tooltips). "Profundidade" ≠
  "sombra".
- **"Trocar a paleta, parece Tailwind"** — *rejeitada a troca.* A grafite-quente
  já é sistema deliberado, com AA medido nos dois temas (doc 04 §1.5,
  ADR-0013). Substituir quebraria o contrato de contraste e custaria remedição
  sem ganho. **Estendemos** (mais degraus de neutro, papéis semânticos), não
  substituímos.
- **"Acumular imperfeições e assimetrias"** — *armadilha.* Assimetria decorativa
  lê como desleixo, não maturidade. O sinal real de ferramenta viva é
  **assimetria que segue a função** (um painel é mais largo porque contém mais),
  nunca wobble aplicado de propósito. Formalizado no ADR-0015.
- **"Grid decorativo"** — *concordamos e vamos além:* grid falso é pior que
  nenhum. Removemos o `body::before` (ADR-0015); as réguas reais do cromo
  carregam a estrutura.

## 4. Estratégia de redesign

**Tese: o documento é o meio (ADR-0014).** A moldura de IDE deixa de ser cenário
e vira a linguagem. O conteúdo não é *colocado dentro* do editor — ele **é** o
arquivo aberto. Isso metaboliza as referências em vez de citá-las, e é o que dá
o "ponto de vista próprio" que a auditoria diz faltar.

**Sem cenografia (ADR-0015).** Software, não uma IDE de teatro: nada de
terminal falso, minimap falso ou painel decorativo. Toda superfície tem função
real; a sensação de "vivo" vem de dados reais (git-log, estado de build,
outline), nunca de atividade ou imperfeição fabricadas.

**Princípios extraídos das referências — não componentes.** De Zed/Cursor/
JetBrains: *o arquivo é o meio*, densidade sem claustrofobia, cromo plano. De
Linear/Raycast/Warp: navegação **command-first**, a paleta como interação
primária, cor como sinal e não decoração. Do benchmark (Arnav): honrar o meio
(um documento/README real como conteúdo) **sem** esqueumorfismo total — a 0.7 já
fez a escolha certa de derivar navegação e SEO da URL, e isso se mantém. Nunca
copiamos layout, componente, cor ou detalhe: extraímos filosofia.

## 5. Direção de arte (linguagem visual como um sistema)

Todas as decisões abaixo devem parecer feitas pela mesma equipe. Os valores
finais são transcritos no doc 04 no marco M1; aqui fica a **intenção**.

- **Cor.** Neutros estruturam; o acento **significa** (foco, estado ativo,
  não-salvo, atenção) — nunca decora. Rampa de neutros expandida para formar
  *famílias* de cinza (hoje três níveis de texto se achatam). Cores de documento
  semânticas e reais (adicionado/modificado/removido do git; info/aviso). Regra
  de contenção do acento (doc 04 §1.2) reforçada, não relaxada.
- **Tipografia.** Uma voz, não quatro. Escala **desce** — o `display 56px` é de
  landing; a identidade vira cabeçalho de arquivo, e o mono carrega metadados.
  Ritmo consistente entre título, corpo, navegação e metadados.
- **Densidade & ritmo.** Duas escalas de espaço intencionalmente diferentes:
  uma *de cromo*, apertada; uma *de leitura*, que respira. A quebra de ritmo
  nasce dessa diferença de função — nunca de aleatoriedade nem de múltiplos
  uniformes de 8.
- **Contraste & peso.** Hierarquia distribuída: o peso deixa de concentrar no
  título/esquerda e passa a orientar leitura (documento) + periferia (outline,
  metadados, status).
- **Alinhamento & proporção.** Alinhamento à esquerda como padrão de documento;
  proporção governada por função (o que contém mais, ocupa mais), não por
  simetria de composição.
- **Profundidade.** Planos nomeados — canvas < cromo < flutuante — por rampa de
  superfície + hairline; sombra só no flutuante.

## 6. Plano de marcos (mudanças estruturais, não 50 tarefas)

Cada marco fecha com o gate de qualidade (ESLint, `tsc`, Vitest, build,
orçamentos do doc 06 §7) e responde à pergunta de aceite do ADR-0014.

| Marco | Escopo estrutural | Resolve |
|---|---|---|
| **M1 — Linguagem visual (tokens)** | Reescrita do doc 04 + `index.css`: escala de densidade dupla, escala tipográfica reduzida, rampa de neutros expandida, sistema de elevação (planos), papéis de cor semânticos. **Remove o canvas decorativo** (`body::before`, ADR-0015). | C, D, E |
| **M2 — Modelo conteúdo-como-documento** | A espinha (ADR-0014): substitui `View`+`SectionHeading` por um renderizador de documento (leitura densa à esquerda, cabeçalho de arquivo, outline/símbolos à direita). Reconstrói `overview` (identidade = cabeçalho de arquivo, sem hero centralizado nem cluster de CTAs). | A, B, G |
| **M3 — Documentos de conteúdo** | Aplica o modelo às 7 views + cases: `FeaturedWork`, `Engineering`, `DataSection`, `Timeline`, `About`, `Contact`, `ProjectCard`, `CasePage`/`CaseSection`. Substitui os variants de marketing do `Button` por afordâncias nativas de workspace. | A, C, G |
| **M4 — Workspace vivo + descoberta** | Sinais reais: metadados do git-log no cabeçalho de documento e na status bar ("editado há N"), outline real, descoberta intencional da paleta/painéis. **Remove o `Minimap` decorativo** (ou o torna real, ADR-0015). | F, H, descoberta |
| **M5 — Refino transversal & fecho** | Varredura de "tells" de IA (padding uniforme, excesso de containers/bordas, simetria, vazio), consistência final da linguagem, contraste/motion/mobile, checklist de a11y. Encerra a release. | H + acabamento |

## 7. Componentes: reconstruídos · aposentados · preservados

**Reconstruídos** (camada de conteúdo + tokens — o barato e errado):
`pages/Home.tsx` (`View`), as 7 `components/sections/*`, `Hero` (→ cabeçalho do
arquivo overview), `ui/SectionHeading` (fim da unidade label+título+descrição),
`ui/ProjectCard`, `ui/Button` (variants de dashboard → afordâncias de
workspace), `case/CasePage` + `case/CaseSection`, e os tokens do doc 04 /
`index.css`.

**Aposentados** (deixam de existir): `body::before` (canvas grid+ruído,
ADR-0015); `Minimap` decorativo — deletado, salvo se virar real (ADR-0015); o
padrão hero centralizado (`min-h`/`justify-center`); possivelmente o `Footer`
de marketing dentro da viewport (a status bar assume o papel).

**Preservados** (não se toca no que funciona): `ActivityBar`, `Explorer`,
`EditorTabs`, `SidePanel`, `CommandPalette`, `SourceControlPanel`,
`SearchPanel`, `BottomPanel`, o store `workbench.ts`, theming, roteamento por
URL/hash (ADR-0004/0011) e todos os contratos de SSR/SEO (ADR-0010).

## 8. Impacto esperado

A M2 sozinha endereça ~18 dos 50 pontos e move o eixo "sensação de software 5.5
→ software". M1/M3/M4 fecham densidade, profundidade, cor, ritmo e liveness. M5
entrega o "ponto de vista próprio" (problema 50, a tese da auditoria). Custo de
orçamento concentrado em CSS/markup — a folga atual (JS 73,5/110 KB; CSS
21,3/25 KB) comporta, mas mede-se a cada marco; features pesadas nascem lazy.

## 9. Restrições e governança

- **Gate de qualidade** a cada marco (doc 00); um commit por marco (ADR-0005).
- **SSR/SEO/a11y invioláveis** (ADR-0010): o documento é HTML semântico — nada
  de canvas nem de código falso. Os 8 HTMLs, o `axe` e os 56 testes seguem
  verdes; quebrá-los é regressão.
- **Honestidade editorial** (charter §5–7): nenhum dado inventado; a liveness
  vem de dados reais.
- **Re-escopo:** esta Release 0.8 passa a ser "Redesign / Maturidade de
  produto". O trabalho de pré-lançamento (ex-0.8 proposta: rotação de chave,
  forks, READMEs, medição M7 ≥ 95) move para a 0.9/v1.0 (doc 07 §3 e §7).
- **Base assumida:** a 0.7 ainda aguarda validação em navegador real; o
  redesign parte dela.

## 10. As oito diretrizes do Francisco (constraints de governança)

Adotadas como critérios de aceite contínuos, não como sugestões:

1. **Sem cópia do VS Code** — referência de linguagem, não de layout; identidade
   própria (ADR-0014, ADR-0015).
2. **Prioridade absoluta: remover a sensação de IA** — excesso de padding,
   containers, bordas, simetria, vazio; "tudo parece um componente React
   isolado" (M5, transversal).
3. **Interação só com propósito** — se existe só para "parecer IDE", remove; se
   melhora descoberta/navegação/produtividade, mantém (ADR-0015).
4. **Software, não IDE cenográfica** — sem terminal/minimap/painel falsos
   (ADR-0015).
5. **Direção de arte própria** — pensar linguagem visual, não componentes (§5).
6. **Ir além da auditoria** — corrigir problemas novos encontrados no caminho,
   não só os 50 documentados.
7. **Pergunta-guia permanente:** *"se eu removesse todos os ícones e o Explorer,
   isto ainda pareceria software profissional?"* Se não, há landing escondida —
   continuar refinando (ADR-0014).
8. **Inspiração** (VS Code, Zed, Cursor, JetBrains, Linear, Warp, Raycast e o
   benchmark do Arnav) **só como princípio** — nunca copiar layout, componente,
   cor ou detalhe.
