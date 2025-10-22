<template>
  <Motion
    v-if="visible"
    tag="div"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    :initial="{ opacity: 0, scale: 0.9 }"
    :animate="{ opacity: 1, scale: 1 }"
    :exit="{ opacity: 0, scale: 0.9 }"
    :transition="{ duration: 0.8, ease: 'easeInOut' }"
    :style="{ paddingTop: 'var(--sat, 0)', paddingBottom: 'var(--sab, 0)' }"
  >
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-purple-50" />

    <!-- Organic animated blobs -->
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

    <!-- Logo and progress -->
    <Motion
      tag="div"
      class="relative z-10 max-w-lg mx-auto text-center"
      :initial="{ opacity: 0, scale: 0.9 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
    >
      <!-- Icon -->
      <div class="inline-flex items-center justify-center mb-8 relative">
        <Motion
          tag="div"
          class="absolute blur-[60px] rounded-full"
          :style="{
            inset: '-24px',
            background:
              'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(168,85,247,0.3))',
          }"
          :animate="{ opacity: [0.4, 0.6, 0.4] }"
          :transition="{ duration: 3, repeat: Infinity, ease: 'easeInOut' }"
        />

        <div
          class="relative rounded-full overflow-hidden"
          :style="{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
          }"
        >
          <video 
            autoplay 
            muted 
            playsinline
            loop
            class="w-16 h-16 md:w-20 md:h-20 object-contain"
          >
            <source :src="logoVideo" type="video/mp4">
            <img :src="logoImage" alt="MoodFlow" class="w-full h-full object-contain" />
          </video>
        </div>
      </div>

      <!-- Title avec police interactive -->
      <Motion
        tag="h1"
        class="mb-4 font-black cursor-default hover:scale-105 transition-transform duration-500"
        :style="{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }"
      >
        <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
          {{ appName }}
        </span>
      </Motion>

      <!-- Progress bar -->
      <div
        class="w-40 h-2 mx-auto mt-6 rounded-full overflow-hidden bg-white/60 backdrop-blur-md border border-white/80"
      >
        <Motion
          tag="div"
          class="h-full bg-gradient-to-r from-orange-500 to-purple-500"
          :initial="{ width: '0%' }"
          :animate="{ width: progress + '%' }"
          :transition="{ duration: 0.3 }"
        />
      </div>
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Motion } from '@motionone/vue' // ✅ Import correct
import logoVideo from '../assets/MoodFlow_final_logo.mp4'
import logoImage from '../assets/MoodFlow_final_logo.png'

interface Props {
  onComplete?: () => void
  duration?: number
  appName?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  appName: 'MoodFlow',
})

const visible = ref(true)
const progress = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const startTime = Date.now()
  const total = props.duration

  interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min((elapsed / total) * 100, 100)
  }, 50)

  timer = setTimeout(() => {
    visible.value = false
    clearInterval(interval!)
    setTimeout(() => props.onComplete?.(), 500)
  }, props.duration)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient-flow {
  background-size: 200% 200%;
  animation: gradient-flow 3s ease infinite;
}
</style>
