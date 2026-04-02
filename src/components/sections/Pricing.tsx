// ─── Pricing ──────────────────────────────────────────────────────────────────
// Seção de preços — lista os sites com seus preços e o que está incluso.
// TODO: adicionar botão de WhatsApp/checkout real.

import Link from "next/link";
import { sites, formatPrice } from "@/lib/sites";

// O que está incluso em TODOS os planos
const includedItems = [
  "Código-fonte completo",
  "Design personalizado com seus dados",
  "Responsivo (mobile, tablet, desktop)",
  "Otimizado para SEO",
  "1 mês de suporte",
  "Entrega em até 48h",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
            Preços
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Investimento único
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Sem mensalidade, sem surpresas. Você paga uma vez e o site é seu
            para sempre.
          </p>
        </div>

        {/* Cards de preço */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sites.map((site, i) => {
            const isHighlighted = i === 2; // Urban Store (e-commerce) em destaque
            return (
              <div
                key={site.id}
                className={`relative rounded-2xl p-6 flex flex-col gap-4 ${
                  isHighlighted
                    ? "border-2 border-violet-500 bg-violet-950/30"
                    : "border border-white/10 bg-white/5"
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-bold text-white">
                    Mais completo
                  </div>
                )}

                {/* Nome e categoria */}
                <div>
                  <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-1">
                    {site.category}
                  </p>
                  <h3 className="text-xl font-bold text-white">{site.name}</h3>
                </div>

                {/* Preço */}
                <div>
                  <p className="text-xs text-white/40 mb-1">pagamento único</p>
                  <p className="text-4xl font-black text-white">
                    {formatPrice(site.price)}
                  </p>
                </div>

                {/* Inclusos */}
                <ul className="space-y-2 flex-1">
                  {includedItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <span className="text-violet-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href={`/demo/${site.slug}`}
                    className="rounded-full border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-white/70 hover:text-white hover:border-white/40 transition-all"
                  >
                    Ver demo primeiro
                  </Link>
                  {/* TODO: substituir href pelo link de compra/WhatsApp real */}
                  <a
                    href={`https://wa.me/5500000000000?text=Quero%20comprar%20o%20site%20${encodeURIComponent(site.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-all ${
                      isHighlighted
                        ? "bg-violet-600 hover:bg-violet-500 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Comprar agora →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota de rodapé */}
        <p className="text-center text-sm text-white/30">
          Precisa de algo personalizado?{" "}
          <a
            href="https://wa.me/5500000000000"
            className="text-violet-400 hover:text-violet-300 underline underline-offset-4"
          >
            Fale comigo no WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
