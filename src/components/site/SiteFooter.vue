<template>
  <footer class="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink text-paper md:-mt-14 md:rounded-t-[3.5rem]">
    <div class="shell pt-20 md:pt-28">
      <div class="grid gap-14 md:grid-cols-12">
        <div class="md:col-span-6">
          <p class="display max-w-[16ch] text-display-md" v-split>Le bien-être au travail, simplifié</p>
          <RouterLink to="/register" class="btn btn-sun mt-10" v-magnetic="0.2">
            <RollText text="Essayer gratuitement" />
            <span class="btn-dot"><Icon name="arrow-right" /></span>
          </RouterLink>
        </div>

        <nav class="grid grid-cols-2 gap-10 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8" aria-label="Pied de page">
          <div>
            <p class="label mb-6 text-paper/45">Produit</p>
            <ul class="space-y-3 text-lg">
              <li><RouterLink to="/pricing" class="link">Tarifs</RouterLink></li>
              <li><RouterLink to="/demo" class="link">Demander une démo</RouterLink></li>
            </ul>
          </div>
          <div>
            <p class="label mb-6 text-paper/45">Entreprise</p>
            <ul class="space-y-3 text-lg">
              <li><RouterLink to="/about" class="link">À propos</RouterLink></li>
              <li><RouterLink to="/contact" class="link">Contact</RouterLink></li>
              <li><RouterLink to="/privacy" class="link">Confidentialité</RouterLink></li>
            </ul>
          </div>
        </nav>
      </div>

      <div ref="wordmarkWrap" class="relative mt-20 md:mt-28" aria-hidden="true">
        <p
          class="wordmark display select-none whitespace-nowrap text-paper"
          :class="{ 'is-armed': armed, 'is-in': inView, 'is-done': done }"
        >
          <span
            v-for="(letter, i) in 'MoodFlow'"
            :key="i"
            class="wm-letter"
            :style="{ '--wm-color': letterColors[i % letterColors.length], '--wm-i': i }"
          >{{ letter }}</span>
        </p>
        <SunMark
          class="absolute right-[1%] top-[-6%] w-[13%] min-w-[3.5rem]"
          :ray-colors="['#FED94E', '#FF5BBC']"
          state="very_happy"
        />
      </div>

      <div class="flex flex-col gap-4 border-t border-paper/15 py-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
        <p class="font-mono text-xs uppercase tracking-[0.12em]">&copy; {{ currentYear }} MoodFlow</p>
        <p>
          Codé avec
          <Icon name="heart" class="inline h-4 w-4 -translate-y-px fill-coral text-coral" />
          <span class="sr-only">❤️</span>
          et du Flow par
          <span class="font-semibold text-sun">A</span>bdoul,
          <span class="font-semibold text-coral">M</span>athieu,
          <span class="font-semibold text-lilac">A</span>maury,
          <span class="font-semibold text-tangerine">J</span>erobel et
          <span class="font-semibold text-candy">M</span>ehmet
        </p>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center self-start rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink md:self-auto"
          aria-label="Retour en haut"
          @click="scrollToTop(false)"
        >
          <Icon name="arrow-up" class="h-4 w-4" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
import SunMark from '../brand/SunMark.vue';
import Icon from '../ui/Icon.vue';
import RollText from '../ui/RollText.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { prefersReducedMotion, scrollToTop } from '../../lib/motion';

const letterColors = ['#FED94E', '#FA4D52', '#8248FE', '#FF5BBC', '#5EDDE7', '#FF8944'];
const wordmarkWrap = ref<HTMLElement | null>(null);
const armed = ref(false);
const inView = ref(false);
const done = ref(false);
let observer: IntersectionObserver | null = null;
let doneTimer = 0;

onMounted(() => {
  if (prefersReducedMotion() || !wordmarkWrap.value || typeof IntersectionObserver === 'undefined') return;
  armed.value = true;
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      inView.value = true;
      observer?.disconnect();
      doneTimer = window.setTimeout(() => (done.value = true), 1900);
    },
    { threshold: 0.2 },
  );
  observer.observe(wordmarkWrap.value);
});

onUnmounted(() => {
  observer?.disconnect();
  window.clearTimeout(doneTimer);
});
</script>

<style scoped>
.wordmark {
  font-size: 21vw;
  line-height: 0.78;
  letter-spacing: -0.045em;
  margin-left: -0.04em;
  padding-bottom: 0.08em;
  /* On masque seulement le bas pour la montée des lettres */
  clip-path: inset(-40% -5% 0 -5%);
}

.wm-letter {
  display: inline-block;
  transition:
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    color 0.4s ease;
}

.is-armed .wm-letter {
  transform: translateY(105%);
}

.is-armed.is-in .wm-letter {
  transform: none;
  transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--wm-i) * 60ms);
}

.is-armed.is-done .wm-letter {
  transition:
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    color 0.4s ease;
}

@media (hover: hover) {
  .wordmark:not(.is-armed) .wm-letter:hover,
  .is-done .wm-letter:hover {
    color: var(--wm-color);
    transform: translateY(-0.06em) rotate(-4deg);
  }
}

@media (min-width: 96rem) {
  .wordmark {
    font-size: 20rem;
  }
}
</style>
