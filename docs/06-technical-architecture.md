# 06 — Arquitetura Técnica

> Define como o site é construído: stack, estrutura, padrões e estratégias de
> performance, SEO, acessibilidade e deploy. Toda decisão traz justificativa.
> Tokens visuais no [04-design-system.md](04-design-system.md); requisitos no
> [01-project-charter.md](01-project-charter.md).

---

## 1. Stack

| Camada | Escolha | Justificativa |
|---|---|---|
| Build | **Vite 6** | Dev server instantâneo, build Rollup, ecossistema estável |
| UI | **React 18** | Fixado pelo charter; maturidade e domínio do autor |
| Linguagem | **TypeScript (strict)** | O conteúdo é data-driven; tipos garantem que nenhum case publique campo faltando |
| Estilo | **Tailwind CSS 4** | Tokens do doc 04 viram `@theme`; zero CSS morto; consistência forçada |
| Animação | **Framer Motion 11** | `whileInView`, `AnimatePresence` e `useReducedMotion` cobrem 100% do doc 04 §5 |
| Rotas | **React Router 6** | 7 rotas, lazy loading por rota; não há justificativa para meta-framework |
| Ícones | **lucide-react** | Tree-shakeable, stroke consistente com o doc 04 §7 |
| Testes | **Vitest + Testing Library** | Mesmo pipeline do Vite; testes de contrato dos componentes críticos |
| Qualidade | **ESLint + Prettier + tsc --noEmit** | Gate de CI |

Decisão registrada: **SPA, não SSG/Next.** O site tem 7 páginas com conteúdo
estático versionado em código. O SEO é resolvido com pre-render no build
(§6) — adotar um meta-framework adicionaria complexidade sem requisito que a
justifique. Se a v2 (blog) mudar essa equação, a estrutura de conteúdo tipado
migra sem retrabalho.

## 2. Estrutura de pastas

```
src/
├─ main.tsx                  # bootstrap: Router + providers mínimos
├─ App.tsx                   # tabela de rotas + Suspense + scroll restoration
├─ index.css                 # @theme (tokens do doc 04), base, fontes
├─ components/
│  ├─ ui/                    # átomos: Button, Tag, Badge, SectionHeading…
│  ├─ layout/                # NavBar, Footer, Section, Container, SkipLink
│  └─ sections/              # Hero, About, Projects, Timeline, DataSection, Contact
├─ case/                     # template do estudo de caso
│  ├─ CasePage.tsx           # renderiza um Project (rota /projetos/:slug)
│  ├─ CaseSection.tsx
│  ├─ CaseNav.tsx            # anterior/próximo
│  └─ ArchitectureDiagram.tsx
├─ content/
│  ├─ types.ts               # tipos: Project, CaseSection, TimelineEntry…
│  ├─ projects/              # 1 arquivo por case: fastpass.ts, facial.ts…
│  ├─ timeline.ts
│  ├─ skills.ts              # competências da seção Dados
│  └─ site.ts                # links, e-mail, SEO padrão
├─ pages/
│  ├─ Home.tsx
│  └─ NotFound.tsx
├─ hooks/                    # useScrollSpy, useCopyToClipboard
└─ lib/                      # seo.ts (metadados por rota), motion.ts (variants)
public/
├─ cv.pdf                    # [PENDENTE]
├─ images/                   # screenshots otimizados (§8)
└─ og/                       # imagens Open Graph
docs/                        # esta documentação
```

## 3. Componentização e responsabilidades

Regras de fronteira (violação = refatorar antes de seguir):

1. **`content/` não importa React.** São dados puros e tipados. Um case novo
   é um arquivo novo — RNF06 do charter.
2. **`components/ui` não conhece conteúdo.** Recebe props primitivas; nunca
   importa de `content/`.
3. **`components/sections` liga dados a UI.** Importa de `content/` e compõe
   `ui/` — é a única camada que conhece os dois lados.
4. **`case/CasePage` é um template único.** As 5 páginas de projeto são o
   mesmo componente com dados diferentes; nenhuma página de case tem código
   próprio.
5. **Componente > 150 linhas ou com 2 responsabilidades: dividir.**

