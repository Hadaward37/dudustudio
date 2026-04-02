// ─── Demo: Clínica Vita ────────────────────────────────────────────────────────
// Rota: /demo/clinica
//
// TODO: Migrar o conteúdo completo de clinica/index.html para cá.
//       Manter 100% do design original:
//         - Tema light moderno e confiável
//         - Hero com chamada para agendamento
//         - Grid de especialidades médicas
//         - Seção de equipe (médicos com cards animados)
//         - Sistema de agendamento online (formulário ou modal)
//         - Depoimentos de pacientes
//         - FAQ da clínica
//         - Footer com contatos e localização
//         - Animações de entrada suaves
//         - Cores: azul/verde saúde

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Vita — Demo | DuduStudio",
  description:
    "Demonstração do template Clínica Vita. Site light e moderno com agendamento online, equipe médica e especialidades.",
};

export default function ClinicaPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ background: "#f8fafc", color: "#0f172a" }}
    >
      {/* ─── PLACEHOLDER — será substituído pelo HTML migrado ─── */}
      <div className="max-w-lg space-y-6">
        <span className="text-7xl">🏥</span>

        <h1
          className="text-5xl font-black"
          style={{
            background: "linear-gradient(135deg, #0ea5e9, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Clínica Vita
        </h1>

        <p className="text-slate-500 text-lg leading-relaxed">
          O site completo da Clínica Vita está sendo migrado para Next.js.
          <br />
          Em breve você verá o demo completo com agendamento, equipe e
          especialidades.
        </p>

        {/* Tags do que virá */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Light", "Agendamento", "Equipe", "Especialidades", "Depoimentos"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-sky-500/30 bg-sky-50 px-3 py-1 text-sm text-sky-700"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Preço */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <p className="text-slate-400 text-sm mb-1">Template disponível por</p>
          <p className="text-4xl font-black text-slate-900">R$ 1.800</p>
          <p className="text-slate-400 text-xs mt-1">
            pagamento único • entrega em 48h
          </p>
        </div>
      </div>
    </main>
  );
}
