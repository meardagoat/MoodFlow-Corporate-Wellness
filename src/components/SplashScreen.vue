<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream-100 via-cream-50 to-primary-50 overflow-hidden"
    style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
  >
    <!-- Animation de cercles organiques (respiration) -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div 
        class="absolute w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-breathe"
        style="animation-delay: 0s"
      ></div>
      <div 
        class="absolute w-96 h-96 bg-lavender-300/15 rounded-full blur-3xl animate-breathe"
        style="animation-delay: 1s"
      ></div>
      <div 
        class="absolute w-80 h-80 bg-sky-300/10 rounded-full blur-3xl animate-breathe"
        style="animation-delay: 2s"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 px-6">
      <!-- Logo avec animation de pulsation douce -->
      <div class="mb-12">
        <div class="relative inline-block">
          <!-- Cercle extérieur pulsant -->
          <div class="absolute inset-0 -m-4 bg-primary-400/20 rounded-full animate-pulse-ring"></div>
          
          <!-- Logo principal -->
          <div class="relative w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-soft-lg">
            <img 
              src="../assets/mood_flow_logo.png" 
              alt="MoodFlow" 
              class="w-24 h-24 object-contain"
            />
          </div>
        </div>
      </div>

      <!-- Titre avec typographie élégante -->
      <h1 class="text-6xl font-bold text-neutral-800 mb-3 tracking-tight font-display">
        MoodFlow
      </h1>

      <!-- Sous-titre raffiné -->
      <p class="text-lg text-neutral-600 mb-12 font-light max-w-md mx-auto leading-relaxed">
        Cultivez votre bien-être au quotidien
      </p>

      <!-- Indicateur de progression minimaliste -->
      <div class="flex items-center justify-center space-x-2 mb-4">
        <div 
          v-for="i in 3" 
          :key="i"
          class="w-2 h-2 rounded-full transition-all duration-500"
          :class="[
            progress > (i * 33) 
              ? 'bg-primary-500 w-8' 
              : 'bg-neutral-300'
          ]"
        ></div>
      </div>

      <!-- Message de chargement subtil -->
      <p class="text-sm text-neutral-500 font-light">
        {{ loadingMessage }}
      </p>
    </div>

    <!-- Forme organique décorative en bas -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1440 120" class="w-full h-24" preserveAspectRatio="none">
        <path 
          d="M0,64 C240,96 480,80 720,64 C960,48 1200,64 1440,80 L1440,120 L0,120 Z" 
          class="fill-primary-100/40"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000
})

const emit = defineEmits<{
  close: []
}>()

const show = ref(true)
const progress = ref(0)
const loadingMessage = ref('Initialisation...')

const messages = [
  'Initialisation...',
  'Chargement de votre espace...',
  'Préparation du bien-être...',
  'Presque prêt...',
  'Bienvenue !'
]

let progressInterval: NodeJS.Timeout
let messageInterval: NodeJS.Timeout
let messageIndex = 0

onMounted(() => {
  // Animation de progression
  progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2
    }
  }, props.duration / 50)

  // Changement de messages
  messageInterval = setInterval(() => {
    if (messageIndex < messages.length - 1) {
      messageIndex++
      loadingMessage.value = messages[messageIndex]
    }
  }, props.duration / messages.length)

  // Fermeture automatique
  setTimeout(() => {
    closeSplash()
  }, props.duration)
})

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval)
  if (messageInterval) clearInterval(messageInterval)
})

function closeSplash() {
  show.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}
</script>

<style scoped>
/* Animation de respiration (breathing) inspirée Headspace */
@keyframes breathe {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.5;
  }
}

.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
}

/* Animation de pulsation pour le logo */
@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.95);
    opacity: 1;
  }
}

.animate-pulse-ring {
  animation: pulse-ring 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}
</style>
