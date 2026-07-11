# Documentação do projeto

Portfólio de Francisco Pedro — tratado como produto de software profissional.
Toda decisão de design, conteúdo e engenharia nasce aqui antes de virar código.

| Doc | Escopo | Responde |
|---|---|---|
| [00-technical-audit.md](00-technical-audit.md) | Auditoria técnica do ecossistema (FastPass, API Facial, demais projetos) e roadmap do GitHub | "O que existe e em que estado?" |
| [01-project-charter.md](01-project-charter.md) | Visão, objetivos, escopo, requisitos, riscos | "O que estamos construindo e por quê?" |
| [02-brand-guide.md](02-brand-guide.md) | Posicionamento, voz, identidade visual, experiência | "Como a marca fala e aparece?" |
| [03-information-architecture.md](03-information-architecture.md) | Mapa do site, navegação, fluxos, wireframes | "Como o site se organiza?" |
| [04-design-system.md](04-design-system.md) | Tokens, tipografia, grid, componentes, motion, acessibilidade | "Com que peças o site é montado?" |
| [05-content-strategy.md](05-content-strategy.md) | Narrativa e todo o texto do site, incluindo os 5 estudos de caso | "O que está escrito em cada página?" |
| [06-technical-architecture.md](06-technical-architecture.md) | Stack, estrutura, SEO, performance, CI/CD, padrões | "Como o site é construído?" |
| [07-roadmap.md](07-roadmap.md) | MVP, versões, sprints, evolução (blog, analytics, FastPass Analytics) | "O que vem e em que ordem?" |
| [adr/](adr/README.md) | Architecture Decision Records — decisões numeradas e imutáveis | "Por que decidimos assim?" |

**Hierarquia de precedência:** o charter (01) governa todos; conflitos entre
documentos se resolvem no de menor número. Mudanças relevantes atualizam o
documento primeiro, o código depois.

**Fluxo obrigatório:** auditoria → documentação → AI → brand → design system →
wireframes → protótipo → validação → implementação → testes → otimização →
deploy. Estado atual: **documentação concluída, aguardando validação** —
nenhuma linha de código de produto antes da aprovação.
