'use client'

// ─── Pata Verde Pet — Landing Page ───────────────────────────────────────────
// Filosofia: natural, acolhedor, confiável e moderno
// Referência: Figma premium + Webflow award winning
// Fontes: Fraunces (serif display) · Plus Jakarta Sans · Space Mono

import Image from 'next/image'
import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import { useEffect, useRef, useState, useCallback } from 'react'

const fraunces   = Fraunces({ subsets: ['latin'], weight: ['700', '900'], variable: '--pv-fraunces' })
const jakarta    = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--pv-jakarta' })
const spaceMono  = Space_Mono({ subsets: ['latin'], weight: ['400'], variable: '--pv-mono' })

const WA      = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511999999999'
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent('Olá! Gostaria de agendar um serviço para meu pet 🐾')}`

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '✂️', name: 'Banho & Tosa',          price: 'R$ 60+',     desc: 'Pelagem limpa, perfumada e estilosa',  mint: true  },
  { icon: '🩺', name: 'Consulta Veterinária',   price: 'R$ 120+',    desc: 'Médico vet com hora marcada',          mint: false },
  { icon: '🏨', name: 'Hotel Pet',              price: 'R$ 80+/dia', desc: 'Cuidado e carinho 24 horas',           mint: false },
  { icon: '💅', name: 'Tosa Artística',         price: 'R$ 90+',     desc: 'Cortes exclusivos para seu pet',       mint: true  },
  { icon: '💊', name: 'Vacinas',                price: 'R$ 45+',     desc: 'Carteira sempre em dia',               mint: true  },
  { icon: '🛁', name: 'Hidratação',             price: 'R$ 40+',     desc: 'Pelo macio, hidratado e brilhante',    mint: false },
]

const DIFERENCIAIS = [
  'Profissionais certificados e apaixonados por pets',
  'Produtos 100% naturais e sem crueldade animal',
  'Ambiente climatizado e monitorado 24h',
  'Fotos e atualizações pelo WhatsApp durante o atendimento',
]

const TESTIMONIALS = [
  {
    text: 'Minha golden nunca ficou tão linda! A equipe é incrível e super cuidadosa. Nunca mais levo em outro lugar.',
    owner: 'Amanda K.', location: 'Pinheiros',
    petName: 'Luna', breed: 'Golden Retriever',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80',
    wide: true, bg: '#FFFFFF',
  },
  {
    text: 'Deixei minha gata no hotel por 15 dias e recebi fotos todos os dias. Voltou saudável e feliz!',
    owner: 'Roberto M.', location: 'Vila Olímpia',
    petName: 'Mimi', breed: 'Persa',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80',
    wide: false, bg: '#D8F3DC',
  },
  {
    text: 'Agendar pelo WhatsApp em 1 minuto é incrível. Atendimento impecável sempre.',
    owner: 'Juliana F.', location: 'Moema',
    petName: 'Bob', breed: 'Shih Tzu',
    photo: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=200&q=80',
    wide: false, bg: '#FFFFFF',
  },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      es => { if (es[0].isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function useCounter(target: number, duration = 2000) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      es => {
        if (es[0].isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            const e = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(e * target))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return { ref, count }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PataVerdePet() {
  const cls = `${fraunces.variable} ${jakarta.variable} ${spaceMono.variable}`

  // ── Cursor ──
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (ev: globalThis.MouseEvent) => {
      mouse.current = { x: ev.clientX, y: ev.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${ev.clientX}px`
        dotRef.current.style.top  = `${ev.clientY}px`
      }
    }
    let raf: number
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top  = `${ring.current.y}px`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  // ── Nav scroll ──
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Counters ──
  const cnt1 = useCounter(2000)
  const cnt2 = useCounter(98)
  const cnt3 = useCounter(5)
  const cnt4 = useCounter(49)   // ×10 → 4.9

  // ── Reveal ──
  const heroL  = useReveal()
  const heroR  = useReveal()
  const svcRev = useReveal()
  const featL  = useReveal()
  const featR  = useReveal()
  const numRev = useReveal()
  const testRev= useReveal()
  const ctaRev = useReveal()

  return (
    <div
      className={cls}
      style={{ background: '#FAFAF7', color: '#1A1A2E', fontFamily: "var(--pv-jakarta,'Plus Jakarta Sans',sans-serif)", cursor: 'none' }}
    >
      {/* ── Cursor ── */}
      <div ref={dotRef}  className="pv-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="pv-cursor-ring" aria-hidden="true" />

      {/* ── WhatsApp fixo ── */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-wa-fixed" aria-label="Agendar">
        🐾 <span className="pv-wa-txt">Agendar</span>
      </a>

      {/* ════════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════════ */}
      <nav className={`pv-nav ${scrolled ? 'pv-nav-solid' : ''}`}>
        <div className="pv-container pv-nav-inner">
          {/* Logo */}
          <a href="#" className="pv-logo-link">
            <span className="pv-logo">
              <span style={{ color: '#2D6A4F' }}>Pata</span>{' '}
              <span style={{ color: '#40916C' }}>Verde</span>{' '}
              <span style={{ color: '#2D6A4F' }}>Pet</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="pv-nav-links">
            <a href="#servicos"  className="pv-nav-link">Serviços</a>
            <a href="#sobre"     className="pv-nav-link">Sobre</a>
            <a href="#contato"   className="pv-nav-link">Contato</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-nav-cta">
              Agendar 🐾
            </a>
          </div>

          {/* Hamburguer */}
          <button
            className="pv-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className={`pv-hb-line ${menuOpen ? 'pv-hb-open-1' : ''}`} />
            <span className={`pv-hb-line ${menuOpen ? 'pv-hb-open-2' : ''}`} />
            <span className={`pv-hb-line ${menuOpen ? 'pv-hb-open-3' : ''}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`pv-mobile-menu ${menuOpen ? 'pv-mobile-open' : ''}`}>
          <a href="#servicos" className="pv-mob-link" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#sobre"    className="pv-mob-link" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#contato"  className="pv-mob-link" onClick={() => setMenuOpen(false)}>Contato</a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-mob-cta" onClick={() => setMenuOpen(false)}>
            🐾 Agendar pelo WhatsApp
          </a>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="pv-hero">
        {/* Blobs orgânicos */}
        <div className="pv-blob-green" aria-hidden="true" />
        <div className="pv-blob-orange" aria-hidden="true" />

        <div className="pv-container pv-hero-grid">

          {/* ── Esquerda ── */}
          <div
            ref={heroL.ref}
            className="pv-reveal"
            style={{ opacity: heroL.visible ? 1 : 0, transform: heroL.visible ? 'none' : 'translateY(24px)' }}
          >
            {/* Pill */}
            <div className="pv-pill">🐾 +2.000 pets atendidos em SP</div>

            {/* Título */}
            <h1 className="pv-h1">
              Seu pet merece<br />
              cuidado de{' '}
              <span style={{ color: '#F4845F' }}>verdade.</span>
            </h1>

            {/* Wavy line */}
            <svg className="pv-wave" width="180" height="18" viewBox="0 0 180 18" fill="none" aria-hidden="true">
              <path d="M2 9 Q30 2 60 9 Q90 16 120 9 Q150 2 178 9"
                stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>

            {/* Sub */}
            <p className="pv-sub">
              Banho, tosa, veterinário e muito carinho.<br />
              Agende em 1 minuto pelo WhatsApp.
            </p>

            {/* CTAs */}
            <div className="pv-ctas">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-btn-primary">
                🐾 Agendar agora
              </a>
              <a href="#servicos" className="pv-btn-secondary">Ver serviços ↓</a>
            </div>

            {/* Trust pills */}
            <div className="pv-trust">
              {[
                { icon: '🌿', text: 'Produtos naturais' },
                { icon: '⭐', text: '4.9 Google' },
                { icon: '📅', text: 'Sem fila' },
              ].map(t => (
                <span key={t.text} className="pv-trust-pill">
                  {t.icon} {t.text}
                </span>
              ))}
            </div>
          </div>

          {/* ── Direita — foto orgânica + cards ── */}
          <div
            ref={heroR.ref}
            className="pv-hero-right pv-reveal"
            style={{ opacity: heroR.visible ? 1 : 0, transform: heroR.visible ? 'none' : 'translateY(24px)', transitionDelay: '0.12s' }}
          >
            {/* Foto orgânica */}
            <div className="pv-organic-photo">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&q=85"
                alt="Cachorro feliz na Pata Verde Pet"
                fill sizes="(max-width: 768px) 100vw, 45vw"
                priority unoptimized
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Card flutuante — topo direita */}
            <div className="pv-float-card pv-fc-light pv-float-a">
              <div className="pv-fc-row">
                <span className="pv-fc-icon-lg">✂️</span>
                <div>
                  <div className="pv-fc-title">Próximo horário</div>
                  <div className="pv-fc-avail">Hoje às 14h30 <span className="pv-dot-green">●</span></div>
                </div>
              </div>
            </div>

            {/* Card flutuante — baixo esquerda */}
            <div className="pv-float-card pv-fc-dark pv-float-b">
              <div className="pv-fc-stars">⭐ 4.9</div>
              <div className="pv-fc-reviews">847 avaliações</div>
              <div className="pv-fc-source">Google Maps</div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVIÇOS
      ════════════════════════════════════════════════════════ */}
      <section id="servicos" style={{ background: '#FFFFFF', padding: '6rem 1.5rem' }}>
        <div className="pv-container">
          <div
            ref={svcRev.ref}
            className="pv-reveal pv-sec-header"
            style={{ opacity: svcRev.visible ? 1 : 0, transform: svcRev.visible ? 'none' : 'translateY(20px)' }}
          >
            <span className="pv-sec-label">SERVIÇOS</span>
            <h2 className="pv-h2">
              Tudo que seu<br />
              <span style={{ color: '#F4845F' }}>pet precisa.</span>
            </h2>
            <p className="pv-sec-sub">Serviços pensados para o conforto e saúde do seu melhor amigo</p>
          </div>

          <div className="pv-svc-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="pv-svc-card pv-reveal"
                style={{
                  background: s.mint ? '#D8F3DC' : '#FFFFFF',
                  border: s.mint ? 'none' : '1px solid #E5E7EB',
                  opacity: svcRev.visible ? 1 : 0,
                  transform: svcRev.visible ? 'none' : 'translateY(20px)',
                  transition: `opacity .7s ease ${i * 100}ms, transform .7s ease ${i * 100}ms, box-shadow .3s ease, translateY .3s ease`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(45,106,79,0.14)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div
                  className="pv-svc-icon-wrap"
                  style={{ background: s.mint ? '#FDEBD0' : '#D8F3DC' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                </div>
                <h3 className="pv-svc-name">{s.name}</h3>
                <p className="pv-svc-desc">{s.desc}</p>
                <div className="pv-svc-price">{s.price}</div>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-svc-cta">
                  Agendar →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FEATURE — Por que nos escolher
      ════════════════════════════════════════════════════════ */}
      <section id="sobre" style={{ background: '#2D6A4F', padding: '6rem 1.5rem' }}>
        <div className="pv-container pv-feat-grid">

          {/* Esquerda */}
          <div
            ref={featL.ref}
            className="pv-reveal"
            style={{ opacity: featL.visible ? 1 : 0, transform: featL.visible ? 'none' : 'translateY(24px)' }}
          >
            <span className="pv-sec-label" style={{ color: '#74C69D' }}>POR QUE NOS ESCOLHER</span>
            <h2 className="pv-h2" style={{ color: '#FFFFFF', marginBottom: '2rem' }}>
              Tratamos seu pet<br />como família.
            </h2>
            <ul className="pv-feat-list">
              {DIFERENCIAIS.map((d, i) => (
                <li key={i} className="pv-feat-item">
                  <span className="pv-feat-check">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-btn-outline-white">
              Conhecer a equipe →
            </a>
          </div>

          {/* Direita — collage */}
          <div
            ref={featR.ref}
            className="pv-reveal pv-collage"
            style={{ opacity: featR.visible ? 1 : 0, transform: featR.visible ? 'none' : 'translateY(24px)', transitionDelay: '0.12s' }}
          >
            <div className="pv-collage-inner">
              <div className="pv-col-img pv-col-img-1">
                <Image
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80"
                  alt="Cão feliz"
                  fill sizes="(max-width: 768px) 50vw, 22vw"
                  loading="lazy" unoptimized
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="pv-col-img pv-col-img-2">
                <Image
                  src="https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&q=80"
                  alt="Cachorro bem cuidado"
                  fill sizes="(max-width: 768px) 50vw, 22vw"
                  loading="lazy" unoptimized
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          NÚMEROS
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#FAFAF7', padding: '5rem 1.5rem' }}>
        <div className="pv-container">
          <div
            ref={numRev.ref}
            className="pv-stats-grid pv-reveal"
            style={{ opacity: numRev.visible ? 1 : 0, transform: numRev.visible ? 'none' : 'translateY(20px)' }}
          >
            <div ref={cnt1.ref} className="pv-stat">
              <div className="pv-stat-num">{cnt1.count.toLocaleString('pt-BR')}+</div>
              <div className="pv-stat-lbl">Pets atendidos</div>
            </div>
            <div ref={cnt2.ref} className="pv-stat">
              <div className="pv-stat-num">{cnt2.count}%</div>
              <div className="pv-stat-lbl">Clientes satisfeitos</div>
            </div>
            <div ref={cnt3.ref} className="pv-stat">
              <div className="pv-stat-num">{cnt3.count} anos</div>
              <div className="pv-stat-lbl">De experiência</div>
            </div>
            <div ref={cnt4.ref} className="pv-stat">
              <div className="pv-stat-num">{(cnt4.count / 10).toFixed(1)} ⭐</div>
              <div className="pv-stat-lbl">No Google Maps</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DEPOIMENTOS
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F0EBE3', padding: '6rem 1.5rem' }}>
        <div className="pv-container">
          <div
            ref={testRev.ref}
            className="pv-reveal pv-sec-header"
            style={{ opacity: testRev.visible ? 1 : 0, transform: testRev.visible ? 'none' : 'translateY(20px)', marginBottom: '3rem' }}
          >
            <h2 className="pv-h2">
              Quem ama,<br />
              <span style={{ color: '#F4845F' }}>indica.</span>
            </h2>
          </div>

          <div className="pv-test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`pv-test-card pv-reveal ${t.wide ? 'pv-test-wide' : ''}`}
                style={{
                  background: t.bg,
                  border: t.bg === '#FFFFFF' ? '1px solid #E5E7EB' : 'none',
                  opacity: testRev.visible ? 1 : 0,
                  transform: testRev.visible ? 'none' : 'translateY(20px)',
                  transition: `opacity .7s ease ${i * 120}ms, transform .7s ease ${i * 120}ms`,
                }}
              >
                {/* Pet info */}
                <div className="pv-test-pet-row">
                  <div className="pv-pet-avatar">
                    <Image
                      src={t.photo}
                      alt={t.petName}
                      fill sizes="80px"
                      loading="lazy" unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div className="pv-pet-name">{t.petName}</div>
                    <div className="pv-pet-breed">{t.breed}</div>
                  </div>
                </div>
                {/* Stars */}
                <div className="pv-stars">★★★★★</div>
                {/* Text */}
                <p className="pv-test-text">&ldquo;{t.text}&rdquo;</p>
                {/* Owner */}
                <div className="pv-owner">
                  <span className="pv-owner-name">{t.owner}</span>
                  <span className="pv-owner-sep">·</span>
                  <span className="pv-owner-loc">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════════════════ */}
      <section id="contato" className="pv-cta-section">
        <div className="pv-cta-top-border" aria-hidden="true" />
        <div
          ref={ctaRev.ref}
          className="pv-container pv-cta-inner pv-reveal"
          style={{ opacity: ctaRev.visible ? 1 : 0, transform: ctaRev.visible ? 'none' : 'translateY(20px)' }}
        >
          <span className="pv-cta-icon" aria-hidden="true">🐾</span>
          <h2 className="pv-cta-h2">Pronto para agendar?</h2>
          <p className="pv-cta-sub">
            Resposta em até 1 hora.<br />Sem fila, sem espera.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="pv-cta-btn">
            💬 Agendar pelo WhatsApp
          </a>
          <p className="pv-cta-info">Seg a Sáb 8h–19h &nbsp;•&nbsp; Dom 9h–14h</p>
          <p className="pv-cta-addr">📍 Rua dos Pets, 123 — São Paulo</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer className="pv-footer">
        <div className="pv-container pv-footer-grid">
          {/* Col 1 */}
          <div>
            <div className="pv-footer-logo">
              <span style={{ color: '#FFFFFF' }}>Pata </span>
              <span style={{ color: '#74C69D' }}>Verde </span>
              <span style={{ color: '#FFFFFF' }}>Pet</span>
            </div>
            <p className="pv-footer-tag">Cuidado premium para seu melhor amigo</p>
          </div>
          {/* Col 2 */}
          <div>
            <p className="pv-footer-col-title">Links</p>
            {['Serviços', 'Hotel Pet', 'Vacinas', 'Contato'].map(l => (
              <a key={l} href="#" className="pv-footer-link">{l}</a>
            ))}
          </div>
          {/* Col 3 */}
          <div>
            <p className="pv-footer-col-title">Contato</p>
            <p className="pv-footer-info">📱 (11) 99999-9999</p>
            <p className="pv-footer-info">📍 Rua dos Pets, 123 — SP</p>
            <p className="pv-footer-info">🕐 Seg–Sáb 8h–19h</p>
          </div>
        </div>
        <div className="pv-footer-bottom">
          <p className="pv-copyright">© 2025 Pata Verde Pet. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════
          STYLES
      ════════════════════════════════════════════════════════ */}
      <style>{`
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        a, button { cursor: none !important; }

        /* ── Cursor ─────────────────────────────────────── */
        .pv-cursor-dot {
          position: fixed; width: 8px; height: 8px; border-radius: 50%;
          background: #2D6A4F; pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%); transition: background .15s;
        }
        .pv-cursor-ring {
          position: fixed; width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid rgba(45,106,79,.5); pointer-events: none; z-index: 9998;
          transform: translate(-50%,-50%);
        }
        a:hover + .pv-cursor-dot,
        .pv-btn-primary:hover ~ .pv-cursor-dot { background: #F4845F; }

        /* ── Reveal ─────────────────────────────────────── */
        .pv-reveal { transition: opacity .7s ease, transform .7s ease; }

        /* ── WhatsApp fixo ──────────────────────────────── */
        @keyframes pv-wa-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}
          50%{box-shadow:0 0 0 14px rgba(37,211,102,0)}
        }
        .pv-wa-fixed {
          position: fixed; bottom: 28px; right: 28px; z-index: 1000;
          display: flex; align-items: center; gap: 8px;
          padding: 12px 22px; border-radius: 50px;
          background: #25D366; color: #fff;
          font-family: var(--pv-jakarta,'Plus Jakarta Sans',sans-serif);
          font-weight: 600; font-size: .88rem; text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,211,102,.35);
          animation: pv-wa-pulse 2.5s ease-in-out infinite;
          transition: transform .2s;
        }
        .pv-wa-fixed:hover { transform: scale(1.05); }
        @media (max-width: 640px) { .pv-wa-txt { display: none; } }

        /* ── Container ──────────────────────────────────── */
        .pv-container { max-width: 1200px; margin: 0 auto; }

        /* ── NAV ─────────────────────────────────────────  */
        .pv-nav {
          position: fixed; top: 44px; left: 0; right: 0; z-index: 100;
          transition: background .3s ease, box-shadow .3s ease;
        }
        .pv-nav-solid {
          background: rgba(250,250,247,.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 20px rgba(0,0,0,.06);
        }
        .pv-nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: .9rem 1.5rem;
        }
        .pv-logo-link { text-decoration: none; }
        .pv-logo {
          font-family: var(--pv-fraunces,'Fraunces',serif); font-weight: 900;
          font-size: 1.3rem; line-height: 1;
        }
        .pv-nav-links { display: none; align-items: center; gap: 1.75rem; }
        @media (min-width: 768px) { .pv-nav-links { display: flex; } }
        .pv-nav-link {
          font-size: .88rem; font-weight: 500; color: #1A1A2E;
          text-decoration: none; transition: color .2s;
        }
        .pv-nav-link:hover { color: #2D6A4F; }
        .pv-nav-cta {
          padding: 8px 18px; border-radius: 50px;
          background: #2D6A4F; color: #fff;
          font-size: .85rem; font-weight: 600;
          text-decoration: none; transition: background .2s;
        }
        .pv-nav-cta:hover { background: #40916C; }

        /* Hamburger */
        .pv-hamburger {
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 36px; height: 36px;
          background: none; border: none; padding: 0;
        }
        @media (min-width: 768px) { .pv-hamburger { display: none; } }
        .pv-hb-line {
          display: block; width: 22px; height: 2px;
          background: #1A1A2E; border-radius: 2px;
          transition: transform .3s ease, opacity .3s ease;
          transform-origin: center;
        }
        .pv-hb-open-1 { transform: translateY(7px) rotate(45deg); }
        .pv-hb-open-2 { opacity: 0; }
        .pv-hb-open-3 { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile drawer */
        .pv-mobile-menu {
          display: none; flex-direction: column; gap: .5rem;
          padding: 1rem 1.5rem 1.5rem;
          background: rgba(250,250,247,.98);
          border-top: 1px solid #E5E7EB;
          max-height: 0; overflow: hidden;
          transition: max-height .4s ease, opacity .4s ease;
          opacity: 0;
        }
        .pv-mobile-open {
          display: flex; max-height: 400px; opacity: 1;
        }
        @media (max-width: 767px) { .pv-mobile-menu { display: flex; } }
        .pv-mob-link {
          font-size: 1rem; font-weight: 500; color: #1A1A2E;
          text-decoration: none; padding: .6rem 0;
          border-bottom: 1px solid #F0EBE3;
        }
        .pv-mob-cta {
          margin-top: .5rem; padding: 13px; border-radius: 50px;
          background: #2D6A4F; color: #fff;
          font-weight: 600; font-size: .95rem; text-decoration: none;
          text-align: center;
        }

        /* ── HERO ───────────────────────────────────────── */
        .pv-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: center;
          padding: 8rem 1.5rem 5rem; background: #FAFAF7;
        }
        @keyframes blob-morph-g {
          0%,100%{ border-radius:60% 40% 30% 70%/60% 30% 70% 40%; }
          25%    { border-radius:30% 70% 60% 40%/50% 60% 30% 60%; }
          50%    { border-radius:50% 50% 40% 60%/40% 70% 50% 40%; }
          75%    { border-radius:40% 60% 70% 30%/70% 40% 50% 60%; }
        }
        @keyframes blob-morph-o {
          0%,100%{ border-radius:40% 60% 70% 30%/40% 50% 60% 50%; }
          50%    { border-radius:70% 30% 40% 60%/60% 40% 70% 40%; }
        }
        .pv-blob-green {
          position: absolute; top: -150px; right: -150px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, #D8F3DC 0%, transparent 70%);
          opacity: .6; animation: blob-morph-g 12s ease-in-out infinite;
          pointer-events: none;
        }
        .pv-blob-orange {
          position: absolute; bottom: -100px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, #FDEBD0 0%, transparent 70%);
          opacity: .5; animation: blob-morph-o 10s ease-in-out infinite 2s;
          pointer-events: none;
        }
        .pv-hero-grid {
          width: 100%; display: grid; grid-template-columns: 1fr; gap: 3rem;
          align-items: center; position: relative; z-index: 1;
        }
        @media (min-width: 1024px) {
          .pv-hero-grid { grid-template-columns: 55fr 45fr; }
        }

        /* Pill */
        .pv-pill {
          display: inline-block; padding: 7px 16px; border-radius: 50px;
          background: #D8F3DC; color: #2D6A4F; font-weight: 500; font-size: .82rem;
          border: 1px solid #74C69D; margin-bottom: 1.75rem;
        }

        /* H1 */
        .pv-h1 {
          font-family: var(--pv-fraunces,'Fraunces',serif); font-weight: 900;
          font-size: clamp(2.8rem,6.5vw,5rem); line-height: 1.1;
          color: #1A1A2E; margin-bottom: 1rem;
        }

        /* Wavy line */
        .pv-wave { display: block; margin-bottom: 1.5rem; }

        /* Sub */
        .pv-sub {
          font-weight: 300; font-size: clamp(.95rem,1.8vw,1.1rem);
          color: #6B7280; line-height: 1.75; margin-bottom: 2.25rem;
        }

        /* CTAs */
        .pv-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .pv-btn-primary {
          padding: 14px 30px; border-radius: 50px;
          background: #2D6A4F; color: #fff; font-weight: 600;
          font-size: 1rem; text-decoration: none;
          box-shadow: 0 8px 24px rgba(45,106,79,.3);
          transition: transform .2s, box-shadow .2s, background .2s;
        }
        .pv-btn-primary:hover {
          background: #40916C; transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(45,106,79,.4) !important;
        }
        .pv-btn-secondary {
          padding: 14px 28px; border-radius: 50px;
          background: #F0EBE3; color: #1A1A2E; font-weight: 500;
          font-size: 1rem; text-decoration: none;
          transition: background .2s;
        }
        .pv-btn-secondary:hover { background: #E8E0D8; }

        /* Trust pills */
        .pv-trust { display: flex; gap: .75rem; flex-wrap: wrap; }
        .pv-trust-pill {
          padding: 6px 14px; border-radius: 50px; font-size: .8rem; font-weight: 500;
          background: #fff; border: 1px solid #E5E7EB; color: #6B7280;
        }

        /* Organic photo */
        .pv-hero-right { position: relative; }
        .pv-organic-photo {
          position: relative; width: 100%; height: 460px;
          border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
          overflow: hidden; border: 3px solid #74C69D;
          box-shadow: 0 24px 64px rgba(45,106,79,.15);
        }
        @media (min-width: 1024px) { .pv-organic-photo { height: 520px; } }

        /* Float cards */
        @keyframes pv-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pv-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .pv-float-a { animation: pv-float-a 4s ease-in-out infinite; }
        .pv-float-b { animation: pv-float-b 5s ease-in-out infinite 1s; }
        .pv-float-card {
          position: absolute; border-radius: 20px; padding: 14px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,.1);
        }
        .pv-fc-light {
          top: 20px; right: -10px;
          background: #fff; border: 1px solid #F0EBE3;
        }
        .pv-fc-dark {
          bottom: 28px; left: -10px;
          background: #2D6A4F; color: #fff;
        }
        .pv-fc-row { display: flex; align-items: center; gap: 10px; }
        .pv-fc-icon-lg { font-size: 1.6rem; }
        .pv-fc-title { font-weight: 600; font-size: .82rem; color: #1A1A2E; }
        .pv-fc-avail { font-size: .78rem; color: #6B7280; margin-top: 2px; }
        .pv-dot-green { color: #34C759; }
        .pv-fc-stars  { font-weight: 700; font-size: 1.1rem; margin-bottom: 2px; }
        .pv-fc-reviews{ font-size: .8rem; opacity: .85; }
        .pv-fc-source { font-size: .7rem; opacity: .6; margin-top: 2px; }

        /* ── Services ───────────────────────────────────── */
        .pv-sec-header { text-align: center; margin-bottom: 3.5rem; }
        .pv-sec-label {
          display: inline-block; font-size: .7rem; font-weight: 700;
          letter-spacing: .15em; color: #2D6A4F; margin-bottom: .75rem;
        }
        .pv-h2 {
          font-family: var(--pv-fraunces,'Fraunces',serif); font-weight: 900;
          font-size: clamp(1.9rem,4vw,3rem); color: #1A1A2E; margin-bottom: .75rem; line-height: 1.15;
        }
        .pv-sec-sub { font-weight: 300; color: #6B7280; font-size: 1rem; max-width: 440px; margin: 0 auto; }
        .pv-svc-grid {
          display: grid; gap: 1.25rem;
          grid-template-columns: repeat(auto-fill, minmax(min(280px,100%),1fr));
        }
        .pv-svc-card { border-radius: 24px; padding: 1.75rem; }
        .pv-svc-icon-wrap {
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .pv-svc-name  { font-weight: 600; font-size: 1.05rem; margin-bottom: .35rem; color: #1A1A2E; }
        .pv-svc-desc  { font-weight: 300; color: #6B7280; font-size: .88rem; margin-bottom: .8rem; line-height: 1.6; }
        .pv-svc-price { font-family: var(--pv-mono,'Space Mono',monospace); color: #2D6A4F; font-size: .82rem; margin-bottom: .75rem; }
        .pv-svc-cta   { font-size: .82rem; font-weight: 600; color: #2D6A4F; text-decoration: none; transition: color .2s; }
        .pv-svc-cta:hover { color: #40916C; }

        /* ── Feature ────────────────────────────────────── */
        .pv-feat-grid {
          display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center;
        }
        @media (min-width: 1024px) { .pv-feat-grid { grid-template-columns: 1fr 1fr; } }
        .pv-feat-list { list-style: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: .9rem; }
        .pv-feat-item { display: flex; align-items: flex-start; gap: .75rem; }
        .pv-feat-check {
          flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%;
          background: rgba(116,198,157,.25); color: #74C69D;
          display: flex; align-items: center; justify-content: center;
          font-size: .75rem; font-weight: 700; margin-top: 1px;
        }
        .pv-feat-item span:last-child { color: rgba(255,255,255,.8); font-weight: 300; line-height: 1.6; font-size: .95rem; }
        .pv-btn-outline-white {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 13px 28px; border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,.35); color: #fff;
          font-weight: 500; font-size: .95rem; text-decoration: none;
          transition: background .2s, border-color .2s;
        }
        .pv-btn-outline-white:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.6); }

        /* Collage */
        .pv-collage { display: flex; justify-content: center; }
        .pv-collage-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1rem; width: 100%; max-width: 460px;
        }
        .pv-col-img { position: relative; border-radius: 20px; overflow: hidden; height: 280px; }
        .pv-col-img-2 { margin-top: 2rem; }

        /* ── Stats ──────────────────────────────────────── */
        .pv-stats-grid {
          display: grid; text-align: center; width: 100%;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .pv-stats-grid { grid-template-columns: repeat(4, 1fr); }
          .pv-stat + .pv-stat { border-left: 1px solid #E5E7EB; }
        }
        .pv-stat { padding: 2rem 1rem; }
        .pv-stat-num {
          font-family: var(--pv-fraunces,'Fraunces',serif); font-weight: 900;
          font-size: clamp(2.5rem,5vw,3.8rem); color: #2D6A4F; line-height: 1;
          margin-bottom: .4rem;
        }
        .pv-stat-lbl { font-weight: 300; color: #6B7280; font-size: .88rem; }

        /* ── Testimonials ───────────────────────────────── */
        .pv-test-grid {
          display: grid; gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .pv-test-grid { grid-template-columns: repeat(2, 1fr); }
          .pv-test-wide { grid-column: span 2; }
        }
        @media (min-width: 1024px) {
          .pv-test-grid { grid-template-columns: 2fr 1fr 1fr; }
          .pv-test-wide { grid-column: auto; }
        }
        .pv-test-card { border-radius: 24px; padding: 2rem; }
        .pv-test-pet-row { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; }
        .pv-pet-avatar {
          position: relative; width: 56px; height: 56px; flex-shrink: 0;
          border-radius: 50%; overflow: hidden; border: 2px solid #74C69D;
        }
        .pv-pet-name  { font-weight: 700; font-size: .9rem; color: #1A1A2E; }
        .pv-pet-breed { font-size: .78rem; color: #6B7280; margin-top: 1px; }
        .pv-stars     { color: #F4845F; font-size: .85rem; margin-bottom: .75rem; }
        .pv-test-text { font-weight: 300; color: #1A1A2E; font-size: .92rem; line-height: 1.7; margin-bottom: 1rem; }
        .pv-owner     { display: flex; align-items: center; gap: .4rem; flex-wrap: wrap; }
        .pv-owner-name{ font-weight: 600; font-size: .82rem; color: #1A1A2E; }
        .pv-owner-sep { color: #D1D5DB; }
        .pv-owner-loc { font-size: .8rem; color: #6B7280; }

        /* ── CTA ─────────────────────────────────────────  */
        .pv-cta-section {
          position: relative; background: #FAFAF7;
          padding: 6rem 1.5rem; text-align: center;
        }
        .pv-cta-top-border {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #2D6A4F, #74C69D, #F4845F);
        }
        .pv-cta-inner { max-width: 560px; margin: 0 auto; }
        .pv-cta-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
        .pv-cta-h2 {
          font-family: var(--pv-fraunces,'Fraunces',serif); font-weight: 900;
          font-size: clamp(2.4rem,5.5vw,4rem); color: #1A1A2E;
          margin-bottom: .75rem; line-height: 1.1;
        }
        .pv-cta-sub { font-weight: 300; color: #6B7280; font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.7; }
        @keyframes pv-cta-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(45,106,79,.4),0 8px 24px rgba(45,106,79,.25)}
          50%{box-shadow:0 0 0 18px rgba(45,106,79,0),0 8px 36px rgba(45,106,79,.4)}
        }
        .pv-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 1.1rem 3rem; border-radius: 50px;
          background: #2D6A4F; color: #fff;
          font-family: var(--pv-jakarta,'Plus Jakarta Sans',sans-serif);
          font-weight: 600; font-size: 1.05rem; text-decoration: none;
          animation: pv-cta-pulse 2.5s ease-in-out infinite;
          transition: transform .2s, background .2s;
        }
        .pv-cta-btn:hover { background: #40916C; transform: scale(1.04); }
        .pv-cta-info { color: #9CA3AF; font-size: .82rem; margin-top: 1.5rem; }
        .pv-cta-addr { color: #9CA3AF; font-size: .82rem; margin-top: .4rem; }

        /* ── Footer ─────────────────────────────────────── */
        .pv-footer { background: #1A1A2E; padding: 4rem 1.5rem 0; }
        .pv-footer-grid {
          display: grid; gap: 2.5rem;
          grid-template-columns: 1fr;
          padding-bottom: 3rem;
        }
        @media (min-width: 768px) { .pv-footer-grid { grid-template-columns: 2fr 1fr 1fr; } }
        .pv-footer-logo {
          font-family: var(--pv-fraunces,'Fraunces',serif); font-weight: 900;
          font-size: 1.5rem; margin-bottom: .6rem;
        }
        .pv-footer-tag { font-weight: 300; color: rgba(255,255,255,.38); font-size: .85rem; line-height: 1.6; }
        .pv-footer-col-title { font-weight: 600; font-size: .78rem; letter-spacing: .08em; color: rgba(255,255,255,.4); text-transform: uppercase; margin-bottom: 1rem; }
        .pv-footer-link { display: block; color: rgba(255,255,255,.5); font-size: .88rem; text-decoration: none; margin-bottom: .5rem; transition: color .2s; }
        .pv-footer-link:hover { color: #74C69D; }
        .pv-footer-info { color: rgba(255,255,255,.45); font-size: .85rem; margin-bottom: .5rem; font-weight: 300; }
        .pv-footer-bottom {
          border-top: 1px solid rgba(255,255,255,.07); padding: 1.25rem 0;
          text-align: center;
        }
        .pv-copyright {
          font-family: var(--pv-mono,'Space Mono',monospace);
          color: rgba(255,255,255,.2); font-size: .68rem;
        }
      `}</style>
    </div>
  )
}
