<template>
  <div
    v-if="visible"
    ref="panel"
    class="splash-screen fixed inset-0 z-[85] flex items-center justify-center overflow-hidden bg-blush"
    role="status"
    aria-live="polite"
  >
    <!-- Background Video -->
    <video
      autoplay
      muted
      playsinline
      loop
      class="absolute inset-0 h-full w-full object-cover"
      aria-hidden="true"
    >
      <source :src="backgroundVideo" type="video/mp4">
    </video>
    <div class="absolute inset-0 bg-paper/25" aria-hidden="true" />

    <div class="relative z-10 flex max-w-4xl flex-col items-center px-6 text-center">
      <div ref="sun" class="w-[min(44vw,13rem)]">
        <SunMark state="sleepy" :ray-colors="['#8248FE', '#FA4D52']" :blink="false" />
      </div>

      <h1 ref="title" class="display mt-10 text-[clamp(3rem,11vw,7.5rem)] leading-[0.9] tracking-[-0.055em]">
        See You Soon
      </h1>

      <p ref="subtitle" class="mt-6 text-2xl text-ink/80 sm:text-3xl">
        Prenez soin de <span class="accent text-[1.15em] text-coral">vous</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import SunMark from './brand/SunMark.vue'
import { gsap, prefersReducedMotion } from '../lib/motion'
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
const panel = ref<HTMLElement | null>(null)
const sun = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null
let ctx: gsap.Context | null = null

onMounted(async () => {
  timer = setTimeout(() => {
    const done = () => {
      visible.value = false
      props.onComplete?.()
    }
    if (!panel.value || prefersReducedMotion()) {
      visible.value = false
      setTimeout(() => props.onComplete?.(), 600)
      return
    }
    gsap.to(panel.value, { opacity: 0, duration: 0.6, ease: 'power2.inOut', onComplete: done })
  }, props.duration)

  await nextTick()
  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    gsap.from(panel.value, { opacity: 0, duration: 0.6, ease: 'power2.out' })
    // Le soleil se couche doucement
    gsap.fromTo(sun.value, { y: -30, rotate: -20, opacity: 0 }, { y: 18, rotate: 10, opacity: 1, duration: 3.2, ease: 'sine.inOut' })
    gsap.from(title.value, { yPercent: 40, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.2 })
    gsap.from(subtitle.value, { y: 20, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.4 })
  }, panel.value ?? undefined)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  ctx?.revert()
})
</script>
