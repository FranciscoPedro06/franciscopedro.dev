import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { SkipLink } from "@/components/layout/SkipLink";
import { ActivityBar } from "@/components/workbench/ActivityBar";
import { EditorTabs } from "@/components/workbench/EditorTabs";
import { SidePanel } from "@/components/workbench/SidePanel";
import { Home } from "@/pages/Home";

// Rotas secundárias em chunks próprios (doc 06 §4); /resume e /escrita
// entram nos marcos correspondentes (ADR-0006, ADR-0007).
const Projects = lazy(() =>
  import("@/pages/Projects").then((m) => ({ default: m.Projects }))
);
const CasePage = lazy(() =>
  import("@/case/CasePage").then((m) => ({ default: m.CasePage }))
);
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound }))
);

/**
 * Workbench (Release 0.6.1): a aplicação ocupa a viewport inteira — title
 * bar, rail de atalhos, explorer, editor e status bar. Não existe scroll
 * global; o único scroll é o do painel do editor (`#editor-scroll`).
 */
export function App() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SkipLink />
      <ScrollManager />
      <NavBar />
      <div className="flex min-h-0 flex-1">
        <ActivityBar />
        <SidePanel />
        <main id="conteudo" className="flex min-w-0 flex-1 flex-col">
          <EditorTabs />
          <div
            id="editor-scroll"
            className="editor-scroll scrollbar-ide min-h-0 flex-1 overflow-y-auto"
          >
            {/* Fallback é o fundo puro — sem spinner (doc 08 §5) */}
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projetos" element={<Projects />} />
                <Route path="/projetos/:slug" element={<CasePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
