'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ProfileToastProps = {
  initialVisible: boolean
}

export function ProfileToast({ initialVisible }: ProfileToastProps) {
  const router = useRouter()
  const [visible, setVisible] = useState(initialVisible)

  function handleClose() {
    setVisible(false)
    router.replace('/', { scroll: false })
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.24 }}
          className="fixed bottom-6 right-4 z-[70] w-[min(92vw,24rem)] rounded-[28px] border border-emerald-400/16 bg-[rgba(7,16,29,0.96)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:right-6"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex size-10 items-center justify-center rounded-full bg-emerald-400/12 text-emerald-200">
              <CheckCircle2 size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">
                Perfil guardado correctamente
              </p>
              <p className="mt-1 text-sm leading-6 text-white/60">
                Tu contexto ya quedó actualizado. Ahora podés volver al perfil cuando quieras desde el avatar superior.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex size-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/6 hover:text-white"
              aria-label="Cerrar mensaje"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
