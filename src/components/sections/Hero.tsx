"use client";

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Seção hero da home. Título impactante + CTA para ver os demos.
// TODO: Migrar o visual completo do index.html (partículas, animações, glassmorphism).
// Por enquanto: hero funcional com gradiente e animação CSS básica.

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Fundo com gradiente radial */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.3) 0%, transparent 70%), #0a0a0f",
        }}
      />

      {/* Orbs decorativos */}
      <div
        className="absolute -z-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent)",
          top: "10%",
          left: "20%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -z-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #4f46e5, transparent)",
          bottom: "20%",
          right: "15%",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Badge */}
      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300"
        style={{ animation: "fadeUp 0.6s ease forwards" }}
      >
        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        Test-drive antes de comprar
      </div>

      {/* Título principal */}
      {/* TODO: copiar tipografia exata do index.html */}
      <h1
        className="mb-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
        style={{
          animation: "fadeUp 0.6s 0.1s ease both",
          background: "linear-gradient(135deg, #ffffff 40%, #a78bfa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Sites prontos.
        <br />
        Negócio no ar{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          hoje.
        </span>
      </h1>

      {/* Subtítulo */}
      <p
        className="mb-10 max-w-2xl text-lg sm:text-xl text-white/60 leading-relaxed"
        style={{ animation: "fadeUp 0.6s 0.2s ease both" }}
      >
        Escolha um template profissional, experimente o demo ao vivo e compre
        com confiança. Entrega em 48h, sem mensalidade.
      </p>

      {/* CTAs */}
      <div
        className="flex flex-col sm:flex-row items-center gap-4"
        style={{ animation: "fadeUp 0.6s 0.3s ease both" }}
      >
        <Link
          href="/#sites"
          className="group rounded-full px-8 py-3.5 font-semibold text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 0 30px rgba(124,58,237,0.4)",
          }}
        >
          Ver todos os demos{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/#how-it-works"
          className="rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white/70 hover:text-white hover:border-white/40 transition-all"
        >
          Como funciona
        </Link>
      </div>

      {/* Stats */}
      <div
        className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 text-center"
        style={{ animation: "fadeUp 0.6s 0.4s ease both" }}
      >
        {[
          { value: "3+", label: "templates prontos" },
          { value: "48h", label: "entrega garantida" },
          { value: "R$0", label: "mensalidade" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="text-3xl font-black text-white">{value}</p>
            <p className="text-sm text-white/40 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
