'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AquarioCanvas } from '@/components/ui/AquarioCanvas'
import { CustomCursor } from '@/components/ui/CustomCursor'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#2563EB'

export default function SobrePage() {
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)

  const navigateTo = (href: string) => {
    setLeaving(true)
    setTimeout(() => router.push(href), 320)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Entrada do hero
    gsap.fromTo(
      '.sobre-reveal',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.13, ease: 'power3.out', delay: 0.1 }
    )

    // Stat items
    gsap.fromTo(
      '.sobre-stat',
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.sobre-stats', start: 'top 85%' } }
    )

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
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
      <AquarioCanvas />
      <CustomCursor />

      {/* Overlay escuro */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.5) 0%, rgba(5,5,8,0.82) 100%)',
      }} />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', zIndex: 2,
        minHeight: '100dvh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(80px + 3rem) clamp(1.5rem, 6vw, 5rem) 4rem',
        gap: '1.75rem',
      }}>

        {/* Eyebrow */}
        <p className="sobre-reveal" style={{
          fontFamily: 'var(--font-manrope)', fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, margin: 0,
        }}>
          Estúdio Digital — Brasil
        </p>

        {/* Headline */}
        <h1 className="sobre-reveal" style={{
          fontFamily: 'var(--font-syne)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1,
          letterSpacing: '-0.03em', margin: 0, maxWidth: '14ch',
        }}>
          Sites que fazem o seu cliente parar.
        </h1>

        {/* Divider */}
        <div className="sobre-reveal" style={{
          width: 40, height: 1,
          background: `linear-gradient(to right, transparent, ${ACCENT}88, transparent)`,
        }} />

        {/* Subtitle */}
        <p className="sobre-reveal" style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', color: 'rgba(255,255,255,0.45)',
          maxWidth: '42ch', lineHeight: 1.8, margin: 0,
        }}>
          Criamos experiências digitais para pequenos negócios que querem ser levados a sério.
          Do design ao deploy, tudo em um só lugar.
        </p>

        {/* CTAs */}
        <div className="sobre-reveal sobre-cta-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigateTo('/trabalhos')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.75rem 1.75rem', borderRadius: 8,
              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              color: '#fff', fontFamily: 'var(--font-syne)',
              fontWeight: 700, fontSize: '0.85rem', border: 'none',
              cursor: 'pointer', letterSpacing: '-0.01em',
              transition: 'opacity 0.2s, transform 0.2s',
              boxShadow: '0 0 24px rgba(37,99,235,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Ver nossos trabalhos
          </button>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.75rem 1.75rem', borderRadius: 8,
              background: 'transparent', color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '0.85rem',
              textDecoration: 'none', letterSpacing: '-0.01em',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div className="sobre-stats" style={{
          display: 'flex', gap: 'clamp(2rem, 5vw, 4rem)',
          marginTop: '2rem', paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { value: '6', label: 'sites no portfólio' },
            { value: '7d', label: 'prazo médio' },
            { value: '100%', label: 'mobile-first' },
          ].map(({ value, label }) => (
            <div key={label} className="sobre-stat" style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-syne)', fontWeight: 800,
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: ACCENT,
                letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.3rem',
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: '2rem clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.2)', margin: 0, letterSpacing: '0.02em',
        }}>
          © 2025 DuduStudio · Feito com atenção aos detalhes
        </p>
      </footer>

      <style>{`
        @keyframes pageOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        .sobre-reveal { opacity: 0; }
        @media (max-width: 480px) {
          .sobre-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .sobre-cta-row button, .sobre-cta-row a { width: 100% !important; justify-content: center !important; }
          .sobre-stats { gap: 1.5rem !important; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 4px; }
      `}</style>
    </div>
  )
}
