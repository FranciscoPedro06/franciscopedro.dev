import type { ReactNode } from "react";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DataSection } from "@/components/sections/DataSection";
import { Engineering } from "@/components/sections/Engineering";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { site } from "@/content/site";
import { usePageTitle } from "@/lib/seo";
import { useHomeView } from "@/lib/views";

/**
 * View do workbench: todas ficam montadas — o pre-render entrega a página
 * completa e os contratos (ordem do doc 03 §4, axe, SSR) seguem valendo —
 * e só a ativa é exibida; as demais somem por CSS (`hidden`).
 */
function View({
  id,
  active,
  labelledBy,
  children,
}: {
  id: string;
  active: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={
        active === id ? "view-enter px-5 py-5 md:px-8 md:py-7" : "hidden"
      }
    >
      {children}
    </section>
  );
}

/**
 * Home = gestor de views (Release 0.6.1): as 7 seções aprovadas (doc 03 §4)
 * viram views comutadas pelo hash — as âncoras existentes são as URLs.
 * Nada de página longa; o scroll é o do painel do editor.
 */
export function Home() {
  usePageTitle(site.seo.title);
  const active = useHomeView();

  return (
    <>
      <View id="overview" active={active} labelledBy="overview-titulo">
        <Hero />
      </View>
      <View id="projetos" active={active} labelledBy="projetos-titulo">
        <FeaturedWork />
      </View>
      <View id="engenharia" active={active} labelledBy="engenharia-titulo">
        <Engineering />
      </View>
      <View id="dados" active={active} labelledBy="dados-titulo">
        <DataSection />
      </View>
      <View id="trajetoria" active={active} labelledBy="trajetoria-titulo">
        <Timeline />
      </View>
      <View id="sobre" active={active} labelledBy="sobre-titulo">
        <About />
      </View>
      <View id="contato" active={active} labelledBy="contato-titulo">
        <Contact />
      </View>
    </>
  );
}
