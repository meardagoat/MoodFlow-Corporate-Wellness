<template>
  <div class="overflow-x-clip">
    <PageHero
      label="Confidentialité"
      subtitle="Votre vie privée est notre priorité. Découvrez comment nous protégeons vos données."
      :indicators="['RGPD conforme', 'Chiffrement SSL', 'Données sécurisées']"
      tone="#FF8944"
      mood="happy"
      :rays="['#8248FE', '#1A0E2B']"
      :dots="['#8248FE', '#FED94E', '#1A0E2B']"
    >
      Politique de <span class="accent">confidentialité</span>
    </PageHero>

    <!-- ============================================================
         PRÉAMBULE : les mots s'allument au défilement
         ============================================================ -->
    <section class="relative py-24 md:py-36">
      <div class="shell grid gap-10 lg:grid-cols-12">
        <div class="flex items-center justify-between gap-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-start">
          <p class="label text-ink/60 lg:pt-4">Préambule</p>
          <div v-reveal="{ variant: 'scale' }" class="relative grid h-32 w-32 shrink-0 place-items-center md:h-44 md:w-44 lg:mt-10">
            <svg viewBox="0 0 200 200" class="absolute inset-0 h-full w-full motion-safe:animate-spin-slow" aria-hidden="true">
              <defs>
                <path :id="circleId" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text class="fill-ink font-mono text-[13px] uppercase tracking-[0.2em]">
                <textPath :href="`#${circleId}`">Certifié RGPD · Conformité européenne garantie ·</textPath>
              </text>
            </svg>
            <div class="grid h-[52%] w-[52%] place-items-center rounded-full bg-grape text-paper">
              <Icon name="check" class="h-1/2 w-1/2" stroke-width="2.25" />
            </div>
            <p class="sr-only">Certifié RGPD. Conformité européenne garantie.</p>
          </div>
        </div>
        <p class="display text-[clamp(1.9rem,4.2vw,4.2rem)] leading-[1.04] tracking-[-0.04em] lg:col-span-9">
          <span v-scrub-words>Chez MoodFlow, nous croyons que la confidentialité est un droit fondamental.</span>
          <span class="privacy-badge bg-grape text-paper" aria-hidden="true"><Icon name="lock" /></span>
          <span v-scrub-words>Nous protégeons vos données avec les plus hauts standards de sécurité,</span>
          <MoodFace mood="happy" class="privacy-face" />
          <span v-scrub-words>et nous vous expliquons <span class="accent text-grape">simplement</span> ce que nous en faisons.</span>
        </p>
      </div>
    </section>

    <!-- ============================================================
         DOCUMENT : sommaire collant + sections numérotées
         ============================================================ -->
    <div class="shell grid gap-10 pb-24 md:pb-36 lg:grid-cols-12 lg:gap-12">
      <!-- Sommaire -->
      <aside class="lg:col-span-3">
        <nav
          class="rounded-[1.75rem] border border-ink/10 bg-white p-2 lg:sticky lg:top-28 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
          aria-label="Sommaire de la politique de confidentialité"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 rounded-[1.4rem] px-4 py-3 text-left lg:hidden"
            :aria-expanded="tocOpen"
            aria-controls="privacy-toc"
            @click="tocOpen = !tocOpen"
          >
            <span class="min-w-0">
              <span class="label block text-ink/50">Sommaire · {{ String(sections.length).padStart(2, '0') }} sections</span>
              <span class="mt-2 block truncate font-display text-lg font-bold tracking-[-0.02em]">
                {{ String(activeIndex + 1).padStart(2, '0') }}. {{ sections[activeIndex].short }}
              </span>
            </span>
            <span
              class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out-expo"
              :class="{ 'rotate-180': tocOpen }"
            >
              <Icon name="chevron-down" class="h-5 w-5" />
            </span>
          </button>

          <div :class="tocOpen ? 'block' : 'hidden'" class="lg:block">
            <p class="label hidden text-ink/50 lg:block">Sommaire</p>
            <div class="mx-4 mt-2 h-1 overflow-hidden rounded-full bg-ink/10 lg:mx-0 lg:mt-5" aria-hidden="true">
              <div
                class="h-full origin-left rounded-full bg-grape transition-transform duration-700 ease-out-expo"
                :style="{ transform: `scaleX(${(activeIndex + 1) / sections.length})` }"
              />
            </div>
            <ol id="privacy-toc" class="mt-3 space-y-1 pb-2 lg:mt-5 lg:pb-0">
              <li v-for="(section, i) in sections" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  class="toc-link group flex items-center gap-3 rounded-full py-2.5 pl-2.5 pr-4 transition-[background-color,color] duration-300"
                  :class="activeIndex === i ? 'bg-ink text-paper' : 'text-ink/60 hover:bg-ink/5 hover:text-ink'"
                  :aria-current="activeIndex === i ? 'location' : undefined"
                  @click.prevent="goTo(i)"
                >
                  <span
                    class="label grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300"
                    :style="activeIndex === i ? { backgroundColor: section.color, color: section.dark ? '#FFF8EF' : '#1A0E2B' } : {}"
                    :class="activeIndex === i ? '' : 'bg-ink/5'"
                  >
                    {{ String(i + 1).padStart(2, '0') }}
                  </span>
                  <span class="min-w-0 truncate font-medium transition-transform duration-500 ease-out-expo" :class="{ 'translate-x-0.5': activeIndex === i }">
                    {{ section.short }}
                  </span>
                </a>
              </li>
            </ol>
            <a
              href="mailto:privacy@moodflow.com"
              class="mt-6 hidden items-center gap-2 text-sm font-medium text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink lg:flex"
            >
              <Icon name="mail" class="h-4 w-4" />
              privacy@moodflow.com
            </a>
          </div>
        </nav>
      </aside>

      <!-- Sections -->
      <article class="min-w-0 lg:col-span-9">
        <section
          v-for="(section, i) in sections"
          :id="section.id"
          :key="section.id"
          :ref="(el) => setSectionEl(el as HTMLElement | null, i)"
          class="doc-section py-14 first:pt-0 md:py-24"
          :class="{ 'is-active': activeIndex === i }"
          :style="{ '--section-color': section.color }"
          :aria-labelledby="`${section.id}-title`"
        >
          <header class="flex flex-col gap-5 md:flex-row md:items-end md:gap-10">
            <p class="doc-num display shrink-0 text-[clamp(5rem,11vw,10rem)] leading-[0.78] tracking-[-0.07em]" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </p>
            <div class="min-w-0 md:pb-1">
              <p class="label text-ink/50">({{ String(i + 1).padStart(2, '0') }}) {{ section.short }}</p>
              <h2 :id="`${section.id}-title`" tabindex="-1" class="display mt-4 text-[clamp(2.1rem,4vw,3.75rem)] leading-[0.98] tracking-[-0.04em] outline-none">
                {{ section.title }}
              </h2>
            </div>
          </header>

          <aside
            v-reveal
            class="relative mt-10 overflow-hidden rounded-[1.75rem] p-6 md:mt-12 md:rounded-[2rem] md:p-8"
            :class="section.dark ? 'text-paper' : 'text-ink'"
            :style="{ backgroundColor: section.color }"
            :aria-label="`En bref : ${section.short}`"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <span
                class="chip shrink-0 self-start"
                :class="section.dark ? 'border-paper/30 bg-paper/10' : 'border-ink/20 bg-paper/50'"
              >
                <Icon name="spark" class="h-3.5 w-3.5" />
                En bref
              </span>
              <p class="text-pretty font-display text-xl font-bold leading-snug tracking-[-0.02em] md:text-2xl">{{ section.summary }}</p>
            </div>
          </aside>

          <!-- 01 Engagement -->
          <div v-if="section.id === 'engagement'" class="mt-10 grid gap-8 md:mt-12 md:grid-cols-2">
            <p class="text-pretty text-lg leading-relaxed text-ink/75 md:text-xl">
              Chez MoodFlow, nous croyons que la confidentialité est un droit fondamental.
              Nous nous engageons à protéger vos données avec les plus hauts standards de sécurité.
            </p>
            <ul class="space-y-3">
              <li v-for="(p, j) in principles" :key="p.title" v-reveal="j * 0.06" class="flex items-start gap-4 rounded-[1.5rem] border border-ink/10 bg-white p-5">
                <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full" :style="{ backgroundColor: p.color }" :class="p.dark ? 'text-paper' : 'text-ink'">
                  <Icon :name="p.icon" class="h-5 w-5" />
                </span>
                <div class="min-w-0">
                  <h3 class="font-display text-lg font-bold leading-tight tracking-[-0.02em]">{{ p.title }}</h3>
                  <p class="mt-1 text-ink/65">{{ p.text }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- 02 Données collectées -->
          <ul v-else-if="section.id === 'donnees'" class="mt-10 border-t border-ink/15 md:mt-12">
            <li
              v-for="(dataType, j) in dataTypes"
              :key="dataType.type"
              v-reveal="j * 0.06"
              class="group flex items-center gap-5 border-b border-ink/15 py-5 md:gap-8 md:py-7"
            >
              <span class="label hidden w-8 shrink-0 text-ink/40 sm:block">{{ String(j + 1).padStart(2, '0') }}</span>
              <span
                class="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-out-back group-hover:rotate-[-10deg] group-hover:scale-110 md:h-14 md:w-14"
                :style="{ backgroundColor: dataColors[j % dataColors.length] }"
              >
                <Icon :name="dataType.icon" class="h-5 w-5 md:h-6 md:w-6" />
              </span>
              <div class="min-w-0">
                <h3 class="font-display text-xl font-bold leading-tight tracking-[-0.02em] md:text-2xl">{{ dataType.type }}</h3>
                <p class="mt-1 text-ink/65 md:text-lg">{{ dataType.purpose }}</p>
              </div>
            </li>
          </ul>

          <!-- 03 Finalités -->
          <div v-else-if="section.id === 'finalites'" class="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12">
            <div
              v-for="(reason, j) in reasons"
              :key="reason"
              v-reveal="j * 0.06"
              class="flex min-h-[9rem] flex-col justify-between gap-6 rounded-[1.75rem] border border-ink/10 bg-white p-6"
            >
              <span class="grid h-9 w-9 place-items-center rounded-full bg-ink text-sun">
                <Icon name="check" class="h-4 w-4" stroke-width="2.5" />
              </span>
              <p class="font-display text-xl font-bold leading-tight tracking-[-0.02em]">{{ reason }}</p>
            </div>
            <div v-reveal="0.2" class="flex items-center gap-5 rounded-[1.75rem] bg-ink p-6 text-paper sm:col-span-2 md:p-8">
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-coral text-ink">
                <Icon name="ban" class="h-6 w-6" />
              </span>
              <p class="text-pretty text-lg md:text-xl">
                Nous ne vendons, ne louons ni ne partageons jamais vos données à des fins commerciales.
              </p>
            </div>
          </div>

          <!-- 04 Protection -->
          <div v-else-if="section.id === 'protection'" class="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12">
            <article
              v-for="(item, j) in protections"
              :key="item.title"
              v-reveal="(j % 2) * 0.08"
              class="group flex gap-5 rounded-[1.75rem] border border-ink/10 bg-white p-6"
            >
              <span
                class="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110"
                :style="{ backgroundColor: item.color }"
                :class="item.dark ? 'text-paper' : 'text-ink'"
              >
                <Icon :name="item.icon" class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <h3 class="font-display text-lg font-bold leading-tight tracking-[-0.02em] md:text-xl">{{ item.title }}</h3>
                <p class="mt-2 text-pretty text-ink/65">{{ item.description }}</p>
              </div>
            </article>
          </div>

          <!-- 05 Droits -->
          <ol v-else-if="section.id === 'droits'" class="mt-10 grid overflow-hidden rounded-[2rem] bg-ink px-6 text-paper sm:grid-cols-2 sm:gap-x-8 md:mt-12 md:rounded-[2.5rem] md:px-10">
            <li
              v-for="(right, index) in userRights"
              :key="index"
              v-reveal="(index % 2) * 0.08"
              class="flex gap-5 border-t border-paper/15 py-7 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 md:py-9"
            >
              <span class="display w-11 shrink-0 text-3xl leading-none tracking-[-0.05em] text-sun">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="min-w-0">
                <h3 class="font-display text-xl font-bold tracking-[-0.025em] md:text-2xl">{{ right.title }}</h3>
                <p class="mt-2 text-pretty leading-relaxed text-paper/70">{{ right.description }}</p>
              </div>
            </li>
          </ol>

          <!-- 06 FAQ -->
          <div v-else-if="section.id === 'questions'" class="mt-10 md:mt-12">
            <FaqList :items="privacyFaqs" :open="openFaqs" @toggle="toggleFaq" />
          </div>

          <!-- 07 Contact -->
          <div v-else-if="section.id === 'contact'" class="mt-10 grid gap-3 md:mt-12 md:grid-cols-12">
            <div v-reveal v-tilt="5" class="relative flex min-h-[18rem] flex-col overflow-hidden rounded-[2rem] bg-grape p-7 text-paper md:col-span-7 md:p-10">
              <span class="label pr-16 text-paper/60 md:pr-20">Délégué à la protection des données</span>
              <p class="display mt-auto break-words pt-10 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-[-0.04em]">privacy@moodflow.com</p>
              <a href="mailto:privacy@moodflow.com" class="btn btn-sun mt-8 self-start" v-magnetic>
                <RollText text="Contacter notre DPO" />
                <span class="btn-dot"><Icon name="mail" /></span>
              </a>
              <div class="pointer-events-none absolute -right-6 -top-6 w-24 md:w-28" aria-hidden="true">
                <MoodFace mood="very_happy" class="animate-drift" />
              </div>
            </div>
            <div v-reveal="0.1" class="flex flex-col rounded-[2rem] border border-ink/10 bg-white p-7 md:col-span-5 md:p-10">
              <span class="label text-ink/50">Dernière mise à jour</span>
              <p class="display mt-6 text-3xl leading-none tracking-[-0.04em] md:text-4xl">{{ lastUpdated }}</p>
              <p class="mt-6 flex-1 text-pretty text-ink/65">
                Cette politique de confidentialité peut être mise à jour. Nous vous informerons de tout changement significatif.
              </p>
              <router-link to="/contact" class="btn btn-outline mt-8 self-start">
                <RollText text="Nous contacter" />
              </router-link>
            </div>
          </div>
        </section>
      </article>
    </div>

    <!-- ============================================================
         CTA
         ============================================================ -->
    <section class="relative overflow-hidden bg-grape pb-36 pt-24 text-paper md:pb-48 md:pt-36">
      <div class="shell relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <p class="label text-paper/60">Une question ?</p>
          <h2 v-split class="display mt-8 text-display-lg">Questions sur la <span class="accent whitespace-nowrap text-sun">confidentialité ?</span></h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug text-paper/85 md:text-2xl">
            Notre équipe est là pour répondre à toutes vos questions sur la protection de vos données.
          </p>
        </div>
        <div v-reveal="0.15" class="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
          <a href="mailto:privacy@moodflow.com" class="btn btn-sun btn-lg" v-magnetic>
            <RollText text="Contacter notre DPO" />
            <span class="btn-dot"><Icon name="mail" /></span>
          </a>
          <router-link to="/contact" class="btn btn-outline-light btn-lg">
            <RollText text="Nous contacter" />
          </router-link>
        </div>
      </div>
      <div class="pointer-events-none absolute -bottom-[26vw] -right-[12vw] w-[60vw] opacity-90 md:-bottom-[19vw] md:-right-[8vw] md:w-[30vw]" aria-hidden="true">
        <SunMark state="closed" :ray-colors="['#FED94E', '#FF5BBC']" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, useId } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import FaqList from '../components/site/FaqList.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon from '../components/ui/Icon.vue';
