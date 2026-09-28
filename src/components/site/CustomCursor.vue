<template>
  <div v-if="enabled" ref="el" class="pointer-events-none fixed left-0 top-0 z-[85]" aria-hidden="true">
    <div
      ref="bubble"
      class="grid h-28 w-28 place-items-center rounded-full p-3 text-center font-mono text-[11px] font-medium uppercase leading-tight tracking-[0.12em]"
      :style="{ background: color, color: textColor, transform: 'scale(0)' }"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/motion';

/**
 * Bulle qui suit le curseur au survol des éléments marqués
 * data-cursor="Libellé" (et data-cursor-color / data-cursor-text en option).
 * Le curseur natif reste visible : la bulle ne sert qu'à annoncer l'action.
 */
const enabled = ref(false);
const el = ref<HTMLElement | null>(null);
const bubble = ref<HTMLElement | null>(null);
const label = ref('');
const color = ref('#1A0E2B');
const textColor = ref('#FFF8EF');

let current: HTMLElement | null = null;
let xTo: ((v: number) => void) | null = null;
let yTo: ((v: number) => void) | null = null;

function onMove(e: PointerEvent) {
  xTo?.(e.clientX);
  yTo?.(e.clientY);
}

function show(target: HTMLElement) {
  current = target;
  label.value = target.dataset.cursor ?? '';
  color.value = target.dataset.cursorColor ?? '#1A0E2B';
  textColor.value = target.dataset.cursorText ?? '#FFF8EF';
  gsap.to(bubble.value, { scale: 1, rotate: 0, duration: 0.55, ease: 'back.out(1.8)', overwrite: true });
}

function hide() {
  current = null;
  gsap.to(bubble.value, { scale: 0, rotate: -20, duration: 0.35, ease: 'power3.in', overwrite: true });
}

function onOver(e: PointerEvent) {
  const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
  if (target && target !== current) show(target);
  else if (!target && current) hide();
}

function onLeaveWindow() {
  if (current) hide();
}

onMounted(async () => {
  if (!hasFinePointer() || prefersReducedMotion()) return;
  enabled.value = true;
  await nextTick();
  if (!el.value) return;
  gsap.set(el.value, { xPercent: -50, yPercent: -50 });
  xTo = gsap.quickTo(el.value, 'x', { duration: 0.45, ease: 'power3.out' });
  yTo = gsap.quickTo(el.value, 'y', { duration: 0.45, ease: 'power3.out' });
  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', onOver, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeaveWindow);
});

onUnmounted(() => {
  window.removeEventListener('pointermove', onMove);
  document.removeEventListener('pointerover', onOver);
  document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
  gsap.killTweensOf([el.value, bubble.value]);
});
</script>
