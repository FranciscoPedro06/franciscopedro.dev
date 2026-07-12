/**
 * Diagrama de arquitetura do Carrinho Inteligente (doc 11 §2–3): a ponta
 * física (ESP32-CAM → leitor de QR) entra na API Spring Boot, desenhada como
 * agrupamento com as quatro camadas. O caminho em acento é a travessia das
 * camadas — a própria tese do case ("camadas antes de features").
 */
export function CarrinhoArchitecture({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1056 448"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="ci-arrow"
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
          id="ci-arrow-accent"
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

      {/* ESP32-CAM → leitor de QR */}
      <line
        x1="224"
        y1="72"
        x2="270"
        y2="72"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#ci-arrow)"
      />
      <text
        x="247"
        y="58"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        CAPTURA
      </text>

      {/* Leitor de QR → controllers (entrada na API) */}
      <line
        x1="380"
        y1="112"
        x2="380"
        y2="190"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#ci-arrow)"
      />
      <text
        x="392"
        y="164"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        HTTP
      </text>

      {/* Repositories → MySQL */}
      <line
        x1="932"
        y1="280"
        x2="932"
        y2="334"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#ci-arrow)"
      />

      {/* A travessia das camadas: o fluxo protagonista (acento) */}
      <line
        x1="480"
        y1="240"
        x2="502"
        y2="240"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#ci-arrow-accent)"
      />
      <line
        x1="656"
        y1="240"
        x2="678"
        y2="240"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#ci-arrow-accent)"
      />
      <line
        x1="832"
        y1="240"
        x2="854"
        y2="240"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#ci-arrow-accent)"
      />

      {/* ESP32-CAM */}
      <rect
        x="24"
        y="32"
        width="200"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="44" y="66" fontSize="14" fontWeight="600" className="fill-text font-sans">
        ESP32-CAM
      </text>
      <text
        x="44"
        y="88"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        SERVIDOR DE CÂMERA
      </text>

      {/* Leitor de QR */}
      <rect
        x="280"
        y="32"
        width="200"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="300" y="66" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Leitor de QR
      </text>
      <text
        x="300"
        y="88"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        PYTHON · AUXILIAR
      </text>

      {/* Agrupamento: a API em camadas (doc 11 §2) */}
      <rect
        x="304"
        y="144"
        width="728"
        height="168"
        rx="8"
        strokeWidth="1"
        strokeDasharray="6 4"
        fill="none"
        className="stroke-border"
      />
      <text
        x="328"
        y="176"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        API SPRING BOOT · QUATRO CAMADAS
      </text>

      {/* Controllers */}
      <rect
        x="328"
        y="200"
        width="152"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="344" y="234" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Controllers
      </text>
      <text
        x="344"
        y="256"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        HTTP
      </text>

      {/* Facades */}
      <rect
        x="504"
        y="200"
        width="152"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="520" y="234" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Facades
      </text>
      <text
        x="520"
        y="256"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        CASOS DE USO
      </text>

      {/* Applications */}
      <rect
        x="680"
        y="200"
        width="152"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="696" y="234" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Applications
      </text>
      <text
        x="696"
        y="256"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        REGRAS
      </text>

      {/* Repositories */}
      <rect
        x="856"
        y="200"
        width="152"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="872" y="234" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Repositories
      </text>
      <text
        x="872"
        y="256"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        JPA
      </text>

      {/* MySQL */}
      <rect
        x="856"
        y="344"
        width="152"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="872" y="378" fontSize="14" fontWeight="600" className="fill-text font-sans">
        MySQL
      </text>
      <text
        x="872"
        y="400"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        PERSISTÊNCIA
      </text>
    </svg>
  );
}
