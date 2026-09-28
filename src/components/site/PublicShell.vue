<template>
  <div class="relative">
    <a
      href="#contenu"
      class="btn btn-ink sr-only left-4 top-4 z-[60] focus:not-sr-only focus:fixed"
    >
      Aller au contenu
    </a>
    <SiteHeader />
    <main id="contenu" tabindex="-1" class="outline-none">
      <slot />
    </main>
    <SiteFooter />
    <CustomCursor />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import SiteHeader from './SiteHeader.vue';
import SiteFooter from './SiteFooter.vue';
import CustomCursor from './CustomCursor.vue';
import { refreshScrollTriggers, startSmoothScroll, stopSmoothScroll } from '../../lib/motion';

function onLoad() {
  refreshScrollTriggers(0);
}

onMounted(() => {
  startSmoothScroll();
  refreshScrollTriggers();
  window.addEventListener('load', onLoad);
});

onUnmounted(() => {
  window.removeEventListener('load', onLoad);
  stopSmoothScroll();
});
</script>
