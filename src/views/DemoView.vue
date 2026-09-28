<template>
  <div ref="rootEl" class="overflow-x-clip">
    <PageHero
      label="Démo"
      subtitle="Découvrez MoodFlow en action avec notre équipe. 30 minutes qui changent tout."
      :indicators="['30 minutes gratuites', 'Démo personnalisée', 'Sans engagement']"
      tone="#CDB8FF"
      mood="very_happy"
      :rays="['#FA4D52', '#1A0E2B']"
    >
      Demander une <span class="accent text-grape">démo</span>
    </PageHero>

    <!-- ============================================================
         MANIFESTE
         ============================================================ -->
    <section class="relative py-24 md:py-40">
      <div class="shell grid gap-10 lg:grid-cols-12">
        <p class="label text-ink/60 lg:col-span-3 lg:pt-4">En 30 minutes</p>
        <p class="display text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.02] tracking-[-0.04em] lg:col-span-9">
          <span v-scrub-words>Pas de présentation générique.</span>
          <MoodFace mood="neutral" class="demo-face" />
          <span v-scrub-words>Nous partons de vos équipes, de vos enjeux et de vos questions,</span>
          <MoodFace mood="happy" class="demo-face" />
          <span v-scrub-words>pour vous montrer ce que MoodFlow change <span class="accent text-grape">dès la première semaine.</span></span>
          <MoodFace mood="very_happy" class="demo-face" />
        </p>
      </div>
    </section>

    <!-- ============================================================
         (01) BÉNÉFICES : grille bento inclinable
         ============================================================ -->
    <section class="pb-24 md:pb-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-8">
            <p class="label text-ink/55">(01) Ce que vous obtiendrez</p>
            <h2 v-split class="display mt-6 text-display-lg">Six raisons de <span class="accent text-coral">réserver</span></h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4">
            Une démo personnalisée, adaptée à votre entreprise et à vos besoins spécifiques.
          </p>
        </div>

        <div class="mt-16 grid gap-3 md:grid-cols-12 md:gap-4">
          <article
            v-for="(benefit, i) in benefits"
            :key="benefit.title"
            v-reveal="(i % 3) * 0.08"
            v-tilt="5"
            class="benefit group relative flex min-h-[19rem] flex-col overflow-hidden rounded-[2rem] p-7 md:min-h-[22rem] md:rounded-[2.5rem] md:p-9"
            :class="[benefit.span, benefit.dark ? 'text-paper' : 'text-ink']"
            :style="{ backgroundColor: benefit.color }"
          >
            <div class="relative z-10 flex items-start justify-between gap-4">
              <span class="label opacity-70">{{ String(i + 1).padStart(2, '0') }} / {{ String(benefits.length).padStart(2, '0') }}</span>
              <span
                class="grid h-14 w-14 shrink-0 place-items-center rounded-full transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110"
                :class="benefit.dark ? 'bg-sun text-ink' : 'bg-ink text-paper'"
              >
                <Icon :name="benefit.icon" class="h-6 w-6" />
              </span>
            </div>

            <!-- Élément graphique propre à chaque carte -->
            <div v-if="benefit.big || benefit.faces" class="pointer-events-none relative z-10 flex flex-1 items-center py-6" aria-hidden="true">
              <p
                v-if="benefit.big"
                class="display text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.8] tracking-[-0.07em] transition-transform duration-700 ease-out-back group-hover:-rotate-3 group-hover:scale-105"
              >
                {{ benefit.big }}
              </p>
              <div v-else-if="benefit.faces" class="flex -space-x-3">
                <span
                  v-for="(m, j) in benefit.faces"
                  :key="m"
                  class="grid h-14 w-14 place-items-center rounded-full bg-paper/70 p-1 transition-transform duration-700 ease-out-back md:h-16 md:w-16"
                  :style="{ transitionDelay: `${j * 50}ms` }"
                  :class="j % 2 ? 'group-hover:-translate-y-2' : 'group-hover:translate-y-2'"
                >
                  <MoodFace :mood="m" />
                </span>
              </div>
            </div>

            <div class="relative z-10 mt-auto" :class="benefit.sun ? 'pt-36 md:max-w-2xl md:pt-16' : ''">
              <h3 class="display text-3xl leading-[0.98] tracking-[-0.035em] md:text-[2.4rem]">{{ benefit.title }}</h3>
              <p class="mt-4 max-w-xl text-pretty leading-relaxed opacity-80 md:text-lg">{{ benefit.description }}</p>
            </div>

            <div
              v-if="benefit.sun"
              class="pointer-events-none absolute -right-10 top-[4.75rem] w-36 opacity-90 md:-bottom-28 md:right-6 md:top-auto md:w-80"
              aria-hidden="true"
            >
              <SunMark state="closed" :ray-colors="['#FED94E', '#FF5BBC']" class="motion-safe:animate-spin-slow" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         (02) DÉROULÉ : frise qui se dessine au défilement
         ============================================================ -->
    <section class="relative overflow-hidden bg-ink py-24 text-paper md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-8">
            <p class="label text-paper/55">(02) Déroulé</p>
            <h2 v-split class="display mt-6 text-display-lg">Comment se passe la <span class="accent text-sun">démo</span></h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-paper/70 md:col-span-4">
            Un processus simple et transparent, du premier message à votre décision.
          </p>
        </div>

        <ol ref="timelineEl" class="relative mt-16 pl-12 md:mt-24 md:pl-24">
          <span class="absolute bottom-0 left-[0.6875rem] top-0 w-[3px] rounded-full bg-paper/10 md:left-[2.4rem]" aria-hidden="true">
            <span ref="timelineFill" class="timeline-fill absolute inset-0 origin-top rounded-full" />
            <span ref="timelineRunner" class="timeline-runner absolute left-1/2 top-full grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sun md:h-8 md:w-8">
              <span class="h-2 w-2 rounded-full bg-ink" />
            </span>
          </span>

          <li
            v-for="(step, index) in timeline"
            :key="step.title"
            :ref="(el) => setStepEl(el as HTMLElement | null, index)"
            class="step relative grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-16"
            :class="{ 'is-reached': reached[index] }"
            :style="{ '--step-color': stepColors[index % stepColors.length] }"
          >
            <span
              class="step-dot absolute -left-12 top-[3.35rem] grid h-[1.6rem] w-[1.6rem] place-items-center rounded-full border-2 md:-left-24 md:top-[4.75rem] md:h-12 md:w-12 md:translate-x-[0.9rem]"
              aria-hidden="true"
            >
              <Icon :name="step.icon" class="hidden h-5 w-5 md:block" />
            </span>

            <p class="step-num display text-[clamp(5.5rem,13vw,12rem)] leading-[0.78] tracking-[-0.07em] md:col-span-5" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </p>

            <div class="step-body min-w-0 md:col-span-7 md:pt-3">
              <div class="flex flex-wrap items-center gap-3">
                <span class="label text-paper/50">Étape {{ String(index + 1).padStart(2, '0') }}</span>
                <span class="chip border-paper/20 text-paper/85">
                  <Icon name="clock" class="h-3.5 w-3.5" />
                  {{ step.duration }}
                </span>
              </div>
              <h3 class="display mt-5 text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[0.98] tracking-[-0.04em]">{{ step.title }}</h3>
              <p class="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-paper/70 md:text-xl">{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============================================================
         (03) FORMULAIRE éditorial
         ============================================================ -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-28">
            <p class="label text-ink/55">(03) Réservation</p>
            <h2 v-split class="display mt-6 text-display-lg">Réservez votre <span class="accent text-grape">démo</span></h2>
            <p v-reveal class="mt-8 max-w-md text-pretty text-xl text-ink/75">
              Remplissez le formulaire et nous vous recontactons sous 24h.
            </p>

            <div v-reveal="0.1" v-tilt="6" class="relative mt-12 max-w-md overflow-hidden rounded-[2rem] bg-sun p-7 md:p-8">
              <div class="flex items-center justify-between gap-4">
                <span class="label text-ink/60">Votre créneau</span>
                <span class="chip border-ink/20 bg-paper/60">
                  <span class="h-2 w-2 rounded-full bg-coral motion-safe:animate-twinkle" />
                  En visio
                </span>
              </div>
              <div class="mt-8 flex items-end justify-between gap-4">
                <p class="display text-[clamp(3.5rem,6vw,5rem)] leading-[0.85] tracking-[-0.06em]">30 min</p>
                <span class="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-paper/70 p-1.5 animate-drift md:h-20 md:w-20" aria-hidden="true">
                  <MoodFace mood="very_happy" />
                </span>
              </div>
              <ul class="mt-6 space-y-3 border-t border-ink/15 pt-6">
                <li v-for="item in slotItems" :key="item" class="flex items-start gap-3">
                  <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-sun">
                    <Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" />
                  </span>
                  <span class="text-ink/80">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form
          ref="formEl"
          v-reveal
          class="min-w-0 rounded-[2.25rem] border border-ink/10 bg-white p-6 sm:p-8 md:rounded-[2.75rem] md:p-12 lg:col-span-7"
          aria-labelledby="demo-form-title"
          @submit.prevent="handleSubmit"
        >
          <div class="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-8">
            <h3 id="demo-form-title" class="display text-3xl tracking-[-0.035em] md:text-4xl">Parlons de vos équipes</h3>
            <span class="label text-ink/45">Réponse sous 24h</span>
          </div>

          <div class="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 [&>*]:min-w-0">
            <div>
              <label for="demo-first-name" class="label flex gap-2 text-ink/60"><span class="text-grape">01</span> Prénom</label>
              <input id="demo-first-name" v-model="form.firstName" type="text" required autocomplete="given-name" class="field-line mt-2">
            </div>
            <div>
              <label for="demo-last-name" class="label flex gap-2 text-ink/60"><span class="text-grape">02</span> Nom</label>
              <input id="demo-last-name" v-model="form.lastName" type="text" required autocomplete="family-name" class="field-line mt-2">
            </div>
            <div class="md:col-span-2">
              <label for="demo-email" class="label flex gap-2 text-ink/60"><span class="text-grape">03</span> Email professionnel</label>
              <input id="demo-email" v-model="form.email" type="email" required autocomplete="email" class="field-line mt-2">
            </div>
            <div class="md:col-span-2">
              <label for="demo-company" class="label flex gap-2 text-ink/60"><span class="text-grape">04</span> Entreprise</label>
              <input id="demo-company" v-model="form.company" type="text" required autocomplete="organization" class="field-line mt-2">
            </div>

            <fieldset class="md:col-span-2">
              <legend class="label flex gap-2 text-ink/60"><span class="text-grape">05</span> Nombre d'employés</legend>
              <div class="mt-5 flex flex-wrap gap-2">
                <label v-for="size in sizes" :key="size.value" class="relative cursor-pointer">
                  <input v-model="form.size" type="radio" name="demo-size" :value="size.value" required class="peer sr-only">
                  <span
                    class="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 font-medium transition-[background-color,border-color,color,transform] duration-300 ease-out-back hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-grape peer-focus-visible:ring-offset-2 active:scale-95"
                  >
                    {{ size.label }}
                  </span>
                </label>
              </div>
            </fieldset>

            <div class="md:col-span-2">
              <label for="demo-phone" class="label flex gap-2 text-ink/60"><span class="text-grape">06</span> Téléphone <span class="text-ink/35">(optionnel)</span></label>
              <input id="demo-phone" v-model="form.phone" type="tel" autocomplete="tel" class="field-line mt-2">
            </div>
            <div class="md:col-span-2">
              <label for="demo-message" class="label flex gap-2 text-ink/60"><span class="text-grape">07</span> Message <span class="text-ink/35">(optionnel)</span></label>
              <textarea
                id="demo-message"
                v-model="form.message"
                rows="4"
                class="field-line mt-2 resize-none"
                placeholder="Dites-nous ce qui vous intéresse le plus…"
              ></textarea>
            </div>
          </div>

          <div class="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" :disabled="submitted" class="btn btn-ink btn-lg w-full sm:w-auto" v-magnetic="0.2">
              <RollText :text="submitted ? 'Demande envoyée !' : 'Réserver ma démo gratuite'" />
              <span class="btn-dot"><Icon :name="submitted ? 'check' : 'arrow-right'" /></span>
            </button>
            <p class="flex items-center gap-2 text-sm text-ink/55">
              <Icon name="lock" class="h-4 w-4 shrink-0" />
              Vos informations restent confidentielles.
            </p>
          </div>

          <div aria-live="polite">
            <p v-if="submitted" class="notice notice-success mt-6">
              Merci ! Votre demande a bien été envoyée, nous revenons vers vous sous 24h.
            </p>
          </div>
        </form>
      </div>
    </section>

    <!-- ============================================================
         (04) PREUVE SOCIALE
         ============================================================ -->
    <section class="relative overflow-hidden bg-blush py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-8">
            <p class="label text-ink/55">(04) Ils nous font confiance</p>
            <h2 v-split class="display mt-6 text-display-lg">Pourquoi nous faire <span class="accent text-coral">confiance</span></h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4">
            Des milliers d'équipes utilisent déjà MoodFlow pour prendre soin de leurs collaborateurs.
          </p>
        </div>

        <dl class="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse border-t border-ink/20 pt-6">
            <dt class="label mt-5 text-ink/60">{{ stat.label }}</dt>
            <dd class="display text-[clamp(3.2rem,7.4vw,7.5rem)] leading-[0.82] tracking-[-0.06em]">
              <CountUp :value="stat.value" />
            </dd>
          </div>
        </dl>

        <div class="mt-16 grid gap-3 md:mt-24 md:grid-cols-12 md:gap-4">
          <figure
            v-reveal
            v-tilt="4"
            class="relative flex flex-col overflow-hidden rounded-[2rem] bg-ink p-7 text-paper md:col-span-7 md:rounded-[2.5rem] md:p-12"
          >
            <Icon name="spark" class="h-8 w-8 text-sun" />
            <blockquote class="mt-8 flex-1">
              <p class="font-serif text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.08] tracking-[-0.01em]">
                “{{ testimonials[0].quote }}”
              </p>
            </blockquote>
            <figcaption class="mt-10 flex items-center gap-4 border-t border-paper/15 pt-6">
              <img :src="testimonials[0].image" :alt="testimonials[0].name" loading="lazy" decoding="async" class="h-14 w-14 rounded-full object-cover object-top">
              <div class="min-w-0">
                <p class="font-display text-lg font-bold leading-tight tracking-[-0.02em]">{{ testimonials[0].name }}</p>
                <p class="label mt-2 text-paper/55">{{ testimonials[0].role }}</p>
              </div>
            </figcaption>
          </figure>

          <div class="grid gap-3 md:col-span-5 md:gap-4">
            <figure
              v-for="(t, i) in testimonials.slice(1)"
              :key="t.name"
              v-reveal="0.1 + i * 0.08"
              v-tilt="5"
              class="flex flex-col rounded-[2rem] bg-paper p-7 md:p-8"
            >
              <blockquote class="flex-1">
                <p class="font-serif text-[1.45rem] leading-[1.12] md:text-[1.6rem]">“{{ t.quote }}”</p>
              </blockquote>
              <figcaption class="mt-7 flex items-center gap-4">
                <img :src="t.image" :alt="t.name" loading="lazy" decoding="async" class="h-12 w-12 rounded-full object-cover object-top">
                <div class="min-w-0">
                  <p class="font-display font-bold leading-tight">{{ t.name }}</p>
                  <p class="label mt-1.5 truncate text-ink/55">{{ t.role }}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        <ul class="mt-3 grid gap-3 md:mt-4 md:grid-cols-3 md:gap-4">
          <li
            v-for="(reason, i) in trust"
            :key="reason.title"
            v-reveal="i * 0.08"
            class="group flex gap-5 rounded-[2rem] border border-ink/10 bg-paper/60 p-6 md:p-7"
          >
            <span
              class="grid h-14 w-14 shrink-0 place-items-center rounded-full transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110"
              :style="{ backgroundColor: reason.color }"
              :class="reason.dark ? 'text-paper' : 'text-ink'"
            >
              <Icon :name="reason.icon" class="h-6 w-6" />
            </span>
            <div class="min-w-0">
              <h3 class="font-display text-xl font-bold leading-tight tracking-[-0.025em]">{{ reason.title }}</h3>
              <p class="mt-2 text-pretty text-ink/70">{{ reason.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============================================================
         CTA
         ============================================================ -->
    <section class="relative overflow-hidden bg-coral pb-40 pt-24 md:pb-56 md:pt-36">
      <div class="shell relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <p class="label text-ink/70">(05) C'est parti</p>
          <h2 v-split class="display mt-8 text-display-xl">Prêt à voir MoodFlow en <span class="whitespace-nowrap">action ?</span></h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug md:text-2xl">
            Rejoignez des milliers d'entreprises qui ont déjà transformé le bien-être au travail.
          </p>
        </div>
        <div v-reveal="0.15" class="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <button type="button" class="btn btn-ink btn-lg" v-magnetic @click="scrollToForm">
            <RollText text="Réserver ma démo" />
            <span class="btn-dot"><Icon name="arrow-up" /></span>
          </button>
          <router-link to="/pricing" class="btn btn-outline btn-lg">
            <RollText text="Voir les tarifs" />
          </router-link>
        </div>
      </div>
      <div class="pointer-events-none absolute -bottom-[18vw] -left-[10vw] w-[56vw] md:w-[34vw]" aria-hidden="true">
        <SunMark state="very_happy" :ray-colors="['#1A0E2B', '#FED94E']" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon from '../components/ui/Icon.vue';
import type { IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import CountUp from '../components/ui/CountUp.vue';
import { gsap, scrollToElement } from '../lib/motion';
import type { MoodValue } from '../lib/moods';

import sophieImage from '../assets/card_avis_personne/Sophie.jpg';
import thomasImage from '../assets/card_avis_personne/Thomas.jpg';
import marieImage from '../assets/card_avis_personne/Marie.jpg';

const rootEl = ref<HTMLElement | null>(null);
const timelineEl = ref<HTMLElement | null>(null);
const timelineFill = ref<HTMLElement | null>(null);
const timelineRunner = ref<HTMLElement | null>(null);
const formEl = ref<HTMLFormElement | null>(null);
let ctx: gsap.Context | null = null;
let mm: gsap.MatchMedia | null = null;

// Étapes de la frise « atteintes » (déjà passées au-dessus du milieu de l'écran)
const reached = ref<boolean[]>([]);
const stepEls: HTMLElement[] = [];
let stepObserver: IntersectionObserver | null = null;

function setStepEl(el: HTMLElement | null, index: number) {
  if (el) stepEls[index] = el;
}

function observeSteps() {
  if (typeof IntersectionObserver === 'undefined') {
    reached.value = stepEls.map(() => true);
    return;
  }
  stepObserver = new IntersectionObserver(
    (entries) => {
      const next = [...reached.value];
      for (const entry of entries) {
        const i = stepEls.indexOf(entry.target as HTMLElement);
        if (i < 0) continue;
        next[i] = entry.isIntersecting || entry.boundingClientRect.top < 0;
      }
      reached.value = next;
    },
    { rootMargin: '0px 0px -45% 0px', threshold: 0 },
  );
  stepEls.forEach((el) => stepObserver?.observe(el));
}

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  observeSteps();

  ctx = gsap.context(() => {
    mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Le fil de la frise se dessine au fil du défilement, avec son curseur
      const scrollTrigger = {
        trigger: timelineEl.value,
        start: 'top 55%',
        end: 'bottom 55%',
        scrub: 0.4,
      };
      gsap.fromTo(timelineFill.value, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger });
      gsap.fromTo(timelineRunner.value, { top: '0%' }, { top: '100%', ease: 'none', scrollTrigger: { ...scrollTrigger } });
    });
  }, rootEl.value ?? undefined);
});

