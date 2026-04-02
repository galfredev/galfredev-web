'use client'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type LeadStatus = 'idle' | 'loading' | 'success' | 'error'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  businessType: '',
  primaryNeed: '',
  challenge: '',
  consentFollowUp: true,
  consentNewsletter: false,
  consentPrivacy: false,
  website: '',
}

export function ContactSection() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<LeadStatus>('idle')
  const [message, setMessage] = useState('')
  const [whatsAppHref, setWhatsAppHref] = useState('')
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          elapsedMs: Date.now() - startTimeRef.current,
          source: 'website-contact-section',
        }),
      })

      const result = (await response.json()) as {
        ok: boolean
        message: string
        whatsappUrl?: string
      }

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(result.message)
        return
      }

      setStatus('success')
      setMessage(result.message)
      setWhatsAppHref(result.whatsappUrl ?? '')
      setForm(initialForm)
      startTimeRef.current = Date.now()
    } catch {
      setStatus('error')
      setMessage('No se pudo enviar el pedido. Probá de nuevo o escribime por WhatsApp.')
    }
  }

  return (
    <section id="contacto" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            title="Si querés ordenar, automatizar o escalar, lo seguimos por WhatsApp."
            description="La web resuelve el primer paso: mostrar qué hace GalfreDev, darte contexto y permitirte pedir diagnóstico o propuesta de forma clara. El cierre ideal es una conversación real."
          />

          <div className="mt-8 space-y-4">
            <a
              href={buildWhatsAppUrl(
                'Hola, quiero hablar por WhatsApp para evaluar automatizaciones o software a medida.',
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)]"
            >
              Hablar por WhatsApp
              <ArrowRight size={16} />
            </a>
            <p className="max-w-md text-sm leading-7 text-white/56">
              También podés dejar tus datos y la necesidad principal para que el
              contacto salga con mejor contexto y con consentimiento explícito.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <form
            onSubmit={handleSubmit}
            className="rounded-[34px] border border-white/8 bg-white/5 p-6 sm:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/72">
                Nombre y apellido
                <input
                  required
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      fullName: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/72">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/72">
                WhatsApp
                <input
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/72">
                Negocio o empresa
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
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/72">
                Rubro
                <input
                  value={form.businessType}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      businessType: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
                />
              </label>
              <label className="grid gap-2 text-sm text-white/72">
                Necesidad principal
                <select
                  required
                  value={form.primaryNeed}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      primaryNeed: event.target.value,
                    }))
                  }
                  className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
                >
                  <option value="">Elegí una opción</option>
                  <option value="whatsapp">WhatsApp y captación</option>
                  <option value="seguimiento">Seguimiento comercial</option>
                  <option value="turnos">Turnos y recordatorios</option>
                  <option value="cobranzas">Cobranzas y avisos</option>
                  <option value="automatizacion-interna">Automatización interna</option>
                  <option value="software-a-medida">Software a medida</option>
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm text-white/72">
              Contame el contexto
              <textarea
                required
                rows={5}
                value={form.challenge}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    challenge: event.target.value,
                  }))
                }
                className="rounded-[22px] border border-white/10 bg-black/18 px-4 py-3 text-white outline-none transition focus:border-[var(--color-accent)]/32"
              />
            </label>

            <input
              value={form.website}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  website: event.target.value,
                }))
              }
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="mt-5 grid gap-3 rounded-[24px] border border-white/8 bg-black/16 p-4 text-sm text-white/72">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consentFollowUp}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      consentFollowUp: event.target.checked,
                    }))
                  }
                  className="mt-1 accent-[var(--color-accent)]"
                />
                Autorizo seguimiento comercial por email o WhatsApp.
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consentNewsletter}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      consentNewsletter: event.target.checked,
                    }))
                  }
                  className="mt-1 accent-[var(--color-accent)]"
                />
                Quiero recibir novedades sobre automatización, software e IA aplicada.
              </label>
              <label className="flex items-start gap-3">
                <input
                  required
                  type="checkbox"
                  checked={form.consentPrivacy}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      consentPrivacy: event.target.checked,
                    }))
                  }
                  className="mt-1 accent-[var(--color-accent)]"
                />
                Acepto la política de privacidad y el tratamiento de mis datos para este contacto.
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Enviando...' : 'Pedir propuesta o diagnóstico'}
              </button>
              <a
                href={buildWhatsAppUrl(
                  'Hola, quiero consultar por los servicios de GalfreDev.',
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/82 transition hover:border-white/24 hover:text-white"
              >
                Ir directo a WhatsApp
              </a>
            </div>

            {message ? (
              <div
                className={[
                  'mt-5 rounded-[22px] border px-4 py-4 text-sm',
                  status === 'success'
                    ? 'border-emerald-400/20 bg-emerald-400/8 text-emerald-100'
                    : 'border-rose-400/20 bg-rose-400/8 text-rose-100',
                ].join(' ')}
              >
                <p>{message}</p>
                {status === 'success' && whatsAppHref ? (
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4"
                  >
                    Continuar por WhatsApp
                    <ArrowRight size={16} />
                  </a>
                ) : null}
              </div>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
