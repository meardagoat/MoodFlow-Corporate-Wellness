<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-8">
            <router-link to="/feed" class="text-2xl font-bold text-primary-600">
              MoodFlow
            </router-link>

            <div class="hidden md:flex items-center gap-1">
              <router-link
                to="/feed"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition',
                  $route.path === '/feed'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                ]"
              >
                Dashboard
              </router-link>

              <router-link
                to="/chat"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition',
                  $route.path === '/chat'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                ]"
              >
                Chat
              </router-link>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="hidden md:block text-sm text-gray-600">
              {{ currentProfile?.service }}
            </div>

            <router-link
              to="/profile"
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition',
                $route.path === '/profile'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          Dashboard
        </router-link>

        <router-link
          to="/chat"
          @click="mobileMenuOpen = false"
          :class="[
            'block px-4 py-2 text-base font-medium',
            $route.path === '/chat'
              ? 'bg-primary-50 text-primary-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          Chat
        </router-link>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { currentProfile, isManager, signOut } from '../lib/auth';

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