Modelo de conteúdo (esqueleto):

```ts
// content/types.ts
export interface Project {
  slug: string;
  name: string;
  summary: string;          // frase-resumo (card e hero do case)
  badge: string;            // "TCC · 2026"
  tags: string[];
  links: { github: string[]; demo?: string };
  seo: { title: string; description: string };
  media: MediaItem[];       // screenshots [PENDENTE]
  sections: CaseSection[];  // ordem fixa do doc 03 §6; seções ausentes são omitidas
  order: number;            // posição na home e na navegação anterior/próximo
  featured?: boolean;       // FastPass
}
```

## 4. Rotas e code-splitting

| Rota | Chunk | Estratégia |
|---|---|---|
| `/` | `Home` | Eager (é o LCP do site) |
| `/projetos/:slug` | `CasePage` | `React.lazy` — 1 chunk para o template + dados no bundle |
| `/resume` | `Resume` | `React.lazy` — currículo PT/EN renderizado do modelo tipado (RF10) |
| `*` | `NotFound` | `React.lazy` |

O roteamento nasce **blog-ready** (ADR-0007): a tabela de rotas e o modelo de
conteúdo já reservam o namespace `/escrita` e o tipo `Post` — a v2 adiciona
arquivos, não estrutura.

- `Suspense` com fallback mínimo (fundo `bg`, sem spinner — a troca leva ms).
- Scroll restoration manual: rota nova → topo; voltar → posição preservada;
  âncoras (`/#projetos`) → scroll suave, exceto com `prefers-reduced-motion`.
- Os dados de `content/projects/` entram no chunk do template (são texto;
  custo em KB é baixo e evita cascata de requests).

## 5. Gerenciamento de estado

**Não há estado global.** Tema é fixo (dark), conteúdo é estático, não há
formulários. Estados existentes: menu mobile aberto (local na NavBar),
scroll-spy (hook local), "copiado" do e-mail (local). Decisão registrada para
impedir a entrada de bibliotecas de estado sem novo requisito.

## 6. SEO

- **Pre-render no build:** as 7 rotas são renderizadas para HTML estático no
  build (crawlers e usuários recebem conteúdo sem esperar JS). Ferramenta:
  `vite-prerender-plugin` ou script próprio com `puppeteer` no CI — decisão
  final na implementação, com critério: zero impacto no dev server.
- Metadados por rota via `lib/seo.ts` (title, description, OG, canonical) —
  fonte: doc 05 §6.
- `sitemap.xml` e `robots.txt` gerados no build a partir da lista de rotas.
- JSON-LD `Person` na home.
- 404 com `noindex` e status correto onde a plataforma permitir.

## 7. Performance

Orçamentos por recurso (falha de CI se estourar — RNF01; endurecidos no
Sprint 1.5 a partir da linha de base real de 92,9 KB de JS):

| Recurso | Orçamento (gzip/transfer) |
|---|---|
| JavaScript inicial (home) | < 110 KB |
| JavaScript por chunk lazy (case, resume) | < 35 KB adicionais |
| CSS | < 25 KB |
| Fontes no caminho crítico | ≤ 100 KB (Inter latin preload; mono sem preload) |
| Imagem LCP (foto hero / hero de case) | < 90 KB |
| Demais imagens (cada) | < 80 KB |
| Transferência total — home | < 400 KB |
| Transferência total — estudo de caso (com galeria lazy) | < 650 KB |

| Métrica de campo | Meta |
|---|---|
| LCP (4G simulado) | < 1,8 s |
| CLS | < 0.02 |
| INP | < 200 ms |
| Lighthouse (4 categorias) | ≥ 95 |

Regra de negociação: feature que estoura orçamento não "ajusta o orçamento" —
ou emagrece, ou não entra; alterações nesta tabela só via revisão documentada.

**Automação:** os orçamentos de recurso (JS por chunk, CSS, imagens) são
verificados na CI por `scripts/check-budgets.mjs` após cada build — o
pipeline falha se qualquer limite for ultrapassado. Métricas de campo
(LCP/CLS/INP/Lighthouse) entram no Lighthouse CI junto com o pre-render.

