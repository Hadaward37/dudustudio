"use client";

// ─── SitesGrid ────────────────────────────────────────────────────────────────
// Grid de cards dos sites disponíveis para compra.
// Cada card tem: thumbnail, nome, categoria, tags, preço e botão "Ver demo".
// TODO: adicionar efeito de hover com preview animado (screenshot scroll).
// TODO: adicionar filtro por categoria.

import Link from "next/link";
import { sites, formatPrice } from "@/lib/sites";

export default function SitesGrid() {
  return (
    <section id="sites" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header da seção */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
            Portfólio
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Escolha seu site
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Todos os sites incluem design exclusivo, código limpo e entrega
            personalizada com seus dados.
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <article
              key={site.id}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              {/* Thumbnail placeholder */}
              {/* TODO: substituir pelo screenshot real do site demo */}
              <div
                className="relative h-52 overflow-hidden bg-gradient-to-br from-violet-900/50 to-indigo-900/50 flex items-center justify-center"
              >
                <span className="text-6xl opacity-30 select-none">
                  {site.category === "Restaurante"
                    ? "🍕"
                    : site.category === "Saúde"
                    ? "🏥"
                    : "🛍️"}
                </span>

                {/* Badge de categoria */}
                <div className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-medium text-white/70">
                  {site.category}
                </div>

                {/* Overlay no hover com CTA */}
                <div className="absolute inset-0 bg-violet-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link
                    href={`/demo/${site.slug}`}
                    className="rounded-full bg-white px-6 py-2.5 font-semibold text-violet-700 text-sm hover:bg-white/90 transition-colors"
                  >
                    Ver demo ao vivo →
                  </Link>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">
                  {site.name}
                </h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed">
                  {site.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {site.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Preço + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">a partir de</p>
                    <p className="text-xl font-black text-white">
                      {formatPrice(site.price)}
                    </p>
                  </div>
                  <Link
                    href={`/demo/${site.slug}`}
                    className="rounded-full bg-violet-600/20 hover:bg-violet-600 border border-violet-500/50 hover:border-violet-500 transition-all px-4 py-2 text-sm font-semibold text-violet-300 hover:text-white"
                  >
                    Demo →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
