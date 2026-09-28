<template>
  <div ref="root" class="marquee">
    <div ref="track" class="marquee-track">
      <div v-for="g in 2" :key="g" class="marquee-group" :aria-hidden="g === 2 ? 'true' : undefined">
        <div
          v-for="n in repeat"
          :key="n"
          class="flex shrink-0 items-center"
          :aria-hidden="g === 1 && n > 1 ? 'true' : undefined"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';

const props = withDefaults(
  defineProps<{
    /** Secondes pour un tour complet */
    speed?: number;
    reverse?: boolean;
    /** Accélère avec la vitesse de défilement */
    reactive?: boolean;
    paused?: boolean;
    /** Nombre de copies du contenu par groupe (pour remplir l'écran) */
    repeat?: number;
  }>(),
  {
    speed: 30,
    reverse: false,
    reactive: false,
    paused: false,
    repeat: 2,
  },
);

const root = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
let tween: gsap.core.Tween | null = null;
let trigger: ScrollTrigger | null = null;

onMounted(() => {
  if (!track.value || prefersReducedMotion()) return;

  tween = gsap.fromTo(
    track.value,
    { xPercent: props.reverse ? -50 : 0 },
    { xPercent: props.reverse ? 0 : -50, duration: props.speed, ease: 'none', repeat: -1 },
  );
  if (props.paused) tween.pause();

  if (props.reactive && root.value) {
    trigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        if (!tween || tween.paused()) return;
        const boost = Math.min(4, Math.abs(self.getVelocity()) / 400);
        gsap.to(tween, { timeScale: 1 + boost, duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.1, delay: 0.2, ease: 'power2.out' });
      },
    });
  }
});

watch(
  () => props.paused,
  (paused) => {
    if (!tween) return;
    if (paused) tween.pause();
    else tween.resume();
  },
);

onUnmounted(() => {
  trigger?.kill();
  if (tween) gsap.killTweensOf(tween);
  tween?.kill();
});
</script>
