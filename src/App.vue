<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from './components/AppLayout.vue';
import SplashScreen from './components/SplashScreen.vue';
import GoodbyeScreen from './components/GoodbyeScreen.vue';
import PublicShell from './components/site/PublicShell.vue';
import PageCurtain from './components/site/PageCurtain.vue';
import { initAuth } from './lib/auth';
import { useNative } from './composables/useNative';
import { prefersReducedMotion, refreshScrollTriggers, scrollToTop } from './lib/motion';

const route = useRoute();
const router = useRouter();

// Initialiser les fonctionnalités natives
useNative();

// États des splash screens
const showSplash = ref(false);
const showGoodbye = ref(false);
const authInitialized = ref(false);

const marketingPages = ['/', '/about', '/contact', '/privacy', '/pricing', '/demo'];

const isAuthPage = computed(() => {
  const publicPages = ['/', '/login', '/register', '/about', '/contact', '/privacy', '/pricing', '/demo'];
  return publicPages.includes(route.path);
});

const isMarketingPage = computed(() => marketingPages.includes(route.path));

// Rideau de transition entre les pages vitrine
const curtain = ref<InstanceType<typeof PageCurtain> | null>(null);
const pageLabels: Record<string, string> = {
  '/': 'Accueil',
  '/about': 'À propos',
  '/contact': 'Contact',
  '/privacy': 'Confidentialité',
  '/pricing': 'Tarifs',
  '/demo': 'Démo',
};
let curtainCovering = false;

router.beforeEach(async (to, from) => {
  if (curtainCovering || !from.matched.length || to.path === from.path) return true;
  if (!marketingPages.includes(to.path) || !marketingPages.includes(from.path)) return true;
  if (prefersReducedMotion() || !curtain.value) return true;
  curtainCovering = true;
  await curtain.value.cover(pageLabels[to.path] ?? '');
  return true;
});

router.afterEach(async () => {
  if (!curtainCovering) return;
  scrollToTop();
  await nextTick();
  refreshScrollTriggers(80);
  await curtain.value?.reveal();
  curtainCovering = false;
});

// Initialisation de l'authentification
onMounted(async () => {
  await initAuth();
  authInitialized.value = true;
});

// Fonctions pour gérer les splash screens
function closeSplash() {
  showSplash.value = false;
}

function closeGoodbye() {
  showGoodbye.value = false;
}

// Fonction pour afficher l'écran d'au revoir
function showGoodbyeScreen() {
  showGoodbye.value = true;
}

// Fonction pour afficher le splash screen après login/register
function showWelcomeSplash() {
  showSplash.value = true;
}

// Exposer les fonctions globalement
(window as any).showGoodbyeScreen = showGoodbyeScreen;
(window as any).showWelcomeSplash = showWelcomeSplash;
</script>

<template>
  <!-- Splash Screen au lancement -->
  <SplashScreen
    v-if="showSplash"
    :duration="5000"
    @complete="closeSplash"
  />

  <!-- Écran d'au revoir -->
  <GoodbyeScreen
    v-if="showGoodbye"
    @complete="closeGoodbye"
  />

  <!-- Contenu principal -->
  <div v-if="!showSplash">
    <PublicShell v-if="isMarketingPage">
      <router-view />
    </PublicShell>
    <router-view v-else-if="isAuthPage" />
    <AppLayout v-else>
      <router-view v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </AppLayout>
  </div>

  <PageCurtain ref="curtain" />
  <div class="grain" aria-hidden="true" />
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.45s var(--ease-out-expo);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translate3d(0, 0.75rem, 0);
}

.page-fade-leave-to {
  opacity: 0;
}
</style>
