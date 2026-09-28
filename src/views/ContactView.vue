<template>
  <div class="overflow-x-clip">
    <PageHero
      label="Contact"
      subtitle="Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale du bien-être en entreprise."
      :indicators="['Réponse sous 24h', 'Support dédié', 'Accompagnement personnalisé']"
      tone="#5EDDE7"
      mood="happy"
    >
      <span class="accent pr-[0.08em] text-grape">Contactez</span>-nous
    </PageHero>

    <!-- Comment nous joindre -->
    <section class="py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(01)</p>
            <h2 v-split class="display mt-6 text-display-lg">Comment nous joindre</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4 md:col-start-9">
            Choisissez la méthode qui vous convient le mieux. Notre équipe est là pour vous accompagner.
          </p>
        </div>

        <div class="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article v-reveal v-tilt="6" class="group flex min-h-[26rem] flex-col rounded-[2.25rem] bg-coral p-8 md:p-10">
            <span class="grid h-16 w-16 place-items-center rounded-full bg-ink text-coral transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110">
              <Icon name="mail" class="h-7 w-7" />
            </span>
            <h3 class="display mt-auto text-4xl tracking-[-0.04em]">Email</h3>
            <p class="mt-4 text-pretty text-lg text-ink/80">
              Pour toutes vos questions générales, demandes de devis ou informations sur nos services.
            </p>
            <a href="mailto:hello@moodflow.com" class="btn btn-ink mt-8 self-start">
              <RollText text="hello@moodflow.com" />
              <span class="btn-dot"><Icon name="arrow-up-right" /></span>
            </a>
          </article>

          <article v-reveal="0.1" v-tilt="6" class="group flex min-h-[26rem] flex-col rounded-[2.25rem] bg-grape p-8 text-paper md:p-10">
            <span class="grid h-16 w-16 place-items-center rounded-full bg-sun text-ink transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110">
              <Icon name="message" class="h-7 w-7" />
            </span>
            <h3 class="display mt-auto text-4xl tracking-[-0.04em]">Chat en direct</h3>
            <p class="mt-4 text-pretty text-lg text-paper/80">
              Support instantané 24/7. Obtenez des réponses immédiates à vos questions les plus urgentes.
            </p>
            <button type="button" class="btn btn-sun mt-8 self-start">
              <RollText text="Ouvrir le chat" />
              <span class="btn-dot"><Icon name="message" /></span>
            </button>
          </article>

          <article v-reveal="0.2" v-tilt="6" class="group flex min-h-[26rem] flex-col rounded-[2.25rem] bg-sun p-8 md:col-span-2 md:p-10 lg:col-span-1">
            <span class="grid h-16 w-16 place-items-center rounded-full bg-ink text-sun transition-transform duration-700 ease-out-back group-hover:rotate-[-12deg] group-hover:scale-110">
              <Icon name="phone" class="h-7 w-7" />
            </span>
            <h3 class="display mt-auto text-4xl tracking-[-0.04em]">Téléphone</h3>
            <p class="mt-4 text-pretty text-lg text-ink/80">
              Pour les questions urgentes ou les discussions complexes nécessitant une approche personnalisée.
            </p>
            <a href="tel:+33123456789" class="btn btn-ink mt-8 self-start">
              <RollText text="+33 1 23 45 67 89" />
              <span class="btn-dot"><Icon name="phone" /></span>
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- Notre équipe -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(02)</p>
            <h2 v-split class="display mt-6 text-display-lg">Notre équipe</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4 md:col-start-9">
            Rencontrez les personnes qui vous accompagneront dans votre transformation
          </p>
        </div>

        <div class="mt-16 grid gap-4 md:grid-cols-3">
          <article
            v-for="(member, index) in team"
            :key="index"
            v-reveal="index * 0.1"
            class="flex flex-col rounded-[2rem] bg-paper p-7 md:p-8"
          >
            <div
              class="display grid h-24 w-24 place-items-center rounded-full text-5xl"
              :style="{ backgroundColor: avatarColors[index].bg, color: avatarColors[index].fg }"
            >
              {{ member.initial }}
            </div>
            <h3 class="display mt-10 text-3xl tracking-[-0.035em]">{{ member.name }}</h3>
            <p class="label mt-3 text-coral">{{ member.role }}</p>
            <p class="mt-5 flex-1 text-pretty text-ink/70">{{ member.description }}</p>
            <div class="mt-8 flex gap-2">
              <a
                :href="`mailto:${member.email}`"
                class="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
                :aria-label="`Écrire à ${member.name}`"
              >
                <Icon name="mail" class="h-4 w-4" />
              </a>
              <a
                :href="member.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="grid h-11 w-11 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
                :aria-label="`${member.name} sur LinkedIn`"
              >
                <Icon name="linkedin" class="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Formulaire -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="label text-ink/55">(03)</p>
          <h2 v-split class="display mt-6 text-display-lg">Envoyez-nous un message</h2>
          <p v-reveal class="mt-8 max-w-md text-pretty text-xl text-ink/75">
            Remplissez le formulaire et nous vous recontacterons sous 24h
          </p>
        </div>

        <form v-reveal class="min-w-0 rounded-[2.25rem] bg-blush p-7 md:p-12 lg:col-span-7" @submit.prevent="handleSubmit">
          <div class="grid gap-x-8 gap-y-9 md:grid-cols-2 [&>div]:min-w-0">
            <div>
              <label for="contact-first-name" class="label text-ink/60">Prénom</label>
              <input id="contact-first-name" v-model="form.firstName" type="text" required autocomplete="given-name" class="field-line mt-2">
            </div>
            <div>
              <label for="contact-last-name" class="label text-ink/60">Nom</label>
              <input id="contact-last-name" v-model="form.lastName" type="text" required autocomplete="family-name" class="field-line mt-2">
            </div>
            <div class="md:col-span-2">
              <label for="contact-email" class="label text-ink/60">Email</label>
              <input id="contact-email" v-model="form.email" type="email" required autocomplete="email" class="field-line mt-2">
            </div>
            <div>
              <label for="contact-company" class="label text-ink/60">Entreprise</label>
              <input id="contact-company" v-model="form.company" type="text" required autocomplete="organization" class="field-line mt-2">
            </div>
            <div>
              <label for="contact-subject" class="label text-ink/60">Sujet</label>
              <select id="contact-subject" v-model="form.subject" required class="field-line mt-2">
                <option value="">Choisir…</option>
                <option value="demo">Demande de démo</option>
                <option value="pricing">Question sur les tarifs</option>
                <option value="support">Support technique</option>
                <option value="partnership">Partenariat</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label for="contact-message" class="label text-ink/60">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                required
                class="field-line mt-2 resize-none"
                placeholder="Décrivez votre demande en détail..."
              ></textarea>
            </div>
          </div>

          <button type="submit" :disabled="submitted" class="btn btn-ink btn-lg mt-12 w-full sm:w-auto" v-magnetic="0.2">
            <RollText :text="submitted ? '🎉 Message envoyé !' : 'Envoyer le message'" />
            <span v-if="!submitted" class="btn-dot"><Icon name="send" /></span>
          </button>
        </form>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="label text-ink/55">(04)</p>
          <h2 v-split class="display mt-6 text-display-lg lg:text-display-md">Questions fréquentes</h2>
          <p v-reveal class="mt-8 text-pretty text-xl text-ink/75">Trouvez rapidement les réponses à vos questions</p>
        </div>
        <div class="lg:col-span-8">
          <FaqList :items="faqs" :open="openFaqs" @toggle="toggleFaq" />
        </div>
      </div>
    </section>

    <!-- Réponse garantie -->
    <section class="pb-36 pt-24 md:pb-48 md:pt-40">
      <div class="shell">
        <div v-reveal="{ variant: 'scale' }" class="relative overflow-hidden rounded-[2.5rem] bg-coral p-8 md:rounded-[3.5rem] md:p-16 lg:p-20">
          <div class="relative z-10 max-w-3xl">
            <span class="grid h-16 w-16 place-items-center rounded-full bg-ink text-sun">
              <Icon name="zap" class="h-7 w-7" />
            </span>
            <h2 class="display mt-10 text-display-lg">Réponse garantie sous 24h</h2>
            <p class="mt-6 max-w-xl text-pretty text-xl leading-snug">
              Notre équipe s'engage à vous répondre dans les 24 heures,
              même le weekend pour les questions urgentes.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
              <router-link to="/demo" class="btn btn-ink btn-lg" v-magnetic>
                <RollText text="Demander une démo" />
                <span class="btn-dot"><Icon name="arrow-right" /></span>
              </router-link>
              <a href="mailto:hello@moodflow.com" class="btn btn-outline btn-lg">
                <RollText text="Nous écrire" />
              </a>
            </div>
          </div>
          <div class="pointer-events-none absolute -bottom-[14%] -right-[8%] hidden w-[42%] md:block" aria-hidden="true">
            <SunMark state="very_happy" :ray-colors="['#1A0E2B', '#FED94E']" />
          </div>
        </div>
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

