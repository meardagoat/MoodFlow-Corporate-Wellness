<template>
  <div class="overflow-x-clip">
    <PageHero
      label="Tarifs"
      subtitle="Des tarifs transparents et flexibles pour toutes les tailles d'entreprise. Commencez gratuitement, évoluez selon vos besoins."
      :indicators="['Essai gratuit 14 jours', 'Sans engagement', 'Support inclus']"
      tone="#FED94E"
      disc="#FFF8EF"
      mood="very_happy"
      :dots="['#8248FE', '#FA4D52', '#11C1DC']"
    >
      Tarifs <span class="accent text-grape">MoodFlow</span>
    </PageHero>

    <!-- Plans -->
    <section class="pb-24 pt-20 md:pb-40 md:pt-28">
      <div class="shell">
        <div class="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <p class="label text-ink/55">(01)</p>

          <div
            class="relative inline-flex rounded-full bg-ink/[0.06] p-1.5"
            role="radiogroup"
            aria-label="Période de facturation"
          >
            <span
              class="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-ink transition-transform duration-500 ease-out-expo"
              :class="billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'"
              aria-hidden="true"
            />
            <button
              type="button"
              role="radio"
              :aria-checked="billingCycle === 'monthly'"
              class="relative z-10 w-36 rounded-full py-3 text-[15px] font-semibold transition-colors duration-300 sm:w-44"
              :class="billingCycle === 'monthly' ? 'text-paper' : 'text-ink'"
              @click="billingCycle = 'monthly'"
            >
              Mensuel
            </button>
            <button
              type="button"
              role="radio"
              :aria-checked="billingCycle === 'yearly'"
              class="relative z-10 flex w-36 items-center justify-center gap-2 rounded-full py-3 text-[15px] font-semibold transition-colors duration-300 sm:w-44"
              :class="billingCycle === 'yearly' ? 'text-paper' : 'text-ink'"
              @click="billingCycle = 'yearly'"
            >
              Annuel
              <span class="rounded-full bg-coral px-2 py-0.5 text-xs font-bold text-ink">-20%</span>
            </button>
          </div>
        </div>

        <div class="mt-14 grid gap-4 lg:grid-cols-3">
          <!-- Starter -->
          <article v-reveal v-tilt="5" class="flex min-w-0 flex-col rounded-[2.25rem] border border-ink/10 bg-white p-7 md:p-10 lg:p-7 xl:p-10">
            <div class="flex items-center justify-between gap-3">
              <h3 class="display text-3xl tracking-[-0.035em]">Starter</h3>
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-aqua xl:h-12 xl:w-12"><Icon name="rocket" class="h-5 w-5" /></span>
            </div>
            <p class="mt-3 text-ink/70">Parfait pour les petites équipes qui commencent</p>
            <div class="mt-10 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <Transition name="price" mode="out-in">
                <span :key="billingCycle" class="display text-6xl xl:text-7xl leading-none tracking-[-0.06em]">{{ billingCycle === 'yearly' ? '€8' : '€10' }}</span>
              </Transition>
              <span class="text-ink/60">/employé/mois</span>
            </div>
            <router-link to="/register" class="btn btn-outline mt-10 w-full">
              <RollText text="Commencer gratuitement" />
            </router-link>
            <ul class="mt-10 space-y-4 border-t border-ink/10 pt-8">
              <li v-for="item in starterFeatures" :key="item" class="flex items-center gap-3">
                <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-aqua"><Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" /></span>
                <span class="text-base xl:text-lg">{{ item }}</span>
              </li>
            </ul>
          </article>

          <!-- Professional -->
          <article v-reveal="0.1" v-tilt="5" class="relative flex min-w-0 flex-col rounded-[2.25rem] bg-grape p-7 text-paper md:p-10 lg:-my-4 lg:p-7 lg:py-12 xl:p-10 xl:py-14">
            <span
              class="absolute -top-4 right-8 inline-flex rotate-[4deg] items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-bold text-ink shadow-[0_10px_30px_-10px_rgba(26,14,43,0.5)]"
            >
              <Icon name="spark" class="h-4 w-4 text-coral" />
              Populaire
            </span>
            <div class="flex items-center justify-between gap-3">
              <h3 class="display text-3xl tracking-[-0.04em] xl:text-4xl">Professional</h3>
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sun text-ink xl:h-12 xl:w-12"><Icon name="zap" class="h-5 w-5" /></span>
            </div>
            <p class="mt-3 text-lg text-paper/80">Pour les entreprises en croissance</p>
            <div class="mt-10 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <Transition name="price" mode="out-in">
                <span :key="billingCycle" class="display text-7xl xl:text-8xl leading-none tracking-[-0.06em]">{{ billingCycle === 'yearly' ? '€16' : '€20' }}</span>
              </Transition>
              <span class="text-paper/70">/employé/mois</span>
            </div>
            <router-link to="/register" class="btn btn-sun mt-10 w-full" v-magnetic="0.15">
              <RollText text="Essayer 30 jours gratuits" />
              <span class="btn-dot hidden xl:grid"><Icon name="arrow-right" /></span>
            </router-link>
            <ul class="mt-10 space-y-4 border-t border-paper/20 pt-8">
              <li v-for="item in professionalFeatures" :key="item" class="flex items-center gap-3">
                <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun text-ink"><Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" /></span>
                <span class="text-base xl:text-lg">{{ item }}</span>
              </li>
            </ul>
          </article>

          <!-- Enterprise -->
          <article v-reveal="0.2" v-tilt="5" class="flex min-w-0 flex-col rounded-[2.25rem] bg-ink p-7 text-paper md:p-10 lg:p-7 xl:p-10">
            <div class="flex items-center justify-between gap-3">
              <h3 class="display text-3xl tracking-[-0.035em]">Enterprise</h3>
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-candy text-ink xl:h-12 xl:w-12"><Icon name="building" class="h-5 w-5" /></span>
            </div>
            <p class="mt-3 text-paper/70">Pour les grandes organisations</p>
            <div class="mt-10">
              <span class="display text-5xl leading-none tracking-[-0.055em] xl:text-6xl">Sur mesure</span>
            </div>
            <router-link to="/contact" class="btn btn-paper mt-10 w-full">
              <RollText text="Nous contacter" />
            </router-link>
            <ul class="mt-10 space-y-4 border-t border-paper/15 pt-8">
              <li v-for="item in enterpriseFeatures" :key="item" class="flex items-center gap-3">
                <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-candy text-ink"><Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" /></span>
                <span class="text-base xl:text-lg">{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Comparaison -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(02)</p>
            <h2 v-split class="display mt-6 text-display-lg">Comparaison des fonctionnalités</h2>
          </div>
          <p v-reveal class="text-pretty text-xl text-ink/75 md:col-span-4 md:col-start-9">
            Découvrez toutes les fonctionnalités incluses dans chaque plan
          </p>
        </div>

        <div v-reveal class="relative mt-16 overflow-x-auto rounded-[2rem] bg-paper" data-lenis-prevent>
          <table class="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr class="border-b border-ink/15">
                <th scope="col" class="label px-6 py-6 text-ink/60 md:px-8">Fonctionnalités</th>
                <th scope="col" class="px-4 py-6 text-center font-display text-lg font-bold">Starter</th>
                <th scope="col" class="bg-grape/10 px-4 py-6 text-center font-display text-lg font-bold text-grape">Professional</th>
                <th scope="col" class="px-4 py-6 text-center font-display text-lg font-bold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="feature in features"
                :key="feature.name"
                class="border-b border-ink/10 transition-colors last:border-0 hover:bg-sun/25"
              >
                <th scope="row" class="px-6 py-5 font-medium md:px-8">{{ feature.name }}</th>
                <td v-for="plan in (['starter', 'professional', 'enterprise'] as const)" :key="plan" class="px-4 py-5 text-center" :class="plan === 'professional' ? 'bg-grape/10' : ''">
                  <span v-if="feature[plan]" class="inline-grid h-7 w-7 place-items-center rounded-full bg-ink text-paper">
                    <Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" />
                    <span class="sr-only">Inclus</span>
                  </span>
                  <span v-else class="text-ink/25">—<span class="sr-only">Non inclus</span></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="label text-ink/55">(03)</p>
          <h2 v-split class="display mt-6 text-display-lg lg:text-display-md">Questions fréquentes</h2>
        </div>
        <div class="lg:col-span-8">
          <FaqList :items="faqs" :open="openFaqs" @toggle="toggleFaq" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-grape pb-36 pt-24 text-paper md:pb-48 md:pt-36">
      <div class="shell relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <h2 v-split class="display text-display-xl">Prêt à <span class="whitespace-nowrap">commencer ?</span></h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug text-paper/85 md:text-2xl">
            Rejoignez des milliers d'entreprises qui ont déjà transformé leur bien-être au travail
          </p>
        </div>
        <div v-reveal="0.15" class="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <router-link to="/demo" class="btn btn-sun btn-lg" v-magnetic>
            <RollText text="Essayer gratuitement" />
            <span class="btn-dot"><Icon name="arrow-right" /></span>
          </router-link>
          <router-link to="/contact" class="btn btn-outline-light btn-lg">
            <RollText text="Nous contacter" />
          </router-link>
        </div>
      </div>
      <div class="pointer-events-none absolute -bottom-[20vw] -right-[8vw] w-[60vw] md:w-[36vw]" aria-hidden="true">
        <SunMark state="very_happy" :ray-colors="['#FED94E', '#FF5BBC']" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import FaqList from '../components/site/FaqList.vue';
import SunMark from '../components/brand/SunMark.vue';
import Icon from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const billingCycle = ref('monthly');
const openFaqs = ref<number[]>([]);

const starterFeatures = [
  'Jusqu\'à 50 employés',
  'Expression libre anonyme',
  'Dashboard de base',
  'Support email',
  'Rapports mensuels',
];

const professionalFeatures = [
  'Jusqu\'à 500 employés',
  'Tout Starter +',
  'Insights en temps réel',
  'Actions ciblées',
  'Support prioritaire',
  'Rapports hebdomadaires',
  'Intégrations API',
];

const enterpriseFeatures = [
  'Employés illimités',
  'Tout Professional +',
  'Déploiement sur site',
  'Support dédié 24/7',
  'Formation personnalisée',
  'SLA garantie',
  'Conformité avancée',
];

const features = [
  { name: 'Expression libre anonyme', starter: true, professional: true, enterprise: true },
  { name: 'Dashboard de base', starter: true, professional: true, enterprise: true },
  { name: 'Rapports mensuels', starter: true, professional: true, enterprise: true },
  { name: 'Support email', starter: true, professional: true, enterprise: true },
  { name: 'Insights en temps réel', starter: false, professional: true, enterprise: true },
  { name: 'Actions ciblées', starter: false, professional: true, enterprise: true },
  { name: 'Support prioritaire', starter: false, professional: true, enterprise: true },
  { name: 'Rapports hebdomadaires', starter: false, professional: true, enterprise: true },
  { name: 'Intégrations API', starter: false, professional: true, enterprise: true },
  { name: 'Déploiement sur site', starter: false, professional: false, enterprise: true },
  { name: 'Support dédié 24/7', starter: false, professional: false, enterprise: true },
  { name: 'Formation personnalisée', starter: false, professional: false, enterprise: true },
  { name: 'SLA garantie', starter: false, professional: false, enterprise: true },
  { name: 'Conformité avancée', starter: false, professional: false, enterprise: true }
];

const faqs = [
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement et nous ajustons la facturation en conséquence.'
  },
  {
    question: 'Y a-t-il des frais de configuration ?',
    answer: 'Non, il n\'y a aucun frais de configuration. Vous payez uniquement le montant mensuel ou annuel selon votre plan choisi.'
  },
  {
    question: 'Que se passe-t-il si je dépasse le nombre d\'employés de mon plan ?',
    answer: 'Nous vous contacterons pour discuter de l\'upgrade de votre plan. En attendant, vous pouvez continuer à utiliser MoodFlow sans interruption.'
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument. Nous utilisons un chiffrement de bout en bout, hébergeons nos serveurs en Europe et sommes conformes au RGPD. Vos données ne sont jamais partagées avec des tiers.'
  },
  {
    question: 'Puis-je annuler à tout moment ?',
    answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Aucun frais d\'annulation ne s\'applique.'
  },
  {
    question: 'Offrez-vous des remises pour les organisations à but non lucratif ?',
    answer: 'Oui, nous offrons des tarifs préférentiels pour les organisations à but non lucratif et les établissements d\'enseignement. Contactez-nous pour plus d\'informations.'
  }
];

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};
</script>

<style scoped>
.price-enter-active,
.price-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.45s var(--ease-out-expo);
}

.price-enter-from {
  opacity: 0;
  transform: translate3d(0, 40%, 0);
}

.price-leave-to {
  opacity: 0;
  transform: translate3d(0, -40%, 0);
}
</style>
