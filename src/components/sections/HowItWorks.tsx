// ─── HowItWorks ───────────────────────────────────────────────────────────────
// 4 passos do processo WhatsApp-first do DuduStudio.

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Escolha o modelo",
    description: "Navegue pelos demos, teste tudo e escolha o que mais combina com seu negócio.",
    accent: "#7c3aed",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    title: "Fale comigo no WhatsApp",
    description: "Me manda o modelo escolhido e seu conteúdo — logo, fotos, textos e cores.",
    accent: "#06b6d4",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    title: "Aprove o design",
    description: "Em 48h você recebe o design personalizado. 2 rodadas de revisão inclusas.",
    accent: "#f59e0b",
  },
  {
    number: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
    title: "No ar em 7 dias",
    description: "Deploy com seu domínio, SSL, SEO e Google Analytics configurados.",
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
          top: 0,
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
            Do primeiro contato ao site no ar em 7 dias.
            Simples, transparente e sem surpresas.
          </p>
        </div>

        {/* Steps — 4 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Linha conectora desktop */}
          <div
            className="hidden lg:block absolute pointer-events-none"
            style={{
              top: "calc(50% + 20px)",
              left: "calc(12.5% + 28px)",
              right: "calc(12.5% + 28px)",
              height: "1px",
              background: "linear-gradient(90deg, #7c3aed44, #06b6d444, #f59e0b44, #10b98144)",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col rounded-2xl p-6"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
              }}
            >
              {/* Número decorativo fundo */}
              <span
                className="absolute -top-4 -left-1 font-black leading-none select-none pointer-events-none"
                style={{
                  fontSize: "7rem",
                  color: `${step.accent}07`,
                  letterSpacing: "-0.05em",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {step.number}
              </span>

              <div className="relative z-10">
                {/* Ícone */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl mb-5"
                  style={{
                    background: `${step.accent}12`,
                    border: `1px solid ${step.accent}30`,
                    color: step.accent,
                  }}
                >
                  {step.icon}
                </div>

                {/* Passo label */}
                <span
                  className="text-xs font-bold tracking-[0.15em] uppercase block mb-3"
                  style={{ color: step.accent + "99" }}
                >
                  Passo {step.number}
                </span>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                  {step.description}
                </p>

                {/* Dot indicador */}
                <div className="flex items-center gap-1.5 mt-5">
                  {steps.map((_, j) => (
                    <div
                      key={j}
                      className="rounded-full transition-all"
                      style={{
                        height: "3px",
                        width: j === i ? "20px" : "6px",
                        background: j <= i ? step.accent : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            Pronto para começar?
          </p>
          <a
            href="https://wa.me/5511999999999?text=Olá! Quero criar meu site"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 30px rgba(124,58,237,0.35)",
            }}
          >
            Falar no WhatsApp agora
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
