# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/);
versionamento [SemVer](https://semver.org/lang/pt-BR/). Cada entrada
corresponde a um marco do [roadmap](docs/07-roadmap.md).

## [Unreleased]

### Added

- Release 0.3: estudo de caso completo do FastPass — template definitivo de
  case em `src/case/` (seções canônicas, índice lateral com scroll-spy,
  navegação anterior/próximo), diagrama de arquitetura em SVG inline no
  padrão do doc 11, conteúdo integral do doc 05 §3.1 (com integração,
  segurança e evolução planejada), conteúdo dividido em um arquivo por case
  (`src/content/projects/`) e meta-documentos `docs/00-context.md` e
  `docs/01-project-state.md`.
- Sprint 2: home completa nas 7 seções aprovadas (Hero, Featured Work,
  Engineering, Data, Timeline, About, Contact), página `/projetos` com os 5
  estudos de caso, template inicial de case com navegação anterior/próximo,
  scroll-spy na navegação, gestão de scroll e foco por rota e testes de
  contrato dos projetos.
- Pré-S2: Accessibility Foundation (doc 13), revisões de sprint em
  `docs/reviews/` e orçamentos de performance verificados automaticamente na
  CI (`scripts/check-budgets.mjs`).
- Sprint 1.5: fundação de marca e experiência — Motion Guidelines (doc 08),
  SEO Foundation (doc 09), Brand Assets (doc 10) com wordmark
  `franciscopedro.dev` (ADR-0009) e geração de assets por código (favicon,
  app icons, OG image), padrão de diagramas e mockups (doc 11), sistema de
  imagens (doc 12), orçamentos de performance por recurso (doc 06 §7) e
  decisão de analytics: Umami na v2 (ADR-0008).
- Sprint 1: fundação do projeto — Vite + React 18 + TypeScript strict +
  Tailwind 4 com todos os tokens do design system, tipografia self-hosted
  (Inter Variable + JetBrains Mono), layout base (NavBar com menu mobile
  acessível, Footer, SkipLink, Section/Container), Button, modelo de conteúdo
  tipado com teste de contrato, variants de motion centralizados e CI
  (lint, typecheck, test, build).
- Sprint 0: documentação completa do produto (`docs/00`–`07`), Architecture
  Decision Records (`docs/adr/0001`–`0007`) e governança do repositório.
