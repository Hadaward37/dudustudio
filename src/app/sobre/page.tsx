'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'
import { sites, formatPrice } from '@/lib/sites'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#00ff88'
const ACCENT2 = '#7b61ff'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const TITLE_WORDS_1 = ['Sites', 'que', 'Param', 'o', 'Scroll.']
const TITLE_WORDS_2 = ['Criando', 'o', 'Inesperado.']

// accent cor por categoria
const CATEGORY_ACCENT: Record<string, string> = {
  Restaurante: '#ff6b35',
  Saúde: '#22d3ee',
  'E-commerce': '#8b5cf6',
  Confeitaria: '#f472b6',
  Petshop: '#00ff88',
  Serviços: '#f59e0b',
}

export default function SobrePage() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [wordsVisible1, setWordsVisible1] = useState<boolean[]>(Array(TITLE_WORDS_1.length).fill(false))
  const [wordsVisible2, setWordsVisible2] = useState<boolean[]>(Array(TITLE_WORDS_2.length).fill(false))
  const [badgeVisible, setBadgeVisible] = useState(false)
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
  const blob3Ref = useRef<HTMLDivElement>(null)

  // Navigate with exit transition
  const navigateTo = (href: string) => {
    setLeaving(true)
    setTimeout(() => router.push(href), 380)
  }

  // Scroll nav + parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const s = window.scrollY
      if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${s * 0.1}px)`
      if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${s * 0.06}px)`
      if (blob3Ref.current) blob3Ref.current.style.transform = `translateY(${s * 0.04}px)`
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

  // Stagger word reveal
  useEffect(() => {
    const t0 = setTimeout(() => setBadgeVisible(true), 200)
    const t1 = TITLE_WORDS_1.map((_, i) =>
      setTimeout(() => setWordsVisible1(prev => { const n = [...prev]; n[i] = true; return n }), 500 + i * 100)
    )
    const t2 = TITLE_WORDS_2.map((_, i) =>
      setTimeout(() => setWordsVisible2(prev => { const n = [...prev]; n[i] = true; return n }), 1000 + i * 100)
    )
    return () => { clearTimeout(t0); t1.forEach(clearTimeout); t2.forEach(clearTimeout) }
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

      {/* Liquid blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div ref={blob1Ref} style={{ position: 'absolute', width: '55vw', height: '55vw', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%', background: `radial-gradient(circle, ${ACCENT}15 0%, transparent 70%)`, top: '-10vw', left: '-10vw', animation: 'blob1 18s ease-in-out infinite', filter: 'blur(60px)', }} />
        <div ref={blob2Ref} style={{ position: 'absolute', width: '50vw', height: '50vw', borderRadius: '40% 60% 30% 70% / 70% 30% 60% 40%', background: `radial-gradient(circle, ${ACCENT2}18 0%, transparent 70%)`, top: '15vw', right: '-12vw', animation: 'blob2 22s ease-in-out infinite', filter: 'blur(70px)', }} />
        <div ref={blob3Ref} style={{ position: 'absolute', width: '40vw', height: '40vw', borderRadius: '70% 30% 50% 50% / 30% 70% 50% 50%', background: 'radial-gradient(circle, #ff6b3518 0%, transparent 70%)', bottom: '10vw', left: '25vw', animation: 'blob3 26s ease-in-out infinite', filter: 'blur(80px)', }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(1.5rem, 5vw, 4rem)', height: 64, background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(14px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all 0.4s', }}>
        <button onClick={() => navigateTo('/')} style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff', background: 'none', border: 'none', cursor: 'none', }}>
          DuduStudio
        </button>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Início', action: () => navigateTo('/') },
            { label: 'Sites', action: () => { const el = document.getElementById('sites'); el?.scrollIntoView({ behavior: 'smooth' }) } },
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

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(1.5rem, 5vw, 4rem)', paddingTop: 80, }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 999, border: `1px solid ${ACCENT}44`, background: `${ACCENT}0d`, marginBottom: '2rem', opacity: badgeVisible ? 1 : 0, transform: badgeVisible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.6s, transform 0.6s', }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite', }} />
          <span style={{ fontFamily: 'var(--font-manrope), sans-serif', fontSize: '0.75rem', fontWeight: 600, color: ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Estúdio Digital
          </span>
        </div>

        {/* Title line 1 */}
        <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, marginBottom: '0.2em', color: '#fff', }}>
          {TITLE_WORDS_1.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', marginRight: '0.22em', opacity: wordsVisible1[i] ? 1 : 0, transform: wordsVisible1[i] ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s, transform 0.5s', }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Title line 2 */}
        <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, marginBottom: '1.5rem', color: ACCENT, }}>
          {TITLE_WORDS_2.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', marginRight: '0.22em', opacity: wordsVisible2[i] ? 1 : 0, transform: wordsVisible2[i] ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s, transform 0.5s', }}>
              {word}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 300, fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.75, margin: '0 auto 2.5rem', }}>
          Cada negócio merece um site único. Criamos experiências digitais personalizadas
          que fazem seu cliente parar, olhar e comprar.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => { const el = document.getElementById('sites'); el?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 999, background: ACCENT, color: '#080808', fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'none', letterSpacing: '-0.01em', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 0 32px ${ACCENT}44`, }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 0 48px ${ACCENT}66` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 32px ${ACCENT}44` }}
          >
            Ver nosso trabalho →
          </button>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', borderRadius: 999, background: 'transparent', color: '#fff', fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', letterSpacing: '-0.01em', border: '1px solid rgba(255,255,255,0.2)', transition: 'border-color 0.2s, transform 0.2s', }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Falar no WhatsApp →
          </a>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35, animation: 'fadeUp 1s ease 1.8s both', }}>
          <span style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #fff, transparent)', animation: 'scrollLine 1.5s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── SITES GRID ─────────────────────────────────────────── */}
      <section id="sites" style={{ position: 'relative', zIndex: 10, padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)', }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.9rem', borderRadius: 999, border: `1px solid ${ACCENT2}44`, background: `${ACCENT2}0d`, marginBottom: '1.2rem', }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: ACCENT2, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-manrope)' }}>
              Portfólio
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', margin: '0 0 0.75rem', }}>
            Cada site é uma experiência.
          </h2>
          <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, }}>
            Navegue nos demos reais antes de decidir. Personalizamos tudo para o seu negócio.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', maxWidth: 1200, margin: '0 auto', }}>
          {sites.map((site) => {
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

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '3rem clamp(1.5rem, 5vw, 4rem)', borderTop: '1px solid rgba(255,255,255,0.06)', }}>
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
          0%,100% { border-radius:60% 40% 70% 30%/50% 60% 40% 70%; transform:translate(0,0) scale(1); }
          33%      { border-radius:40% 60% 30% 70%/60% 40% 70% 30%; transform:translate(3vw,2vw) scale(1.05); }
          66%      { border-radius:70% 30% 60% 40%/40% 70% 30% 60%; transform:translate(-2vw,4vw) scale(0.95); }
        }
        @keyframes blob2 {
          0%,100% { border-radius:40% 60% 30% 70%/70% 30% 60% 40%; transform:translate(0,0) scale(1); }
          33%      { border-radius:60% 40% 70% 30%/30% 70% 40% 60%; transform:translate(-4vw,2vw) scale(1.08); }
          66%      { border-radius:30% 70% 50% 50%/50% 50% 70% 30%; transform:translate(2vw,-3vw) scale(0.92); }
        }
        @keyframes blob3 {
          0%,100% { border-radius:70% 30% 50% 50%/30% 70% 50% 50%; transform:translate(0,0) scale(1); }
          50%      { border-radius:30% 70% 40% 60%/60% 40% 70% 30%; transform:translate(-3vw,-2vw) scale(1.1); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scrollLine {
          0%   { opacity:0; transform:scaleY(0); transform-origin:top; }
          50%  { opacity:1; transform:scaleY(1); transform-origin:top; }
          100% { opacity:0; transform:scaleY(1); transform-origin:bottom; }
        }
      `}</style>
    </div>
  )
}
