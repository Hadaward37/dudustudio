"use client";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// Perguntas frequentes com acordeão animado.

import { useState } from "react";

const faqs = [
  {
    q: "Como funciona sem backend? O site é completo?",
    a: "Sim! Usamos o WhatsApp Business como seu sistema. Formulários, reservas e pedidos chegam direto no seu WhatsApp formatados e prontos — sem precisar de nada técnico.",
  },
  {
    q: "Preciso ter WhatsApp Business?",
    a: "Recomendamos, mas o normal funciona também. O Business permite respostas automáticas e catálogo de produtos, melhorando muito a experiência do cliente.",
  },
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Entre 5 e 7 dias úteis após aprovação do design e recebimento do conteúdo (logo, fotos, textos).",
  },
  {
    q: "O site do demo será exatamente assim?",
    a: "Sim. O demo é o produto real. Só substitui seu conteúdo — logo, cores, fotos e textos. A estrutura e os efeitos são os mesmos.",
  },
  {
    q: "O que está incluso no preço?",
    a: "Design, desenvolvimento, deploy, domínio por 1 ano, SSL, SEO técnico, Google Analytics e suporte pós-lançamento.",
  },
  {
    q: "O site tem proteção de segurança?",
    a: "Sim. Todo site entregue pelo DuduStudio inclui proteção profissional: HTTPS forçado, cabeçalhos de segurança (CSP, HSTS), proteção contra ataques XSS e clickjacking, e rate limiting nos formulários. A mesma estrutura usada por empresas como Vercel e Stripe.",
  },
  {
    q: "Os sites têm proteção de segurança?",
    a: "Sim. Todo site entregue inclui o DuduShield™ — nosso sistema proprietário de proteção. Garante HTTPS forçado, proteção contra XSS e clickjacking, rate limiting nos botões de contato e bloqueio de cópia não autorizada. A mesma estrutura usada por Vercel e Stripe.",
  },
  {
    q: "E depois do suporte, o que acontece?",
    a: "O site continua no ar normalmente. Temos dois planos:\n\nHospedagem Simples — R$ 390/mês\nMantém seu site no ar com SSL e backup. Sem alterações inclusas.\n\nManutenção Ativa — R$ 690/mês\nHospedagem + até 2 alterações simples por mês (troca de foto ou texto) com prazo de 5 dias úteis.\n\nAlterações avulsas fora do plano:\nTroca de foto ou texto — R$ 80 · Nova seção — R$ 350 · Novo produto no cardápio — R$ 50 por item",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-4" style={{ background: "#07070e" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(167,139,250,0.8)" }}
          >
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Perguntas frequentes
          </h2>
        </div>

        {/* Acordeão */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                border: openIndex === i
                  ? "1px solid rgba(124,58,237,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
                background: openIndex === i
                  ? "rgba(124,58,237,0.05)"
                  : "rgba(255,255,255,0.02)",
              }}
            >
              <button
                className="w-full text-left flex items-center justify-between gap-4 px-6 py-4 transition-colors"
                style={{ color: openIndex === i ? "#fff" : "rgba(255,255,255,0.7)" }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-sm sm:text-base">{faq.q}</span>
                <span
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: "#a78bfa",
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    fontSize: "20px",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: openIndex === i ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <div className="px-6 pb-5">
                  {faq.a.split("\n\n").map((block, bi) => (
                    <p
                      key={bi}
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)", marginBottom: bi < faq.a.split("\n\n").length - 1 ? "12px" : "0" }}
                    >
                      {block}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
