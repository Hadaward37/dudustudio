// ─── Demo: Urban Store ────────────────────────────────────────────────────────
// Rota: /demo/ecommerce
//
// TODO: Migrar o conteúdo completo de ecommerce/index.html para cá.
//       Manter 100% do design original:
//         - Tema dark editorial (preto + tons neutros)
//         - Hero editorial com produto em destaque
//         - Grid de produtos com hover animado
//         - Filtros por categoria (feminino, masculino, acessórios)
//         - Página de produto com galeria de imagens
//         - Carrinho lateral (drawer) funcional com localStorage
//         - Checkout visual (tela final)
//         - Cursor customizado
//         - Animações de entrada e transições de página
//         - Micro-interações nos botões

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban Store — Demo | DuduStudio",
  description:
    "Demonstração do template Urban Store. E-commerce dark editorial com carrinho funcional, filtros e checkout.",
};

export default function EcommercePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "#0a0a0a", color: "#fafafa" }}
    >
      {/* ─── PLACEHOLDER — será substituído pelo HTML migrado ─── */}
      <div className="max-w-lg space-y-6">
        <span className="text-7xl">🛍️</span>

        <h1
          className="text-5xl font-black tracking-tighter"
          style={{
            background: "linear-gradient(135deg, #ffffff, #a3a3a3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Urban Store
        </h1>

        <p className="text-white/40 text-lg leading-relaxed">
          O e-commerce completo da Urban Store está sendo migrado para Next.js.
          <br />
          Em breve você verá o demo com carrinho funcional, filtros e checkout.
        </p>

        {/* Tags do que virá */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "Dark Editorial",
            "Carrinho",
            "Filtros",
            "Checkout",
            "Cursor Custom",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preço */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/30 text-sm mb-1">Template disponível por</p>
          <p className="text-4xl font-black text-white">R$ 3.500</p>
          <p className="text-white/20 text-xs mt-1">
            pagamento único • entrega em 48h
          </p>
        </div>
      </div>
    </main>
  );
}
