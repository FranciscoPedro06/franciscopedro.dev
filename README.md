# franciscopedro.dev

Portfólio de **Francisco Pedro — Desenvolvedor de Sistemas & Analista de
Dados**. Tratado como um produto de software: documentação antes de código,
decisões registradas, commits que contam a história do produto.

> Construo produtos digitais completos — e transformo os dados que eles geram
> em inteligência para o negócio.

## Stack

React 18 · Vite · TypeScript (strict) · Tailwind CSS 4 · Framer Motion ·
React Router — SPA com pre-render no build ([ADR-0002](docs/adr/0002-spa-with-build-time-prerender.md)).

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de produção + pre-render
npm run preview    # serve o build
```

Qualidade:

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest
```

## Documentação

Todo o projeto é orientado por documentação — o [índice em `docs/`](docs/README.md)
explica cada documento. Decisões arquiteturais em [`docs/adr/`](docs/adr/README.md).

| | |
|---|---|
| O que é o projeto | [Project Charter](docs/01-project-charter.md) |
| Como a marca fala e aparece | [Brand Guide](docs/02-brand-guide.md) |
| Estrutura e wireframes | [Arquitetura da Informação](docs/03-information-architecture.md) |
| Tokens e componentes | [Design System](docs/04-design-system.md) |
| Todo o texto do site | [Estratégia de Conteúdo](docs/05-content-strategy.md) |
| Como é construído | [Arquitetura Técnica](docs/06-technical-architecture.md) |
| O que vem a seguir | [Roadmap](docs/07-roadmap.md) |

## Metodologia

Sprints com fluxo fixo: planejamento → implementação → revisão técnica →
atualização da documentação → ADRs → commit de marco
([ADR-0005](docs/adr/0005-trunk-based-milestone-commits.md)). Conventional
Commits; a `main` é sempre publicável.

## Licença

Código sob [MIT](LICENSE). Textos, imagens e identidade visual são de
Francisco Pedro e não estão cobertos pela licença do código.
