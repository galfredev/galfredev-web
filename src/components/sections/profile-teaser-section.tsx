import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { getCurrentUserContext } from '@/lib/user-context'
import Link from 'next/link'

export async function ProfileTeaserSection() {
  const userContext = await getCurrentUserContext()
  const isAuthenticated = Boolean(userContext)

  return (
    <section id="perfil" className="px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <InteractivePanel className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Perfil y seguimiento
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] text-white">
                {isAuthenticated
                  ? 'Tu perfil quedó integrado al sitio para volver cuando quieras y mantener tu contexto actualizado.'
                  : 'Un acceso simple para guardar tu contexto y retomar la conversación con un mejor diagnóstico.'}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/58">
                {isAuthenticated
                  ? 'Podés revisar tu información, editarla y actualizar preferencias de contacto o intereses desde el avatar superior o desde tu perfil.'
                  : 'Ideal para quienes quieren dejar datos útiles sobre su negocio, priorizar necesidades reales y avanzar con una propuesta más alineada.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={isAuthenticated ? '/perfil' : '/login'}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950"
              >
                {isAuthenticated ? 'Ver o editar perfil' : 'Crear o completar perfil'}
              </Link>
              <div className="rounded-full border border-white/12 px-4 py-3 text-center text-sm text-white/62">
                {isAuthenticated
                  ? `Sesión activa · ${userContext?.authUser.providerLabel ?? 'Acceso'}`
                  : 'Google · GitHub · LinkedIn · Enlace mágico'}
              </div>
            </div>
          </InteractivePanel>
        </Reveal>
      </div>
    </section>
  )
}
