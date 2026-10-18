import { setWorkbench } from "@/lib/workbench";

/**
 * Ponte para o terminal do painel inferior (Release 0.10): qualquer parte da
 * interface pode pedir um comando ("cat linux-lab", "lab"). O painel é lazy,
 * então o pedido entra numa fila que o terminal esvazia ao montar; depois
 * disso chega por evento. Só cromo de UI — nada persiste (ADR-0012).
 */
const queue: string[] = [];
const listeners = new Set<(command: string) => void>();

export function runInTerminal(command: string): void {
  setWorkbench({ panelOpen: true, panelTab: "terminal" });
  if (listeners.size === 0) {
    queue.push(command);
    return;
  }
  for (const listener of listeners) listener(command);
}

/** Registra o terminal montado; devolve a função de saída. */
export function onTerminalCommand(listener: (command: string) => void): () => void {
  listeners.add(listener);
  for (const command of queue.splice(0)) listener(command);
  return () => {
    listeners.delete(listener);
  };
}
