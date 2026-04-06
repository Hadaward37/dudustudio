'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Syne, Manrope, Space_Mono } from 'next/font/google'
import { sites } from '@/lib/sites'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const syne      = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-syne' })
const manrope   = Manrope({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-manrope' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono' })

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  bg:      '#080808',
  bg2:     '#0f0f0f',
  accent:  '#00ff88',
  accent2: '#7b61ff',
  accent3: '#ff6b35',
  text:    '#f0f0f0',
}

// ── Static data ────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  'Sites Completos', 'Landing Pages', 'WhatsApp Ready',
  'Mobile First', 'Deploy Rápido', 'Design Premium',
]

const HOW_STEPS = [
  {
    num: '01', title: 'Você escolhe',
    body: 'Navega pelo hub, escolhe o template que combina com seu negócio e fala comigo no WhatsApp.',
  },
  {
    num: '02', title: 'Eu personalizo',
    body: 'Troco cores, textos, fotos e dados. Seu site fica com a cara do seu negócio em até 7 dias.',
  },
  {
    num: '03', title: 'Vai ao ar',
    body: 'Faço o deploy com domínio, SSL gratuito e te entrego tudo funcionando e pronto para usar.',
  },
]

const PRICING_PLANS = [
  {
    name: 'Landing Page', price: 650, highlight: false,
    desc: 'Ideal para quem quer uma presença digital rápida e focada em conversão.',
    features: ['1 página otimizada', 'Mobile 100%', 'CTAs WhatsApp', 'Deploy + domínio', 'SEO básico', '30 dias suporte'],
  },
  {
    name: 'Site Completo', price: 1200, highlight: true,
    desc: 'Para negócios que precisam de um site completo e profissional.',
    features: ['Até 5 páginas', 'Design personalizado', 'Animações exclusivas', 'Cardápio / Catálogo', 'Deploy + domínio', '30 dias suporte'],
  },
  {
    name: 'E-commerce', price: 3500, highlight: false,
    desc: 'Loja online completa com catálogo, carrinho e checkout visual.',
    features: ['Catálogo ilimitado', 'Carrinho WhatsApp', 'Filtros avançados', 'SEO avançado', 'Deploy + domínio', '60 dias suporte'],
  },
]

const FAQ_ITEMS = [
  { q: 'Quanto tempo leva para ficar pronto?',   a: 'Landing pages ficam prontas em 3 dias. Sites completos em até 7 dias. E-commerces em até 14 dias corridos.' },
  { q: 'Preciso ter hosting ou domínio?',         a: 'Não. Cuidamos de tudo — hospedagem, domínio e SSL. Você só precisa escolher o nome do domínio.' },
  { q: 'Posso mudar as cores e conteúdo?',        a: 'Sim! Todo o conteúdo é personalizado para o seu negócio: cores, textos, fotos, logo e dados de contato.' },
  { q: 'Como funciona o suporte?',                a: 'Atendo via WhatsApp pelo período incluído no plano. Qualquer ajuste de texto ou imagem está coberto.' },
  { q: 'Posso ver o site antes de pagar?',        a: 'Você vê os demos ao vivo aqui no hub. Após o pagamento, aprovo um protótipo antes do deploy final.' },
]

// ── Helpers ────────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const pad3 = (n: number) => String(Math.floor(n)).padStart(3, '0')

