import { Writable } from "node:stream";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";

/**
 * Entry SSR do pre-render (ADR-0010): consumido apenas por
 * `scripts/prerender.mjs` via `vite build --ssr` — nunca entra no bundle do
 * cliente. Reexporta rotas e geradores para que o script tenha uma fonte só.
 */
export { headTags, robotsTxt, sitemapXml } from "@/lib/seo";
export { notFoundRoute, routes } from "@/content/routes";

/**
 * HTML de uma rota. `renderToPipeableStream` + `onAllReady` esperam os
 * chunks de `React.lazy` resolverem — `renderToString` emitiria o fallback
 * do Suspense (vazio) nas rotas secundárias.
 */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const writable = new Writable({
      write(chunk: Buffer, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
      final(callback) {
        resolve(Buffer.concat(chunks).toString("utf8"));
        callback();
      },
    });

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady() {
          pipe(writable);
        },
        onError(error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        },
      }
    );
  });
}
