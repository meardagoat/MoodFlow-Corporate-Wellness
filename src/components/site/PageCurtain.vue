<template>
  <div
    class="fixed inset-0 z-[100]"
    :class="active ? 'pointer-events-auto' : 'pointer-events-none'"
    aria-hidden="true"
  >
    <!-- Pas de transform en CSS : GSAP pilote yPercent seul, les panneaux restent invisibles au repos -->
    <div ref="under" class="invisible absolute inset-0 bg-sun" />
    <div
      ref="over"
      class="invisible absolute inset-0 flex flex-col items-center justify-center gap-8 overflow-hidden bg-grape px-6 text-paper"
    >
      <SunMark class="h-28 w-28 md:h-36 md:w-36" state="very_happy" :ray-colors="['#FED94E', '#FF5BBC']" />
      <p ref="title" class="display text-center text-display-lg">{{ label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SunMark from '../brand/SunMark.vue';
import { gsap } from '../../lib/motion';

/** Rideau de transition entre deux pages vitrine */
const under = ref<HTMLElement | null>(null);
const over = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const label = ref('');
const active = ref(false);

function cover(nextLabel: string): Promise<void> {
  label.value = nextLabel;
  active.value = true;
  return new Promise((resolve) => {
    gsap
      .timeline({ onComplete: () => resolve() })
      .set([under.value, over.value], { yPercent: 100, autoAlpha: 1 })
      .set(title.value, { yPercent: 60, opacity: 0 })
      .to(under.value, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' })
      .to(over.value, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' }, 0.08)
      .to(title.value, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, 0.42);
  });
}

function reveal(): Promise<void> {
  return new Promise((resolve) => {
    gsap
      .timeline({
        delay: 0.12,
        onComplete: () => {
          active.value = false;
          gsap.set([under.value, over.value], { autoAlpha: 0, yPercent: 100 });
          resolve();
        },
      })
      .to(title.value, { yPercent: -40, opacity: 0, duration: 0.35, ease: 'power2.in' })
      .to(over.value, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, 0.1)
      .to(under.value, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, 0.2);
  });
}

defineExpose({ cover, reveal });
</script>
