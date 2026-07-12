/**
 * Diagrama de arquitetura do FastPass (doc 11 §2–3): caixas por serviço,
 * esquerda→direita seguindo o request. Inline para herdar tokens e fontes do
 * tema; um único caminho em acento (front → API — o fluxo protagonista).
 * Grid de 8px; nó externo (Mercado Pago) com borda tracejada.
 */
export function FastPassArchitecture({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1056 320"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="fp-arrow"
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
          id="fp-arrow-accent"
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

      {/* Front-end → API: o fluxo protagonista (acento) */}
      <line
        x1="264"
        y1="160"
        x2="398"
        y2="160"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#fp-arrow-accent)"
      />
      <text
        x="332"
        y="146"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        HTTP · BEARER
      </text>

      {/* API → microserviço facial */}
      <path
        d="M648 144 H720 V72 H782"
        fill="none"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#fp-arrow)"
      />
      <text
        x="776"
        y="58"
        textAnchor="end"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        HTTP · /REGISTER · /VERIFY
      </text>

      {/* API → Mercado Pago */}
      <path
        d="M648 176 H720 V248 H782"
        fill="none"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#fp-arrow)"
      />
      <text
        x="776"
        y="272"
        textAnchor="end"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        PIX · WEBHOOK
      </text>

      {/* FastPass-FrontEnd */}
      <rect
        x="24"
        y="120"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="44" y="154" fontSize="14" fontWeight="600" className="fill-text font-sans">
        FastPass-FrontEnd
      </text>
      <text
        x="44"
        y="176"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        REACT 18 · VITE · VERCEL
      </text>

      {/* FastPass-BackEnd */}
      <rect
        x="408"
        y="120"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="428" y="154" fontSize="14" fontWeight="600" className="fill-text font-sans">
        FastPass-BackEnd
      </text>
      <text
        x="428"
        y="176"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        LARAVEL · SANCTUM · RENDER
      </text>

      {/* FastPass-Facial */}
      <rect
        x="792"
        y="32"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="812" y="66" fontSize="14" fontWeight="600" className="fill-text font-sans">
        FastPass-Facial
      </text>
      <text
        x="812"
        y="88"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        FASTAPI · DEEPFACE
      </text>

      {/* Mercado Pago — serviço de terceiro (borda tracejada, doc 11 §2) */}
      <rect
        x="792"
        y="208"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        strokeDasharray="6 4"
        className="fill-surface-2 stroke-border"
      />
      <text x="812" y="242" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Mercado Pago
      </text>
      <text
        x="812"
        y="264"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        PIX · V1/PAYMENTS
      </text>
    </svg>
  );
}
