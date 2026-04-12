# DuduStudio — Código Completo para Revisão
> Stack: Next.js 16 App Router · TypeScript · Tailwind v4 · GSAP · Three.js · Vercel

---

## CONTEXTO DO PROJETO

- **Produto:** Plataforma de venda de sites prontos para pequenos negócios brasileiros
- **Modelo:** "test-drive antes de comprar" — cliente navega nos demos reais
- **Backend:** Zero — WhatsApp é o único canal de contato
- **Deploy:** Vercel (dudustudio-eight.vercel.app)
- **Segurança:** DuduShield™ (sistema proprietário — rate limiting, fingerprint, anti-clone, CSP)

### Rotas
| Rota | Descrição |
|------|-----------|
| `/` | Splash de entrada — olhos animados SVG + Three.js EnergyCore |
| `/sobre` | Hub principal — hero, stats, CTAs |
| `/trabalhos` | Portfólio — grid de cards dos sites |
| `/dudushield` | Página pública do sistema de segurança |
| `/vitrine` | Hub alternativo com GSAP + canvas particles + orb SVG |
| `/demo/[slug]` | Demos dos sites (pizzaria, clínica, ecommerce, docaria) |
| `/demo/landing/[slug]` | Landing pages demo (petshop, estetica-automotiva) |
| `/ds-panel-7x9k` | Painel admin do DuduShield (protegido por senha) |

---

## 1. src/app/page.tsx
> Splash de entrada: olhos SVG interativos + Three.js EnergyCore 3D no fundo

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne } from 'next/font/google'
import { EnergyCore } from '@/components/ui/EnergyCore'

const syne = Syne({ subsets: ['latin'], weight: ['800'], variable: '--font-syne' })