onUnmounted(() => {
  mm?.revert();
  ctx?.revert();
  stepObserver?.disconnect();
});

const submitted = ref(false);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  size: '',
  phone: '',
  message: ''
});

const sizes = [
  { value: '1-50', label: '1-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-1000', label: '201-1000' },
  { value: '1000+', label: '1000+' },
];

const slotItems = [
  'Un expert MoodFlow dédié à votre contexte',
  'Une démonstration sur des cas concrets',
  'Toutes vos questions : sécurité, RGPD, intégrations',
];

const benefits: {
  title: string;
  description: string;
  icon: IconName;
  color: string;
  span: string;
  dark?: boolean;
  big?: string;
  faces?: MoodValue[];
  sun?: boolean;
}[] = [
  {
    title: 'Démo personnalisée',
    description: 'Notre équipe vous montre exactement comment MoodFlow peut s\'adapter à votre organisation et vos besoins spécifiques.',
    icon: 'target',
    color: '#FA4D52',
    span: 'md:col-span-7',
    faces: ['very_happy', 'happy', 'neutral', 'sad'],
  },
  {
    title: 'Setup en 30 minutes',
    description: 'On vous aide à démarrer en moins de 30 minutes, de A à Z. Configuration, formation, premiers pas : tout est inclus.',
    icon: 'zap',
    color: '#FED94E',
    span: 'md:col-span-5',
    big: '30′',
  },
  {
    title: 'Questions & réponses',
    description: 'Toutes vos questions techniques, sécurité, intégrations, RGPD : nous répondons à tout.',
    icon: 'bulb',
    color: '#5EDDE7',
    span: 'md:col-span-6 lg:col-span-4',
    big: '?',
  },
  {
    title: '30 jours d\'essai gratuit',
    description: 'Testez avec vos équipes pendant 30 jours, sans engagement. Si cela ne vous convient pas, nous vous remboursons.',
    icon: 'gift',
    color: '#FF5BBC',
    span: 'md:col-span-6 lg:col-span-4',
    big: '30j',
  },
  {
    title: 'Support dédié',
    description: 'Un account manager dédié pour vous accompagner dans votre transformation et répondre à tous vos besoins.',
    icon: 'lifebuoy',
    color: '#FF8944',
    span: 'md:col-span-12 lg:col-span-4',
    big: '1:1',
  },
  {
    title: 'Sécurité garantie',
    description: 'Découvrez nos mesures de sécurité et de conformité RGPD pour protéger vos données et celles de vos équipes.',
    icon: 'lock',
    color: '#8248FE',
    span: 'md:col-span-12',
    dark: true,
    sun: true,
  },
];

