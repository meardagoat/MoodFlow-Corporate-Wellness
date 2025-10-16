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
import { signIn } from '../lib/auth';
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
</script>
