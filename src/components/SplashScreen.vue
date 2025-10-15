<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center gradient-bg overflow-hidden"
    @click="closeSplash"
  >
    <!-- Particules flottantes -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="i in 20" 
        :key="i"
        class="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse-soft"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          animationDuration: (2 + Math.random() * 3) + 's'
        }"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10">
      <!-- Logo/Icone animé -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-2xl float">
          <span class="text-4xl">🧘‍♀️</span>
        </div>
      </div>

      <!-- Titre principal -->
      <h1 class="text-5xl font-bold text-white mb-4 tracking-tight">
        MoodFlow
      </h1>

      <!-- Sous-titre -->
      <p class="text-xl text-white/90 mb-8 font-light">
        Votre espace de bien-être au travail
      </p>

      <!-- Barre de progression -->
      <div class="w-64 mx-auto mb-8">
        <div class="h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            class="h-full bg-white/60 rounded-full transition-all duration-500 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>

      <!-- Message de chargement -->
      <p class="text-white/70 text-sm">
        {{ loadingMessage }}
      </p>

      <!-- Bouton pour fermer manuellement -->
      <button 
        v-if="progress >= 100"
        @click="closeSplash"
        class="mt-6 px-8 py-3 bg-white/20 text-white rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 backdrop-blur-md font-medium"
      >
        Commencer
      </button>
    </div>

    <!-- Effet de vague en bas -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1200 120" class="w-full h-20 fill-white/10">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
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
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float {
  animation: float 6s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.animate-pulse-soft {
  animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
