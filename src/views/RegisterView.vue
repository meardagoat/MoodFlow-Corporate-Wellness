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
        class="absolute w-2 h-2 bg-accent-300/40 rounded-full transition-all duration-300 ease-out"
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
      class="absolute w-72 h-72 bg-gradient-to-br from-accent-200/30 to-secondary-200/30 rounded-full blur-xl transition-all duration-500 ease-out"
      :style="{
        left: mousePosition.x - 144 + 'px',
        top: mousePosition.y - 144 + 'px'
      }"
    ></div>

    <div class="max-w-md w-full relative z-10">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Logo animé -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto bg-secondary-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <span class="text-2xl">🌟</span>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signUp } from '../lib/auth';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const service = ref('');
const role = ref('employee');
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

onMounted(() => {
  // Initialiser la position de la souris au centre
  mousePosition.value = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
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
</script>
