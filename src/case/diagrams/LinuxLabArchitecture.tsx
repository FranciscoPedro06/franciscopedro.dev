/**
 * Diagrama de arquitetura do Linux Lab (doc 11 §2–3): esquerda→direita
 * seguindo o terminal — navegador, Caddy, API —, com o PostgreSQL e o Docker
 * à direita. A zona tracejada marca o que roda sob gVisor. O caminho em
 * acento é o do terminal (o fluxo protagonista do produto).
 */
export function LinuxLabArchitecture({ ariaLabel }: { ariaLabel: string }) {
  const label = "fill-text-3 font-mono";
  const title = "fill-text font-sans";
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1056 392"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="ll-arrow"
          viewBox="0 0 8 8"
          refX="8"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L8 4 L0 8 Z" className="fill-border-strong" />
        </marker>
        <marker
          id="ll-arrow-accent"
          viewBox="0 0 8 8"
          refX="8"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L8 4 L0 8 Z" className="fill-accent" />
        </marker>
      </defs>

      {/* Zona do runtime isolado (gVisor) */}
      <rect
        x="824"
        y="152"
        width="224"
        height="232"
        rx="8"
        strokeWidth="1"
        strokeDasharray="6 4"
        className="fill-none stroke-border-strong"
      />
      <text x="840" y="176" fontSize="11" letterSpacing="0.08em" className={label}>
        GVISOR · RUNSC
      </text>

      {/* Navegador → Caddy → API: o caminho do terminal (acento) */}
      <line
        x1="224"
        y1="208"
        x2="286"
        y2="208"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#ll-arrow-accent)"
      />
      <text
        x="256"
        y="194"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        HTTPS · WSS
      </text>
      <line
        x1="464"
        y1="208"
        x2="526"
        y2="208"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#ll-arrow-accent)"
      />
      <text
        x="496"
        y="194"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        /API · /WS
      </text>

      {/* API → PostgreSQL */}
      <path
        d="M752 184 H792 V72 H838"
        fill="none"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#ll-arrow)"
      />
      <text
        x="800"
        y="60"
        textAnchor="end"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        SQL
      </text>

      {/* API → Docker Engine */}
      <line
        x1="752"
        y1="232"
        x2="838"
        y2="232"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#ll-arrow)"
      />
      <text
        x="794"
        y="256"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        DOCKER
      </text>

      {/* Docker Engine → contêiner do lab */}
      <line
        x1="936"
        y1="272"
        x2="936"
        y2="294"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#ll-arrow)"
      />

      {/* linux-lab-web */}
      <rect
        x="24"
        y="168"
        width="200"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="44" y="202" fontSize="14" fontWeight="600" className={title}>
        linux-lab-web
      </text>
      <text x="44" y="224" fontSize="11" letterSpacing="0.08em" className={label}>
        REACT · XTERM.JS
      </text>

      {/* Caddy */}
      <rect
        x="288"
        y="168"
        width="176"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="308" y="202" fontSize="14" fontWeight="600" className={title}>
        Caddy
      </text>
      <text x="308" y="224" fontSize="11" letterSpacing="0.08em" className={label}>
        TLS · PROXY
      </text>

      {/* linux-lab-api */}
      <rect
        x="528"
        y="168"
        width="224"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="548" y="202" fontSize="14" fontWeight="600" className={title}>
        linux-lab-api
      </text>
      <text x="548" y="224" fontSize="11" letterSpacing="0.08em" className={label}>
        FASTAPI · MONÓLITO MODULAR
      </text>

      {/* PostgreSQL */}
      <rect
        x="840"
        y="32"
        width="192"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="860" y="66" fontSize="14" fontWeight="600" className={title}>
        PostgreSQL
      </text>
      <text x="860" y="88" fontSize="11" letterSpacing="0.08em" className={label}>
        SESSÕES · MISSÕES
      </text>

      {/* Docker Engine */}
      <rect
        x="840"
        y="192"
        width="192"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="860" y="226" fontSize="14" fontWeight="600" className={title}>
        Docker Engine
      </text>
      <text x="860" y="248" fontSize="11" letterSpacing="0.08em" className={label}>
        1 LAB ATIVO POR CONTA
      </text>

      {/* Contêiner do lab */}
      <rect
        x="840"
        y="296"
        width="192"
        height="72"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="860" y="328" fontSize="14" fontWeight="600" className={title}>
        bash do aluno
      </text>
      <text x="860" y="350" fontSize="11" letterSpacing="0.08em" className={label}>
        SEM REDE · ROOTFS RO
      </text>
    </svg>
  );
}
