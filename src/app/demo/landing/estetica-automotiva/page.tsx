'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Rajdhani, Barlow, Space_Mono } from 'next/font/google'

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-rajdhani' })
const barlow = Barlow({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-barlow' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })

const WA = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511999999999'
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
const MSG_AGENDAR = 'Olá! Vim pelo site e gostaria de agendar um serviço na JR Estética Automotiva.'

// ─── Cores ───────────────────────────────────────────────────────────────────
const C = {
  bg: '#050505',
  surface: '#0f0f0f',
  card: '#141414',
  red: '#CC0000',
  redVivo: '#FF0000',
  prata: '#C0C0C0',
  prataClaro: '#E8E8E8',
  cromado: '#A8A8A8',
  text: '#F0F0F0',
  muted: '#888888',
  border: 'rgba(204,0,0,0.15)',
  borderPrata: 'rgba(192,192,192,0.10)',
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// ─── Hook: scroll reveal ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.jr-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).style.opacity = '1'
            ;(e.target as HTMLElement).style.transform = 'translateY(0)'
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Hook: número animado ─────────────────────────────────────────────────────
function useCounter(target: number, suffix: string, duration = 2000) {
  const [val, setVal] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            setVal(Math.round(ease * target).toString())
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { ref, display: val + suffix }
}

// ─── Serviços ─────────────────────────────────────────────────────────────────
const SERVICOS = [
  { n: '01', nome: 'Lavagem Técnica', desc: 'Lavagem detalhada com espuma ativa, descontaminação e secagem técnica sem riscos.', preco: 'A partir de R$ 80' },
  { n: '02', nome: 'Polimento Automotivo', desc: 'Correção de riscos, oxidação e imperfeições. Verniz nivelado e brilho restaurado.', preco: 'A partir de R$ 350' },
  { n: '03', nome: 'Vitrificação Cerâmica', desc: 'Proteção por até 3 anos com revestimento cerâmico de alta resistência UV e química.', preco: 'A partir de R$ 800' },
  { n: '04', nome: 'Higienização Interna', desc: 'Limpeza completa do interior: bancos, painel, carpetes e remoção de odores.', preco: 'A partir de R$ 150' },
  { n: '05', nome: 'Cristalização de Vidros', desc: 'Remove chuva ácida e manchas incrustadas. Vidros cristalinos com efeito hidrofóbico.', preco: 'A partir de R$ 120' },
  { n: '06', nome: 'Full Detail', desc: 'Serviço completo: lavagem + polimento + higienização + vitrificação. O pacote definitivo.', preco: 'A partir de R$ 1.200' },
]

const GALLERY = [
  { foto: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&q=80', label: 'Polimento Automotivo' },
  { foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', label: 'Higienização Interna' },
  { foto: 'https://images.unsplash.com/photo-1600707483778-e6da56716e61?w=400&q=80', label: 'Lavagem Técnica' },
]

const DEPOIMENTOS = [
  { texto: 'Trouxe meu BMW depois de 2 anos sem polimento. Ficou como novo — brilho de concessionária. Profissionalismo de outro nível.', nome: 'Carlos M.', servico: 'Polimento Completo' },
  { texto: 'Vitrificação impecável. Já passou de 1 ano e a água ainda escorre sem deixar mancha. Vale muito o investimento.', nome: 'Rafael S.', servico: 'Vitrificação Cerâmica' },
  { texto: 'Meu carro fedendo a cigarro. Depois da higienização pareceu outro carro por dentro. Rápido, barato e muito bem feito.', nome: 'Fernanda L.', servico: 'Higienização Interna' },
]

// ─── Componente contador ──────────────────────────────────────────────────────
function Counter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, display } = useCounter(target, suffix)
  return (
    <div ref={ref} style={{ textAlign: 'center', flex: 1 }}>
      <div style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(2.8rem,5vw,4.5rem)', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {display}
      </div>
      <div style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JREsteticaPage() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovService, setHovService] = useState<number | null>(null)
  const [hovDepo, setHovDepo] = useState<number | null>(null)

  // Custom cursor
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafCursor = useRef<number>(0)
  const onCta = useRef(false)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseRef.current.x}px`
        dotRef.current.style.top = `${mouseRef.current.y}px`
        dotRef.current.style.background = onCta.current ? '#fff' : C.red
      }
      ringPos.current.x = lerp(ringPos.current.x, mouseRef.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, mouseRef.current.y, 0.1)
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafCursor.current = requestAnimationFrame(animate)
    }
    rafCursor.current = requestAnimationFrame(animate)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafCursor.current) }
  }, [])

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const revealStyle: React.CSSProperties = {
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  }

  return (
    <div
      className={`${rajdhani.variable} ${barlow.variable} ${spaceMono.variable}`}
      style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-barlow)', cursor: 'none', overflowX: 'hidden' }}
    >
      {/* ── Custom cursor ── */}
      <div ref={dotRef} style={{ position: 'fixed', width: 7, height: 7, borderRadius: '50%', background: C.red, pointerEvents: 'none', zIndex: 9999, transform: 'translate(-50%,-50%)', transition: 'background 0.2s' }} />
      <div ref={ringRef} style={{ position: 'fixed', width: 30, height: 30, borderRadius: '50%', border: `1.5px solid ${C.prata}`, opacity: 0.5, pointerEvents: 'none', zIndex: 9998, transform: 'translate(-50%,-50%)' }} />

      {/* ── WhatsApp flutuante ── */}
      <a
        href={waLink(MSG_AGENDAR)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => { onCta.current = true }}
        onMouseLeave={() => { onCta.current = false }}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 500,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#25D366', color: '#fff',
          fontFamily: 'var(--font-barlow)', fontWeight: 600, fontSize: '0.85rem',
          padding: '0.75rem 1.25rem', borderRadius: 0, textDecoration: 'none',
          cursor: 'none', letterSpacing: '0.01em',
          animation: 'pulse-btn 2.5s ease-in-out infinite',
          boxShadow: '0 4px 24px rgba(37,211,102,0.3)',
        }}
      >
        💬 Falar agora
      </a>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.25rem,5vw,4rem)', height: 64,
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        transition: 'all 0.4s',
      }}>
        <Image
          src="/logos/jr-estetica.jpg"
          alt="JR Estética Automotiva"
          width={160}
          height={60}
          style={{ objectFit: 'contain' }}
        />

        {/* Desktop nav */}
        <div className="jr-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Serviços', 'Galeria', 'Depoimentos', 'Contato'].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              onMouseEnter={() => { onCta.current = false }}
              style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: '0.82rem', color: C.muted, background: 'none', border: 'none', cursor: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              onFocus={e => (e.currentTarget.style.color = '#fff')}
            >
              {l}
            </button>
          ))}
          <a
            href={waLink(MSG_AGENDAR)}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => { onCta.current = true }}
            onMouseLeave={() => { onCta.current = false }}
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 500, fontSize: '0.82rem', color: '#fff', background: C.red, padding: '0.5rem 1.2rem', textDecoration: 'none', cursor: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background 0.2s' }}
          >
            Agendar agora
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="jr-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'none', display: 'none', flexDirection: 'column', gap: 5, padding: 4 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, background: menuOpen ? C.red : C.prata, transition: 'background 0.2s' }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(5,5,5,0.98)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          {['Serviços', 'Galeria', 'Depoimentos', 'Contato'].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: '2rem', color: '#fff', background: 'none', border: 'none', cursor: 'none', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {l}
            </button>
          ))}
          <a href={waLink(MSG_AGENDAR)} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-barlow)', fontWeight: 600, fontSize: '1rem', color: '#fff', background: C.red, padding: '0.85rem 2rem', textDecoration: 'none', cursor: 'none', marginTop: '1rem' }}>
            Agendar agora
          </a>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 1 — HERO
      ══════════════════════════════════════════════════════ */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Foto fundo */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1600&q=85"
            alt=""
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(5,5,5,0.92) 0%,rgba(5,5,5,0.70) 50%,rgba(5,5,5,0.85) 100%)' }} />
        </div>

        {/* Grid técnico */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        {/* Linha vertical vermelha */}
        <div style={{ position: 'absolute', left: '8%', top: '20%', width: 2, height: '60%', background: `linear-gradient(to bottom, transparent, ${C.red}, transparent)`, animation: 'lineGrow 1.5s ease forwards', transformOrigin: 'top' }} />

        {/* Conteúdo principal */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 clamp(1.25rem,6vw,5rem)', paddingTop: 80, gap: '3rem', flexWrap: 'wrap' }}>

          {/* Esquerda */}
          <div style={{ flex: '1 1 480px', maxWidth: 620 }}>

            {/* Badge */}
            <div className="jr-reveal" style={{ ...revealStyle, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', background: 'rgba(204,0,0,0.12)', border: `1px solid rgba(204,0,0,0.4)`, marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.78rem', fontWeight: 500, color: C.red, letterSpacing: '0.06em', textTransform: 'uppercase' }}>⚡ Detalhamento Automotivo Premium</span>
            </div>

            {/* Título */}
            <div className="jr-reveal" style={{ ...revealStyle, transitionDelay: '0.1s' }}>
              <p style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: '1.1rem', color: C.prata, letterSpacing: '0.4em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>
                SEU CARRO
              </p>
              <h1 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(3.5rem,9vw,9rem)', lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
                MERECE
              </h1>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h1 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(3.5rem,9vw,9rem)', lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0, color: C.red }}>
                  BRILHAR.
                </h1>
                {/* Reflexo */}
                <div aria-hidden="true" style={{ position: 'absolute', top: '100%', left: 0, right: 0, fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(3.5rem,9vw,9rem)', lineHeight: 0.95, letterSpacing: '-0.02em', color: C.red, transform: 'scaleY(-1)', opacity: 0.12, maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)', pointerEvents: 'none', userSelect: 'none' }}>
                  BRILHAR.
                </div>
              </div>
            </div>

            {/* Subtítulo */}
            <p className="jr-reveal" style={{ ...revealStyle, transitionDelay: '0.2s', fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: 'clamp(0.9rem,1.5vw,1.05rem)', color: C.muted, maxWidth: '44ch', lineHeight: 1.75, margin: '2rem 0 2.25rem' }}>
              Do polimento profissional à vitrificação cerâmica.<br />
              Cada detalhe tratado com precisão e cuidado absoluto.
            </p>

            {/* CTAs */}
            <div className="jr-reveal" style={{ ...revealStyle, transitionDelay: '0.3s', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <a
                href={waLink(MSG_AGENDAR)}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={e => { onCta.current = true; e.currentTarget.style.background = C.redVivo; e.currentTarget.style.boxShadow = '0 0 30px rgba(204,0,0,0.5)' }}
                onMouseLeave={e => { onCta.current = false; e.currentTarget.style.background = C.red; e.currentTarget.style.boxShadow = 'none' }}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 500, fontSize: '0.95rem', color: '#fff', background: C.red, padding: '1rem 2.5rem', textDecoration: 'none', cursor: 'none', letterSpacing: '0.02em', transition: 'background 0.2s, box-shadow 0.2s', display: 'inline-block' }}
              >
                Agendar Agora →
              </a>
              <button
                onClick={() => scrollTo('serviços')}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(192,192,192,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: '0.95rem', color: C.prata, background: 'transparent', border: `1px solid ${C.prata}`, padding: '1rem 2rem', cursor: 'none', letterSpacing: '0.02em', transition: 'background 0.2s' }}
              >
                Ver serviços ↓
              </button>
            </div>

            {/* Stats */}
            <div className="jr-reveal" style={{ ...revealStyle, transitionDelay: '0.4s', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {['500+ Carros', '5★ Avaliação', '3 Anos', 'SP'].map((s, i) => (
                <span key={s} style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.7rem', color: C.muted, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  {s}
                  {i < 3 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1rem' }}>|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Direita — card flutuante */}
          <div className="jr-reveal" style={{ ...revealStyle, transitionDelay: '0.5s', flex: '0 0 auto', width: 'clamp(260px,30vw,320px)', background: 'rgba(20,20,20,0.82)', border: `1px solid rgba(204,0,0,0.3)`, backdropFilter: 'blur(12px)', borderRadius: 8, padding: '1.75rem', animation: 'floatA 4s ease-in-out infinite' }}>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 500, fontSize: '0.85rem', color: '#fff', margin: '0 0 0.4rem' }}>✓ Próximo horário disponível</p>
            <p style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: '1.3rem', color: C.red, margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
              Hoje — Agenda aberta <span style={{ fontSize: '0.85rem' }}>🟢</span>
            </p>
            <div style={{ height: 1, background: `linear-gradient(to right, ${C.red}, transparent)`, marginBottom: '1rem' }} />
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '0.78rem', color: C.muted, margin: '0 0 1.25rem' }}>Resposta em até 1 hora</p>
            <a
              href={waLink(MSG_AGENDAR)}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => { onCta.current = true }}
              onMouseLeave={() => { onCta.current = false }}
              style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-barlow)', fontWeight: 600, fontSize: '0.82rem', color: '#fff', background: C.red, padding: '0.65rem 0', textDecoration: 'none', cursor: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background 0.2s' }}
            >
              Reservar horário
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.3 }}>
          <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${C.red}, transparent)`, animation: 'scrollLine 1.5s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 2 — SERVIÇOS
      ══════════════════════════════════════════════════════ */}
      <section id="serviços" style={{ background: C.surface, padding: 'clamp(4rem,8vw,8rem) clamp(1.25rem,6vw,5rem)' }}>
        <div className="jr-reveal" style={{ ...revealStyle, marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', color: C.red, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>SERVIÇOS</p>
          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>O que fazemos</h2>
          <div style={{ width: 40, height: 3, background: C.red, marginTop: '0.75rem' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: '1rem', maxWidth: 1200, margin: '0 auto' }}>
          {SERVICOS.map((s, i) => (
            <div
              key={s.n}
              className="jr-reveal"
              onMouseEnter={() => setHovService(i)}
              onMouseLeave={() => setHovService(null)}
              style={{
                ...revealStyle,
                transitionDelay: `${i * 0.07}s`,
                position: 'relative',
                background: C.card,
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${hovService === i ? C.redVivo : C.red}`,
                borderRadius: 4,
                padding: '1.75rem',
                cursor: 'none',
                transform: hovService === i ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                overflow: 'hidden',
              }}
            >
              {/* Número decorativo */}
              <div aria-hidden="true" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: '5rem', color: 'rgba(204,0,0,0.08)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                {s.n}
              </div>
              <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: C.red, letterSpacing: '0.12em', margin: '0 0 0.5rem' }}>{s.n}</p>
              <h3 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: '1.2rem', color: '#fff', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>{s.nome}</h3>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '0.83rem', color: C.muted, lineHeight: 1.65, margin: '0 0 1rem' }}>{s.desc}</p>
              <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.72rem', color: C.red, margin: '0 0 0.5rem' }}>{s.preco}</p>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: '0.78rem', color: C.cromado }}>Saiba mais →</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 3 — ANTES E DEPOIS
      ══════════════════════════════════════════════════════ */}
      <section id="galeria" style={{ background: C.bg, padding: 'clamp(4rem,8vw,8rem) clamp(1.25rem,6vw,5rem)' }}>
        <div className="jr-reveal" style={{ ...revealStyle, textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#fff', letterSpacing: '-0.02em', margin: '0 0 0.4rem' }}>Resultados</h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '1rem', color: C.muted }}>Antes e depois de cada serviço</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,320px),1fr))', gap: '1.25rem', maxWidth: 1100, margin: '0 auto' }}>
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className="jr-reveal"
              style={{ ...revealStyle, transitionDelay: `${i * 0.1}s`, background: C.card, borderRadius: 6, overflow: 'hidden', border: `1px solid ${C.border}`, cursor: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.red }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}
            >
              <div style={{ display: 'flex', height: 180 }}>
                {/* ANTES */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.foto} alt="Antes" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(80%) brightness(0.7)' }} />
                  <div style={{ position: 'absolute', bottom: 6, left: 8, fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', background: 'rgba(0,0,0,0.5)', padding: '2px 6px' }}>ANTES</div>
                </div>
                {/* Linha divisória */}
                <div style={{ width: 2, background: C.red, flexShrink: 0, zIndex: 2 }} />
                {/* DEPOIS */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.foto} alt="Depois" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.3) brightness(1.1)' }} />
                  <div style={{ position: 'absolute', bottom: 6, right: 8, fontFamily: 'var(--font-space-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', background: `rgba(204,0,0,0.7)`, padding: '2px 6px' }}>DEPOIS</div>
                </div>
              </div>
              <div style={{ padding: '0.9rem 1rem' }}>
                <p style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: '0.95rem', color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{g.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 4 — NÚMEROS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: C.red, padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,6vw,5rem)' }}>
        <div style={{ display: 'flex', gap: 'clamp(2rem,5vw,4rem)', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1000, margin: '0 auto' }}>
          <Counter target={500} suffix="+" label="Carros atendidos" />
          <Counter target={98} suffix="%" label="Clientes voltam" />
          <Counter target={3} suffix=" anos" label="No mercado" />
          <Counter target={49} suffix="" label="★ Google Maps" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 5 — DEPOIMENTOS
      ══════════════════════════════════════════════════════ */}
      <section id="depoimentos" style={{ background: C.surface, padding: 'clamp(4rem,8vw,8rem) clamp(1.25rem,6vw,5rem)' }}>
        <div className="jr-reveal" style={{ ...revealStyle, textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
            O que dizem nossos clientes
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: '1.25rem', maxWidth: 1100, margin: '0 auto' }}>
          {DEPOIMENTOS.map((d, i) => (
            <div
              key={i}
              className="jr-reveal"
              onMouseEnter={() => setHovDepo(i)}
              onMouseLeave={() => setHovDepo(null)}
              style={{
                ...revealStyle,
                transitionDelay: `${i * 0.1}s`,
                position: 'relative',
                background: C.card,
                border: `1px solid ${hovDepo === i ? C.border : C.borderPrata}`,
                borderRadius: 6,
                padding: '2rem',
                cursor: 'none',
                overflow: 'hidden',
                transition: 'border-color 0.25s',
              }}
            >
              {/* Quote decorativa */}
              <div aria-hidden="true" style={{ position: 'absolute', top: '0.5rem', left: '1rem', fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: '8rem', color: 'rgba(204,0,0,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>"</div>
              {/* Estrelas */}
              <div style={{ color: C.red, fontSize: '0.85rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>★★★★★</div>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '0.9rem', color: 'rgba(240,240,240,0.75)', lineHeight: 1.7, margin: '0 0 1.5rem', position: 'relative', zIndex: 1 }}>"{d.texto}"</p>
              <div style={{ borderTop: `1px solid ${C.borderPrata}`, paddingTop: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: '1rem', color: '#fff', margin: '0 0 0.15rem' }}>{d.nome}</p>
                <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.65rem', color: C.muted, margin: 0, letterSpacing: '0.06em' }}>{d.servico}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SEÇÃO 6 — CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section id="contato" style={{ background: C.bg, padding: 'clamp(5rem,10vw,9rem) clamp(1.25rem,6vw,5rem)', textAlign: 'center', borderTop: `2px solid ${C.red}`, position: 'relative' }}>
        <div className="jr-reveal" style={revealStyle}>
          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(2.5rem,6vw,5.5rem)', color: '#fff', letterSpacing: '-0.02em', margin: '0 0 0.1em', lineHeight: 0.95 }}>
            SEU CARRO PRONTO
          </h2>
          <h2 style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700, fontSize: 'clamp(2.5rem,6vw,5.5rem)', color: C.red, letterSpacing: '-0.02em', margin: '0 0 1.5rem', lineHeight: 0.95 }}>
            EM HORAS.
          </h2>
          <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '1.05rem', color: C.muted, marginBottom: '2.5rem' }}>
            Agende agora e receba confirmação em até 1 hora.
          </p>
          <a
            href={waLink(MSG_AGENDAR)}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={e => { onCta.current = true; e.currentTarget.style.background = C.redVivo; e.currentTarget.style.boxShadow = '0 0 40px rgba(204,0,0,0.55)' }}
            onMouseLeave={e => { onCta.current = false; e.currentTarget.style.background = C.red; e.currentTarget.style.boxShadow = '0 0 24px rgba(204,0,0,0.3)' }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-barlow)', fontWeight: 600, fontSize: '1.05rem',
              color: '#fff', background: C.red,
              padding: '1.25rem 4rem',
              textDecoration: 'none', cursor: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 0 24px rgba(204,0,0,0.3)',
              animation: 'pulse-btn 2.5s ease-in-out infinite',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
          >
            💬 Agendar pelo WhatsApp
          </a>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.68rem', color: C.muted, marginTop: '1.5rem', letterSpacing: '0.04em' }}>
            Seg a Sáb: 8h às 18h • São Paulo, SP
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background: '#000', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,6vw,5rem)', borderTop: `1px solid rgba(255,255,255,0.05)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', maxWidth: 1200, margin: '0 auto', marginBottom: '2rem' }}>
          <div>
            <Image
              src="/logos/jr-estetica.jpg"
              alt="JR Estética Automotiva"
              width={160}
              height={60}
              style={{ objectFit: 'contain', marginBottom: '0.4rem' }}
            />
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '0.78rem', color: C.muted, margin: 0 }}>
              Detalhamento premium. Resultado garantido.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['Serviços', 'Galeria', 'Contato', 'Instagram'].map(l => (
              <button
                key={l}
                onClick={() => l !== 'Instagram' ? scrollTo(l.toLowerCase()) : undefined}
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: '0.78rem', color: C.muted, background: 'none', border: 'none', cursor: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 300, fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            © 2025 JR Estética Automotiva · Todos os direitos reservados
          </p>
        </div>
      </footer>

      {/* ── Keyframes globais ── */}
      <style>{`
        body { cursor: none; }
        * { box-sizing: border-box; }

        @keyframes lineGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes pulse-btn {
          0%,100% { box-shadow: 0 0 0 0 rgba(204,0,0,0); }
          50%      { box-shadow: 0 0 0 10px rgba(204,0,0,0); }
        }
        @keyframes scrollLine {
          0%   { opacity:0; transform:scaleY(0); transform-origin:top; }
          50%  { opacity:1; transform:scaleY(1); transform-origin:top; }
          100% { opacity:0; transform:scaleY(1); transform-origin:bottom; }
        }

        .jr-nav-desktop { display: flex !important; }
        .jr-hamburger   { display: none !important; }

        @media (max-width: 768px) {
          .jr-nav-desktop { display: none !important; }
          .jr-hamburger   { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
