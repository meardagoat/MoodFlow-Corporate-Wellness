<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-lavender-100 via-sky-50 to-cream-100 overflow-hidden"
    style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
  >
    <!-- Cercles organiques apaisants -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-lavender-300/25 rounded-full blur-3xl animate-breathe-slow"></div>
      <div class="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-breathe-slow" style="animation-delay: 1.5s"></div>
      <div class="absolute top-1/2 right-1/3 w-64 h-64 bg-sage-300/15 rounded-full blur-3xl animate-breathe-slow" style="animation-delay: 3s"></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-lg mx-auto px-6">
      <!-- Animation d'au revoir -->
      <div class="mb-10">
        <div class="inline-block relative">
          <div class="w-32 h-32 mx-auto bg-gradient-to-br from-sky-400 to-lavender-500 rounded-full flex items-center justify-center shadow-soft-lg animate-gentle-wave">
            <span class="text-6xl">✨</span>
          </div>
          <!-- Étoiles décoratives -->
          <div class="absolute top-0 right-0 w-6 h-6 bg-cream-400 rounded-full opacity-80 animate-twinkle"></div>
          <div class="absolute bottom-2 left-2 w-5 h-5 bg-lavender-300 rounded-full opacity-70 animate-twinkle" style="animation-delay: 0.5s"></div>
          <div class="absolute top-2 left-0 w-4 h-4 bg-sky-300 rounded-full opacity-60 animate-twinkle" style="animation-delay: 1s"></div>
        </div>
      </div>

      <!-- Message d'au revoir -->
      <h1 class="text-5xl font-bold text-neutral-800 mb-4 font-display">
        À très bientôt !
      </h1>

      <p class="text-lg text-neutral-600 mb-10 leading-relaxed font-light max-w-md mx-auto">
        Merci d'avoir partagé ce moment avec nous. Prenez soin de vous ! 🌸
      </p>

      <!-- Statistiques de session élégantes -->
      <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-soft">
        <h3 class="text-neutral-700 font-medium mb-6 text-sm uppercase tracking-wide">Votre session</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <div class="w-14 h-14 mx-auto mb-3 bg-sage-100 rounded-2xl flex items-center justify-center">
              <span class="text-2xl">📊</span>
            </div>
            <div class="text-xs text-neutral-500 mb-1 font-medium">Posts partagés</div>
            <div class="text-3xl font-bold text-sage-600">{{ sessionStats.posts || 0 }}</div>
          </div>
          <div>
            <div class="w-14 h-14 mx-auto mb-3 bg-lavender-100 rounded-2xl flex items-center justify-center">
              <span class="text-2xl">💬</span>
            </div>
            <div class="text-xs text-neutral-500 mb-1 font-medium">Conversations</div>
            <div class="text-3xl font-bold text-lavender-600">{{ sessionStats.messages || 0 }}</div>
          </div>
        </div>
      </div>

      <!-- Citation inspirante -->
      <div class="bg-gradient-to-r from-primary-100/60 to-lavender-100/60 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-white/60">
        <p class="text-sm text-neutral-700 font-light italic leading-relaxed">
          "Chaque fin est un nouveau commencement. Revenez quand vous le souhaitez"
        </p>
      </div>

      <!-- Bouton de fermeture -->
      <button 
        @click="closeGoodbye"
        class="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-medium shadow-soft hover:shadow-soft-lg hover:scale-105 transition-all duration-300"
      >
        Fermer
      </button>
    </div>

    <!-- Formes organiques décoratives -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1440 120" class="w-full h-32" preserveAspectRatio="none">
        <path 
          d="M0,64 C240,32 480,96 720,64 C960,32 1200,96 1440,64 L1440,120 L0,120 Z" 
          class="fill-lavender-200/30"
        />
        <path 
          d="M0,80 C240,48 480,112 720,80 C960,48 1200,112 1440,80 L1440,120 L0,120 Z" 
          class="fill-sky-200/20"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  show: boolean
  sessionStats?: {
    posts?: number
    messages?: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  sessionStats: () => ({ posts: 0, messages: 0 })
})

const emit = defineEmits<{
  close: []
}>()

function closeGoodbye() {
  emit('close')
}

// Fermeture automatique après 4 secondes
if (props.show) {
  setTimeout(() => {
    closeGoodbye()
  }, 4000)
}
</script>

<style scoped>
/* Animation de respiration lente et apaisante */
@keyframes breathe-slow {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.25;
  }
  50% { 
    transform: scale(1.15);
    opacity: 0.4;
  }
}

.animate-breathe-slow {
  animation: breathe-slow 6s ease-in-out infinite;
}

/* Animation de vague douce */
@keyframes gentle-wave {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  33% {
    transform: scale(1.05) rotate(2deg);
  }
  66% {
    transform: scale(0.95) rotate(-2deg);
  }
}

.animate-gentle-wave {
  animation: gentle-wave 4s ease-in-out infinite;
}

/* Animation de scintillement */
@keyframes twinkle {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
}

.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}
</style>
