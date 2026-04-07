'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'
import { sites, formatPrice } from '@/lib/sites'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#00ff88'
const ACCENT2 = '#7b61ff'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

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

  // Custom cursor
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafCursor = useRef<number>(0)

  // Blob parallax
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  const navigateTo = (href: string) => {
    setLeaving(true)
    setTimeout(() => router.push(href), 380)
  }

  // Scroll nav + parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const s = window.scrollY
      if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${s * 0.08}px)`
      if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${s * 0.05}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cursor RAF
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseRef.current.x}px`
        dotRef.current.style.top = `${mouseRef.current.y}px`
      }
      ringPos.current.x = lerp(ringPos.current.x, mouseRef.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, mouseRef.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafCursor.current = requestAnimationFrame(animate)
    }
    rafCursor.current = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafCursor.current) }
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
        cursor: 'none',
        animation: leaving ? 'pageOut 0.38s ease forwards' : 'pageIn 0.5s ease forwards',
      }}
    >
      {/* Custom cursor */}
      <div ref={dotRef} style={{ position: 'fixed', width: 8, height: 8, borderRadius: '50%', background: ACCENT, pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)', }} />
      <div ref={ringRef} style={{ position: 'fixed', width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${ACCENT}`, pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)', opacity: 0.5, }} />

      {/* Grain */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.03, pointerEvents: 'none', zIndex: 1, }} />

      {/* Blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div ref={blob1Ref} style={{ position: 'absolute', width: '50vw', height: '50vw', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%', background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)`, top: '-8vw', right: '-8vw', animation: 'blob1 20s ease-in-out infinite', filter: 'blur(70px)', }} />
        <div ref={blob2Ref} style={{ position: 'absolute', width: '45vw', height: '45vw', borderRadius: '40% 60% 30% 70% / 70% 30% 60% 40%', background: `radial-gradient(circle, ${ACCENT2}14 0%, transparent 70%)`, bottom: '10vw', left: '-10vw', animation: 'blob2 25s ease-in-out infinite', filter: 'blur(80px)', }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.5rem, 5vw, 4rem)', height: 64, background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(14px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all 0.4s', }}>
        <button onClick={() => navigateTo('/sobre')} style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff', background: 'none', border: 'none', cursor: 'none', }}>
          DuduStudio
        </button>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Início', action: () => navigateTo('/sobre') },
            { label: 'Contato', action: () => { window.location.href = 'mailto:dudutorro1@gmail.com' } },
          ].map(({ label, action }) => (
            <button key={label} onClick={action} style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 400, fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'none', transition: 'color 0.2s', letterSpacing: '0.01em', }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO DA PÁGINA ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 10, paddingTop: 'calc(64px + clamp(3rem, 8vw, 6rem))', paddingBottom: '2rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', textAlign: 'center', }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.9rem', borderRadius: 999, border: `1px solid ${ACCENT2}44`, background: `${ACCENT2}0d`, marginBottom: '1.5rem', animation: 'fadeUp 0.6s ease 0.1s both', }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: ACCENT2, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-manrope)' }}>
            Portfólio
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 1rem', animation: 'fadeUp 0.6s ease 0.2s both', }}>
          Nossos{' '}
          <span style={{ color: ACCENT }}>Trabalhos</span>
        </h1>

        <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.5)', maxWidth: 520, lineHeight: 1.75, margin: '0 auto', animation: 'fadeUp 0.6s ease 0.3s both', }}>
          Navegue nos demos reais antes de decidir. Cada site é personalizado do zero para o seu negócio.
        </p>
      </section>

      {/* ── GRID DE DEMOS ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 10, padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 8rem)', }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', maxWidth: 1200, margin: '0 auto', }}>
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
                  borderRadius: 16,
                  border: `1px solid ${isHovered ? accent + '55' : 'rgba(255,255,255,0.08)'}`,
                  background: isHovered ? `${accent}08` : 'rgba(255,255,255,0.03)',
                  padding: '1.75rem',
                  cursor: 'none',
                  transition: 'border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 16px 48px ${accent}18` : '0 0 0 transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  animation: `fadeUp 0.5s ease ${0.1 + idx * 0.08}s both`,
                }}
              >
                {/* Card top */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <span style={{ display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: 999, background: `${accent}18`, border: `1px solid ${accent}33`, fontSize: '0.7rem', fontWeight: 600, color: accent, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-manrope)', marginBottom: '0.6rem', }}>
                      {site.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em', margin: 0, color: '#fff', }}>
                      {site.name}
                    </h3>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>a partir de</div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.1rem', color: accent, letterSpacing: '-0.02em' }}>
                      {formatPrice(site.price)}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0, }}>
                  {site.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {site.tags.map(tag => (
                    <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: 999, background: 'rgba(255,255,255,0.06)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-manrope)', }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
                  <button
                    onClick={() => navigateTo(`/demo/${site.slug}`)}
                    style={{ flex: 1, padding: '0.65rem 0', borderRadius: 10, background: isHovered ? accent : 'rgba(255,255,255,0.06)', color: isHovered ? '#080808' : '#fff', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '0.82rem', border: 'none', cursor: 'none', transition: 'background 0.3s, color 0.3s', letterSpacing: '-0.01em', }}
                  >
                    Ver demo →
                  </button>
                  <a
                    href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(`Olá! Tenho interesse no site modelo "${site.name}" (${formatPrice(site.price)}). Podemos conversar?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '0.65rem 1rem', borderRadius: 10, background: 'transparent', border: `1px solid ${accent}33`, color: accent, fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', cursor: 'none', transition: 'border-color 0.3s, background 0.3s', whiteSpace: 'nowrap', }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${accent}15` }}
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

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', borderTop: '1px solid rgba(255,255,255,0.06)', }}>
        <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', }}>
          Não achou o que procurava? Criamos do zero também.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de criar um site personalizado para o meu negócio.')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 999, background: ACCENT, color: '#080808', fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', letterSpacing: '-0.01em', boxShadow: `0 0 32px ${ACCENT}44`, cursor: 'none', }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 0 48px ${ACCENT}66` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 32px ${ACCENT}44` }}
        >
          Falar no WhatsApp →
        </a>
      </section>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem clamp(1.5rem, 5vw, 4rem)', borderTop: '1px solid rgba(255,255,255,0.06)', }}>
        <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0, }}>
          © 2025 DuduStudio · Feito com atenção aos detalhes
        </p>
      </footer>

      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pageOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-12px); }
        }
        @keyframes blob1 {
          0%,100% { border-radius:60% 40% 70% 30%/50% 60% 40% 70%; }
          50%      { border-radius:40% 60% 30% 70%/60% 40% 70% 30%; }
        }
        @keyframes blob2 {
          0%,100% { border-radius:40% 60% 30% 70%/70% 30% 60% 40%; }
          50%      { border-radius:60% 40% 70% 30%/30% 70% 40% 60%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
