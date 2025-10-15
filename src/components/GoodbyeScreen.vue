<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center gradient-bg overflow-hidden"
    @click="closeGoodbye"
  >
    <!-- Particules douces -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="i in 12" 
        :key="i"
        class="absolute w-3 h-3 bg-white/20 rounded-full animate-float-slow"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          animationDuration: (4 + Math.random() * 2) + 's'
        }"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-md mx-auto px-6">
      <!-- Icône d'au revoir -->
      <div class="mb-8">
        <div class="w-28 h-28 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-2xl float">
          <span class="text-5xl">👋</span>
        </div>
      </div>

      <!-- Message d'au revoir -->
      <h1 class="text-4xl font-bold text-white mb-4">
        À bientôt !
      </h1>

      <p class="text-lg text-white/90 mb-8 leading-relaxed">
        Merci d'avoir partagé votre humeur avec nous. Prenez soin de vous !
      </p>

      <!-- Statistiques de session -->
      <div class="glass rounded-2xl p-6 mb-8">
        <h3 class="text-white font-semibold mb-4">Votre session</h3>
        <div class="grid grid-cols-2 gap-4 text-center">
          <div>
            <div class="text-2xl mb-1">📊</div>
            <div class="text-xs text-white/70 mb-1">Moods partagés</div>
            <div class="text-lg font-bold text-white">{{ sessionStats.posts || 0 }}</div>
          </div>
          <div>
            <div class="text-2xl mb-1">💬</div>
            <div class="text-xs text-white/70 mb-1">Messages</div>
            <div class="text-lg font-bold text-white">{{ sessionStats.messages || 0 }}</div>
          </div>
        </div>
      </div>

      <!-- Message inspirant -->
      <div class="glass rounded-2xl p-4 mb-8">
        <p class="text-white/90 text-sm italic">
          "Le bien-être commence par la conscience de soi"
        </p>
      </div>

      <!-- Bouton de fermeture -->
      <button 
        @click="closeGoodbye"
        class="px-8 py-3 bg-white/20 text-white rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 backdrop-blur-md font-medium"
      >
        Fermer
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
@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.animate-float-slow {
  animation: float-slow ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float {
  animation: float 6s ease-in-out infinite;
}
</style>
