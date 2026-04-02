// ─── Demo: Pizzaria Gustoso ────────────────────────────────────────────────────
// Rota: /demo/pizzaria
//
// TODO: Migrar o conteúdo completo de pizzaria/index.html para cá.
//       Manter 100% do design original:
//         - Tema dark premium
//         - Hero com vídeo ou parallax
//         - Cardápio interativo com categorias (pizza, bebidas, sobremesas)
//         - Sistema de reservas com modal animado
//         - Galeria de fotos com lightbox
//         - Seção de depoimentos
//         - Footer com mapa / localização
//         - Cursor customizado
//         - Animações de entrada (intersection observer)
//         - Glassmorphism nos cards
//
// Este placeholder será substituído pela migração completa do HTML.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizzaria Gustoso — Demo | DuduStudio",
  description:
    "Demonstração do template Pizzaria Gustoso. Site dark premium com reservas, cardápio interativo e galeria.",
};

export default function PizzariaPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "#0d0d0d", color: "#f5f5f5" }}
    >
      {/* ─── PLACEHOLDER — será substituído pelo HTML migrado ─── */}
      <div className="max-w-lg space-y-6">
        <span className="text-7xl">🍕</span>

        <h1
          className="text-5xl font-black"
          style={{
            background: "linear-gradient(135deg, #ff6b35, #f7931e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Pizzaria Gustoso
        </h1>

        <p className="text-white/50 text-lg leading-relaxed">
          O site completo da Pizzaria Gustoso está sendo migrado para Next.js.
          <br />
          Em breve você verá o demo completo com cardápio, reservas e galeria.
        </p>

        {/* Tags do que virá */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Dark Premium",
            "Reservas",
            "Cardápio",
            "Galeria",
            "Glassmorphism",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preço */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/40 text-sm mb-1">Template disponível por</p>
          <p className="text-4xl font-black text-white">R$ 1.200</p>
          <p className="text-white/30 text-xs mt-1">pagamento único • entrega em 48h</p>
        </div>
      </div>
    </main>
  );
}
