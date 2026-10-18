# 02 — Handoff de sessão

> Passagem de bastão entre sessões de trabalho. Meta-documento (ver
> [00-context.md](00-context.md)), **reescrito** no encerramento de cada
> Release — contém apenas o necessário para iniciar a próxima sessão, nunca
> histórico.

**Data:** 2026-10-18 · **Release encerrada:** 0.10 — "Workbench VS Code +
Linux Lab" (na `main`; a foto do Francisco entrou logo depois do merge)

## Próximo objetivo

**Validação do Francisco no site publicado**: legibilidade das palavras na
grade de pixels, texto dos diagramas na aba Arquitetura (o SVG agora tem
largura mínima e rola no estreito), os temas Dracula/Monokai, o terminal no
celular e o recorte da foto.

**Dependências:** o PR do Dependabot (atualizações de segurança agrupadas)
sobe o React Router 6 → 7 e o Vitest 4 → 5 — duas versões maiores — e quebra
o build (`react-router-dom/server` não existe na v7) e um teste das abas. Não
fazer merge dele como está: a migração para o React Router 7 é um marco
próprio (os alertas do v6 são moderados e não se aplicam a este site: links
só internos e sem data router no SSR).
Depois segue a fila de antes: **Pré-lançamento / v1.0** (doc 07 §3).

## Arquivos provavelmente envolvidos

- `src/index.css` — tokens dos 5 temas (ADR-0018). **CSS a 1,3 KB do teto**
  (23,7/25 KB): qualquer acréscimo precisa compensar.
- `src/lib/workbench.ts` — `THEMES` (ids, nomes, cores da prévia); o script
  anti-flash do `index.html` repete o mapa de cores.
- `src/content/projects/*.ts` — `languages` (medidas aproximadas), `code`
  (trecho real + link), `facts`, `steps`, `milestones`, `isNew`.
- `src/case/CasePage.tsx` + `caseTabs.ts` — abas pelo hash.
- `src/components/workbench/Terminal.tsx` + `src/lib/terminal-bus.ts` +
  `src/lib/mission.ts` — terminal e mini-missão.
- `src/content/site.ts` (`photo`) + `src/components/ui/ProfilePhoto.tsx` —
  foto do Francisco; nova foto → trocar `assets-src/site/site-foto.jpg`,
  ajustar o recorte em `scripts/generate-images.mjs` e rodar
  `npm run assets:images`.
- `src/components/sections/ContributionArt.tsx` + `src/lib/pixel-font.ts` —
  grade de pixels (palavras em `content/home.ts`).

## Decisões desta release

- **ADR-0018** substitui o ADR-0016: cor tem papel (sintaxe, logo, estado,
  azul de ação, verde do GitHub); degradê, brilho e pulsação são proibidos.
- O primeiro mockup (degradês ciano, "fp" com brilho, selo pulsando, capas
  borradas) foi **recusado** pelo Francisco — não voltar a essa estética.
- Capa de projeto = **código real** do repositório até existirem screenshots.
- **Foto:** o Francisco escolheu a foto que o site usa sempre que precisar de
  uma foto dele (`assets-src/site/site-foto.jpg`) — não trocar por outra sem
  ele pedir.
- Grade de contribuições escreve palavras, **não** finge histórico; o link
  aponta para o histórico real.

## Observações

- `vite preview` serve a home para `/projetos` (sem barra) e isso parece erro
  de hidratação — é só local; a Vercel serve certo (`trailingSlash: false`).
- O build regenera `src/content/generated/git-log.ts`; num clone raso ele
  sai com 1 commit — não commitar essa versão.
- Números do Linux Lab datados de 2026-10-18; selo "Novo" é conteúdo.
