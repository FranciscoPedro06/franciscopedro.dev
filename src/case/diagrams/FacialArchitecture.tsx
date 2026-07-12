/**
 * Diagrama de arquitetura da API de Reconhecimento Facial (doc 11 §2–3):
 * caixas por serviço, esquerda→direita seguindo o request. O caminho em
 * acento é o consumo pelo FastPass (/register · /verify) — a prova de que a
 * API não conhece o produto. Supabase é nó externo (borda tracejada).
 */
export function FacialArchitecture({ ariaLabel }: { ariaLabel: string }) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 1056 224"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="rf-arrow"
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
          id="rf-arrow-accent"
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

      {/* Consumidor → API: o fluxo protagonista (acento) */}
      <line
        x1="264"
        y1="112"
        x2="398"
        y2="112"
        strokeWidth="1.5"
        className="stroke-accent"
        markerEnd="url(#rf-arrow-accent)"
      />
      <text
        x="336"
        y="98"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        /REGISTER · /VERIFY
      </text>

      {/* API → Supabase: persistência dos embeddings */}
      <line
        x1="648"
        y1="112"
        x2="782"
        y2="112"
        strokeWidth="1.5"
        className="stroke-border-strong"
        markerEnd="url(#rf-arrow)"
      />
      <text
        x="720"
        y="98"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-2 font-mono"
      >
        EMBEDDINGS · 512D
      </text>

      {/* FastPass-BackEnd — consumidor atual */}
      <rect
        x="24"
        y="72"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="44" y="106" fontSize="14" fontWeight="600" className="fill-text font-sans">
        FastPass-BackEnd
      </text>
      <text
        x="44"
        y="128"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        LARAVEL · SERVICE ISOLADO
      </text>

      {/* face-id — o microserviço */}
      <rect
        x="408"
        y="72"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        className="fill-surface-2 stroke-border"
      />
      <text x="428" y="106" fontSize="14" fontWeight="600" className="fill-text font-sans">
        face-id
      </text>
      <text
        x="428"
        y="128"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        FASTAPI · DEEPFACE · RENDER
      </text>

      {/* Supabase — serviço de terceiro (borda tracejada, doc 11 §2) */}
      <rect
        x="792"
        y="72"
        width="240"
        height="80"
        rx="8"
        strokeWidth="1"
        strokeDasharray="6 4"
        className="fill-surface-2 stroke-border"
      />
      <text x="812" y="106" fontSize="14" fontWeight="600" className="fill-text font-sans">
        Supabase
      </text>
      <text
        x="812"
        y="128"
        fontSize="11"
        letterSpacing="0.08em"
        className="fill-text-3 font-mono"
      >
        EMBEDDINGS · POSTGRES
      </text>
    </svg>
  );
}
