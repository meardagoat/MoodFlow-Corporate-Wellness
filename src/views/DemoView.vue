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

    <!-- Ce que vous obtiendrez -->
    <section class="py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(01)</p>
            <h2 v-split class="display mt-6 text-display-lg">Ce que vous obtiendrez</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4 md:col-start-9">
            Une démo personnalisée adaptée à votre entreprise et vos besoins spécifiques
          </p>
        </div>

        <div class="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(benefit, i) in benefits"
            :key="benefit.title"
            v-reveal="(i % 3) * 0.08"
            class="group flex min-h-[20rem] flex-col rounded-[2rem] p-7 md:p-9"
            :style="{ backgroundColor: benefit.color }"
            :class="benefit.dark ? 'text-paper' : 'text-ink'"
          >
            <div class="flex items-start justify-between">
              <span class="label opacity-70">{{ String(i + 1).padStart(2, '0') }}</span>
              <span
                class="grid h-14 w-14 place-items-center rounded-full transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110"
                :class="benefit.dark ? 'bg-sun text-ink' : 'bg-ink text-paper'"
              >
                <Icon :name="benefit.icon" class="h-6 w-6" />
              </span>
            </div>
            <h3 class="display mt-auto text-3xl leading-tight tracking-[-0.035em]">{{ benefit.title }}</h3>
            <p class="mt-4 text-pretty leading-relaxed opacity-80">{{ benefit.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Comment ça se passe -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <p class="label text-ink/55">(02)</p>
            <h2 v-split class="display mt-6 text-display-lg">Comment ça se passe</h2>
            <p v-reveal class="mt-8 max-w-md text-pretty text-xl text-ink/75">
              Un processus simple et transparent pour découvrir MoodFlow
            </p>
          </div>
        </div>

        <ol ref="timelineEl" class="relative lg:col-span-7">
          <span class="absolute bottom-6 left-[1.6875rem] top-6 w-0.5 rounded-full bg-ink/10" aria-hidden="true" />
          <span
            ref="timelineFill"
            class="absolute bottom-6 left-[1.6875rem] top-6 w-0.5 origin-top rounded-full bg-grape"
            aria-hidden="true"
          />
          <li
            v-for="(step, index) in timeline"
            :key="index"
            v-reveal="0.05"
            class="relative flex gap-6 pb-12 last:pb-0 md:gap-8"
          >
            <span
              class="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-paper-deep"
              :style="{ backgroundColor: stepColors[index % stepColors.length] }"
            >
              <Icon :name="step.icon" class="h-6 w-6" />
            </span>
            <div class="flex-1 rounded-[1.75rem] bg-paper p-6 md:p-8">
              <p class="label text-ink/45">Étape {{ String(index + 1).padStart(2, '0') }}</p>
              <h3 class="display mt-3 text-2xl leading-tight tracking-[-0.03em] md:text-3xl">{{ step.title }}</h3>
              <p class="mt-3 text-pretty text-lg text-ink/70">{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Formulaire -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="label text-ink/55">(03)</p>
          <h2 v-split class="display mt-6 text-display-lg">Réservez votre démo</h2>
          <p v-reveal class="mt-8 max-w-md text-pretty text-xl text-ink/75">
            Remplissez le formulaire et on vous recontacte sous 24h
          </p>
          <div class="mt-12 hidden w-40 lg:block" aria-hidden="true">
            <MoodFace mood="very_happy" class="animate-drift" />
          </div>
        </div>

        <form v-reveal class="min-w-0 scroll-mt-28 rounded-[2.25rem] bg-lilac p-7 md:p-12 lg:col-span-7" @submit.prevent="handleSubmit">
          <div class="grid gap-x-8 gap-y-9 md:grid-cols-2 [&>div]:min-w-0">
            <div>
              <label for="demo-first-name" class="label text-ink/60">Prénom</label>
              <input id="demo-first-name" v-model="form.firstName" type="text" required autocomplete="given-name" class="field-line mt-2">
            </div>
            <div>
              <label for="demo-last-name" class="label text-ink/60">Nom</label>
              <input id="demo-last-name" v-model="form.lastName" type="text" required autocomplete="family-name" class="field-line mt-2">
            </div>
            <div class="md:col-span-2">
              <label for="demo-email" class="label text-ink/60">Email professionnel</label>
              <input id="demo-email" v-model="form.email" type="email" required autocomplete="email" class="field-line mt-2">
            </div>
            <div>
              <label for="demo-company" class="label text-ink/60">Entreprise</label>
              <input id="demo-company" v-model="form.company" type="text" required autocomplete="organization" class="field-line mt-2">
            </div>
            <div>
              <label for="demo-size" class="label text-ink/60">Nombre d'employés</label>
              <select id="demo-size" v-model="form.size" required class="field-line mt-2">
                <option value="">Choisir…</option>
                <option value="1-50">1-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="201-1000">201-1000 employés</option>
                <option value="1000+">1000+ employés</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label for="demo-phone" class="label text-ink/60">Téléphone (optionnel)</label>
              <input id="demo-phone" v-model="form.phone" type="tel" autocomplete="tel" class="field-line mt-2">
            </div>
            <div class="md:col-span-2">
              <label for="demo-message" class="label text-ink/60">Message (optionnel)</label>
              <textarea
                id="demo-message"
                v-model="form.message"
                rows="4"
                class="field-line mt-2 resize-none"
                placeholder="Dites-nous ce qui vous intéresse le plus..."
              ></textarea>
            </div>
          </div>

          <button type="submit" :disabled="submitted" class="btn btn-ink btn-lg mt-12 w-full sm:w-auto" v-magnetic="0.2">
            <RollText :text="submitted ? '🎉 Demande envoyée !' : 'Réserver ma démo gratuite'" />
            <span v-if="!submitted" class="btn-dot"><Icon name="arrow-right" /></span>
          </button>
        </form>
      </div>
    </section>

    <!-- Confiance -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <p class="label text-ink/55">(04)</p>
        <h2 v-split class="display mt-6 max-w-[16ch] text-display-lg">Pourquoi nous faire confiance</h2>
        <div class="mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <article
            v-for="(reason, i) in trust"
            :key="reason.title"
            v-reveal="i * 0.1"
            class="border-t-2 pt-8"
            :style="{ borderColor: reason.color }"
          >
            <span class="grid h-14 w-14 place-items-center rounded-full" :style="{ backgroundColor: reason.color }">
              <Icon :name="reason.icon" class="h-6 w-6" :class="reason.dark ? 'text-paper' : 'text-ink'" />
            </span>
            <h3 class="display mt-8 text-2xl leading-tight tracking-[-0.03em]">{{ reason.title }}</h3>
            <p class="mt-4 text-pretty text-lg text-ink/70">{{ reason.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-coral pb-36 pt-24 md:pb-48 md:pt-36">
      <div class="shell relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <h2 v-split class="display text-display-xl">Prêt à voir MoodFlow en <span class="whitespace-nowrap">action ?</span></h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug md:text-2xl">
            Rejoignez des milliers d'entreprises qui ont déjà transformé leur bien-être au travail
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
import { gsap, prefersReducedMotion, scrollToElement } from '../lib/motion';

const rootEl = ref<HTMLElement | null>(null);
const timelineEl = ref<HTMLElement | null>(null);
const timelineFill = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (prefersReducedMotion()) return;
  ctx = gsap.context(() => {
    // Le fil de la frise se remplit au fil du défilement
    gsap.fromTo(
      timelineFill.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: timelineEl.value, start: 'top 70%', end: 'bottom 70%', scrub: true },
      },
    );
  }, rootEl.value ?? undefined);
});

onUnmounted(() => {
  ctx?.revert();
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

const benefits: { title: string; description: string; icon: IconName; color: string; dark?: boolean }[] = [
  {
    title: 'Démo personnalisée',
    description: 'Notre équipe vous montre exactement comment MoodFlow peut s\'adapter à votre organisation et vos besoins spécifiques.',
    icon: 'target',
    color: '#FA4D52',
  },
  {
    title: 'Setup en 30 minutes',
    description: 'On vous aide à démarrer en moins de 30 minutes, de A à Z. Configuration, formation, premiers pas... tout est inclus.',
    icon: 'zap',
    color: '#FED94E',
  },
  {
    title: 'Questions & Réponses',
    description: 'Toutes vos questions techniques, sécurité, intégrations, RGPD... on répond à tout. Aucune question n\'est bête.',
    icon: 'bulb',
    color: '#5EDDE7',
  },
  {
    title: '30 jours d\'essai gratuit',
    description: 'Testez avec vos équipes pendant 30 jours, sans engagement. Si ça ne vous convient pas, on vous rembourse.',
    icon: 'gift',
    color: '#FF5BBC',
  },
  {
    title: 'Support dédié',
    description: 'Un account manager dédié pour vous accompagner dans votre transformation et répondre à tous vos besoins.',
    icon: 'lifebuoy',
    color: '#FF8944',
  },
  {
    title: 'Sécurité garantie',
    description: 'Découvrez nos mesures de sécurité et conformité RGPD pour protéger vos données et celles de vos équipes.',
    icon: 'lock',
    color: '#8248FE',
    dark: true,
  },
];

const stepColors = ['#FED94E', '#FF8944', '#CDB8FF', '#5EDDE7', '#FF5BBC'];

const timeline: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'mail',
    title: 'Vous remplissez le formulaire',
    description: 'Quelques informations sur votre entreprise et vos besoins. Simple et rapide.'
  },
  {
    icon: 'calendar',
    title: 'On planifie votre démo',
    description: 'Notre équipe vous recontacte sous 24h pour planifier un créneau qui vous convient.'
  },
  {
    icon: 'play',
    title: 'Démo personnalisée (30 min)',
    description: 'Découverte de MoodFlow adaptée à votre contexte, avec exemples concrets et cas d\'usage.'
  },
  {
    icon: 'rocket',
    title: 'Essai gratuit 30 jours',
    description: 'Vous testez MoodFlow avec vos équipes, accompagné par notre équipe de support.'
  },
  {
    icon: 'check',
    title: 'Décision éclairée',
    description: 'Vous décidez en toute connaissance de cause, avec toutes les informations nécessaires.'
  }
];

const trust: { title: string; description: string; icon: IconName; color: string; dark?: boolean }[] = [
  {
    title: 'Garantie satisfait ou remboursé',
    description: 'Si après 30 jours vous n\'êtes pas convaincu, on vous rembourse intégralement. Aucun risque.',
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
  const formElement = document.querySelector('form');
  if (formElement) {
    scrollToElement(formElement, -110);
  }
};
</script>