const ACCENT = '#00ff88'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function EntryPage() {
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  const buttonRef       = useRef<HTMLButtonElement>(null)
  const leftPupilRef    = useRef<SVGCircleElement>(null)
  const rightPupilRef   = useRef<SVGCircleElement>(null)
  const leftHeartRef    = useRef<SVGGElement>(null)
  const rightHeartRef   = useRef<SVGGElement>(null)
  const leftLidRef      = useRef<SVGPolygonElement>(null)
  const rightLidRef     = useRef<SVGPolygonElement>(null)

  const pupilTarget  = useRef({ x: 0, y: 0 })
  const pupilCurrent = useRef({ x: 0, y: 0 })
  const mousePos     = useRef({ x: -9999, y: -9999 })
  const angerTarget  = useRef(0)
  const angerCurrent = useRef(0)
  const rafRef       = useRef<number>(0)
  const clickedRef   = useRef(false)
  const hoveredRef   = useRef(false)

  useEffect(() => { clickedRef.current = clicked }, [clicked])

  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return
    const onEnter = () => { hoveredRef.current = true }
    const onLeave = () => { hoveredRef.current = false }
    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const calcTarget = (clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY }
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      let dx = (clientX - cx) / cx
      let dy = (clientY - cy) / cy
      const mag = Math.sqrt(dx * dx + dy * dy)
      if (mag > 0.7) { dx = dx / mag * 0.7; dy = dy / mag * 0.7 }
      pupilTarget.current = { x: dx, y: dy }
    }
    const onMove  = (e: MouseEvent) => calcTarget(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) calcTarget(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  useEffect(() => {
    const MAX_PUPIL = 14
    const lidY = (anger: number, side: 'outer' | 'inner') => {
      const openY = 18
      if (side === 'outer') return lerp(openY, 60, anger)
      return lerp(openY, 84, anger)
    }
    const animate = () => {
      pupilCurrent.current.x = lerp(pupilCurrent.current.x, pupilTarget.current.x, 0.08)
      pupilCurrent.current.y = lerp(pupilCurrent.current.y, pupilTarget.current.y, 0.08)
      const ox = pupilCurrent.current.x * MAX_PUPIL
      const oy = pupilCurrent.current.y * MAX_PUPIL
      if (buttonRef.current && mousePos.current.x !== -9999) {
        const rect = buttonRef.current.getBoundingClientRect()
        const bx = rect.left + rect.width  / 2
        const by = rect.top  + rect.height / 2
        const dist = Math.sqrt((mousePos.current.x - bx) ** 2 + (mousePos.current.y - by) ** 2)
        angerTarget.current = Math.max(0, Math.min(1, (dist - 90) / 390))
      }
      angerCurrent.current = lerp(angerCurrent.current, angerTarget.current, 0.045)
      const anger = angerCurrent.current
      const showHearts = clickedRef.current || hoveredRef.current
      const pupilOpacity = showHearts ? 0 : 1
      const heartOpacity = showHearts ? 1 : 0
      if (leftPupilRef.current)  { leftPupilRef.current.setAttribute('cx',  String(88  + ox)); leftPupilRef.current.setAttribute('cy',  String(80  + oy)) }
      if (rightPupilRef.current) { rightPupilRef.current.setAttribute('cx', String(232 + ox)); rightPupilRef.current.setAttribute('cy', String(80  + oy)) }
      document.querySelectorAll<SVGGElement>('.pupil-g').forEach(g => (g.style.opacity = String(pupilOpacity)))
      if (leftHeartRef.current)  { leftHeartRef.current.setAttribute('transform',  `translate(${88  + ox},${80 + oy})`); leftHeartRef.current.style.opacity  = String(heartOpacity) }
      if (rightHeartRef.current) { rightHeartRef.current.setAttribute('transform', `translate(${232 + ox},${80 + oy})`); rightHeartRef.current.style.opacity = String(heartOpacity) }
      if (leftLidRef.current)  { const oy_ = lidY(anger, 'outer'); const iy_ = lidY(anger, 'inner'); leftLidRef.current.setAttribute('points',  `30,-10 146,-10 146,${iy_} 30,${oy_}`) }
      if (rightLidRef.current) { const oy_ = lidY(anger, 'outer'); const iy_ = lidY(anger, 'inner'); rightLidRef.current.setAttribute('points', `174,-10 290,-10 290,${oy_} 174,${iy_}`) }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => router.push('/sobre'), 700)
  }

  return (
    <div
      className={syne.variable}
      style={{
        background: '#000', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '3.5rem',
        fontFamily: 'var(--font-syne), sans-serif', userSelect: 'none',
        overflow: 'hidden', position: 'relative',
      }}
    >
      <EnergyCore />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.04) 0%, rgba(0,0,0,0.88) 65%)',
        zIndex: 1, pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3.5rem', width: '100%' }}>
        {/* Logo, Eyes, Subtitle, Button — ver arquivo original para JSX completo */}
      </div>
    </div>
  )
}
```

---

## 2. src/components/ui/EnergyCore.tsx
> Three.js: esfera + anel + 2000 partículas verdes, mouse reactive

```tsx
'use client'

import { useEffect, useRef } from 'react'

