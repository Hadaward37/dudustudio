// ─── DuduStudio Design Tokens ────────────────────────────────────────────────
// Espelha src/styles/design-system.css para uso type-safe em componentes React.
// Variáveis CSS são a fonte de verdade — estes tokens facilitam uso em JS/TS.

export const tokens = {
  colors: {
    // Accents
    accent:   '#8b5cf6',   // roxo Linear
    accent2:  '#22d3ee',   // cyan Vercel
    accent3:  '#f59e0b',   // amber Stripe
    // Status
    success:  '#4ade80',
    warning:  '#fbbf24',
    error:    '#f87171',
    info:     '#60a5fa',
    // Backgrounds (dark)
    bg:          '#0a0a0a',
    bgSubtle:    '#111111',
    bgSurface:   '#1a1a1a',
    bgElevated:  '#222222',
    // Text
    text:        '#ededed',
    textSubtle:  '#a1a1a1',
    textMuted:   '#6b6b6b',
  },

  duration: {
    instant: 0,
    fast:    150,
    normal:  300,
    slow:    500,
    slower:  700,
    slowest: 1000,
  },

  easing: {
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    out:    'cubic-bezier(0, 0, 0.2, 1)',
    inOut:  'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  radius: {
    none: '0px',
    sm:   '4px',
    md:   '8px',
    lg:   '12px',
    xl:   '16px',
    '2xl':'20px',
    '3xl':'24px',
    full: '9999px',
  },

  shadow: {
    xs:         '0 1px 2px rgba(0,0,0,0.4)',
    sm:         '0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
    md:         '0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
    lg:         '0 8px 16px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.3)',
    xl:         '0 16px 32px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)',
    glowPurple: '0 0 20px rgba(139,92,246,0.3), 0 0 40px rgba(139,92,246,0.1)',
    glowCyan:   '0 0 20px rgba(34,211,238,0.3), 0 0 40px rgba(34,211,238,0.1)',
    glowAmber:  '0 0 20px rgba(245,158,11,0.3), 0 0 40px rgba(245,158,11,0.1)',
    glowGreen:  '0 0 20px rgba(74,222,128,0.3), 0 0 40px rgba(74,222,128,0.1)',
  },

  zIndex: {
    below:    -1,
    base:      0,
    raised:    10,
    dropdown:  100,
    sticky:    200,
    fixed:     300,
    modal:     400,
    toast:     500,
    tooltip:   600,
    cursor:    9999,
  },

  space: {
    0:  '0px',
    1:  '4px',
    2:  '8px',
    3:  '12px',
    4:  '16px',
    5:  '20px',
    6:  '24px',
    8:  '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
  },

  gradient: {
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    cyber:  'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 50%, #ec4899 100%)',
    warm:   'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    dark:   'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
  },
} as const

export type Tokens = typeof tokens
export type ColorToken   = keyof typeof tokens.colors
export type RadiusToken  = keyof typeof tokens.radius
export type ShadowToken  = keyof typeof tokens.shadow
export type SpaceToken   = keyof typeof tokens.space
