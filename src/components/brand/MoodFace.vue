<template>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <circle cx="50" cy="50" r="50" :fill="fill" />
    <ellipse
      v-for="(c, i) in cheeks"
      :key="`c${i}`"
      :cx="c.cx"
      :cy="c.cy"
      rx="7.5"
      ry="4.6"
      fill="#FA4D52"
      opacity="0.4"
    />
    <g :stroke="ink" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <template v-if="features.eyes === 'dots'">
        <circle
          v-for="(e, i) in FACE.eyes"
          :key="`e${i}`"
          :cx="e.cx"
          :cy="e.cy"
          :r="FACE.eyeR * features.eyeScale"
          :fill="ink"
          stroke="none"
        />
      </template>
      <template v-else>
        <path v-for="(d, i) in FACE[features.eyes]" :key="`a${i}`" :d="d" stroke-width="4.4" />
      </template>
      <template v-if="features.brows">
        <path v-for="(d, i) in FACE.brows" :key="`b${i}`" :d="d" stroke-width="3.6" />
      </template>
      <path :d="FACE.mouth[face]" stroke-width="4.8" />
    </g>
    <path v-if="features.tear" :d="FACE.tear" fill="#5EDDE7" :stroke="ink" stroke-width="1.5" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FACE, faceFeatures, isMood, MOOD_COLORS, MOOD_ON_COLORS, type FaceState } from '../../lib/moods';

const props = defineProps<{
  /** Valeur d'humeur (very_happy … very_sad) ou expression de la marque */
  mood: string;
  /** Texte accessible ; sans lui, le visage est décoratif */
  label?: string;
  /** Couleur de fond forcée */
  color?: string;
}>();

const face = computed<FaceState>(() => {
  const m = props.mood;
  return isMood(m) || m === 'sleepy' || m === 'closed' || m === 'peek' ? (m as FaceState) : 'neutral';
});

const features = computed(() => faceFeatures(face.value));

const fill = computed(() => props.color ?? (isMood(face.value) ? MOOD_COLORS[face.value] : MOOD_COLORS.very_happy));
const ink = computed(() => (isMood(face.value) ? MOOD_ON_COLORS[face.value] : '#1A0E2B'));
const cheeks = computed(() => (features.value.cheeks ? FACE.cheeks : []));
</script>