export function EnergyCore() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    let animId: number
    let smoothId: number

    async function init() {
      const THREE = await import('three')
      const mount = mountRef.current!
      const W = mount.clientWidth
      const H = mount.clientHeight

      const scene    = new THREE.Scene()
      const camera   = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      scene.add(new THREE.PointLight(0x00ff88, 3, 0, 0))
      scene.add(new THREE.AmbientLight(0x00ff88, 0.3))

      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 128, 128),
        new THREE.MeshStandardMaterial({ color: 0x003322, emissive: 0x00ff88, emissiveIntensity: 1.2, metalness: 0.8, roughness: 0.15 })
      )
      scene.add(sphere)

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.02, 16, 100),
        new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 2, metalness: 1, roughness: 0 })
      )
      ring.rotation.x = Math.PI / 4
      scene.add(ring)

      const count = 2000
      const pos = new Float32Array(count * 3)
      const vel: { x: number; y: number; z: number }[] = []
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2
        pos[i*3] = Math.cos(a); pos[i*3+1] = (Math.random()-0.5); pos[i*3+2] = Math.sin(a)
        vel.push({ x: pos[i*3]*0.025, y: pos[i*3+1]*0.018, z: pos[i*3+2]*0.025 })
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const particles = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00ff88, size: 0.035, transparent: true, opacity: 0.75 }))
      scene.add(particles)

      let targetX = 0, targetY = 0
      const handleMouse = (e: MouseEvent) => {
        targetX = (e.clientX / innerWidth  - 0.5) * 2
        targetY = (e.clientY / innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', handleMouse)

      function animate() {
        animId = requestAnimationFrame(animate)
        const time = Date.now() * 0.001
        sphere.scale.setScalar(1 + Math.sin(time * 2) * 0.04)
        sphere.rotation.y += 0.008
        ring.rotation.z   += 0.005
        ring.rotation.y   += 0.003
        const p = geo.attributes.position.array as Float32Array
        for (let i = 0; i < count; i++) {
          p[i*3] += vel[i].x; p[i*3+1] += vel[i].y; p[i*3+2] += vel[i].z
          const d = Math.sqrt(p[i*3]**2 + p[i*3+1]**2 + p[i*3+2]**2)
          if (d > 6) { const a = Math.random()*Math.PI*2; p[i*3]=Math.cos(a); p[i*3+1]=(Math.random()-0.5); p[i*3+2]=Math.sin(a) }
        }
        geo.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
      }
      animate()

      function smoothMove() {
        smoothId = requestAnimationFrame(smoothMove)
        sphere.rotation.y += (targetX * 0.5 - sphere.rotation.y) * 0.05
        sphere.rotation.x += (targetY * 0.3 - sphere.rotation.x) * 0.05
        ring.rotation.x   += (targetY * 0.2 - ring.rotation.x)   * 0.03
      }
      smoothMove()

      const handleResize = () => {
        if (!mount) return
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        cancelAnimationFrame(animId); cancelAnimationFrame(smoothId)
        window.removeEventListener('mousemove', handleMouse)
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn?.()) }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }} />
}
```

---

## 3. src/app/sobre/page.tsx
> Hub principal: hero com stats, nav inline, CTAs WhatsApp

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'

const syne    = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })
const ACCENT  = '#00ff88'

export default function SobrePage() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [leaving, setLeaving]   = useState(false)
  const [visible, setVisible]   = useState(false)

  const navigateTo = (href: string) => { setLeaving(true); setTimeout(() => router.push(href), 320) }

  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div className={`${syne.variable} ${manrope.variable}`} style={{
      background: '#080808', minHeight: '100dvh', color: '#fff',
      fontFamily: 'var(--font-manrope), sans-serif', position: 'relative',
      overflowX: 'hidden', animation: leaving ? 'pageOut 0.32s ease forwards' : undefined,
    }}>
      {/* Nav com: DuduStudio → /sobre | Trabalhos | DuduShield™ | Contato */}
      {/* Hero: título "Sites que fazem o seu cliente parar." + stats + CTAs */}
      {/* Stats: 5 sites no portfólio | 7d prazo médio | 100% mobile-first */}
      {/* Footer + scrollbar verde */}
      <style>{`
        @keyframes pageOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-8px)} }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#00ff88;border-radius:4px}
      `}</style>
    </div>
  )
}
```

---

## 4. src/app/trabalhos/page.tsx
> Grid de cards dos sites com filtro por categoria, hover animado, CTAs

```tsx
'use client'
// Importa: useEffect, useState, useRouter, Syne, Manrope, sites, formatPrice
// ACCENT = '#00ff88', ACCENT2 = '#7b61ff'
// CATEGORY_ACCENT: Restaurante #ff6b35, Saúde #22d3ee, E-commerce #8b5cf6, Confeitaria #f472b6, Petshop #00ff88, Serviços #f59e0b

// Nav: DuduStudio → /sobre | Início | DuduShield™ | Contato
// Hero: "Nossos Trabalhos" + subtítulo
// Grid auto-fill minmax(340px): cards com badge categoria, preço, desc, tags, botões "Ver demo" e "Quero este" (WhatsApp)
// CTA final: "Não achou o que procurava? Criamos do zero também."
// Scrollbar verde
```

