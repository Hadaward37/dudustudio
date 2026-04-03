"use client";

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Hero redesenhado: layout assimétrico, spotlight no cursor, floating browser
// mockups dos demos, grid técnico de fundo, marquee de features.

import Link from "next/link";
import { useEffect, useRef } from "react";
import { sites } from "@/lib/sites";

// Spotlight segue o cursor sem re-render (ref direto no DOM)
function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(550px circle at ${e.clientX}px ${e.clientY}px, rgba(124,58,237,0.11), transparent 42%)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return ref;
}

// Metadados visuais de cada site
const SITE_META = [
  { accent: "#f97316", label: "Restaurante" },
  { accent: "#06b6d4", label: "Saúde"       },
  { accent: "#8b5cf6", label: "E-commerce"  },
];

const MARQUEE_ITEMS = [
  "Design personalizado",
  "Entrega em 48h",
  "Zero mensalidade",
  "Código-fonte incluso",
  "Mobile-first",
  "SEO otimizado",
  "1 mês de suporte",
  "Test-drive gratuito",
  "Múltiplos segmentos",
  "Responsivo & rápido",
];

export default function Hero() {
  const spotlightRef = useSpotlight();

  return (
    <>
      {/* ─── Hero section ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: "#07070e" }}>

        {/* Grid técnico */}
        <div className="absolute inset-0 tech-grid pointer-events-none" />

        {/* Spotlight cursor (fixed para seguir pelo scroll) */}
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed inset-0 z-20"
          style={{ background: "radial-gradient(550px circle at -9999px -9999px, transparent, transparent)" }}
        />

        {/* Glow superior */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background: "radial-gradient(ellipse at top, rgba(124,58,237,0.18) 0%, transparent 65%)",
            filter: "blur(30px)",
            animation: "glow-pulse 7s ease-in-out infinite",
          }}
        />

        {/* ─── Layout principal ─────────────────────────────────────────── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-10 xl:gap-16 items-center min-h-screen py-28">

            {/* ── Texto ──────────────────────────────────────────────── */}
            <div className="flex flex-col">

              {/* Badge */}
              <div style={{ animation: "fadeUp 0.5s ease both" }} className="mb-8 self-start">
                <span
                  className="inline-flex items-center gap-2.5 text-sm font-medium px-4 py-1.5 rounded-full"
                  style={{
                    border: "1px solid rgba(124,58,237,0.35)",
                    background: "rgba(124,58,237,0.07)",
                    color: "#c4b5fd",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "#a78bfa",
                      boxShadow: "0 0 8px #a78bfa",
                      animation: "dot-ping 2s ease-in-out infinite",
                    }}
                  />
                  Test-drive antes de comprar
                  <span style={{ color: "rgba(167,139,250,0.35)" }}>·</span>
                  <span style={{ color: "rgba(167,139,250,0.55)", fontSize: "11px" }}>3 demos ao vivo</span>
                </span>
              </div>

              {/* H1 */}
              <h1
                className="font-black tracking-tight leading-none mb-5"
                style={{
                  fontSize: "clamp(3rem, 7.5vw, 5.8rem)",
                  animation: "fadeUp 0.5s 0.1s ease both",
                }}
              >
                <span className="block text-white">Sites que</span>
                <span className="shimmer-text block">vendem.</span>
              </h1>

              {/* Sub-headline */}
              <p
                className="font-bold mb-7"
                style={{
                  fontSize: "clamp(1.1rem, 2.8vw, 1.65rem)",
                  color: "rgba(255,255,255,0.22)",
                  animation: "fadeUp 0.5s 0.15s ease both",
                  lineHeight: 1.3,
                }}
              >
                Entregues em 48h.&nbsp; Sem mensalidade.
              </p>

              {/* Corpo */}
              <p
                className="text-base leading-relaxed mb-10 max-w-[440px]"
                style={{ color: "rgba(255,255,255,0.45)", animation: "fadeUp 0.5s 0.2s ease both" }}
              >
                Escolha o template, navegue no{" "}
                <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>demo completo ao vivo</span>
                {" "}e só compre quando tiver certeza.
                Código-fonte 100% seu. Hospede onde quiser.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-3 mb-12"
                style={{ animation: "fadeUp 0.5s 0.25s ease both" }}
              >
                <Link
                  href="/#sites"
                  className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    boxShadow: "0 0 35px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  <span className="relative z-10">Ver demos ao vivo</span>
                  <svg className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="card-shine" />
                </Link>

                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  Como funciona
                </Link>
              </div>

              {/* Stats */}
              <div
                className="flex items-center gap-8"
                style={{ animation: "fadeUp 0.5s 0.3s ease both" }}
              >
                {[
                  { value: "3+",  label: "templates prontos"  },
                  { value: "48h", label: "entrega garantida"  },
                  { value: "R$0", label: "mensalidade"        },
                ].map(({ value, label }, i) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-black text-white">{value}</span>
                    <span className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.28)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mockups flutuantes ─────────────────────────────────── */}
            <div
              className="relative hidden lg:block"
              style={{
                height: "580px",
                animation: "scaleIn 0.7s 0.35s ease both",
              }}
            >
              {/* Glow atrás dos cards */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(65% 65% at 50% 50%, rgba(124,58,237,0.13), transparent)",
                  filter: "blur(20px)",
                }}
              />

              {/* Card esquerda-fundo: Pizzaria */}
              <div
                className="absolute"
                style={{ width: "240px", left: "0px", top: "70px", zIndex: 1, opacity: 0.7, transform: "rotate(-4deg)" }}
              >
                <div style={{ animation: "float-b 10s ease-in-out infinite" }}>
                  <BrowserCard site={sites[0]} meta={SITE_META[0]} />
                </div>
              </div>

              {/* Card direita-fundo: E-commerce */}
              <div
                className="absolute"
                style={{ width: "240px", right: "0px", bottom: "50px", zIndex: 1, opacity: 0.7, transform: "rotate(4deg)" }}
              >
                <div style={{ animation: "float-c 12s ease-in-out infinite" }}>
                  <BrowserCard site={sites[2]} meta={SITE_META[2]} />
                </div>
              </div>

              {/* Card centro-frente: Clínica (destaque) */}
              <div
                className="absolute"
                style={{
                  width: "290px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                }}
              >
                <div style={{ animation: "float-a 8s ease-in-out infinite" }}>
                  <BrowserCard site={sites[1]} meta={SITE_META[1]} featured />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ animation: "fadeUp 0.5s 0.9s ease both" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-violet-500/50 to-transparent" />
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>scroll</span>
        </div>

      </section>

      {/* ─── Marquee band ─────────────────────────────────────────────── */}
      <div
        className="overflow-hidden py-3.5"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <div className="marquee-track flex items-center">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-8 text-sm whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              <span style={{ color: "rgba(124,58,237,0.55)", fontSize: "8px" }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Browser Mockup Card ───────────────────────────────────────────────────────
function BrowserCard({
  site,
  meta,
  featured = false,
}: {
  site: (typeof sites)[0];
  meta: { accent: string; label: string };
  featured?: boolean;
}) {
  const { accent } = meta;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: featured ? `1px solid ${accent}55` : "1px solid rgba(255,255,255,0.07)",
        background: "#0c0c18",
        boxShadow: featured
          ? `0 28px 80px ${accent}30, 0 0 0 1px ${accent}18`
          : "0 14px 50px rgba(0,0,0,0.55)",
      }}
    >
      {/* Barra do browser */}
      <div
        className="flex items-center gap-1.5 px-3 py-2.5"
        style={{ background: "#10101c", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        <div
          className="ml-2 flex-1 rounded py-0.5 px-2 text-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            fontSize: "9px",
            color: "rgba(255,255,255,0.15)",
            fontFamily: "monospace",
          }}
        >
          dudustudio.io/demo/{site.slug}
        </div>
      </div>

      {/* Simulação de layout de site */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "164px",
          background: `linear-gradient(145deg, ${accent}14, ${accent}05)`,
        }}
      >
        {/* Grid no fundo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }}
        />

        {/* Navbar fake */}
        <div
          className="relative flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: `1px solid ${accent}18` }}
        >
          <div className="w-14 h-2 rounded-full" style={{ background: `${accent}70` }} />
          <div className="flex gap-2">
            {[1, 2, 3].map((k) => (
              <div key={k} className="w-6 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            ))}
            <div className="w-12 h-5 rounded-full" style={{ background: `${accent}35`, border: `1px solid ${accent}50` }} />
          </div>
        </div>

        {/* Hero fake */}
        <div className="relative flex flex-col items-center justify-center gap-2 pt-5 pb-3 px-4">
          <div className="w-3/4 h-3 rounded-full" style={{ background: `${accent}55` }} />
          <div className="w-1/2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
          <div className="w-2/3 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="flex gap-2 mt-2">
            <div className="h-6 w-20 rounded-full" style={{ background: `${accent}45`, border: `1px solid ${accent}60` }} />
            <div className="h-6 w-16 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.10)" }} />
          </div>
        </div>

        {/* Overlay gradiente */}
        <div
          className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0c0c18, transparent)" }}
        />

        {/* Selo "LIVE" */}
        {featured && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}40`,
              color: accent + "dd",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent, animation: "dot-ping 2s infinite" }} />
            LIVE
          </div>
        )}
      </div>

      {/* Footer do card */}
      <div
        className="flex items-center justify-between px-3 py-2.5 gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-wrap gap-1.5 min-w-0">
          {site.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{
                background: `${accent}12`,
                border: `1px solid ${accent}25`,
                color: accent + "99",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/demo/${site.slug}`}
          className="text-xs font-semibold px-3 py-1.5 rounded-full text-white whitespace-nowrap transition-opacity hover:opacity-80 shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
        >
          Demo →
        </Link>
      </div>
    </div>
  );
}
