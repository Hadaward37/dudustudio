'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'
import { sites, formatPrice } from '@/lib/sites'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#00ff88'
const ACCENT2 = '#7b61ff'

const CATEGORY_ACCENT: Record<string, string> = {
  Restaurante: '#ff6b35',
  Saúde: '#22d3ee',
  'E-commerce': '#8b5cf6',
  Confeitaria: '#f472b6',
  Petshop: '#00ff88',
  Serviços: '#f59e0b',
}

export default function TrabalhosPagina() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const navigateTo = (href: string) => {
    setLeaving(true)
    setTimeout(() => router.push(href), 320)
  }

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
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'var(--font-manrope), sans-serif',
        position: 'relative',
        overflowX: 'hidden',
        animation: leaving ? 'pageOut 0.32s ease forwards' : undefined,
      }}
    >
      {/* Subtle radial glow */}
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
          onClick={() => navigateTo('/sobre')}
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
          Dudu<span style={{ color: ACCENT }}>Studio</span>
        </button>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Início', action: () => navigateTo('/sobre') },
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

      {/* ── HERO DA PÁGINA ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: 'calc(60px + clamp(3rem, 8vw, 6rem))',
        paddingBottom: '2rem',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: ACCENT2,
          margin: '0 0 1rem',
          animation: 'fadeUp 0.6s ease 0.1s both',
        }}>
          Portfólio
        </p>

        <h1 style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: '0 0 1rem',
          animation: 'fadeUp 0.6s ease 0.2s both',
        }}>
          Nossos <span style={{ color: ACCENT }}>Trabalhos</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '48ch',
          lineHeight: 1.8,
          margin: '0 auto',
          animation: 'fadeUp 0.6s ease 0.3s both',
        }}>
          Navegue nos demos reais antes de decidir. Cada site é personalizado do zero para o seu negócio.
        </p>
      </section>

      {/* ── GRID DE DEMOS ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 8rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '1.25rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          {sites.map((site, idx) => {
            const accent = CATEGORY_ACCENT[site.category] ?? ACCENT
            const isHovered = hoveredCard === site.id
            return (
              <div
                key={site.id}
                onMouseEnter={() => setHoveredCard(site.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  border: `1px solid ${isHovered ? accent + '44' : 'rgba(255,255,255,0.07)'}`,
                  background: isHovered ? `${accent}07` : 'rgba(255,255,255,0.02)',
                  padding: '1.5rem',
                  cursor: 'default',
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 12px 40px ${accent}14` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  animation: `fadeUp 0.5s ease ${0.1 + idx * 0.07}s both`,
                }}
              >
                {/* Card top */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.18rem 0.55rem',
                      borderRadius: 999,
                      background: `${accent}15`,
                      border: `1px solid ${accent}28`,
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: accent,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-manrope)',
                      marginBottom: '0.5rem',
                    }}>
                      {site.category}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      letterSpacing: '-0.02em',
                      margin: 0,
                      color: '#fff',
                    }}>
                      {site.name}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>a partir de</div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1rem', color: accent, letterSpacing: '-0.02em' }}>
                      {formatPrice(site.price)}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 300,
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {site.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {site.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '0.18rem 0.55rem',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.05)',
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-manrope)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
                  <button
                    onClick={() => navigateTo(`/demo/${site.slug}`)}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0',
                      borderRadius: 8,
                      background: isHovered ? accent : 'rgba(255,255,255,0.06)',
                      color: isHovered ? '#080808' : 'rgba(255,255,255,0.8)',
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.25s, color 0.25s',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Ver demo →
                  </button>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no site modelo "${site.name}" (${formatPrice(site.price)}). Podemos conversar?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: 8,
                      background: 'transparent',
                      border: `1px solid ${accent}28`,
                      color: accent,
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.25s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${accent}12` }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    Quero este
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <p style={{
          fontFamily: 'var(--font-manrope)',
          fontWeight: 300,
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '1.5rem',
        }}>
          Não achou o que procurava? Criamos do zero também.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de criar um site personalizado para o meu negócio.')}`}
          target="_blank"
          rel="noopener noreferrer"
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
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Falar no WhatsApp
        </a>
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #00ff88; border-radius: 4px; }
      `}</style>
    </div>
  )
}
