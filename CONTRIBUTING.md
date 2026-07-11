# Contribuindo

Projeto pessoal de autor único, mas com processo de equipe — este documento
registra as regras que o próprio autor segue e que valem para qualquer
colaboração futura.

## Princípio

**Documentação antes de código.** Nenhuma feature é implementada sem estar
prevista nos documentos de `docs/`; nenhuma decisão arquitetural sem ADR em
`docs/adr/` ([ADR-0001](docs/adr/0001-record-architecture-decisions.md)).

## Fluxo de trabalho

Cada sprint segue, nesta ordem:

1. Planejamento (escopo no [roadmap](docs/07-roadmap.md));
2. Implementação;
3. Revisão técnica (lint, typecheck, testes, build e critérios do charter §7);
4. Atualização da documentação correspondente;
5. ADRs, quando houver decisão nova;
6. Commit de marco.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
  `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Um commit = um marco completo e validado
  ([ADR-0005](docs/adr/0005-trunk-based-milestone-commits.md)). A `main` é
  sempre publicável.

## Padrões de código

- TypeScript `strict`; sem `any` (exceção justificada em comentário).
- Texto editorial nunca em componente — sempre em `src/content/`
  ([ADR-0003](docs/adr/0003-content-as-typed-code.md)).
- Tokens visuais apenas do [design system](docs/04-design-system.md); valor
  fora dos tokens exige atualizar o documento primeiro.
- Componente com mais de 150 linhas ou duas responsabilidades: dividir.
- Acessibilidade não é etapa final: regras do doc 04 §8 valem em cada PR.

## Antes de abrir PR (colaboração externa)

```bash
npm run lint && npm run typecheck && npm run test && npm run build
```

Use o template de PR; vincule o item do roadmap; screenshots para mudança
visual.
