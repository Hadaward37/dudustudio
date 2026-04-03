"use client";

// ─── DemoBanner ───────────────────────────────────────────────────────────────
// Banner fixo no topo de TODAS as páginas /demo/*.
// Informa ao visitante que está num demo e direciona para compra.

import Link from "next/link";

export default function DemoBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium"
      style={{
        background: "linear-gradient(90deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 3s linear infinite",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position:  200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <span className="text-base" aria-hidden>🚀</span>

      <span className="text-white/90 text-xs sm:text-sm text-center">
        <strong className="text-white">Você está testando um demo</strong>
        {" — "}
        <span className="hidden sm:inline">
          na versão final todos os botões e formulários funcionam direto no seu WhatsApp
        </span>
        <span className="sm:hidden">na versão final tudo funciona no seu WhatsApp</span>
      </span>

      <span className="text-white/40 hidden sm:inline">·</span>

      <Link
        href="/#pricing"
        className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 text-white text-xs font-semibold whitespace-nowrap"
      >
        Ver preços →
      </Link>
    </div>
  );
}
