import { ref, computed } from 'vue';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import type { Database } from './database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const currentUser = ref<User | null>(null);
export const currentProfile = ref<Profile | null>(null);
export const isLoading = ref(true);

export const isAuthenticated = computed(() => !!currentUser.value);
export const isManager = computed(() => currentProfile.value?.role === 'manager');
export const isSystemAdmin = computed(() => currentProfile.value?.role === 'system_admin');

export async function initAuth() {
  isLoading.value = true;

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    currentUser.value = session.user;
    await loadProfile(session.user.id);
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    (async () => {
      currentUser.value = session?.user ?? null;
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        currentProfile.value = null;
      }
    })();
  });

  isLoading.value = false;
}

async function loadProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (!error && data) {
    currentProfile.value = data;
    console.log('Profile loaded:', data); // Debug
  }
}

// Fonction pour forcer le rechargement du profil
export async function refreshProfile() {
  if (currentUser.value) {
    console.log('Refreshing profile for user:', currentUser.value.id);
    await loadProfile(currentUser.value.id);
  }
}

// Fonction de debug pour vérifier directement dans la DB
export async function debugProfile() {
  if (!currentUser.value) {
    console.log('No current user');
    return;
  }
  
  console.log('Current user:', currentUser.value);
  console.log('Current profile before refresh:', currentProfile.value);
  
  // Requête directe pour debug
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', currentUser.value.id)
    .maybeSingle();
    
  console.log('Direct DB query result:', { data, error });
  
  if (data) {
    currentProfile.value = data;
    console.log('Profile updated:', data);
  }
}

// Fonction pour vérifier les permissions de création de rôles
export function canCreateRole(creatorRole: string, targetRole: string): boolean {
  if (creatorRole === 'system_admin') {
    return true; // Peut créer n'importe quel rôle
  }
  if (creatorRole === 'manager' && targetRole === 'employee') {
    return true; // Manager peut créer des employés
  }
  return false; // Employés ne peuvent créer personne
}

// Fonction pour inscription publique (toujours employee)
export async function signUpPublic(email: string, password: string, service: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'employee', // ✅ Toujours employee par défaut
        service,
      },
    },
  });

  return { data, error };
}

// Fonction pour créer des utilisateurs (admin/manager seulement)
export async function createUser(email: string, password: string, role: string, service: string) {
  if (!currentProfile.value) {
    throw new Error('Non authentifié');
  }
  
  if (!canCreateRole(currentProfile.value.role, role)) {
    throw new Error('Permissions insuffisantes pour créer ce type de compte');
  }
  
  // Appeler une Edge Function qui créera l'utilisateur côté serveur
  const { data, error } = await supabase.functions.invoke('create-user', {
    body: { email, password, role, service }
  });
  
  return { data, error };
}

// Fonction d'inscription originale (maintenue pour compatibilité)
export async function signUp(email: string, password: string, role: string, service: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        service,
      },
    },
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/feed`,
    },
  });

  return { data, error };
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/feed`,
    },
  });

  return { data, error };
}

export async function signOut() {
  // Afficher l'écran d'au revoir avant la déconnexion
  if ((window as any).showGoodbyeScreen) {
    (window as any).showGoodbyeScreen();
    
    // Attendre un peu pour que l'utilisateur voit l'écran
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  const { error } = await supabase.auth.signOut();
  currentUser.value = null;
  currentProfile.value = null;
  return { error };
}

export async function updateProfile(updates: Partial<Profile>) {
  if (!currentUser.value) return { error: new Error('Not authenticated') };

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates as any)
      .eq('id', currentUser.value.id)
      .select()
      .single();

    if (!error && data) {
      currentProfile.value = data;
    }

    return { data, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
