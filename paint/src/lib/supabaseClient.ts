import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://tpmidxhprynkamvxzvvd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwbWlkeGhwcnlua2Ftdnh6dnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNDg4NzksImV4cCI6MjAyNzgyNDg3OX0.lOm7Cx_7Rn_aXKlZNXiaNzofUFUhvcVp0BbmjcxkozA'
)
