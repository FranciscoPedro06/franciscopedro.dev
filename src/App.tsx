import { Route, Routes } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { SkipLink } from "@/components/layout/SkipLink";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

// Tabela de rotas completa no S2 (doc 06 §4): /projetos/:slug, /resume e
// lazy loading entram com as páginas que carregam.
export function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <NavBar />
      <main id="conteudo" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
