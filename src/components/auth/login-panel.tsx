'use client'

import { env, hasSupabaseEnv } from '@/lib/env'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { useState } from 'react'

type OAuthProvider = 'google' | 'github' | 'linkedin_oidc'

export function LoginPanel() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')

  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback?next=/perfil`
      : `${env.siteUrl}/auth/callback?next=/perfil`

  async function handleMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!hasSupabaseEnv()) {
      setStatus('error')
      setMessage('Falta configurar Supabase para habilitar el acceso.')
      return
    }

    setStatus('loading')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (error) {
      setStatus('error')
      setMessage(error.message)
      return
    }

    setStatus('success')
    setMessage('Te envié un magic link para entrar a tu perfil.')
  }

  async function handleOAuth(provider: OAuthProvider) {
    if (!hasSupabaseEnv()) {
      setStatus('error')
      setMessage('Falta configurar Supabase para habilitar el acceso.')
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as never,
      options: {
        redirectTo,
      },
    })

    if (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <div className="w-full max-w-lg rounded-[34px] border border-white/8 bg-[rgba(8,12,20,0.82)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
          Acceso liviano
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">
          Ingresá a tu perfil
        </h1>
        <p className="text-sm leading-7 text-white/58">
          El acceso sirve para guardar tu contexto, preferencias y consentimiento,
          sin convertir el sitio en un portal pesado.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => handleOAuth('google')}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82 transition hover:border-white/20 hover:bg-white/8"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth('github')}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82 transition hover:border-white/20 hover:bg-white/8"
        >
          <Github size={16} />
          GitHub
        </button>
        <button
          type="button"
          onClick={() => handleOAuth('linkedin_oidc')}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/82 transition hover:border-white/20 hover:bg-white/8"
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

      <form onSubmit={handleMagicLink} className="space-y-4">
        <label className="grid gap-2 text-sm text-white/72">
          Email
          <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/18 px-4 py-3">
            <Mail size={18} className="text-white/42" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@empresa.com"
              className="w-full bg-transparent text-white outline-none placeholder:text-white/26"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)] disabled:opacity-70"
        >
          {status === 'loading' ? 'Enviando link...' : 'Enviar magic link'}
          <ArrowRight size={16} />
        </button>
      </form>

      {message ? (
        <div
          className={[
            'mt-5 rounded-[22px] border px-4 py-4 text-sm',
            status === 'error'
              ? 'border-rose-400/20 bg-rose-400/8 text-rose-100'
              : 'border-emerald-400/20 bg-emerald-400/8 text-emerald-100',
          ].join(' ')}
        >
          {message}
        </div>
      ) : null}

      {!hasSupabaseEnv() ? (
        <p className="mt-5 text-sm leading-7 text-white/42">
          Todavía faltan las variables públicas de Supabase para habilitar el acceso.
        </p>
      ) : null}
    </div>
  )
}
