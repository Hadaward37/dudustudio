import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Bloqueia o header usado no CVE-2025-29927
  if (request.headers.has('x-middleware-subrequest')) {
    return new NextResponse(null, { status: 403 })
  }

  const response = NextResponse.next()

  // Remove headers que revelam informações do servidor
  response.headers.delete('x-powered-by')
  response.headers.delete('server')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
