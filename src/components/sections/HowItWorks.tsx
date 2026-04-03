// ─── HowItWorks ───────────────────────────────────────────────────────────────
// Seção "Como funciona" redesenhada: números decorativos gigantes no fundo,
// linha conectora gradiente e cards minimalistas de processo.

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
    title: "Escolha o template",
    description: "Navegue pelos sites disponíveis e encontre o que mais combina com o seu negócio.",
    accent: "#7c3aed",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    title: "Teste o demo ao vivo",
    description: "Clique em \"Ver demo\" e navegue pelo site completo antes de decidir. Igual test-drive — veja tudo antes de comprar.",
    accent: "#06b6d4",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    title: "Compre e receba",
    description: "Após o pagamento, personalizamos com seus dados e entregamos o site em até 48h. Pronto para publicar.",
    accent: "#10b981",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4 relative overflow-hidden" style={{ background: "#07070e" }}>

      {/* Glow fundo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: "0",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at top, rgba(124,58,237,0.08), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-20 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            Processo
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 tracking-tight">
            Como funciona
          </h2>
          <p className="max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.38)" }}>
            Simples, transparente e sem surpresas.
            Do test-drive à entrega em 3 passos.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Linha conectora desktop */}
          <div
            className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 20%, rgba(6,182,212,0.4) 50%, rgba(16,185,129,0.4) 80%, transparent)",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col rounded-2xl p-7"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              }}
            >
              {/* Número decorativo gigante (fundo) */}
              <span
                className="absolute -top-4 -left-2 font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "8rem",
                  color: `${step.accent}06`,
                  letterSpacing: "-0.05em",
                  zIndex: 0,
                }}
              >
                {step.number}
              </span>

              {/* Conteúdo */}
              <div className="relative z-10 flex flex-col flex-1">

                {/* Passo + ícone */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{
                      background: `${step.accent}12`,
                      border: `1px solid ${step.accent}30`,
                      color: step.accent,
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="text-xs font-bold tracking-[0.15em] uppercase"
                    style={{ color: step.accent + "99" }}
                  >
                    Passo {step.number}
                  </span>
                </div>

                {/* Texto */}
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {step.description}
                </p>

                {/* Indicador de progresso */}
                <div className="flex items-center gap-1.5 mt-6">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className="h-0.5 rounded-full transition-all"
                      style={{
                        width: j === i ? "24px" : "8px",
                        background: j <= i ? step.accent : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA abaixo */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            Pronto para começar?
          </p>
          <a
            href="#sites"
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 30px rgba(124,58,237,0.35)",
            }}
          >
            Ver demos agora
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
