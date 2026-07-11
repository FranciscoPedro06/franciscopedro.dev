import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom não implementa IntersectionObserver (usado por whileInView e
// useScrollSpy) nem scrollTo/scrollIntoView (ScrollManager).
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
