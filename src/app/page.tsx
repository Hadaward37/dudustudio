'use client'

import { useState, useEffect } from 'react'
import { Syne } from 'next/font/google'
import { Loader } from '@/components/ui/Loader'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { HeroCanvas } from '@/components/ui/HeroCanvas'
import { sites, formatPrice } from '@/lib/sites'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })

const A1   = '#2563EB'
const A2   = '#0EA5E9'
const A3   = '#38BDF8'
const PINK = '#818CF8'
const BG   = '#050508'

const wa = (msg: string) =>
  `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(msg)}`

const tiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width - 0.5) * 18
  const y = -((e.clientY - r.top) / r.height - 0.5) * 18
  e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`
  e.currentTarget.style.transition = 'transform 0.05s ease'
}
const tiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale(1)'
  e.currentTarget.style.transition = 'transform 0.5s ease'
}

const MARQUEE_ITEMS = [
  'Restaurante', 'Clínica', 'Petshop', 'Confeitaria', 'E-commerce',
  'Salão', 'Academia', 'Escritório', 'Automotivo', 'Imobiliária',
]

const STEPS = [
  { n: '01', title: 'Você escolhe o modelo', desc: 'Navegue pelo portfólio e selecione o estilo que mais combina com o seu negócio.' },
  { n: '02', title: 'Manda o conteúdo', desc: 'Logo, fotos, texto e redes sociais. A gente organiza tudo o que você já tem.' },
  { n: '03', title: 'Personalizamos', desc: 'Adaptamos cores, tipografia e seções para refletir a identidade da sua marca.' },
  { n: '04', title: 'Revisão & aprovação', desc: 'Você vê o site no ar antes de pagar o restante. Zero surpresa.' },
  { n: '05', title: 'Entrega e suporte', desc: 'Domínio, hospedagem e 30 dias de suporte. Seu site nunca fica sozinho.' },
]

const WHYS = [
  {
    icon: '⚡',
    title: 'Entrega em dias',
    desc: 'Nenhuma agência entrega um site profissional em menos de uma semana. A gente entrega em 3 a 7 dias úteis.',
  },
  {
    icon: '🎯',
    title: 'Você vê antes de pagar',
    desc: 'Todos os demos são 100% funcionais e navegáveis. Você sabe exatamente o que vai receber.',
  },
  {
    icon: '💬',
    title: 'Suporte humano',
    desc: 'Sem ticket, sem bot. Um desenvolvedor real pelo WhatsApp enquanto seu projeto estiver em andamento.',
  },
]

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState('Todos')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const categories = ['Todos', ...Array.from(new Set(sites.map(s => s.category)))]
  const filtered = filter === 'Todos' ? sites : sites.filter(s => s.category === filter)

  useEffect(() => {
    if (!loaded) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ds-visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.ds-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loaded])

  useEffect(() => {
    if (!loaded) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loaded])

  if (!loaded) return <Loader onComplete={() => setLoaded(true)} />

  return (
    <div
      className={syne.variable}
      style={{ background: BG, color: '#f0f0f0', fontFamily: 'var(--font-syne), sans-serif', overflowX: 'hidden' }}
    >
      <CustomCursor />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${A1}; border-radius: 4px; }

        /* Scroll reveal */
        .ds-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .ds-reveal.ds-visible { opacity: 1; transform: translateY(0); }
        .ds-reveal-d1 { transition-delay: 0.1s; }
        .ds-reveal-d2 { transition-delay: 0.2s; }
        .ds-reveal-d3 { transition-delay: 0.3s; }
        .ds-reveal-d4 { transition-delay: 0.4s; }

        /* Nav */
        .nav-link {
          font-family: var(--font-syne), sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }

        /* 3D Cube logo */
        @keyframes spinCube {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        .cube-scene {
          perspective: 120px;
          width: 42px; height: 42px;
          cursor: pointer;
        }
        .cube {
          width: 100%; height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spinCube 8s linear infinite !important;
        }
        .cube-face {
          position: absolute;
          width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          border-radius: 6px;
          backface-visibility: hidden;
        }
        .cube-face--front {
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.35);
          color: ${A1};
          transform: translateZ(21px);
        }
        .cube-face--right {
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(14,165,233,0.35);
          color: ${A2};
          transform: rotateY(90deg) translateZ(21px);
        }
        .cube-face--back {
          background: rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.35);
          color: ${A1};
          transform: rotateY(180deg) translateZ(21px);
        }
        .cube-face--left {
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(14,165,233,0.35);
          color: ${A2};
          transform: rotateY(270deg) translateZ(21px);
        }

        /* Mobile menu */
        .mobile-menu-btn {
          background: none; border: none; cursor: pointer;
          display: flex; flex-direction: column; gap: 5px; padding: 4px;
        }
        .mobile-menu-btn span {
          display: block; width: 22px; height: 2px;
          background: rgba(255,255,255,0.6);
          border-radius: 2px; transition: all 0.3s;
        }

        /* Hero */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .hero-sub   { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .hero-ctas  { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both; }
        .hero-badge { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s both; }

        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background: linear-gradient(135deg, ${A1} 0%, ${A2} 40%, ${PINK} 70%, ${A1} 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 6s ease infinite;
        }

        /* Scroll indicator */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        .scroll-arrow { animation: scrollBounce 1.6s ease-in-out infinite; }

        /* Marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex; gap: 3rem; white-space: nowrap;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* CTA Buttons */
        .btn-primary {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #050508;
          background: linear-gradient(135deg, ${A1}, ${A2});
          border: none;
          padding: 0.9rem 2.2rem;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 0 32px ${A1}55;
        }
        .btn-primary:active { transform: scale(0.97); }

        .btn-secondary {
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          background: none;
          border: 1px solid rgba(255,255,255,0.18);
          padding: 0.9rem 2.2rem;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          border-color: ${A1};
          color: ${A1};
        }

        /* Flip card */
        .flip-card { perspective: 1000px; }
        .flip-inner {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .flip-card:hover .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          border-radius: 16px;
          padding: 2.5rem;
          display: flex; flex-direction: column; justify-content: center;
        }
        .flip-back { transform: rotateY(180deg); }

        /* Portfolio cards */
        .demo-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: transform 0.3s ease, border-color 0.3s, box-shadow 0.3s;
        }
        .demo-card:hover {
          transform: translateY(-6px);
          border-color: rgba(37,99,235,0.3);
          box-shadow: 0 16px 48px rgba(37,99,235,0.1);
        }

        /* Filter tabs */
        .filter-tab {
          font-family: var(--font-syne), sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: none;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-tab:hover { border-color: ${A1}; color: ${A1}; }
        .filter-tab.active {
          background: linear-gradient(135deg, ${A1}, ${A2});
          border-color: transparent;
          color: #050508;
        }

        /* Why cards */
        .why-card {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          padding: 2rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .why-card:hover {
          border-color: rgba(37,99,235,0.35);
          box-shadow: 0 0 40px rgba(37,99,235,0.08);
        }

        /* Process */
        .step-line {
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, ${A1}, transparent);
        }

        /* Section label */
        .section-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: ${A1};
        }

        /* Grid tech bg */
        .tech-grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        /* Glow */
        .glow-orb {
          position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px);
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn   { display: flex !important; }
          .hero-title { font-size: clamp(2.4rem, 10vw, 4rem) !important; }
          .flip-card-wrapper { height: 260px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .demos-grid    { grid-template-columns: 1fr !important; }
          .why-grid      { grid-template-columns: 1fr !important; }
          .footer-grid   { grid-template-columns: 1fr !important; }
          .process-grid  { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu     { display: none !important; }
        }
      `}</style>

      {/* ── NAV ───────────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 2rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s',
      }}>
        {/* Cube Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="cube-scene">
            <div className="cube">
              <div className="cube-face cube-face--front">DS</div>
              <div className="cube-face cube-face--right">DS</div>
              <div className="cube-face cube-face--back">DS</div>
              <div className="cube-face cube-face--left">DS</div>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#f0f0f0' }}>
            Dudu<span style={{ color: A1 }}>Studio</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#sobre"    className="nav-link">Sobre</a>
          <a href="#servicos" className="nav-link">Serviços</a>
          <a href="#portfolio" className="nav-link">Portfólio</a>
          <a href="#processo" className="nav-link">Processo</a>
          <a
            href={wa('Olá! Vim pelo site e quero saber mais sobre os planos.')}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.75rem', padding: '0.6rem 1.5rem' }}
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: 'rgba(5,5,8,0.97)', backdropFilter: 'blur(16px)',
          zIndex: 999, padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {['#sobre', '#servicos', '#portfolio', '#processo'].map((href, i) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setMenuOpen(false)}
            >
              {['Sobre', 'Serviços', 'Portfólio', 'Processo'][i]}
            </a>
          ))}
          <a
            href={wa('Olá! Vim pelo site e quero saber mais sobre os planos.')}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary"
            style={{ textAlign: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <HeroCanvas />

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(37,99,235,0.06) 0%, rgba(5,5,8,0.75) 60%, rgba(5,5,8,0.98) 100%)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '860px', width: '100%' }}>
          <div className="hero-badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.65rem', fontWeight: 500,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: A1, border: `1px solid ${A1}33`,
              padding: '0.35rem 1rem', borderRadius: '999px',
              background: `${A1}0d`,
            }}>
              Plataforma de sites para pequenos negócios
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}
          >
            Seu negócio merece{' '}
            <span className="gradient-text">ser visto</span>
          </h1>

          <p
            className="hero-sub"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '540px',
              margin: '0 auto 2.5rem',
            }}
          >
            Sites prontos, personalizados e entregues em dias.{' '}
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>
              Navegue nos demos reais antes de decidir.
            </span>
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#portfolio" className="btn-primary">Ver demos ao vivo</a>
            <a
              href={wa('Olá! Quero saber mais sobre os planos do DuduStudio.')}
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary"
            >
              Falar no WhatsApp
            </a>
          </div>

          {/* Scroll indicator */}
          <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.6rem', letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
            }}>
              scroll para ver mais
            </span>
            <div className="scroll-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={`${A1}66`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div className="glow-orb" style={{ width: 500, height: 300, background: `${A1}18`, bottom: -100, left: '50%', transform: 'translateX(-50%)' }} />
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────────── */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '1rem 0',
        background: 'rgba(37,99,235,0.03)',
      }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
            }}>
              {item}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: A1, opacity: 0.5 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── SOBRE ─────────────────────────────────────────────────────────────── */}
      <section id="sobre" style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left content */}
          <div>
            <p className="section-label ds-reveal" style={{ marginBottom: '1rem' }}>Quem somos</p>
            <h2
              className="ds-reveal ds-reveal-d1"
              style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}
            >
              Feito para quem<br />
              <span className="gradient-text">não tem tempo a perder</span>
            </h2>
            <p className="ds-reveal ds-reveal-d2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: '1rem' }}>
              DuduStudio é uma plataforma de sites prontos para pequenos negócios brasileiros. Desenvolvemos templates de alta conversão que você personaliza e recebe em dias.
            </p>
            <p className="ds-reveal ds-reveal-d3" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
              Sem agências caras, sem meses de espera, sem surpresas. Só resultado.
            </p>
            <div className="ds-reveal ds-reveal-d4" style={{ display: 'flex', gap: '2.5rem' }}>
              {[['6+', 'demos prontos'], ['3–7', 'dias de entrega'], ['100%', 'mobile first']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontWeight: 800, fontSize: '1.8rem', color: A1, lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: flip card */}
          <div className="ds-reveal flip-card-wrapper" style={{ height: 340 }}>
            <div className="flip-card" style={{ height: '100%' }}>
              <div className="flip-inner" style={{ height: '100%' }}>
                {/* Front */}
                <div className="flip-front" style={{ background: 'rgba(37,99,235,0.06)', border: `1px solid ${A1}22` }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: A1, marginBottom: '1rem' }}>Nossa missão</p>
                  <p style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.4, marginBottom: '1.5rem' }}>
                    Todo negócio merece uma presença digital profissional — independente do tamanho.
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                    Acreditamos que o gap entre o freelancer barato e a agência cara é onde os melhores negócios ficam invisíveis.
                  </p>
                  <p style={{ marginTop: '1.5rem', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>↕ hover para ver a stack</p>
                </div>

                {/* Back */}
                <div className="flip-back" style={{ background: 'rgba(14,165,233,0.06)', border: `1px solid ${A2}22` }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: A2, marginBottom: '1.2rem' }}>Nossa stack</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {['Next.js 15', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind v4', 'Vercel', 'WhatsApp API', 'Figma'].map(tech => (
                      <span key={tech} style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '999px',
                        border: `1px solid ${A2}33`,
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.7)',
                        background: `${A2}0a`,
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ──────────────────────────────────────────────────────────── */}
      <section id="servicos" style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', position: 'relative' }}>
        <div className="tech-grid-bg" />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label ds-reveal" style={{ marginBottom: '0.8rem' }}>Planos</p>
            <h2 className="ds-reveal ds-reveal-d1" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Escolha o que faz sentido<br />para o seu negócio
            </h2>
          </div>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              {
                name: 'Vitrine',
                badge: '1 página',
                price: 'R$ 1.200',
                desc: 'Ideal para autônomos e pequenos negócios que precisam marcar presença online rapidamente.',
                features: ['Design personalizado', 'Mobile 100%', 'WhatsApp CTA', 'SEO básico', 'Deploy + domínio', '30 dias de suporte'],
                cta: 'Quero a Vitrine',
                highlight: false,
              },
              {
                name: 'Pro',
                badge: 'até 5 páginas',
                price: 'R$ 2.800',
                desc: 'Para negócios que precisam de mais seções, maior conteúdo e uma presença mais robusta.',
                features: ['Tudo do Vitrine', 'Até 5 páginas', 'Animações avançadas', 'Formulário de contato', 'SEO avançado', '60 dias de suporte'],
                cta: 'Quero o Pro',
                highlight: true,
              },
              {
                name: 'E-commerce',
                badge: 'loja completa',
                price: 'R$ 4.500',
                desc: 'Loja virtual completa com catálogo, carrinho e pedidos direto pelo WhatsApp.',
                features: ['Tudo do Pro', 'Catálogo de produtos', 'Carrinho visual', 'Pedidos via WhatsApp', 'Filtros por categoria', '90 dias de suporte'],
                cta: 'Quero a Loja',
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`ds-reveal ds-reveal-d${i + 1}`}
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
                style={{
                  borderRadius: 16,
                  padding: '2rem',
                  border: plan.highlight ? `1px solid ${A1}55` : '1px solid rgba(255,255,255,0.07)',
                  background: plan.highlight ? `rgba(37,99,235,0.06)` : 'rgba(255,255,255,0.02)',
                  position: 'relative',
                  cursor: 'default',
                }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${A1}, ${A2})`,
                    color: '#050508', fontSize: '0.6rem', fontWeight: 800,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '0.25rem 1rem', borderRadius: '0 0 8px 8px',
                  }}>
                    Mais popular
                  </div>
                )}

                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.3rem' }}>{plan.badge}</p>
                <h3 style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ fontWeight: 800, fontSize: '2rem', color: A1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>{plan.price}</div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{plan.desc}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: A1, fontSize: '0.7rem' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={wa(`Olá! Tenho interesse no plano ${plan.name} (${plan.price}). Poderia me contar mais?`)}
                  target="_blank" rel="noopener noreferrer"
                  className={plan.highlight ? 'btn-primary' : 'btn-secondary'}
                  style={{ display: 'block', textAlign: 'center', width: '100%' }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFÓLIO ─────────────────────────────────────────────────────────── */}
      <section id="portfolio" style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label ds-reveal" style={{ marginBottom: '0.8rem' }}>Portfólio</p>
          <h2 className="ds-reveal ds-reveal-d1" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '2rem' }}>
            Navegue nos demos reais
          </h2>

          {/* Filter tabs */}
          <div className="ds-reveal ds-reveal-d2" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-tab${filter === cat ? ' active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="demos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((site, i) => (
            <div key={site.id} className={`demo-card ds-reveal ds-reveal-d${(i % 4) + 1}`}>
              {/* Thumbnail placeholder */}
              <div style={{
                height: 200,
                background: `linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(5,5,8,0.8) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800,
                  fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.15)',
                  textAlign: 'center',
                }}>
                  {site.name}
                </div>
                <span style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '999px', background: `${A1}22`, border: `1px solid ${A1}44`,
                  fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: A1,
                  letterSpacing: '0.1em',
                }}>
                  {site.category}
                </span>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>{site.name}</h3>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: A1 }}>
                    {formatPrice(site.price)}
                  </span>
                </div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
                  {site.description.length > 90 ? site.description.slice(0, 90) + '…' : site.description}
                </p>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <a
                    href={`/demo/${site.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', padding: '0.6rem 0.8rem' }}
                  >
                    Ver demo
                  </a>
                  <a
                    href={wa(`Olá! Tenho interesse no modelo "${site.name}" (${formatPrice(site.price)}). Como funciona?`)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', padding: '0.6rem 0.8rem' }}
                  >
                    Contratar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESSO ──────────────────────────────────────────────────────────── */}
      <section id="processo" style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', position: 'relative', background: 'rgba(37,99,235,0.02)' }}>
        <div className="tech-grid-bg" />
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label ds-reveal" style={{ marginBottom: '0.8rem' }}>Como funciona</p>
            <h2 className="ds-reveal ds-reveal-d1" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Do pedido ao ar vivo
            </h2>
          </div>

          <div className="process-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`ds-reveal ds-reveal-d${(i % 4) + 1}`}
                style={{ display: 'flex', gap: '1.5rem', paddingBottom: i < STEPS.length - 1 ? '2.5rem' : 0, position: 'relative' }}
              >
                {/* Line */}
                {i < STEPS.length - 1 && (
                  <div style={{
                    position: 'absolute', left: 19, top: 40,
                    width: 1, bottom: 0,
                    background: `linear-gradient(to bottom, ${A1}44, transparent)`,
                  }} />
                )}

                {/* Step number */}
                <div style={{
                  flexShrink: 0, width: 40, height: 40,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${A1}22, ${A2}22)`,
                  border: `1px solid ${A1}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700, fontSize: '0.7rem', color: A1,
                  letterSpacing: '0.1em',
                }}>
                  {step.n}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '0.5rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>{step.title}</h3>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE DUDUSTUDIO ────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vw, 8rem) 1.5rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label ds-reveal" style={{ marginBottom: '0.8rem' }}>Diferenciais</p>
          <h2 className="ds-reveal ds-reveal-d1" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Por que DuduStudio?
          </h2>
        </div>

        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {WHYS.map((why, i) => (
            <div key={why.title} className={`why-card ds-reveal ds-reveal-d${i + 1}`}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{why.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.6rem' }}>{why.title}</h3>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{why.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO ───────────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) 1.5rem',
        position: 'relative', overflow: 'hidden',
        background: 'rgba(37,99,235,0.03)',
        textAlign: 'center',
      }}>
        <div className="glow-orb" style={{ width: 600, height: 400, background: `${A1}12`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <p className="section-label ds-reveal" style={{ marginBottom: '1rem' }}>Vamos começar</p>
          <h2
            className="ds-reveal ds-reveal-d1"
            style={{ fontWeight: 800, fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}
          >
            Pronto para ter um site que{' '}
            <span className="gradient-text">vende de verdade?</span>
          </h2>
          <p className="ds-reveal ds-reveal-d2" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Me manda uma mensagem no WhatsApp. Sem formulário, sem chatbot — você fala direto com quem vai construir seu site.
          </p>
          <div className="ds-reveal ds-reveal-d3">
            <a
              href={wa('Olá! Quero um site para o meu negócio. Como funciona?')}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '1.1rem 3rem' }}
            >
              Falar no WhatsApp agora
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 1.5rem 2rem',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Dudu<span style={{ color: A1 }}>Studio</span>
            </div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: '28ch' }}>
              Sites prontos para pequenos negócios brasileiros. Rápido, acessível e profissional.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Navegação</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['#sobre', 'Sobre'], ['#servicos', 'Serviços'], ['#portfolio', 'Portfólio'], ['#processo', 'Processo']].map(([href, label]) => (
                <a key={href} href={href} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = A1)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Contato</p>
            <a
              href={wa('Olá!')}
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', color: A1, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              WhatsApp →
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} DuduStudio — Todos os direitos reservados
          </p>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.15)' }}>
            Feito com ☕ no Brasil
          </p>
        </div>
      </footer>
    </div>
  )
}
