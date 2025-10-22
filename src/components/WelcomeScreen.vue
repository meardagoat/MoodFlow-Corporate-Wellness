<template>
  <motion.div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    :initial="{ opacity: 0, x: '100%' }"
    :animate="{ 
      opacity: visible ? 1 : 0,
      x: visible ? '0%' : '-100%',
    }"
    :transition="{ duration: 0.5, ease: 'easeInOut' }"
    :style="{
      paddingTop: 'var(--sat, 0)',
      paddingBottom: 'var(--sab, 0)',
    }"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-purple-50" />

    <div class="absolute inset-0 pointer-events-none">
      <motion.div
        class="absolute top-32 -left-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"
        :animate="{ x: [0, 30, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }"
        :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut' }"
      />
      <motion.div
        class="absolute top-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
        :animate="{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 0.9, 1] }"
        :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }"
      />
      <motion.div
        class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        :animate="{ x: [0, 20, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }"
        :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }"
      />
    </div>

    <motion.div
      class="relative z-10 max-w-2xl mx-auto px-6 text-center"
      :initial="{ scale: 0.9, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
    >
      <div class="inline-flex items-center justify-center mb-6 relative">
        <motion.div
          class="absolute blur-[40px] rounded-full"
          :style="{
            inset: '-16px',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(168, 85, 247, 0.3))',
          }"
          :animate="{ opacity: [0.4, 0.6, 0.4] }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
        />

        <div
          class="relative rounded-full"
          :style="{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }"
        >
          <img
            v-if="logoUrl"
            :src="logoUrl"
            :alt="appName"
            class="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <svg
            v-else
            class="w-16 h-16 md:w-20 md:h-20"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="40" r="20" fill="#f97316" opacity="0.9" />
            <path d="M25 75 Q50 65, 75 75 Q75 85, 50 90 Q25 85, 25 75" fill="#f97316" opacity="0.9" />
            <path d="M35 50 Q50 55, 65 50" stroke="#a855f7" stroke-width="3" stroke-linecap="round" fill="none" />
          </svg>
        </div>
      </div>

      <motion.h1
        class="mb-4"
        :style="{
          fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
          fontWeight: 700,
          letterSpacing: '-0.025em',
        }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }"
      >
        <span class="text-slate-800">Welcome to </span>
        <motion.span
          class="bg-clip-text text-transparent"
          :style="{
            backgroundImage: 'linear-gradient(to right, #f97316, #a855f7, #f97316)',
            backgroundSize: '200% 200%',
          }"
          :animate="{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
        >
          {{ appName }}
        </motion.span>
      </motion.h1>

      <motion.p
        class="mb-8"
        :style="{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 300, lineHeight: '1.75' }"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.8, ease: 'easeOut' }"
      >
        <span class="text-slate-700">Your journey to better workplace </span>
        <motion.span
          :style="{ fontWeight: 600 }"
          :animate="{ color: ['#fb923c', '#f97316', '#ea580c', '#fb923c'] }"
          :transition="{ duration: 6, repeat: Infinity, ease: 'easeInOut' }"
        >
          wellness
        </motion.span>
        <span class="text-slate-700"> starts here</span>
      </motion.p>

      <motion.div
        class="flex flex-wrap gap-3 justify-center mb-6"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }"
      >
        <motion.div
          v-for="feature in features"
          :key="feature"
          class="rounded-2xl"
          :style="{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(12px)',
            padding: '12px 20px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }"
          :whileHover="{ scale: 1.05 }"
          :transition="{ type: 'spring', stiffness: 300 }"
        >
          <p class="m-0" :style="{ color: '#475569', fontWeight: 500 }">
            {{ feature }}
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        @click="handleContinue"
        class="relative overflow-hidden rounded-2xl border-none cursor-pointer"
        :style="{
          padding: '16px 32px',
          background: 'linear-gradient(to right, #f97316, #ea580c)',
          color: 'white',
          fontWeight: 600,
          fontSize: '1.125rem',
          boxShadow: '0 20px 40px -10px rgba(249, 115, 22, 0.4)',
        }"
        :whileHover="{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.6)' }"
        :transition="{ type: 'spring', stiffness: 300 }"
      >
        <span class="relative z-10 flex items-center gap-2">
          Get Started
          <motion.div
            :animate="{ x: [0, 4, 0] }"
            :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.div>
        </span>

        <motion.div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          :animate="{ x: ['-200%', '200%'] }"
          :transition="{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }"
        />
      </motion.button>
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Motion } from '@motionone/vue';

interface Props {
  onComplete?: () => void;
  appName?: string;
  logoUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  appName: "MoodFlow"
});

const visible = ref(true);
const features = ["Track Your Mood", "Build Habits", "Feel Better"];

const handleContinue = () => {
  visible.value = false;
  setTimeout(() => props.onComplete?.(), 500);
};
</script>