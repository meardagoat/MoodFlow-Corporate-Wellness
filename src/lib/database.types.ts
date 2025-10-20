// filepath: src/lib/database.types.ts
export type Profile = {
  id: string
  email?: string
  service?: string
  // rôle : employee | manager | system_admin
  role: 'employee' | 'manager' | 'system_admin'
  created_at?: string
  updated_at?: string
  // autres champs éventuels
}
