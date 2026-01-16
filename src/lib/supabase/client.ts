/**
 * Supabase Client Configuration
 * Server & Client-side Clients
 */

import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/config'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Fehlende NEXT_PUBLIC_SUPABASE_URL oder NEXT_PUBLIC_SUPABASE_ANON_KEY Umgebungsvariablen'
  )
}

// Client-side Supabase Client (für Browser)
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Server-side Supabase Client (für Server Actions/API)
export const getSupabaseClient = () => createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabaseClient
