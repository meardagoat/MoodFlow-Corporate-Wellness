import { ref } from 'vue'
import type { Profile } from './database.types'

// currentProfile holds the logged-in user's profile (null si non connecté)
export const currentProfile = ref<Profile | null>(null)
