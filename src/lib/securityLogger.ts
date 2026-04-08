type SecurityEvent =
  | 'rate_limit_triggered'
  | 'invalid_input'
  | 'suspicious_request'
  | 'whatsapp_spam_attempt'
  | 'iframe_blocked'
  | 'domain_violation'

interface SecurityLog {
  event: SecurityEvent
  key: string
  timestamp: string
  details?: string
  source: 'frontend' | 'api' | 'middleware'
  fingerprint?: string
}

const MAX_LOGS = 200
const STORAGE_KEY = 'dudushield_logs'

function getStoredLogs(): SecurityLog[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveLogs(logs: SecurityLog[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  } catch {}
}

export function generateFingerprint(): string {
  if (typeof window === 'undefined') return 'server'
  const raw = [
    navigator.userAgent,
    screen.width,
    screen.height,
    navigator.language,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join('|')
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export function logSecurityEvent(
  event: SecurityEvent,
  key: string,
  options?: {
    details?: string
    source?: 'frontend' | 'api' | 'middleware'
  },
): void {
  const logs = getStoredLogs()
  const log: SecurityLog = {
    event,
    key,
    timestamp: new Date().toISOString(),
    details: options?.details,
    source: options?.source ?? 'frontend',
    fingerprint: generateFingerprint(),
  }
  logs.push(log)
  if (logs.length > MAX_LOGS) logs.splice(0, logs.length - MAX_LOGS)
  saveLogs(logs)

  const emoji: Record<SecurityEvent, string> = {
    rate_limit_triggered: '🚨',
    invalid_input: '⚠️',
    suspicious_request: '🔴',
    whatsapp_spam_attempt: '📵',
    iframe_blocked: '🖼️',
    domain_violation: '🌐',
  }
  console.warn(
    `${emoji[event]} [DuduShield™] ${event.toUpperCase()}`,
    { key, source: log.source, details: log.details, fingerprint: log.fingerprint, at: log.timestamp },
  )
}

export function getSecurityLogs(): SecurityLog[] {
  return getStoredLogs()
}

export function clearSecurityLogs(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function getSecuritySummary() {
  const logs = getStoredLogs()
  const last24h = logs.filter(
    (l) => Date.now() - new Date(l.timestamp).getTime() < 86400000,
  )
  return {
    total: logs.length,
    last24h: last24h.length,
    byEvent: logs.reduce(
      (acc, l) => {
        acc[l.event] = (acc[l.event] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
    uniqueFingerprints: new Set(logs.map((l) => l.fingerprint)).size,
  }
}
