'use client'

import { env, hasSupabaseEnv } from '@/lib/env'
import { getSafeAuthErrorMessage } from '@/lib/security'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { useState } from 'react'

type OAuthProvider = 'google' | 'github' | 'linkedin_oidc'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginPanel() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>(
    'idle',
  )
  const [message, setMessage] = useState('')

  function getRedirectTo() {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/auth/callback`
    }

    return `${env.siteUrl}/auth/callback`
  }

  async function handleMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!hasSupabaseEnv()) {
      setStatus('error')
      setMessage('Falta configurar Supabase para habilitar el acceso.')
      return
    }

    if (!emailRegex.test(normalizedEmail)) {
      setStatus('error')
      setMessage('Ingresá un email válido para continuar.')
      return
    }

    setStatus('loading')
    setMessage('')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: getRedirectTo(),
      },
    })

    if (error) {
      setStatus('error')
      setMessage(getSafeAuthErrorMessage('otp'))
      return
    }

    setStatus('success')
    setMessage('Te enviamos un enlace mágico para continuar con tu perfil.')
  }

  async function handleOAuth(provider: OAuthProvider) {
    if (!hasSupabaseEnv()) {
      setStatus('error')
      setMessage('Falta configurar Supabase para habilitar el acceso.')
      return
    }

    if (status === 'loading') {
      return
    }

    setStatus('loading')
    setMessage('')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as never,
      options: {
        redirectTo: getRedirectTo(),
      },
    })

    if (error) {
      setStatus('error')
      setMessage(getSafeAuthErrorMessage('oauth'))
    }
  }

  return (
    <div className="page-panel w-full max-w-lg rounded-[2rem] p-6 sm:p-8">
      <div className="space-y-3">
        <p className="section-kicker">Acceso liviano</p>
        <h2 className="text-[2rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-[2.65rem]">
          Ingresá a tu perfil
        </h2>
        <p className="text-sm leading-7 text-[var(--text-faint)]">
          Guardá contexto, preferencias y consentimiento para que el diagnóstico y el
          seguimiento sean más claros desde la primera conversación.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          disabled={status === 'loading'}
          onClick={() => handleOAuth('google')}
          className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition duration-300 hover:border-white/18 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-70"
        >
          Google
        </button>
        <button
          type="button"
          disabled={status === 'loading'}
          onClick={() => handleOAuth('github')}
          className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition duration-300 hover:border-white/18 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Github size={16} />
          GitHub
        </button>
        <button
          type="button"
          disabled={status === 'loading'}
          onClick={() => handleOAuth('linkedin_oidc')}
          className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/82 transition duration-300 hover:border-white/18 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Linkedin size={16} />
          LinkedIn
        </button>
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.28em] text-white/34">
          o por email
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-4" onSubmit={handleMagicLink} noValidate>
        <label className="block">
          <span className="mb-2 block text-sm text-white/68">Email</span>
          <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-white/80 transition duration-300 focus-within:border-white/16 focus-within:bg-white/[0.06]">
            <Mail size={16} className="text-white/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)

                if (status !== 'idle') {
                  setStatus('idle')
                  setMessage('')
                }
              }}
              placeholder="tu@empresa.com"
              autoComplete="email"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/28"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] border border-[rgba(61,221,196,0.18)] bg-[linear-gradient(180deg,rgba(50,148,134,0.98),rgba(31,127,115,0.92))] px-4 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_14px_38px_rgba(31,127,115,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? 'Enviando enlace...' : 'Enviar enlace mágico'}
          <ArrowRight
            size={16}
            className="transition duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </form>

      {message ? (
        <div
          aria-live="polite"
          className={[
            'mt-5 rounded-[1.3rem] border px-4 py-4 text-sm',
            status === 'success'
              ? 'border-emerald-400/20 bg-emerald-400/8 text-emerald-100'
              : 'border-rose-400/20 bg-rose-400/8 text-rose-100',
          ].join(' ')}
        >
          {message}
        </div>
      ) : null}

      {!hasSupabaseEnv() ? (
        <p className="mt-4 text-sm leading-7 text-amber-200/82">
          Supabase todavía no está configurado en este entorno. Los botones de acceso se
          muestran como referencia de UX.
        </p>
      ) : null}
    </div>
  )
}
