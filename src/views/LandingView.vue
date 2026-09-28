<template>
  <div ref="rootEl" class="overflow-x-clip">
    <!-- ============================================================
         HERO
         ============================================================ -->
    <section ref="heroSection" class="relative flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-28 md:pt-32">
      <!-- Le soleil de la marque : il vous regarde -->
      <div
        class="pointer-events-none absolute right-[-16vw] top-20 w-[66vw] sm:right-[-12vw] sm:top-24 sm:w-[60vw] md:right-[-10vw] md:top-1/2 md:w-[52vw] md:-translate-y-[58%] lg:right-[-6vw] lg:w-[44vw]"
      >
        <div ref="heroSunParallax">
          <div ref="heroSunInner">
            <SunMark class="w-full" state="happy" track title="Le soleil MoodFlow" />
          </div>
        </div>
      </div>

      <Icon name="spark" class="hero-spark absolute left-[46%] top-[20%] h-7 w-7 animate-twinkle text-coral" />
      <Icon name="spark" class="hero-spark absolute right-[6%] top-[16%] h-5 w-5 animate-twinkle text-grape [animation-delay:0.8s]" />
      <Icon name="spark" class="hero-spark absolute right-[40%] top-[58%] hidden h-4 w-4 animate-twinkle text-candy [animation-delay:1.6s] md:block" />
      <Icon name="spark" class="hero-spark absolute bottom-[26%] right-[5%] h-8 w-8 animate-twinkle text-sun-deep [animation-delay:2.2s]" />

      <div class="shell relative z-10 flex flex-1 flex-col">
        <p v-reveal class="label text-ink/60">MoodFlow ©2025</p>

        <h1 class="display mt-auto pt-40 text-[clamp(3.4rem,12.4vw,13.75rem)] leading-[0.84] tracking-[-0.055em] md:pt-0">
          <span class="sr-only">MoodFlow, </span>
          <span v-split="{ immediate: true, delay: 0.25 }" class="block">
            Prendre soin<br />
            de <span class="accent text-[1.06em] text-coral">vos équipes</span>
          </span>
        </h1>

        <div class="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p v-reveal="0.55" class="text-pretty text-lg leading-snug text-ink/80 md:col-span-5 md:text-xl lg:col-span-4">
            MoodFlow transforme le bien-être en entreprise avec une approche simple, anonyme et bienveillante
          </p>
          <div v-reveal="0.65" class="flex flex-wrap gap-3 md:col-span-7 md:justify-end lg:col-span-8">
            <button type="button" class="btn btn-ink btn-lg" v-magnetic @click="goToRegister">
              <RollText text="Essayer gratuitement" />
              <span class="btn-dot"><Icon name="arrow-right" /></span>
            </button>
            <button type="button" class="btn btn-outline btn-lg" @click="scrollToFeatures">
              <RollText text="Découvrir" />
            </button>
          </div>
        </div>

        <div class="label mt-12 flex items-center justify-between border-t border-ink/15 pt-5 text-ink/55">
          <span>Simple · Anonyme · Bienveillant</span>
          <span class="hidden items-center gap-2 sm:flex">
            Défiler
            <Icon name="arrow-down" class="h-3.5 w-3.5 animate-bounce" />
          </span>
        </div>
      </div>
    </section>

    <!-- Bandes croisées -->
    <div class="relative z-20 my-6 py-14 md:my-10 md:py-20" aria-hidden="true">
      <div class="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[5deg] bg-grape py-3 text-paper md:py-4">
        <Marquee :speed="48" reverse :repeat="3">
          <template v-for="f in features" :key="`b-${f.title}`">
            <span class="display whitespace-nowrap text-[clamp(1.4rem,3vw,2.6rem)] tracking-[-0.03em]">{{ f.category }}</span>
            <Icon name="spark" class="mx-6 h-5 w-5 text-sun md:mx-9 md:h-6 md:w-6" />
          </template>
        </Marquee>
      </div>
      <div class="relative w-[110%] -translate-x-[4.5%] -rotate-[3deg] bg-coral py-4 text-ink md:py-6">
        <Marquee :speed="36" reactive :repeat="2">
          <template v-for="f in features" :key="`a-${f.title}`">
            <span class="display whitespace-nowrap text-[clamp(2.2rem,5.6vw,5.5rem)] tracking-[-0.045em]">{{ f.title }}</span>
            <Icon name="spark" class="mx-8 h-8 w-8 text-sun md:mx-12 md:h-12 md:w-12" />
          </template>
        </Marquee>
      </div>
    </div>

    <!-- ============================================================
         HUMEUR : la section prend la couleur de l'humeur choisie
         ============================================================ -->
    <section
      class="relative overflow-hidden pb-24 pt-28 transition-colors duration-700 ease-out-expo md:pb-32 md:pt-36"
      :style="{ backgroundColor: currentTheme.bg, color: currentTheme.fg }"
    >
      <div class="shell">
        <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <p class="label mb-8 opacity-70">(01) Humeurs</p>
            <h2 v-split class="display text-display-lg">Comment vous <span class="whitespace-nowrap">sentez-vous ?</span></h2>
            <p v-reveal="0.1" class="mt-8 max-w-xl text-pretty text-xl leading-snug opacity-80 md:text-2xl">
              Sélectionnez votre humeur actuelle pour découvrir des insights personnalisés
            </p>
          </div>
          <div class="flex justify-center lg:col-span-5 lg:justify-end">
            <SunMark
              class="w-[74vw] max-w-[28rem] lg:w-full"
              :state="currentMood.value"
              :disc="currentTheme.disc"
              :ray-colors="currentTheme.rays"
              track
            />
          </div>
        </div>

        <div
          role="radiogroup"
          aria-label="Votre humeur actuelle"
          class="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5"
        >
          <button
            v-for="(mood, i) in moods"
            :key="mood.value"
            :ref="(el) => (moodButtons[i] = el as HTMLButtonElement)"
            type="button"
            role="radio"
            :aria-checked="selectedMoodIndex === i"
            :tabindex="selectedMoodIndex === i ? 0 : -1"
            class="group flex items-center gap-4 rounded-full border py-2.5 pl-2.5 pr-6 text-left transition-[background-color,border-color,color,transform] duration-500 ease-out-expo active:scale-[0.98] lg:flex-col lg:items-start lg:gap-5 lg:rounded-[1.75rem] lg:p-5"
            :class="
              selectedMoodIndex === i
                ? 'border-ink bg-ink text-paper'
                : isDark
                  ? 'border-paper/30 hover:border-paper hover:bg-paper/10'
                  : 'border-ink/20 hover:border-ink hover:bg-white/25'
            "
            @click="selectedMoodIndex = i"
            @keydown="onMoodKeydown($event, i)"
          >
            <MoodFace
              :mood="mood.value"
              class="h-12 w-12 shrink-0 transition-transform duration-500 ease-out-back group-hover:rotate-[-8deg] group-hover:scale-110"
            />
            <span class="min-w-0">
              <span class="block font-display text-lg font-bold leading-tight tracking-[-0.02em]">{{ mood.label }}</span>
              <span class="mt-0.5 block truncate text-xs opacity-70 lg:mt-1.5 lg:whitespace-normal lg:text-sm lg:leading-snug">{{ mood.shortDescription }}</span>
            </span>
          </button>
        </div>

        <div
          class="mt-14 grid gap-10 border-t pt-12 lg:mt-20 lg:grid-cols-12"
          :class="isDark ? 'border-paper/25' : 'border-ink/20'"
          aria-live="polite"
        >
          <div class="lg:col-span-7">
            <Transition name="swap" mode="out-in">
              <div :key="selectedMoodIndex">
                <h3 class="display text-display-md">{{ currentMood.title }}</h3>
                <p class="mt-6 max-w-2xl text-pretty text-lg leading-relaxed opacity-80 md:text-xl">
                  {{ currentMood.description }}
                </p>
              </div>
            </Transition>
          </div>
          <div class="lg:col-span-5">
            <div class="flex items-end justify-between gap-6">
              <span class="label pb-3 opacity-70">Statistiques de l'équipe</span>
              <span class="display text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.8] tracking-[-0.06em]">
                {{ displayedPercentage }}<span class="text-[0.45em] tracking-normal">%</span>
              </span>
            </div>
            <div
              class="mt-6 h-3 overflow-hidden rounded-full"
              :class="isDark ? 'bg-paper/20' : 'bg-ink/10'"
              role="progressbar"
              :aria-valuenow="currentMood.percentage"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-label="`${currentMood.percentage}% de vos collègues`"
            >
              <div
                class="h-full rounded-full transition-[width] duration-1000 ease-out-expo"
                :class="isDark ? 'bg-paper' : 'bg-ink'"
                :style="{ width: `${currentMood.percentage}%` }"
              />
            </div>
            <div class="mt-4 flex flex-col justify-between gap-1 text-sm font-medium opacity-80 sm:flex-row">
              <span>{{ currentMood.percentage }}% de vos collègues</span>
              <span>se sentent {{ currentMood.label.toLowerCase() }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         FONCTIONNALITÉS : cartes empilées
         ============================================================ -->
    <section ref="featuresSection" class="relative scroll-mt-24 pb-10 pt-28 md:pb-24 md:pt-40">
      <div class="shell">
        <div class="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
          <p class="label text-ink/60 md:col-span-12">(02) Fonctionnalités</p>
          <h2 v-split class="display text-display-xl md:col-span-9">L'app bien-être pour chaque moment</h2>
          <p
            class="display hidden text-right text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] tracking-[-0.06em] text-ink/10 md:col-span-3 md:block"
            aria-hidden="true"
          >
            06
          </p>
        </div>

        <div class="flex flex-col gap-5 md:gap-0">
          <article
            v-for="(feature, i) in features"
            :key="feature.title"
            class="feature-card md:sticky md:mb-[18vh] md:last:mb-0"
            :style="{ top: `calc(6.25rem + ${i} * 1.1rem)` }"
          >
            <div
              class="feature-inner relative grid origin-top gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-8 md:min-h-[78svh] md:grid-cols-12 md:rounded-[2.75rem] md:p-10 lg:p-14"
              :style="{ backgroundColor: feature.color }"
              :class="feature.dark ? 'text-paper' : 'text-ink'"
            >
              <div class="relative z-10 flex flex-col md:col-span-7">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="label">{{ String(i + 1).padStart(2, '0') }} / {{ String(features.length).padStart(2, '0') }}</span>
                  <span class="chip" :class="feature.dark ? 'border-paper/30' : 'border-ink/20'">{{ feature.category }}</span>
                </div>
                <h3 class="display mt-12 text-display-lg md:mt-auto">{{ feature.title }}</h3>
                <p class="mt-6 max-w-md text-pretty text-lg leading-snug opacity-85 md:text-xl">
                  {{ feature.description }}
                </p>
                <div class="mt-10">
                  <button
                    type="button"
                    class="btn"
                    :class="feature.dark ? 'btn-sun' : 'btn-ink'"
                    @click="goToRegister"
                  >
                    <RollText text="Découvrir" />
                    <span class="btn-dot"><Icon name="arrow-right" /></span>
                  </button>
                </div>
              </div>

              <div class="relative z-10 flex items-center justify-center md:col-span-5 md:justify-end">
                <video
                  data-lazy-video
                  class="aspect-[2424/3414] w-full max-w-[22rem] rounded-[1.5rem] object-cover ring-1 md:max-w-[calc(min(66svh,44rem)*0.71)] md:rounded-[2rem]"
                  :class="feature.dark ? 'ring-paper/15' : 'ring-ink/10'"
                  muted
                  playsinline
                  loop
                  preload="none"
                  :aria-label="feature.title"
                  data-cursor="Découvrir"
                  :data-cursor-color="feature.dark ? '#FED94E' : '#1A0E2B'"
                  :data-cursor-text="feature.dark ? '#1A0E2B' : '#FFF8EF'"
                  @click="goToRegister"
                >
                  <source :src="feature.video" type="video/mp4" />
                </video>
              </div>

              <div class="feature-shade pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         EXPERTS
         ============================================================ -->
    <section class="relative overflow-hidden bg-blush py-28 md:py-40">
      <div class="shell grid gap-8 md:grid-cols-12 md:items-end">
        <p class="label text-ink/60 md:col-span-12">(03) Témoignages</p>
        <h2 v-split class="display text-display-lg md:col-span-7">Conçu par des experts, livré avec soin</h2>
        <p v-reveal="0.1" class="text-pretty text-lg leading-relaxed text-ink/75 md:col-span-4 md:col-start-9">
          De l'expression libre aux insights en temps réel, notre équipe d'experts en bien-être au travail
          travaille ensemble pour vous apporter des solutions éprouvées.
        </p>
      </div>

      <div class="mt-16 md:mt-24">
        <Marquee :speed="70" :paused="expertCarouselPaused" :repeat="2">
          <article
            v-for="expert in experts"
            :key="expert.name"
            class="mx-2.5 flex w-[80vw] shrink-0 flex-col rounded-[2rem] bg-paper p-3 pb-7 sm:w-[21rem] md:mx-3.5 md:w-[25rem]"
          >
            <div class="aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <img
                :src="expert.image"
                :alt="expert.name"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-top transition-transform duration-1000 ease-out-expo hover:scale-105"
              />
            </div>
            <blockquote class="flex-1 px-3 pt-7 md:px-4">
              <p class="font-serif text-[1.55rem] leading-[1.12] tracking-[-0.01em] md:text-[1.75rem]">
                “{{ expert.testimonial }}”
              </p>
            </blockquote>
            <div class="mt-7 flex items-center justify-between gap-4 border-t border-ink/10 px-3 pt-5 md:px-4">
              <div class="min-w-0">
                <p class="font-display text-lg font-bold leading-tight tracking-[-0.02em]">{{ expert.name }}</p>
                <p class="label mt-2 truncate text-ink/55">{{ expert.role }}</p>
              </div>
              <MoodFace mood="very_happy" class="h-10 w-10 shrink-0" />
            </div>
          </article>
        </Marquee>
      </div>

      <div class="shell mt-10 flex justify-end">
        <button
          type="button"
          class="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out-back hover:scale-110"
          :aria-label="expertCarouselPaused ? 'Reprendre le défilement des témoignages' : 'Mettre en pause le défilement des témoignages'"
          :aria-pressed="expertCarouselPaused"
          @click="toggleExpertCarousel"
        >
          <Icon :name="expertCarouselPaused ? 'play' : 'pause'" class="h-5 w-5" />
        </button>
      </div>
    </section>

    <!-- ============================================================
         ENTREPRISES
         ============================================================ -->
    <section class="py-20 md:py-28">
      <div class="shell flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
        <h3 v-reveal class="display max-w-[12ch] shrink-0 text-display-sm">Ils font confiance à MoodFlow</h3>
        <Marquee
          class="min-w-0 flex-1 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
          :speed="32"
          :repeat="2"
        >
          <div
            v-for="logo in companyLogos"
            :key="logo.name"
            class="mx-8 flex h-10 items-center text-ink/55 transition-colors duration-300 hover:text-ink md:mx-12 md:h-12 [&>svg]:h-full [&>svg]:w-auto"
            :title="logo.name"
            v-html="logo.svg"
          />
        </Marquee>
      </div>
    </section>

    <!-- ============================================================
         CHIFFRES
         ============================================================ -->
    <section class="relative mx-3 overflow-hidden rounded-[2.5rem] bg-grape py-24 text-paper md:mx-5 md:rounded-[3.5rem] md:py-36">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div v-parallax="0.5" class="absolute right-[8%] top-[3%] w-14 md:right-[34%] md:top-[5%] md:w-20">
          <MoodFace mood="very_happy" class="animate-drift" />
        </div>
        <div v-parallax="0.25" class="absolute right-[9%] top-[38%] hidden w-24 md:block">
          <MoodFace mood="happy" class="animate-drift [animation-delay:1.5s]" />
        </div>
        <div v-parallax="0.7" class="absolute bottom-[14%] right-[30%] hidden w-14 md:block">
          <MoodFace mood="neutral" class="animate-drift [animation-delay:3s]" />
        </div>
        <div v-parallax="0.4" class="absolute bottom-[3%] right-[12%] w-12 md:bottom-[8%] md:left-[38%] md:right-auto md:w-16">
          <MoodFace mood="sad" class="animate-drift [animation-delay:2.2s]" />
        </div>
      </div>

      <div class="shell relative z-10">
        <p class="label text-paper/60">(04) En chiffres</p>
        <dl class="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse border-t border-paper/25 pt-6">
            <dt class="label mt-5 text-paper/70">{{ stat.label }}</dt>
            <dd class="display text-[clamp(3.6rem,8.4vw,8.5rem)] leading-[0.82] tracking-[-0.06em]">
              <CountUp :value="stat.value" />
            </dd>
          </div>
        </dl>

        <div class="mt-24 grid gap-10 md:mt-36 md:grid-cols-12 md:items-end">
          <h2 v-split class="display text-display-lg md:col-span-9">
            Rejoignez les milliers qui utilisent MoodFlow chaque jour
          </h2>
          <div class="md:col-span-3 md:flex md:justify-end">
            <button type="button" class="btn btn-sun btn-lg" v-magnetic @click="goToPricing">
              <RollText text="Voir les tarifs" />
              <span class="btn-dot"><Icon name="arrow-right" /></span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CTA : lever de soleil
         ============================================================ -->
    <section ref="ctaSection" class="relative mt-24 overflow-hidden bg-coral pb-40 pt-28 md:mt-32 md:pb-64 md:pt-40">
      <div class="shell relative z-10">
        <p class="label text-ink/70">(05) Démo</p>
        <h2 v-split class="display mt-8 max-w-[13ch] text-display-xl">Prêt à transformer votre <span class="whitespace-nowrap">entreprise ?</span></h2>
        <p v-reveal="0.1" class="mt-8 max-w-xl text-pretty text-xl leading-snug md:text-2xl">
          Découvrez MoodFlow en action avec une démo personnalisée
        </p>
        <button type="button" class="btn btn-ink btn-lg mt-12" v-magnetic="0.4" @click="goToDemo">
          <RollText text="Demander une démo" />
          <span class="btn-dot"><Icon name="arrow-right" /></span>
        </button>
      </div>
      <div
        ref="sunriseEl"
        class="pointer-events-none absolute bottom-[-38vw] right-[-22vw] w-[88vw] md:bottom-[-30vw] md:right-[-6vw] md:w-[62vw]"
        aria-hidden="true"
      >
        <SunMark state="very_happy" :ray-colors="['#1A0E2B', '#FED94E']" :ray-count="26" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import Marquee from '../components/ui/Marquee.vue';
import CountUp from '../components/ui/CountUp.vue';
import { gsap, prefersReducedMotion, scrollToElement } from '../lib/motion';
import type { MoodValue } from '../lib/moods';

// Import des cards vidéo
import expressionLibreVideo from '../assets/feature-cards/Expression libre.mp4';
import insightsVideo from '../assets/feature-cards/Insights en temps réel.mp4';
import actionsVideo from '../assets/feature-cards/Actions ciblées.mp4';
import anonymatVideo from '../assets/feature-cards/Anonymat garanti.mp4';
import simpleVideo from '../assets/feature-cards/Simple d\'utilisation.mp4';
import deploiementVideo from '../assets/feature-cards/Déploiement rapide.mp4';

// Import des images d'experts/utilisateurs (versions allégées)
import alexandreImage from '../assets/card_avis_personne/Alexandre.jpg';
import marieImage from '../assets/card_avis_personne/Marie.jpg';
import sophieImage from '../assets/card_avis_personne/Sophie.jpg';
import thomasImage from '../assets/card_avis_personne/Thomas.jpg';

const router = useRouter();
const rootEl = ref<HTMLElement | null>(null);
const heroSection = ref<HTMLElement | null>(null);
const heroSunParallax = ref<HTMLElement | null>(null);
const heroSunInner = ref<HTMLElement | null>(null);
const featuresSection = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);
const sunriseEl = ref<HTMLElement | null>(null);
const moodButtons = ref<HTMLButtonElement[]>([]);
const selectedMoodIndex = ref(1);

// Expert carousel
const expertCarouselPaused = ref(false);

const INK = '#1A0E2B';
const PAPER = '#FFF8EF';

const moods: {
  value: MoodValue;
  label: string;
  shortDescription: string;
  percentage: number;
  title: string;
  description: string;
}[] = [
  {
    value: 'very_happy',
    label: 'Excellent',
    shortDescription: 'Équipe motivée et productive',
    percentage: 45,
    title: 'Votre équipe est au top',
    description: 'Un climat positif favorise la productivité et l\'innovation. Continuez à cultiver cette dynamique.'
  },
  {
    value: 'happy',
    label: 'Bien',
    shortDescription: 'Ambiance positive au travail',
    percentage: 32,
    title: 'L\'ambiance est bonne',
    description: 'Vos collaborateurs se sentent globalement bien. Quelques ajustements peuvent encore améliorer le quotidien.'
  },
  {
    value: 'neutral',
    label: 'Neutre',
    shortDescription: 'Signaux à surveiller',
    percentage: 15,
    title: 'Une attention nécessaire',
    description: 'Certains signaux neutres méritent d\'être explorés. C\'est le moment d\'écouter vos équipes.'
  },
  {
    value: 'sad',
    label: 'Difficile',
    shortDescription: 'Action immédiate requise',
    percentage: 6,
    title: 'Agir rapidement',
    description: 'Des collaborateurs expriment des difficultés. Un accompagnement bienveillant est recommandé.'
  },
  {
    value: 'very_sad',
    label: 'Très difficile',
    shortDescription: 'Intervention urgente',
    percentage: 2,
    title: 'Intervention urgente',
    description: 'Ces signaux nécessitent une action immédiate. Contactez vos équipes RH ou de soutien psychologique.'
  }
];

