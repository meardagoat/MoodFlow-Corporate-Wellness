<template>
  <div class="w-full max-w-md relative z-10">
    <!-- Card principale avec glassmorphism -->
    <div class="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
      <!-- Header avec logo animé -->
      <div class="text-center pt-12 pb-8 px-8">
        <!-- Logo animé -->
        <div class="mb-6 inline-block">
          <div class="relative group">
            <div class="w-24 h-24 mx-auto bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300 overflow-hidden">
              <video 
                autoplay 
                muted 
                playsinline
                loop
                class="w-full h-full object-contain"
              >
                <source :src="logoVideo" type="video/mp4">
                <img :src="logoImage" alt="MoodFlow" class="w-full h-full object-contain" />
              </video>
            </div>
            <!-- Glow effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10"></div>
          </div>
        </div>

        <!-- Titre animé -->
        <h1 class="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
          {{ title }}
        </h1>
        <p class="text-gray-600 text-lg">{{ subtitle }}</p>
      </div>

      <!-- Formulaire -->
      <div class="px-8 pb-8">
        <form @submit.prevent="$emit('submit')" class="space-y-6">
          <!-- Slots pour les champs personnalisés -->
          <slot name="fields"></slot>

          <!-- Message d'erreur -->
          <div 
            v-if="error" 
            class="bg-red-50/80 backdrop-blur border-2 border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium animate-shake"
          >
            {{ error }}
          </div>

          <!-- Bouton principal avec animation -->
          <button
            type="submit"
            :disabled="loading || !isValid"
            class="group relative w-full py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500 bg-[length:200%_auto] text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
          >
            <!-- Background animé -->
            <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient bg-[length:200%_auto]"></div>
            
            <!-- Texte -->
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span v-if="!loading">{{ buttonText }}</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loadingText }}
              </span>
            </span>
          </button>
        </form>

        <!-- Divider OAuth -->
        <div class="my-8 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500 font-medium">or continue with</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- OAuth Buttons -->
        <div class="space-y-3">
          <button
            @click="$emit('google-signin')"
            :disabled="loading"
            type="button"
            class="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="font-semibold text-gray-700 group-hover:text-purple-700 transition">Continue with Google</span>
          </button>

          <button
            @click="$emit('github-signin')"
            :disabled="loading"
            type="button"
            class="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="font-semibold text-gray-700 group-hover:text-purple-700 transition">Continue with GitHub</span>
          </button>
        </div>

        <!-- Footer link -->
        <div class="mt-8 text-center">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>

    <!-- Floating elements decoratifs -->
    <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
    <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-violet-400 to-blue-400 rounded-full blur-2xl opacity-20 animate-pulse" style="animation-delay: 1s"></div>
  </div>
</template>

<script setup lang="ts">
import logoVideo from '../assets/MoodFlow_final_logo.mp4';
import logoImage from '../assets/MoodFlow_final_logo.png';

defineProps<{
  title: string;
  subtitle: string;
  buttonText: string;
  loadingText: string;
  loading: boolean;
  error: string;
  isValid: boolean;
}>();

defineEmits<{
  submit: [];
  'google-signin': [];
  'github-signin': [];
}>();
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

.animate-shake {
  animation: shake 0.5s ease;
}
</style>

