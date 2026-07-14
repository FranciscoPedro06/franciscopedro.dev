/*
 * Este componente é apenas o window-splitter do painel: um `separator` focável
 * com `aria-valuenow` é exatamente o padrão WAI-ARIA para redimensionadores.
 * A regra jsx-a11y trata `separator` como não-interativo (falso-positivo para
 * splitters), então as duas regras ficam desligadas neste arquivo só.
 */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */
import { useRef } from "react";

/**
 * Alça de redimensionamento do painel lateral (doc 04 §6.14). Acessível:
 * `role="separator"` com valor/aria, arrastável por ponteiro e ajustável
 * pelo teclado (setas). O commit persiste a largura (ADR-0012).
 */
interface Props {
  width: number;
  min: number;
  max: number;
  /** Atualização visual durante o arraste. */
  onDrag: (width: number) => void;
  /** Valor final — persistido. */
  onCommit: (width: number) => void;
}

export function ResizeHandle({ width, min, max, onDrag, onCommit }: Props) {
  const startX = useRef(0);
  const startWidth = useRef(width);
  const dragging = useRef(false);

  const clamp = (value: number) => Math.min(max, Math.max(min, value));

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = event.clientX;
    startWidth.current = width;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    onDrag(clamp(startWidth.current + (event.clientX - startX.current)));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    onCommit(clamp(startWidth.current + (event.clientX - startX.current)));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onCommit(clamp(width - 16));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onCommit(clamp(width + 16));
    }
  };

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Redimensionar painel lateral"
      aria-valuenow={Math.round(width)}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onKeyDown={onKeyDown}
      className="group absolute right-0 top-0 z-10 h-full w-1 cursor-col-resize touch-none"
    >
      <span
        aria-hidden="true"
        className="block h-full w-px bg-transparent transition-colors duration-150 group-hover:bg-accent group-focus-visible:bg-accent"
      />
    </div>
  );
}