// Chaque humeur repeint la section : fond, texte, disque et rayons du soleil
const moodThemes: Record<MoodValue, { bg: string; fg: string; disc: string; rays: string[] }> = {
  very_happy: { bg: '#FED94E', fg: INK, disc: PAPER, rays: ['#FA4D52', '#8248FE'] },
  happy: { bg: '#FF8944', fg: INK, disc: '#FED94E', rays: [INK, PAPER] },
  neutral: { bg: '#CDB8FF', fg: INK, disc: '#FED94E', rays: ['#8248FE', '#FA4D52'] },
  sad: { bg: '#5EDDE7', fg: INK, disc: '#FED94E', rays: ['#8248FE', INK] },
  very_sad: { bg: '#8248FE', fg: PAPER, disc: '#FED94E', rays: [PAPER, '#FF5BBC'] },
};

const currentMood = computed(() => moods[selectedMoodIndex.value]);
const currentTheme = computed(() => moodThemes[currentMood.value.value]);
const isDark = computed(() => currentTheme.value.fg === PAPER);

// Le pourcentage défile jusqu'à sa nouvelle valeur
const displayedPercentage = ref(currentMood.value.percentage);
const percentageCounter = { n: currentMood.value.percentage };

watch(selectedMoodIndex, () => {
  const target = currentMood.value.percentage;
  if (prefersReducedMotion()) {
    displayedPercentage.value = target;
    return;
  }
  gsap.to(percentageCounter, {
    n: target,
    duration: 1,
    ease: 'expo.out',
    overwrite: true,
    onUpdate: () => {
      displayedPercentage.value = Math.round(percentageCounter.n);
    },
  });
});

