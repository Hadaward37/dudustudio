// ─── Footer ───────────────────────────────────────────────────────────────────
// Rodapé da página home do hub.
// Não aparece dentro dos demos.

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/20 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        {/* Logo + copyright */}
        <p>
          <span className="font-bold text-white/70">DuduStudio</span> ©{" "}
          {year} — Todos os direitos reservados
        </p>

        {/* Links */}
        <nav className="flex items-center gap-5">
          <Link href="/#sites" className="hover:text-white/70 transition-colors">
            Sites
          </Link>
          <Link href="/#pricing" className="hover:text-white/70 transition-colors">
            Preços
          </Link>
          {/* TODO: adicionar página de contato/WhatsApp */}
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Contato
          </a>
        </nav>
      </div>
    </footer>
  );
}
