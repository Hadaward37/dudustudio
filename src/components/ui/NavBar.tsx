"use client";

// ─── NavBar ───────────────────────────────────────────────────────────────────
// Barra de navegação principal. Vidro fosco com blur, logo shimmer, pill nav.

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        background: scrolled ? "rgba(7,7,14,0.85)" : "transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
          <span
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DuduStudio
          </span>
        </Link>

        {/* Links desktop — pill central */}
        <div
          className="hidden md:flex items-center gap-1 rounded-full px-2 py-1"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(8px)",
          }}
        >
          {[
            { href: "/#sites",        label: "Sites"          },
            { href: "/#how-it-works", label: "Como funciona"  },
            { href: "/#pricing",      label: "Preços"         },
            { href: "/#faq",          label: "FAQ"            },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 rounded-full text-sm transition-all duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center">
          <Link
            href="/#sites"
            className="group relative inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white overflow-hidden transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            Ver demos
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.6)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "320px" : "0",
          borderBottom: mobileOpen ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          background: "rgba(7,7,14,0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {[
            { href: "/#sites",        label: "Sites"          },
            { href: "/#how-it-works", label: "Como funciona"  },
            { href: "/#pricing",      label: "Preços"         },
            { href: "/#faq",          label: "FAQ"            },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#sites"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            Ver demos →
          </Link>
        </div>
      </div>
    </header>
  );
}
