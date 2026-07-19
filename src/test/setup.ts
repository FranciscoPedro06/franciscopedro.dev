import "@testing-library/jest-dom/vitest";
import { configure } from "@testing-library/react";
import { vi } from "vitest";

// `findBy*` espera 1s por default — pouco para chunk lazy (Command Palette,
// painéis) resolver com a suíte inteira em paralelo. Mesma razão do
// `testTimeout` no vite.config.ts; rodada verde não fica mais lenta.
configure({ asyncUtilTimeout: 5_000 });

// jsdom não implementa IntersectionObserver (usado por whileInView e
// useScrollSpy) nem scrollTo/scrollIntoView (ScrollManager).
// O smoke test do pre-render roda em ambiente node (sem window) — os stubs
// de DOM só se aplicam onde há DOM.
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (typeof window !== "undefined") {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
}
