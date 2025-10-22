<template>
  <Motion
    v-if="visible"
    tag="div"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.6, ease: 'easeInOut' }"
    :style="{ paddingTop: 'var(--sat, 0)', paddingBottom: 'var(--sab, 0)' }"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-purple-50" />

    <div class="absolute inset-0 pointer-events-none">
      <Motion
        tag="div"
        class="absolute top-32 -left-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"
        :animate="{ x: [0, 30, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }"
        :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut' }"
      />
      <Motion
        tag="div"
        class="absolute top-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
        :animate="{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 0.9, 1] }"
        :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }"
      />
      <Motion
        tag="div"
        class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        :animate="{ x: [0, 20, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }"
        :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }"
      />
    </div>

    <Motion
      tag="div"
      class="relative z-10 max-w-xl mx-auto px-6 text-center"
      :initial="{ scale: 0.9, opacity: 0 }"
      :animate="{ scale: 1, opacity: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
    >
      <div class="inline-flex items-center justify-center mb-8 relative">
        <Motion
          tag="div"
          class="absolute blur-[60px] rounded-full"
          :style="{ inset: '-24px', background: 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(168,85,247,0.3))' }"
          :animate="{ opacity: [0.4, 0.6, 0.4] }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
        />
        <div
          class="relative rounded-full"
          :style="{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.8)'
          }"
        >
          <svg class="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="#f97316" stroke-width="2" opacity="0.4" />
            <path d="M35 35 L45 25 M65 35 L55 25" stroke="#a855f7" stroke-width="3" stroke-linecap="round" />
            <circle cx="37" cy="45" r="4" fill="#f97316" />
            <circle cx="63" cy="45" r="4" fill="#f97316" />
            <path d="M35 65 Q50 75, 65 65" stroke="#a855f7" stroke-width="3" stroke-linecap="round" fill="none" />
          </svg>
        </div>
      </div>

      <Motion
        tag="h1"
        class="mb-4"
        :style="{ fontSize: 'clamp(2.5rem,5vw,3.75rem)', fontWeight: 700, letterSpacing: '-0.025em' }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }"
      >
        <Motion
          tag="span"
          class="bg-clip-text text-transparent"
          :style="{
            backgroundImage: 'linear-gradient(to right,#f97316,#a855f7,#f97316)',
            backgroundSize: '200% 200%'
          }"
          :animate="{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
        >
          See You Soon
        </Motion>
      </Motion>

      <Motion
        tag="p"
        class="mb-3"
        :style="{ fontSize: 'clamp(1.25rem,3vw,1.5rem)', fontWeight: 300, lineHeight: '1.75' }"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.8, ease: 'easeOut' }"
      >
        <span class="text-slate-700">Take care of </span>
        <Motion
          tag="span"
          :style="{ fontWeight: 600 }"
          :animate="{ color: ['#fb923c','#f97316','#ea580c','#fb923c'] }"
          :transition="{ duration: 6, repeat: Infinity, ease: 'easeInOut' }"
        >
          yourself
        </Motion>
      </Motion>

      <Motion
        tag="p"
        class="mb-8"
        :style="{ fontSize: 'clamp(1rem,2vw,1.125rem)', color: '#64748b' }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }"
      >
        Remember, every step counts towards better wellness
      </Motion>

      <Motion
        tag="div"
        class="w-16 h-1 rounded-full overflow-hidden mx-auto mb-12"
        :style="{ background: 'rgba(255,255,255,0.3)' }"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.6, duration: 0.8, ease: 'easeInOut' }"
      >
        <Motion
          tag="div"
          class="h-full"
          :style="{ background: 'linear-gradient(to right,#f97316,#a855f7)' }"
          :animate="{ x: ['-100%', '100%'] }"
          :transition="{ duration: 2, repeat: Infinity, ease: 'easeInOut' }"
        />
      </Motion>

      <Motion
        tag="div"
        class="grid grid-cols-3 gap-4 max-w-md mx-auto"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.7, duration: 0.8, ease: 'easeInOut' }"
      >
        <div
          v-for="(stat, index) in statsData"
          :key="index"
          class="rounded-xl"
          :style="{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.8)'
          }"
        >
          <div class="mb-1" :style="{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }">
            {{ stat.value }}
          </div>
          <div :style="{ fontSize: '0.75rem', color: '#64748b' }">{{ stat.label }}</div>
        </div>
      </Motion>
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Motion } from '@motionone/vue'  // ✅ bon import

interface Stats {
  days: number
  moods: number
  streak: number
}

interface Props {
  onComplete?: () => void
  duration?: number
  userName?: string
  appName?: string
  stats?: Stats
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  appName: 'MoodFlow',
  stats: () => ({ days: 0, moods: 0, streak: 0 })
})

const visible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

const statsData = computed(() => [
  { value: props.stats.days, label: 'Days Active' },
  { value: props.stats.moods, label: 'Moods Tracked' },
  { value: props.stats.streak, label: 'Day Streak' }
])

onMounted(() => {
  timer = setTimeout(() => {
    visible.value = false
    setTimeout(() => props.onComplete?.(), 600)
  }, props.duration)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
