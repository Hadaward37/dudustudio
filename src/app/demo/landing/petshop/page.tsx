'use client'

// ─── Aurora Pet — Landing Page Demo ──────────────────────────────────────────
// Rota: /demo/landing/petshop
// Vibe: startup de tecnologia que cuida de pets
// Stack: Next.js 'use client' · Syne + Manrope + Space Mono · zero libs externas

import Image from 'next/image'
import { Syne, Manrope, Space_Mono } from 'next/font/google'
import { useEffect, useRef, useState, useCallback, type MouseEvent } from 'react'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--ap-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--ap-manrope' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400'], variable: '--ap-mono' })

const WA = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511999999999'
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent('Olá! Gostaria de agendar um serviço para meu pet 🐾')}`

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '✂️', name: 'Banho & Tosa',    price: 'A partir de R$ 60',     desc: 'Pelagem limpa, perfumada e estilosa' },
  { icon: '🩺', name: 'Consulta Vet',    price: 'A partir de R$ 120',    desc: 'Médico veterinário com hora marcada' },
  { icon: '🏨', name: 'Hotel Pet',       price: 'A partir de R$ 80/dia', desc: 'Seu pet em boa companhia enquanto você viaja' },
  { icon: '💅', name: 'Tosa Artística',  price: 'A partir de R$ 90',     desc: 'Cortes exclusivos para cães e gatos' },
  { icon: '💊', name: 'Vacinas',         price: 'A partir de R$ 45',     desc: 'Carteira de vacinação sempre em dia' },
  { icon: '🛁', name: 'Hidratação',      price: 'A partir de R$ 40',     desc: 'Pelo hidratado, macio e brilhante' },
]

const TESTIMONIALS = [
  {
    text: 'Nunca vi meu golden tão feliz depois de um banho. O atendimento é incrível e o resultado é sempre perfeito!',
    name: 'Amanda K.',
    location: 'Pinheiros',
  },
  {
    text: 'Hotel pet impecável! Deixei minha gata por 10 dias e ela voltou ainda mais saudável. Super recomendo.',
    name: 'Roberto M.',
    location: 'Vila Olímpia',
  },
  {
    text: 'Agendar pelo WhatsApp é super fácil e rápido. Nunca mais fui em outro lugar!',
    name: 'Juliana F.',
    location: 'Moema',
  },
]

const BA_PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80', pet: 'Max',     breed: 'Golden Retriever' },
  { src: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&q=80', pet: 'Luna',    breed: 'Poodle' },
  { src: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&q=80',    pet: 'Bolinha', breed: 'Maltês' },
]

const PARTICLES: { char: string; left: number; top: number; size: number; cls: string; color: string }[] = [
  { char: '🐾', left:  5, top: 15, size: 14, cls: 'ap-p0', color: '#6C2BD9' },
  { char: '✦',  left: 15, top: 70, size: 10, cls: 'ap-p1', color: '#FFE566' },
  { char: '🐾', left: 25, top: 35, size: 12, cls: 'ap-p2', color: '#6C2BD9' },
  { char: '✦',  left: 38, top: 80, size:  9, cls: 'ap-p0', color: '#FFE566' },
  { char: '🐾', left: 52, top: 20, size: 14, cls: 'ap-p1', color: '#6C2BD9' },
  { char: '✦',  left: 63, top: 60, size: 10, cls: 'ap-p2', color: '#FFE566' },
  { char: '🐾', left: 75, top: 40, size: 12, cls: 'ap-p0', color: '#6C2BD9' },
  { char: '✦',  left: 85, top: 75, size:  9, cls: 'ap-p1', color: '#FFE566' },
  { char: '🐾', left: 91, top: 25, size: 13, cls: 'ap-p2', color: '#6C2BD9' },
  { char: '✦',  left: 45, top: 50, size: 10, cls: 'ap-p0', color: '#FFE566' },
  { char: '🐾', left: 70, top: 85, size: 11, cls: 'ap-p1', color: '#6C2BD9' },
  { char: '✦',  left: 30, top: 10, size:  9, cls: 'ap-p2', color: '#FFE566' },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
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
      (entries) => {
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

// ─── Component ───────────────────────────────────────────────────────────────

export default function AuroraPet() {
  // Cursor
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

  // 3-D tilt (services)
  const [tilts, setTilts] = useState<{ rx: number; ry: number }[]>(
    Array(SERVICES.length).fill({ rx: 0, ry: 0 })
  )
  const onTilt = useCallback((e: MouseEvent<HTMLDivElement>, i: number) => {
    const r  = e.currentTarget.getBoundingClientRect()
    const rx = -(((e.clientY - r.top)  / r.height) - 0.5) * 18
    const ry =  (((e.clientX - r.left) / r.width)  - 0.5) * 18
    setTilts(prev => { const n = [...prev]; n[i] = { rx, ry }; return n })
  }, [])
  const offTilt = useCallback((i: number) => {
    setTilts(prev => { const n = [...prev]; n[i] = { rx: 0, ry: 0 }; return n })
  }, [])

  // Before / After
  const [ba, setBa] = useState([false, false, false])
  const toggleBa = (i: number) => setBa(prev => { const n = [...prev]; n[i] = !n[i]; return n })

  // Counters
  const cnt1 = useCounter(2000)
  const cnt2 = useCounter(98)
  const cnt3 = useCounter(5)
  const cnt4 = useCounter(49)   // 49 → display as 4.9

  // Reveal
  const hero     = useReveal()
  const heroR    = useReveal()
  const services = useReveal()
  const baRev    = useReveal()
  const stats    = useReveal()
  const test     = useReveal()
  const cta      = useReveal()

  const cls = `${syne.variable} ${manrope.variable} ${spaceMono.variable}`

  return (
    <div className={cls} style={{ background: '#08060F', color: '#F0ECFF', fontFamily: "var(--ap-manrope,'Manrope',sans-serif)", cursor: 'none' }}>

      {/* ── Custom cursor ── */}
      <div ref={dotRef}  className="ap-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="ap-cursor-ring" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="ap-hero">
        {/* grid SVG bg */}
        <div className="ap-grid-bg" aria-hidden="true" />
        {/* radial glow */}
        <div className="ap-hero-glow" aria-hidden="true" />
        {/* particles */}
        <div className="ap-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`ap-particle ${p.cls}`}
              style={{ left: `${p.left}%`, top: `${p.top}%`, fontSize: p.size, color: p.color }}
            >{p.char}</span>
          ))}
        </div>

        <div className="ap-hero-inner">
          {/* ── Left ── */}
          <div
            ref={hero.ref}
            className="ap-reveal"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? 'none' : 'translateY(28px)' }}
          >
            {/* Badge */}
            <div className="ap-badge">
              <span className="ap-dot" />
              <span style={{ fontFamily: "var(--ap-mono,'Space Mono',monospace)", fontSize: '0.75rem', color: '#9B5DE5', letterSpacing: '0.05em' }}>
                Mais de 2.000 pets atendidos
              </span>
            </div>

            {/* Title */}
            <h1 className="ap-h1">
              <span className="ap-h1-plain">Seu pet merece</span>
              <span className="ap-h1-grad">o melhor</span>
              <span className="ap-h1-stroke">cuidado.</span>
            </h1>

            {/* Sub */}
            <p className="ap-sub">
              Banho, tosa, consultas e muito amor.<br />
              Tudo em um só lugar, com hora marcada.
            </p>

            {/* CTAs */}
            <div className="ap-ctas">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ap-btn-primary">
                💬 Agendar agora
              </a>
              <a href="#servicos" className="ap-btn-ghost">
                Ver serviços ↓
              </a>
            </div>

            {/* Trust */}
            <div className="ap-trust">
              {[
                { icon: '⭐', label: '4.9 Google' },
                { icon: '🐾', label: '2.000+ pets' },
                { icon: '✂️', label: '5 anos' },
                { icon: '📍', label: 'São Paulo' },
              ].map(b => (
                <span key={b.label} className="ap-trust-item">
                  {b.icon} {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right — floating cards ── */}
          <div
            ref={heroR.ref}
            className="ap-cards-wrap ap-reveal"
            style={{ opacity: heroR.visible ? 1 : 0, transform: heroR.visible ? 'none' : 'translateY(28px)', transitionDelay: '0.15s' }}
          >
            {/* Card 1 — top right */}
            <div className="ap-card ap-card-1 ap-float-a">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80"
                alt="Cachorro feliz"
                width={196} height={118}
                loading="lazy" unoptimized
                style={{ borderRadius: 10, objectFit: 'cover', width: '100%', height: 118, display: 'block' }}
              />
              <div style={{ marginTop: 10 }}>
                <div className="ap-card-title">Banho completo</div>
                <div className="ap-card-price">R$ 60</div>
              </div>
            </div>

            {/* Card 2 — center left (bigger) */}
            <div className="ap-card ap-card-2 ap-float-b">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80"
                alt="Gato"
                width={216} height={130}
                loading="lazy" unoptimized
                style={{ borderRadius: 10, objectFit: 'cover', width: '100%', height: 130, display: 'block' }}
              />
              <div style={{ marginTop: 10 }}>
                <div className="ap-card-title" style={{ fontSize: '0.95rem' }}>Consulta veterinária</div>
                <div className="ap-card-price">R$ 120</div>
              </div>
            </div>

            {/* Card 3 — bottom right — stats */}
            <div className="ap-card ap-card-3 ap-float-c" style={{ textAlign: 'center' }}>
              <div className="ap-stat-big">98%</div>
              <div className="ap-stat-label">satisfação 😊</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVIÇOS
      ══════════════════════════════════════════════════════════════ */}
      <section id="servicos" style={{ padding: '6rem 1.5rem', background: '#0C0A14' }}>
        <div className="ap-container">
          <div
            ref={services.ref}
            className="ap-reveal ap-text-center"
            style={{ opacity: services.visible ? 1 : 0, transform: services.visible ? 'none' : 'translateY(28px)', marginBottom: '3.5rem' }}
          >
            <h2 className="ap-h2">Tudo que seu pet precisa</h2>
            <p className="ap-section-sub">Serviços pensados para o conforto e saúde do seu melhor amigo</p>
          </div>

          <div
            className="ap-services-grid ap-reveal"
            style={{ opacity: services.visible ? 1 : 0, transform: services.visible ? 'none' : 'translateY(28px)', transitionDelay: '0.15s' }}
          >
            {SERVICES.map((s, i) => {
              const active = tilts[i].rx !== 0 || tilts[i].ry !== 0
              return (
                <div
                  key={i}
                  className="ap-svc-card"
                  onMouseMove={e => onTilt(e, i)}
                  onMouseLeave={() => offTilt(i)}
                  style={{
                    transform: `perspective(800px) rotateX(${tilts[i].rx}deg) rotateY(${tilts[i].ry}deg)`,
                    transition: active ? 'border-color .15s, box-shadow .15s' : 'transform .5s ease, border-color .3s, box-shadow .3s',
                    borderColor: active ? 'rgba(108,43,217,0.55)' : 'rgba(108,43,217,0.15)',
                    boxShadow: active ? '0 20px 60px rgba(108,43,217,0.25)' : '0 4px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <span className="ap-svc-icon">{s.icon}</span>
                  <h3 className="ap-svc-name">{s.name}</h3>
                  <p className="ap-svc-desc">{s.desc}</p>
                  <div className="ap-svc-price">{s.price}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ANTES E DEPOIS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 1.5rem', background: '#08060F' }}>
        <div className="ap-container">
          <div
            ref={baRev.ref}
            className="ap-reveal ap-text-center"
            style={{ opacity: baRev.visible ? 1 : 0, transform: baRev.visible ? 'none' : 'translateY(28px)', marginBottom: '3.5rem' }}
          >
            <h2 className="ap-h2">Transformações reais</h2>
            <p className="ap-section-sub">Veja o resultado do nosso trabalho</p>
          </div>

          <div
            className="ap-ba-grid ap-reveal"
            style={{ opacity: baRev.visible ? 1 : 0, transform: baRev.visible ? 'none' : 'translateY(28px)', transitionDelay: '0.15s' }}
          >
            {BA_PHOTOS.map((item, i) => (
              <div key={i} className="ap-ba-card">
                <div className="ap-ba-img-wrap">
                  <Image
                    src={item.src}
                    alt={item.pet}
                    fill sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy" unoptimized
                    style={{
                      objectFit: 'cover',
                      filter: ba[i]
                        ? 'grayscale(0%) blur(0px) brightness(1)'
                        : 'grayscale(100%) blur(1px) brightness(0.65)',
                      transition: 'filter 0.6s ease',
                    }}
                  />
                  {ba[i] && <div className="ap-ba-overlay" />}
                  <div className={`ap-ba-label ${ba[i] ? 'ap-ba-label-after' : ''}`}>
                    {ba[i] ? 'DEPOIS' : 'ANTES'}
                  </div>
                </div>
                <div className="ap-ba-footer">
                  <div>
                    <div className="ap-ba-pet">{item.pet}</div>
                    <div className="ap-ba-breed">{item.breed}</div>
                  </div>
                  <button className="ap-ba-btn" onClick={() => toggleBa(i)}>
                    {ba[i] ? '← Ver antes' : 'Ver depois →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NÚMEROS
      ══════════════════════════════════════════════════════════════ */}
      <section className="ap-stats-section">
        <div className="ap-stats-texture" aria-hidden="true" />
        <div className="ap-container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            ref={stats.ref}
            className="ap-stats-grid ap-reveal"
            style={{ opacity: stats.visible ? 1 : 0, transform: stats.visible ? 'none' : 'translateY(28px)' }}
          >
            <div ref={cnt1.ref} className="ap-stat-item">
              <div className="ap-stat-icon">🐾</div>
              <div className="ap-stat-num">{cnt1.count.toLocaleString('pt-BR')}+</div>
              <div className="ap-stat-lbl">Pets atendidos</div>
            </div>
            <div ref={cnt2.ref} className="ap-stat-item">
              <div className="ap-stat-icon">😊</div>
              <div className="ap-stat-num">{cnt2.count}%</div>
              <div className="ap-stat-lbl">Clientes satisfeitos</div>
            </div>
            <div ref={cnt3.ref} className="ap-stat-item">
              <div className="ap-stat-icon">⭐</div>
              <div className="ap-stat-num">{cnt3.count} anos</div>
              <div className="ap-stat-lbl">De experiência</div>
            </div>
            <div ref={cnt4.ref} className="ap-stat-item">
              <div className="ap-stat-icon">📊</div>
              <div className="ap-stat-num">{(cnt4.count / 10).toFixed(1)} ⭐</div>
              <div className="ap-stat-lbl">Avaliação Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DEPOIMENTOS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 1.5rem', background: '#0C0A14' }}>
        <div className="ap-container">
          <div
            ref={test.ref}
            className="ap-reveal ap-text-center"
            style={{ opacity: test.visible ? 1 : 0, transform: test.visible ? 'none' : 'translateY(28px)', marginBottom: '3.5rem' }}
          >
            <h2 className="ap-h2">Quem ama, indica</h2>
          </div>

          <div
            className="ap-test-grid ap-reveal"
            style={{ opacity: test.visible ? 1 : 0, transform: test.visible ? 'none' : 'translateY(28px)', transitionDelay: '0.15s' }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="ap-test-card">
                <div className="ap-stars">★★★★★</div>
                <p className="ap-test-text">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="ap-test-name">{t.name}</div>
                  <div className="ap-test-loc">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════════ */}
      <section className="ap-cta-section">
        {/* decorative paws */}
        {[6, 8, 10, 8, 7].map((size, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute', fontSize: `${size}rem`, opacity: 0.04,
              top: `${8 + i * 16}%`, left: `${i * 20}%`, userSelect: 'none', pointerEvents: 'none',
            }}
          >🐾</div>
        ))}

        <div
          ref={cta.ref}
          className="ap-cta-inner ap-reveal"
          style={{ opacity: cta.visible ? 1 : 0, transform: cta.visible ? 'none' : 'translateY(28px)' }}
        >
          <h2 className="ap-cta-h2">
            Agende agora,<br />
            <span className="ap-cta-grad">seu pet merece.</span>
          </h2>
          <p className="ap-cta-sub">Resposta em até 1 hora. Sem fila, sem espera.</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ap-cta-btn">
            💬 Agendar pelo WhatsApp
          </a>
          <p className="ap-cta-info">
            Seg a Sáb: 8h às 19h &nbsp;|&nbsp; Dom: 9h às 14h &nbsp;|&nbsp; Rua dos Pets, 123 — São Paulo
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer className="ap-footer">
        <div className="ap-container ap-footer-inner">
          <div className="ap-logo">
            <span style={{ color: '#6C2BD9' }}>Aurora</span>
            <span style={{ color: '#FFD60A' }}>Pet</span>
          </div>
          <p className="ap-footer-tag">Cuidado premium para seu melhor amigo</p>
          <nav className="ap-footer-nav">
            {['Serviços', 'Sobre', 'Contato'].map(l => (
              <a key={l} href="#" className="ap-footer-link">{l}</a>
            ))}
          </nav>
          <div className="ap-footer-social">
            <a href="#" className="ap-social-btn">📷 Instagram</a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="ap-social-btn">💬 WhatsApp</a>
          </div>
          <p className="ap-copyright">© 2025 Aurora Pet. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── Cursor ───────────────────────────────────────────── */
        .ap-cursor-dot {
          position: fixed; width: 8px; height: 8px; border-radius: 50%;
          background: #6C2BD9; pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
          transition: background .15s, transform .1s;
        }
        .ap-cursor-ring {
          position: fixed; width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid rgba(108,43,217,.55); pointer-events: none; z-index: 9998;
          transform: translate(-50%, -50%);
        }
        a:hover ~ .ap-cursor-dot,
        button:hover ~ .ap-cursor-dot { background: #FFD60A; }
        a, button { cursor: none !important; }

        /* ── Reveal transition ────────────────────────────────── */
        .ap-reveal { transition: opacity .8s ease, transform .8s ease; }

        /* ── HERO ─────────────────────────────────────────────── */
        .ap-hero {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: center; padding: 6rem 1.5rem 4rem;
        }
        .ap-grid-bg {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M60 0L0 0 0 60' fill='none' stroke='%236C2BD9' stroke-width='.5' opacity='.06'/%3E%3C/svg%3E");
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .ap-hero-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 720px; height: 720px; border-radius: 50%;
          background: radial-gradient(circle, rgba(108,43,217,.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .ap-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .ap-particle  { position: absolute; user-select: none; }

        @keyframes ap-p0 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-20px) rotate(10deg)} }
        @keyframes ap-p1 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-30px) rotate(-8deg)} }
        @keyframes ap-p2 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-16px) rotate(5deg)} }
        .ap-p0 { animation: ap-p0 6s ease-in-out infinite; }
        .ap-p1 { animation: ap-p1 8s ease-in-out infinite 1s; }
        .ap-p2 { animation: ap-p2 7s ease-in-out infinite 2s; }

        .ap-hero-inner {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr; gap: 3rem;
          position: relative; z-index: 1; align-items: center;
        }
        @media (min-width: 1024px) {
          .ap-hero-inner { grid-template-columns: 3fr 2fr; }
        }

        /* Badge */
        .ap-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 50px;
          border: 1px solid rgba(108,43,217,.35);
          background: rgba(108,43,217,.08); margin-bottom: 1.75rem;
        }
        @keyframes ap-dot-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(108,43,217,.5)}
          50%{box-shadow:0 0 0 7px rgba(108,43,217,0)}
        }
        .ap-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #6C2BD9; display: inline-block;
          animation: ap-dot-pulse 2s ease-in-out infinite;
        }

        /* H1 */
        .ap-h1 {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(2.6rem,7vw,5.2rem); line-height: 1.05;
          margin-bottom: 1.5rem;
        }
        .ap-h1-plain  { display: block; color: #F0ECFF; }
        .ap-h1-grad   {
          display: block;
          background: linear-gradient(90deg,#6C2BD9,#FFD60A);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ap-h1-stroke {
          display: block; color: transparent;
          -webkit-text-stroke: 2px #6C2BD9;
        }

        .ap-sub {
          font-weight: 300; font-size: clamp(.95rem,2vw,1.15rem);
          color: #8B85A0; margin-bottom: 2.25rem; max-width: 480px; line-height: 1.75;
        }

        /* CTAs */
        .ap-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.25rem; }
        .ap-btn-primary {
          padding: 14px 32px; border-radius: 50px;
          background: linear-gradient(135deg,#6C2BD9,#4A1A9E);
          color: #fff; font-weight: 500; font-size: 1rem;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 0 30px rgba(108,43,217,.4);
          transition: transform .2s, box-shadow .2s;
        }
        .ap-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 50px rgba(108,43,217,.65) !important;
        }
        .ap-btn-ghost {
          padding: 14px 32px; border-radius: 50px;
          border: 1px solid rgba(108,43,217,.5);
          color: #9B5DE5; font-weight: 500; font-size: 1rem;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          transition: background .2s, color .2s;
        }
        .ap-btn-ghost:hover { background: rgba(108,43,217,.12); color: #C084FC; }

        /* Trust */
        .ap-trust { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .ap-trust-item {
          display: flex; align-items: center; gap: 6px;
          color: #8B85A0; font-size: .85rem;
        }

        /* Floating cards */
        .ap-cards-wrap {
          position: relative; min-height: 440px;
          display: flex; justify-content: center;
        }
        @media (max-width: 1023px) {
          .ap-cards-wrap {
            flex-wrap: wrap; gap: 1rem; min-height: auto; align-items: flex-start;
          }
          .ap-card { position: relative !important; top:auto !important; left:auto !important;
            right:auto !important; bottom:auto !important; flex: 1; min-width: 160px; max-width: 220px; }
        }

        .ap-card {
          background: rgba(16,13,26,.92); border: 1px solid rgba(108,43,217,.25);
          border-radius: 16px; padding: 12px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(108,43,217,.15);
        }
        @media (min-width: 1024px) {
          .ap-card { position: absolute; }
          .ap-card-1 { top: 0;   right: 5%;   width: 220px; z-index: 3; }
          .ap-card-2 { top: 28%; left: 0;     width: 240px; z-index: 4; box-shadow: 0 12px 40px rgba(108,43,217,.22); }
          .ap-card-3 { bottom: 5%; right: 8%; width: 180px; z-index: 3; padding: 20px; }
        }
        .ap-card-title { font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 700; font-size: .85rem; }
        .ap-card-price  { font-family: var(--ap-mono,'Space Mono',monospace); color: #FFD60A; font-size: .78rem; margin-top: 3px; }
        .ap-stat-big    { font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800; font-size: 2.2rem; color: #FFD60A; }
        .ap-stat-label  { font-size: .78rem; color: #8B85A0; margin-top: 4px; }

        @keyframes ap-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ap-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes ap-float-c { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .ap-float-a { animation: ap-float-a 3s ease-in-out infinite; }
        .ap-float-b { animation: ap-float-b 4s ease-in-out infinite; }
        .ap-float-c { animation: ap-float-c 5s ease-in-out infinite; }

        /* ── Shared ───────────────────────────────────────────── */
        .ap-container  { max-width: 1200px; margin: 0 auto; }
        .ap-text-center { text-align: center; }
        .ap-h2 {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(1.9rem,4vw,3rem); margin-bottom: .9rem;
        }
        .ap-section-sub { font-weight: 300; color: #8B85A0; font-size: 1.05rem; max-width: 480px; margin: 0 auto; }

        /* ── Services ─────────────────────────────────────────── */
        .ap-services-grid {
          display: grid; gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(min(320px,100%), 1fr));
        }
        .ap-svc-card {
          background: #100D1A; border: 1px solid rgba(108,43,217,.15);
          border-radius: 20px; padding: 2rem; will-change: transform;
        }
        .ap-svc-icon { font-size: 2.4rem; display: block; margin-bottom: 1rem; }
        .ap-svc-name {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 700;
          font-size: 1.15rem; margin-bottom: .45rem;
        }
        .ap-svc-desc { font-weight: 300; color: #8B85A0; font-size: .88rem; line-height: 1.65; margin-bottom: .9rem; }
        .ap-svc-price { font-family: var(--ap-mono,'Space Mono',monospace); font-size: .82rem; color: #FFD60A; }

        /* ── Before / After ───────────────────────────────────── */
        .ap-ba-grid {
          display: grid; gap: 2rem;
          grid-template-columns: repeat(auto-fill, minmax(min(300px,100%), 1fr));
        }
        .ap-ba-card {
          background: #100D1A; border: 1px solid rgba(108,43,217,.2);
          border-radius: 20px; overflow: hidden;
        }
        .ap-ba-img-wrap { position: relative; height: 240px; overflow: hidden; }
        .ap-ba-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg,rgba(108,43,217,.15),transparent);
        }
        .ap-ba-label {
          position: absolute; top: 12px; left: 12px;
          padding: 4px 12px; border-radius: 50px;
          background: rgba(0,0,0,.72); color: #fff;
          font-family: var(--ap-mono,'Space Mono',monospace);
          font-size: .68rem; letter-spacing: .1em;
          transition: background .4s;
        }
        .ap-ba-label-after { background: rgba(108,43,217,.82); }
        .ap-ba-footer {
          padding: 1.25rem;
          display: flex; justify-content: space-between; align-items: center;
        }
        .ap-ba-pet   { font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 700; font-size: .95rem; }
        .ap-ba-breed { color: #8B85A0; font-size: .82rem; margin-top: 2px; }
        .ap-ba-btn {
          padding: 8px 18px; border-radius: 50px;
          border: 1px solid rgba(108,43,217,.4);
          background: rgba(108,43,217,.1); color: #9B5DE5;
          font-size: .78rem; transition: background .2s, color .2s;
        }
        .ap-ba-btn:hover { background: rgba(108,43,217,.22); color: #C084FC; }

        /* ── Stats ────────────────────────────────────────────── */
        .ap-stats-section {
          padding: 6rem 1.5rem; position: relative; overflow: hidden;
          background: linear-gradient(135deg,#1A0A3A 0%,#0E0720 100%);
        }
        .ap-stats-texture {
          position: absolute; inset: 0; opacity: .03;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%236C2BD9'/%3E%3C/svg%3E");
        }
        .ap-stats-grid {
          display: grid; gap: 3rem; text-align: center;
          grid-template-columns: repeat(auto-fill, minmax(min(220px,100%), 1fr));
        }
        .ap-stat-item { }
        .ap-stat-icon { font-size: 2rem; margin-bottom: .5rem; }
        .ap-stat-num  {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(2.8rem,5.5vw,4.2rem); color: #F0ECFF; line-height: 1;
        }
        .ap-stat-lbl  { font-weight: 300; color: #8B85A0; font-size: .9rem; margin-top: .5rem; }

        /* ── Testimonials ─────────────────────────────────────── */
        .ap-test-grid {
          display: grid; gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(min(300px,100%), 1fr));
        }
        .ap-test-card {
          background: rgba(16,13,26,.85); border: 1px solid rgba(108,43,217,.2);
          border-radius: 20px; padding: 2rem;
          backdrop-filter: blur(20px); box-shadow: 0 4px 24px rgba(0,0,0,.2);
        }
        .ap-stars      { color: #FFD60A; font-size: .88rem; margin-bottom: 1rem; }
        .ap-test-text  { font-weight: 300; color: #C8C4D8; line-height: 1.75; margin-bottom: 1.5rem; font-size: .9rem; }
        .ap-test-name  { font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 700; font-size: .88rem; }
        .ap-test-loc   { color: #8B85A0; font-size: .78rem; margin-top: 2px; }

        /* ── CTA ──────────────────────────────────────────────── */
        .ap-cta-section {
          padding: 8rem 1.5rem; text-align: center; position: relative; overflow: hidden;
          background: linear-gradient(135deg,#1A0433 0%,#3A0E8A 55%,#6C2BD9 100%);
        }
        .ap-cta-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .ap-cta-h2 {
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: clamp(2.4rem,6vw,4.2rem); line-height: 1.1;
          color: #fff; margin-bottom: 1.5rem;
        }
        .ap-cta-grad {
          background: linear-gradient(90deg,#FFE566,#FFD60A);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ap-cta-sub {
          font-weight: 300; color: rgba(255,255,255,.68);
          font-size: 1.05rem; margin-bottom: 3rem;
        }
        @keyframes ap-pulse-glow {
          0%,100%{box-shadow:0 0 0 0 rgba(255,214,10,.45),0 8px 32px rgba(255,214,10,.3)}
          50%{box-shadow:0 0 0 18px rgba(255,214,10,0),0 8px 48px rgba(255,214,10,.55)}
        }
        .ap-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 18px 52px; border-radius: 50px;
          background: #FFD60A; color: #08060F;
          font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800;
          font-size: 1.05rem; text-decoration: none;
          animation: ap-pulse-glow 2.5s ease-in-out infinite;
          transition: transform .2s;
        }
        .ap-cta-btn:hover { transform: scale(1.04); }
        .ap-cta-info {
          font-family: var(--ap-mono,'Space Mono',monospace);
          color: rgba(255,255,255,.42); font-size: .72rem; margin-top: 1.5rem;
        }

        /* ── Footer ───────────────────────────────────────────── */
        .ap-footer {
          background: #08060F; border-top: 1px solid rgba(108,43,217,.15);
          padding: 3.5rem 1.5rem;
        }
        .ap-footer-inner {
          display: flex; flex-direction: column;
          align-items: center; gap: 1.25rem; text-align: center;
        }
        .ap-logo { font-family: var(--ap-syne,'Syne',sans-serif); font-weight: 800; font-size: 1.8rem; }
        .ap-footer-tag { font-weight: 300; color: #8B85A0; font-size: .88rem; }
        .ap-footer-nav { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
        .ap-footer-link { color: #8B85A0; font-size: .88rem; text-decoration: none; transition: color .2s; }
        .ap-footer-link:hover { color: #9B5DE5; }
        .ap-footer-social { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .ap-social-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border: 1px solid rgba(108,43,217,.25); border-radius: 50px;
          color: #8B85A0; font-size: .82rem; text-decoration: none; transition: border-color .2s, color .2s;
        }
        .ap-social-btn:hover { border-color: rgba(108,43,217,.6); color: #9B5DE5; }
        .ap-copyright { font-family: var(--ap-mono,'Space Mono',monospace); color: #3D3850; font-size: .7rem; }

        /* ── Global ───────────────────────────────────────────── */
        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}