import type { IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import { scrollToElement } from '../lib/motion';

const circleId = `rgpd-${useId()}`;
const openFaqs = ref<number[]>([]);
const lastUpdated = '15 janvier 2025';

const sections: { id: string; short: string; title: string; summary: string; color: string; dark?: boolean }[] = [
  {
    id: 'engagement',
    short: 'Engagement',
    title: 'Notre engagement envers votre vie privée',
    summary: 'Vos données vous appartiennent. Nous les protégeons avec les plus hauts standards de sécurité.',
    color: '#FED94E',
  },
  {
    id: 'donnees',
    short: 'Données',
    title: 'Les données que nous collectons',
    summary: 'Le strict nécessaire : votre compte, vos réponses anonymisées, l\'usage de la plateforme et quelques données techniques.',
    color: '#CDB8FF',
  },
  {
    id: 'finalites',
    short: 'Finalités',
    title: 'Pourquoi nous les collectons',
    summary: 'Pour faire fonctionner et sécuriser MoodFlow, vous aider et respecter la loi. Jamais pour les revendre.',
    color: '#5EDDE7',
  },
  {
    id: 'protection',
    short: 'Sécurité',
    title: 'Comment nous protégeons vos données',
    summary: 'Chiffrement AES-256, hébergement en Europe, anonymat garanti et audits indépendants réguliers.',
    color: '#FF8944',
  },
  {
    id: 'droits',
    short: 'Vos droits',
    title: 'Vos droits sur vos données',
    summary: 'Accès, rectification, effacement, portabilité, opposition, limitation : vous gardez la main à tout moment.',
    color: '#8248FE',
    dark: true,
  },
  {
    id: 'questions',
    short: 'FAQ',
    title: 'Questions sur la confidentialité',
    summary: 'Les réponses aux questions les plus fréquentes sur la protection de vos données.',
    color: '#FFE3D8',
  },
  {
    id: 'contact',
    short: 'Contact',
    title: 'Contact et mises à jour',
    summary: 'Une question, une demande ? Notre délégué à la protection des données vous répond sous 30 jours.',
    color: '#FF5BBC',
  },
];

const principles: { title: string; text: string; icon: IconName; color: string; dark?: boolean }[] = [
  { title: 'Transparence', text: 'Nous vous disons ce que nous collectons, et pourquoi.', icon: 'eye', color: '#FED94E' },
  { title: 'Minimisation', text: 'Nous ne gardons que ce qui est vraiment utile.', icon: 'target', color: '#5EDDE7' },
  { title: 'Anonymat', text: 'Vos réponses ne sont jamais reliées à votre identité.', icon: 'mask', color: '#8248FE', dark: true },
];

const protections: { title: string; description: string; icon: IconName; color: string; dark?: boolean }[] = [
  {
    title: 'Chiffrement de bout en bout',
    description: 'Toutes vos données sont chiffrées avec AES-256, le standard militaire de sécurité.',
    icon: 'lock',
    color: '#8248FE',
    dark: true,
  },
  {
    title: 'Hébergement européen',
    description: 'Vos données restent en Europe, conformément au RGPD et aux réglementations françaises.',
    icon: 'globe',
    color: '#5EDDE7',
  },
  {
    title: 'Anonymat garanti',
    description: 'Vos réponses sont anonymisées et ne peuvent jamais être liées à votre identité.',
    icon: 'mask',
    color: '#FF5BBC',
  },
  {
    title: 'Audits réguliers',
    description: 'Nos systèmes sont audités régulièrement par des experts en cybersécurité indépendants.',
    icon: 'shield',
    color: '#FED94E',
  },
  {
    title: 'Conformité RGPD',
    description: 'Nous respectons intégralement le Règlement Général sur la Protection des Données.',
    icon: 'clipboard',
    color: '#FF8944',
  },
  {
    title: 'Aucune revente',
    description: 'Nous ne vendons jamais vos données à des tiers. Jamais.',
    icon: 'ban',
    color: '#FA4D52',
  },
];

const privacyFaqs = [
  {
    question: 'MoodFlow est-il conforme au RGPD ?',
    answer: 'Oui, MoodFlow est entièrement conforme au Règlement Général sur la Protection des Données (RGPD). Nous avons mis en place toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles.'
  },
  {
    question: 'Mes réponses sont-elles vraiment anonymes ?',
    answer: 'Absolument. Vos réponses sont chiffrées et anonymisées dès leur saisie. Même notre équipe technique ne peut pas les relier à votre identité. Seules des statistiques agrégées sont utilisées pour les rapports.'
  },
  {
    question: 'Où sont stockées mes données ?',
    answer: 'Toutes vos données sont stockées sur des serveurs sécurisés situés en Europe, conformément aux réglementations européennes et françaises. Nous ne transférons aucune donnée en dehors de l\'Union européenne.'
  },
  {
    question: 'Puis-je supprimer mes données ?',
    answer: 'Oui, vous avez le droit de demander la suppression de vos données personnelles à tout moment. Vous pouvez le faire depuis votre profil ou en nous contactant directement. La suppression sera effective dans les 30 jours.'
  },
  {
    question: 'MoodFlow vend-il mes données ?',
    answer: 'Non, jamais. Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers à des fins commerciales. Vos données restent strictement confidentielles.'
  },
  {
    question: 'Comment puis-je exercer mes droits ?',
    answer: 'Vous pouvez exercer vos droits (accès, rectification, suppression, portabilité) en nous contactant à privacy@moodflow.com ou via votre espace personnel. Nous répondons à toutes les demandes dans les 30 jours.'
  }
];

const userRights = [
  {
    title: 'Droit d\'accès',
    description: 'Vous pouvez demander à tout moment quelles données personnelles nous détenons sur vous et comment nous les utilisons.'
  },
  {
    title: 'Droit de rectification',
    description: 'Vous pouvez corriger ou mettre à jour vos données personnelles si elles sont inexactes ou incomplètes.'
  },
  {
    title: 'Droit à l\'effacement',
    description: 'Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances prévues par la loi.'
  },
  {
    title: 'Droit à la portabilité',
    description: 'Vous pouvez recevoir vos données dans un format structuré et lisible par machine pour les transférer à un autre service.'
  },
  {
    title: 'Droit d\'opposition',
    description: 'Vous pouvez vous opposer au traitement de vos données personnelles pour des raisons liées à votre situation particulière.'
  },
  {
    title: 'Droit de limitation',
    description: 'Vous pouvez demander la limitation du traitement de vos données dans certaines circonstances.'
  }
];

const dataColors = ['#FED94E', '#CDB8FF', '#5EDDE7', '#FF8944'];

const dataTypes: { type: string; icon: IconName; purpose: string }[] = [
  {
    type: 'Informations de compte',
    icon: 'user',
    purpose: 'Nom, email, entreprise pour créer votre compte'
  },
  {
    type: 'Réponses anonymes',
    icon: 'message',
    purpose: 'Vos réponses aux questions de bien-être (anonymisées)'
  },
  {
    type: 'Données d\'utilisation',
    icon: 'chart',
    purpose: 'Comment vous utilisez la plateforme pour l\'améliorer'
  },
  {
    type: 'Données techniques',
    icon: 'settings',
    purpose: 'Adresse IP, type de navigateur pour la sécurité'
  }
];

const reasons = [
  'Améliorer votre expérience utilisateur',
  'Fournir un support technique efficace',
  'Assurer la sécurité de la plateforme',
  'Respecter nos obligations légales',
];

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};

