/**
 * Gera src/content/generated/git-log.ts a partir do histórico real do repo
 * (doc 04 §6.20). Sem inventar commits: se o git estiver indisponível
 * (ambiente sem .git), mantém um snapshot vazio e o painel degrada honesto.
 * Rodado por `npm run gen:gitlog` e no início do `build`.
 */
import { execSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = "src/content/generated";
const OUT_FILE = path.join(OUT_DIR, "git-log.ts");
const SEP = String.fromCharCode(31); // git emite %x1f (0x1F) entre os campos
const COUNT = 20;

const run = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

let branch = "main";
let commits = [];
try {
  branch = run("git rev-parse --abbrev-ref HEAD") || "main";
  const raw = run(
    `git log -n ${COUNT} --pretty=format:%h%x1f%s%x1f%an%x1f%ad --date=format:%Y-%m-%d`
  );
  commits = raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [hash, subject, author, date] = line.split(SEP);
      return { hash, subject, author, date };
    });
} catch (error) {
  console.warn("gen-git-log: git indisponível — snapshot vazio.", error.message);
}

const file =
  "// GERADO por scripts/gen-git-log.mjs — não editar à mão.\n" +
  "// Commits reais do repositório (doc 04 §6.20). Atualize com `npm run gen:gitlog`.\n\n" +
  "export interface Commit {\n" +
  "  hash: string;\n  subject: string;\n  author: string;\n  date: string;\n}\n\n" +
  `export const branch = ${JSON.stringify(branch)};\n\n` +
  `export const commits: Commit[] = ${JSON.stringify(commits, null, 2)};\n`;

await mkdir(OUT_DIR, { recursive: true });
await writeFile(OUT_FILE, file);
console.log(`gen-git-log: ${commits.length} commits (${branch}) → ${OUT_FILE}`);
