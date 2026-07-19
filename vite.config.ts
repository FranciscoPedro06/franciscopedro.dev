/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
    css: false,
    // O default (5s) flakeia sob carga: axe na home leva ~5s e as suítes que
    // abrem chunks lazy estouram em paralelo (falso-negativo conhecido desde a
    // 0.7 — o conjunto que falha varia por rodada e tudo passa isolado). Teto
    // maior não atrasa rodada verde; só dá folga ao pior caso desta máquina.
    testTimeout: 20_000,
  },
});
