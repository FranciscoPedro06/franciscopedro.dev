# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-07-12 · **Release encerrada:** 0.5 — Production Readiness

## Próximo objetivo

**Release 0.6 — Pré-lançamento / v1.0** (S5 do doc 07), a validar com o
Francisco: roadmap GitHub pré-lançamento (doc 07 §3), deploy real na Vercel
e integração do material dele (doc 05 §7) conforme chegar. Boa parte depende
de ações do Francisco fora deste repositório.

## Arquivos provavelmente envolvidos

- `src/lib/seo.ts` — **confirmar `SITE_URL`** assim que o projeto Vercel
  existir (hoje: previsão `https://franciscopedro-dev.vercel.app`); o
  domínio definitivo é a mesma linha.
- `src/content/site.ts` — e-mail, LinkedIn, `resumeReady` quando o material
  chegar.
- Doc de referência: 07 §3 (roadmap GitHub), 05 §7 (pendências de material).

## Decisões desta release

- Pre-render é script próprio com `react-dom/server` (**ADR-0010**);
  `renderToPipeableStream` por causa das rotas em `React.lazy`. Build =
  `tsc && vite build && npm run prerender`.
- SEO orientado a coleções (`src/content/routes.ts`): coleção nova na v2 =
  registrar a fonte; pre-render/sitemap/contratos cobrem sozinhos.
- Asserção de performance do Lighthouse CI em **0,90 (tripwire)**, decisão
  do Francisco: o critério oficial do M7 (≥ 95) se mede no preview da
  Vercel — pendência aberta na revisão da 0.5.
- Achados de acessibilidade corrigidos pelo novo gate axe: `/projetos`
  ganhou `h1` (prop `as` no `SectionHeading`) e os cards do índice viraram
  `h2` (`headingAs` no `ProjectCard`).

## Observações

- As Releases 0.3–0.5 aguardam validação do Francisco em navegador real,
  incluindo o checklist manual de acessibilidade (NVDA, Tab, zoom 200%).
- No Windows local, o Lighthouse CI precisa de `CHROME_PATH` apontando para
  o Edge; no GitHub Actions o Chrome existe nativamente.
- As pendências de material que bloqueiam a publicação estão no
  [01-project-state.md](01-project-state.md).