function onMoodKeydown(event: KeyboardEvent, index: number) {
  const count = moods.length;
  let next = -1;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + count) % count;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = count - 1;
  if (next < 0) return;
  event.preventDefault();
  selectedMoodIndex.value = next;
  moodButtons.value[next]?.focus();
}

// Couleurs reprises du fond de chaque vidéo
const features = [
  {
    video: expressionLibreVideo,
    title: 'Expression libre',
    description: 'Vos équipes partagent leur ressenti quotidien en toute confidentialité, sans jugement.',
    category: 'Communication',
    color: '#FF691C',
    dark: false,
  },
  {
    video: insightsVideo,
    title: 'Insights en temps réel',
    description: 'Comprenez instantanément le climat de votre organisation avec des données claires.',
    category: 'Analytics',
    color: '#8248FE',
    dark: true,
  },
  {
    video: actionsVideo,
    title: 'Actions ciblées',
    description: 'Identifiez rapidement les signaux faibles et agissez avant que ça devienne critique.',
    category: 'Action',
    color: '#FA4D52',
    dark: false,
  },
  {
    video: anonymatVideo,
    title: 'Anonymat garanti',
    description: 'Architecture pensée pour protéger l\'identité de vos collaborateurs. Toujours.',
    category: 'Sécurité',
    color: '#FED64E',
    dark: false,
  },
  {
    video: simpleVideo,
    title: 'Simple d\'utilisation',
    description: 'Pas besoin de formation. Intuitif dès le premier jour, sur mobile et desktop.',
    category: 'UX/UI',
    color: '#FF5BBC',
    dark: false,
  },
  {
    video: deploiementVideo,
    title: 'Déploiement rapide',
    description: 'Opérationnel en quelques minutes. Vos équipes peuvent commencer immédiatement.',
    category: 'Déploiement',
    color: '#FED94E',
    dark: false,
  }
];

