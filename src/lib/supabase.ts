import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseReady = Boolean(url && key)
// placeholder dipakai agar app tidak crash saat .env belum diisi
export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder-key')

// snake_case (database) <-> camelCase (frontend). Kolom sort_order = field "order".
export const toCamel = (k: string) => (k === 'sort_order' ? 'order' : k.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase()))
export const toSnake = (k: string) => (k === 'order' ? 'sort_order' : k.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase()))
export const fromDb = (row: Record<string, any>): Record<string, any> =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [toCamel(k), v ?? '']))
export const toDb = (row: Record<string, any>): Record<string, any> =>
  Object.fromEntries(Object.entries(row).map(([k, v]) => [toSnake(k), v]))