---

## 5. src/app/dudushield/page.tsx
> Página pública de marketing do DuduShield™ (sistema de segurança)

```tsx
'use client'
// ACCENT: #00ff88
// Nav: DuduStudio → / | Ver demos → /trabalhos
// Hero: badge pulsante "PROTEÇÃO ATIVA EM TODOS OS SITES", título "🔒 DuduShield™"
//       subtítulo, botão "Quero um site protegido" (WhatsApp), seta scroll animada
// Seção Problemas: spam, cópia, ataques (3 cards)
// Seção Solução: "Proteção integrada. Invisível. Automática."
// Features grid 2x2: Anti-spam, Bloqueio XSS, Anti-cópia, Monitoramento
// Tabela comparativa 8 linhas: DuduStudio vs Freelancer comum
// CTA final: "Seu site merece proteção real." + botão WhatsApp + "Ver sites demo → /trabalhos"
// Footer + scrollbar verde
// handleWhatsApp() → wa.me/${NEXT_PUBLIC_WHATSAPP}
```

---

## 6. src/app/vitrine/page.tsx
> Hub alternativo: GSAP + canvas particles + orb SVG 3D + mouse parallax

**Destaques técnicos:**
- Canvas: 60 partículas verdes com conexões por proximidade (<120px)
- GSAP ScrollTrigger: reveal, step slide, hero bg scale scrub
- Parallax por scroll: 3 layers com velocidades diferentes
- Mouse parallax: hero-text-layer e hero-orb-wrap movem em direções opostas
- Orb SVG: 3 planetas orbitando com `animateTransform`, wireframe rings
- Custom cursor (desativado em touch)
- Counter animation (IntersectionObserver)
- Ripple effect nos CTAs
- LED border animation em `@property --a` (conic-gradient animado)

---

## 7. src/lib/sites.ts
> Fonte única de verdade do catálogo

```typescript
export type SiteCategory = "Restaurante" | "Saúde" | "E-commerce" | "Serviços" | "Confeitaria" | "Petshop" | "Automotivo"

export interface Site {
  id: string; name: string; slug: string; category: SiteCategory
  price: number; whatsappNumber: string; deliveryDays: number
  includes: string[]; description: string; tags: string[]
  thumbnail: string; featured?: boolean
}

export const sites: Site[] = [
  // pizzaria (R$1.200), clinica (R$1.800), ecommerce (R$3.500),
  // docaria (R$1.200), petshop landing (R$650), estetica-automotiva (R$1.200)
]

export function getSiteBySlug(slug: string): Site { /* throws if not found */ }
export function formatPrice(price: number): string { /* Intl BRL */ }
```

---

## 8. src/lib/securityLogger.ts
> DuduShield™ v1.1 — logs persistidos em localStorage, ring-buffer 200

```typescript
type SecurityEvent =
  | 'rate_limit_triggered' | 'invalid_input' | 'suspicious_request'
  | 'whatsapp_spam_attempt' | 'iframe_blocked' | 'domain_violation'

// generateFingerprint(): hash de userAgent + screen + language + timezone
// logSecurityEvent(event, key, options?): salva no localStorage, console.warn
// getSecurityLogs(): retorna todos os logs
// getSecuritySummary(): { total, last24h, byEvent, uniqueFingerprints }
// clearSecurityLogs(): limpa localStorage
```

---

## 9. src/lib/security.ts
> Rate limiter client-side com compositeKey = key::fingerprint

```typescript
// sanitizeString(str): escapa HTML entities
// sanitizeWhatsAppNumber(num): remove não-dígitos
// createWhatsAppLink(number, message): valida 10-13 dígitos, retorna '#' se inválido
// isValidEmail(email): regex + maxLength 254
// isValidPhone(phone): 10-11 dígitos BR
// checkRateLimit(key, maxAttempts=5, windowMs=60000, blockDurationMs=300000)
//   → { allowed, remainingAttempts, message? }
//   → bloqueia 5min após maxAttempts, loga com fingerprint
```

