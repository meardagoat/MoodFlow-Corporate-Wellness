<template>
  <div 
    class="min-h-screen flex items-center justify-center px-4 py-8 safe-top safe-bottom relative overflow-hidden"
    ref="vantaContainer"
  >
    <div class="max-w-md w-full relative z-10">
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <img 
              src="../assets/mood_flow_logo.png" 
              alt="MoodFlow Logo" 
              class="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">MoodFlow</h1>
          <p class="text-gray-600">Connectez-vous à votre espace de bien-être</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input-field"
              placeholder="votre.email@entreprise.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input-field pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- OAuth Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">ou continuer avec</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- OAuth Buttons -->
        <div class="space-y-3">
          <button
            @click="handleGoogleSignIn"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="font-medium text-gray-700">Google</span>
          </button>

          <button
            @click="handleGithubSignIn"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="font-medium text-gray-700">GitHub</span>
          </button>
        </div>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Pas encore de compte ?
            <router-link to="/register" class="text-primary-600 hover:text-primary-700 font-medium">
              Créer un compte
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signIn, signInWithGoogle, signInWithGithub } from '../lib/auth';
import { useVantaEffect } from '../composables/useVantaEffect';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

// Effet Vanta.js Clouds
const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer);

async function handleSubmit() {
  loading.value = true;
  error.value = '';

  const { error: signInError } = await signIn(email.value, password.value);

  if (signInError) {
    error.value = signInError.message;
    loading.value = false;
  } else {
    router.push('/feed');
  }
}

async function handleGoogleSignIn() {
  loading.value = true;
  error.value = '';

  const { error: signInError } = await signInWithGoogle();

  if (signInError) {
    error.value = signInError.message;
    loading.value = false;
  }
  // OAuth will redirect automatically
}

async function handleGithubSignIn() {
  loading.value = true;
  error.value = '';

  const { error: signInError } = await signInWithGithub();

  if (signInError) {
    error.value = signInError.message;
    loading.value = false;
  }
  // OAuth will redirect automatically
}
</script>
