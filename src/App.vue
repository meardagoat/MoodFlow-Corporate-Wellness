<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from './components/AppLayout.vue';
import SplashScreen from './components/SplashScreen.vue';
import WelcomeScreen from './components/WelcomeScreen.vue';
import GoodbyeScreen from './components/GoodbyeScreen.vue';
import { currentUser, currentProfile, initAuth } from './lib/auth';
import { useNative } from './composables/useNative';

const route = useRoute();
const router = useRouter();

// Initialiser les fonctionnalités natives
const { isNative, platform } = useNative();

// États des splash screens
const showSplash = ref(true);
const showWelcome = ref(false);
const showGoodbye = ref(false);
const authInitialized = ref(false);

// Statistiques de session
const sessionStats = ref({ posts: 0, messages: 0 });

const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register';
});

// Initialisation de l'authentification
onMounted(async () => {
  await initAuth();
  authInitialized.value = true;
  
  // Fermer le splash screen après initialisation
  setTimeout(() => {
    showSplash.value = false;
    
    // Afficher l'écran de bienvenue si l'utilisateur est connecté
    if (currentUser.value && currentProfile.value) {
      showWelcome.value = true;
    }
  }, 2000);
});

// Fonctions pour gérer les splash screens
function closeSplash() {
  showSplash.value = false;
}

function closeWelcome() {
  showWelcome.value = false;
}

function closeGoodbye() {
  showGoodbye.value = false;
}

// Fonction pour afficher l'écran d'au revoir
function showGoodbyeScreen() {
  showGoodbye.value = true;
}

// Exposer la fonction globalement pour l'utiliser lors de la déconnexion
(window as any).showGoodbyeScreen = showGoodbyeScreen;
</script>

<template>
  <!-- Splash Screen au lancement -->
  <SplashScreen 
    v-if="showSplash" 
    :duration="3000"
    @close="closeSplash"
  />

  <!-- Écran de bienvenue -->
  <WelcomeScreen 
    v-if="showWelcome" 
    :show="showWelcome"
    :stats="sessionStats"
    @close="closeWelcome"
  />

  <!-- Écran d'au revoir -->
  <GoodbyeScreen 
    v-if="showGoodbye" 
    :show="showGoodbye"
    :sessionStats="sessionStats"
    @close="closeGoodbye"
  />

  <!-- Contenu principal -->
  <div v-if="!showSplash">
    <div v-if="isAuthPage">
      <router-view />
    </div>
    <AppLayout v-else>
      <router-view />
    </AppLayout>
  </div>
</template>
