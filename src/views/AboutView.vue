<template>
  <div class="overflow-x-clip">
    <PageHero
      label="À propos"
      subtitle="Notre mission est de fournir à chaque entreprise un accès à un support continu pour le bien-être mental de ses équipes."
      :indicators="['Bien-être mental', 'Support continu', 'Équipes saines']"
      tone="#FFE3D8"
      mood="very_happy"
    >
      À propos de <span class="accent text-coral">MoodFlow</span>
    </PageHero>

    <!-- Qui nous sommes -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-7">
          <p class="label text-ink/55">(01)</p>
          <h2 v-split class="display mt-6 text-display-lg">Qui nous sommes</h2>
          <div class="mt-10 max-w-2xl space-y-6 text-pretty text-xl leading-relaxed text-ink/80">
            <p v-reveal>
              Considérez MoodFlow comme votre guide de confiance pour un meilleur bien-être en entreprise.
              Nous sommes là pour vous, quand vous en avez besoin, où que vous soyez, vous aidant à traverser
              les moments difficiles et à trouver la joie dans chaque journée de travail.
            </p>
            <p v-reveal="0.1">
              Notre équipe d'experts va des cliniciens en santé mentale aux développeurs primés,
              travaillant ensemble pour aider des milliers d'entreprises dans le monde à être plus saines et productives.
            </p>
          </div>

          <dl class="mt-14 grid max-w-xl grid-cols-2 gap-6">
            <div v-reveal class="border-t-2 border-coral pt-5">
              <dd class="display text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.05em]"><CountUp value="1000+" /></dd>
              <dt class="label mt-4 text-ink/60">Entreprises</dt>
            </div>
            <div v-reveal="0.1" class="border-t-2 border-grape pt-5">
              <dd class="display text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.05em]"><CountUp value="50K+" /></dd>
              <dt class="label mt-4 text-ink/60">Employés</dt>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-5">
          <div
            v-reveal="{ variant: 'scale' }"
            class="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-sun p-8 md:p-10"
          >
            <p class="label">Notre Mission</p>
            <SunMark
              class="mx-auto w-[70%] transition-transform duration-1000 ease-out-expo group-hover:scale-105"
              state="very_happy"
              disc="#FFF8EF"
              track
            />
            <div>
              <h3 class="display text-display-sm">Notre Mission</h3>
              <p class="mt-3 text-lg text-ink/75">Transformer le bien-être en entreprise</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ce que nous faisons -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div class="order-2 lg:order-1 lg:col-span-5">
          <div
            v-reveal="{ variant: 'scale' }"
            class="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-lilac p-8 md:p-10"
          >
            <p class="label">Notre Approche</p>
            <div class="relative mx-auto grid w-[62%] place-items-center">
              <div class="absolute inset-0 rounded-full border-2 border-dashed border-ink/25 motion-safe:animate-spin-slower" />
              <div class="absolute inset-[16%] rounded-full bg-grape" />
              <div class="absolute inset-[34%] rounded-full bg-coral" />
              <div class="absolute inset-[45%] rounded-full bg-sun" />
              <div class="aspect-square w-full" />
            </div>
            <div>
              <h3 class="display text-display-sm">Notre Approche</h3>
              <p class="mt-3 text-lg text-ink/75">Solutions éprouvées et personnalisées</p>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <p class="label text-ink/55">(02)</p>
          <h2 v-split class="display mt-6 text-display-lg">Ce que nous faisons</h2>
          <p v-reveal class="mt-10 text-pretty text-xl leading-relaxed text-ink/80">
            Grâce à des outils d'expression libre et de mindfulness basés sur des preuves,
            du coaching en santé mentale et des insights en temps réel, MoodFlow vous aide
            à créer des habitudes transformatrices pour soutenir le bien-être mental de vos équipes
            et trouver un environnement de travail plus sain et plus heureux.
          </p>
          <ol class="mt-12 border-t border-ink/15">
            <li
              v-for="(item, i) in approach"
              :key="item"
              v-reveal="i * 0.08"
              class="flex items-baseline gap-6 border-b border-ink/15 py-5"
            >
              <span class="label w-8 text-coral">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="font-display text-2xl font-bold tracking-[-0.025em]">{{ item }}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Comment nous procédons -->
    <section class="py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(03)</p>
            <h2 v-split class="display mt-6 text-display-lg">Comment nous procédons</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4 md:col-start-9">
            Nos quatre valeurs guident nos décisions et notre façon d'opérer au quotidien
          </p>
        </div>

        <div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(value, i) in values"
            :key="value.title"
            v-reveal="i * 0.08"
            class="group flex min-h-[22rem] flex-col rounded-[2rem] p-7 transition-transform duration-700 ease-out-expo hover:-translate-y-2 hover:rotate-[-1deg]"
            :style="{ backgroundColor: value.color }"
          >
            <div class="flex items-start justify-between">
              <span class="display text-6xl leading-none tracking-[-0.06em]">{{ String(i + 1).padStart(2, '0') }}</span>
              <Icon :name="value.icon" class="h-7 w-7 transition-transform duration-700 ease-out-expo group-hover:rotate-12" />
            </div>
            <h3 class="display mt-auto text-2xl leading-tight tracking-[-0.03em]">{{ value.title }}</h3>
            <p class="mt-3 text-pretty text-ink/75">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- MoodFlow en chiffres -->
    <section class="relative mx-3 overflow-hidden rounded-[2.5rem] bg-ink py-24 text-paper md:mx-5 md:rounded-[3.5rem] md:py-36">
      <div class="shell">
        <p class="label text-paper/55">(04)</p>
        <h2 v-split class="display mt-6 text-display-lg">MoodFlow en chiffres</h2>
        <dl class="mt-16 grid gap-y-12 md:grid-cols-3 md:gap-x-8">
          <div v-for="(figure, i) in figures" :key="figure.label" v-reveal="i * 0.1" class="flex flex-col-reverse border-t border-paper/20 pt-6">
            <dt class="label mt-5 text-paper/60">{{ figure.label }}</dt>
            <dd class="display text-[clamp(4rem,10vw,9rem)] leading-[0.82] tracking-[-0.06em]" :style="{ color: figure.color }">
              <CountUp :value="figure.value" />
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Résultats basés sur des preuves -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="label text-ink/55">(05)</p>
          <h2 v-split class="display mt-6 text-display-lg">Résultats basés sur des preuves</h2>
        </div>
        <ul class="lg:col-span-7">
          <li
            v-for="(outcome, i) in outcomes"
            :key="outcome.label"
            v-reveal="i * 0.08"
            class="outcome border-b border-ink/15 py-6 first:pt-0"
          >
            <div class="flex items-end justify-between gap-6">
              <span class="text-lg font-medium md:text-xl">{{ outcome.label }}</span>
              <span class="display text-5xl leading-none tracking-[-0.05em] md:text-6xl">{{ outcome.value }}%</span>
            </div>
            <div class="mt-4 h-2.5 overflow-hidden rounded-full bg-ink/[0.07]">
              <div
                class="outcome-bar h-full origin-left rounded-full"
                :style="{ width: `${outcome.value}%`, backgroundColor: outcome.color, transitionDelay: `${0.25 + i * 0.08}s` }"
              />
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- Équipe dirigeante -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <p class="label text-ink/55">(06)</p>
        <h2 v-split class="display mt-6 text-display-lg">Notre équipe dirigeante</h2>
        <div class="mt-16 grid gap-4 md:grid-cols-3">
          <article
            v-for="(member, index) in leadership"
            :key="index"
            v-reveal="index * 0.1"
            class="rounded-[2rem] bg-paper p-7 md:p-8"
          >
            <div
              class="display grid h-24 w-24 place-items-center rounded-full text-5xl"
              :style="{ backgroundColor: avatarColors[index % avatarColors.length].bg, color: avatarColors[index % avatarColors.length].fg }"
            >
              {{ member.initial }}
            </div>
            <h3 class="display mt-10 text-3xl tracking-[-0.035em]">{{ member.name }}</h3>
            <p class="label mt-3 text-coral">{{ member.role }}</p>
            <p class="mt-5 text-pretty text-ink/70">{{ member.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Notre équipe -->
    <section class="py-24 md:py-40">
      <div class="shell">
        <p class="label text-ink/55">(07)</p>
        <h2 v-split class="display mt-6 text-display-lg">Notre équipe</h2>
        <ul class="mt-16 border-t border-ink/15">
          <li
            v-for="(member, index) in team"
            :key="index"
            v-reveal="index * 0.06"
            class="group grid items-center gap-3 border-b border-ink/15 py-7 md:grid-cols-12 md:gap-6"
          >
            <div class="flex items-center gap-5 md:col-span-5">
              <span
                class="display grid h-14 w-14 shrink-0 place-items-center rounded-full text-2xl transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110"
                :style="{ backgroundColor: avatarColors[(index + 1) % avatarColors.length].bg, color: avatarColors[(index + 1) % avatarColors.length].fg }"
              >
                {{ member.initial }}
              </span>
              <span class="display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-[-0.045em]">{{ member.name }}</span>
            </div>
            <p class="label text-coral md:col-span-3">{{ member.role }}</p>
            <p class="text-pretty text-ink/70 md:col-span-4">{{ member.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-sun pb-36 pt-24 md:pb-48 md:pt-36">
      <div class="shell relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <h2 v-split class="display text-display-xl">Rejoignez l'aventure MoodFlow</h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug md:text-2xl">
            Découvrez comment MoodFlow peut transformer votre entreprise et le bien-être de vos équipes
          </p>
        </div>
        <div v-reveal="0.15" class="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <router-link to="/demo" class="btn btn-ink btn-lg" v-magnetic>
            <RollText text="Demander une démo" />
            <span class="btn-dot"><Icon name="arrow-right" /></span>
          </router-link>
          <router-link to="/contact" class="btn btn-outline btn-lg">
            <RollText text="Nous contacter" />
          </router-link>
        </div>
      </div>
      <div class="pointer-events-none absolute -bottom-[16vw] -left-[10vw] w-[46vw] md:w-[30vw]" aria-hidden="true">
        <MoodFace mood="very_happy" color="#FF8944" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import CountUp from '../components/ui/CountUp.vue';

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const approach = [
  'Expression libre et anonyme',
  'Insights en temps réel',
  'Actions ciblées et personnalisées',
];

const values: { title: string; description: string; icon: IconName; color: string }[] = [
  {
    title: 'Faire compter la mission',
    description: 'Chaque décision est guidée par notre mission de transformer le bien-être en entreprise.',
    icon: 'target',
    color: '#FF8944',
  },
  {
    title: 'Itérer vers l\'excellence',
    description: 'Nous améliorons constamment nos solutions basées sur vos retours.',
    icon: 'repeat',
    color: '#CDB8FF',
  },
  {
    title: 'Assumer le résultat',
    description: 'Nous nous engageons pleinement dans le succès de votre transformation.',
    icon: 'flag',
    color: '#5EDDE7',
  },
  {
    title: 'Se connecter avec courage',
    description: 'Nous créons des liens authentiques avec nos clients et leurs équipes.',
    icon: 'heart',
    color: '#FF5BBC',
  },
];

const figures = [
  { value: '200+', label: 'Entreprises dans le monde', color: '#FED94E' },
  { value: '100K+', label: 'Vies transformées', color: '#FF5BBC' },
  { value: '70K+', label: 'Téléchargements d\'app', color: '#5EDDE7' },
];

const outcomes = [
  { value: 32, label: 'Réduction du stress', color: '#FA4D52' },
  { value: 14, label: 'Amélioration de l\'engagement', color: '#FF8944' },
  { value: 59, label: 'Satisfaction des employés', color: '#8248FE' },
  { value: 70, label: 'Rétention des talents', color: '#11C1DC' },
];

const avatarColors = [
  { bg: '#8248FE', fg: '#FFF8EF' },
  { bg: '#FED94E', fg: '#1A0E2B' },
  { bg: '#FA4D52', fg: '#1A0E2B' },
  { bg: '#5EDDE7', fg: '#1A0E2B' },
  { bg: '#FF8944', fg: '#1A0E2B' },
  { bg: '#FF5BBC', fg: '#1A0E2B' },
];

const leadership = [
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    description: 'Fondateur de MoodFlow, visionnaire du bien-être en entreprise avec plus de 10 ans d\'expérience.'
  },
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Chief Clinical Officer',
    description: 'Experte en santé mentale, elle s\'assure de la qualité et de l\'efficacité de nos solutions.'
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Chief Technology Officer',
    description: 'Architecte technique passionné, il veille à la sécurité et à l\'évolutivité de notre plateforme.'
  }
];

const team = [
  {
    name: 'Abdoul',
    initial: 'A',
    role: 'Lead Developer',
    description: 'Architecte technique passionné, expert en backend et sécurité des données.'
  },
  {
    name: 'Mathieu',
    initial: 'M',
    role: 'Frontend Developer',
    description: 'Maître de l\'interface utilisateur, passionné par l\'UX et les animations.'
  },
  {
    name: 'Amaury',
    initial: 'A',
    role: 'UI/UX Designer',
    description: 'Créateur de l\'identité visuelle, expert en design thinking et psychologie des couleurs.'
  },
  {
    name: 'Jerobel',
    initial: 'J',
    role: 'Backend Developer',
    description: 'Génie de l\'infrastructure, spécialiste des bases de données et optimisation.'
  },
  {
    name: 'Mehmet',
    initial: 'M',
    role: 'Full Stack Developer',
    description: 'Polyvalent et créatif, toujours à l\'affût des dernières technologies.'
  }
];
</script>

<style scoped>
.outcome-bar {
  transform: scaleX(0);
  transition: transform 1.5s var(--ease-out-expo);
}

.outcome.is-revealed .outcome-bar {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .outcome-bar {
    transform: none;
  }
}
</style>
