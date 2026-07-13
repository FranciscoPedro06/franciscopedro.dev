import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ActivityBar } from "@/components/ide/ActivityBar";
import { Explorer } from "@/components/ide/Explorer";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { SkipLink } from "@/components/layout/SkipLink";
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

export function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <ScrollManager />
      <NavBar />
      {/* Moldura de IDE (Release 0.6): rail + explorer só em desktop */}
      <ActivityBar />
      <Explorer />
      <main id="conteudo" className="flex-1 lg:pl-14 xl:pl-[18.5rem]">
        {/* Fallback é o fundo puro — sem spinner (doc 08 §5) */}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/projetos/:slug" element={<CasePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
