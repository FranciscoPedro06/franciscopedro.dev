import type { ComponentType } from "react";
import {
  GithubIcon,
  type IconProps,
  LinkedinIcon,
} from "@/components/ui/BrandIcon";

/**
 * Resolvedor de ícone de marca pelo label do `SocialLink` (doc 05). Separado do
 * arquivo de componentes para manter o fast-refresh limpo
 * (`react-refresh/only-export-components`). Sem entrada → `undefined`, e o
 * consumidor cai no ícone genérico ou só no texto.
 */
const REGISTRY: Record<string, ComponentType<IconProps>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
};

export function brandIcon(label: string): ComponentType<IconProps> | undefined {
  return REGISTRY[label];
}
