<template>
  <div class="app-shell relative flex min-h-screen flex-col bg-paper">
    <!-- Barre supérieure -->
    <header class="safe-top relative z-40">
      <div class="mx-auto flex h-20 max-w-site items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <router-link to="/feed" class="group flex items-center gap-2.5" aria-label="MoodFlow, fil d'humeurs">
          <SunMark
            class="h-10 w-10 transition-transform duration-700 ease-out-expo group-hover:rotate-45"
            :ray-count="16"
            :ray-width="8"
            :blink="false"
          />
          <span class="display text-xl tracking-[-0.045em]">MoodFlow</span>
        </router-link>

        <p class="label hidden items-center gap-3 text-ink/55 md:flex" aria-live="off">
          <span class="relative flex h-2 w-2" aria-hidden="true">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-tangerine opacity-70" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-tangerine" />
          </span>
          <span>{{ today }}</span>
          <span class="text-ink/25">/</span>
          <span class="tabular-nums">{{ clock }}</span>
        </p>

        <div class="flex items-center gap-2">
          <span
            v-if="currentProfile?.service"
            class="label hidden rounded-full border border-ink/15 px-3.5 py-2.5 text-ink/70 sm:inline-flex"
          >
            {{ currentProfile?.service }}
          </span>
          <router-link
            to="/profile"
            class="display grid h-11 w-11 place-items-center rounded-full text-base transition-transform duration-500 ease-out-back hover:scale-110"
            :class="route.path === '/profile' ? 'bg-ink text-sun' : 'bg-sun text-ink'"
            :aria-label="`Profil de ${currentProfile?.display_name || 'l’utilisateur'}`"
          >
            {{ initial }}
          </router-link>
          <button
            type="button"
            @click="handleSignOut"
            :disabled="signingOut"
            class="grid h-11 w-11 place-items-center rounded-full text-ink/60 transition-colors hover:bg-coral hover:text-ink"
            title="Se déconnecter"
            aria-label="Se déconnecter"
          >
            <span v-if="signingOut" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <Icon v-else name="logout" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

    <main class="relative flex-1 pb-36">
      <slot />
    </main>

    <!-- Dock de navigation flottant -->
    <nav
      class="dock fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
      aria-label="Navigation de l'application"
    >
      <div class="pointer-events-auto flex items-center gap-1.5 rounded-full bg-ink p-1.5 text-paper shadow-[0_24px_60px_-18px_rgba(26,14,43,0.7)]">
        <div ref="track" class="relative flex items-center">
          <span
            class="dock-indicator absolute inset-y-0 left-0 rounded-full"
            :class="activeIsAdmin ? 'bg-coral' : 'bg-sun'"
            :style="indicatorStyle"
            aria-hidden="true"
          />
          <router-link
            v-for="item in links"
            :key="item.to"
            :ref="(el) => setItemRef(item.to, el)"
            :to="item.to"
            class="relative z-10 flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-500"
            :class="isActive(item.to) ? 'text-ink' : 'text-paper/70 hover:text-paper'"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            :aria-label="item.label"
          >
            <Icon :name="item.icon" class="h-5 w-5 shrink-0" />
            <span class="dock-label" :class="isActive(item.to) ? 'is-active' : ''">{{ item.label }}</span>
          </router-link>
        </div>
        <button
          type="button"
          class="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper text-ink transition-colors duration-300 hover:bg-sun"
          aria-label="Partager mon humeur"
          title="Partager mon humeur"
          @click="shareMood"
        >
          <Icon name="plus" class="h-5 w-5 transition-transform duration-500 ease-out-back group-hover:rotate-90" />
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick, type ComponentPublicInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentProfile, isManager, isSystemAdmin, signOut } from '../lib/auth';
import SunMark from './brand/SunMark.vue';
import Icon, { type IconName } from './ui/Icon.vue';

const router = useRouter();
const route = useRoute();
const signingOut = ref(false);

const links = computed(() => {
  const items: { to: string; label: string; icon: IconName }[] = [{ to: '/feed', label: 'Fil', icon: 'grid' }];
  if (isManager.value) items.push({ to: '/dashboard', label: 'Analyses', icon: 'chart' });
  items.push({ to: '/chat', label: 'Messages', icon: 'message' });
  if (isSystemAdmin.value) items.push({ to: '/admin', label: 'Admin', icon: 'crown' });
  items.push({ to: '/profile', label: 'Profil', icon: 'user' });
  return items;
});

const isActive = (to: string) => route.path === to;
const activeIsAdmin = computed(() => route.path === '/admin');

const initial = computed(() => (currentProfile.value?.display_name?.charAt(0) || 'U').toUpperCase());

// Date et heure en direct
const now = ref(new Date());
let clockTimer: number | undefined;
const today = computed(() =>
  now.value.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' }).replace('.', ''),
);
const clock = computed(() => now.value.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));

// Pastille active qui glisse d'un onglet à l'autre
const track = ref<HTMLElement | null>(null);
const itemEls = new Map<string, HTMLElement>();
const indicatorStyle = ref<Record<string, string>>({ opacity: '0' });

function setItemRef(to: string, el: Element | ComponentPublicInstance | null) {
  const node = el && '$el' in el ? (el.$el as HTMLElement) : (el as HTMLElement | null);
  if (node) itemEls.set(to, node);
  else itemEls.delete(to);
}

function placeIndicator() {
  const el = itemEls.get(route.path);
  if (!el) {
    indicatorStyle.value = { ...indicatorStyle.value, opacity: '0' };
    return;
  }
  indicatorStyle.value = {
    opacity: '1',
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
  };
}

let resizeObserver: ResizeObserver | null = null;

watch(() => route.path, async () => {
  await nextTick();
  // Le libellé actif s'ouvre : on mesure après la transition de largeur
  placeIndicator();
  window.setTimeout(placeIndicator, 360);
});

onMounted(async () => {
  clockTimer = window.setInterval(() => (now.value = new Date()), 15000);
  await nextTick();
  placeIndicator();
  if (track.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => placeIndicator());
    resizeObserver.observe(track.value);
  }
});

onUnmounted(() => {
  window.clearInterval(clockTimer);
  resizeObserver?.disconnect();
});

async function shareMood() {
  if (route.path !== '/feed') {
    await router.push('/feed');
    window.setTimeout(() => window.dispatchEvent(new CustomEvent('open-post-modal')), 350);
  } else {
    window.dispatchEvent(new CustomEvent('open-post-modal'));
  }
}

async function handleSignOut() {
  try {
    signingOut.value = true;
    const { error } = await signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
      signingOut.value = false;
      return;
    }
    router.push('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    signingOut.value = false;
  }
}
</script>

<style scoped>
.dock {
  pointer-events: none;
}

.dock-indicator {
  transition:
    transform 0.6s var(--ease-out-expo),
    width 0.6s var(--ease-out-expo),
    background-color 0.4s ease,
    opacity 0.3s ease;
}

/* Libellés : toujours visibles sur grand écran, seul l'actif s'ouvre sur mobile */
.dock-label {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  max-width: 0;
  opacity: 0;
  transition:
    max-width 0.5s var(--ease-out-expo),
    opacity 0.3s ease;
}

.dock-label.is-active {
  max-width: 8rem;
  opacity: 1;
}

@media (min-width: 768px) {
  .dock-label {
    max-width: 8rem;
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .dock a {
    padding-inline: 0.875rem;
  }
}
</style>
