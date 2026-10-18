/**
 * Realce de sintaxe mínimo (Release 0.10) para os trechos reais exibidos no
 * site: comentários, strings, números, palavras-chave, chamadas, propriedades
 * e tipos, nas cores Dark+/Light+ do tema (tokens `sx-*`). Não é um parser —
 * cobre bem trechos curtos de Python, PHP, Java, JS e YAML, que é o que o
 * conteúdo usa. Sem dependência: cabe no orçamento de JS.
 */
import type { CodeSample } from "@/content/types";

export type Lang = CodeSample["lang"] | "ts";

export interface Token {
  text: string;
  className?: string;
}

const DECLARATIONS: Record<Lang, string> = {
  js: "const|let|var|function|async|new|true|false|null|this|export",
  ts: "const|let|var|function|async|new|true|false|null|this|export|interface|type",
  py: "def|class|None|True|False|async|lambda|in|not|and|or|is",
  php: "function|public|private|protected|string|new|true|false|null|static|self",
  java: "public|private|protected|class|new|void|int|long|boolean|final|true|false|null|static|this",
  yml: "true|false|null",
};

const CONTROL: Record<Lang, string> = {
  js: "return|if|else|await|try|catch|import|from|for",
  ts: "return|if|else|await|try|catch|import|from|for",
  py: "return|if|elif|else|for|import|from|try|except|with|await|raise",
  php: "return|if|else|foreach|try|catch|use",
  java: "return|if|else|try|catch|for|import|package",
  yml: "",
};

const NEVER = "((?!x)x)";

function pattern(lang: Lang): RegExp {
  const slashComments =
    lang === "js" || lang === "ts" || lang === "java" || lang === "php";
  return new RegExp(
    [
      slashComments ? "(\\/\\/[^\\n]*)" : "(#[^\\n]*)",
      "(\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)",
      "\\b(\\d+(?:\\.\\d+)?)\\b",
      DECLARATIONS[lang] ? `\\b(${DECLARATIONS[lang]})\\b` : NEVER,
      CONTROL[lang] ? `\\b(${CONTROL[lang]})\\b` : NEVER,
      "(@[A-Za-z]\\w*)",
      "(\\$[A-Za-z_]\\w*)",
      "\\b([A-Za-z_]\\w*)(?=\\()",
      lang === "yml"
        ? "(^\\s*-?\\s*[A-Za-z_][\\w-]*)(?=:)"
        : "\\b([A-Za-z_]\\w*)(?=\\s*:\\s)",
      "\\b([A-Z][A-Za-z0-9_]*)\\b",
    ].join("|"),
    "gm"
  );
}

const CLASSES = [
  "text-sx-comment",
  "text-sx-string",
  "text-sx-number",
  "text-sx-keyword",
  "text-sx-control",
  "text-sx-type",
  "text-sx-property",
  "text-sx-function",
  "text-sx-property",
  "text-sx-type",
];

/** Divide o código em linhas de tokens. */
export function highlight(code: string, lang: Lang): Token[][] {
  const tokens: Token[] = [];
  const re = pattern(lang);
  let last = 0;
  for (const match of code.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ text: code.slice(last, index) });
    const group = match.slice(1).findIndex((g) => g !== undefined);
    tokens.push({ text: match[0], className: CLASSES[group] });
    last = index + match[0].length;
  }
  if (last < code.length) tokens.push({ text: code.slice(last) });

  // Quebra em linhas preservando a classe de cada pedaço.
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    const parts = token.text.split("\n");
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ text: part, className: token.className });
    });
  }
  return lines;
}
