import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata = {
  title: 'Política de privacidad',
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pb-18 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <article className="mx-auto max-w-4xl rounded-[34px] border border-white/8 bg-white/5 p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Privacidad
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">
            Política de privacidad
          </h1>
          <div className="mt-8 space-y-8 text-sm leading-8 text-white/66">
            <section>
              <h2 className="text-lg font-medium text-white">Qué datos se recopilan</h2>
              <p>
                GalfreDev puede recopilar nombre, email, WhatsApp, empresa, rubro,
                necesidad principal, preferencias de contacto y consentimientos
                cuando una persona completa formularios o crea un perfil.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-medium text-white">Para qué se usan</h2>
              <p>
                Los datos se usan para responder consultas, preparar propuestas,
                dar seguimiento comercial autorizado, personalizar el contacto y
                entender mejor el tipo de problema que busca resolver cada visitante.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-medium text-white">Base técnica y almacenamiento</h2>
              <p>
                El sitio utiliza Supabase para autenticación y base de datos. El
                despliegue está pensado para Vercel. No se exponen claves
                administrativas en frontend y se separan identidad, perfil,
                preferencias, leads y consentimientos.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-medium text-white">Derechos del usuario</h2>
              <p>
                Podés solicitar actualización, corrección o eliminación de tus datos
                escribiendo a galfredev@gmail.com. Si diste consentimiento comercial,
                también podés retirarlo cuando quieras.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
