<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-out-expo"
    :class="[
      hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
      scrolled && !menuOpen ? 'border-ink/10 bg-paper/85 backdrop-blur-md' : 'border-transparent',
      menuOpen ? 'text-paper' : 'text-ink',
    ]"
  >
    <div class="shell flex h-20 items-center justify-between gap-6">
      <RouterLink to="/" class="group flex items-center gap-2.5" aria-label="MoodFlow, accueil">
        <SunMark
          class="h-10 w-10 transition-transform duration-700 ease-out-expo group-hover:rotate-45"
          :ray-count="16"
          :ray-width="8"
          :blink="false"
        />
        <span class="display text-[1.55rem] leading-none tracking-[-0.045em]">MoodFlow</span>
      </RouterLink>

      <nav class="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
        <RouterLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="link text-[15px] font-medium"
          :class="{ 'is-active': route.path === item.to }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <RouterLink to="/login" class="btn btn-sm btn-ghost hidden lg:inline-flex">
          <RollText text="Connexion" />
        </RouterLink>
        <RouterLink to="/register" class="btn btn-sm btn-ink hidden sm:inline-flex">
          <RollText text="Essayer gratuitement" />
        </RouterLink>
        <button
          ref="menuButton"
          type="button"
          class="btn btn-sm lg:hidden"
          :class="menuOpen ? 'btn-paper' : 'btn-outline'"
          :aria-expanded="menuOpen"
          aria-controls="menu-mobile"
          @click="menuOpen = !menuOpen"
        >
          <span>{{ menuOpen ? 'Fermer' : 'Menu' }}</span>
          <Icon :name="menuOpen ? 'x' : 'menu'" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-[clip-path] duration-700 ease-in-out-quart"
      leave-active-class="transition-[clip-path] duration-500 ease-in-out-quart"
      enter-from-class="[clip-path:inset(0_0_100%_0)]"
      leave-to-class="[clip-path:inset(0_0_100%_0)]"
    >
      <div
        v-if="menuOpen"
        id="menu-mobile"
        class="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-grape pt-24 text-paper [clip-path:inset(0_0_0_0)] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-lenis-prevent
        @keydown.esc="menuOpen = false"
      >
        <nav class="shell flex flex-1 flex-col justify-center gap-1 py-8" aria-label="Menu mobile">
          <RouterLink
            v-for="(item, i) in allLinks"
            :key="item.to"
            :to="item.to"
            class="menu-link group flex items-baseline gap-4 border-b border-paper/15 py-3"
            :style="{ '--i': i }"
            @click="menuOpen = false"
          >
            <span class="label w-8 text-paper/50">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="display text-[clamp(2.6rem,12vw,5rem)] leading-[0.95] tracking-[-0.05em] transition-colors group-hover:text-sun">
              {{ item.label }}
            </span>
          </RouterLink>
        </nav>
        <div class="shell flex flex-wrap items-center gap-3 pb-10 pt-4 safe-bottom">
          <RouterLink to="/register" class="btn btn-sun" @click="menuOpen = false">
            Essayer gratuitement
            <span class="btn-dot"><Icon name="arrow-right" /></span>
          </RouterLink>
          <RouterLink to="/login" class="btn btn-outline-light" @click="menuOpen = false">Connexion</RouterLink>
          <a href="mailto:hello@moodflow.com" class="link ml-auto font-mono text-sm text-paper/70">hello@moodflow.com</a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SunMark from '../brand/SunMark.vue';
import Icon from '../ui/Icon.vue';
import RollText from '../ui/RollText.vue';
import { getLenis } from '../../lib/motion';

const route = useRoute();

const links = [
  { to: '/pricing', label: 'Tarifs' },
  { to: '/demo', label: 'Démo' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const allLinks = [{ to: '/', label: 'Accueil' }, ...links, { to: '/privacy', label: 'Confidentialité' }];

const menuOpen = ref(false);
const menuButton = ref<HTMLButtonElement | null>(null);
const scrolled = ref(false);
const hidden = ref(false);

let lastY = 0;
let ticking = false;

function update() {
  const y = window.scrollY;
  scrolled.value = y > 24;
  hidden.value = y > 180 && y > lastY + 2;
  if (y < lastY - 2) hidden.value = false;
  lastY = y;
  ticking = false;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

watch(menuOpen, async (open) => {
  const lenis = getLenis();
  if (open) {
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    await nextTick();
    document.querySelector<HTMLElement>('#menu-mobile a')?.focus();
  } else {
    lenis?.start();
    document.body.style.overflow = '';
    menuButton.value?.focus({ preventScroll: true });
  }
});

watch(
  () => route.path,
  () => {
    menuOpen.value = false;
    hidden.value = false;
  },
);

onMounted(() => {
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.menu-link {
  animation: menu-in 0.9s var(--ease-out-expo) both;
  animation-delay: calc(0.18s + var(--i) * 0.05s);
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translate3d(0, 2.5rem, 0);
  }
}
</style>
