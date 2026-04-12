'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sites, formatPrice } from '@/lib/sites'
import { AquarioCanvas } from '@/components/ui/AquarioCanvas'
import { CustomCursor } from '@/components/ui/CustomCursor'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#2563EB'
const ACCENT2 = '#818cf8'

const CATEGORY_ACCENT: Record<string, string> = {
  Restaurante: '#ff6b35',
  Saúde: '#22d3ee',
  'E-commerce': '#8b5cf6',
  Confeitaria: '#f472b6',
  Petshop: '#4ade80',
  Serviços: '#f59e0b',
}

export default function TrabalhosPagina() {
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const navigateTo = (href: string) => {
    setLeaving(true)
    setTimeout(() => router.push(href), 320)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero entrance
    gsap.fromTo('.trab-hero-el',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: 'power3.out', delay: 0.1 }
    )

    // Cards staggered scroll reveal
    gsap.utils.toArray<HTMLElement>('.trab-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: (i % 3) * 0.08,
        }
      )
    })

    // CTA section
    gsap.fromTo('.trab-cta-el',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.trab-cta', start: 'top 80%' },
      }
    )

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div
      className={`${syne.variable} ${manrope.variable}`}
      style={{
        color: '#fff',
        fontFamily: 'var(--font-manrope), sans-serif',
        position: 'relative',
        overflowX: 'hidden',
        animation: leaving ? 'pageOut 0.32s ease forwards' : undefined,
      }}
    >
      <AquarioCanvas />
      <CustomCursor />

      {/* Overlay escuro para legibilidade */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.5) 0%, rgba(5,5,8,0.8) 100%)',
      }} />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 2,
        paddingTop: 'calc(80px + clamp(3rem, 8vw, 6rem))',
        paddingBottom: '2rem',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        textAlign: 'center',
      }}>
        <p className="trab-hero-el" style={{
          fontFamily: 'var(--font-manrope)', fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT2, margin: '0 0 1rem',
        }}>
          Portfólio
        </p>

        <h1 className="trab-hero-el" style={{
          fontFamily: 'var(--font-syne)', fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1,
          letterSpacing: '-0.03em', margin: '0 0 1rem',
        }}>
          Nossos{' '}
          <span style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #0EA5E9 50%, #818CF8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Trabalhos
          </span>
        </h1>

        <p className="trab-hero-el" style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', color: 'rgba(255,255,255,0.45)',
          maxWidth: '48ch', lineHeight: 1.8, margin: '0 auto',
        }}>
          Navegue nos demos reais antes de decidir. Cada site é personalizado do zero para o seu negócio.
        </p>

        {/* Scroll indicator */}
        <div className="trab-hero-el" style={{
          marginTop: '2.5rem', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.4rem',
        }}>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '0.55rem',
            letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase',
          }}>
            role para ver os demos
          </span>
          <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="rgba(37,99,235,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── GRID DE DEMOS ─────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 8rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '1.25rem', maxWidth: 1200, margin: '0 auto',
        }}>
          {sites.map((site) => {
            const accent = CATEGORY_ACCENT[site.category] ?? ACCENT
            const isHovered = hoveredCard === site.id
            return (
              <div
                key={site.id}
                className="trab-card"
                onMouseEnter={() => setHoveredCard(site.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative', borderRadius: 12,
                  border: `1px solid ${isHovered ? accent + '55' : 'rgba(255,255,255,0.08)'}`,
                  background: isHovered
                    ? `rgba(${accent === '#2563EB' ? '37,99,235' : '0,0,0'},0.12)`
                    : 'rgba(5,5,8,0.55)',
                  backdropFilter: 'blur(12px)',
                  padding: '1.5rem', cursor: 'default',
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s',
                  transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered ? `0 16px 48px ${accent}20` : '0 4px 20px rgba(0,0,0,0.3)',
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                }}
              >
                {/* Card top */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <span style={{
                      display: 'inline-block', padding: '0.18rem 0.55rem', borderRadius: 999,
                      background: `${accent}18`, border: `1px solid ${accent}30`,
                      fontSize: '0.68rem', fontWeight: 600, color: accent,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      fontFamily: 'var(--font-manrope)', marginBottom: '0.5rem',
                    }}>
                      {site.category}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-syne)', fontWeight: 700,
                      fontSize: '1.05rem', letterSpacing: '-0.02em', margin: 0, color: '#fff',
                    }}>
                      {site.name}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>
                      a partir de
                    </div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1rem', color: accent, letterSpacing: '-0.02em' }}>
                      {formatPrice(site.price)}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0,
                }}>
                  {site.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {site.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '0.18rem 0.55rem', borderRadius: 999,
                      background: 'rgba(255,255,255,0.06)', fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-manrope)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="trab-btn-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
                  <button
                    onClick={() => navigateTo(`/demo/${site.slug}`)}
                    style={{
                      flex: 1, padding: '0.6rem 0', borderRadius: 8,
                      background: isHovered
                        ? `linear-gradient(135deg, ${accent}, ${accent}cc)`
                        : 'rgba(255,255,255,0.07)',
                      color: isHovered ? '#fff' : 'rgba(255,255,255,0.8)',
                      fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '0.8rem',
                      border: 'none', cursor: 'pointer',
                      transition: 'background 0.25s, color 0.25s, box-shadow 0.25s',
                      boxShadow: isHovered ? `0 0 20px ${accent}44` : 'none',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Ver demo →
                  </button>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no site modelo "${site.name}" (${formatPrice(site.price)}). Podemos conversar?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '0.6rem 1rem', borderRadius: 8, background: 'transparent',
                      border: `1px solid ${accent}30`, color: accent,
                      fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '0.8rem',
                      textDecoration: 'none', cursor: 'pointer', transition: 'background 0.25s, border-color 0.25s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${accent}15`; e.currentTarget.style.borderColor = `${accent}66` }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${accent}30` }}
                  >
                    Quero este
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────────── */}
      <section className="trab-cta" style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,5,8,0.6)', backdropFilter: 'blur(8px)',
      }}>
        <p className="trab-cta-el" style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem',
        }}>
          Não achou o que procurava? Criamos do zero também.
        </p>
        <a
          className="trab-cta-el"
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de criar um site personalizado para o meu negócio.')}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.85rem 2rem', borderRadius: 8,
            background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
            color: '#fff', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '0.85rem',
            textDecoration: 'none', letterSpacing: '-0.01em', cursor: 'pointer',
            transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 0 24px rgba(37,99,235,0.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(37,99,235,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.3)' }}
        >
          💬 Falar no WhatsApp
        </a>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        padding: '2rem clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(5,5,8,0.8)',
      }}>
        <p style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.2)', margin: 0, letterSpacing: '0.02em',
        }}>
          © 2025 DuduStudio · Feito com atenção aos detalhes
        </p>
      </footer>

      <style>{`
        .trab-hero-el { opacity: 0; }
        .trab-card { opacity: 0; }
        .trab-cta-el { opacity: 0; }
        @keyframes pageOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 4px; }
        @media (max-width: 480px) {
          .trab-btn-row { flex-direction: column !important; }
          .trab-btn-row button, .trab-btn-row a { width: 100% !important; text-align: center; justify-content: center; }
        }
      `}</style>
    </div>
  )
}
