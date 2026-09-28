<template>
  <svg
    ref="root"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    class="overflow-visible"
    :role="title ? 'img' : undefined"
    :aria-label="title || undefined"
    :aria-hidden="title ? undefined : 'true'"
  >
    <g ref="raysWrap">
      <g v-if="rays" class="sun-rays" :class="{ 'is-spinning': spin }">
        <line
          v-for="(r, i) in rayLines"
          :key="i"
          :x1="r.x1"
          :y1="r.y1"
          :x2="r.x2"
          :y2="r.y2"
          :stroke="r.color"
          :stroke-width="rayWidth"
          stroke-linecap="round"
        />
      </g>
    </g>

    <circle cx="100" cy="100" r="48" :fill="disc" />

    <g v-if="face" transform="translate(52 52) scale(0.96)">
      <g ref="cheeksEl" :opacity="init.cheeks ? 1 : 0">
        <ellipse
          v-for="(c, i) in FACE.cheeks"
          :key="i"
          :cx="c.cx"
          :cy="c.cy"
          rx="7.5"
          ry="4.6"
          fill="#FA4D52"
          opacity="0.42"
        />
      </g>

      <g ref="lookEl" :stroke="ink" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g ref="dotsEl" :opacity="init.eyes === 'dots' ? 1 : 0">
          <circle
            v-for="(e, i) in FACE.eyes"
            :key="i"
            :class="{ 'sun-blink': blink }"
            :cx="e.cx"
            :cy="e.cy"
            :r="FACE.eyeR"
            :fill="ink"
            stroke="none"
          />
        </g>
        <g ref="arcUpEl" :opacity="init.eyes === 'arcUp' ? 1 : 0">
          <path v-for="(d, i) in FACE.arcUp" :key="i" :d="d" stroke-width="4.4" />
        </g>
        <g ref="arcDownEl" :opacity="init.eyes === 'arcDown' ? 1 : 0">
          <path v-for="(d, i) in FACE.arcDown" :key="i" :d="d" stroke-width="4.4" />
        </g>
        <g ref="browsEl" :opacity="init.brows ? 1 : 0">
          <path v-for="(d, i) in FACE.brows" :key="i" :d="d" stroke-width="3.6" />
        </g>
      </g>

      <g ref="mouthWrap">
        <path
          ref="mouthEl"
          :d="initMouth"
          :stroke="ink"
          fill="none"
          stroke-width="4.8"
          stroke-linecap="round"
        />
      </g>

      <path
        ref="tearEl"
        :d="FACE.tear"
        fill="#5EDDE7"
        :stroke="ink"
        stroke-width="1.5"
        :opacity="init.tear ? 1 : 0"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/motion';
import { FACE, faceFeatures, type FaceState } from '../../lib/moods';

const props = withDefaults(
  defineProps<{
    state?: FaceState;
    face?: boolean;
    rays?: boolean;
    rayCount?: number;
    rayColors?: string[];
    rayWidth?: number;
    disc?: string;
    ink?: string;
    spin?: boolean;
    /** Les yeux suivent le curseur */
    track?: boolean;
    blink?: boolean;
    title?: string;
  }>(),
  {
    state: 'happy',
    face: true,
    rays: true,
    rayCount: 22,
    rayColors: () => ['#8248FE', '#FA4D52'],
    rayWidth: 5,
    disc: '#FED94E',
    ink: '#1A0E2B',
    spin: true,
    track: false,
    blink: true,
  },
);

const root = ref<SVGSVGElement | null>(null);
const raysWrap = ref<SVGGElement | null>(null);
const cheeksEl = ref<SVGGElement | null>(null);
const lookEl = ref<SVGGElement | null>(null);
const dotsEl = ref<SVGGElement | null>(null);
const arcUpEl = ref<SVGGElement | null>(null);
const arcDownEl = ref<SVGGElement | null>(null);
const browsEl = ref<SVGGElement | null>(null);
const mouthWrap = ref<SVGGElement | null>(null);
const mouthEl = ref<SVGPathElement | null>(null);
const tearEl = ref<SVGPathElement | null>(null);

// Premier rendu statique ; les changements d'expression passent ensuite par GSAP
const init = faceFeatures(props.state);
const initMouth = FACE.mouth[props.state];

const RAY_SCALE: Record<FaceState, number> = {
  very_happy: 1.07,
  happy: 1,
  neutral: 0.94,
  sad: 0.86,
  very_sad: 0.8,
  sleepy: 0.9,
  closed: 0.97,
  peek: 1.03,
};

