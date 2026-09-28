<template>
  <div class="relative">
    <a
      href="#contenu"
      class="btn btn-ink sr-only left-4 top-4 z-[60] focus:not-sr-only focus:fixed"
    >
      Aller au contenu
    </a>
    <div
      ref="progressBar"
      class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-sun via-coral to-grape"
      aria-hidden="true"
    />
    <SiteHeader />
    <main id="contenu" tabindex="-1" class="outline-none">
      <slot />
    </main>
    <SiteFooter />
    <CustomCursor />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import CustomCursor from './CustomCursor.vue';
import { gsap, ScrollTrigger, refreshScrollTriggers, startSmoothScroll, stopSmoothScroll } from '../../lib/motion';

const progressBar = ref<HTMLElement | null>(null);
let progressTrigger: ScrollTrigger | null = null;

function onLoad() {
  refreshScrollTriggers(0);
}

onMounted(() => {
  startSmoothScroll();
  if (progressBar.value) {
    const setScale = gsap.quickSetter(progressBar.value, 'scaleX');
    progressTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScale(self.progress),
    });
  }
  refreshScrollTriggers();
  window.addEventListener('load', onLoad);
});

onUnmounted(() => {
  window.removeEventListener('load', onLoad);
  progressTrigger?.kill();
  stopSmoothScroll();
});
</script>
