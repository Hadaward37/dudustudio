// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Seção "Como funciona" — 3 passos simples do processo de compra.
// Conceito "test-drive de carro".

const steps = [
  {
    number: "01",
    emoji: "🔍",
    title: "Escolha o template",
    description:
      "Navegue pelos sites disponíveis e encontre o que mais combina com seu negócio.",
  },
  {
    number: "02",
    emoji: "🚀",
    title: "Teste o demo ao vivo",
    description:
      "Clique em \"Ver demo\" e navegue pelo site completo antes de decidir. Igual test-drive.",
  },
  {
    number: "03",
    emoji: "✅",
    title: "Compre e receba",
    description:
      "Após a compra, personalizamos com seus dados e entregamos o site em até 48h.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
            Processo
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Como funciona
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Simples, transparente e sem surpresas. Do test-drive à entrega em 3
            passos.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Linha conectora (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Número */}
              <span className="mb-4 text-xs font-black tracking-widest text-violet-500 uppercase">
                Passo {step.number}
              </span>

              {/* Emoji */}
              <span className="text-5xl mb-4">{step.emoji}</span>

              {/* Título */}
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>

              {/* Descrição */}
              <p className="text-white/50 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
