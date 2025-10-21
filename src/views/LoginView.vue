<template>
  <div 
    class="min-h-screen flex items-center justify-center px-4 py-8 safe-top safe-bottom relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50"
    ref="vantaContainer"
  >
    <!-- AuthForm Component -->
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your wellness space"
      button-text="Sign In"
      loading-text="Signing in..."
      :loading="loading"
      :error="error"
      :is-valid="isFormValid"
      @submit="handleSubmit"
      @google-signin="handleGoogleSignIn"
      @github-signin="handleGithubSignIn"
    >
      <!-- Champs personnalisés -->
      <template #fields>
        <AuthInput
          id="email"
          v-model="email"
          type="email"
          label="Email Address"
          placeholder="your.email@company.com"
          autocomplete="email"
          required
          :icon="EmailIcon"
        />

        <AuthInput
          id="password"
          v-model="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autocomplete="current-password"
          required
          :icon="LockIcon"
        />

        <!-- Remember me & Forgot password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              v-model="rememberMe"
              type="checkbox"
              class="w-4 h-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition"
            />
            <span class="text-sm text-gray-700 group-hover:text-purple-600 transition">Remember me</span>
          </label>
          <a href="#" class="text-sm font-semibold text-purple-600 hover:text-purple-700 transition">
            Forgot password?
          </a>
        </div>
      </template>

      <!-- Footer -->
      <template #footer>
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link 
            to="/register" 
            class="font-bold text-transparent bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text hover:from-violet-700 hover:to-purple-700 transition"
          >
            Create one now
          </router-link>
        </p>
      </template>
    </AuthForm>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signIn, signInWithGoogle, signInWithGithub } from '../lib/auth';
import { useVantaEffect } from '../composables/useVantaEffect';
import AuthForm from '../components/AuthForm.vue';
import AuthInput from '../components/AuthInput.vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');

// Icons (inline SVG components)
const EmailIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  `
};

const LockIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  `
};

// Effet Vanta.js Birds (optimisé pour les performances)
const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer);

const isFormValid = computed(() => {
  return email.value.length > 0 && password.value.length > 0;
});

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