const experts = [
  {
    name: 'Sophie Durand',
    role: 'DRH chez Doctolib',
    image: sophieImage,
    testimonial: 'Depuis qu\'on utilise MoodFlow, on a vraiment vu la différence. Les gens osent enfin dire ce qu\'ils ressentent. C\'est devenu un réflexe quotidien.'
  },
  {
    name: 'Thomas Rivière',
    role: 'CEO chez Alan',
    image: thomasImage,
    testimonial: 'Le retour sur investissement est impressionnant. En 3 mois, on a réduit le turnover de 35% et l\'engagement a explosé.'
  },
  {
    name: 'Marie Leclerc',
    role: 'Manager chez Blablacar',
    image: marieImage,
    testimonial: 'L\'interface est tellement simple que tout le monde l\'utilise. Même les plus réticents à la tech. C\'est rare de voir ça.'
  },
  {
    name: 'Alexandre Chen',
    role: 'Head of People chez Qonto',
    image: alexandreImage,
    testimonial: 'MoodFlow nous a permis d\'anticiper des problèmes qu\'on n\'aurait jamais vus autrement. Un vrai game changer.'
  }
];

const stats = [
  { value: '4.8', label: 'Note App Store' },
  { value: '10K+', label: 'Entreprises' },
  { value: '2M+', label: 'Humeurs partagées' },
  { value: '98%', label: 'Satisfaction' },
];