// Rayons irréguliers, comme tracés à la main (pseudo-aléatoire stable)
function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const round = (n: number) => Math.round(n * 100) / 100;

const rayLines = computed(() => {
  const n = props.rayCount;
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2 + (seeded(i) - 0.5) * 0.1;
    const long = i % 2 === 0;
    const r1 = 60 + (seeded(i + 31) - 0.5) * 5;
    const r2 = (long ? 95 : 82) + (seeded(i + 67) - 0.5) * 9;
    return {
      x1: round(100 + r1 * Math.cos(a)),
      y1: round(100 + r1 * Math.sin(a)),
      x2: round(100 + r2 * Math.cos(a)),
      y2: round(100 + r2 * Math.sin(a)),
      color: props.rayColors[i % props.rayColors.length],
    };
  });
});

function applyState(state: FaceState, animate: boolean) {
  if (!props.face) return;
  const f = faceFeatures(state);
  const d = animate && !prefersReducedMotion() ? 0.6 : 0;

  gsap.to(mouthEl.value, { attr: { d: FACE.mouth[state] }, duration: d, ease: 'back.out(1.7)', overwrite: 'auto' });
  gsap.to(dotsEl.value, {
    opacity: f.eyes === 'dots' ? 1 : 0,
    scale: f.eyeScale,
    transformOrigin: '50% 50%',
    duration: d * 0.6,
    overwrite: 'auto',
  });
  gsap.to(arcUpEl.value, { opacity: f.eyes === 'arcUp' ? 1 : 0, duration: d * 0.6, overwrite: 'auto' });
  gsap.to(arcDownEl.value, { opacity: f.eyes === 'arcDown' ? 1 : 0, duration: d * 0.6, overwrite: 'auto' });
  gsap.to(browsEl.value, { opacity: f.brows ? 1 : 0, duration: d, overwrite: 'auto' });
  gsap.to(cheeksEl.value, { opacity: f.cheeks ? 1 : 0, duration: d, overwrite: 'auto' });
  gsap.to(tearEl.value, { opacity: f.tear ? 1 : 0, y: f.tear ? 0 : -6, duration: d, overwrite: 'auto' });
  if (raysWrap.value) {
    gsap.to(raysWrap.value, { scale: RAY_SCALE[state], svgOrigin: '100 100', duration: d * 1.5, ease: 'expo.out', overwrite: 'auto' });
  }
}

watch(
  () => props.state,
  (state) => applyState(state, true),
);

let onMove: ((e: PointerEvent) => void) | null = null;

onMounted(() => {
  if (!props.face || !props.track || prefersReducedMotion() || !hasFinePointer()) return;
  if (!lookEl.value || !mouthWrap.value) return;

  const lookX = gsap.quickTo(lookEl.value, 'x', { duration: 0.6, ease: 'power3.out' });
  const lookY = gsap.quickTo(lookEl.value, 'y', { duration: 0.6, ease: 'power3.out' });
  const mouthX = gsap.quickTo(mouthWrap.value, 'x', { duration: 0.8, ease: 'power3.out' });
  const mouthY = gsap.quickTo(mouthWrap.value, 'y', { duration: 0.8, ease: 'power3.out' });

  onMove = (e: PointerEvent) => {
    const r = root.value?.getBoundingClientRect();
    if (!r) return;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const k = Math.min(1, dist / 380);
    lookX((dx / dist) * 4 * k);
    lookY((dy / dist) * 3.4 * k);
    mouthX((dx / dist) * 2 * k);
    mouthY((dy / dist) * 1.6 * k);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
});

onUnmounted(() => {
  if (onMove) window.removeEventListener('pointermove', onMove);
  gsap.killTweensOf([mouthEl.value, dotsEl.value, arcUpEl.value, arcDownEl.value, browsEl.value, cheeksEl.value, tearEl.value, raysWrap.value, lookEl.value, mouthWrap.value]);
});

defineExpose({ root, raysWrap });
</script>

<style scoped>
line,
circle {
  transition:
    stroke 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    fill 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.sun-rays {
  transform-origin: 100px 100px;
}

.sun-rays.is-spinning {
  animation: sun-spin 70s linear infinite;
}

.sun-blink {
  transform-box: fill-box;
  transform-origin: center;
  animation: sun-blink 5.6s ease-in-out infinite;
}

@keyframes sun-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes sun-blink {
  0%,
  91%,
  97%,
  100% {
    transform: scaleY(1);
  }
  94% {
    transform: scaleY(0.1);
  }
}
</style>
