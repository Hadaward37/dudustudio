'use client'

import { useEffect } from 'react'
import { Syne } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AquarioCanvas } from '@/components/ui/AquarioCanvas'
import { CustomCursor } from '@/components/ui/CustomCursor'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })

const WA = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`

export default function HomePage() {
  useEffect(() => {
    // ── Scroll snap ativo apenas nesta página ──────────────────────────────
    const html = document.documentElement
    html.style.scrollSnapType = 'y mandatory'
    html.style.overflowY = 'scroll'

    // ── GSAP ScrollTrigger ──────────────────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger)

    document.querySelectorAll('.fp-section').forEach((section) => {
      const els = section.querySelectorAll('.fp-label, .fp-title, .fp-sub, .fp-card, .fp-step, .fp-btn')
      gsap.fromTo(els,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )
    })

    // ── Count-up para stats ─────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('.stat-number[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target ?? '0', 10)
      gsap.to({ val: 0 }, {
        val: target, duration: 1.5, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round((this as unknown as { targets: () => { val: number }[] }).targets()[0].val).toString() },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      html.style.scrollSnapType = ''
      html.style.overflowY = ''
    }
  }, [])

  return (
    <div className={syne.variable} style={{ background: '#050508', color: '#f0f0f0' }}>
      <CustomCursor />

      {/* ── GLOBAL STYLES ─────────────────────────────────────────────────── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --accent1: #2563EB;
          --accent2: #0EA5E9;
          --pink: #818CF8;
          --bg: #050508;
          --font-head: var(--font-syne), 'Syne', sans-serif;
          --white10: rgba(255,255,255,0.1);
          --white20: rgba(255,255,255,0.2);
          --white40: rgba(255,255,255,0.4);
          --white60: rgba(255,255,255,0.6);
        }

        /* Scroll snap */
        .fp-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          height: 100vh;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        /* Gradient text */
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #2563EB 0%, #0EA5E9 40%, #818CF8 70%, #2563EB 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 6s ease infinite;
        }

        /* Buttons */
        .btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.875rem 2rem; border-radius: 999px;
          font-family: var(--font-head); font-weight: 700;
          font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; cursor: pointer; border: none;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .btn:hover  { transform: scale(1.05); }
        .btn:active { transform: scale(0.97); }
        .btn-primary {
          background: linear-gradient(135deg, #2563EB, #0EA5E9);
          color: #050508; box-shadow: 0 0 24px rgba(37,99,235,0.3);
        }
        .btn-primary:hover { box-shadow: 0 0 44px rgba(37,99,235,0.55); }
        .btn-ghost {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.14);
        }
        .btn-ghost:hover { border-color: #2563EB; color: #2563EB; }

        /* Section labels */
        .section-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: #2563EB; margin-bottom: 0.8rem; display: block;
        }
        .section-title {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1.5rem;
        }
        .section-header { text-align: center; margin-bottom: 2.5rem; }

        /* ── HERO ─────────────────────────────────────────────── */
        .hero-tag {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #2563EB; border: 1px solid rgba(37,99,235,0.3);
          padding: 0.35rem 1rem; border-radius: 999px;
          background: rgba(37,99,235,0.08); margin-bottom: 1.5rem;
        }
        @keyframes dotPing {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.7); }
        }
        .tag-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #2563EB; animation: dotPing 2s ease infinite;
        }
        .hero-title {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1rem, 2vw, 1.15rem); line-height: 1.7;
          color: rgba(255,255,255,0.55); max-width: 440px; margin-bottom: 2.5rem;
        }
        .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
        .hero-stats {
          display: flex; align-items: center; gap: 2rem;
          padding: 1.25rem 2rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; width: fit-content;
        }
        .stat { text-align: center; }
        .stat-number {
          font-family: var(--font-head); font-weight: 800; font-size: 2rem;
          color: #2563EB; line-height: 1;
        }
        .stat-label {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.6rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-top: 0.3rem;
        }
        .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.07); }

        /* Floating shapes hero */
        .floating-shapes { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        .shape {
          position: absolute; border-radius: 50%;
          background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(14,165,233,0.08));
          border: 1px solid rgba(37,99,235,0.18);
        }
        .shape-1 { width: 280px; height: 280px; top: 10%; right: 6%;  opacity: 0.25; animation: floatA 7s ease-in-out infinite; }
        .shape-2 { width: 180px; height: 180px; bottom: 18%; right: 26%; opacity: 0.2;  animation: floatB 5s ease-in-out infinite; }
        .shape-3 { width: 130px; height: 130px; top: 40%; right: 16%; opacity: 0.18; animation: floatC 9s ease-in-out infinite; }

        /* Scroll indicator */
        @keyframes scrollBounce { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:0.3} }
        .hero-scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.2); font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
        }
        .scroll-indicator {
          width: 24px; height: 38px; border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 12px; display: flex; justify-content: center; padding-top: 6px;
        }
        .scroll-wheel {
          width: 3px; height: 6px; background: #2563EB;
          border-radius: 2px; animation: scrollBounce 1.8s ease-in-out infinite;
        }

        /* ── SOBRE ────────────────────────────────────────────── */
        .sobre-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; width: 100%; }
        .sobre-desc {
          font-family: 'Space Grotesk', sans-serif; font-size: 1rem;
          line-height: 1.8; color: rgba(255,255,255,0.5); margin-bottom: 2rem;
        }
        .sobre-features { display: flex; flex-direction: column; gap: 1rem; }
        .feature-item {
          display: flex; align-items: flex-start; gap: 1rem; padding: 1rem;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px; transition: border-color 0.3s;
        }
        .feature-item:hover { border-color: rgba(37,99,235,0.35); }
        .feature-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 0.1rem; }
        .feature-item h4 { font-family: var(--font-head); font-size: 0.88rem; font-weight: 700; margin-bottom: 0.2rem; }
        .feature-item p  { font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.4); }

        /* Card 3D flip */
        .sobre-visual { display: flex; align-items: center; justify-content: center; }
        .sobre-3d-wrapper { position: relative; width: 300px; height: 340px; }
        .card-3d { perspective: 1000px; width: 100%; height: 100%; }
        .card-3d-inner {
          width: 100%; height: 100%; transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); cursor: pointer;
        }
        .card-3d:hover .card-3d-inner { transform: rotateY(180deg); }
        .card-3d-front, .card-3d-back {
          position: absolute; inset: 0; backface-visibility: hidden; border-radius: 20px;
          padding: 2.5rem; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center; gap: 1rem;
        }
        .card-3d-front { border: 1px solid rgba(37,99,235,0.2); background: rgba(37,99,235,0.05); }
        .card-3d-back  { border: 1px solid rgba(14,165,233,0.2); background: rgba(14,165,233,0.05); transform: rotateY(180deg); }
        .card-glow {
          position: absolute; inset: 0; border-radius: 20px; pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%);
        }
        .card-icon { font-size: 2.8rem; }
        .card-content h3 { font-family: var(--font-head); font-weight: 800; font-size: 1.4rem; }
        .card-content p  { font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.45); font-size: 0.88rem; }

        @keyframes floatOrb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(40px); }
        .orb-1 { width: 140px; height: 140px; background: rgba(37,99,235,0.4);  opacity: 0.35; top:-20px; right:-20px; animation: floatOrb 5s ease-in-out infinite; }
        .orb-2 { width: 110px; height: 110px; background: rgba(14,165,233,0.4); opacity: 0.3; bottom:20px; left:-10px; animation: floatOrb 7s ease-in-out infinite 1s; }
        .orb-3 { width: 80px;  height: 80px;  background: rgba(129,140,248,0.35); opacity: 0.25; bottom:-10px; right:40px; animation: floatOrb 6s ease-in-out infinite 2s; }

        /* ── SERVIÇOS ─────────────────────────────────────────── */
        .servicos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; width: 100%; }
        .servico-card {
          padding: 1.5rem; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
          position: relative; overflow: hidden; cursor: pointer;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .servico-card:hover {
          border-color: rgba(37,99,235,0.4); transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.1);
        }
        .servico-number {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.6rem;
          letter-spacing: 0.2em; color: #2563EB; margin-bottom: 1rem;
        }
        .servico-icon-wrap { margin-bottom: 1rem; }
        .servico-card h3 { font-family: var(--font-head); font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
        .servico-card p  { font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 1rem; }
        .servico-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
        .servico-tags span {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.58rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.2rem 0.6rem; border-radius: 999px;
          border: 1px solid rgba(37,99,235,0.3); color: rgba(37,99,235,0.8);
        }
        .servico-arrow { position: absolute; top: 1rem; right: 1rem; color: rgba(255,255,255,0.2); }

        /* ── PORTFÓLIO ───────────────────────────────────────── */
        .portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; width: 100%; }
        .portfolio-item { display: block; text-decoration: none; }
        .portfolio-card {
          border-radius: 12px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: transform 0.3s, border-color 0.3s;
        }
        .portfolio-card:hover { transform: translateY(-4px); border-color: rgba(37,99,235,0.35); }
        .portfolio-visual {
          height: 120px; display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .v1 { background: linear-gradient(135deg, rgba(30,20,20,0.9), rgba(50,20,15,0.9)); }
        .v2 { background: linear-gradient(135deg, rgba(15,25,45,0.9), rgba(10,35,55,0.9)); }
        .v3 { background: linear-gradient(135deg, rgba(10,10,22,0.9), rgba(18,18,38,0.9)); }
        .v4 { background: linear-gradient(135deg, rgba(38,18,28,0.9), rgba(28,12,22,0.9)); }
        .v5 { background: linear-gradient(135deg, rgba(10,28,18,0.9), rgba(12,36,22,0.9)); }
        .v6 { background: linear-gradient(135deg, rgba(28,12,12,0.9), rgba(38,8,8,0.9));  }
        .p-shape { position: absolute; }
        .p-cube {
          width: 55px; height: 55px; border: 1px solid rgba(37,99,235,0.3);
          transform: rotate(30deg); background: rgba(37,99,235,0.06);
        }
        .p-sphere {
          width: 35px; height: 35px; border-radius: 50%;
          border: 1px solid rgba(14,165,233,0.35); top: 18px; right: 18px;
          background: rgba(14,165,233,0.06);
        }
        .portfolio-info { padding: 0.9rem 1rem; }
        .portfolio-cat { font-family: 'Space Grotesk', sans-serif; font-size: 0.58rem; letter-spacing: 0.15em; text-transform: uppercase; color: #2563EB; }
        .portfolio-info h3 { font-family: var(--font-head); font-size: 0.9rem; font-weight: 700; margin: 0.3rem 0 0.2rem; }
        .portfolio-info p  { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.35); }

        /* ── PROCESSO ────────────────────────────────────────── */
        .processo-timeline { position: relative; display: flex; flex-direction: column; width: 100%; }
        .timeline-line {
          position: absolute; left: 19px; top: 20px; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, #2563EB, transparent);
        }
        .processo-step { display: flex; gap: 1.5rem; padding-bottom: 2rem; position: relative; }
        .step-bubble { flex-shrink: 0; position: relative; width: 40px; height: 40px; }
        .step-number {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(37,99,235,0.12); border: 1px solid rgba(37,99,235,0.4);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif; font-size: 0.6rem; font-weight: 700;
          color: #2563EB; letter-spacing: 0.05em; position: relative; z-index: 1;
        }
        .step-ring { position: absolute; inset: -4px; border-radius: 50%; border: 1px solid rgba(37,99,235,0.18); }
        .step-content { padding-top: 0.35rem; }
        .step-content h3 { font-family: var(--font-head); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.3rem; }
        .step-content p  { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.42); line-height: 1.7; }

        /* ── CONTATO ──────────────────────────────────────────── */
        .contato-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; width: 100%; }
        .contato-desc { font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.5); margin-bottom: 2rem; }
        .contato-items { display: flex; flex-direction: column; gap: 1rem; }
        .contato-item {
          display: flex; align-items: center; gap: 1rem; padding: 1rem;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
        }
        .contato-icon { font-size: 1.4rem; }
        .contato-item h4 { font-family: var(--font-head); font-size: 0.85rem; font-weight: 700; margin-bottom: 0.2rem; }
        .contato-item a  { font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; color: #2563EB; text-decoration: none; }
        .contato-form-wrap {
          background: rgba(37,99,235,0.04); border: 1px solid rgba(37,99,235,0.15);
          border-radius: 20px; padding: 3rem 2rem;
        }

        /* ── FOOTER ───────────────────────────────────────────── */
        .footer-inner { width: 100%; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
        .footer-logo { font-family: var(--font-head); font-weight: 800; font-size: 1.35rem; letter-spacing: -0.02em; margin-bottom: 0.7rem; }
        .footer-brand p  { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.3); }
        .footer-links-group h4 { font-family: 'Space Grotesk', sans-serif; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 1rem; }
        .footer-links-group ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-links-group a { font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .footer-links-group a:hover { color: #2563EB; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.5rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-bottom p { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.18); }
        .heart { color: #2563EB; }

        /* ── RESPONSIVE ───────────────────────────────────────── */
        @media (max-width: 960px) {
          .sobre-grid    { grid-template-columns: 1fr; }
          .sobre-visual  { display: none; }
          .contato-grid  { grid-template-columns: 1fr; }
          .servicos-grid { grid-template-columns: repeat(2, 1fr); }
          .portfolio-grid{ grid-template-columns: repeat(2, 1fr); }
          .footer-grid   { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 600px) {
          .servicos-grid  { grid-template-columns: 1fr; }
          .portfolio-grid { grid-template-columns: 1fr; }
          .hero-stats { flex-wrap: wrap; gap: 1rem; }
        }
      `}</style>

      {/* ── AQUÁRIO FIXO ──────────────────────────────────────────────────── */}
      <AquarioCanvas />

      {/* ── OVERLAY GLOBAL ────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.35) 0%, rgba(5,5,8,0.72) 100%)',
      }} />

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="fp-section" style={{ zIndex: 2 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3 }}>

          <div className="fp-label hero-tag">
            <span className="tag-dot" />
            Plataforma de sites premium
          </div>

          <h1 className="fp-title hero-title">
            Sites que fazem<br />
            <span className="gradient-text">seu cliente comprar.</span>
          </h1>

          <p className="fp-sub hero-subtitle">
            Test-drive grátis antes de comprar.<br />
            Entrega em 7 dias. DuduShield™ incluso.
          </p>

          <div className="fp-btn hero-buttons">
            <a href="/trabalhos" className="btn btn-primary">
              <span>Ver sites demo</span>
            </a>
            <a href={`${WA}?text=${encodeURIComponent('Olá! Vim pelo DuduStudio e quero saber mais.')}`}
              className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          <div className="fp-card hero-stats">
            <div className="stat">
              <span className="stat-number" data-target="7">7</span>
              <span className="stat-label">Dias entrega</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number" data-target="100">100</span>
              <span className="stat-label">% Mobile</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number" data-target="6">6</span>
              <span className="stat-label">Demos</span>
            </div>
          </div>
        </div>

        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>

        <div className="hero-scroll">
          <div className="scroll-indicator"><div className="scroll-wheel" /></div>
          <span>Role para explorar</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO 2 — SOBRE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="fp-section" style={{ zIndex: 2, background: 'rgba(10,10,18,0.55)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="sobre-grid">

            <div className="sobre-text">
              <div className="fp-label section-tag">— Por que o DuduStudio</div>
              <h2 className="fp-title section-title">
                Uma plataforma<br />
                <span className="gradient-text">sem igual.</span>
              </h2>
              <p className="fp-sub sobre-desc">
                O DuduStudio é a única plataforma onde você testa o site completo antes de comprar —
                igual a um test-drive de carro. Sites profissionais entregues em 7 dias, com DuduShield™ incluso.
              </p>
              <div className="sobre-features">
                {[
                  { icon: '🧪', title: 'Test-drive antes de comprar', desc: 'Entre, clique, teste tudo. Só compra se amar.' },
                  { icon: '🔒', title: 'DuduShield™ em todo site',    desc: 'Proteção profissional desde o primeiro dia.' },
                  { icon: '🚀', title: 'Do briefing ao ar em 7 dias', desc: 'Design aprovado em 48h. Deploy garantido.' },
                ].map(f => (
                  <div key={f.title} className="fp-step feature-item">
                    <div className="feature-icon">{f.icon}</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sobre-visual">
              <div className="sobre-3d-wrapper">
                <div className="card-3d">
                  <div className="card-3d-inner">
                    <div className="card-3d-front">
                      <div className="card-glow" />
                      <div className="card-icon">🌐</div>
                      <div className="card-content">
                        <h3>Sites</h3>
                        <p>Experiências digitais únicas</p>
                      </div>
                    </div>
                    <div className="card-3d-back">
                      <div className="card-glow" />
                      <div className="card-icon">🔒</div>
                      <div className="card-content">
                        <h3>Shield</h3>
                        <p>Proteção profissional</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO 3 — SERVIÇOS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="fp-section" style={{ zIndex: 2 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="section-header">
            <div className="fp-label section-tag">— Serviços</div>
            <h2 className="fp-title section-title">
              O que <span className="gradient-text">entregamos</span>
            </h2>
          </div>
          <div className="servicos-grid">
            {[
              { n: '01', icon: '📄', title: 'Landing Page',   price: 'R$ 1.200', desc: 'Página única focada em converter. Ideal para começar.',                tags: ['WhatsApp-first', 'Mobile', 'SEO'] },
              { n: '02', icon: '🌐', title: 'Site Completo',  price: 'R$ 2.800', desc: 'Até 5 páginas com animações premium e Google Agenda.',                 tags: ['Multi-página', 'Animações', 'Analytics'] },
              { n: '03', icon: '🛒', title: 'E-commerce',     price: 'R$ 4.500', desc: 'Loja virtual com catálogo e pedidos pelo WhatsApp.',                   tags: ['Catálogo', 'Carrinho', 'Pix'] },
              { n: '04', icon: '🔒', title: 'DuduShield™',   price: 'Incluso',   desc: 'Proteção profissional em todo site entregue.',                         tags: ['Anti-spam', 'Anti-clone', 'Monitor'] },
            ].map(s => (
              <div key={s.n} className="fp-card servico-card">
                <div className="servico-number">{s.n}</div>
                <div className="servico-icon-wrap" style={{ fontSize: 24 }}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="servico-tags">{s.tags.map(t => <span key={t}>{t}</span>)}</div>
                <div className="servico-arrow">↗</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO 4 — PORTFÓLIO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="fp-section" style={{ zIndex: 2, background: 'rgba(10,10,18,0.55)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="section-header">
            <div className="fp-label section-tag">— Portfólio</div>
            <h2 className="fp-title section-title">
              Nossos <span className="gradient-text">demos</span>
            </h2>
          </div>
          <div className="portfolio-grid">
            {[
              { title: 'Pizzaria Gustoso', cat: 'Restaurante',  href: '/demo/pizzaria',                      v: 'v1' },
              { title: 'Clínica Vita',     cat: 'Saúde',        href: '/demo/clinica',                       v: 'v2' },
              { title: 'Urban Store',      cat: 'E-commerce',   href: '/demo/ecommerce',                     v: 'v3' },
              { title: 'Doçaria da Vovó', cat: 'Confeitaria',  href: '/demo/docaria',                       v: 'v4' },
              { title: 'Pata Verde Pet',   cat: 'Landing Page', href: '/demo/landing/petshop',               v: 'v5' },
              { title: 'JR Estética',      cat: 'Landing Page', href: '/demo/landing/estetica-automotiva',   v: 'v6' },
            ].map((p, i) => (
              <a key={i} href={p.href} className="fp-card portfolio-item">
                <div className="portfolio-card">
                  <div className={`portfolio-visual ${p.v}`}>
                    <div className="p-shape p-cube" />
                    <div className="p-shape p-sphere" />
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-cat">{p.cat}</span>
                    <h3>{p.title}</h3>
                    <p>Ver demo →</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO 5 — PROCESSO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="fp-section" style={{ zIndex: 2 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="section-header">
            <div className="fp-label section-tag">— Como trabalhamos</div>
            <h2 className="fp-title section-title">
              Nosso <span className="gradient-text">processo</span>
            </h2>
          </div>
          <div className="processo-timeline">
            <div className="timeline-line" />
            {[
              { n: '01', title: 'Explore os demos',       desc: 'Navegue pelos sites completos e teste tudo antes de decidir.' },
              { n: '02', title: 'Fale no WhatsApp',       desc: 'Me conta sobre seu negócio. Respondo em menos de 2 horas.' },
              { n: '03', title: 'Aprovamos o design',     desc: 'Em 48h você recebe o design personalizado. 2 revisões inclusas.' },
              { n: '04', title: 'No ar em 7 dias',        desc: 'Deploy com seu domínio, SSL, SEO e Google Analytics.' },
              { n: '05', title: 'DuduShield™ ativo',     desc: 'Proteção profissional ativada desde o primeiro dia.' },
            ].map(s => (
              <div key={s.n} className="fp-step processo-step">
                <div className="step-bubble">
                  <div className="step-number">{s.n}</div>
                  <div className="step-ring" />
                </div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SEÇÃO 6 — CONTATO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="fp-section" style={{ zIndex: 2, background: 'rgba(10,10,18,0.55)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="contato-grid">

            <div className="contato-info">
              <div className="fp-label section-tag">— Contato</div>
              <h2 className="fp-title section-title">
                Vamos criar algo<br />
                <span className="gradient-text">incrível juntos</span>
              </h2>
              <p className="fp-sub contato-desc">
                Resposta em até 2 horas. Sem formulário chato.
                É só mandar uma mensagem.
              </p>
              <div className="contato-items">
                {[
                  { icon: '💬', label: 'WhatsApp', text: 'Clique para conversar', href: `${WA}?text=${encodeURIComponent('Olá! Vim pelo DuduStudio e quero saber mais.')}` },
                  { icon: '📱', label: 'Instagram', text: '@dudustudio', href: '#' },
                ].map(c => (
                  <div key={c.label} className="fp-step contato-item">
                    <div className="contato-icon">{c.icon}</div>
                    <div>
                      <h4>{c.label}</h4>
                      <a href={c.href} target={c.href !== '#' ? '_blank' : undefined} rel="noopener noreferrer">{c.text}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fp-card contato-form-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.5rem' }}>
              <div style={{ fontSize: 56 }}>💬</div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 26, fontWeight: 700 }}>
                Fale agora no WhatsApp
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk, sans-serif', fontSize: 14 }}>
                Resposta em até 2 horas. Sem burocracia.
              </p>
              <a
                href={`${WA}?text=${encodeURIComponent('Olá! Vim pelo DuduStudio e quero saber mais.')}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>💬 Iniciar conversa</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        zIndex: 2, position: 'relative',
        background: 'rgba(5,5,8,0.92)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 1.5rem 2rem',
        // Override scroll-snap so footer doesn't snap
        scrollSnapAlign: 'none',
      }}>
        <div className="footer-inner" style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span style={{ color: '#fff' }}>Dudu</span>
                <span style={{ color: '#2563EB' }}>Studio</span>
              </div>
              <p>Sites que vendem. Entregues em 7 dias.</p>
            </div>
            <div className="footer-links-group">
              <h4>Navegação</h4>
              <ul>
                <li><a href="/trabalhos">Sites Demo</a></li>
                <li><a href="/dudushield">DuduShield™</a></li>
              </ul>
            </div>
            <div className="footer-links-group">
              <h4>Contato</h4>
              <ul>
                <li><a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} DuduStudio. Todos os direitos reservados.</p>
            <p>Feito com <span className="heart">♥</span> e muito café</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
