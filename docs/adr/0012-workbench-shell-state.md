# ADR-0012 — Estado do "shell" do Workbench (client-persistido, SSR-safe)

**Status:** Aceito (decisão do Francisco, Release 0.7)
**Data:** 2026-07-14

## Contexto

Até a 0.6.1 o site não tinha **nenhum** estado de cliente: tudo derivava da
URL (ADR-0004) e do hash (ADR-0011). A Release 0.7 transforma a experiência
numa IDE de verdade — e uma IDE tem estado de *cromo* que persiste entre
navegações: tema, largura e recolhimento da sidebar, pastas expandidas do
explorer, conjunto de abas abertas, painel inferior ativo. Nada disso é
conteúdo, navegação ou SEO; é a memória da ferramenta. O ADR-0004 já previu
este momento ("se um requisito real de estado global surgir — ex.: tema claro
na v2+ — novo ADR o introduz junto do requisito").

## Decisão

1. **Um store mínimo** em `src/lib/workbench.ts` sobre `useSyncExternalStore`
   + `localStorage` (chave `fp.workbench.v1`) guarda **apenas cromo de UI**:
   `theme`, `sidebarCollapsed`, `sidebarWidth`, `activeView` (painel lateral),
   `explorerExpanded`, `openTabs`, `panelOpen`, `panelTab`.
2. **Conteúdo, navegação e SEO continuam derivados da URL/hash** (ADR-0004 e
   0011 preservados). Em particular, a **aba ativa** do editor deriva da URL;
   o store guarda só o *conjunto* de abas abertas.
3. **SSR-safe pelo mesmo padrão do `useHomeView`**: o snapshot de servidor é
   sempre `DEFAULTS`, e o valor persistido só assume no re-render
   pós-hidratação (gate `useHydrated`) — sem mismatch. O tema pintado antes do
   React vem do script anti-flash (ADR-0013), então o gate não causa flash.
4. **Degrada sem `localStorage`** (modo privado, SSR, jsdom): tudo cai nos
   `DEFAULTS`; `try/catch` em toda leitura/escrita.

## Alternativas consideradas

- **Biblioteca de estado (Zustand/Redux):** peso e indireção desnecessários
  para um punhado de flags; violaria o charter §7 e o orçamento de JS.
- **React Context:** re-render amplo e boilerplate de provider no `App`; o
  store externo é menor e testável fora de árvore.
- **Tudo na URL (querystring):** poluiria URLs canônicas e o SEO — cromo de UI
  não deve virar rota nem parâmetro indexável.

## Consequências

- Passa a existir estado de cliente — restrito, tipado e num único módulo.
  Nenhum outro lugar do código pode introduzir estado persistido fora dele.
- Todo campo novo do shell nasce em `WorkbenchState` com um `DEFAULT`
  correspondente (o `DEFAULTS` é o contrato de SSR).
- Superfícies pesadas do workbench (palette, painel inferior, search, git)
  são lazy e **não** afetam o snapshot de SSR nem o orçamento inicial.
