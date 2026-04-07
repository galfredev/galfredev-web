'use client'

import { BlurHighlight } from '@/components/motion/blur-highlight'
import { Reveal } from '@/components/motion/reveal'
import {
  ConsentCheckboxCard,
  SelectField,
  TextAreaField,
  TextInputField,
} from '@/components/ui/contact-form-fields'
import { SectionHeading } from '@/components/ui/section-heading'
import {
  type LeadApiResponse,
  type LeadFieldErrors,
  buildDraftWhatsAppMessage,
  createInitialLeadFormState,
  leadPrimaryNeedOptions,
  type LeadStatus,
  validateLeadForm,
} from '@/lib/contact'
import { CONTACT_FORM_SOURCE } from '@/lib/lead-model'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type LeadFormState = ReturnType<typeof createInitialLeadFormState>

export function ContactSection() {
  const [form, setForm] = useState<LeadFormState>(createInitialLeadFormState)
  const [status, setStatus] = useState<LeadStatus>('idle')
  const [message, setMessage] = useState('')
  const [whatsAppHref, setWhatsAppHref] = useState('')
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({})
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (status !== 'success' || !whatsAppHref) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      window.location.assign(whatsAppHref)
    }, 900)

    return () => window.clearTimeout(timeoutId)
  }, [status, whatsAppHref])

  function updateField<K extends keyof LeadFormState>(
    key: K,
    value: LeadFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
    setFieldErrors((current) => ({ ...current, [key]: undefined }))

    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === 'loading') {
      return
    }

    const validation = validateLeadForm(form)

    if (!validation.isValid) {
      setFieldErrors(validation.errors)
      setStatus('error')
      setMessage('Revisá los campos marcados antes de enviar la consulta.')
      return
    }

    setStatus('loading')
    setMessage('')
    setFieldErrors({})

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          elapsedMs: Date.now() - startTimeRef.current,
          source: CONTACT_FORM_SOURCE,
        }),
      })

      const result = (await response.json()) as LeadApiResponse

      if (!response.ok || !result.ok) {
        setStatus('error')
        setMessage(result.message)
        setFieldErrors(result.errors ?? {})
        return
      }

      setStatus('success')
      setMessage(result.message)
      setWhatsAppHref(result.whatsappUrl ?? '')
      setFieldErrors({})
      setForm(createInitialLeadFormState())
      startTimeRef.current = Date.now()
    } catch {
      setStatus('error')
      setMessage(
        'No pudimos enviar tu consulta por un problema de conexión. Probá de nuevo o escribinos por WhatsApp.',
      )
    }
  }

  const directWhatsAppHref = buildWhatsAppUrl(buildDraftWhatsAppMessage(form))

  return (
    <section id="contacto" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            title="Si querés ordenar, automatizar o escalar, lo seguimos por WhatsApp."
            description=""
          />

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/66 sm:text-lg">
            <BlurHighlight
              text="La web resuelve el primer paso: mostrar qué hace GalfreDev, darte contexto y permitirte pedir un diagnóstico o una propuesta de forma clara. El cierre ideal es una conversación real."
              highlightWords={[
                'GalfreDev',
                'contexto',
                'diagnóstico',
                'propuesta',
                'conversación',
              ]}
            />
          </p>

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
              También podés dejar tus datos y la necesidad principal para que el contacto salga con mejor contexto, prioridad y consentimiento explícito.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="rounded-[34px] border border-white/8 bg-[rgba(8,12,20,0.84)] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextInputField
                required
                label="Nombre y apellido"
                value={form.fullName}
                error={fieldErrors.fullName}
                placeholder="Cómo te llamás"
                autoComplete="name"
                disabled={status === 'loading'}
                onChange={(event) => updateField('fullName', event.target.value)}
              />
              <TextInputField
                required
                type="email"
                label="Email"
                value={form.email}
                error={fieldErrors.email}
                placeholder="tu@email.com"
                autoComplete="email"
                disabled={status === 'loading'}
                onChange={(event) => updateField('email', event.target.value)}
              />
              <TextInputField
                required
                type="tel"
                inputMode="tel"
                label="WhatsApp"
                value={form.phone}
                error={fieldErrors.phone}
                helper="Lo usamos para continuar el lead sin fricción."
                placeholder="+54 9 351..."
                autoComplete="tel"
                disabled={status === 'loading'}
                onChange={(event) => updateField('phone', event.target.value)}
              />
              <TextInputField
                label="Negocio o empresa"
                value={form.companyName}
                placeholder="Nombre del negocio o marca"
                autoComplete="organization"
                disabled={status === 'loading'}
                onChange={(event) => updateField('companyName', event.target.value)}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextInputField
                label="Rubro"
                value={form.businessType}
                placeholder="Diseño, salud, servicios, e-commerce..."
                autoComplete="organization-title"
                disabled={status === 'loading'}
                onChange={(event) => updateField('businessType', event.target.value)}
              />
              <SelectField
                label="Necesidad principal"
                value={form.primaryNeed}
                options={leadPrimaryNeedOptions}
                placeholder="Elegí una opción"
                error={fieldErrors.primaryNeed}
                disabled={status === 'loading'}
                onChange={(value) => updateField('primaryNeed', value)}
              />
            </div>

            <div className="mt-4">
              <TextAreaField
                required
                rows={5}
                label="Contame el contexto"
                value={form.challenge}
                error={fieldErrors.challenge}
                helper="Cuanto más claro sea el contexto, mejor preparado sale el mensaje para WhatsApp."
                placeholder="Qué pasa hoy, qué querés ordenar y qué resultado esperás."
                disabled={status === 'loading'}
                onChange={(event) => updateField('challenge', event.target.value)}
              />
            </div>

            <input
              value={form.website}
              onChange={(event) => updateField('website', event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="mt-5 grid gap-3 rounded-[26px] border border-white/8 bg-white/[0.03] p-4">
              <ConsentCheckboxCard
                checked={form.consentFollowUp}
                disabled={status === 'loading'}
                label="Autorizo seguimiento comercial por email o WhatsApp."
                onChange={(checked) => updateField('consentFollowUp', checked)}
              />
              <ConsentCheckboxCard
                checked={form.consentNewsletter}
                disabled={status === 'loading'}
                label="Quiero recibir novedades sobre automatización, software e IA aplicada."
                onChange={(checked) => updateField('consentNewsletter', checked)}
              />
              <ConsentCheckboxCard
                required
                checked={form.consentPrivacy}
                disabled={status === 'loading'}
                error={fieldErrors.consentPrivacy}
                label="Acepto la política de privacidad y el tratamiento de mis datos para este contacto."
                onChange={(checked) => updateField('consentPrivacy', checked)}
              />
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
                href={directWhatsAppHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/82 transition hover:border-white/24 hover:text-white"
              >
                Ir directo a WhatsApp
              </a>
            </div>

            {message ? (
              <div
                aria-live="polite"
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
                    Continuar por WhatsApp ahora
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
