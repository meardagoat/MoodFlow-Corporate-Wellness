<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50">
    <!--  Navigation moderne avec glassmorphism -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-8">
            <router-link to="/feed" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform overflow-hidden">
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
              <span class="text-xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent hidden sm:inline animate-gradient-flow">
                MoodFlow
              </span>
            </router-link>

            <div class="hidden md:flex items-center gap-1">
              <router-link
                to="/feed"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition',
                  $route.path === '/feed'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-orange-600'
                ]"
              >
                Feed
              </router-link>

              <router-link
                v-if="isManager"
                to="/dashboard"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition',
                  $route.path === '/dashboard'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-orange-600'
                ]"
              >
                Dashboard
              </router-link>

              <router-link
                v-if="isSystemAdmin"
                to="/admin"
                :class="[
                  'px-4 py-2 rounded-2xl font-semibold transition-all',
                  $route.path === '/admin'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-red-600'
                ]"
              >
                <span class="flex items-center gap-2">
                  <span>👑</span>
                  <span>Admin</span>
                </span>
              </router-link>

              <router-link
                to="/chat"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition',
                  $route.path === '/chat'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-orange-600'
                ]"
              >
                Chat
              </router-link>
            </div>
          </div>

          <!-- Actions de droite -->
          <div class="flex items-center gap-3">
            <!-- Service badge -->
            <div class="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-100/50 rounded-2xl">
              <span class="text-sm font-medium text-orange-700">{{ currentProfile?.service }}</span>
            </div>

            <router-link
              to="/profile"
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition',
                $route.path === '/profile'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white scale-110'
                  : 'bg-white text-orange-600 hover:scale-105'
              ]"
            >
              {{ getInitial() }}
            </router-link>

            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="!mobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 py-2">
        <router-link
          to="/feed"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-4 py-2 text-base font-medium',
            $route.path === '/feed'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          Feed
        </router-link>

        <router-link
          v-if="isManager"
          to="/dashboard"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-4 py-2 text-base font-medium',
            $route.path === '/dashboard'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          Dashboard
        </router-link>

        <router-link
          v-if="isSystemAdmin"
          to="/admin"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all',
            $route.path === '/admin'
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          <span>👑</span>
          <span>Admin</span>
        </router-link>

        <router-link
          to="/chat"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-4 py-2 text-base font-medium',
            $route.path === '/chat'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          <span>💬</span>
          <span>Chat</span>
        </router-link>

        <router-link
          to="/profile"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all',
            $route.path === '/profile'
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          <span>👤</span>
          <span>Profile</span>
        </router-link>
      </div>
    </nav>

    <!-- Main content avec safe area en bas -->
    <main class="flex-1 safe-bottom">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { currentProfile, isManager, isSystemAdmin, signOut } from '../lib/auth';
import logoVideo from '../assets/MoodFlow_final_logo.mp4';
import logoImage from '../assets/MoodFlow_final_logo.png';

const router = useRouter();
const mobileMenuOpen = ref(false);
const showProfileMenu = ref(false);

const navigation = [
  { name: 'Feed', href: '/feed' },
  { name: 'Chat', href: '/chat' },
];

const getInitial = computed(() => {
  return () => {
    if (currentProfile.value?.display_name) {
      return currentProfile.value.display_name.charAt(0).toUpperCase();
    }
    return 'U';
  };
});

async function handleSignOut() {
  await signOut();
  router.push('/login');
}
</script>
