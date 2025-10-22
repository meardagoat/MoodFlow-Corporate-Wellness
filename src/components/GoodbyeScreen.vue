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
    <!-- Background Video -->
    <video 
      autoplay 
      muted 
      playsinline
      loop
      class="absolute inset-0 w-full h-full object-cover"
    >
      <source :src="backgroundVideo" type="video/mp4">
    </video>
    
    <!-- Overlay pour assurer la lisibilité -->
    <div class="absolute inset-0 bg-black/20" />

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
          class="relative rounded-full overflow-hidden"
          :style="{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            padding: '16px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.8)'
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

      <Motion
        tag="h1"
        class="mb-4 font-black cursor-default hover:scale-105 transition-transform duration-500"
        :style="{ fontSize: 'clamp(2.5rem,5vw,3.75rem)', letterSpacing: '-0.025em' }"
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }"
      >
        <Motion
          tag="span"
          class="bg-clip-text text-transparent animate-gradient-flow"
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
        class="mb-8"
        :style="{ fontSize: 'clamp(1.25rem,3vw,1.5rem)', fontWeight: 300, lineHeight: '1.75' }"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.8, ease: 'easeOut' }"
      >
        <span class="text-slate-700">Prenez soin de </span>
        <Motion
          tag="span"
          :style="{ fontWeight: 600 }"
          :animate="{ color: ['#fb923c','#f97316','#ea580c','#fb923c'] }"
          :transition="{ duration: 6, repeat: Infinity, ease: 'easeInOut' }"
        >
          vous
        </Motion>
      </Motion>

    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Motion } from '@motionone/vue'  // ✅ bon import
import logoVideo from '../assets/MoodFlow_final_logo.mp4'
import logoImage from '../assets/MoodFlow_final_logo.png'
import backgroundVideo from '../assets/Splashscreen_fond.mp4'

interface Props {
  onComplete?: () => void
  duration?: number
  userName?: string
  appName?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  appName: 'MoodFlow'
})

const visible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

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
