<template>
  <div
    v-if="visible"
    ref="panel"
    class="splash-screen fixed inset-0 z-[85] flex flex-col overflow-hidden bg-grape text-paper"
    role="status"
    aria-live="polite"
  >
    <div class="label px-6 pt-6 text-paper/60 sm:px-10 sm:pt-8">
      {{ appName }} ©2025
    </div>

    <div class="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div ref="sun" class="w-[min(52vw,16rem)]">
        <SunMark state="very_happy" :ray-colors="['#FED94E', '#FF5BBC']" />
      </div>

      <h1 ref="title" class="display mt-10 overflow-hidden whitespace-nowrap pb-[0.08em] text-[clamp(3.5rem,13vw,10rem)] leading-[0.9] tracking-[-0.055em]">
        <span v-for="(letter, i) in letters" :key="i" class="splash-letter inline-block">{{ letter === ' ' ? ' ' : letter }}</span>
      </h1>
      <p ref="subtitle" class="mt-5 text-lg text-paper/75 sm:text-xl">Connexion en cours...</p>
    </div>

    <div class="flex items-end justify-between gap-6 px-6 pb-8 sm:px-10 sm:pb-10">
      <div class="h-1 flex-1 overflow-hidden rounded-full bg-paper/20" aria-hidden="true">
        <div class="h-full rounded-full bg-sun" :style="{ width: progress + '%' }" />
      </div>
      <span class="display w-[3ch] text-right text-5xl leading-none tracking-[-0.05em] sm:text-7xl" aria-hidden="true">
        {{ String(Math.round(progress)).padStart(3, '0') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import SunMark from './brand/SunMark.vue'
import { gsap, prefersReducedMotion } from '../lib/motion'

interface Props {
  onComplete?: () => void
  duration?: number
  appName?: string
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000,
  appName: 'MoodFlow',
})

const letters = 'Bienvenue !'.split('')

const visible = ref(true)
const progress = ref(0)
const panel = ref<HTMLElement | null>(null)
const sun = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setTimeout> | null = null
let interval: ReturnType<typeof setInterval> | null = null
let ctx: gsap.Context | null = null

function finish() {
  const done = () => {
    visible.value = false
    props.onComplete?.()
  }
  if (!panel.value || prefersReducedMotion()) {
    visible.value = false
    setTimeout(() => props.onComplete?.(), 500)
    return
  }
  gsap.to(panel.value, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: done })
}

onMounted(async () => {
  const startTime = Date.now()
  const total = props.duration

  interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min((elapsed / total) * 100, 100)
  }, 50)

  timer = setTimeout(() => {
    if (interval) clearInterval(interval)
    progress.value = 100
    finish()
  }, props.duration)

  await nextTick()
  if (prefersReducedMotion()) return
  ctx = gsap.context(() => {
    gsap.from(sun.value, { scale: 0.3, rotate: -140, opacity: 0, duration: 1.6, ease: 'expo.out' })
    gsap.from('.splash-letter', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04, delay: 0.25 })
    gsap.from(subtitle.value, { opacity: 0, y: 16, duration: 0.8, ease: 'expo.out', delay: 0.7 })
  }, panel.value ?? undefined)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  if (interval) clearInterval(interval)
  ctx?.revert()
})
</script>
