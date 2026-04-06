# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto do Negócio

DuduStudio é uma plataforma de venda de sites prontos para pequenos negócios brasileiros.

- Conceito: "test-drive antes de comprar" — cliente navega nos demos reais antes de decidir
- Modelo: frontend + WhatsApp como backend (sem backend complexo)
- Público-alvo: confeitarias, clínicas, petshops, restaurantes, salões, autônomos
- Preços de venda:
  - Vitrine 1 página: R$ 1.200
  - Pro até 5 páginas: R$ 2.800
  - E-commerce: R$ 4.500
- Pós-entrega:
  - Hospedagem simples: R$ 390/mês
  - Manutenção ativa até 2 alterações/mês: R$ 690/mês
  - Alterações avulsas: foto/texto R$ 80, nova seção R$ 350, produto no cardápio R$ 50
- WhatsApp do dono: process.env.NEXT_PUBLIC_WHATSAPP
- Deploy: Vercel automático no push para master
- Domínio atual: dudustudio-eight.vercel.app

## Commands

```
npm run dev      # start dev server localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

Nenhum framework de testes configurado.

## Arquitetura — Rotas

| Path | Propósito |
|---|---|
| /entrada | Splash screen animada — logo letra por letra, olhos interativos, redireciona para / |
| / | Hub vitrine principal com todas as seções |
| /vitrine | Hub alternativo com design tokens próprios (accent verde #00ff88) |
| /demo/pizzaria | Site completo de pizzaria — dark premium, reservas, cardápio |
| /demo/clinica | Site completo de clínica — light, agendamento, equipe |
| /demo/ecommerce | Site completo de e-commerce de moda — carrinho, countdown |
| /demo/docaria | Site completo de confeitaria — rosa/dourado, pedidos WhatsApp |
| /demo/landing/petshop | Landing page petshop — verde floresta, premium |

`src/app/demo/layout.tsx` envolve todas as rotas `/demo` com o DemoBanner fixo no topo.

A rota `/entrada` grava `sessionStorage.setItem('ds_entered', '1')` antes de redirecionar — use essa chave para detectar se o usuário já passou pela splash.

## Como adicionar um novo site

1. Adiciona entrada no array `sites` em `src/lib/sites.ts`
2. Cria pasta `src/app/demo/[slug]/`
3. Cria `page.tsx` dentro da pasta
4. Adiciona `'use client'` no topo se usar animações
5. Roda `npm run build` para verificar erros antes do push

## Data layer — src/lib/sites.ts

Fonte única da verdade para o catálogo de sites.
Helpers disponíveis: `getSiteBySlug(slug)` e `formatPrice(price)` em BRL.

Estrutura de cada site:
- `name`: nome do negócio
- `slug`: rota do demo
- `category`: categoria do negócio
- `price`: preço em número
- `whatsappNumber`: número do WhatsApp
- `deliveryDays`: prazo de entrega
- `includes`: lista de itens inclusos

## WhatsApp — padrão de mensagem nos CTAs

Todos os botões de produto usam este formato:

```ts
const waLink = (msg: string) =>
  `https://wa.me/NUMERO?text=${encodeURIComponent(msg)}`
```

Mensagem padrão para produtos:
```
Olá! Gostaria de fazer um pedido

Produto: [nome do produto]
Valor: [preço formatado em BRL]

Poderia me informar:
Data que preciso
Endereço de entrega

Aguardo seu retorno!
```

## Design System

Arquivo principal: `src/styles/design-system.css`
Tokens TypeScript: `src/lib/tokens.ts`

- Tema padrão: dark com fundo `#0a0a0a` — inspirado em Linear e Vercel
- Tema claro: adiciona classe `.theme-light` no elemento raiz — usado em `clinica` e `docaria`
- Três accents: roxo `#8b5cf6`, cyan `#22d3ee`, amber `#f59e0b`
- Três fontes: Syne para títulos, Manrope para corpo, Space Mono para mono e preços

Classes utilitárias disponíveis globalmente:
- `.ds-gradient-text` — texto com gradiente animado
- `.ds-shimmer-text` — texto com efeito shimmer
- `.ds-glass` — glassmorphism escuro
- `.ds-glass-medium` — glassmorphism médio
- `.ds-reveal` — elemento que anima na entrada do viewport
- `.ds-tech-grid` — grid técnico de fundo com fade nas bordas

## Animações — GSAP

GSAP com ScrollTrigger é usado em `src/app/page.tsx`.
Sempre registrar antes de usar:

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

`page.tsx` é `'use client'` por causa do GSAP.
Páginas de demo também podem ser `'use client'`.

## Segurança

- Headers de segurança configurados em `next.config.ts` — CSP, HSTS, X-Frame-Options
- Rate limiting em `src/lib/rateLimit.ts` — usar `checkRateLimit(key, maxAttempts, windowMs)` nos CTAs
- Novas fontes de imagem: adicionar em `img-src` no CSP e em `images.remotePatterns`

## Utilitários

- `src/lib/utils.ts` — `cn(...classes)` combinador de classes
- `src/lib/rateLimit.ts` — proteção contra spam nos botões de CTA

## Convenções do projeto

- Tailwind v4 via PostCSS — sem arquivo `tailwind.config`
- Todo texto para o usuário em português brasileiro pt-BR
- Links WhatsApp: `https://wa.me/numero?text=mensagem_encodada`
- Todo site novo deve ter: mobile-first, scroll reveal, WhatsApp CTA, DemoBanner via layout
- Padrão de commits: `feat:`, `fix:`, `security:`, `docs:`
- Sempre rodar `npm run build` antes do push para capturar erros TypeScript

## Sites no Portfolio Hoje

| Site | Rota | Categoria | Preço |
|---|---|---|---|
| Pizzaria Gustoso | /demo/pizzaria | Restaurante | R$ 1.200 |
| Clínica Vita | /demo/clinica | Saúde | R$ 1.800 |
| Urban Store | /demo/ecommerce | E-commerce | R$ 3.500 |
| Doçaria da Vovó | /demo/docaria | Confeitaria | R$ 1.200 |
| Pata Verde Pet | /demo/landing/petshop | Landing Page | R$ 650 |

## Próximos Sites Planejados

- `/demo/landing/dentista` — clínica odontológica, azul elétrico e branco
- `/demo/landing/confeitaria` — landing page luxo, preto e dourado parisiense
- `/demo/agencia` — agência criativa, bold e dark
- `/demo/saas` — SaaS landing page, tech e conversão alta
- `/demo/imobiliaria` — imobiliária premium com busca de imóveis
