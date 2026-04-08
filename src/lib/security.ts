import { logSecurityEvent } from './securityLogger'

// Sanitiza strings para prevenir XSS
export function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
}

// Valida e sanitiza número de WhatsApp
export function sanitizeWhatsAppNumber(num: string): string {
  return num.replace(/\D/g, '')
}

// Cria link WhatsApp seguro
export function createWhatsAppLink(
  number: string,
  message: string,
): string {
  const cleanNumber = sanitizeWhatsAppNumber(number)
  const encodedMessage = encodeURIComponent(message)

  // Valida que é um número válido (10-13 dígitos)
  if (cleanNumber.length < 10 || cleanNumber.length > 13) {
    logSecurityEvent('invalid_input', 'whatsapp', `Número inválido: ${number}`)
    return '#'
  }

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

// Valida email básico
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length < 254
}

// Valida telefone brasileiro
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 11
}

// Rate limiter client-side melhorado (com bloqueio temporário)
interface RateLimitEntry {
  attempts: number[]
  blocked: boolean
  blockedUntil?: number
}

const rateLimitStore: Record<string, RateLimitEntry> = {}

export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000,
  blockDurationMs: number = 300000,
): { allowed: boolean; remainingAttempts: number; message?: string } {
  const now = Date.now()

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = { attempts: [], blocked: false }
  }

  const entry = rateLimitStore[key]

  // Verifica se está bloqueado
  if (entry.blocked && entry.blockedUntil) {
    if (now < entry.blockedUntil) {
      const minutesLeft = Math.ceil((entry.blockedUntil - now) / 60000)
      return {
        allowed: false,
        remainingAttempts: 0,
        message: `Aguarde ${minutesLeft} minuto(s) antes de tentar novamente.`,
      }
    } else {
      // Desbloqueio automático
      entry.blocked = false
      entry.blockedUntil = undefined
      entry.attempts = []
    }
  }

  // Remove tentativas fora da janela
  entry.attempts = entry.attempts.filter((t) => now - t < windowMs)

  if (entry.attempts.length >= maxAttempts) {
    entry.blocked = true
    entry.blockedUntil = now + blockDurationMs
    logSecurityEvent('rate_limit_triggered', key, `Bloqueado após ${maxAttempts} tentativas`)
    return {
      allowed: false,
      remainingAttempts: 0,
      message: 'Muitas tentativas. Aguarde 5 minutos.',
    }
  }

  entry.attempts.push(now)
  const remaining = maxAttempts - entry.attempts.length

  return { allowed: true, remainingAttempts: remaining }
}
