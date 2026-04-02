"use client";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// Perguntas frequentes com acordeão animado.
// TODO: migrar perguntas específicas do index.html original.

import { useState } from "react";

const faqs = [
  {
    q: "Posso realmente testar o site antes de comprar?",
    a: "Sim! Cada site tem um demo ao vivo completo. Você navega por todas as páginas, vê as animações e interage com os elementos — tudo antes de pagar.",
  },
  {
    q: "O que está incluso no preço?",
    a: "Código-fonte completo, personalização com seus dados (nome, telefone, endereço, fotos), hospedagem recomendada, suporte por 1 mês e entrega em até 48h.",
  },
  {
    q: "Preciso pagar mensalidade?",
    a: "Não. O pagamento é único. Depois da entrega, o site é 100% seu. Você pode hospedar onde quiser.",
  },
  {
    q: "Posso pedir mudanças no design?",
    a: "Pequenas personalizações (cores, fontes, textos) estão incluídas. Mudanças estruturais podem ter custo adicional — consulte antes de comprar.",
  },
  {
    q: "Como funciona a entrega?",
    a: "Após o pagamento, você me envia os dados do negócio (nome, contatos, fotos). Em até 48h entrego o site hospedado ou os arquivos finais.",
  },
  {
    q: "O site funciona no celular?",
    a: "Sim. Todos os templates são 100% responsivos e testados em mobile, tablet e desktop.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Perguntas frequentes
          </h2>
        </div>

        {/* Acordeão */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <button
                className="w-full text-left flex items-center justify-between gap-4 px-6 py-4 text-white/80 hover:text-white transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-medium">{faq.q}</span>
                <span
                  className="text-violet-400 transition-transform duration-300 flex-shrink-0"
                  style={{
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                >
                  +
                </span>
              </button>

              {/* Conteúdo expandido */}
              <div
                style={{
                  maxHeight: openIndex === i ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p className="px-6 pb-4 text-sm text-white/50 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
