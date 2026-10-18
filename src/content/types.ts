/**
 * Modelo de conteúdo do site (ADR-0003): todo texto editorial vive em
 * `src/content/` como dados tipados. Componentes nunca contêm texto.
 * Estruturas definidas em docs/06-technical-architecture.md §3.
 */

export interface NavItem {
  label: string;
  /** Âncora da home ("/#projetos") ou rota ("/resume"). */
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  external: boolean;
}

export interface SiteConfig {
  name: string;
  role: string;
  /** E-mail público. `null` enquanto [PENDENTE] (doc 05 §7). */
  email: string | null;
  repositoryUrl: string;
  /** O acesso ao currículo só aparece quando o conteúdo existir (doc 03 §2). */
  resumeReady: boolean;
  nav: NavItem[];
  social: SocialLink[];
  seo: SeoMeta;
  photo: Photo;
}

/**
 * Foto pessoal quadrada (doc 12): `base` + `-{largura}.{avif|webp}` em
 * `public/`, gerada por `npm run assets:images`.
 */
export interface Photo {
  base: string;
  widths: number[];
  alt: string;
}

export interface SeoMeta {
  title: string;
  description: string;
}

export interface MediaItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/** Seções canônicas de um estudo de caso, na ordem do doc 03 §6. */
export const CASE_SECTION_KINDS = [
  "problema",
  "objetivo",
  "pesquisa",
  "arquitetura",
  "tecnologias",
  "decisoes",
  "desafios",
  "resultados",
  "aprendizados",
] as const;

export type CaseSectionKind = (typeof CASE_SECTION_KINDS)[number];

/** Item nomeado de uma seção (decisão técnica, par desafio→solução). */
export interface CaseSectionItem {
  title: string;
  body: string;
}

/**
 * Referência a um diagrama (doc 11): o conteúdo aponta um id; o template
 * resolve o SVG correspondente. O diagrama nunca é a única fonte — a prosa
 * da seção descreve o mesmo fluxo (doc 04 §6.10).
 */
export interface DiagramRef {
  id: string;
  ariaLabel: string;
  caption?: string;
}

export interface CaseSection {
  kind: CaseSectionKind;
  title: string;
  /** Prosa da seção; vazio quando a seção é só uma lista de itens. */
  paragraphs: string[];
  /** Decisões numeradas ou pares desafio→solução (doc 03 §6, itens 8–9). */
  items?: CaseSectionItem[];
  diagram?: DiagramRef;
}

export interface RepoLink {
  label: string;
  url: string;
}

/**
 * Participação de uma linguagem no código dos repositórios do projeto
 * (Release 0.10): bytes de código por linguagem, medidos nos repositórios
 * públicos e arredondados — aproximação declarada na interface.
 */
export interface LanguageShare {
  name: string;
  percent: number;
}

/**
 * Trecho real de um repositório do projeto (Release 0.10, ADR-0018): copiado
 * do arquivo, com a linha inicial e o link para o trecho no GitHub. Nunca
 * código escrito para o site.
 */
export interface CodeSample {
  repo: string;
  path: string;
  url: string;
  startLine: number;
  lang: "py" | "php" | "java" | "js" | "yml";
  code: string;
  /** O que o trecho mostra, em uma frase. */
  note: string;
}

/** Fato numérico verificável do projeto ("Commits", "127"). */
export interface ProjectFact {
  label: string;
  value: string;
}

/** Marco de um projeto em andamento (incrementos do roadmap). */
export interface Milestone {
  id: string;
  title: string;
  status: "done" | "next" | "planned";
}

export interface Project {
  slug: string;
  name: string;
  summary: string;
  badge: string;
  tags: string[];
  links: { github: RepoLink[]; demo?: string };
  seo: SeoMeta;
  media: MediaItem[];
  sections: CaseSection[];
  /** Linguagens dos repositórios, da maior para a menor participação. */
  languages: LanguageShare[];
  /** Trecho real do código — capa no índice e aba "Código" do case. */
  code: CodeSample;
  /** Números do projeto; sem eles o case deriva repositórios e tecnologias. */
  facts?: ProjectFact[];
  /** Passo a passo de uso, quando o produto se explica melhor assim. */
  steps?: string[];
  /** Roadmap por incrementos, para projetos em andamento. */
  milestones?: Milestone[];
  /** Projeto recém-adicionado ao portfólio (selo "Novo"). */
  isNew?: boolean;
  /** Posição no índice e na navegação anterior/próximo. */
  order: number;
  /** Case principal — exatamente 1 (FastPass). */
  featured?: boolean;
  /** Aparece fixado na home — exatamente 3 (doc 05 §2.3). */
  highlight?: boolean;
}

export interface TimelineEntry {
  /** Data em mono, ex.: "DEZ 2024". */
  date: string;
  title: string;
  description: string;
  current?: boolean;
}

export interface Skill {
  name: string;
  description: string;
}

export type ResumeLocale = "pt" | "en";

export interface Resume {
  locale: ResumeLocale;
  pdfPath: string;
  // Estrutura completa definida na implementação da rota /resume (ADR-0006).
}

/**
 * Reservado para a seção Writing da v2 (ADR-0007). Nenhum componente da v1
 * consome este tipo; ele fixa a fronteira do modelo de conteúdo.
 */
export interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  /** Caminho do corpo em MDX — prosa longa não é dado estruturado. */
  body: string;
}
