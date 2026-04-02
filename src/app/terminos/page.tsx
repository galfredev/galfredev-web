import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata = {
  title: 'Términos de uso',
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pb-18 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <article className="mx-auto max-w-4xl rounded-[34px] border border-white/8 bg-white/5 p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Términos
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">
            Términos de uso
          </h1>
          <div className="mt-8 space-y-8 text-sm leading-8 text-white/66">
            <section>
              <h2 className="text-lg font-medium text-white">Objeto del sitio</h2>
              <p>
                Esta web presenta los servicios, soluciones, metodología y canales
                de contacto de GalfreDev. No constituye una plataforma SaaS pública
                ni un entorno contractual automático por sí mismo.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-medium text-white">Uso permitido</h2>
              <p>
                El visitante puede navegar, calcular escenarios de ROI, dejar datos
                de contacto, iniciar sesión en su perfil y solicitar información.
                Queda prohibido el uso abusivo de formularios, endpoints o mecanismos
                de autenticación.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-medium text-white">Propuestas y alcances</h2>
              <p>
                Toda propuesta comercial, alcance, presupuesto o implementación se
                define caso por caso. El contenido del sitio no reemplaza una
                evaluación específica del negocio ni constituye garantía de resultado.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-medium text-white">Disponibilidad</h2>
              <p>
                GalfreDev podrá actualizar, modificar o retirar secciones, textos,
                funcionalidades o mecanismos de acceso cuando resulte necesario para
                mantener el sitio seguro, claro y vigente.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
