'use client'

import {
  interestOptions,
  profileBusinessTypes,
  profileChannels,
  profileNeeds,
  profileTeamSizes,
} from '@/content/site-content'
import type { ProfileFormState } from '@/types/site'
import { useState } from 'react'

type ProfileFormProps = {
  email: string
  providerLabel: string
  initialValues: ProfileFormState
}

export function ProfileForm({
  email,
  providerLabel,
  initialValues,
}: ProfileFormProps) {
  const [form, setForm] = useState(initialValues)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('saving')
    setMessage('')

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = (await response.json()) as {
        ok: boolean
        message: string
      }

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(result.message)
        return
      }

      setStatus('success')
      setMessage(result.message)
    } catch {
      setStatus('error')
      setMessage('No se pudieron guardar los cambios.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[34px] border border-white/8 bg-[rgba(8,12,20,0.82)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Perfil
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">
              Información útil para conocerte mejor
            </h1>
          </div>

          <div className="rounded-[26px] border border-white/8 bg-white/5 p-5 text-sm leading-7 text-white/62">
            <p>
              <span className="font-medium text-white">Email:</span> {email}
            </p>
            <p className="mt-2">
              <span className="font-medium text-white">Proveedor:</span>{' '}
              {providerLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-white/72">
              Nombre
              <input
                value={form.fullName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, fullName: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/72">
              WhatsApp
              <input
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/72">
              Empresa o marca
              <input
                value={form.companyName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    companyName: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              />
            </label>
            <label className="grid gap-2 text-sm text-white/72">
              Rubro
              <select
                value={form.businessType}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    businessType: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              >
                <option value="">Elegí un rubro</option>
                {profileBusinessTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-white/72">
              Tamaño del equipo
              <select
                value={form.teamSize}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    teamSize: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              >
                <option value="">Elegí un tamaño</option>
                {profileTeamSizes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-white/72">
              Necesidad principal
              <select
                value={form.primaryNeed}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    primaryNeed: event.target.value,
                  }))
                }
                className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              >
                <option value="">Elegí una necesidad</option>
                {profileNeeds.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-3 text-sm text-white/72">
            Intereses
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((option) => {
                const active = form.interests.includes(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        interests: active
                          ? current.interests.filter((item) => item !== option.value)
                          : [...current.interests, option.value],
                      }))
                    }
                    className={[
                      'rounded-full border px-3 py-2 text-xs transition',
                      active
                        ? 'border-[var(--color-accent)]/26 bg-[var(--color-accent)]/10 text-white'
                        : 'border-white/10 bg-black/18 text-white/58 hover:border-white/22 hover:text-white',
                    ].join(' ')}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </label>

          <label className="grid gap-2 text-sm text-white/72">
            Canal de contacto preferido
            <select
              value={form.preferredContactChannel}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  preferredContactChannel: event.target.value,
                }))
              }
              className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
            >
              <option value="">Elegí un canal</option>
              {profileChannels.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 rounded-[24px] border border-white/8 bg-black/18 p-4 text-sm text-white/72">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.newsletterOptIn}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    newsletterOptIn: event.target.checked,
                  }))
                }
                className="mt-1 accent-[var(--color-accent)]"
              />
              Quiero recibir novedades por email.
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.commercialFollowUp}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    commercialFollowUp: event.target.checked,
                  }))
                }
                className="mt-1 accent-[var(--color-accent)]"
              />
              Autorizo seguimiento comercial.
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.profilingConsent}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profilingConsent: event.target.checked,
                  }))
                }
                className="mt-1 accent-[var(--color-accent)]"
              />
              Acepto que esta información se use para personalizar propuestas y seguimiento.
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === 'saving'}
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)] disabled:opacity-70"
            >
              {status === 'saving' ? 'Guardando...' : 'Guardar perfil'}
            </button>
            {message ? (
              <p
                className={[
                  'text-sm',
                  status === 'error' ? 'text-rose-200' : 'text-emerald-200',
                ].join(' ')}
              >
                {message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  )
}
