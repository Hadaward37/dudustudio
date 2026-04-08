'use client'

import { useEffect, useState } from 'react'
import { getSecurityLogs, getSecuritySummary, clearSecurityLogs } from '@/lib/securityLogger'

// AVISO: NEXT_PUBLIC fica visível no bundle.
// Para produção real mover para Route Handler.
// Senha complexa já resolve para uso atual.
const SECRET = process.env.NEXT_PUBLIC_DS_TOKEN || 'ds$2025!xK9'

export default function DuduShieldPanel() {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [logs, setLogs] = useState<ReturnType<typeof getSecurityLogs>>([])
  const [summary, setSummary] = useState<ReturnType<typeof getSecuritySummary> | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow, noarchive'
    document.head.appendChild(meta)
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  function handleUnlock() {
    if (password === SECRET) {
      setUnlocked(true)
      setLogs(getSecurityLogs())
      setSummary(getSecuritySummary())
    } else {
      setError('Senha incorreta')
      setTimeout(() => setError(''), 3000)
    }
  }

  function handleClear() {
    if (confirm('Limpar todos os logs?')) {
      clearSecurityLogs()
      setLogs([])
      setSummary(getSecuritySummary())
    }
  }

  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh', background: '#050505',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'monospace', gap: '1rem',
      }}>
        <div style={{ color: '#00ff88', fontSize: '1.5rem' }}>🔒 DuduShield™</div>
        <div style={{ color: '#444', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
          PAINEL DE SEGURANÇA
        </div>
        <input
          type="password"
          placeholder="Senha de acesso"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          style={{
            background: '#111', border: '1px solid #333',
            color: '#fff', padding: '0.6rem 1rem',
            borderRadius: '4px', fontFamily: 'monospace',
            outline: 'none', width: '240px', marginTop: '1rem',
          }}
        />
        {error && (
          <div style={{ color: '#ff4444', fontSize: '0.75rem' }}>{error}</div>
        )}
        <button
          onClick={handleUnlock}
          style={{
            background: '#00ff88', color: '#000',
            border: 'none', padding: '0.6rem 2rem',
            borderRadius: '4px', cursor: 'pointer',
            fontFamily: 'monospace', fontWeight: 700,
          }}
        >
          Acessar
        </button>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#050505',
      fontFamily: 'monospace', padding: '2rem', color: '#f0f0f0',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '2rem',
      }}>
        <div>
          <div style={{ color: '#00ff88', fontSize: '1.2rem', fontWeight: 700 }}>
            🔒 DuduShield™ v1.1
          </div>
          <div style={{ color: '#444', fontSize: '0.65rem', marginTop: '0.25rem' }}>
            {new Date().toLocaleString('pt-BR')}
          </div>
        </div>
        <button
          onClick={handleClear}
          style={{
            background: 'transparent', color: '#ff4444',
            border: '1px solid #ff4444', padding: '0.4rem 1rem',
            borderRadius: '4px', cursor: 'pointer',
            fontFamily: 'monospace', fontSize: '0.75rem',
          }}
        >
          Limpar logs
        </button>
      </div>

      {summary && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: '1rem', marginBottom: '2rem',
        }}>
          {[
            { label: 'Total eventos', value: summary.total },
            { label: 'Últimas 24h', value: summary.last24h },
            { label: 'Fingerprints únicos', value: summary.uniqueFingerprints },
            { label: 'Rate limits', value: summary.byEvent['rate_limit_triggered'] || 0 },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: '#0f0f0f', border: '1px solid #1a1a1a',
              borderRadius: '8px', padding: '1rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.8rem', color: '#00ff88', fontWeight: 700 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#555', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontSize: '0.72rem', color: '#444', marginBottom: '1rem' }}>
        {logs.length} eventos registrados
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {logs.length === 0 && (
          <div style={{ color: '#333', textAlign: 'center', padding: '3rem' }}>
            Nenhum evento registrado ainda.
          </div>
        )}
        {[...logs].reverse().map((log, i) => (
          <div key={i} style={{
            background: '#0a0a0a', border: '1px solid #151515',
            borderLeft: `3px solid ${
              log.event.includes('rate') ? '#ff4444' :
              log.event.includes('iframe') ? '#ff8800' :
              log.event.includes('domain') ? '#ffff00' : '#333'
            }`,
            borderRadius: '4px', padding: '0.75rem 1rem',
            fontSize: '0.7rem',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '0.35rem',
            }}>
              <span style={{ color: '#00ff88', fontWeight: 700 }}>{log.event}</span>
              <span style={{ color: '#333' }}>
                {new Date(log.timestamp).toLocaleString('pt-BR')}
              </span>
            </div>
            <div style={{ color: '#666' }}>
              <span style={{ color: '#444' }}>key: </span>{log.key}
              {log.fingerprint && (
                <span style={{ marginLeft: '1rem', color: '#444' }}>
                  fp: {log.fingerprint}
                </span>
              )}
              {log.source && (
                <span style={{ marginLeft: '1rem', color: '#444' }}>
                  src: {log.source}
                </span>
              )}
            </div>
            {log.details && (
              <div style={{ color: '#444', marginTop: '0.35rem' }}>
                {log.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
