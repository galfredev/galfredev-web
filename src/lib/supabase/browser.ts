'use client'

import { requireSupabaseEnv } from '@/lib/env'
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  const { supabasePublishableKey, supabaseUrl } = requireSupabaseEnv()

  return createBrowserClient(supabaseUrl, supabasePublishableKey)
}
