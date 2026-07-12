# Architecture Decision Records

Registro imutável das decisões arquiteturais do projeto (charter §16).

- Formato: [template.md](template.md) (MADR simplificado).
- Numeração sequencial; um ADR nunca é editado após aceito — uma decisão
  revertida gera novo ADR com status `Substitui ADR-XXXX`.
- Toda decisão de arquitetura é registrada **antes** de ser implementada.

| ADR | Título | Status |
|---|---|---|
| [0001](0001-record-architecture-decisions.md) | Registrar decisões de arquitetura como ADRs | Aceito |
| [0002](0002-spa-with-build-time-prerender.md) | SPA com pre-render no build, não meta-framework | Aceito |
| [0003](0003-content-as-typed-code.md) | Conteúdo como módulos TypeScript tipados | Aceito |
| [0004](0004-no-global-state.md) | Nenhum gerenciador de estado global na v1 | Aceito |
| [0005](0005-trunk-based-milestone-commits.md) | Trunk-based com commits de marco | Aceito |
| [0006](0006-resume-route-pt-en.md) | Currículo como rota `/resume` com PT/EN de fonte única | Aceito |
| [0007](0007-blog-ready-architecture.md) | Arquitetura blog-ready desde a v1 | Aceito |
| [0008](0008-analytics-umami.md) | Analytics com Umami (v2) | Aceito |
| [0009](0009-domain-wordmark.md) | Wordmark: o domínio como marca | Aceito |
| [0010](0010-prerender-react-dom-server.md) | Pre-render com react-dom/server sobre o entry SSR do Vite | Aceito |