/* ------------------------------------------------------------------
   Sommaire : section active suivie au défilement
   ------------------------------------------------------------------ */
const activeIndex = ref(0);
const tocOpen = ref(false);
const sectionEls: HTMLElement[] = [];
const visible = new Set<number>();
let sectionObserver: IntersectionObserver | null = null;

function setSectionEl(el: HTMLElement | null, index: number) {
  if (el) sectionEls[index] = el;
}

async function goTo(index: number) {
  const el = sectionEls[index];
  if (!el) return;
  activeIndex.value = index;
  // Replier le sommaire mobile avant de calculer la position cible
  tocOpen.value = false;
  await nextTick();
  scrollToElement(el, -100);
  el.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
}

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (typeof IntersectionObserver === 'undefined') return;
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const i = sectionEls.indexOf(entry.target as HTMLElement);
        if (i < 0) continue;
        if (entry.isIntersecting) visible.add(i);
        else visible.delete(i);
      }
      if (visible.size) activeIndex.value = Math.min(...visible);
    },
    // Bande de lecture située vers le tiers haut de l'écran
    { rootMargin: '-30% 0px -62% 0px', threshold: 0 },
  );
  sectionEls.forEach((el) => sectionObserver?.observe(el));
});

onUnmounted(() => {
  sectionObserver?.disconnect();
});
</script>

<style scoped>
.privacy-face,
.privacy-badge {
  display: inline-block;
  width: 0.92em;
  height: 0.92em;
  margin: 0 0.12em;
  vertical-align: -0.12em;
}

.privacy-face {
  animation: privacy-bob 4s ease-in-out infinite;
}

.privacy-badge {
  border-radius: 9999px;
  padding: 0.2em;
  transform: rotate(-8deg);
}

.privacy-badge :deep(svg) {
  width: 100%;
  height: 100%;
}

@keyframes privacy-bob {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-0.08em) rotate(6deg); }
}

/* Gros chiffre en contour, rempli par la couleur de la section active */
.doc-num {
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(26 14 43 / 0.22);
  transition:
    color 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    -webkit-text-stroke-color 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.doc-section.is-active .doc-num {
  color: var(--section-color);
  -webkit-text-stroke-color: #1a0e2b;
  transform: rotate(-3deg);
}

@media (prefers-reduced-motion: reduce) {
  .privacy-face { animation: none; }
  .doc-num { transition: none; }
  .doc-section.is-active .doc-num { transform: none; }
}
</style>
