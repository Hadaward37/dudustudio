type SecurityEvent =
  | 'rate_limit_triggered'
  | 'invalid_input'
  | 'suspicious_request'
  | 'whatsapp_spam_attempt'

interface SecurityLog {
  event: SecurityEvent
  key: string
  timestamp: string
  details?: string
}

const logs: SecurityLog[] = []
const MAX_LOGS = 100

export function logSecurityEvent(
  event: SecurityEvent,
  key: string,
  details?: string,
): void {
  const log: SecurityLog = {
    event,
    key,
    timestamp: new Date().toISOString(),
    details,
  }

  logs.push(log)

  if (logs.length > MAX_LOGS) logs.shift()

  const emoji = {
    rate_limit_triggered: '🚨',
    invalid_input: '⚠️',
    suspicious_request: '🔴',
    whatsapp_spam_attempt: '📵',
  }[event]

  console.warn(
    `${emoji} [SECURITY] ${event.toUpperCase()}`,
    { key, details, timestamp: log.timestamp },
  )
}

export function getSecurityLogs(): SecurityLog[] {
  return [...logs]
}

export function clearSecurityLogs(): void {
  logs.length = 0
}
