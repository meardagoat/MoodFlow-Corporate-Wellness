// filepath: src/lib/auth.ts
import { computed } from 'vue'
import { supabase } from './supabaseClient'
import { currentProfile } from './store'

/**
 * Vérifie si creatorRole peut créer targetRole
 */
export function canCreateRole(creatorRole?: string, targetRole?: string): boolean {
  if (!creatorRole || !targetRole) return false
  if (creatorRole === 'system_admin') return true
  if (creatorRole === 'manager' && targetRole === 'employee') return true
  return false
}

/**
 * Inscription publique : create uniquement employee
 */
export async function signUpPublic(email: string, password: string, service?: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'employee',
        service,
      },
    },
  })
}

/**
 * Création sécurisée d'un utilisateur.
 * Appelle l'Edge Function 'create-user' (doit être protégée côté serveur).
 * Ne pas appeler directement pour des actions sensibles sans vérification côté serveur.
 */
export async function createUser(email: string, password: string, role: string, service?: string) {
  if (!currentProfile?.value) {
    throw new Error('Non authentifié')
  }

  if (!canCreateRole(currentProfile.value.role, role)) {
    throw new Error('Permissions insuffisantes pour créer ce type de compte')
  }

  const { data, error } = await supabase.functions.invoke('create-user', {
    body: { email, password, role, service },
  })

  return { data, error }
}

/**
 * helper reactive pour l'UI
 */
export const isSystemAdmin = computed(() => currentProfile?.value?.role === 'system_admin')
