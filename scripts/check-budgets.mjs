/**
 * Verifica os orçamentos de performance de docs/06-technical-architecture.md
 * §7 contra o build real. Falha (exit 1) se qualquer limite for ultrapassado.
 * Executado na CI após o build; roda localmente via `npm run check:budgets`.
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const KB = 1024;
const BUDGETS = {
  entryJsGzip: 110 * KB,
  lazyChunkJsGzip: 35 * KB,
  cssGzip: 25 * KB,
  imageBytes: 80 * KB, // por imagem em public/images (LCP tratada à parte)
};

const failures = [];
const report = [];

async function gzipSize(path) {
  return gzipSync(await readFile(path)).length;
}

const dist = "dist";
const assetsDir = join(dist, "assets");
const assets = await readdir(assetsDir);

// O JS inicial é o chunk de entrada MAIS os chunks estáticos que ele puxa
// (rel="modulepreload" no index.html) — quando o Rollup divide a entrada,
// tudo isso chega junto no primeiro carregamento e o orçamento vale para a
// soma. Os demais .js são lazy (import() de rota).
const indexHtml = await readFile(join(dist, "index.html"), "utf8");
const entryMatch = indexHtml.match(/src="\/assets\/(index-[^"]+\.js)"/);
if (!entryMatch) throw new Error("Chunk de entrada não encontrado no index.html");
const preloaded = [
  ...indexHtml.matchAll(/rel="modulepreload"[^>]*href="\/assets\/([^"]+\.js)"/g),
].map((m) => m[1]);
const initialChunks = new Set([entryMatch[1], ...preloaded]);
const initialFiles = [];

for (const file of assets) {
  const path = join(assetsDir, file);

  if (file.endsWith(".js")) {
    const size = await gzipSize(path);
    if (initialChunks.has(file)) {
      initialFiles.push({ file, size });
    } else {
      const limit = BUDGETS.lazyChunkJsGzip;
      report.push({ label: "JS lazy  ", file, size, limit });
      if (size > limit) failures.push({ label: "JS lazy", file, size, limit });
    }
  }

  if (file.endsWith(".css")) {
    const size = await gzipSize(path);
    report.push({ label: "CSS      ", file, size, limit: BUDGETS.cssGzip });
    if (size > BUDGETS.cssGzip)
      failures.push({ label: "CSS", file, size, limit: BUDGETS.cssGzip });
  }
}

// Imagens de conteúdo (quando existirem)
try {
  const imagesDir = join(dist, "images");
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (/\.(avif|webp|png)$/.test(entry.name)) {
        const size = (await readFile(path)).length;
        report.push({
          label: "Imagem   ",
          file: entry.name,
          size,
          limit: BUDGETS.imageBytes,
        });
        if (size > BUDGETS.imageBytes)
          failures.push({
            label: "Imagem",
            file: entry.name,
            size,
            limit: BUDGETS.imageBytes,
          });
      }
    }
  };
  await walk(imagesDir);
} catch {
  // dist/images ainda não existe — nada a verificar
}

const initialTotal = initialFiles.reduce((sum, f) => sum + f.size, 0);
report.unshift({
  label: "JS inicial",
  file: initialFiles.map((f) => f.file).join(" + "),
  size: initialTotal,
  limit: BUDGETS.entryJsGzip,
});
if (initialTotal > BUDGETS.entryJsGzip)
  failures.push({
    label: "JS inicial",
    file: initialFiles.map((f) => f.file).join(" + "),
    size: initialTotal,
    limit: BUDGETS.entryJsGzip,
  });

const fmt = (b) => `${(b / KB).toFixed(1)} KB`;
for (const { label, file, size, limit } of report) {
  const status = size > limit ? "ESTOUROU" : "ok";
  console.log(
    `${label}  ${fmt(size).padStart(9)} / ${fmt(limit).padEnd(9)} ${status}  ${file}`
  );
}

if (failures.length > 0) {
  console.error(
    `\nOrçamento de performance ultrapassado (${failures.length} item(ns)).` +
      "\nRegra do doc 06 §7: a feature emagrece ou não entra — o orçamento não se ajusta."
  );
  process.exit(1);
}

console.log("\nOrçamentos do doc 06 §7: todos dentro do limite.");
