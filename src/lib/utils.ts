// ─── Utilitários gerais do DuduStudio ────────────────────────────────────────

/**
 * Combina classes CSS condicionalmente (substituição mínima do clsx/cn).
 * Uso: cn("base", condition && "extra", undefined)
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Trunca texto com reticências.
 * truncate("Hello world", 7) → "Hello w..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
