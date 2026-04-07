'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#00ff88'

export default function SobrePage() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [visible, setVisible] = useState(false)

  const navigateTo = (href: string) => {
    setLeaving(true)
    setTimeout(() => router.push(href), 320)
  }

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`${syne.variable} ${manrope.variable}`}
      style={{
        background: '#080808',
        minHeight: '100dvh',
        color: '#fff',
        fontFamily: 'var(--font-manrope), sans-serif',
        position: 'relative',
        overflowX: 'hidden',
        animation: leaving ? 'pageOut 0.32s ease forwards' : undefined,
      }}
    >
      {/* Subtle radial glow — static, no movement */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${ACCENT}0a 0%, transparent 70%)`,
      }} />

      {/* Fine grain */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.025,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        height: 60,
        background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        <button
          onClick={() => navigateTo('/')}
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '-0.02em',
            color: '#fff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          DuduStudio
        </button>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Trabalhos', action: () => navigateTo('/trabalhos') },
            { label: 'Contato', action: () => { window.location.href = 'mailto:dudutorro1@gmail.com' } },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              style={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 400,
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.5)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                letterSpacing: '0.02em',
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        gap: '1.75rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: ACCENT,
          margin: 0,
        }}>
          Estúdio Digital — Brasil
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: 0,
          maxWidth: '14ch',
          color: '#fff',
        }}>
          Sites que fazem o seu cliente parar.
        </h1>

        {/* Divider line */}
        <div style={{
          width: 40,
          height: 1,
          background: `linear-gradient(to right, transparent, ${ACCENT}88, transparent)`,
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '42ch',
          lineHeight: 1.8,
          margin: 0,
        }}>
          Criamos experiências digitais para pequenos negócios que querem ser levados a sério.
          Do design ao deploy, tudo em um só lugar.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <button
            onClick={() => navigateTo('/trabalhos')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              background: ACCENT,
              color: '#080808',
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Ver nossos trabalhos
          </button>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.75rem',
              borderRadius: 8,
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-syne)',
              fontWeight: 600,
              fontSize: '0.85rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: 'clamp(2rem, 5vw, 4rem)',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { value: '5', label: 'sites no portfólio' },
            { value: '7d', label: 'prazo médio' },
            { value: '100%', label: 'mobile-first' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '0.3rem',
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 300,
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '2rem clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontWeight: 300,
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.2)',
          margin: 0,
          letterSpacing: '0.02em',
        }}>
          © 2025 DuduStudio · Feito com atenção aos detalhes
        </p>
      </footer>

      <style>{`
        @keyframes pageOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
