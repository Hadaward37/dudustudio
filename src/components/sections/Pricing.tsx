// ─── Pricing ──────────────────────────────────────────────────────────────────
// 3 planos baseados no modelo WhatsApp-first do DuduStudio.

import Link from "next/link";

const PLANS = [
  {
    name: "Vitrine",
    price: 1200,
    ideal: "confeiteiras, autônomos, profissionais liberais",
    highlighted: false,
    includes: [
      "Site de 1 página (Landing Page)",
      "Design personalizado",
      "Mobile 100%",
      "Todos CTAs via WhatsApp",
      "SEO básico",
      "Deploy + domínio inclusos",
      "30 dias de suporte",
    ],
    cta: "Começar agora",
    slug: null,
  },
  {
    name: "Pro",
    price: 2800,
    ideal: "restaurantes, clínicas, salões, escritórios",
    highlighted: true,
    badge: "Mais pedido",
    includes: [
      "Site completo até 5 páginas",
      "Design premium + animações",
      "Mobile 100%",
      "Todos CTAs via WhatsApp",
      "Integração Google Agenda",
      "SEO avançado",
      "Deploy + domínio inclusos",
      "60 dias de suporte",
    ],
    cta: "Escolher Pro",
    slug: null,
  },
  {
    name: "E-commerce",
    price: 4500,
    ideal: "lojas, confeitarias, moda, produtos físicos",
    highlighted: false,
    includes: [
      "Loja virtual completa",
      "Catálogo de produtos",
      "Carrinho + pedidos via WhatsApp",
      "Link de pagamento Pix incluso",
      "Mobile 100%",
      "SEO avançado",
      "Deploy + domínio inclusos",
      "90 dias de suporte",
    ],
    cta: "Quero uma loja",
    slug: "ecommerce",
  },
];

const WA = "https://wa.me/5511999999999";

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-4" style={{ background: "#07070e" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            Investimento
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">
            Preço único. Sem mensalidade.
          </h2>
          <p className="max-w-md mx-auto text-base" style={{ color: "rgba(255,255,255,0.38)" }}>
            Você paga uma vez e o site é seu para sempre.
            Formulários, pedidos e reservas chegam direto no seu WhatsApp.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl flex flex-col"
              style={{
                border: plan.highlighted
                  ? "2px solid rgba(124,58,237,0.6)"
                  : "1px solid rgba(255,255,255,0.07)",
                background: plan.highlighted
                  ? "linear-gradient(145deg,rgba(124,58,237,0.12),rgba(79,70,229,0.06))"
                  : "rgba(255,255,255,0.02)",
                padding: "28px",
              }}
            >
              {/* Badge "Mais pedido" */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}
                >
                  ⭐ {plan.badge}
                </div>
              )}

              {/* Plano + ideal */}
              <div className="mb-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ color: plan.highlighted ? "#a78bfa" : "rgba(255,255,255,0.4)" }}
                >
                  Plano
                </p>
                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Ideal para: {plan.ideal}
                </p>
              </div>

              {/* Preço */}
              <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  pagamento único
                </p>
                <p className="text-4xl font-black text-white">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(plan.price)}
                </p>
              </div>

              {/* Incluso */}
              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    <span style={{ color: plan.highlighted ? "#a78bfa" : "rgba(124,58,237,0.7)", marginTop: "1px", flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                {plan.slug && (
                  <Link
                    href={`/demo/${plan.slug}`}
                    className="rounded-full border px-4 py-2.5 text-center text-sm font-medium transition-all hover:border-white/30 hover:text-white"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
                  >
                    Ver demo →
                  </Link>
                )}
                <a
                  href={`${WA}?text=${encodeURIComponent(`Olá! Quero o Plano ${plan.name} — R$ ${plan.price.toLocaleString("pt-BR")}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white transition-all"
                  style={{
                    background: plan.highlighted
                      ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  {plan.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Nota manutenção */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}
        >
          <p className="text-sm font-semibold text-white mb-3">Após o suporte incluso</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            <span><span className="text-white font-medium">Hospedagem Simples</span> · R$ 390/mês</span>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
            <span><span className="text-white font-medium">Manutenção Ativa</span> · R$ 690/mês <span style={{ color: "rgba(255,255,255,0.3)" }}>(+ 2 alterações/mês)</span></span>
          </div>
          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            Alterações avulsas: foto ou texto R$ 80 · nova seção R$ 350 · produto no cardápio R$ 50
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm mt-8" style={{ color: "rgba(255,255,255,0.25)" }}>
          Precisa de algo fora desses planos?{" "}
          <a
            href={`${WA}?text=${encodeURIComponent("Olá! Tenho um projeto personalizado")}`}
            className="underline underline-offset-4 transition-colors"
            style={{ color: "rgba(167,139,250,0.7)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale comigo no WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
