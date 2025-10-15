<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center gradient-bg-light overflow-hidden"
    @click="closeWelcome"
  >
    <!-- Particules de confettis -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="i in 15" 
        :key="i"
        class="absolute animate-confetti"
        :style="{
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 2 + 's',
          animationDuration: (2 + Math.random() * 2) + 's'
        }"
      >
        <span class="text-2xl">{{ getRandomEmoji() }}</span>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-md mx-auto px-6">
      <!-- Animation de célébration -->
      <div class="mb-8">
        <div class="w-32 h-32 mx-auto bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
          <span class="text-6xl">🎉</span>
        </div>
      </div>

      <!-- Message de bienvenue -->
      <h1 class="text-4xl font-bold text-neutral-800 mb-4">
        Bienvenue{{ userDisplayName ? `, ${userDisplayName}` : '' }} !
      </h1>

      <p class="text-lg text-neutral-600 mb-8 leading-relaxed">
        Nous sommes ravis de vous revoir. Prêt à partager votre humeur du jour ?
      </p>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="card text-center">
          <div class="text-2xl mb-2">📊</div>
          <div class="text-sm text-neutral-600">Moods partagés</div>
          <div class="text-lg font-bold text-primary-600">{{ stats.posts || 0 }}</div>
        </div>
        <div class="card text-center">
          <div class="text-2xl mb-2">💬</div>
          <div class="text-sm text-neutral-600">Messages</div>
          <div class="text-lg font-bold text-accent-600">{{ stats.messages || 0 }}</div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="space-y-3">
        <button 
          @click="goToFeed"
          class="w-full btn-primary"
        >
          🌟 Voir le Feed
        </button>
        
        <button 
          @click="closeWelcome"
          class="w-full btn-outline"
        >
          Continuer
        </button>
      </div>

      <!-- Message inspirant -->
      <p class="text-sm text-neutral-500 mt-6 italic">
        "Chaque journée est une nouvelle opportunité de bien-être"
      </p>
    </div>

    <!-- Effet de vague décoratif -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1200 120" class="w-full h-20 fill-primary-100">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentProfile } from '../lib/auth'

interface Props {
  show: boolean
  stats?: {
    posts?: number
    messages?: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  stats: () => ({ posts: 0, messages: 0 })
})

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()

const userDisplayName = computed(() => {
  return currentProfile.value?.display_name || currentProfile.value?.service
})

const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🌈', '🦋', '🌸', '🌺', '🦄']

function getRandomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)]
}

function closeWelcome() {
  emit('close')
}

function goToFeed() {
  router.push('/feed')
  closeWelcome()
}

// Fermeture automatique après 5 secondes
if (props.show) {
  setTimeout(() => {
    closeWelcome()
  }, 5000)
}
</script>

<style scoped>
@keyframes confetti {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.animate-confetti {
  animation: confetti linear infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -7px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
