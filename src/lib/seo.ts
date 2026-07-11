import { useEffect } from "react";

/**
 * Título por rota enquanto o pre-render não existe (entra no S3/MVP — doc 06
 * §6); depois, o mesmo dado alimenta o HTML estático.
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
