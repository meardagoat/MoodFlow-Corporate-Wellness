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
  }
}

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

  const result = await supabase
    .from('profiles')
    .update(updates as any)
    .eq('id', currentUser.value.id)
    .select()
    .single();

  const { data, error } = result as any;

  if (!error && data) {
    currentProfile.value = data;
  }

  return { data, error };
}
