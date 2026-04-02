import { env } from '@/lib/env'

export function buildWhatsAppUrl(message?: string) {
  const target = new URL(env.whatsappUrl)

  if (message) {
    target.searchParams.set('text', message)
  }

  return target.toString()
}
