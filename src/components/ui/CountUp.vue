<template>
  <span ref="el"><span aria-hidden="true">{{ shown }}</span><span class="sr-only">{{ value }}</span></span>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';

const props = withDefaults(defineProps<{ value: string; duration?: number }>(), { duration: 1.8 });

// "4.8" → 4.8 ; "10K+" → 10 + "K+" ; "98%" → 98 + "%"
const match = props.value.match(/^([\d.,]+)(.*)$/);
const target = match ? parseFloat(match[1].replace(',', '.')) : NaN;
const decimals = match ? (match[1].split(/[.,]/)[1] ?? '').length : 0;
const suffix = match ? match[2] : '';

const el = ref<HTMLElement | null>(null);
const shown = ref(Number.isNaN(target) || prefersReducedMotion() ? props.value : (0).toFixed(decimals) + suffix);
let trigger: ScrollTrigger | null = null;
let tween: gsap.core.Tween | null = null;

onMounted(() => {
  if (Number.isNaN(target) || prefersReducedMotion() || !el.value) return;
  const counter = { n: 0 };
  trigger = ScrollTrigger.create({
    trigger: el.value,
    start: 'top 92%',
    once: true,
    onEnter: () => {
      tween = gsap.to(counter, {
        n: target,
        duration: props.duration,
        ease: 'expo.out',
        onUpdate: () => {
          shown.value = counter.n.toFixed(decimals) + suffix;
        },
        onComplete: () => {
          shown.value = props.value;
        },
      });
    },
  });
});

onUnmounted(() => {
  trigger?.kill();
  tween?.kill();
});
</script>