---

## 10. src/components/ui/AntiClone.tsx
> Detecta iframe, domínios não autorizados, bloqueia Ctrl+U/S nos demos

```tsx
// Se window.self !== window.top → renderiza overlay "Conteúdo protegido pelo DuduShield™"
// Adiciona <meta name="generator"> como watermark
// Verifica NEXT_PUBLIC_ALLOWED_DOMAINS contra window.location.hostname
// Em /demo/* → bloqueia Ctrl+U e Ctrl+S
// Montado no root layout (src/app/layout.tsx)
```

---

## 11. src/proxy.ts
> Next.js 16 proxy (substitui middleware.ts — CVE-2025-29927)

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Bloqueia CVE-2025-29927
  if (request.headers.has('x-middleware-subrequest')) {
    return new NextResponse(null, { status: 403 })
  }
  const response = NextResponse.next()
  response.headers.delete('x-powered-by')
  response.headers.delete('server')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

---

## 12. next.config.ts
> CSP, HSTS, X-Frame-Options, noindex em /demo

```typescript
// Headers globais:
//   HSTS: max-age=63072000; includeSubDomains; preload
//   X-Frame-Options: DENY
//   X-Content-Type-Options: nosniff
//   Referrer-Policy: strict-origin-when-cross-origin
//   Permissions-Policy: camera=(), microphone=(), geolocation=()...
//   CSP: default-src 'self', script-src sem unsafe-eval em prod
//        fonts.googleapis.com, fonts.gstatic.com, images.unsplash.com
//        frame-src 'none', frame-ancestors 'none'
//   X-XSS-Protection: 1; mode=block
//   Cross-Origin-Opener-Policy: same-origin-allow-popups
// /demo/*: X-Robots-Tag: noindex, nofollow
// poweredByHeader: false, compress: true
// images.dangerouslyAllowSVG: false
```

---

## 13. src/app/layout.tsx
> Root layout — monta AntiClone, fonte Geist, metadata OpenGraph

```tsx
import { AntiClone } from '@/components/ui/AntiClone'

export const metadata = {
  title: 'DuduStudio — Sites prontos para o seu negócio',
  description: 'Compre sites profissionais prontos para uso...',
  openGraph: { title: '...', description: '...', siteName: 'DuduStudio' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AntiClone />
        {children}
      </body>
    </html>
  )
}
```

---

## VARIÁVEIS DE AMBIENTE (.env.local)

```
NEXT_PUBLIC_WHATSAPP=5511999999999          # número real do dono (placeholder)
NEXT_PUBLIC_SITE_URL=https://dudustudio-eight.vercel.app
NEXT_PUBLIC_SITE_NAME=DuduStudio
NEXT_PUBLIC_ALLOWED_DOMAINS=dudustudio-eight.vercel.app
NEXT_PUBLIC_DS_TOKEN=ds$2025!xK9            # senha do painel /ds-panel-7x9k
```

---

## DEPENDÊNCIAS PRINCIPAIS

```json
{
  "next": "16.2.2",
  "react": "19.x",
  "three": "^0.178.0",
  "@types/three": "^0.178.0",
  "gsap": "^3.x",
  "tailwindcss": "^4.x"
}
```

---

## PERGUNTAS PARA A REVISÃO

1. O padrão de segurança do `checkRateLimit` (client-side com localStorage) é suficiente ou precisa de backend?
2. O `EnergyCore` tem algum memory leak — o cleanup do Three.js está correto?
3. O CSP está bloqueando algum recurso legítimo (fontes, Three.js, GSAP)?
4. A arquitetura de nav inline em cada página (vs. componente compartilhado) tem trade-offs relevantes?
5. O `generateFingerprint` é suficientemente único ou colide muito em dispositivos similares?