// ── Component ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const titleRef      = useRef<HTMLHeadingElement>(null)
  const cursorDotRef  = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const loadingRef    = useRef<HTMLDivElement>(null)
  const counterRef    = useRef<HTMLSpanElement>(null)
  const [loaded,       setLoaded]       = useState(false)
  const [navScrolled,  setNavScrolled]  = useState(false)
  const [faqOpen,      setFaqOpen]      = useState<number | null>(null)
  const [isTouch,      setIsTouch]      = useState(false)
  const [ctaHover,     setCtaHover]     = useState(false)
  const [mobileMenu,   setMobileMenu]   = useState(false)

  // ── (entry check removed — /vitrine is the main hub) ─────────────────────

  // ── Touch detection ───────────────────────────────────────────────────────
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // ── Loading screen ────────────────────────────────────────────────────────
  useEffect(() => {
    const duration = 1800
    const steps    = 100
    const interval = duration / steps
    let count = 0
    const id = setInterval(() => {
      count++
      if (counterRef.current) counterRef.current.textContent = pad3(count)
      if (count >= steps) {
        clearInterval(id)
        setTimeout(() => {
          if (loadingRef.current) {
            loadingRef.current.style.transition = 'transform 0.9s cubic-bezier(0.76,0,0.24,1)'
            loadingRef.current.style.transform  = 'translateY(-100%)'
            setTimeout(() => setLoaded(true), 900)
          }
        }, 280)
      }
    }, interval)
    return () => clearInterval(id)
  }, [])

  // ── Fallback: garante que a loading screen some em até 2s ─────────────────
  useEffect(() => {
    const id = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(id)
  }, [])

  // ── Custom cursor ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (isTouch) return
    let mx = 0, my = 0, rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const animate = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      if (cursorDotRef.current)  cursorDotRef.current.style.transform  = `translate(${mx - 4}px,${my - 4}px)`
      if (cursorRingRef.current) cursorRingRef.current.style.transform = `translate(${rx - 20}px,${ry - 20}px)`
      raf = requestAnimationFrame(animate)
    }

    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => cursorRingRef.current?.classList.add('ring-hover'))
      el.addEventListener('mouseleave', () => cursorRingRef.current?.classList.remove('ring-hover'))
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(addHover)
    raf = requestAnimationFrame(animate)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [isTouch, loaded])

  // ── Nav scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // ── Canvas particles ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width  = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)
    let raf: number

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,255,136,0.55)'
        ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,255,136,${0.12 * (1 - d / 120)})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    // Pausa animação quando aba fica oculta (performance)
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // ── GSAP animations ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    gsap.registerPlugin(ScrollTrigger)

    // Hero title — word stagger (never breaks mid-word)
    const title = titleRef.current
    if (title) {
      const original = title.innerText ?? ''
      title.innerHTML = original.split(' ').map(word =>
        `<span class="word" style="display:inline-block;white-space:nowrap;opacity:0;transform:translateY(28px)">${word}</span>`
      ).join(' ')
      gsap.to(title.querySelectorAll<HTMLElement>('.word'), {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3,
      })
    }

    // Generic scroll reveal
    gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
      )
    })

    // HowItWorks steps — slide from left
    gsap.utils.toArray<HTMLElement>('.gsap-step').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true } }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [loaded])

  // ── Parallax ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    const factor = isTouch ? 0.3 : 1
    const fn = () => {
      const y  = window.scrollY
      const l1 = document.querySelector<HTMLElement>('.parallax-1')
      const l2 = document.querySelector<HTMLElement>('.parallax-2')
      const l3 = document.querySelector<HTMLElement>('.parallax-3')
      if (l1) l1.style.transform = `translateY(${y * 0.10 * factor}px)`
      if (l2) l2.style.transform = `translateY(${y * 0.20 * factor}px)`
      if (l3) l3.style.transform = `translateY(${y * 0.30 * factor}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [loaded, isTouch])

  // ── Counter animations ────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return
    const obs = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el     = entry.target as HTMLElement
        const target = Number(el.dataset.count)
        const start  = performance.now()
        const dur    = 1600
        const tick   = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString('pt-BR')
          if (p < 1) requestAnimationFrame(tick)
          else el.textContent = target.toLocaleString('pt-BR')
        }
        requestAnimationFrame(tick)
        obs.unobserve(el)
      }
    }, { threshold: 0.5 })
    document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [loaded])

  // ── Ripple effect ─────────────────────────────────────────────────────────
  const handleRipple = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn  = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const el   = document.createElement('span')
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:0;height:0;border-radius:50%;background:rgba(0,255,136,0.25);transform:translate(-50%,-50%);animation:ripple 0.7s ease-out forwards;pointer-events:none;`
    btn.appendChild(el)
    setTimeout(() => el.remove(), 700)
  }, [])

  // ── Derived ───────────────────────────────────────────────────────────────
  const fullSites    = sites.filter(s => !s.slug.startsWith('landing/'))
  const landingSites = sites.filter(s =>  s.slug.startsWith('landing/'))

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className={`${syne.variable} ${manrope.variable} ${spaceMono.variable}`}
      style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-manrope),sans-serif', overflowX: 'hidden' }}
    >
      {/* ── Global styles ─────────────────────────────────────────────────── */}
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.accent};border-radius:4px}

        .c-dot{position:fixed;z-index:9999;width:8px;height:8px;border-radius:50%;background:${C.accent};pointer-events:none;top:0;left:0;will-change:transform}
        .c-ring{position:fixed;z-index:9998;width:40px;height:40px;border-radius:50%;border:1.5px solid ${C.accent};pointer-events:none;top:0;left:0;opacity:.55;will-change:transform;transition:border-color .2s,width .2s,height .2s}
        .ring-hover{width:52px;height:52px;border-color:#fff;margin:-6px}

        .nav-a{position:relative;color:#777;font-family:var(--font-manrope);font-size:.82rem;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;transition:color .2s}
        .nav-a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:${C.accent};transition:width .25s}
        .nav-a:hover{color:${C.accent}}
        .nav-a:hover::after{width:100%}
        @media(max-width:640px){.nav-a{display:none}.nav-wpp-btn{display:none}}

        .hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;background:transparent;border:none;cursor:pointer;padding:4px;z-index:600}
        .hamburger span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .3s,opacity .3s}
        @media(max-width:640px){.hamburger{display:flex}}

        .mobile-overlay{position:fixed;inset:0;z-index:550;background:rgba(8,8,8,.98);backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem;transition:opacity .35s,transform .35s}
        .mobile-overlay.closed{opacity:0;transform:translateY(-12px);pointer-events:none}
        .mobile-overlay.open{opacity:1;transform:translateY(0);pointer-events:all}
        .mobile-nav-a{font-family:var(--font-syne);font-weight:700;font-size:2rem;color:#fff;text-decoration:none;letter-spacing:-.02em;transition:color .2s}
        .mobile-nav-a:hover{color:${C.accent}}

        .site-card{position:relative;border:1px solid rgba(255,255,255,.06);border-radius:12px;overflow:hidden;cursor:pointer;transition:border-color .3s,transform .3s;background:${C.bg2};text-decoration:none;display:block}
        .site-card:hover{border-color:rgba(0,255,136,.25);transform:translateY(-4px)}

        @property --a{syntax:'<angle>';initial-value:0deg;inherits:false}
        @keyframes led{to{--a:360deg}}
        .led{position:absolute;inset:0;border-radius:inherit;opacity:0;transition:opacity .3s;pointer-events:none;background:conic-gradient(from var(--a) at 50% 50%,transparent 0deg,${C.accent} 60deg,transparent 120deg);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px}
        .site-card:hover .led{opacity:1;animation:led 2.5s linear infinite}

        @property --p{syntax:'<angle>';initial-value:0deg;inherits:false}
        @keyframes pled{to{--p:360deg}}
        .p-led{position:absolute;inset:-1px;border-radius:13px;pointer-events:none;background:conic-gradient(from var(--p) at 50% 50%,transparent 0deg,${C.accent} 80deg,transparent 160deg);animation:pled 3.5s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px}

        .marquee-t{display:flex;gap:3rem;white-space:nowrap;animation:mq 28s linear infinite}
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .acc-body{overflow:hidden;transition:max-height .4s cubic-bezier(.16,1,.3,1),opacity .3s;max-height:0;opacity:0}
        .acc-body.open{max-height:200px;opacity:1}

        @keyframes ripple{to{width:400px;height:400px;opacity:0}}
        @keyframes float-dot{0%,100%{transform:scale(1)}50%{transform:scale(1.4)}}
        @keyframes float-slow{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      `}</style>

      {/* ── Custom cursor ─────────────────────────────────────────────────── */}
      {!isTouch && <>
        <div ref={cursorDotRef}  className="c-dot"  aria-hidden="true" />
        <div ref={cursorRingRef} className="c-ring" aria-hidden="true" />
      </>}

      {/* ── Loading screen ─────────────────────────────────────────────────── */}
      <div ref={loadingRef} role="status" aria-label="Carregando DuduStudio" style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: C.bg, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: loaded ? 'none' : 'all',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(3.5rem,10vw,7.5rem)', color: C.accent, letterSpacing: '.02em', lineHeight: 1 }}>
          <span ref={counterRef}>000</span>
        </div>
        <div style={{ marginTop: '.9rem', fontFamily: 'var(--font-syne)', fontSize: '.72rem', letterSpacing: '.28em', color: '#444', textTransform: 'uppercase' }}>
          DuduStudio
        </div>
      </div>

      {/* ── NavBar ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: '64px', display: 'flex', alignItems: 'center',
        padding: '0 clamp(1rem,5vw,3rem)',
        background: navScrolled ? 'rgba(8,8,8,.92)' : 'transparent',
        backdropFilter: navScrolled ? 'blur(14px)' : 'none',
        borderBottom: navScrolled ? '1px solid rgba(255,255,255,.05)' : '1px solid transparent',
        transition: 'background .4s,backdrop-filter .4s,border-color .4s',
      }}>
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.1rem', color: '#fff', letterSpacing: '-.02em', marginRight: 'auto' }}>
          Dudu<span style={{ color: C.accent }}>Studio</span>
        </span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[['Sites','#sites'],['Como Funciona','#como-funciona'],['Preços','#precos'],['FAQ','#faq']].map(([label, href]) => (
            <a key={href} href={href} className="nav-a">{label}</a>
          ))}
          <a
            href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
            className="nav-wpp-btn"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.8rem', letterSpacing: '.06em', textTransform: 'uppercase', textDecoration: 'none', color: C.bg, background: C.accent, padding: '.5rem 1.2rem', borderRadius: '6px' }}
          >
            WhatsApp
          </a>
          <button
            className="hamburger"
            onClick={() => setMobileMenu(v => !v)}
            aria-label={mobileMenu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenu}
          >
            <span style={{ transform: mobileMenu ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ opacity: mobileMenu ? 0 : 1 }} />
            <span style={{ transform: mobileMenu ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ─────────────────────────────────────────────── */}
      <div className={`mobile-overlay ${mobileMenu ? 'open' : 'closed'}`} aria-hidden={!mobileMenu}>
        {[['Sites','#sites'],['Como Funciona','#como-funciona'],['Preços','#precos'],['FAQ','#faq']].map(([label, href]) => (
          <a key={href} href={href} className="mobile-nav-a" onClick={() => setMobileMenu(false)}>{label}</a>
        ))}
        <a
          href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
          onClick={() => setMobileMenu(false)}
          style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1rem', letterSpacing: '.06em', textTransform: 'uppercase', textDecoration: 'none', color: C.bg, background: C.accent, padding: '.75rem 2rem', borderRadius: '8px', marginTop: '1rem' }}
        >
          WhatsApp →
        </a>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '64px' }}>
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: .7 }} />

        {/* Glow blobs — parallax layers */}
        <div className="parallax-1" style={{ position: 'absolute', top: '-10%', left: '-15%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,255,136,.055) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="parallax-2" style={{ position: 'absolute', bottom: '0%',  right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(123,97,255,.07) 0%,transparent 70%)',  pointerEvents: 'none' }} />
        <div className="parallax-3" style={{ position: 'absolute', top: '30%',   left: '40%',   width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,53,.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(4rem,8vh,6rem) clamp(1rem,5vw,3rem)' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(0,255,136,.07)', border: '1px solid rgba(0,255,136,.18)', borderRadius: '100px', padding: '.35rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent, display: 'inline-block', animation: 'float-dot 1.8s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: C.accent, letterSpacing: '.1em' }}>
              Sites prontos. Negócio no ar.
            </span>
          </div>

          <h1
            ref={titleRef}
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2.8rem,7vw,6.5rem)', lineHeight: 1.05, letterSpacing: '-.03em', color: '#fff', marginBottom: '1.5rem' }}
          >
            Sites que vendem. No ar em dias.
          </h1>

          <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: 'clamp(1rem,2vw,1.2rem)', color: '#777', lineHeight: 1.7, maxWidth: '520px', marginBottom: '2.5rem' }}>
            Hub de sites prontos para personalizar. Escolha o template, eu ajusto para o seu negócio e coloco no ar.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <a href="#sites" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.04em', textDecoration: 'none', background: C.accent, color: C.bg, padding: '.85rem 2rem', borderRadius: '8px' }}>
              Ver Sites
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.04em', textDecoration: 'none', color: '#fff', padding: '.85rem 2rem', border: '1px solid rgba(255,255,255,.15)', borderRadius: '8px' }}>
              Falar no WhatsApp →
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Sites entregues',    value: 47,  suffix: '+' },
              { label: 'Clientes satisfeitos', value: 98, suffix: '%' },
              { label: 'Dias em média',       value: 7,   suffix: '' },
            ].map((stat, i) => (
              <div key={i} style={{ borderLeft: `2px solid rgba(0,255,136,.18)`, paddingLeft: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2rem', color: '#fff', lineHeight: 1 }}>
                  <span data-count={stat.value}>0</span>{stat.suffix}
                </div>
                <div style={{ fontFamily: 'var(--font-manrope)', fontSize: '.78rem', color: '#555', marginTop: '.25rem', letterSpacing: '.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ────────────────────────────────────────────────────────── */}
      <div style={{ background: C.accent, padding: '.9rem 0', overflow: 'hidden' }}>
        <div className="marquee-t">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.88rem', letterSpacing: '.1em', textTransform: 'uppercase', color: C.bg, flexShrink: 0 }}>
              {item}<span style={{ opacity: .35, margin: '0 1.5rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Sites Grid ─────────────────────────────────────────────────────── */}
      <section id="sites" style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1rem,5vw,3rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header — Full Sites */}
          <div className="gsap-reveal" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.75rem', marginBottom: '.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: C.accent, letterSpacing: '.15em', textTransform: 'uppercase' }}>01 /</span>
              <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#fff' }}>Sites Completos</span>
            </div>
            <p style={{ fontFamily: 'var(--font-manrope)', color: '#555', fontSize: '.92rem', maxWidth: '460px' }}>
              Sites multi-página com design premium. Ideal para negócios que precisam de presença completa.
            </p>
          </div>

          {/* Full Sites Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(280px,100%),1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            {fullSites.map((site, i) => (
              <Link key={site.id} href={`/demo/${site.slug}`} className="site-card" style={{ transitionDelay: `${i * .07}s` }}>
                <div className="led" />
                {/* Thumbnail area */}
                <div style={{ height: '196px', background: `linear-gradient(135deg,#111 0%,#181818 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,.05)', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2.8rem', color: 'rgba(255,255,255,.03)', letterSpacing: '-.04em', userSelect: 'none' }}>{site.name}</span>
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
                    {site.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '.63rem', color: C.accent, background: 'rgba(0,255,136,.07)', border: '1px solid rgba(0,255,136,.14)', borderRadius: '4px', padding: '.18rem .45rem', letterSpacing: '.04em' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Card body */}
                <div style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.4rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.98rem', color: '#fff' }}>{site.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.66rem', color: '#444', marginTop: '.12rem' }}>{site.category}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.1rem', color: C.accent }}>
                      R$ {site.price.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '.8rem', color: '#555', lineHeight: 1.6, marginBottom: '.9rem' }}>
                    {site.description.length > 88 ? site.description.slice(0, 88) + '…' : site.description}
                  </p>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.76rem', color: C.accent, letterSpacing: '.03em' }}>
                    Ver demo →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Divider + Header — Landing Pages */}
          <div className="gsap-reveal" style={{ borderTop: '1px solid rgba(255,255,255,.05)', paddingTop: '4rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.75rem', marginBottom: '.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: C.accent2, letterSpacing: '.15em', textTransform: 'uppercase' }}>02 /</span>
              <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#fff' }}>Landing Pages</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: 'var(--font-manrope)', color: '#555', fontSize: '.92rem', maxWidth: '460px' }}>
                Uma página focada em conversão. Mais barata, mais rápida e perfeita para campanhas.
              </p>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.66rem', color: C.accent2, background: 'rgba(123,97,255,.1)', border: '1px solid rgba(123,97,255,.2)', borderRadius: '100px', padding: '.28rem .75rem', letterSpacing: '.07em', whiteSpace: 'nowrap' }}>
                A partir de R$ 650
              </span>
            </div>
          </div>

          {/* Landing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(280px,100%),1fr))', gap: '1.5rem' }}>
            {landingSites.map((site, i) => (
              <Link key={site.id} href={`/demo/${site.slug}`} className="site-card" style={{ borderColor: 'rgba(123,97,255,.12)', transitionDelay: `${i * .07}s` }}>
                <div className="led" style={{ background: `conic-gradient(from var(--a) at 50% 50%,transparent 0deg,${C.accent2} 60deg,transparent 120deg)` }} />
                <div style={{ height: '196px', background: 'linear-gradient(135deg,#0e0b1a 0%,#110f1e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(123,97,255,.07)', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2.8rem', color: 'rgba(123,97,255,.06)', letterSpacing: '-.04em', userSelect: 'none' }}>{site.name}</span>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.63rem', color: C.accent2, background: 'rgba(123,97,255,.1)', border: '1px solid rgba(123,97,255,.18)', borderRadius: '4px', padding: '.18rem .45rem' }}>Landing</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '.35rem', flexWrap: 'wrap' }}>
                    {site.tags.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '.63rem', color: C.accent2, background: 'rgba(123,97,255,.07)', border: '1px solid rgba(123,97,255,.14)', borderRadius: '4px', padding: '.18rem .45rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.4rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.98rem', color: '#fff' }}>{site.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.66rem', color: '#444', marginTop: '.12rem' }}>{site.category}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.1rem', color: C.accent2 }}>
                      R$ {site.price.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '.8rem', color: '#555', lineHeight: 1.6, marginBottom: '.9rem' }}>
                    {site.description.length > 88 ? site.description.slice(0, 88) + '…' : site.description}
                  </p>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.76rem', color: C.accent2, letterSpacing: '.03em' }}>
                    Ver demo →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section id="como-funciona" style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1rem,5vw,3rem)', background: C.bg2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="gsap-reveal" style={{ marginBottom: '3.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: C.accent, letterSpacing: '.2em', textTransform: 'uppercase', display: 'block', marginBottom: '.65rem' }}>
              Como funciona
            </span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-.025em', lineHeight: 1.1 }}>
              Do template ao ar<br /><span style={{ color: C.accent }}>em 3 passos.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))', gap: '1.5rem' }}>
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="gsap-step" style={{ position: 'relative', padding: '2rem', border: '1px solid rgba(255,255,255,.06)', borderRadius: '12px', background: C.bg }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', color: 'rgba(0,255,136,.07)', lineHeight: 1, marginBottom: '1.25rem' }}>
                  {step.num}
                </div>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '.6rem' }}>
                  {step.title}
                </div>
                <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '.88rem', color: '#666', lineHeight: 1.7 }}>
                  {step.body}
                </p>
                <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,255,136,.07)', border: '1px solid rgba(0,255,136,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent }}>
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="precos" style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1rem,5vw,3rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: C.accent, letterSpacing: '.2em', textTransform: 'uppercase', display: 'block', marginBottom: '.65rem' }}>
              Investimento
            </span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-.025em' }}>
              Preços transparentes.<br />Sem surpresas.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className="gsap-reveal" style={{ transitionDelay: `${i * .1}s`, position: 'relative', padding: plan.highlight ? '2.5rem 2rem' : '2rem', borderRadius: '12px', background: plan.highlight ? '#0f0f0f' : C.bg2, border: plan.highlight ? '1px solid transparent' : '1px solid rgba(255,255,255,.06)' }}>
                {plan.highlight && <div className="p-led" />}
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)', background: C.accent, color: C.bg, fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', padding: '.28rem 1rem', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                    Mais popular
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.95rem', color: plan.highlight ? C.accent : '#777', marginBottom: '.4rem', letterSpacing: '.04em' }}>
                  {plan.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.25rem', marginBottom: '.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '.95rem', color: '#555' }}>R$</span>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '2.8rem', color: '#fff', lineHeight: 1 }}>
                    <span data-count={plan.price}>0</span>
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '.8rem', color: '#555', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                  {plan.desc}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.55rem', marginBottom: '1.75rem' }}>
                  {plan.features.map((feat, j) => (
                    <li key={j} style={{ fontFamily: 'var(--font-manrope)', fontSize: '.84rem', color: '#999', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                      <span style={{ color: C.accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.84rem', letterSpacing: '.04em', padding: '.82rem', borderRadius: '8px', background: plan.highlight ? C.accent : 'transparent', color: plan.highlight ? C.bg : '#fff', border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,.1)' }}
                >
                  Quero este →
                </a>
              </div>
            ))}
          </div>

          <p className="gsap-reveal" style={{ textAlign: 'center', fontFamily: 'var(--font-manrope)', fontSize: '.8rem', color: '#444', marginTop: '2rem' }}>
            Algo diferente?{' '}
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: 'none' }}>
              Fala comigo no WhatsApp
            </a>{' '}
            e a gente resolve.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" style={{ padding: 'clamp(4rem,8vh,7rem) clamp(1rem,5vw,3rem)', background: C.bg2 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: C.accent, letterSpacing: '.2em', textTransform: 'uppercase', display: 'block', marginBottom: '.65rem' }}>
              Dúvidas
            </span>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-.025em' }}>
              Perguntas frequentes
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="gsap-reveal"
                style={{ border: `1px solid ${faqOpen === i ? 'rgba(0,255,136,.2)' : 'rgba(255,255,255,.06)'}`, borderRadius: '10px', overflow: 'hidden', transition: 'border-color .3s' }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.4rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
                >
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '.92rem', color: faqOpen === i ? C.accent : '#fff' }}>
                    {item.q}
                  </span>
                  <span style={{ color: faqOpen === i ? C.accent : '#444', fontSize: '1.3rem', flexShrink: 0, display: 'inline-block', transform: faqOpen === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform .3s,color .3s' }}>
                    +
                  </span>
                </button>
                <div className={`acc-body${faqOpen === i ? ' open' : ''}`}>
                  <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, fontSize: '.88rem', color: '#777', lineHeight: 1.7, padding: '0 1.4rem 1.2rem' }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem,10vh,9rem) clamp(1rem,5vw,3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '420px', background: `radial-gradient(ellipse,rgba(0,255,136,.045) 0%,transparent 70%)`, pointerEvents: 'none' }} />
        <div className="gsap-reveal" style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: C.accent, letterSpacing: '.22em', textTransform: 'uppercase', display: 'block', marginBottom: '1.4rem' }}>
            Pronto?
          </span>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: '#fff', letterSpacing: '-.03em', lineHeight: 1.05, marginBottom: '1.4rem' }}>
            Seu negócio merece<br />um site de verdade.
          </h2>
          <p style={{ fontFamily: 'var(--font-manrope)', fontWeight: 300, color: '#666', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Escolha o template, personalizamos juntos e coloco no ar em dias.
          </p>
          <a
            href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
            onClick={handleRipple}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              display: 'inline-block', position: 'relative', overflow: 'hidden',
              fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '.04em',
              textDecoration: 'none',
              background: ctaHover ? C.accent : 'transparent',
              color: ctaHover ? C.bg : C.accent,
              border: `2px solid ${C.accent}`, borderRadius: '10px',
              padding: '1.1rem 3rem',
              transition: 'background .25s,color .25s',
            }}
          >
            Começar agora →
          </a>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,.05)', padding: '2.5rem clamp(1rem,5vw,3rem)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.2rem' }}>
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '-.02em' }}>
          Dudu<span style={{ color: C.accent }}>Studio</span>
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[['Sites','#sites'],['Como Funciona','#como-funciona'],['Preços','#precos'],['FAQ','#faq']].map(([label, href]) => (
            <a key={href} href={href} className="nav-a">{label}</a>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-manrope)', fontSize: '.76rem', color: '#333' }}>
          © 2025 DuduStudio
        </span>
      </footer>

      {/* ── WhatsApp FAB ───────────────────────────────────────────────────── */}
      <a
        href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 400, width: '52px', height: '52px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,.4)', transition: 'transform .2s,box-shadow .2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,.55)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,.4)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  )
}
