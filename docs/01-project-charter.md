# 01 — Project Charter

> Documento-base do projeto. Nenhuma decisão futura pode contradizê-lo.
> Alterações neste documento exigem revisão dos documentos 02–07.
> Referências: auditoria técnica em [00-technical-audit.md](00-technical-audit.md).

---

## 1. Visão

Um portfólio que é, ele próprio, a prova do que afirma: um produto digital
projetado, documentado e construído com o rigor de uma equipe profissional de
engenharia e design. O visitante não lê que Francisco constrói produtos
completos — ele percebe isso navegando.

## 2. Objetivos

| # | Objetivo | Medida de verificação |
|---|---|---|
| O1 | Comunicar quem é Francisco, o que faz e seu nível técnico em menos de 15 segundos | Teste de leitura da dobra inicial (hero) |
| O2 | Apresentar 5 estudos de caso com profundidade de engenharia, não vitrine de screenshots | Cada case cobre problema → arquitetura → decisões → resultados |
| O3 | Sustentar o posicionamento duplo: desenvolvimento de software **e** análise de dados | Tese presente no hero, na timeline e na seção Dados |
| O4 | Qualidade técnica verificável do próprio site | Lighthouse ≥ 95 nas quatro métricas; WCAG 2.1 AA |
| O5 | Servir de base de evolução (blog, analytics, FastPass Analytics) sem retrabalho | Conteúdo data-driven; arquitetura descrita no doc 06 |

## 3. Público-alvo

- **Primário — recrutadores técnicos e tech leads.** Avaliam em minutos; buscam
  evidência de arquitetura, decisões justificadas e código real. É para eles
  que os estudos de caso são escritos.
- **Secundário — recrutadores não técnicos (RH).** Precisam entender o
  posicionamento e a senioridade sem jargão. O hero, o sobre e a timeline
  falam com eles.
- **Terciário — pares e comunidade.** Referência profissional e networking.

## 4. Posicionamento profissional

**Francisco Pedro — Desenvolvedor de Sistemas & Analista de Dados.**

A tese que todo o site sustenta:

> Constrói produtos digitais completos e transforma os dados que eles geram em
> inteligência para o negócio.

O portfólio **não** posiciona Francisco como "Full Stack Developer". As duas
competências (software e dados) são apresentadas como um ciclo único:
o produto gera dados; os dados geram decisão; a decisão melhora o produto.

## 5. Filosofia

- **O design desaparece; o conteúdo é o protagonista.** Nenhum elemento visual
  compete com o trabalho apresentado.
- **Evidência acima de adjetivo.** Nada de "apaixonado por tecnologia";
  no lugar, arquiteturas, decisões e resultados.
- **Sobriedade.** Poucas cores, poucas animações, muito espaço, tipografia
  impecável.
- **Honestidade técnica.** Limitações e aprendizados aparecem nos cases.
  Um erro bem explicado vale mais que uma vitória inflada.

## 6. Valores

1. **Clareza** — qualquer seção deve ser compreendida na primeira leitura.
2. **Consistência** — mesmos tokens, mesmos padrões, mesma voz em todo o site.
3. **Profundidade seletiva** — poucos projetos, tratados como estudos de caso.
4. **Acessibilidade** — o site funciona para todos, com teclado e leitor de tela.
5. **Performance como respeito** — o tempo do visitante é o recurso mais escasso.

## 7. Critérios de qualidade

- Nenhum texto com aparência de IA, clichê ou autoelogio (regras no doc 02 e 05).
- Nenhum componente sem justificativa documentada (doc 04).
- Nenhuma animação que atrapalhe leitura; `prefers-reduced-motion` respeitado.
- Nenhum dado inventado — métricas e resultados só com fonte real.
- Contraste mínimo AA em todo par texto/fundo.
- Código TypeScript estrito, sem duplicação, componentes pequenos e coesos.

## 8. Escopo

### Dentro do escopo (v1)

- Home com: hero, sobre, projetos, timeline, seção dados & analytics, contato.
- 5 páginas de estudo de caso: FastPass, API de Reconhecimento Facial,
  Carrinho Inteligente, EduPass, Reviva.
- Página `/resume` com currículo em PT e EN (visualização + download em PDF).
- Página 404.
- Dark theme único (sem alternância de tema na v1).
- SEO on-page completo, Open Graph, sitemap.
- Deploy contínuo com CI.

### Fora do escopo (v1)

- Blog / seção de escrita (v2 — previsto no doc 07). **A arquitetura, porém,
  nasce preparada na v1**: modelo de conteúdo e roteamento acomodam a seção
  Writing sem refatoração (ADR-0007).
- Formulário de contato (contato é direto: e-mail, GitHub, LinkedIn).
- CMS ou painel de administração (conteúdo versionado em código).
- Internacionalização (site em pt-BR; i18n avaliado na v3).
- Tema claro.
- Web analytics (v2, com solução respeitosa à privacidade).

## 9. Requisitos funcionais

