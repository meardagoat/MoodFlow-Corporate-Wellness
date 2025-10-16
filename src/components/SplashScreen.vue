<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);"
  >
    <!-- Particules flottantes animées -->
    <div class="absolute inset-0">
      <div 
        v-for="i in 20" 
        :key="i"
        class="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          animationDuration: (3 + Math.random() * 4) + 's'
        }"
      ></div>
    </div>

    <!-- Ondes concentriques -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-96 h-96 border border-white/10 rounded-full animate-pulse-soft"></div>
      <div class="absolute w-80 h-80 border border-white/20 rounded-full animate-pulse-soft" style="animation-delay: 0.5s"></div>
      <div class="absolute w-64 h-64 border border-white/30 rounded-full animate-pulse-soft" style="animation-delay: 1s"></div>
    </div>

    <!-- Contenu principal -->
    <div class="text-center relative z-10 max-w-lg mx-auto px-6">
      <!-- Logo avec effet de glow -->
      <div class="mb-8">
        <div class="inline-block relative">
          <div class="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-glow animate-glow">
            <img src="/src/assets/mood_flow_logo.png" alt="MoodFlow" class="w-16 h-16 object-contain" />
          </div>
          <!-- Effet de shimmer -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl animate-shimmer"></div>
        </div>
      </div>

      <!-- Titre avec animation -->
      <h1 class="text-4xl font-bold text-white mb-4 animate-fade-in" style="animation-delay: 0.5s">
        MoodFlow
      </h1>
      
      <p class="text-white/80 text-lg mb-8 animate-fade-in" style="animation-delay: 0.7s">
        Corporate Wellness Platform
      </p>

      <!-- Barre de progression moderne -->
      <div class="w-full max-w-xs mx-auto">
        <div class="h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-white/60 to-white/90 rounded-full transition-all duration-300 ease-out"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="text-white/60 text-sm mt-2 animate-pulse-soft">
          {{ loadingText }}
        </p>
      </div>
    </div>

    <!-- Effet de particules en arrière-plan -->
    <div class="absolute inset-0 pointer-events-none">
      <div 
        v-for="i in 15" 
        :key="'bg-' + i"
        class="absolute w-1 h-1 bg-white/10 rounded-full animate-float-slow"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (5 + Math.random() * 3) + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  show: boolean;
}>();

const progress = ref(0);
const loadingText = ref('Initializing...');

const loadingMessages = [
  'Initializing...',
  'Loading components...',
  'Preparing interface...',
  'Almost ready...',
  'Welcome to MoodFlow!'
];

let progressInterval: NodeJS.Timeout;

onMounted(() => {
  if (props.show) {
    startLoading();
  }
});

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});

function startLoading() {
  let currentStep = 0;
  
  progressInterval = setInterval(() => {
    if (currentStep < loadingMessages.length) {
      progress.value = ((currentStep + 1) / loadingMessages.length) * 100;
      loadingText.value = loadingMessages[currentStep];
      currentStep++;
    } else {
      clearInterval(progressInterval);
    }
  }, 800);
}
</script>

<style scoped>
/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes glow {
  0% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
  100% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
}

@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>