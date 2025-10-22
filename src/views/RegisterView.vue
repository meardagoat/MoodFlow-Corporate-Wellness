<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-gray-900">
    <!-- Left Panel - Formulaire -->
    <div class="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <!-- Logo interactif -->
          <div class="mb-6">
            <div class="inline-block relative group">
              <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-glow animate-glow overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <video 
                  autoplay 
                  muted 
                  playsinline
                  loop
                  class="w-full h-full object-contain"
                >
                  <source src="../assets/MoodFlow_final_logo.mp4" type="video/mp4">
                  <img src="../assets/MoodFlow_final_logo.png" alt="MoodFlow" class="w-full h-full object-contain" />
                </video>
              </div>
              <!-- Effet de shimmer -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl animate-shimmer"></div>
            </div>
          </div>
          
          <!-- Titre avec gradient animé -->
          <h1 class="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-3 px-4 animate-gradient-flow cursor-default hover:scale-105 transition-transform duration-500">
            MoodFlow
          </h1>
          
          <!-- Welcome message -->
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join MoodFlow!</h2>
          <p class="text-gray-600">Create your wellness account</p>
          
          <!-- Message de Mehmet - Système de rôles -->
          <div class="mt-4 p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-200">
            <p class="text-sm text-gray-700">
              <span class="font-semibold text-orange-600">Inscription Employé</span> 
              Vous vous inscrivez en tant qu'employé. Votre manager ou l'administrateur système pourra modifier votre rôle si nécessaire via le panneau d'administration.
            </p>
          </div>
        </div>

        <!-- Toggle Sign In/Sign Up -->
        <div class="flex bg-gray-100 rounded-2xl p-1 mb-8">
          <router-link 
            to="/login"
            class="flex-1 py-3 px-4 text-gray-600 font-semibold rounded-xl transition-all hover:text-gray-900"
          >
            Sign In
          </router-link>
          <button 
            class="flex-1 py-3 px-4 bg-white text-gray-900 font-semibold rounded-xl shadow-sm transition-all"
          >
            Sign Up
          </button>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Enter your email</label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="your.email@company.com"
              />
              <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Enter your password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="6"
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          <!-- Department -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <div class="relative">
              <input
                v-model="service"
                type="text"
                required
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="e.g. Engineering, Sales, HR"
              />
              <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Role fixé à employee -->
          <div class="hidden">
            <input v-model="role" type="hidden" value="employee" />
          </div>

          <!-- Error message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {{ error }}
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span class="relative z-10">{{ loading ? 'Creating account...' : 'Create Account' }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>

        <!-- Divider -->
        <div class="my-8 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500 font-medium">OR</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Social Login -->
        <div class="space-y-3">
          <button
            @click="handleGoogleSignIn"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="font-medium text-gray-700">Sign up with Google</span>
          </button>

          <button
            @click="handleGithubSignIn"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span class="font-medium">Sign up with GitHub</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Right Panel - Background décoratif -->
    <div class="flex-1 relative overflow-hidden bg-gradient-to-br from-orange-400 via-purple-500 to-orange-400 hidden lg:block">
      <!-- Formes fluides animées -->
      <div class="absolute inset-0">
        <!-- Forme 1 -->
        <div class="absolute top-20 right-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <!-- Forme 2 -->
        <div class="absolute bottom-20 left-10 w-80 h-80 bg-purple-400/40 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s"></div>
        <!-- Forme 3 -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-400/50 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s"></div>
        <!-- Forme 4 -->
        <div class="absolute top-10 left-20 w-72 h-72 bg-blue-300/30 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.5s"></div>
        <!-- Forme 5 -->
        <div class="absolute bottom-10 right-20 w-56 h-56 bg-purple-300/40 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s"></div>
      </div>

      <!-- Vanta.js Birds effect -->
      <div ref="vantaContainer" class="absolute inset-0"></div>

      <!-- Footer -->
      <div class="absolute bottom-8 right-8 bg-black/20 backdrop-blur-sm rounded-2xl p-6 text-white">
        <p class="text-sm opacity-90">© 2025 MoodFlow. All rights reserved.</p>
        <p class="text-xs opacity-70 mt-1">Unauthorized use or reproduction of any content or materials from this</p>
        <p class="text-xs opacity-70">prohibited. For more information, visit our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signUp, signInWithGoogle, signInWithGithub } from '../lib/auth';
import { useVantaEffect } from '../composables/useVantaEffect';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const service = ref('');
const role = ref('employee');
const loading = ref(false);
const error = ref('');

// Role fixé à employee - seul le super admin peut assigner d'autres rôles

// Effet Vanta.js Birds sur le panel droit
const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer);

async function handleSubmit() {
  loading.value = true;
  error.value = '';

  const { error: signUpError } = await signUp(email.value, password.value, role.value, service.value);

  if (signUpError) {
    error.value = signUpError.message;
    loading.value = false;
  } else {
    // Déclencher le splash screen de bienvenue
    (window as any).showWelcomeSplash?.();
    // Rediriger vers le feed après le splash screen
    setTimeout(() => {
      router.push('/feed');
    }, 5000); // 5 secondes pour le splash screen
  }
}

async function handleGoogleSignIn() {
  loading.value = true;
  error.value = '';

  const { error: signInError } = await signInWithGoogle();

  if (signInError) {
    error.value = signInError.message;
    loading.value = false;
  } else {
    // Déclencher le splash screen de bienvenue
    (window as any).showWelcomeSplash?.();
    // Rediriger vers le feed après le splash screen
    setTimeout(() => {
      router.push('/feed');
    }, 5000); // 5 secondes pour le splash screen
  }
}

async function handleGithubSignIn() {
  loading.value = true;
  error.value = '';

  const { error: signInError } = await signInWithGithub();

  if (signInError) {
    error.value = signInError.message;
    loading.value = false;
  } else {
    // Déclencher le splash screen de bienvenue
    (window as any).showWelcomeSplash?.();
    // Rediriger vers le feed après le splash screen
    setTimeout(() => {
      router.push('/feed');
    }, 5000); // 5 secondes pour le splash screen
  }
}
</script>
