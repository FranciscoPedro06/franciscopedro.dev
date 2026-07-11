import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DataSection } from "@/components/sections/DataSection";
import { Engineering } from "@/components/sections/Engineering";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { site } from "@/content/site";
import { usePageTitle } from "@/lib/seo";

/** Ordem das seções: doc 03 §4 (revisão aprovada no Sprint 2). */
export function Home() {
  usePageTitle(site.seo.title);

  return (
    <>
      <Hero />
      <FeaturedWork />
      <Engineering />
      <DataSection />
      <Timeline />
      <About />
      <Contact />
    </>
  );
}
