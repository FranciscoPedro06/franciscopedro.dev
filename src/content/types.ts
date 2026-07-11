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

export interface CaseSection {
  kind: CaseSectionKind;
  title: string;
  /** Parágrafos ou itens; a estrutura exata evolui com o template no S3. */
  paragraphs: string[];
}

export interface RepoLink {
  label: string;
  url: string;
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
  /** Posição no índice e na navegação anterior/próximo. */
  order: number;
  /** Card destaque (largura total) — exatamente 1 (FastPass). */
  featured?: boolean;
  /** Aparece na Featured Work da home — exatamente 3 (doc 05 §2.3). */
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