const companyLogos = [
  {
    name: 'Spotify',
    svg: '<svg viewBox="0 0 168 168" class="h-full"><path fill="currentColor" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.802c-1.89 3.072-5.91 4.042-8.98 2.152-22.51-13.836-56.823-17.843-83.448-9.759-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.003zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"/></svg>'
  },
  {
    name: 'Airbnb',
    svg: '<svg viewBox="0 0 24 24" class="h-full"><path fill="currentColor" d="M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z"/></svg>'
  },
  {
    name: 'Stripe',
    svg: '<svg viewBox="0 0 60 25" class="h-full"><path fill="currentColor" fill-rule="evenodd" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 013.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 01-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 01-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 00-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z" clip-rule="evenodd"/></svg>'
  },
  {
    name: 'Notion',
    svg: '<svg viewBox="0 0 24 24" class="h-full"><path fill="currentColor" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>'
  },
  {
    name: 'Figma',
    svg: '<svg viewBox="0 0 200 300" class="h-full"><path fill="currentColor" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/><path fill="currentColor" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/><path fill="currentColor" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/><path fill="currentColor" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/><path fill="currentColor" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/></svg>'
  },
  {
    name: 'Slack',
    svg: '<svg viewBox="0 0 127 127" class="h-full"><path fill="currentColor" d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"/><path fill="currentColor" d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z"/><path fill="currentColor" d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z"/><path fill="currentColor" d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z"/></svg>'
  }
];

