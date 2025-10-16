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
          <p class="text-gray-600">Rejoignez notre communauté de bien-être</p>
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
                minlength="6"
                class="input-field pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
          </div>

          <div>
            <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
              Département
            </label>
            <input
              id="service"
              v-model="service"
              type="text"
              required
              class="input-field"
              placeholder="ex: Ingénierie, Ventes, RH"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Votre rôle
            </label>
            <div class="grid grid-cols-2 gap-3">
              <label class="cursor-pointer">
                <input
                  v-model="role"
                  type="radio"
                  value="employee"
                  class="sr-only peer"
                />
                <div class="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-primary-600 peer-checked:bg-primary-50 transition">
                  <p class="font-medium">Employé</p>
                </div>
              </label>
              <label class="cursor-pointer">
                <input
                  v-model="role"
                  type="radio"
                  value="manager"
                  class="sr-only peer"
                />
                <div class="p-4 border-2 border-gray-300 rounded-lg text-center peer-checked:border-primary-600 peer-checked:bg-primary-50 transition">
                  <p class="font-medium">Manager</p>
                </div>
              </label>
            </div>
          </div>

          <!-- Indicateur de force du mot de passe -->
          <div v-if="password" class="space-y-2">
            <p class="text-xs text-gray-600">Force du mot de passe:</p>
            <div class="flex space-x-1">
              <div 
                v-for="i in 4" 
                :key="i"
                class="h-1 flex-1 rounded-full transition-all duration-300"
                :class="getPasswordStrengthClass(i)"
              ></div>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Déjà un compte ?
            <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
              Se connecter
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
import { signUp } from '../lib/auth';
import { useVantaEffect } from '../composables/useVantaEffect';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const service = ref('');
const role = ref('employee');
const loading = ref(false);
const error = ref('');

// Effet Vanta.js Clouds
const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer);

function getPasswordStrengthClass(index: number): string {
  const strength = getPasswordStrength();
  if (index <= strength) {
    switch (strength) {
      case 1: return 'bg-error-500';
      case 2: return 'bg-warning-500';
      case 3: return 'bg-secondary-500';
      case 4: return 'bg-accent-500';
      default: return 'bg-neutral-200';
    }
  }
  return 'bg-neutral-200';
}

function getPasswordStrength(): number {
  const pwd = password.value;
  let strength = 0;
  
  if (pwd.length >= 6) strength++;
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
  if (pwd.match(/\d/)) strength++;
  if (pwd.match(/[^a-zA-Z\d]/)) strength++;
  
  return strength;
}

async function handleSubmit() {
  loading.value = true;
  error.value = '';

  const { error: signUpError } = await signUp(email.value, password.value, role.value, service.value);

  if (signUpError) {
    error.value = signUpError.message;
    loading.value = false;
  } else {
    router.push('/feed');
  }
}
</script>
