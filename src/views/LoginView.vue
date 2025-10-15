<template>
  <div 
    class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 relative overflow-hidden"
    @mousemove="handleMouseMove"
    @touchmove="handleTouchMove"
    ref="container"
  >
    <!-- Particules interactives -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="absolute w-2 h-2 bg-primary-300/40 rounded-full transition-all duration-300 ease-out"
        :style="{
          left: particle.x + 'px',
          top: particle.y + 'px',
          transform: `scale(${particle.scale})`,
          opacity: particle.opacity
        }"
      ></div>
    </div>

    <!-- Forme géométrique flottante -->
    <div 
      class="absolute w-64 h-64 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-xl transition-all duration-500 ease-out"
      :style="{
        left: mousePosition.x - 128 + 'px',
        top: mousePosition.y - 128 + 'px'
      }"
    ></div>

    <div class="max-w-md w-full relative z-10">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Logo animé -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto bg-primary-600 rounded-full flex items-center justify-center shadow-lg mb-4">
            <span class="text-2xl">🧘‍♀️</span>
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { signIn } from '../lib/auth';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

// Interaction avec la souris/touch
const mousePosition = ref({ x: 0, y: 0 });
const particles = ref<Array<{ id: number; x: number; y: number; scale: number; opacity: number }>>([]);
const container = ref<HTMLElement | null>(null);
let particleId = 0;

function handleMouseMove(event: MouseEvent) {
  mousePosition.value = { x: event.clientX, y: event.clientY };
  createParticle(event.clientX, event.clientY);
}

function handleTouchMove(event: TouchEvent) {
  if (event.touches.length > 0) {
    const touch = event.touches[0];
    mousePosition.value = { x: touch.clientX, y: touch.clientY };
    createParticle(touch.clientX, touch.clientY);
  }
}

function createParticle(x: number, y: number) {
  // Limiter le nombre de particules
  if (particles.value.length > 20) {
    particles.value.shift();
  }

  particles.value.push({
    id: particleId++,
    x: x + (Math.random() - 0.5) * 50,
    y: y + (Math.random() - 0.5) * 50,
    scale: Math.random() * 0.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.3
  });

  // Supprimer les particules après 1 seconde
  setTimeout(() => {
    particles.value = particles.value.filter(p => p.id !== particleId - 1);
  }, 1000);
}

onMounted(() => {
  // Initialiser la position de la souris au centre
  mousePosition.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
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
</script>
