<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream-50 via-primary-50 to-lavender-50 overflow-hidden"
  >
    <!-- Cercles organiques d'arrière-plan -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 -left-20 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-lavender-300/15 rounded-full blur-3xl animate-float-slow" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-200/10 rounded-full blur-3xl animate-float-slow" style="animation-delay: 2s"></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-lg mx-auto px-6">
      <!-- Animation douce du logo -->
      <div class="mb-10">
        <div class="inline-block relative">
          <div class="w-28 h-28 mx-auto bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-soft-lg animate-gentle-scale">
            <span class="text-5xl">👋</span>
          </div>
          <!-- Cercles décoratifs -->
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-sage-400 rounded-full opacity-80"></div>
          <div class="absolute -bottom-2 -left-2 w-6 h-6 bg-lavender-400 rounded-full opacity-60"></div>
        </div>
      </div>

      <!-- Message de bienvenue -->
      <h1 class="text-5xl font-bold text-neutral-800 mb-3 font-display">
        Content de vous revoir{{ userDisplayName ? `, ${userDisplayName}` : '' }} !
      </h1>

      <p class="text-base text-neutral-600 mb-10 leading-relaxed font-light">
        Prêt à cultiver votre bien-être aujourd'hui ?
      </p>

      <!-- Statistiques élégantes -->
      <div class="grid grid-cols-2 gap-4 mb-10">
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          <div class="w-12 h-12 mx-auto mb-3 bg-sage-100 rounded-2xl flex items-center justify-center">
            <span class="text-2xl">📊</span>
          </div>
          <div class="text-xs text-neutral-500 font-medium mb-1">Posts partagés</div>
          <div class="text-3xl font-bold text-sage-600">{{ stats.posts || 0 }}</div>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-soft">
          <div class="w-12 h-12 mx-auto mb-3 bg-lavender-100 rounded-2xl flex items-center justify-center">
            <span class="text-2xl">💬</span>
          </div>
          <div class="text-xs text-neutral-500 font-medium mb-1">Conversations</div>
          <div class="text-3xl font-bold text-lavender-600">{{ stats.messages || 0 }}</div>
        </div>
      </div>

      <!-- Boutons d'action modernes -->
      <div class="space-y-3 mb-8">
        <button 
          @click="goToFeed"
          class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-2xl font-medium shadow-soft hover:shadow-soft-lg hover:scale-105 transition-all duration-300"
        >
          Voir le Feed →
        </button>
        
        <button 
          @click="closeWelcome"
          class="w-full bg-white/60 backdrop-blur-sm text-neutral-700 px-6 py-4 rounded-2xl font-medium hover:bg-white/80 transition-all duration-300"
        >
          Continuer
        </button>
      </div>

      <!-- Citation inspirante subtile -->
      <div class="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
        <p class="text-sm text-neutral-600 font-light italic">
          "Prenez soin de vous, un jour à la fois"
        </p>
      </div>
    </div>

    <!-- Forme organique décorative -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
      <svg viewBox="0 0 1440 120" class="w-full h-28" preserveAspectRatio="none">
        <path 
          d="M0,64 C360,32 720,96 1080,64 C1200,48 1320,80 1440,64 L1440,120 L0,120 Z" 
          class="fill-primary-200/30"
        />
        <path 
          d="M0,80 C360,48 720,112 1080,80 C1200,64 1320,96 1440,80 L1440,120 L0,120 Z" 
          class="fill-lavender-200/20"
        />
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
/* Animation douce de flottement */
@keyframes float-slow {
  0%, 100% { 
    transform: translateY(0px) translateX(0px);
  }
  33% { 
    transform: translateY(-20px) translateX(10px);
  }
  66% { 
    transform: translateY(10px) translateX(-10px);
  }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

/* Animation de scale douce */
@keyframes gentle-scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-gentle-scale {
  animation: gentle-scale 3s ease-in-out infinite;
}
</style>
