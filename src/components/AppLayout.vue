<template>
  <div class="flex min-h-screen flex-col bg-paper">
    <!-- Barre de navigation -->
    <nav class="safe-top sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md" aria-label="Navigation de l'application">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div class="flex items-center gap-6">
          <router-link to="/feed" class="group flex items-center gap-2.5" aria-label="MoodFlow, feed">
            <SunMark
              class="h-9 w-9 transition-transform duration-700 ease-out-expo group-hover:rotate-45"
              :ray-count="16"
              :ray-width="8"
              :blink="false"
            />
            <span class="display hidden text-xl tracking-[-0.045em] sm:inline">MoodFlow</span>
          </router-link>

          <div class="hidden items-center gap-1 rounded-full bg-ink/[0.05] p-1 md:flex">
            <router-link to="/feed" :class="navClass('/feed')">
              <Icon name="grid" class="h-4 w-4" />
              Feed
            </router-link>

            <router-link v-if="isManager" to="/dashboard" :class="navClass('/dashboard')">
              <Icon name="chart" class="h-4 w-4" />
              Dashboard
            </router-link>

            <router-link v-if="isSystemAdmin" to="/admin" :class="navClass('/admin', true)">
              <Icon name="crown" class="h-4 w-4" />
              Admin
            </router-link>

            <router-link to="/chat" :class="navClass('/chat')">
              <Icon name="message" class="h-4 w-4" />
              Chat
            </router-link>
          </div>
        </div>

        <!-- Actions de droite -->
        <div class="flex items-center gap-2">
          <!-- Service badge -->
          <span
            v-if="currentProfile?.service"
            class="label hidden rounded-full border border-ink/15 px-3.5 py-2.5 text-ink/70 sm:inline-flex"
          >
            {{ currentProfile?.service }}
          </span>

          <router-link
            to="/profile"
            class="display grid h-10 w-10 place-items-center rounded-full text-base transition-[transform,box-shadow] duration-300 hover:scale-105"
            :class="$route.path === '/profile' ? 'bg-ink text-sun ring-4 ring-sun' : 'bg-sun text-ink'"
            :aria-label="`Profil de ${currentProfile?.display_name || 'l’utilisateur'}`"
          >
            {{ getInitial() }}
          </router-link>

          <!-- Sign out button -->
          <button
            type="button"
            @click="handleSignOut"
            :disabled="signingOut"
            class="grid h-10 w-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-coral hover:text-ink"
            title="Se déconnecter"
            aria-label="Se déconnecter"
          >
            <span v-if="signingOut" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <Icon v-else name="logout" class="h-5 w-5" />
          </button>

          <button
            type="button"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper md:hidden"
            :aria-expanded="mobileMenuOpen"
            aria-controls="app-menu-mobile"
            :aria-label="mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          >
            <Icon :name="mobileMenuOpen ? 'x' : 'menu'" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-out-expo"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="-translate-y-2 opacity-0"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div v-if="mobileMenuOpen" id="app-menu-mobile" class="border-t border-ink/10 px-4 pb-5 pt-3 md:hidden">
          <router-link
            v-for="item in mobileLinks"
            :key="item.to"
            :to="item.to"
            @click="mobileMenuOpen = false"
            class="flex items-center justify-between border-b border-ink/10 py-4"
          >
            <span class="flex items-center gap-4">
              <span
                class="grid h-10 w-10 place-items-center rounded-full"
                :class="$route.path === item.to ? 'bg-ink text-paper' : 'bg-ink/[0.06]'"
              >
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              <span class="display text-3xl tracking-[-0.04em]">{{ item.label }}</span>
            </span>
            <Icon name="arrow-right" class="h-5 w-5 text-ink/40" />
          </router-link>
        </div>
      </Transition>
    </nav>

    <!-- Main content avec safe area en bas -->
    <main class="safe-bottom flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentProfile, isManager, isSystemAdmin, signOut } from '../lib/auth';
import SunMark from './brand/SunMark.vue';
import Icon, { type IconName } from './ui/Icon.vue';

const router = useRouter();
const route = useRoute();
const mobileMenuOpen = ref(false);
const signingOut = ref(false);

const mobileLinks = computed(() => {
  const links: { to: string; label: string; icon: IconName }[] = [{ to: '/feed', label: 'Feed', icon: 'grid' }];
  if (isManager.value) links.push({ to: '/dashboard', label: 'Dashboard', icon: 'chart' });
  if (isSystemAdmin.value) links.push({ to: '/admin', label: 'Admin', icon: 'crown' });
  links.push({ to: '/chat', label: 'Chat', icon: 'message' });
  links.push({ to: '/profile', label: 'Profile', icon: 'user' });
  return links;
});

function navClass(path: string, admin = false) {
  const active = route.path === path;
  return [
    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300',
    active
      ? admin ? 'bg-coral text-ink' : 'bg-ink text-paper'
      : 'text-ink/70 hover:bg-ink/[0.06] hover:text-ink',
  ];
}

const getInitial = computed(() => {
  return () => {
    if (currentProfile.value?.display_name) {
      return currentProfile.value.display_name.charAt(0).toUpperCase();
    }
    return 'U';
  };
});

async function handleSignOut() {
  try {
    // Désactiver le bouton pendant la déconnexion
    signingOut.value = true;

    const { error } = await signOut();

    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Réactiver le bouton en cas d'erreur
      signingOut.value = false;
      return;
    }

    // Rediriger vers la page de connexion
    router.push('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    signingOut.value = false;
  }
}
</script>
