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
}

const logs: SecurityLog[] = []
const MAX_LOGS = 100

export function logSecurityEvent(
  event: SecurityEvent,
  key: string,
  options?: {
    details?: string
    source?: 'frontend' | 'api' | 'middleware'
  },
): void {
  const log: SecurityLog = {
    event,
    key,
    timestamp: new Date().toISOString(),
    details: options?.details,
    source: options?.source ?? 'frontend',
  }

  logs.push(log)
  if (logs.length > MAX_LOGS) logs.shift()

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
    { key, source: log.source, details: log.details, at: log.timestamp },
  )
}

export function getSecurityLogs(): SecurityLog[] {
  return [...logs]
}

export function clearSecurityLogs(): void {
  logs.length = 0
}