const stepColors = ['#FED94E', '#FF8944', '#CDB8FF', '#5EDDE7', '#FF5BBC'];

const timeline: { icon: IconName; title: string; description: string; duration: string }[] = [
  {
    icon: 'mail',
    title: 'Vous remplissez le formulaire',
    description: 'Quelques informations sur votre entreprise et vos besoins. Simple et rapide.',
    duration: '2 minutes',
  },
  {
    icon: 'calendar',
    title: 'Nous planifions votre démo',
    description: 'Notre équipe vous recontacte sous 24h pour planifier un créneau qui vous convient.',
    duration: 'Sous 24h',
  },
  {
    icon: 'play',
    title: 'Démo personnalisée',
    description: 'Découverte de MoodFlow adaptée à votre contexte, avec exemples concrets et cas d\'usage.',
    duration: '30 minutes',
  },
  {
    icon: 'rocket',
    title: 'Essai gratuit',
    description: 'Vous testez MoodFlow avec vos équipes, accompagnés par notre équipe de support.',
    duration: '30 jours',
  },
  {
    icon: 'check',
    title: 'Décision éclairée',
    description: 'Vous décidez en toute connaissance de cause, avec toutes les informations nécessaires.',
    duration: 'À votre rythme',
  }
];

const stats = [
  { value: '10K+', label: 'Entreprises' },
  { value: '98%', label: 'Satisfaction' },
  { value: '4.8', label: 'Note moyenne' },
  { value: '24h', label: 'Délai de réponse' },
];

