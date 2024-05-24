import { createClient } from '@supabase/supabase-js'
import type { Database } from 'paint/index.d.ts'

export const supabase = createClient<Database>('https://tpmidxhprynkamvxzvvd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbWlkeGhwcnlua2Ftdnh6dnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNDg4NzksImV4cCI6MjAyNzgyNDg3OX0.lOm7Cx_7Rn_aXKlZNXiaNzofUFUhvcVp0BbmjcxkozA')

