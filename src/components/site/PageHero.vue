<template>
  <section class="relative overflow-hidden pb-20 pt-[18.5rem] md:pb-28 md:pt-44" :style="{ backgroundColor: tone }">
    <div
      class="pointer-events-none absolute -right-8 top-20 w-[12.5rem] md:-right-[7vw] md:top-20 md:w-[38vw] lg:w-[34vw]"
      aria-hidden="true"
    >
      <div v-parallax="0.35">
        <SunMark :state="mood" :ray-colors="rays" :disc="disc" track />
      </div>
    </div>

    <div class="shell relative z-10">
      <p v-reveal class="label flex items-center gap-3 text-ink/65">
        <Icon name="spark" class="h-3.5 w-3.5 text-ink" />
        {{ label }}
      </p>

      <h1 v-split="{ immediate: true, delay: 0.1, chars: true }" class="display mt-10 max-w-[15ch] text-display-xl md:mt-14 md:pr-[22vw]">
        <slot />
      </h1>

      <div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
        <p v-reveal="0.3" class="text-pretty text-xl leading-snug text-ink/80 md:col-span-7 md:text-2xl">
          {{ subtitle }}
        </p>
        <ul v-reveal="0.4" class="flex flex-wrap gap-2 md:col-span-5 md:justify-end">
          <li
            v-for="(item, i) in indicators"
            :key="item"
            class="chip border-ink/15 bg-paper/70 backdrop-blur-sm"
          >
            <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: dots[i % dots.length] }" />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SunMark from '../brand/SunMark.vue';
import Icon from '../ui/Icon.vue';
import type { FaceState } from '../../lib/moods';

withDefaults(
  defineProps<{
    label: string;
    subtitle: string;
    indicators?: string[];
    /** Couleur de fond de la section */
    tone?: string;
    mood?: FaceState;
    rays?: string[];
    disc?: string;
    dots?: string[];
  }>(),
  {
    indicators: () => [],
    tone: '#FFE3D8',
    mood: 'happy',
    rays: () => ['#8248FE', '#FA4D52'],
    disc: '#FED94E',
    dots: () => ['#FA4D52', '#8248FE', '#FED94E'],
  },
);
</script>
