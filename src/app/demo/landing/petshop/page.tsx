'use client'

// ─── Aurora Pet — Landing Page (redesign premium) ────────────────────────────
// Filosofia: Apple Store para pets
// Tema: LIGHT — branco/cinza claro como base, roxo e amarelo como acento
// Fontes: Syne 800 (display) · Inter 300/400/500 (corpo) · Space Mono (preços)

import Image from 'next/image'
import { Syne, Inter, Space_Mono } from 'next/font/google'
import { useEffect, useRef, useState, useCallback, type MouseEvent } from 'react'

const syne      = Syne({ subsets: ['latin'], weight: ['700', '800'],       variable: '--ap-syne' })
const inter     = Inter({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--ap-inter' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400'],         variable: '--ap-mono' })

const WA      = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511999999999'
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent('Olá! Gostaria de agendar um serviço para meu pet 🐾')}`

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '✂️', name: 'Banho & Tosa',   price: 'R$ 60+',     desc: 'Pelagem limpa e estilosa',     bg: '#EEF0FF', iconBg: '#5E4AE3' },
  { icon: '🩺', name: 'Consulta Vet',   price: 'R$ 120+',    desc: 'Com hora marcada',             bg: '#FFF8E7', iconBg: '#FFB800' },
  { icon: '🏨', name: 'Hotel Pet',      price: 'R$ 80+/dia', desc: 'Cuidado 24h',                  bg: '#EEF0FF', iconBg: '#5E4AE3' },
  { icon: '💅', name: 'Tosa Artística', price: 'R$ 90+',     desc: 'Cortes exclusivos',            bg: '#FFF8E7', iconBg: '#FFB800' },
  { icon: '💊', name: 'Vacinas',        price: 'R$ 45+',     desc: 'Carteira sempre em dia',       bg: '#EEF0FF', iconBg: '#5E4AE3' },
  { icon: '🛁', name: 'Hidratação',     price: 'R$ 40+',     desc: 'Pelo macio e brilhante',       bg: '#FFF8E7', iconBg: '#FFB800' },
]

const TESTIMONIALS = [
  {
    text: 'Nunca vi meu golden tão feliz! Atendimento incrível, resultado perfeito.',
    name: 'Amanda K.', location: 'Pinheiros',
    variant: 'wide-purple' as const,
  },
  {
    text: 'Hotel pet impecável! Minha gata voltou ainda mais saudável. Super recomendo.',
    name: 'Roberto M.', location: 'Vila Olímpia',
    variant: 'yellow' as const,
  },
  {
    text: 'Agendar pelo WhatsApp é super fácil. Nunca mais fui em outro lugar!',
    name: 'Juliana F.', location: 'Moema',
    variant: 'border' as const,
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
      entries => { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() } },
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
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(eased * target))
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

export default function AuroraPet() {
  // ── Cursor ──
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top  = `${e.clientY}px`
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

  // ── Service hover ──
  const [hovered, setHovered] = useState<number | null>(null)
  const onEnter = useCallback((i: number) => setHovered(i), [])
  const onLeave = useCallback(() => setHovered(null), [])

  // ── Counters ──
  const cnt1 = useCounter(2000)
  const cnt2 = useCounter(98)
  const cnt3 = useCounter(5)
  const cnt4 = useCounter(49)   // 4.9 × 10

  // ── Reveal ──
  const heroRev  = useReveal()
  const heroRevR = useReveal()
  const svcRev   = useReveal()
  const statsRev = useReveal()
  const testRev  = useReveal()
  const ctaRev   = useReveal()

  const cls = `${syne.variable} ${inter.variable} ${spaceMono.variable}`

  return (
    <div
      className={cls}
      style={{ background: '#FAFAFA', color: '#1D1D1F', fontFamily: "var(--ap-inter,'Inter',sans-serif)", cursor: 'none' }}
    >
      {/* ── Custom cursor ── */}
      <div ref={dotRef}  className="ap-dot"  aria-hidden="true" />
      <div ref={ringRef} className="ap-ring" aria-hidden="true" />

      {/* ── WhatsApp fixo ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="ap-wa-fixed"
        aria-label="Agendar pelo WhatsApp"
      >
        <span>💬</span>
        <span className="ap-wa-label">Agendar</span>
      </a>

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="ap-hero-section">
        {/* Blob decorativo */}
        <div className="ap-blob" aria-hidden="true" />

        <div className="ap-container ap-hero-grid">

          {/* ── Esquerda ── */}
          <div
            ref={heroRev.ref}
            className="ap-reveal"
            style={{ opacity: heroRev.visible ? 1 : 0, transform: heroRev.visible ? 'none' : 'translateY(24px)' }}
          >
            {/* Pill badge */}
            <div className="ap-pill">🐾 Petshop Premium em São Paulo</div>

            {/* Título */}
            <h1 className="ap-h1">
              Cuidado que seu<br />
              <span className="ap-h1-accent">pet merece.</span>
            </h1>

            {/* Linha decorativa */}
            <div className="ap-line" />

            {/* Sub */}
            <p className="ap-sub">
              Banho, tosa, consultas e hospedagem.<br />
              Agendamento em 1 minuto pelo WhatsApp.
            </p>

            {/* CTAs */}
            <div className="ap-ctas">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ap-btn-primary">
                Agendar agora →
              </a>
              <a href="#servicos" className="ap-btn-secondary">
                Ver serviços
              </a>
            </div>

            {/* Trust */}
            <div className="ap-trust">
              {[
                { icon: '✅', text: 'Sem fila' },
                { icon: '📅', text: 'Hora marcada' },
                { icon: '⭐', text: '4.9 Google' },
                { icon: '🐾', text: '2k+ pets' },
              ].map(t => (
                <span key={t.text} className="ap-trust-item">
                  <span>{t.icon}</span> {t.text}
                </span>
              ))}
            </div>
          </div>

          {/* ── Direita — foto + cards flutuantes ── */}
          <div
            ref={heroRevR.ref}
            className="ap-hero-right ap-reveal"
            style={{ opacity: heroRevR.visible ? 1 : 0, transform: heroRevR.visible ? 'none' : 'translateY(24px)', transitionDelay: '0.12s' }}
          >
            {/* Card principal */}
            <div className="ap-main-card">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80"
                alt="Cachorro feliz"
                fill sizes="(max-width: 768px) 100vw, 50vw"
                priority unoptimized
                style={{ objectFit: 'cover' }}
              />
              {/* Gradient overlay bottom */}
              <div className="ap-card-grad" />
            </div>

            {/* Float card 1 — topo esquerda */}
            <div className="ap-float-card ap-fc-1 ap-float-a">
              <span className="ap-fc-icon">✂️</span>
              <div>
                <div className="ap-fc-title">Tosa completa</div>
                <div className="ap-fc-price">A partir de R$ 60</div>
              </div>
            </div>

            {/* Float card 2 — baixo direita (roxo) */}
            <div className="ap-float-card ap-fc-2 ap-float-b">
              <span className="ap-fc-stars">⭐ 4.9</span>
              <span className="ap-fc-reviews">847 avaliações</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SERVIÇOS
      ════════════════════════════════════════════════════════════ */}
      <section id="servicos" style={{ background: '#F5F5F7', padding: '6rem 1.5rem' }}>
        <div className="ap-container">
          <div
            ref={svcRev.ref}
            className="ap-reveal ap-sec-header"
            style={{ opacity: svcRev.visible ? 1 : 0, transform: svcRev.visible ? 'none' : 'translateY(20px)' }}
          >
            <span className="ap-sec-label">SERVIÇOS</span>
            <h2 className="ap-h2">Tudo em um só lugar</h2>
            <p className="ap-sec-sub">Serviços pensados para o conforto e saúde do seu melhor amigo</p>
          </div>

          <div
            className="ap-svc-grid ap-reveal"
            style={{ opacity: svcRev.visible ? 1 : 0, transform: svcRev.visible ? 'none' : 'translateY(20px)', transitionDelay: '0.12s' }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="ap-svc-card"
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
                style={{
                  transform: hovered === i ? 'translateY(-4px)' : 'none',
                  boxShadow: hovered === i
                    ? '0 16px 48px rgba(0,0,0,0.12)'
                    : '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div className="ap-svc-icon-wrap" style={{ background: s.bg }}>
                  <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                </div>
                <h3 className="ap-svc-name">{s.name}</h3>
                <p className="ap-svc-desc">{s.desc}</p>
                <div className="ap-svc-price">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          NÚMEROS
      ════════════════════════════════════════════════════════════ */}
      <section className="ap-stats-section">
        <div className="ap-container">
          <div
            ref={statsRev.ref}
            className="ap-stats-grid ap-reveal"
            style={{ opacity: statsRev.visible ? 1 : 0, transform: statsRev.visible ? 'none' : 'translateY(20px)' }}
          >
            <div ref={cnt1.ref} className="ap-stat">
              <div className="ap-stat-num">{cnt1.count.toLocaleString('pt-BR')}+</div>
              <div className="ap-stat-lbl">Pets atendidos</div>
            </div>
            <div ref={cnt2.ref} className="ap-stat">
              <div className="ap-stat-num">{cnt2.count}%</div>
              <div className="ap-stat-lbl">Satisfação</div>
            </div>
            <div ref={cnt3.ref} className="ap-stat">
              <div className="ap-stat-num">{cnt3.count} anos</div>
              <div className="ap-stat-lbl">Experiência</div>
            </div>
            <div ref={cnt4.ref} className="ap-stat">
              <div className="ap-stat-num">{(cnt4.count / 10).toFixed(1)} ⭐</div>
              <div className="ap-stat-lbl">Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          DEPOIMENTOS
      ════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '6rem 1.5rem' }}>
        <div className="ap-container">
          <div
            ref={testRev.ref}
            className="ap-reveal ap-sec-header"
            style={{ opacity: testRev.visible ? 1 : 0, transform: testRev.visible ? 'none' : 'translateY(20px)', marginBottom: '3rem' }}
          >
            <h2 className="ap-h2">Quem ama, indica</h2>
          </div>

          <div
            className="ap-test-grid ap-reveal"
            style={{ opacity: testRev.visible ? 1 : 0, transform: testRev.visible ? 'none' : 'translateY(20px)', transitionDelay: '0.12s' }}
          >
            {TESTIMONIALS.map((t, i) => {
              const isWide   = t.variant === 'wide-purple'
              const isPurple = t.variant === 'wide-purple'
              const isYellow = t.variant === 'yellow'
              const isBorder = t.variant === 'border'
              return (
                <div
                  key={i}
                  className={`ap-test-card ${isWide ? 'ap-test-wide' : ''}`}
                  style={{
                    background: isPurple ? '#EEF0FF' : isYellow ? '#FFF8E7' : '#FFFFFF',
                    border: isBorder ? '1px solid #E5E5E7' : 'none',
                  }}
                >
                  {/* Aspas decorativas */}
                  <div className="ap-quote" style={{ color: isPurple ? '#5E4AE3' : isYellow ? '#FFB800' : '#1D1D1F' }}>
                    &ldquo;
                  </div>
                  <p className="ap-test-text">{t.text}</p>
                  <div className="ap-test-footer">
                    <div className="ap-avatar">{t.name[0]}</div>
                    <div>
                      <div className="ap-test-name">{t.name}</div>
                      <div className="ap-test-loc">{t.location}</div>
                    </div>
                    <div className="ap-test-stars">★★★★★</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════════════════════ */}
      <section className="ap-cta-section">
        {/* Grid técnico */}
        <div className="ap-cta-grid-bg" aria-hidden="true" />

        <div
          ref={ctaRev.ref}
          className="ap-container ap-cta-inner ap-reveal"
          style={{ opacity: ctaRev.visible ? 1 : 0, transform: ctaRev.visible ? 'none' : 'translateY(20px)' }}
        >
          <h2 className="ap-cta-h2">Agende agora.</h2>
          <p className="ap-cta-sub">Resposta em até 1 hora.</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ap-cta-btn">
            💬 Falar no WhatsApp
          </a>
          <p className="ap-cta-info">Seg a Sáb 8h–19h &nbsp;•&nbsp; Dom 9h–14h &nbsp;•&nbsp; São Paulo</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer className="ap-footer">
        <div className="ap-container ap-footer-inner">
          <div className="ap-logo">Aurora Pet</div>
          <p className="ap-footer-tag">Cuidado premium para seu melhor amigo</p>
          <nav className="ap-footer-nav">
            {['Serviços', 'Sobre', 'Contato'].map(l => (
              <a key={l} href="#" className="ap-footer-link">{l}</a>
            ))}
          </nav>
          <p className="ap-footer-copy">© 2025 Aurora Pet. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════
          STYLES
      ════════════════════════════════════════════════════════════ */}
      <style>{`
        * { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        html { scroll-behavior: smooth; }
        a, button { cursor: none !important; }

        /* ── Cursor ────────────────────────────────────────── */
        .ap-dot {
          position: fixed; width: 8px; height: 8px; border-radius: 50%;
          background: #5E4AE3; pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%); transition: background .15s, transform .1s;
        }
        .ap-ring {
          position: fixed; width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid rgba(94,74,227,.5); pointer-events: none; z-index: 9998;
          transform: translate(-50%,-50%);
        }
        .ap-cta-btn:hover ~ .ap-dot,
        .ap-wa-fixed:hover ~ .ap-dot  { background: #FFB800; }

        /* ── Reveal ────────────────────────────────────────── */
        .ap-reveal { transition: opacity .75s ease, transform .75s ease; }

        /* ── WhatsApp fixo ─────────────────────────────────── */
        @keyframes ap-wa-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}
          50%{box-shadow:0 0 0 14px rgba(37,211,102,0)}
        }
        .ap-wa-fixed {
          position: fixed; bottom: 28px; right: 28px; z-index: 1000;
          display: flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 50px;
          background: #25D366; color: #fff;
          font-family: var(--ap-inter,'Inter',sans-serif);
          font-weight: 500; font-size: .9rem; text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,211,102,.35);
          animation: ap-wa-pulse 2.5s ease-in-out infinite;
          transition: transform .2s;
        }
        .ap-wa-fixed:hover { transform: scale(1.05); }
        @media (max-width: 640px) { .ap-wa-label { display: none; } }

        /* ── Container ─────────────────────────────────────── */
        .ap-container { max-width: 1200px; margin: 0 auto; }

        /* ── HERO ──────────────────────────────────────────── */
        .ap-hero-section {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: center;
          padding: 6rem 1.5rem 4rem; background: #FAFAFA;
        }
        .ap-blob {
          position: absolute; top: -20%; right: -10%;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(94,74,227,.07) 0%, rgba(255,184,0,.05) 60%, transparent 100%);
          pointer-events: none;
        }
        .ap-hero-grid {
          width: 100%; display: grid;
          grid-template-columns: 1fr; gap: 3rem; align-items: center;
          position: relative; z-index: 1;
        }
        @media (min-width: 1024px) {
          .ap-hero-grid { grid-template-columns: 1fr 1fr; }
        }

        /* Pill */
        .ap-pill {
          display: inline-block; padding: 7px 16px; border-radius: 50px;
          background: #EEF0FF; color: #5E4AE3;
          font-size: .8rem; font-weight: 500; margin-bottom: 1.75rem;
        }

        /* H1 */
        .ap-h1 {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(2.8rem,6.5vw,5rem); line-height: 1.08;
          color: #1D1D1F; margin-bottom: 1.25rem;
        }
        .ap-h1-accent { color: #5E4AE3; }

        /* Linha */
        .ap-line {
          width: 60px; height: 3px; border-radius: 2px;
          background: #5E4AE3; margin-bottom: 1.5rem;
        }

        /* Sub */
        .ap-sub {
          font-weight: 300; font-size: clamp(.95rem,1.8vw,1.1rem);
          color: #6E6E73; line-height: 1.75; margin-bottom: 2.25rem;
        }

        /* CTAs */
        .ap-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .ap-btn-primary {
          padding: 14px 28px; border-radius: 12px;
          background: #5E4AE3; color: #fff; font-weight: 500;
          font-size: 1rem; text-decoration: none;
          box-shadow: 0 4px 16px rgba(94,74,227,.3);
          transition: transform .2s, box-shadow .2s;
        }
        .ap-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(94,74,227,.4) !important; }
        .ap-btn-secondary {
          padding: 14px 28px; border-radius: 12px;
          background: #F5F5F7; color: #1D1D1F; font-weight: 500;
          font-size: 1rem; text-decoration: none;
          transition: background .2s;
        }
        .ap-btn-secondary:hover { background: #E8E8EA; }

        /* Trust */
        .ap-trust { display: flex; gap: 1.25rem; flex-wrap: wrap; }
        .ap-trust-item { display: flex; align-items: center; gap: 5px; font-size: .82rem; color: #6E6E73; }

        /* Hero right */
        .ap-hero-right { position: relative; }
        .ap-main-card {
          position: relative; border-radius: 24px; overflow: hidden;
          height: 420px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.12);
        }
        @media (min-width: 1024px) { .ap-main-card { height: 500px; } }
        .ap-card-grad {
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,.25), transparent);
        }

        /* Float cards */
        @keyframes ap-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ap-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .ap-float-a { animation: ap-float-a 4s ease-in-out infinite; }
        .ap-float-b { animation: ap-float-b 5s ease-in-out infinite 1s; }

        .ap-float-card {
          position: absolute; display: flex; align-items: center; gap: 10px;
          padding: 12px 16px; border-radius: 16px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,.12);
          white-space: nowrap;
        }
        .ap-fc-1 {
          top: 24px; left: -16px;
          background: rgba(255,255,255,.92);
          border: 1px solid rgba(255,255,255,.8);
        }
        .ap-fc-2 {
          bottom: 32px; right: -16px;
          background: #5E4AE3; color: #fff;
          flex-direction: column; align-items: flex-start; gap: 2px;
        }
        .ap-fc-icon  { font-size: 1.4rem; }
        .ap-fc-title { font-weight: 600; font-size: .85rem; color: #1D1D1F; }
        .ap-fc-price { font-family: var(--ap-mono,'Space Mono',monospace); font-size: .75rem; color: #5E4AE3; }
        .ap-fc-stars  { font-weight: 700; font-size: 1rem; }
        .ap-fc-reviews{ font-size: .75rem; opacity: .8; }

        /* ── Services ──────────────────────────────────────── */
        .ap-sec-header { text-align: center; margin-bottom: 3.5rem; }
        .ap-sec-label {
          display: inline-block; font-size: .72rem; font-weight: 700;
          letter-spacing: .15em; color: #5E4AE3; margin-bottom: .75rem;
        }
        .ap-h2 {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(1.9rem,4vw,2.8rem); color: #1D1D1F; margin-bottom: .75rem;
        }
        .ap-sec-sub { font-weight: 300; color: #6E6E73; font-size: 1rem; max-width: 420px; margin: 0 auto; }

        .ap-svc-grid {
          display: grid; gap: 1.25rem;
          grid-template-columns: repeat(auto-fill, minmax(min(280px,100%), 1fr));
        }
        .ap-svc-card {
          background: #fff; border-radius: 20px; padding: 1.75rem;
          box-shadow: 0 2px 12px rgba(0,0,0,.06);
        }
        .ap-svc-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem;
        }
        .ap-svc-name  { font-weight: 600; font-size: 1.05rem; color: #1D1D1F; margin-bottom: .35rem; }
        .ap-svc-desc  { font-weight: 300; color: #6E6E73; font-size: .88rem; margin-bottom: .85rem; }
        .ap-svc-price { font-family: var(--ap-mono,'Space Mono',monospace); font-size: .82rem; color: #5E4AE3; }

        /* ── Stats ─────────────────────────────────────────── */
        .ap-stats-section { background: #5E4AE3; padding: 5rem 1.5rem; }
        .ap-stats-grid {
          display: grid; gap: 2rem; text-align: center;
          grid-template-columns: repeat(auto-fill, minmax(min(200px,100%),1fr));
        }
        .ap-stat { }
        .ap-stat-num {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(2.5rem,5vw,3.8rem); color: #fff; line-height: 1;
          margin-bottom: .4rem;
        }
        .ap-stat-lbl { font-weight: 300; color: rgba(255,255,255,.65); font-size: .9rem; }

        /* ── Testimonials ──────────────────────────────────── */
        .ap-test-grid {
          display: grid; gap: 1.25rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .ap-test-grid { grid-template-columns: repeat(2, 1fr); }
          .ap-test-wide { grid-column: span 2; }
        }
        @media (min-width: 1024px) {
          .ap-test-grid { grid-template-columns: 2fr 1fr 1fr; }
          .ap-test-wide { grid-column: span 1; }
        }
        .ap-test-card { border-radius: 20px; padding: 2rem; position: relative; overflow: hidden; }
        .ap-quote {
          font-family: Georgia, serif; font-size: 5rem; line-height: .8;
          opacity: .15; margin-bottom: .5rem; user-select: none;
        }
        .ap-test-text { font-weight: 300; color: #1D1D1F; line-height: 1.7; font-size: .95rem; margin-bottom: 1.5rem; }
        .ap-test-footer { display: flex; align-items: center; gap: .75rem; }
        .ap-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: #5E4AE3; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: .9rem; shrink: 0;
        }
        .ap-test-name  { font-weight: 600; font-size: .88rem; color: #1D1D1F; }
        .ap-test-loc   { font-size: .78rem; color: #6E6E73; }
        .ap-test-stars { margin-left: auto; color: #FFB800; font-size: .82rem; }

        /* ── CTA ───────────────────────────────────────────── */
        .ap-cta-section {
          background: #1D1D1F; padding: 8rem 1.5rem;
          text-align: center; position: relative; overflow: hidden;
        }
        .ap-cta-grid-bg {
          position: absolute; inset: 0; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath d='M50 0L0 0 0 50' fill='none' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E");
        }
        .ap-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .ap-cta-h2 {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(3rem,7vw,5.5rem); color: #fff; line-height: 1.05;
          margin-bottom: .75rem;
        }
        .ap-cta-sub { font-weight: 300; color: rgba(255,255,255,.45); font-size: 1.1rem; margin-bottom: 3rem; }
        @keyframes ap-cta-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(255,184,0,.45),0 8px 24px rgba(255,184,0,.3)}
          50%{box-shadow:0 0 0 18px rgba(255,184,0,0),0 8px 40px rgba(255,184,0,.5)}
        }
        .ap-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 52px; border-radius: 50px;
          background: #FFB800; color: #1D1D1F;
          font-family: var(--ap-inter,'Inter',sans-serif); font-weight: 700;
          font-size: 1.05rem; text-decoration: none;
          animation: ap-cta-pulse 2.5s ease-in-out infinite;
          transition: transform .2s;
        }
        .ap-cta-btn:hover { transform: scale(1.04); }
        .ap-cta-info { font-family: var(--ap-mono,'Space Mono',monospace); color: rgba(255,255,255,.28); font-size: .72rem; margin-top: 1.5rem; }

        /* ── Footer ────────────────────────────────────────── */
        .ap-footer { background: #1D1D1F; border-top: 1px solid rgba(255,255,255,.06); padding: 3.5rem 1.5rem; }
        .ap-footer-inner { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; text-align: center; }
        .ap-logo { font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800; font-size: 1.6rem; color: #fff; }
        .ap-footer-tag { font-weight: 300; color: rgba(255,255,255,.35); font-size: .85rem; }
        .ap-footer-nav { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
        .ap-footer-link { color: rgba(255,255,255,.35); font-size: .85rem; text-decoration: none; transition: color .2s; }
        .ap-footer-link:hover { color: rgba(255,255,255,.7); }
        .ap-footer-copy { font-family: var(--ap-mono,'Space Mono',monospace); color: rgba(255,255,255,.2); font-size: .68rem; }
      `}</style>
    </div>
  )
}