Estratégias: pre-render (§6); fontes self-hosted `woff2` subset com preload
só da Inter; Framer Motion importado por componente (tree-shaking dos
recursos não usados); zero bibliotecas de UI/charts/carousel; imagens
conforme §8; `content-visibility: auto` nas seções abaixo da dobra.

## 8. Imagens e assets

- **Formato:** AVIF com fallback WebP (`<picture>`), gerados no build por
  script (`sharp`) a partir dos originais em `assets-src/` (fora do bundle).
- **Variantes:** 1× e 2× para cada breakpoint de exibição via `srcset`;
  screenshot de card ≠ screenshot de case (crops próprios).
- **Zero CLS:** `width`/`height` explícitos em toda imagem (MediaFrame, doc
  04 §6.11); `loading="lazy"` fora da primeira dobra; a imagem do hero (foto)
  com `fetchpriority="high"`.
- **OG images:** 1200×630, geradas uma vez, estáticas em `public/og/`.
- **Diagramas:** SVG otimizado (SVGO), inline quando interativo/tematizável,
  `<img>` quando estático.
- **CV:** `public/cv-pt.pdf` e `public/cv-en.pdf`, nomes estáveis, linkados
  pela rota `/resume`.

## 9. Acessibilidade — verificação

As regras normativas estão no doc 04 §8. Verificação:

- CI: `eslint-plugin-jsx-a11y` + Lighthouse A11y ≥ 95.
- Manual antes de cada release: navegação completa por Tab (ordem lógica,
  foco visível, focus trap no menu), leitura das páginas com NVDA, zoom 200%
  sem quebra, teste com `prefers-reduced-motion` ativo.

## 10. Animações — implementação

- Variants centralizados em `lib/motion.ts` (`fadeInUp`, `fadeIn`,
  `pageTransition`) — componentes não definem timings próprios; consomem os
  tokens do doc 04 §5.
- `useReducedMotion` consultado nos variants (não em cada componente):
  com motion reduzido, os variants retornam estados finais sem transição.
- Revelação de seção: `whileInView` com `viewport={{ once: true, margin: "-10%" }}`.

## 11. Deploy e CI/CD

- **Hospedagem: Vercel** (free tier — restrição do charter §14): SPA + HTML
  pre-renderizado, headers de cache imutável para assets com hash, preview
  deploy por branch.
- **Fluxo de branches:** trunk-based — `main` protegida, trabalho em branches
  curtas com PR (a lição do FastPass registrada no doc 00 aplicada aqui).
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).

**Pipeline (GitHub Actions), a cada PR:**

```
lint (eslint) → typecheck (tsc --noEmit) → test (vitest) → build
→ lighthouse-ci (orçamentos do §7 contra o build pre-renderizado)
```

Merge em `main` → deploy automático (Vercel). Falha em qualquer etapa
bloqueia o merge.

## 12. Padrões e boas práticas

- TypeScript `strict`; proibido `any` (exceção documentada em comentário).
- Imports absolutos via alias `@/`.
- Nomes: componentes `PascalCase`, hooks `useX`, conteúdo `camelCase`.
- Sem comentários que narram o óbvio; comentário só para restrição não
  evidente no código (regra da casa).
- Textos **nunca** hardcoded em componentes — sempre de `content/` (garante
  que o doc 05 seja a única fonte editorial).
- Cada PR referencia o item do roadmap (doc 07) que implementa.
- Decisões arquiteturais novas exigem ADR em `docs/adr/` antes do merge
  (charter §16).

## 13. Testes

Escopo proporcional ao produto (site de conteúdo, não app transacional):

- **Contrato de conteúdo:** teste que valida todos os `Project` contra o
  schema (slugs únicos, seções na ordem canônica, links válidos, SEO
  preenchido) — o teste mais valioso do projeto.
- **Componentes críticos:** NavBar (menu mobile, foco, Esc), CasePage
  (renderiza todas as seções presentes e omite ausentes), 404.
- **Smoke por rota:** cada rota renderiza sem erro com os dados reais.
- Sem testes E2E na v1 (7 páginas estáticas; Lighthouse CI + smoke cobrem o
  risco real).
