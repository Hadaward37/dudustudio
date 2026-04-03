// ─── CTA Final ────────────────────────────────────────────────────────────────
// Seção de call-to-action antes do footer. Visual impactante com glow central.

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-28 px-4 relative overflow-hidden" style={{ background: "#07070e" }}>

      {/* Separador topo */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }}
      />

      {/* Glow central */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.14), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          style={{
            border: "1px solid rgba(124,58,237,0.3)",
            background: "rgba(124,58,237,0.07)",
            color: "#c4b5fd",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a78bfa", boxShadow: "0 0 8px #a78bfa", animation: "dot-ping 2s ease-in-out infinite" }}
          />
          Sem risco — teste de graça
        </div>

        {/* Headline */}
        <h2
          className="font-black tracking-tight text-white mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}
        >
          Seu site no ar{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            esta semana.
          </span>
        </h2>

        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.42)" }}>
          Explore todos os demos sem precisar cadastrar.
          Só compre quando tiver{" "}
          <span style={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>100% de certeza</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#sites"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 50px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
              fontSize: "15px",
            }}
          >
            <span className="relative z-10">Explorar demos agora</span>
            <svg className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="card-shine" />
          </Link>

          <a
            href="https://wa.me/5500000000000?text=Olá! Gostaria de saber mais sobre os sites."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 font-medium transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,255,255,0.02)",
              fontSize: "15px",
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.843L.057 23.486a.75.75 0 00.916.916l5.643-1.472A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.73-.52-5.27-1.42l-.38-.22-3.93 1.03 1.03-3.93-.22-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>

        {/* Social proof mini */}
        <p className="mt-10 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          Entrega garantida em 48h · Sem mensalidade · Código-fonte incluso
        </p>

      </div>
    </section>
  );
}
