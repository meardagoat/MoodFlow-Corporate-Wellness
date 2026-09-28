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

        <nav class="grid grid-cols-2 gap-10 md:col-span-5 md:col-start-8" aria-label="Pied de page">
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

      <div class="relative mt-20 md:mt-28" aria-hidden="true">
        <p class="wordmark display select-none whitespace-nowrap text-paper">MoodFlow</p>
        <SunMark
          class="absolute right-[1%] top-[-6%] w-[13%] min-w-[3.5rem]"
          :ray-colors="['#FED94E', '#FF5BBC']"
          state="very_happy"
        />
      </div>

      <div class="flex flex-col gap-4 border-t border-paper/15 py-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
        <p class="font-mono text-xs uppercase tracking-[0.12em]">&copy; 2025 MoodFlow</p>
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
import SunMark from '../brand/SunMark.vue';
import Icon from '../ui/Icon.vue';
import RollText from '../ui/RollText.vue';
import { scrollToTop } from '../../lib/motion';
</script>

<style scoped>
.wordmark {
  font-size: 21.6vw;
  line-height: 0.78;
  letter-spacing: -0.06em;
  margin-left: -0.04em;
  padding-bottom: 0.08em;
}

@media (min-width: 96rem) {
  .wordmark {
    font-size: 20.4rem;
  }
}
</style>
