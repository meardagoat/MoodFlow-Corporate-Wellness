<template>
  <div 
    class="min-h-screen flex items-center justify-center px-4 py-8 safe-top safe-bottom relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50"
    ref="vantaContainer"
  >
    <!-- AuthForm Component -->
    <AuthForm
      title="Join MoodFlow"
      subtitle="Create your wellness account"
      button-text="Create Account"
      loading-text="Creating account..."
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
          autocomplete="new-password"
          required
          minlength="6"
          helper="Minimum 6 characters"
          :icon="LockIcon"
        />

        <!-- Password strength indicator -->
        <div v-if="password" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-gray-600">Password strength:</span>
            <span 
              class="text-xs font-bold"
              :class="passwordStrengthColor"
            >
              {{ passwordStrengthText }}
            </span>
          </div>
          <div class="flex gap-1.5">
            <div 
              v-for="i in 4" 
              :key="i"
              class="h-1.5 flex-1 rounded-full transition-all duration-300"
              :class="i <= passwordStrength ? passwordStrengthBgColor : 'bg-gray-200'"
            ></div>
          </div>
        </div>

        <AuthInput
          id="service"
          v-model="service"
          type="text"
          label="Department"
          placeholder="e.g. Engineering, Sales, HR"
          required
          :icon="BuildingIcon"
        />

        <!-- Role selector moderne -->
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-700 ml-1">
            Your Role <span class="text-red-500">*</span>
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label 
              v-for="roleOption in roles" 
              :key="roleOption.value"
              class="cursor-pointer"
            >
              <input
                v-model="role"
                type="radio"
                :value="roleOption.value"
                class="sr-only peer"
              />
              <div class="p-4 border-2 border-gray-200 rounded-2xl text-center peer-checked:border-purple-500 peer-checked:bg-gradient-to-br peer-checked:from-purple-50 peer-checked:to-violet-50 transition-all hover:border-purple-300 group">
                <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ roleOption.icon }}</div>
                <p class="font-semibold text-gray-900">{{ roleOption.label }}</p>
              </div>
            </label>
          </div>
        </div>
      </template>

      <!-- Footer -->
      <template #footer>
        <p class="text-sm text-gray-600">
          Already have an account?
          <router-link 
            to="/login" 
            class="font-bold text-transparent bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text hover:from-violet-700 hover:to-purple-700 transition"
          >
            Sign in
          </router-link>
        </p>
      </template>
    </AuthForm>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signUp, signInWithGoogle, signInWithGithub } from '../lib/auth';
import { useVantaEffect } from '../composables/useVantaEffect';
import AuthForm from '../components/AuthForm.vue';
import AuthInput from '../components/AuthInput.vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const service = ref('');
const role = ref('employee');
const loading = ref(false);
const error = ref('');

const roles = [
  { value: 'employee', label: 'Employee', icon: '👤' },
  { value: 'manager', label: 'Manager', icon: '👔' }
];

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

const BuildingIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  `
};

// Effet Vanta.js Birds (optimisé pour les performances)
const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer);

const passwordStrength = computed(() => {
  const pwd = password.value;
  let strength = 0;
  
  if (pwd.length >= 6) strength++;
  if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
  if (pwd.match(/\d/)) strength++;
  if (pwd.match(/[^a-zA-Z\d]/)) strength++;
  
  return strength;
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength === 0) return 'Very Weak';
  if (strength === 1) return 'Weak';
  if (strength === 2) return 'Fair';
  if (strength === 3) return 'Good';
  return 'Strong';
});

const passwordStrengthColor = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 1) return 'text-red-600';
  if (strength === 2) return 'text-amber-600';
  if (strength === 3) return 'text-blue-600';
  return 'text-green-600';
});

const passwordStrengthBgColor = computed(() => {
  const strength = passwordStrength.value;
  if (strength <= 1) return 'bg-red-500';
  if (strength === 2) return 'bg-amber-500';
  if (strength === 3) return 'bg-blue-500';
  return 'bg-green-500';
});

const isFormValid = computed(() => {
  return email.value.length > 0 && 
         password.value.length >= 6 && 
         service.value.length > 0;
});

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