const testimonials = [
  {
    name: 'Sophie Durand',
    role: 'DRH chez Doctolib',
    image: sophieImage,
    quote: 'En une démo, l\'équipe avait compris nos enjeux mieux que nous. Trois semaines plus tard, tous nos services partageaient leur humeur.',
  },
  {
    name: 'Thomas Rivière',
    role: 'CEO chez Alan',
    image: thomasImage,
    quote: 'Trente minutes, zéro jargon, des réponses précises sur le RGPD.',
  },
  {
    name: 'Marie Leclerc',
    role: 'Manager chez Blablacar',
    image: marieImage,
    quote: 'L\'essai gratuit a convaincu même les plus sceptiques de l\'équipe.',
  },
];

const trust: { title: string; description: string; icon: IconName; color: string; dark?: boolean }[] = [
  {
    title: 'Garantie satisfait ou remboursé',
    description: 'Si après 30 jours vous n\'êtes pas convaincu, nous vous remboursons intégralement. Aucun risque.',
    icon: 'badge',
    color: '#5EDDE7',
  },
  {
    title: 'Sécurité certifiée',
    description: 'Conformité RGPD, chiffrement de bout en bout, hébergement européen. Vos données sont protégées.',
    icon: 'shield',
    color: '#8248FE',
    dark: true,
  },
  {
    title: 'Support 24/7',
    description: 'Notre équipe est là pour vous accompagner à tout moment. Réponse garantie sous 24h.',
    icon: 'zap',
    color: '#FED94E',
  },
];

