<template>
  <AuthShell mode="login" title="Welcome Back!" subtitle="We are happy to see you again" :sun-state="sunState">
    <!-- Formulaire -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Email -->
      <div>
        <label for="login-email" class="field-label">Enter your email</label>
        <div class="relative">
          <input
            id="login-email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="field pr-12"
            placeholder="your.email@company.com"
          />
          <Icon name="mail" class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/35" />
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="login-password" class="field-label">Enter your password</label>
        <div class="relative">
          <input
            id="login-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            autocomplete="current-password"
            class="field pr-12"
            placeholder="••••••••"
            @focus="passwordFocused = true"
            @blur="passwordFocused = false"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            @mousedown.prevent
            class="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-ink/45 transition-colors hover:bg-ink/5 hover:text-ink"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
          >
            <Icon :name="showPassword ? 'eye' : 'eye-off'" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Remember me & Forgot password -->
      <div class="flex items-center justify-between pt-1">
        <label class="flex cursor-pointer items-center gap-2.5">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="h-4 w-4 rounded accent-ink"
          />
          <span class="text-sm text-ink/75">Remember me</span>
        </label>
        <a href="#" class="link text-sm font-semibold text-grape">
          Forgot Password?
        </a>
      </div>

      <!-- Error message -->
      <div v-if="error" class="notice notice-error animate-shake" role="alert">
        {{ error }}
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        :disabled="loading"
        class="btn btn-ink btn-lg w-full"
      >
        <RollText :text="loading ? 'Signing in...' : 'Login'" />
        <span class="btn-dot"><Icon name="arrow-right" /></span>
      </button>
    </form>

    <!-- Divider -->
    <div class="my-8 flex items-center gap-4" role="presentation">
      <span class="h-px flex-1 bg-ink/15" />
      <span class="label text-ink/45">OR</span>
      <span class="h-px flex-1 bg-ink/15" />
    </div>

    <!-- Social Login -->
    <div class="grid gap-3">
      <button
        type="button"
        @click="handleGoogleSignIn"
        :disabled="loading"
        class="btn btn-outline w-full"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>Log in with Google</span>
      </button>

      <button
        type="button"
        @click="handleGithubSignIn"
        :disabled="loading"
        class="btn btn-ink w-full"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>Log in with GitHub</span>
      </button>
    </div>
  </AuthShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { signIn, signInWithGoogle, signInWithGithub } from '../lib/auth';
import AuthShell from '../components/auth/AuthShell.vue';
import Icon from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import type { FaceState } from '../lib/moods';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const loading = ref(false);
const error = ref('');

// Le soleil ferme les yeux pendant la saisie du mot de passe
const passwordFocused = ref(false);
const sunState = computed<FaceState>(() => {
  if (error.value) return 'sad';
  if (passwordFocused.value) return showPassword.value ? 'peek' : 'closed';
  if (loading.value) return 'very_happy';
  return 'happy';
});

async function handleSubmit() {
  loading.value = true;
  error.value = '';

  const { error: signInError } = await signIn(email.value, password.value);

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
