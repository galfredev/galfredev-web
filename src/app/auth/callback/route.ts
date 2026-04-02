import { env, hasSupabaseEnv } from '@/lib/env'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const next = requestUrl.searchParams.get('next') || '/perfil'
  const code = requestUrl.searchParams.get('code')
  const response = NextResponse.redirect(new URL(next, requestUrl.origin))

  if (!hasSupabaseEnv() || !code) {
    return response
  }

  const supabase = createServerClient(
    env.supabaseUrl,
    env.supabasePublishableKey,
    {
      cookies: {
        get(name: string) {
          return request.headers
            .get('cookie')
            ?.split('; ')
            .find((cookie) => cookie.startsWith(`${name}=`))
            ?.split('=')[1]
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    },
  )

  await supabase.auth.exchangeCodeForSession(code)

  return response
}
