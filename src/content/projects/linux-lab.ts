import type { Project } from "../types";

/**
 * Linux Lab (Release 0.10) — fonte: READMEs e código de
 * github.com/FranciscoPedro06/linux-lab-api e linux-lab-web. Números
 * verificáveis no histórico (commits, incrementos, arquivos de teste).
 */
export const linuxLab: Project = {
  slug: "linux-lab",
  name: "Linux Lab",
  summary:
    "Plataforma para aprender Linux resolvendo problemas num terminal real, dentro de um contêiner isolado criado para cada aluno. A plataforma confere o estado final do sistema.",
  badge: "EM ANDAMENTO · 2026",
  tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "React", "TypeScript"],
  links: {
    github: [
      {
        label: "linux-lab-api",
        url: "https://github.com/FranciscoPedro06/linux-lab-api",
      },
      {
        label: "linux-lab-web",
        url: "https://github.com/FranciscoPedro06/linux-lab-web",
      },
    ],
  },
  seo: {
    title: "Linux Lab — estudo de caso · Francisco Pedro",
    description:
      "Plataforma para aprender Linux num terminal real, em contêineres isolados com gVisor. Validação pelo estado do sistema com FastAPI, PostgreSQL e React.",
  },
  media: [],
  facts: [
    { label: "Incrementos", value: "01–09 de 13" },
    { label: "Commits", value: "127" },
    { label: "Arquivos de teste (API)", value: "69" },
    { label: "Início", value: "27 set 2026" },
  ],
  steps: [
    "O aluno inicia um lab para uma missão: um contêiner isolado, criado a partir da imagem do lab e preso à versão atual da missão.",
    "A API gera os parâmetros da missão e roda o script de setup dentro do contêiner antes de liberar o lab.",
    "O navegador abre um terminal xterm.js ligado por WebSocket a um bash real dentro do contêiner, como usuário sem privilégios. Nada é emulado.",
    "O aluno usa os comandos que quiser. Nada do que é digitado é interpretado ou filtrado.",
    "Ao pedir a validação, a API confere o estado do lab contra as condições da missão e devolve o resultado de cada uma.",
    "A primeira validação aprovada registra a conclusão. Ela pertence à missão, não à versão, e continua valendo depois que o lab acaba.",
  ],
  sections: [
    {
      kind: "problema",
      title: "Problema",
      paragraphs: [
        "Cursos introdutórios de Linux costumam ensinar um comando por vez: ler sobre mkdir, digitar mkdir, seguir em frente. Isso treina memória de sintaxe, não a capacidade de consertar algo num sistema de verdade.",
      ],
    },
    {
      kind: "objetivo",
      title: "Objetivo",
      paragraphs: [
        'O aluno recebe um problema ("o script de deploy está legível por qualquer usuário, corrija"), um shell real e liberdade para resolver como quiser. A plataforma confere o resultado: chmod 700, chmod u=rwx,go= ou qualquer outro caminho que chegue ao mesmo estado passa.',
      ],
    },
    {
      kind: "arquitetura",
      title: "Arquitetura",
      paragraphs: [
        "Monólito modular: autenticação, catálogo, progresso, labs, terminal, validação e histórico são módulos da mesma aplicação FastAPI. O Caddy termina o TLS, serve o front e faz proxy de /api e /ws. Cada lab ativo é um contêiner Docker rodando sob gVisor.",
        "O PTY é criado dentro do contêiner com docker exec e TTY; a API só repassa bytes. Sem Redis, fila ou orquestrador: o PostgreSQL cuida de sessões, estado e concorrência.",
      ],
      diagram: {
        id: "linux-lab-arquitetura",
        ariaLabel:
          "Diagrama de arquitetura do Linux Lab: o navegador fala com o Caddy por HTTPS e WebSocket; o Caddy repassa /api e /ws para a API FastAPI, que usa o PostgreSQL e cria pelo Docker, sob gVisor, um contêiner isolado por lab.",
        caption:
          "Um processo de API; o Docker sob gVisor cria um contêiner sem rede para cada lab ativo.",
      },
    },
    {
      kind: "tecnologias",
      title: "Limites de cada contêiner",
      paragraphs: [
        "A configuração vem de src/linuxlab/labs/runtime/spec.py. Cada limite é coberto por testes que rodam dentro do contêiner.",
      ],
      items: [
        {
          title: "NetworkMode: none",
          body: "Sem rede: o contêiner não alcança nada fora dele.",
        },
        {
          title: "ReadonlyRootfs: true",
          body: "Raiz somente leitura; só diretórios tmpfs aceitam escrita.",
        },
        { title: "Memory: 512 MB", body: "Sem swap extra (MemorySwap igual a Memory)." },
        { title: "NanoCpus: 0,5 CPU", body: "Meio núcleo por lab." },
        {
          title: "PidsLimit: 128 / 512",
          body: "128 processos sob runc e 512 sob gVisor.",
        },
        {
          title: "CapDrop: ALL",
          body: "Voltam só CHOWN, DAC_OVERRIDE, FOWNER e KILL, usados pela plataforma.",
        },
        {
          title: "SecurityOpt: no-new-privileges",
          body: "Nenhum processo ganha privilégio além do que começou.",
        },
        { title: "User: 1000:1000", body: "O shell do aluno roda como usuário comum." },
      ],
    },
    {
      kind: "decisoes",
      title: "Decisões técnicas",
      paragraphs: [],
      items: [
        {
          title: "Validar o resultado, não o comando",
          body: "Missões declaram condições (o arquivo existe, a permissão é 0700) em vez de rodar código de validação. Qualquer sequência de comandos que chegue ao estado certo passa.",
        },
        {
          title: "Validação em duas fases",
          body: "Um utilitário da plataforma, embutido na imagem somente leitura, coleta fatos dentro do contêiner. A API avalia esses fatos contra a árvore de condições da missão (all, any, not). Padrões de texto usam RE2.",
        },
        {
          title: "Isolamento como requisito",
          body: "Sem rede, raiz somente leitura, limites de CPU, memória e processos, todas as capabilities removidas e no-new-privileges. Em produção, a API se recusa a subir se os labs não rodarem sob gVisor.",
        },
        {
          title: "Missões versionadas e imutáveis",
          body: "O conteúdo vive no repositório e é sincronizado para o PostgreSQL por linuxlab content sync, que valida tudo antes e grava numa única transação. Cada mudança vira uma nova versão, e um lab fica preso à versão com que foi criado.",
        },
        {
          title: "Um lab ativo por conta, garantido pelo banco",
          body: "A regra é uma constraint no PostgreSQL, não uma verificação na aplicação que duas requisições simultâneas poderiam furar.",
        },
        {
          title: "Sessão no servidor",
          body: "Login com sessão em cookie HttpOnly. O front nunca vê o token e não guarda nada da sessão em localStorage ou sessionStorage.",
        },
      ],
    },
    {
      kind: "desafios",
      title: "Desafios e soluções",
      paragraphs: [],
      items: [
        {
          title: "Várias abas, um só cookie",
          body: "As abas se coordenam com Web Locks e BroadcastChannel. Uma aba só mostra páginas privadas enquanto segura o lock compartilhado; login e logout pegam o lock exclusivo, então nenhuma aba exibe dados de outra pessoa enquanto o cookie muda. As páginas são ocultadas, não desmontadas, para o terminal aberto não perder a conexão.",
        },
        {
          title: "Contêineres esquecidos",
          body: "Um lab termina quando o aluno encerra, faz logout, fica inativo (15 minutos sem terminal, 30 sem digitar), passa de 2 horas ou estoura a memória. Um reaper em segundo plano reconcilia o banco com o Docker e remove o que sobrou, e o aluno é avisado do motivo.",
        },
        {
          title: "Setup que demora",
          body: 'Preparar o lab pode levar cerca de um minuto. Enquanto isso o botão mostra "Preparando…" e não aceita um segundo clique.',
        },
      ],
    },
    {
      kind: "resultados",
      title: "Resultados",
      paragraphs: [
        "Incrementos 01 a 09 implementados, do esqueleto com CI ao registro de progresso. A CI roda lint, checagem de tipos, testes de integração contra PostgreSQL e testes com Docker sob runc; um workflow separado roda os testes de runtime sob gVisor.",
      ],
    },
    {
      kind: "aprendizados",
      title: "Aprendizados",
      paragraphs: [
        "Validar o estado, e não os comandos, muda o desenho das missões: cada uma precisa provar que aceita qualquer solução válida. Por isso o plano inclui um harness em que cada missão declara soluções que devem passar e contraexemplos que devem falhar.",
        "Isolamento só vale se for testado. As garantias do contêiner (sem root, sem rede, sem socket do Docker, raiz somente leitura, fork bomb contida) viraram testes que rodam dentro dele, sob runc na CI e sob gVisor num workflow separado.",
        'O banco é um bom árbitro de concorrência. Regras como "um lab ativo por conta" ficam numa constraint do PostgreSQL, e não em verificações da aplicação. Menos peças (sem Redis, sem fila) também significou menos coisa para dar errado.',
        "Coordenação entre abas é parte da segurança, não detalhe de interface: o cookie de sessão é o mesmo em todas as abas, então trocar de usuário exige que nenhuma delas esteja mostrando dados privados naquele momento.",
      ],
    },
  ],
  milestones: [
    { id: "01", title: "Esqueleto do projeto e CI", status: "done" },
    { id: "02", title: "Imagem do lab e runtime Docker endurecido", status: "done" },
    { id: "03", title: "Terminal via WebSocket", status: "done" },
    { id: "04", title: "Banco de dados e autenticação", status: "done" },
    { id: "05", title: "Sessões de lab, autorização e limpeza", status: "done" },
    { id: "06", title: "Catálogo de missões e sync", status: "done" },
    { id: "07", title: "Setup e parâmetros de missão", status: "done" },
    { id: "08", title: "Motor de validação", status: "done" },
    { id: "09", title: "Progresso", status: "done" },
    { id: "10", title: "Reset e troca de missão", status: "next" },
    { id: "11", title: "Harness de testes e cinco primeiras missões", status: "planned" },
    { id: "12", title: "Histórico de comandos", status: "planned" },
    { id: "13", title: "Deploy do beta fechado", status: "planned" },
  ],
  languages: [
    { name: "Python", percent: 57 },
    { name: "TypeScript", percent: 41 },
  ],
  code: {
    repo: "linux-lab-api",
    path: "src/linuxlab/validation/evaluate.py",
    url: "https://github.com/FranciscoPedro06/linux-lab-api/blob/main/src/linuxlab/validation/evaluate.py#L262-L273",
    startLine: 262,
    lang: "py",
    code: 'def combine(kind: str, statuses: Sequence[Status]) -> Status:\n    if kind == "not":\n        (status,) = statuses\n        return {Status.PASSED: Status.FAILED, Status.FAILED: Status.PASSED}.get(status, status)\n    if kind == "all":\n        if Status.FAILED in statuses:\n            return Status.FAILED\n        return Status.ERROR if Status.ERROR in statuses else Status.PASSED\n    if Status.PASSED in statuses:\n        return Status.PASSED\n    return Status.ERROR if Status.ERROR in statuses else Status.FAILED',
    note: "Trecho de src/linuxlab/validation/evaluate.py. Uma condição que não pôde ser verificada vira erro da plataforma, nunca falha do aluno.",
  },
  isNew: true,
  order: 2,
  highlight: true,
};