const goToRegister = () => {
  router.push('/register');
};

const goToPricing = () => {
  router.push('/pricing');
};

const goToDemo = () => {
  router.push('/demo');
};

const scrollToFeatures = () => {
  scrollToElement(featuresSection.value, -40);
};

const toggleExpertCarousel = () => {
  expertCarouselPaused.value = !expertCarouselPaused.value;
};

// Les vidéos ne se chargent et ne jouent que lorsqu'elles sont à l'écran
let videoObserver: IntersectionObserver | null = null;

function observeVideos() {
  const videos = rootEl.value?.querySelectorAll<HTMLVideoElement>('video[data-lazy-video]');
  if (!videos?.length) return;

  if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    videos.forEach((video) => {
      video.preload = 'metadata';
      video.load();
    });
    return;
  }

  videoObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }
    },
    { threshold: 0.15 },
  );
  videos.forEach((video) => videoObserver?.observe(video));
}

let ctx: gsap.Context | null = null;

onMounted(() => {
  observeVideos();
  if (prefersReducedMotion()) return;

  ctx = gsap.context(() => {
    // Entrée du soleil
    gsap.from(heroSunInner.value, {
      scale: 0.5,
      rotate: -80,
      opacity: 0,
      duration: 1.9,
      ease: 'expo.out',
      delay: 0.1,
    });

    // Le soleil descend doucement quand on quitte le hero
    gsap.to(heroSunParallax.value, {
      yPercent: 22,
      scale: 0.88,
      ease: 'none',
      scrollTrigger: { trigger: heroSection.value, start: 'top top', end: 'bottom top', scrub: true },
    });

    // Cartes empilées : la carte recouverte recule et s'assombrit
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: `top ${100 + (i + 1) * 18}px`,
              scrub: true,
            },
          })
          .to(card.querySelector('.feature-inner'), { scale: 0.9, ease: 'none' }, 0)
          .to(card.querySelector('.feature-shade'), { opacity: 0.35, ease: 'none' }, 0);
      });
    });

    // Lever de soleil sur la section finale
    gsap.fromTo(
      sunriseEl.value,
      { yPercent: 40, rotate: -30 },
      {
        yPercent: 0,
        rotate: 0,
        ease: 'none',
        scrollTrigger: { trigger: ctaSection.value, start: 'top bottom', end: 'bottom bottom', scrub: true },
      },
    );
  }, rootEl.value ?? undefined);
});

onUnmounted(() => {
  ctx?.revert();
  videoObserver?.disconnect();
  gsap.killTweensOf(percentageCounter);
});
</script>

<style scoped>
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.45s var(--ease-out-expo),
    transform 0.6s var(--ease-out-expo);
}

.swap-enter-from {
  opacity: 0;
  transform: translate3d(0, 1.25rem, 0);
}

.swap-leave-to {
  opacity: 0;
  transform: translate3d(0, -0.75rem, 0);
}
</style>
