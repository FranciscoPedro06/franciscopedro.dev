import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

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
