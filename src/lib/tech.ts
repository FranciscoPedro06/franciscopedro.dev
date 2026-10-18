/**
 * Identidade visual das tecnologias (Release 0.10, ADR-0018): os logos
 * oficiais (devicon, em `public/icons/tech/`) e as cores de linguagem do
 * GitHub (linguist). Cor aqui é identificação — a mesma que o GitHub e o
 * VS Code mostram —, nunca decoração.
 */

/** Tecnologia → arquivo do logo em `public/icons/tech/`. */
const ICON_BY_NAME: Record<string, string> = {
  Python: "python",
  TypeScript: "typescript",
  JavaScript: "javascript",
  Java: "java",
  PHP: "php",
  C: "c",
  HTML: "html5",
  CSS: "css3",
  React: "react",
  FastAPI: "fastapi",
  Laravel: "laravel",
  Docker: "docker",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  "Spring Boot": "spring",
  Android: "android",
  Firebase: "firebase",
  Supabase: "supabase",
  Vite: "vitejs",
  "Tailwind CSS": "tailwindcss",
  "GitHub Actions": "githubactions",
  pandas: "pandas",
  SQL: "sqlite",
};

/** Extensão de arquivo → logo (React para .tsx, como no tema de ícones do VS Code). */
const ICON_BY_EXT: Record<string, string> = {
  tsx: "react",
  ts: "typescript",
  js: "javascript",
  py: "python",
  java: "java",
  php: "php",
  html: "html5",
  css: "css3",
  yml: "yaml",
  sh: "bash",
  json: "json",
};

export function techIcon(name: string): string | undefined {
  const file = ICON_BY_NAME[name];
  return file ? `/icons/tech/${file}.svg` : undefined;
}

export function extIcon(file: string): string | undefined {
  const ext = file.split(".").pop() ?? "";
  const icon = ICON_BY_EXT[ext];
  return icon ? `/icons/tech/${icon}.svg` : undefined;
}

/** Cores de linguagem do GitHub (linguist), usadas só na barra de linguagens. */
export const LANGUAGE_COLOR: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Java: "#B07219",
  PHP: "#4F5D95",
  C: "#555555",
  HTML: "#E34C26",
  CSS: "#663399",
};

export const languageColor = (name: string) => LANGUAGE_COLOR[name] ?? "#8b8b8b";
