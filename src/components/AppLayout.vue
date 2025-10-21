<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
    <!--  Navigation moderne avec glassmorphism -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between h-16">
          <!-- Logo et navigation principale -->
          <div class="flex items-center gap-8">
            <router-link to="/feed" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span class="text-white font-bold text-xl">M</span>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
                MoodFlow
              </span>
            </router-link>

            <!-- Navigation desktop -->
            <div class="hidden md:flex items-center gap-2">
              <router-link
                to="/feed"
                :class="[
                  'px-4 py-2 rounded-2xl font-semibold transition-all',
                  $route.path === '/feed'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-purple-600'
                ]"
              >
                <span class="flex items-center gap-2">
                  <span>🏠</span>
                  <span>Feed</span>
                </span>
              </router-link>

              <router-link
                v-if="isManager"
                to="/dashboard"
                :class="[
                  'px-4 py-2 rounded-2xl font-semibold transition-all',
                  $route.path === '/dashboard'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-purple-600'
                ]"
              >
                <span class="flex items-center gap-2">
                  <span>📊</span>
                  <span>Dashboard</span>
                </span>
              </router-link>

              <router-link
                to="/chat"
                :class="[
                  'px-4 py-2 rounded-2xl font-semibold transition-all',
                  $route.path === '/chat'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-200'
                    : 'text-gray-700 hover:bg-white/80 hover:text-purple-600'
                ]"
              >
                <span class="flex items-center gap-2">
                  <span>💬</span>
                  <span>Chat</span>
                </span>
              </router-link>
            </div>
          </div>

          <!-- Actions de droite -->
          <div class="flex items-center gap-3">
            <!-- Service badge -->
            <div class="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-100/50 rounded-2xl">
              <span class="text-sm font-medium text-purple-700">{{ currentProfile?.service }}</span>
            </div>

            <!-- Profile button -->
            <router-link
              to="/profile"
              :class="[
                'w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg transition-all shadow-md',
                $route.path === '/profile'
                  ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white scale-110'
                  : 'bg-white text-purple-600 hover:scale-105'
              ]"
            >
              {{ getInitial() }}
            </router-link>

            <!-- Mobile menu button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2.5 rounded-2xl bg-white/80 text-gray-700 hover:bg-white transition"
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

      <!-- Mobile menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t border-white/20 py-3 px-4 space-y-2 bg-white/40 backdrop-blur-xl"
      >
        <router-link
          to="/feed"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all',
            $route.path === '/feed'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          <span>🏠</span>
          <span>Feed</span>
        </router-link>

        <router-link
          v-if="isManager"
          to="/dashboard"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all',
            $route.path === '/dashboard'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          <span>📊</span>
          <span>Dashboard</span>
        </router-link>

        <router-link
          to="/chat"
          @click="mobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all',
            $route.path === '/chat'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
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
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/80'
          ]"
        >
          <span>👤</span>
          <span>Profile</span>
        </router-link>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { currentProfile, isManager } from '../lib/auth';

const mobileMenuOpen = ref(false);

const getInitial = computed(() => {
  return () => {
    if (currentProfile.value?.display_name) {
      return currentProfile.value.display_name.charAt(0).toUpperCase();
    }
    return 'U';
  };
});
</script>
