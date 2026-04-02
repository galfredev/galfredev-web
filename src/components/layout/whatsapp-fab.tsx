'use client'

import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.22 }}
          href={buildWhatsAppUrl(
            'Hola, me gustaría consultar por los servicios de GalfreDev.',
          )}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-3 rounded-full border border-emerald-400/28 bg-[rgba(11,20,17,0.94)] px-4 py-3 text-sm text-white shadow-[0_18px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-emerald-400/50 sm:bottom-6 sm:right-6"
        >
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
            <MessageCircle size={18} />
          </span>
          <span className="hidden sm:block">
            Hablar por WhatsApp
          </span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
