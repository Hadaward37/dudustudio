"use client";

// ─── NavBar ───────────────────────────────────────────────────────────────────
// Barra de navegação principal do hub (página home).
// Não aparece dentro dos demos — cada demo tem seu próprio nav.
// TODO: adicionar menu mobile com drawer animado.

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span
            className="text-2xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DuduStudio
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link href="/#sites" className="hover:text-white transition-colors">
            Sites
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-white transition-colors"
          >
            Como funciona
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Preços
          </Link>
          <Link href="/#faq" className="hover:text-white transition-colors">
            FAQ
          </Link>
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#sites"
            className="rounded-full bg-violet-600 hover:bg-violet-500 transition-colors px-5 py-2 text-sm font-semibold text-white"
          >
            Ver demos →
          </Link>
        </div>

        {/* Botão hamburger mobile */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md px-4 py-4 flex flex-col gap-3 text-sm">
          <Link href="/#sites" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">Sites</Link>
          <Link href="/#how-it-works" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">Como funciona</Link>
          <Link href="/#pricing" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">Preços</Link>
          <Link href="/#faq" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white">FAQ</Link>
          <Link href="/#sites" onClick={() => setMobileOpen(false)} className="mt-2 rounded-full bg-violet-600 px-5 py-2 text-center font-semibold text-white">Ver demos →</Link>
        </div>
      )}
    </header>
  );
}
