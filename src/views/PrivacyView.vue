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

    <!-- Engagement -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:items-center">
        <div class="flex justify-center lg:col-span-4 lg:justify-start">
          <div v-reveal="{ variant: 'scale' }" class="relative grid h-56 w-56 place-items-center md:h-72 md:w-72">
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
        <div class="lg:col-span-8">
          <p class="label text-ink/55">(01)</p>
          <h2 v-split class="display mt-6 text-display-lg">Notre engagement envers votre vie privée</h2>
          <p v-reveal class="mt-8 max-w-3xl text-pretty text-xl leading-relaxed text-ink/80 md:text-2xl">
            Chez MoodFlow, nous croyons que la confidentialité est un droit fondamental.
            Nous nous engageons à protéger vos données avec les plus hauts standards de sécurité.
          </p>
        </div>
      </div>
    </section>

    <!-- Protections -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <p class="label text-ink/55">(02)</p>
        <h2 v-split class="display mt-6 max-w-[18ch] text-display-lg">Comment nous protégeons vos données</h2>

        <div class="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(item, i) in protections"
            :key="item.title"
            v-reveal="(i % 3) * 0.08"
            class="group flex min-h-[17rem] flex-col rounded-[2rem] bg-paper p-7 md:p-8"
          >
            <div class="flex items-start justify-between">
              <span
                class="grid h-14 w-14 place-items-center rounded-full transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110"
                :style="{ backgroundColor: item.color }"
                :class="item.dark ? 'text-paper' : 'text-ink'"
              >
                <Icon :name="item.icon" class="h-6 w-6" />
              </span>
              <span class="label text-ink/35">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="display mt-auto text-2xl leading-tight tracking-[-0.03em]">{{ item.title }}</h3>
            <p class="mt-3 text-pretty text-ink/70">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="label text-ink/55">(03)</p>
          <h2 v-split class="display mt-6 text-display-lg">Questions sur la confidentialité</h2>
          <p v-reveal class="mt-8 text-pretty text-xl text-ink/75">
            Les réponses aux questions les plus fréquentes sur la protection de vos données
          </p>
        </div>
        <div class="lg:col-span-8">
          <FaqList :items="privacyFaqs" :open="openFaqs" @toggle="toggleFaq" />
        </div>
      </div>
    </section>

    <!-- Vos droits -->
    <section class="relative mx-3 overflow-hidden rounded-[2.5rem] bg-ink py-24 text-paper md:mx-5 md:rounded-[3.5rem] md:py-36">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-paper/55">(04)</p>
            <h2 v-split class="display mt-6 text-display-lg">Vos droits</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-paper/75 md:col-span-5">
            En tant qu'utilisateur de MoodFlow, vous disposez de droits spécifiques sur vos données
          </p>
        </div>

        <ol class="mt-16 grid gap-x-10 md:grid-cols-2">
          <li
            v-for="(right, index) in userRights"
            :key="index"
            v-reveal="(index % 2) * 0.08"
            class="flex gap-6 border-t border-paper/15 py-8"
          >
            <span class="display w-14 shrink-0 text-4xl leading-none tracking-[-0.05em] text-sun">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3 class="font-display text-2xl font-bold tracking-[-0.025em]">{{ right.title }}</h3>
              <p class="mt-3 text-pretty leading-relaxed text-paper/70">{{ right.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Utilisation des données -->
    <section class="py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(05)</p>
            <h2 v-split class="display mt-6 text-display-lg">Utilisation de vos données</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4 md:col-start-9">
            Transparence totale sur l'utilisation de vos données personnelles
          </p>
        </div>

        <div class="mt-16 grid gap-6 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <h3 class="font-display text-2xl font-bold tracking-[-0.025em]">Données que nous collectons</h3>
            <ul class="mt-8 border-t border-ink/15">
              <li
                v-for="(dataType, i) in dataTypes"
                :key="dataType.type"
                v-reveal="i * 0.06"
                class="flex items-center gap-5 border-b border-ink/15 py-5"
              >
                <span
                  class="grid h-12 w-12 shrink-0 place-items-center rounded-full"
                  :style="{ backgroundColor: dataColors[i % dataColors.length] }"
                >
                  <Icon :name="dataType.icon" class="h-5 w-5" />
                </span>
                <div>
                  <h4 class="text-lg font-semibold">{{ dataType.type }}</h4>
                  <p class="text-ink/65">{{ dataType.purpose }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div v-reveal="{ variant: 'scale', delay: 0.1 }" class="rounded-[2.25rem] bg-sun p-8 md:p-10 lg:col-span-5">
            <h3 class="display text-3xl tracking-[-0.035em]">Pourquoi nous les collectons</h3>
            <ul class="mt-8 space-y-5">
              <li v-for="reason in reasons" :key="reason" class="flex items-start gap-4">
                <span class="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sun">
                  <Icon name="check" class="h-4 w-4" stroke-width="2.5" />
                </span>
                <p class="text-lg">{{ reason }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact confidentialité -->
    <section class="relative overflow-hidden bg-grape pb-28 pt-24 text-paper md:pb-36 md:pt-36">
      <div class="shell relative z-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <h2 v-split class="display text-display-lg">Questions sur la <span class="whitespace-nowrap">confidentialité ?</span></h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug text-paper/85 md:text-2xl">
            Notre équipe est là pour répondre à toutes vos questions sur la protection de vos données
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
    </section>

    <!-- Dernière mise à jour -->
    <section class="bg-grape pb-36 text-paper/70 md:pb-48">
      <div class="shell flex flex-col gap-2 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
        <p class="label">Dernière mise à jour : {{ lastUpdated }}</p>
        <p class="text-sm">
          Cette politique de confidentialité peut être mise à jour. Nous vous informerons de tout changement significatif.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useId } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import FaqList from '../components/site/FaqList.vue';
import Icon from '../components/ui/Icon.vue';
import type { IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const circleId = `rgpd-${useId()}`;
const openFaqs = ref<number[]>([]);
const lastUpdated = '15 janvier 2025';

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
    answer: 'Absolument. Vos réponses sont cryptées et anonymisées dès leur saisie. Même notre équipe technique ne peut pas les relier à votre identité. Seuls des statistiques agrégées sont utilisées pour les rapports.'
  },
  {
    question: 'Où sont stockées mes données ?',
    answer: 'Toutes vos données sont stockées sur des serveurs sécurisés situés en Europe, conformément aux réglementations européennes et françaises. Nous ne transférons aucune donnée en dehors de l\'Union Européenne.'
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
</script>
