<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLayout from './components/AppLayout.vue';
import SplashScreen from './components/SplashScreen.vue';
import GoodbyeScreen from './components/GoodbyeScreen.vue';
import { currentUser, currentProfile, initAuth } from './lib/auth';
import { useNative } from './composables/useNative';

const route = useRoute();
const router = useRouter();

// Initialiser les fonctionnalités natives
const { isNative, platform } = useNative();

// États des splash screens
const showSplash = ref(false);
const showGoodbye = ref(false);
const authInitialized = ref(false);


const isAuthPage = computed(() => {
  const publicPages = ['/', '/login', '/register', '/about', '/contact', '/privacy', '/pricing', '/demo'];
  return publicPages.includes(route.path);
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
    <div v-if="isAuthPage">
      <router-view />
    </div>
    <AppLayout v-else>
      <router-view />
    </AppLayout>
  </div>
</template>
