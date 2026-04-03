// ─── Hub Vitrine — Página Home ────────────────────────────────────────────────
// Página principal do DuduStudio.
// Monta todas as seções do hub em ordem.
// TODO: Migrar o visual completo do index.html original (partículas, glassmorphism,
//       cursor customizado, animações de entrada) depois da estrutura estar rodando.

import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import SitesGrid from "@/components/sections/SitesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      {/* Navegação fixa */}
      <NavBar />

      {/* Espaço do nav fixo */}
      <div className="h-16" />

      {/* Seções do hub */}
      <main>
        <Hero />
        <SitesGrid />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  );
}