const submitted = ref(false);
const openFaqs = ref<number[]>([]);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: ''
});

const avatarColors = [
  { bg: '#8248FE', fg: '#FFF8EF' },
  { bg: '#FED94E', fg: '#1A0E2B' },
  { bg: '#FF5BBC', fg: '#1A0E2B' },
];

const team = [
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    email: 'david@moodflow.com',
    linkedin: 'https://linkedin.com/in/david',
    description: 'Fondateur de MoodFlow, visionnaire du bien-être en entreprise.'
  },
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Head of Customer Success',
    email: 'sophie@moodflow.com',
    linkedin: 'https://linkedin.com/in/sophie',
    description: 'Experte en accompagnement client et transformation organisationnelle.'
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Head of Support',
    email: 'thomas@moodflow.com',
    linkedin: 'https://linkedin.com/in/thomas',
    description: 'Responsable du support technique et de la satisfaction client.'
  }
];

const faqs = [
  {
    question: 'Quel est le délai de réponse ?',
    answer: 'Nous nous engageons à vous répondre dans les 24 heures, même le weekend pour les questions urgentes. Pour le support technique, la réponse est généralement plus rapide.'
  },
  {
    question: 'Puis-je programmer un appel de démonstration ?',
    answer: 'Absolument ! Utilisez notre formulaire de contact en sélectionnant "Demande de démo" comme sujet, ou contactez-nous directement par email.'
  },
  {
    question: 'Offrez-vous un support en français ?',
    answer: 'Oui, notre équipe est entièrement francophone et nous offrons un support complet en français pour tous nos clients.'
  },
  {
    question: 'Comment puis-je signaler un problème technique ?',
    answer: 'Vous pouvez nous contacter par email à support@moodflow.com, via le chat en direct sur notre site, ou utiliser le formulaire de contact en sélectionnant "Support technique".'
  },
  {
    question: 'Proposez-vous des formations pour nos équipes ?',
    answer: 'Oui, nous proposons des formations personnalisées pour vos équipes, incluant l\'utilisation de la plateforme et les bonnes pratiques du bien-être en entreprise.'
  },
  {
    question: 'Puis-je parler directement à un expert ?',
    answer: 'Bien sûr ! Notre équipe d\'experts est disponible pour des consultations personnalisées. Contactez-nous pour planifier un appel avec un spécialiste.'
  }
];

const handleSubmit = () => {
  console.log('Contact form:', form.value);
  submitted.value = true;

  setTimeout(() => {
    submitted.value = false;
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    };
  }, 3000);
};

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};
</script>
