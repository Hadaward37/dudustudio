// ─── Rate limiting client-side ────────────────────────────────────────────────
// Impede spam nos botões de WhatsApp e formulários.
// Armazenado em memória — reseta ao recarregar a página (intencional).

const attempts: Record<string, number[]> = {}

/**
 * Verifica se a ação identificada por `key` está dentro do limite permitido.
 * @param key          Identificador único da ação (ex: "wpp-btn-pizzaria")
 * @param maxAttempts  Máximo de tentativas na janela (padrão: 5)
 * @param windowMs     Janela de tempo em ms (padrão: 60s)
 * @returns true = permitido | false = bloqueado
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60_000,
): boolean {
  const now = Date.now()

  if (!attempts[key]) {
    attempts[key] = []
  }

  // Remove tentativas fora da janela de tempo
  attempts[key] = attempts[key].filter(
    (timestamp) => now - timestamp < windowMs,
  )

  if (attempts[key].length >= maxAttempts) {
    return false // bloqueado
  }

  attempts[key].push(now)
  return true // permitido
}

export function getRateLimitMessage(): string {
  return 'Muitas tentativas. Aguarde 1 minuto e tente novamente.'
}