const handleSubmit = () => {
  console.log('Demo request:', form.value);
  submitted.value = true;

  setTimeout(() => {
    submitted.value = false;
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      size: '',
      phone: '',
      message: ''
    };
  }, 3000);
};

const scrollToForm = () => {
  const formElement = formEl.value ?? document.querySelector('form');
  if (formElement) {
    scrollToElement(formElement, -110);
  }
};
</script>

<style scoped>
.demo-face {
  display: inline-block;
  width: 0.92em;
  height: 0.92em;
  margin: 0 0.12em;
  vertical-align: -0.12em;
  animation: demo-bob 4s ease-in-out infinite;
}

@keyframes demo-bob {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-0.08em) rotate(6deg); }
}

.timeline-fill {
  background: linear-gradient(180deg, #fed94e, #ff8944 30%, #cdb8ff 55%, #5edde7 78%, #ff5bbc);
}

/* Étapes de la frise : chiffre en contour qui se remplit une fois atteint */
.step-num {
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(255 248 239 / 0.28);
  transition:
    color 0.7s var(--ease-out-expo),
    -webkit-text-stroke-color 0.7s var(--ease-out-expo),
    transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate3d(0, 0.08em, 0);
}

.step.is-reached .step-num {
  color: var(--step-color);
  -webkit-text-stroke-color: transparent;
  transform: none;
}

.step-body {
  opacity: 0.4;
  transform: translate3d(0, 1.25rem, 0);
  transition:
    opacity 0.8s var(--ease-out-expo),
    transform 0.9s var(--ease-out-expo);
}

.step.is-reached .step-body {
  opacity: 1;
  transform: none;
}

.step-dot {
  border-color: rgb(255 248 239 / 0.3);
  background-color: #1a0e2b;
  color: rgb(255 248 239 / 0.5);
  transition:
    background-color 0.5s var(--ease-out-expo),
    border-color 0.5s var(--ease-out-expo),
    color 0.5s var(--ease-out-expo),
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.step.is-reached .step-dot {
  border-color: var(--step-color);
  background-color: var(--step-color);
  color: #1a0e2b;
}

@media (prefers-reduced-motion: reduce) {
  .demo-face { animation: none; }
  .step-num,
  .step-body,
  .step-dot { transition: none; transform: none; }
  .step-body { opacity: 1; }
  .timeline-runner { display: none; }
}
</style>
