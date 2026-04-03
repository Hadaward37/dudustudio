"use client";

// ─── SitesGrid ────────────────────────────────────────────────────────────────
// Grid de cards com visual premium: fake website preview no thumbnail,
// shine effect no hover, border glow e badges de categoria.

import Link from "next/link";
import { sites, formatPrice } from "@/lib/sites";

const SITE_ACCENTS = ["#f97316", "#06b6d4", "#8b5cf6", "#ec4899"];

export default function SitesGrid() {
  return (
    <section id="sites" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            Portfólio
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">
            Escolha seu site
          </h2>
          <p className="max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.38)" }}>
            Todos os sites incluem design exclusivo, código limpo e entrega
            personalizada com os seus dados.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site, i) => {
            const accent = SITE_ACCENTS[i];
            return (
              <article
                key={site.id}
                className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "#0d0d1a",
                  boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}45`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 60px ${accent}18, 0 4px 30px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(0,0,0,0.3)";
                }}
              >
                {/* Shine effect */}
                <div className="card-shine" />

                {/* Thumbnail — fake website preview */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "220px",
                    background: `linear-gradient(145deg, ${accent}14, ${accent}05)`,
                  }}
                >
                  {/* Grid fundo */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(${accent}10 1px, transparent 1px), linear-gradient(90deg, ${accent}10 1px, transparent 1px)`,
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* Browser chrome mini */}
                  <div
                    className="absolute inset-3 rounded-xl overflow-hidden flex flex-col"
                    style={{ border: `1px solid ${accent}20`, background: "#0a0a16" }}
                  >
                    {/* Barra */}
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-2 shrink-0"
                      style={{ background: "#0e0e1c", borderBottom: `1px solid ${accent}15` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                      <div
                        className="ml-1.5 flex-1 rounded py-0.5 px-2 text-center"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          fontSize: "8px",
                          color: "rgba(255,255,255,0.12)",
                          fontFamily: "monospace",
                        }}
                      >
                        /{site.slug}
                      </div>
                    </div>

                    {/* Conteúdo fake */}
                    <div className="flex-1 p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-2 rounded-full" style={{ background: `${accent}65` }} />
                        <div className="flex gap-1">
                          {[1, 2].map(k => (
                            <div key={k} className="w-5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
                          ))}
                          <div className="w-10 h-4 rounded-full" style={{ background: `${accent}30` }} />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center gap-2 py-2">
                        <div className="w-2/3 h-2.5 rounded-full" style={{ background: `${accent}50` }} />
                        <div className="w-1/2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                        <div className="w-3/5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                        <div className="flex gap-2 mt-1">
                          <div className="w-14 h-5 rounded-full" style={{ background: `${accent}35`, border: `1px solid ${accent}50` }} />
                          <div className="w-12 h-5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badge de categoria */}
                  <div
                    className="absolute top-4 left-4 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: "rgba(7,7,14,0.7)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {site.category}
                  </div>

                  {/* CTA overlay no hover */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${accent}22`, backdropFilter: "blur(2px)" }}
                  >
                    <Link
                      href={`/demo/${site.slug}`}
                      className="rounded-full bg-white px-6 py-2.5 text-sm font-bold transition-transform duration-200 hover:scale-105"
                      style={{ color: accent }}
                    >
                      Ver demo ao vivo →
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-white leading-snug">{site.name}</h3>
                    <span
                      className="w-2 h-2 rounded-full mt-1 shrink-0"
                      style={{ background: accent, boxShadow: `0 0 6px ${accent}`, animation: "dot-ping 2.5s ease-in-out infinite" }}
                    />
                  </div>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.38)" }}>
                    {site.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {site.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full"
                        style={{
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Preço + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>pagamento único</p>
                      <p className="text-xl font-black text-white">{formatPrice(site.price)}</p>
                    </div>
                    <Link
                      href={`/demo/${site.slug}`}
                      className="group/btn relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white overflow-hidden transition-opacity hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
                    >
                      Demo
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA abaixo do grid */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Não encontrou o que procura?
          </p>
          <a
            href="https://wa.me/5500000000000?text=Olá! Gostaria de um site personalizado."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:border-violet-500/30 hover:text-white/70"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}
          >
            Solicitar site personalizado →
          </a>
        </div>

      </div>
    </section>
  );
}
