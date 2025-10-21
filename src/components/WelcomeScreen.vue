<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);"
  >
    <!-- Effet de particules interactives -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 25" 
        :key="i"
        class="absolute w-3 h-3 bg-white/30 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 4 + 's',
          animationDuration: (4 + Math.random() * 3) + 's'
        }"
      ></div>
    </div>

    <!-- Formes géométriques flottantes -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
      <div class="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/15 transform rotate-45 animate-float" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-1/3 w-20 h-20 bg-white/20 rounded-full animate-float-slow" style="animation-delay: 2s"></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
      <!-- Animation d'entrée du logo -->
      <div class="mb-6 sm:mb-8 animate-scale-in">
        <div class="inline-block relative">
          <div class="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-glow-lg animate-glow">
            <img src="/src/assets/MoodFlow_final_logo.png" alt="MoodFlow" class="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          </div>
          <!-- Effet de particules autour du logo -->
          <div class="absolute inset-0">
            <div 
              v-for="i in 8" 
              :key="i"
              class="absolute w-2 h-2 bg-white/40 rounded-full animate-pulse-soft"
              :style="{
                left: (50 + 30 * Math.cos((i * 45) * Math.PI / 180)) + '%',
                top: (50 + 30 * Math.sin((i * 45) * Math.PI / 180)) + '%',
                animationDelay: (i * 0.2) + 's'
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Titre avec animation -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-slide-down" style="animation-delay: 0.3s">
        Welcome to MoodFlow
      </h1>
      
      <p class="text-white/90 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 animate-fade-in" style="animation-delay: 0.5s">
        Your corporate wellness journey starts here
      </p>

      <!-- Cartes de fonctionnalités -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 animate-slide-up"
          :style="{ animationDelay: (0.7 + index * 0.2) + 's' }"
        >
          <div class="text-3xl sm:text-4xl mb-3 sm:mb-4">{{ feature.icon }}</div>
          <h3 class="text-white font-semibold text-base sm:text-lg mb-2">{{ feature.title }}</h3>
          <p class="text-white/80 text-xs sm:text-sm">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Bouton d'action -->
      <div class="animate-fade-in" style="animation-delay: 1.3s">
        <button 
          @click="$emit('close')"
          class="bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-glow w-full sm:w-auto"
        >
          Get Started
        </button>
      </div>
    </div>

    <!-- Effet de particules en arrière-plan -->
    <div class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 20" 
        :key="'bg-' + i"
        class="absolute w-1 h-1 bg-white/20 rounded-full animate-float-slow"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 6 + 's',
          animationDuration: (6 + Math.random() * 4) + 's'
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

const features = ref([
  {
    icon: '😊',
    title: 'Mood Tracking',
    description: 'Track your daily mood and emotional well-being'
  },
  {
    icon: '💬',
    title: 'Anonymous Chat',
    description: 'Connect with colleagues in a safe space'
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Get insights into your wellness journey'
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