| ID | Requisito |
|---|---|
| RF01 | O hero exibe nome, posicionamento, descrição breve, foto e ações: GitHub, LinkedIn, Currículo (PDF), Contato |
| RF02 | A navegação fixa dá acesso a: Projetos, Trajetória, Dados, Contato |
| RF03 | Cada projeto selecionado possui página exclusiva acessível por URL própria (`/projetos/:slug`) — sem modais ou popups |
| RF04 | Cada estudo de caso segue a estrutura: problema, objetivo, pesquisa, arquitetura, tecnologias, decisões técnicas, desafios, soluções, resultados, aprendizados, mídia, link do GitHub |
| RF05 | A timeline apresenta a evolução técnica com marcos e datas reais |
| RF06 | A seção Dados apresenta as competências de análise (SQL, Power BI, Python, Excel, ETL, automação) sem gráficos fictícios |
| RF07 | O currículo é baixável em PDF |
| RF08 | Rotas inexistentes exibem página 404 com retorno à home |
| RF09 | Todas as páginas possuem título, descrição e metadados Open Graph próprios |
| RF10 | A rota `/resume` exibe o currículo em página (PT e EN) com download do PDF correspondente |

## 10. Requisitos não funcionais

| ID | Requisito | Meta |
|---|---|---|
| RNF01 | Performance | Lighthouse Performance ≥ 95; LCP < 2,0 s em 4G; bundle inicial < 150 KB gzip |
| RNF02 | Acessibilidade | WCAG 2.1 AA; navegação completa por teclado; Lighthouse A11y ≥ 95 |
| RNF03 | SEO | Lighthouse SEO ≥ 95; conteúdo indexável; sitemap.xml |
| RNF04 | Responsividade | Perfeita de 320 px a 1920 px, incluindo notch/safe-area |
| RNF05 | Compatibilidade | Últimas 2 versões de Chrome, Firefox, Safari, Edge |
| RNF06 | Manutenibilidade | Adicionar um novo estudo de caso = criar 1 arquivo de conteúdo tipado, sem tocar em componentes |
| RNF07 | Motion | Todas as animações desativáveis via `prefers-reduced-motion` |

## 11. Critérios de sucesso

- Um recrutador técnico consegue explicar, após 3 minutos de navegação,
  o que é o FastPass e qual foi o papel de Francisco nele.
- Um recrutador não técnico consegue enunciar o posicionamento após ler o hero.
- As quatro métricas do Lighthouse ≥ 95 em produção.
- Zero textos genéricos: nenhum trecho poderia estar no portfólio de outra pessoa.
- O repositório do portfólio serve, ele próprio, de amostra de qualidade de código.

## 12. Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Conteúdo pendente do usuário (foto, CV, LinkedIn, resultados MIS, screenshots) | Bloqueia seções da home e mídia dos cases | Marcado como `[PENDENTE]` no doc 05; implementação começa pelo que não depende |
| Repositórios FastPass hospedados em conta de terceiro | Link externo pode mudar; autoria pode ser questionada | Fork oficial para o perfil do Francisco; autoria documentada por commits (auditoria, doc 00) |
| Chave Supabase exposta em repositórios públicos | Dano reputacional se um avaliador notar | Rotação imediata (roadmap do GitHub, doc 00 §3) |
| Contrato front↔back do FastPass quebrado no HEAD (pagamento removido) | Demo ao vivo pode falhar | Restaurar de `e2e960d` antes de divulgar demo; case descreve a versão íntegra |
| Escopo crescer durante a implementação | Atraso e perda de coesão | Este charter é a fronteira; mudanças exigem revisão documentada |

## 13. Premissas

- Francisco fornece foto, currículo, URL do LinkedIn e resultados reais da
  atuação como Analista de Dados antes da publicação.
- Os repositórios citados permanecem públicos.
- O domínio de publicação será definido até o fim da implementação
  (padrão temporário: subdomínio Vercel).

## 14. Restrições

- Stack fixa: React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router.
- Sem UI kits de terceiros; componentes próprios sobre tokens do design system.
- Sem dados fictícios em nenhuma seção.
- Textos exclusivamente em pt-BR na v1.
- Orçamento zero de infraestrutura (hospedagem em tier gratuito).

## 15. Estratégia de evolução

O site nasce preparado para crescer sem refatoração estrutural:

- **v1** — portfólio completo (este charter).
- **v2** — seção de escrita técnica (blog) e analytics de audiência com
  ferramenta que respeite privacidade.
- **v3** — integração do ecossistema de dados: FastPass Analytics (ETL →
  data warehouse → dashboard) apresentado como case vivo, fechando o ciclo
  produto → dados → decisão que o posicionamento promete.

Detalhamento no [07-roadmap.md](07-roadmap.md).

## 16. Registro de decisões

Decisões arquiteturais relevantes são registradas como **ADRs** em
[docs/adr/](adr/), numeradas e imutáveis (uma decisão revertida gera novo ADR
que a substitui). Nenhuma decisão de arquitetura é implementada sem registro.
