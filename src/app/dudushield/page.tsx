'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AquarioCanvas } from '@/components/ui/AquarioCanvas'
import { CustomCursor } from '@/components/ui/CustomCursor'

export default function DuduShieldPage() {
  function handleWhatsApp() {
    const msg = encodeURIComponent(
      'Olá! Vi a página do DuduShield™ e quero um site protegido. Pode me passar mais informações?',
    )
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${msg}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero entrance
    gsap.fromTo('.ds-hero-el',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out', delay: 0.15 }
    )

    // Sections scroll reveal
    document.querySelectorAll('.ds-section').forEach(section => {
      const els = section.querySelectorAll('.ds-reveal')
      gsap.fromTo(els,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      )
    })

    // Cards: scale-in
    gsap.utils.toArray<HTMLElement>('.ds-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.92, y: 20 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: card, start: 'top 85%' },
          delay: i * 0.08,
        }
      )
    })

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div style={{ color: '#ededed', minHeight: '100vh', fontFamily: 'var(--font-body, Manrope, sans-serif)', position: 'relative' }}>
      <AquarioCanvas />
      <CustomCursor />

      {/* Overlay escuro suave para legibilidade */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(5,5,8,0.55) 0%, rgba(5,5,8,0.82) 100%)' }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'calc(80px + 5rem) 2rem 6rem',
        textAlign: 'center', position: 'relative', zIndex: 2, overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Badge */}
          <div className="ds-hero-el" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.35)',
            borderRadius: '999px', padding: '0.35rem 1rem', fontSize: '0.72rem',
            fontFamily: 'Space Mono, monospace', letterSpacing: '0.1em',
            color: '#2563EB', marginBottom: '2rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#2563EB', boxShadow: '0 0 8px #2563EB',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            PROTEÇÃO ATIVA EM TODOS OS SITES
          </div>

          <h1 className="ds-hero-el" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '1.5rem',
          }}>
            🔒 DuduShield™
          </h1>

          <p className="ds-hero-el" style={{
            fontSize: '1.1rem', color: '#a1a1a1', maxWidth: '560px',
            margin: '0 auto 1rem', lineHeight: 1.7,
          }}>
            Sites comuns podem ser copiados e atacados.
          </p>
          <p className="ds-hero-el" style={{
            fontSize: '1.1rem', color: '#ededed', maxWidth: '560px',
            margin: '0 auto 3rem', lineHeight: 1.7, fontWeight: 600,
          }}>
            Os nossos não.
          </p>

          {/* Scroll indicator */}
          <div className="ds-hero-el" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          }}>
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '0.6rem',
              letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
            }}>
              ver como funciona
            </span>
            <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="rgba(37,99,235,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMAS ──────────────────────────────────────────────────────────── */}
      <section className="ds-section" style={{
        padding: '5rem 2rem', position: 'relative', zIndex: 2,
        background: 'rgba(5,5,8,0.65)', backdropFilter: 'blur(6px)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="ds-reveal" style={{
            textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: '0.65rem',
            letterSpacing: '0.3em', color: '#555', textTransform: 'uppercase', marginBottom: '2.5rem',
          }}>
            O problema que ninguém fala
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '📬', text: 'Sites que recebem spam constante nos botões de contato' },
              { icon: '📋', text: 'Páginas copiadas por concorrentes e revendidas' },
              { icon: '⚠️', text: 'Ataques que derrubam ou comprometem o site' },
            ].map((item, i) => (
              <div key={i} className="ds-card" style={{
                padding: '1.5rem', borderRadius: '12px',
                background: 'rgba(15,15,15,0.7)', border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(8px)', display: 'flex', gap: '1rem', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{ color: '#a1a1a1', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUÇÃO ────────────────────────────────────────────────────────────── */}
      <section className="ds-section" style={{
        padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2,
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="ds-reveal" style={{
            fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.3em',
            color: '#2563EB', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            A solução
          </div>
          <h2 className="ds-reveal" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem',
          }}>
            Proteção integrada.<br />Invisível. Automática.
          </h2>
          <p className="ds-reveal" style={{ color: '#a1a1a1', fontSize: '1rem', lineHeight: 1.75 }}>
            O DuduShield™ protege seu site contra abusos, ataques e cópias
            não autorizadas — sem você precisar se preocupar com nada.
            Ativo desde o primeiro dia.
          </p>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────────── */}
      <section className="ds-section" style={{ padding: '2rem 2rem 6rem', position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '1px', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden',
        }}>
          {[
            { icon: '🚫', title: 'Proteção contra spam',  desc: 'Bloqueio automático de tentativas abusivas nos botões de contato. Rate limiting com fingerprint de dispositivo.' },
            { icon: '🛡️', title: 'Bloqueio de ataques',  desc: 'Proteção contra XSS, clickjacking e scripts maliciosos. Headers de segurança profissionais configurados.' },
            { icon: '🔐', title: 'Anti-cópia',            desc: "Dificulta clonagem de páginas. Detecção de domínios não autorizados e marca d'água no código." },
            { icon: '📊', title: 'Monitoramento',         desc: 'Sistema interno detecta comportamentos suspeitos e registra eventos com fingerprint do dispositivo.' },
          ].map((f, i) => (
            <div key={i} className="ds-card" style={{
              padding: '2rem', background: 'rgba(15,15,15,0.75)',
              backdropFilter: 'blur(8px)', transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(20,20,30,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,15,15,0.75)')}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                {f.title}
              </div>
              <p style={{ color: '#a1a1a1', fontSize: '0.83rem', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARATIVO ────────────────────────────────────────────────────────── */}
      <section className="ds-section" style={{
        padding: '4rem 2rem 6rem', position: 'relative', zIndex: 2,
        background: 'rgba(5,5,8,0.65)', backdropFilter: 'blur(6px)',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p className="ds-reveal" style={{
            textAlign: 'center', fontFamily: 'Space Mono, monospace', fontSize: '0.65rem',
            letterSpacing: '0.3em', color: '#555', textTransform: 'uppercase', marginBottom: '2.5rem',
          }}>
            DuduStudio vs freelancer comum
          </p>
          <div className="ds-reveal" style={{
            display: 'flex', flexDirection: 'column', gap: '1px',
            background: 'rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden',
          }}>
            {[
              { feature: 'HTTPS forçado',             us: true, them: true  },
              { feature: 'Security Headers',           us: true, them: false },
              { feature: 'Proteção XSS',               us: true, them: false },
              { feature: 'Anti-clickjacking',          us: true, them: false },
              { feature: 'Rate limiting',              us: true, them: false },
              { feature: 'Fingerprint de dispositivo', us: true, them: false },
              { feature: 'Anti-cópia',                 us: true, them: false },
              { feature: 'Monitoramento',              us: true, them: false },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 120px 120px',
                background: 'rgba(15,15,15,0.7)', padding: '0.875rem 1.25rem',
                fontSize: '0.82rem', alignItems: 'center',
              }}>
                <span style={{ color: '#a1a1a1' }}>{row.feature}</span>
                <span style={{ textAlign: 'center', color: row.us ? '#2563EB' : '#555' }}>
                  {row.us ? '✓ DuduStudio' : '—'}
                </span>
                <span style={{ textAlign: 'center', color: row.them ? '#a1a1a1' : '#333' }}>
                  {row.them ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 120px 120px',
            padding: '0.5rem 1.25rem', fontSize: '0.65rem', color: '#444',
            fontFamily: 'Space Mono, monospace',
          }}>
            <span />
            <span style={{ textAlign: 'center' }}>DuduStudio</span>
            <span style={{ textAlign: 'center' }}>Freelancer comum</span>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────────── */}
      <section className="ds-section" style={{
        padding: '7rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2,
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="ds-reveal" style={{
            fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Seu site merece<br />
            <span style={{
              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              proteção real.
            </span>
          </h2>
          <p className="ds-reveal" style={{ color: '#a1a1a1', fontSize: '1rem', marginBottom: '2.5rem' }}>
            Todo site do DuduStudio já vem com o DuduShield™ ativo.
          </p>
          <div className="ds-reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleWhatsApp}
              style={{
                padding: '1rem 2.5rem', borderRadius: '8px', fontWeight: 700,
                fontSize: '0.88rem', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                color: '#fff', boxShadow: '0 0 30px rgba(37,99,235,0.35)',
                fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.target as HTMLButtonElement).style.boxShadow = '0 0 50px rgba(37,99,235,0.5)' }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; (e.target as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(37,99,235,0.35)' }}
            >
              💬 Falar no WhatsApp →
            </button>
            <a href="/trabalhos" style={{
              padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '0.88rem',
              border: '1px solid rgba(255,255,255,0.12)', color: '#ededed',
              textDecoration: 'none', fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.05em', transition: 'all 0.3s', display: 'inline-block',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,99,235,0.5)'; e.currentTarget.style.color = '#2563EB' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#ededed' }}
            >
              Ver sites demo →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem',
        textAlign: 'center', position: 'relative', zIndex: 2,
        background: 'rgba(5,5,8,0.8)',
      }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: '#444', letterSpacing: '0.1em' }}>
          © 2025 DuduStudio — DuduShield™ é um sistema proprietário.
          <br />
          <a href="/" style={{ color: '#555', textDecoration: 'none' }}>← Voltar ao site</a>
        </p>
      </footer>

      <style>{`
        .ds-hero-el { opacity: 0; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 4px; }
      `}</style>
    </div>
  )
}
