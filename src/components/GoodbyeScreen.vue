<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);"
  >
    <!-- Particules d'au revoir -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 30" 
        :key="i"
        class="absolute w-2 h-2 bg-white/40 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (5 + Math.random() * 3) + 's'
        }"
      ></div>
    </div>

    <!-- Formes organiques apaisantes -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-float-slow"></div>
      <div class="absolute bottom-1/3 right-1/4 w-32 h-32 bg-white/15 rounded-full animate-float" style="animation-delay: 1.5s"></div>
      <div class="absolute top-1/2 right-1/3 w-28 h-28 bg-white/20 rounded-full animate-float-slow" style="animation-delay: 3s"></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
      <!-- Animation d'au revoir -->
      <div class="mb-6 sm:mb-8 animate-scale-in">
        <div class="inline-block relative">
          <div class="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-glow-lg animate-glow">
            <div class="text-5xl sm:text-6xl">✨</div>
          </div>
          <!-- Effet de particules autour du logo -->
          <div class="absolute inset-0">
            <div 
              v-for="i in 12" 
              :key="i"
              class="absolute w-2 h-2 bg-white/50 rounded-full animate-pulse-soft"
              :style="{
                left: (50 + 35 * Math.cos((i * 30) * Math.PI / 180)) + '%',
                top: (50 + 35 * Math.sin((i * 30) * Math.PI / 180)) + '%',
                animationDelay: (i * 0.15) + 's'
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Titre avec animation -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-slide-down" style="animation-delay: 0.3s">
        Thank You!
      </h1>
      
      <p class="text-white/90 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 animate-fade-in" style="animation-delay: 0.5s">
        Your wellness journey continues beyond this session
      </p>

      <!-- Messages d'encouragement -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 animate-slide-up"
          :style="{ animationDelay: (0.7 + index * 0.2) + 's' }"
        >
          <div class="text-3xl sm:text-4xl mb-3 sm:mb-4">{{ message.icon }}</div>
          <h3 class="text-white font-semibold text-base sm:text-lg mb-2">{{ message.title }}</h3>
          <p class="text-white/80 text-xs sm:text-sm">{{ message.description }}</p>
        </div>
      </div>

      <!-- Bouton de fermeture -->
      <div class="animate-fade-in" style="animation-delay: 1.3s">
        <button 
          @click="$emit('close')"
          class="bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-glow w-full sm:w-auto"
        >
          Continue Your Journey
        </button>
      </div>
    </div>

    <!-- Effet de particules en arrière-plan -->
    <div class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 25" 
        :key="'bg-' + i"
        class="absolute w-1 h-1 bg-white/30 rounded-full animate-float-slow"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 8 + 's',
          animationDuration: (8 + Math.random() * 4) + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const messages = ref([
  {
    icon: '🌟',
    title: 'Keep Growing',
    description: 'Your wellness journey is a continuous process of growth and self-discovery'
  },
  {
    icon: '💪',
    title: 'Stay Strong',
    description: 'Remember that every step forward, no matter how small, is progress'
  }
]);
</script>

<style scoped>
/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(90deg); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes glow {
  0% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
  100% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
}

@keyframes slide-down {
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}
</style>