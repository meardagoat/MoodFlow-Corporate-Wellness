<template>
  <div ref="rootEl" class="overflow-x-clip">
    <PageHero
      label="Contact"
      subtitle="Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale du bien-être en entreprise."
      :indicators="['Réponse sous 24h', 'Support dédié', 'Accompagnement personnalisé']"
      tone="#5EDDE7"
      mood="happy"
    >
      <span class="accent pr-[0.08em] text-grape">Contactez</span>-nous
    </PageHero>

    <!-- ============================================================
         (01) LE FORMULAIRE CONVERSATIONNEL : une phrase à compléter
         ============================================================ -->
    <section ref="formSection" class="relative py-24 md:py-32 lg:min-h-[100svh]" aria-labelledby="contact-form-title">
      <div class="shell">
        <div class="flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-6">
          <div>
            <p class="label text-ink/55">(01) Écrivez-nous</p>
            <h2 id="contact-form-title" class="mt-4 text-pretty text-xl leading-snug text-ink/75 md:text-2xl">
              Complétez la phrase, nous nous occupons du reste.
            </h2>
          </div>
          <p class="label flex items-center gap-2 text-ink/55">
            <Icon name="clock" class="h-3.5 w-3.5" />
            Environ 1 minute
          </p>
        </div>

        <div class="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
          <!-- Le soleil qui écoute -->
          <aside class="order-first min-w-0 lg:order-last lg:col-span-4" aria-label="Suivi de votre message">
            <div
              class="sun-panel flex items-center gap-5 rounded-[2rem] p-5 sm:gap-7 sm:p-7 lg:sticky lg:top-28 lg:flex-col lg:items-stretch lg:rounded-[2.5rem] lg:p-8"
              :style="{ backgroundColor: panel.bg }"
            >
              <div class="sun-wrap w-24 shrink-0 sm:w-32 lg:mx-auto lg:w-[82%]" :class="`is-${status}`">
                <SunMark
                  :state="sunState"
                  :disc="panel.disc"
                  :ray-colors="panel.rays"
                  track
                  title="Le soleil MoodFlow suit votre message"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="label text-ink/55">{{ panel.label }}</p>
                <Transition name="bubble" mode="out-in">
                  <p :key="bubble" class="display mt-3 text-pretty text-[1.35rem] leading-[1.1] tracking-[-0.03em] sm:text-2xl lg:text-[1.9rem]">
                    {{ bubble }}
                  </p>
                </Transition>
                <p class="sr-only" aria-live="polite">{{ bubble }}</p>
                <div class="mt-5 lg:mt-8">
                  <div class="label flex items-center justify-between text-ink/55">
                    <span>Progression</span>
                    <span>{{ status === 'success' ? totalFields : filledCount }}/{{ totalFields }}</span>
                  </div>
                  <div class="mt-3 flex gap-1.5" aria-hidden="true">
                    <span
                      v-for="n in totalFields"
                      :key="n"
                      class="progress-seg h-1.5 flex-1 rounded-full"
                      :class="n <= (status === 'success' ? totalFields : filledCount) ? 'bg-ink' : 'bg-ink/15'"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- La phrase à trous -->
          <div class="min-w-0 lg:col-span-8">
            <Transition name="swap" mode="out-in">
              <div v-if="status === 'success'" key="success" ref="successEl" class="py-4" tabindex="-1">
                <p class="label text-ink/55">Message envoyé</p>
                <p class="display mt-6 text-display-lg">
                  Merci<template v-if="sentName">, <span class="accent text-grape">{{ sentName }}</span></template>.
                </p>
                <p class="mt-8 max-w-2xl text-pretty text-xl leading-snug text-ink/75 md:text-2xl">
                  Votre message est bien parti. Un membre de l'équipe vous répond sous 24h<template v-if="sentEmail">
                    à <strong class="font-semibold text-ink">{{ sentEmail }}</strong></template>.
                </p>
                <div class="mt-12 flex flex-wrap gap-3">
                  <button type="button" class="btn btn-ink btn-lg" @click="restart">
                    <RollText text="Écrire un nouveau message" />
                    <span class="btn-dot"><Icon name="pen" /></span>
                  </button>
                  <router-link to="/demo" class="btn btn-outline btn-lg">
                    <RollText text="Voir la démo" />
                  </router-link>
                </div>
              </div>

              <form
                v-else
                key="form"
                class="conv"
                novalidate
                aria-describedby="contact-form-hint"
                @submit.prevent="handleSubmit"
                @focusin="onFocusIn"
                @focusout="onFocusOut"
              >
                <p id="contact-form-hint" class="sr-only">Tous les champs sont obligatoires.</p>

                <p class="conv-sentence">
                  <span>Bonjour, je m'appelle </span>
                  <label for="contact-first-name" class="sr-only">Prénom</label>
                  <span class="conv-field" :class="fieldClass('firstName')">
                    <span class="conv-box"><span class="conv-sizer" :class="{ 'is-empty': !form.firstName }" aria-hidden="true">{{ form.firstName || 'prénom' }}</span><input
                      id="contact-first-name"
                      v-model="form.firstName"
                      type="text"
                      required
                      autocomplete="given-name"
                      placeholder="prénom"
                      class="field-line conv-input"
                      :aria-invalid="!!errors.firstName"
                      @input="revalidate"
                    ></span>
                  </span>
                  {{ ' ' }}<label for="contact-last-name" class="sr-only">Nom</label>
                  <span class="conv-field" :class="fieldClass('lastName')">
                    <span class="conv-box"><span class="conv-sizer" :class="{ 'is-empty': !form.lastName }" aria-hidden="true">{{ form.lastName || 'nom' }}</span><input
                      id="contact-last-name"
                      v-model="form.lastName"
                      type="text"
                      required
                      autocomplete="family-name"
                      placeholder="nom"
                      class="field-line conv-input"
                      :aria-invalid="!!errors.lastName"
                      @input="revalidate"
                    ></span>
                  </span>
                  <span> et je travaille chez </span>
                  <label for="contact-company" class="sr-only">Entreprise</label>
                  <span class="conv-field" :class="fieldClass('company')">
                    <span class="conv-box"><span class="conv-sizer" :class="{ 'is-empty': !form.company }" aria-hidden="true">{{ form.company || 'votre entreprise' }}</span><input
                      id="contact-company"
                      v-model="form.company"
                      type="text"
                      required
                      autocomplete="organization"
                      placeholder="votre entreprise"
                      class="field-line conv-input"
                      :aria-invalid="!!errors.company"
                      @input="revalidate"
                    ></span><span class="conv-punct">.</span>
                  </span>
                  <span> Vous pouvez me répondre à </span>
                  <label for="contact-email" class="sr-only">Email</label>
                  <span class="conv-field" :class="fieldClass('email')">
                    <span class="conv-box"><span class="conv-sizer" :class="{ 'is-empty': !form.email }" aria-hidden="true">{{ form.email || 'vous@entreprise.fr' }}</span><input
                      id="contact-email"
                      v-model="form.email"
                      type="email"
                      inputmode="email"
                      required
                      autocomplete="email"
                      placeholder="vous@entreprise.fr"
                      spellcheck="false"
                      class="field-line conv-input"
                      :aria-invalid="!!errors.email"
                      @input="revalidate"
                    ></span><span class="conv-punct">.</span>
                  </span>
                  <span> Je vous contacte pour </span>
                  <span class="conv-slot" :class="{ 'is-empty': !currentSubject, 'is-invalid': !!errors.subject }" aria-hidden="true">
                    <Transition name="slot" mode="out-in">
                      <span
                        :key="currentSubject?.value ?? 'none'"
                        class="conv-slot-text"
                        :style="currentSubject ? { '--slot': currentSubject.color } : undefined"
                      >{{ currentSubject ? currentSubject.phrase : '…' }}</span>
                    </Transition>
                  </span><span class="conv-punct">.</span>
                </p>

                <fieldset class="mt-10 md:mt-12" :class="{ 'is-shaking': shaking && !!errors.subject }">
                  <legend class="label text-ink/55">Sujet · choisissez une pastille</legend>
                  <div class="mt-5 flex flex-wrap gap-2.5 md:gap-3">
                    <label
                      v-for="subject in subjects"
                      :key="subject.value"
                      class="subject-chip"
                      :style="{ '--chip': subject.color, '--chip-fg': subject.fg }"
                    >
                      <input
                        v-model="form.subject"
                        type="radio"
                        name="contact-subject"
                        :value="subject.value"
                        required
                        class="peer sr-only"
                        :aria-invalid="!!errors.subject"
                        @change="revalidate"
                      >
                      <span class="subject-chip-body">
                        <span class="subject-chip-dot" aria-hidden="true" />
                        {{ subject.label }}
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div class="mt-12 md:mt-16" :class="{ 'is-shaking': shaking && !!errors.message }">
                  <div class="flex items-baseline justify-between gap-4">
                    <label for="contact-message" class="display text-2xl tracking-[-0.03em] md:text-4xl">
                      Et voici ce que j'aimerais vous dire&nbsp;:
                    </label>
                    <span class="label shrink-0 text-ink/45" aria-hidden="true">{{ form.message.length }} car.</span>
                  </div>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    rows="4"
                    required
                    class="field-line conv-textarea mt-4 resize-none"
                    :class="{ 'is-invalid': !!errors.message }"
                    placeholder="Décrivez votre demande en détail..."
                    :aria-invalid="!!errors.message"
                    @input="revalidate"
                  ></textarea>
                </div>

                <Transition name="bubble">
                  <div
                    v-if="errorList.length || sendError"
                    ref="errorBox"
                    class="mt-10 rounded-[1.5rem] bg-coral/15 p-5 md:p-6"
                    role="alert"
                    tabindex="-1"
                  >
                    <p class="font-semibold text-[#A3141A]">
                      {{ sendError || `Il manque ${errorList.length} information${errorList.length > 1 ? 's' : ''} pour envoyer votre message :` }}
                    </p>
                    <ul v-if="!sendError" class="mt-3 flex flex-wrap gap-2">
                      <li v-for="err in errorList" :key="err.field">
                        <button type="button" class="tag bg-paper text-[#A3141A] hover:bg-ink hover:text-paper" @click="focusField(err.field)">
                          {{ err.message }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </Transition>

                <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/15 pt-8 md:mt-12">
                  <button
                    type="submit"
                    class="btn btn-ink btn-lg w-full sm:w-auto"
                    :disabled="status === 'loading'"
                    :aria-busy="status === 'loading'"
                    v-magnetic="0.2"
                  >
                    <template v-if="status === 'loading'">
                      <span>Envoi en cours…</span>
                      <span class="btn-dot"><span class="spinner" aria-hidden="true" /></span>
                    </template>
                    <template v-else>
                      <RollText text="Envoyer le message" />
                      <span class="btn-dot"><Icon name="send" /></span>
                    </template>
                  </button>
                  <p class="flex items-center gap-2 text-sm text-ink/60">
                    <Icon name="lock" class="h-4 w-4" />
                    Vos informations restent confidentielles.
                  </p>
                </div>
              </form>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         (02) LES CANAUX : grandes lignes éditoriales
         ============================================================ -->
    <section class="pb-24 pt-8 md:pb-40" aria-labelledby="contact-channels-title">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(02) Plus direct</p>
            <h2 id="contact-channels-title" v-split class="display mt-6 text-display-lg">Comment nous joindre</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-5 lg:col-span-4 lg:col-start-9">
            Choisissez la méthode qui vous convient le mieux. Notre équipe est là pour vous accompagner.
          </p>
        </div>
      </div>

      <ul class="mt-16 border-t border-ink/15 md:mt-20">
        <li
          v-for="(channel, i) in channels"
          :key="channel.key"
          v-reveal="i * 0.08"
          class="channel border-b border-ink/15"
          :class="{ 'is-dark': channel.dark }"
          :style="{ '--c': channel.color }"
        >
          <div class="shell relative z-10 grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-14">
            <div class="flex min-w-0 items-start gap-5 md:col-span-6 lg:col-span-6">
              <span class="channel-icon grid h-14 w-14 shrink-0 place-items-center rounded-full md:h-16 md:w-16" :style="{ backgroundColor: channel.color }">
                <Icon :name="channel.icon" class="h-6 w-6" />
              </span>
              <div class="min-w-0">
                <p class="label channel-muted">{{ String(i + 1).padStart(2, '0') }} · {{ channel.kicker }}</p>
                <h3 class="channel-title display mt-3 text-display-md">{{ channel.title }}</h3>
                <p class="channel-muted mt-4 max-w-md text-pretty text-lg">{{ channel.description }}</p>
              </div>
            </div>

            <div class="flex min-w-0 flex-wrap items-center gap-3 md:col-span-6 md:justify-end lg:col-span-6">
              <template v-if="channel.key === 'email'">
                <button
                  type="button"
                  class="copy-btn group/copy display text-left text-display-sm"
                  :aria-label="`Copier l'adresse ${email}`"
                  @click="copyEmail"
                >
                  <span class="copy-value">{{ email }}</span>
                  <span class="copy-tag label" :class="{ 'is-copied': copied }">
                    <Icon :name="copied ? 'check' : 'clipboard'" class="h-3.5 w-3.5" />
                    {{ copied ? 'Copié' : 'Copier' }}
                  </span>
                </button>
                <a :href="`mailto:${email}`" class="btn btn-ink">
                  <RollText text="Ouvrir ma messagerie" />
                  <span class="btn-dot"><Icon name="arrow-up-right" /></span>
                </a>
              </template>
              <template v-else-if="channel.key === 'chat'">
                <p class="display channel-value w-full text-display-sm md:text-right">24h/24, 7j/7</p>
                <button type="button" class="btn btn-sun" @click="startConversation">
                  <RollText text="Ouvrir le chat" />
                  <span class="btn-dot"><Icon name="message" /></span>
                </button>
              </template>
              <template v-else>
                <a href="tel:+33123456789" class="display channel-value link w-full text-display-sm md:w-auto">+33 1 23 45 67 89</a>
                <a href="tel:+33123456789" class="btn btn-ink">
                  <RollText text="Appeler" />
                  <span class="btn-dot"><Icon name="phone" /></span>
                </a>
              </template>
            </div>
          </div>
        </li>
      </ul>
      <p class="sr-only" aria-live="polite">{{ copied ? 'Adresse email copiée dans le presse-papiers' : '' }}</p>
    </section>

    <!-- ============================================================
         HORLOGE : l'heure à Paris, en direct
         ============================================================ -->
    <section class="relative overflow-hidden bg-ink py-24 text-paper md:py-32" aria-labelledby="contact-clock-title">
      <div class="shell grid gap-12 lg:grid-cols-12 lg:items-end">
        <div class="min-w-0 lg:col-span-8">
          <p id="contact-clock-title" class="label flex items-center gap-3 text-paper/60">
            <Icon name="globe" class="h-3.5 w-3.5" />
            Heure à Paris
          </p>
          <p class="clock display mt-8" :aria-label="`Il est ${clockLabel} à Paris`">
            <span
              v-for="(c, i) in clockChars"
              :key="i"
              class="clock-cell"
              :class="{ 'is-sep': c === ':' }"
              aria-hidden="true"
            >
              <Transition name="digit">
                <span :key="c" class="clock-digit">{{ c }}</span>
              </Transition>
            </span>
          </p>
          <p class="mt-8 flex flex-wrap items-center gap-3">
            <span class="chip border-paper/25 text-paper">
              <span class="status-dot" :class="{ 'is-open': isOpen }" aria-hidden="true" />
              {{ isOpen ? "L'équipe est disponible" : "L'équipe se repose" }}
            </span>
            <span class="text-paper/65">
              {{ isOpen ? 'Nous vous répondons dans la journée.' : 'Le chat reste ouvert, et nous vous répondons dès 9h.' }}
            </span>
          </p>
        </div>
        <div class="flex items-center gap-6 lg:col-span-4 lg:flex-col lg:items-end lg:text-right">
          <MoodFace :mood="isOpen ? 'very_happy' : 'sleepy'" class="clock-face w-24 shrink-0 md:w-32 lg:w-40" />
          <p class="max-w-xs text-pretty text-lg leading-snug text-paper/75">
            Bureaux ouverts du lundi au vendredi, de 9h à 19h. Le chat reste disponible 24h/24.
          </p>
        </div>
      </div>
    </section>

    <!-- ============================================================
         (03) L'ÉQUIPE
         ============================================================ -->
    <section class="py-24 md:py-40" aria-labelledby="contact-team-title">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(03) Visages</p>
            <h2 id="contact-team-title" v-split class="display mt-6 text-display-lg">Notre équipe</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-5 lg:col-span-4 lg:col-start-9">
            Rencontrez les personnes qui vous accompagneront dans votre transformation.
          </p>
        </div>

        <div class="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(member, index) in team"
            :key="member.name"
            v-reveal="index * 0.1"
            class="member group relative flex min-h-[22rem] md:min-h-[27rem] flex-col overflow-hidden rounded-[2.25rem] p-7 md:p-8"
            :class="{ 'md:col-span-2 lg:col-span-1': index === 2 }"
            :style="{ backgroundColor: avatarColors[index].bg, color: avatarColors[index].fg }"
          >
            <span class="member-initial display pointer-events-none absolute -right-[0.06em] -top-[0.2em] select-none" aria-hidden="true">
              {{ member.initial }}
            </span>
            <div class="member-avatar relative h-20 w-20 overflow-hidden rounded-full" :style="{ backgroundColor: avatarColors[index].fg }">
              <span class="member-avatar-letter display absolute inset-0 grid place-items-center text-4xl" :style="{ color: avatarColors[index].bg }" aria-hidden="true">
                {{ member.initial }}
              </span>
              <MoodFace :mood="member.mood" class="member-avatar-face absolute inset-0 h-full w-full" />
            </div>
            <div class="relative mt-auto pt-16">
              <p class="label opacity-70">{{ member.role }}</p>
              <h3 class="display mt-3 text-[clamp(2.4rem,4vw,3.5rem)] leading-[0.9] tracking-[-0.045em]">{{ member.name }}</h3>
              <p class="mt-4 text-pretty opacity-80">{{ member.description }}</p>
              <div class="mt-7 flex gap-2">
                <a
                  :href="`mailto:${member.email}`"
                  class="member-link"
                  :aria-label="`Écrire à ${member.name}`"
                >
                  <Icon name="mail" class="h-4 w-4" />
                </a>
                <a
                  :href="member.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="member-link"
                  :aria-label="`${member.name} sur LinkedIn`"
                >
                  <Icon name="linkedin" class="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         (04) FAQ
         ============================================================ -->
    <section class="bg-paper-deep/60 py-24 md:py-40" aria-labelledby="contact-faq-title">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-28">
            <p class="label text-ink/55">(04) Réponses</p>
            <h2 id="contact-faq-title" v-split class="display mt-6 text-display-lg lg:text-display-md">Questions fréquentes</h2>
            <p v-reveal class="mt-8 text-pretty text-xl text-ink/75">Trouvez rapidement les réponses à vos questions.</p>
            <button type="button" class="btn btn-outline mt-8" @click="askQuestion">
              <RollText text="Poser ma question" />
              <span class="btn-dot"><Icon name="arrow-up" /></span>
            </button>
          </div>
        </div>
        <div class="lg:col-span-8">
          <FaqList :items="faqs" :open="openFaqs" @toggle="toggleFaq" />
        </div>
      </div>
    </section>

    <!-- ============================================================
         RÉPONSE GARANTIE
         ============================================================ -->
    <section ref="ctaSection" class="pb-36 pt-24 md:pb-48 md:pt-40">
      <div class="shell">
        <div v-reveal="{ variant: 'scale' }" class="relative overflow-hidden rounded-[2.5rem] bg-coral p-8 md:rounded-[3.5rem] md:p-16 lg:p-20">
          <span ref="ctaBig" class="cta-big display pointer-events-none absolute hidden xl:block -bottom-[0.14em] right-[-0.04em] select-none" aria-hidden="true">24h</span>
          <div class="relative z-10 max-w-3xl">
            <span class="grid h-16 w-16 place-items-center rounded-full bg-ink text-sun">
              <Icon name="zap" class="h-7 w-7" />
            </span>
            <h2 class="display mt-10 text-display-lg">
              Réponse garantie <span class="accent">sous 24h</span>
            </h2>
            <p class="mt-6 max-w-xl text-pretty text-xl leading-snug">
              Notre équipe s'engage à vous répondre dans les 24 heures,
              même le weekend pour les questions urgentes.
            </p>
            <div class="mt-10 flex flex-wrap gap-3">
              <router-link to="/demo" class="btn btn-ink btn-lg" v-magnetic>
                <RollText text="Demander une démo" />
                <span class="btn-dot"><Icon name="arrow-right" /></span>
              </router-link>
              <a :href="`mailto:${email}`" class="btn btn-outline btn-lg">
                <RollText text="Nous écrire" />
              </a>
            </div>
          </div>
          <div class="pointer-events-none absolute -right-[5%] -top-[14%] hidden w-[30%] md:block lg:w-[28%]" aria-hidden="true">
            <div ref="ctaSun">
              <SunMark state="very_happy" :ray-colors="['#1A0E2B', '#FED94E']" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import FaqList from '../components/site/FaqList.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon from '../components/ui/Icon.vue';
import type { IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import { gsap, prefersReducedMotion, scrollToElement } from '../lib/motion';
import type { FaceState, MoodValue } from '../lib/moods';

const rootEl = ref<HTMLElement | null>(null);
const formSection = ref<HTMLElement | null>(null);
const errorBox = ref<HTMLElement | null>(null);
const successEl = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);
const ctaBig = ref<HTMLElement | null>(null);
const ctaSun = ref<HTMLElement | null>(null);

const email = 'hello@moodflow.com';

/* ------------------------------------------------------------------
   Formulaire
   ------------------------------------------------------------------ */
type Field = 'firstName' | 'lastName' | 'company' | 'email' | 'subject' | 'message';
type Status = 'idle' | 'loading' | 'success' | 'error';

const emptyForm = () => ({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: '',
});

const form = ref(emptyForm());
const status = ref<Status>('idle');
const errors = reactive<Partial<Record<Field, string>>>({});
const sendError = ref('');
const attempted = ref(false);
const shaking = ref(false);
const focusedField = ref<Field | null>(null);
const sentName = ref('');
const sentEmail = ref('');

const subjects = [
  { value: 'demo', label: 'Demande de démo', phrase: 'une démo', color: '#FED94E', fg: '#1A0E2B' },
  { value: 'pricing', label: 'Question sur les tarifs', phrase: 'une question sur les tarifs', color: '#FF8944', fg: '#1A0E2B' },
  { value: 'support', label: 'Support technique', phrase: 'du support technique', color: '#5EDDE7', fg: '#1A0E2B' },
  { value: 'partnership', label: 'Partenariat', phrase: 'un partenariat', color: '#FF5BBC', fg: '#1A0E2B' },
  { value: 'other', label: 'Autre', phrase: 'autre chose', color: '#8248FE', fg: '#FFF8EF' },
];

const currentSubject = computed(() => subjects.find((s) => s.value === form.value.subject));

const fieldOrder: Field[] = ['firstName', 'lastName', 'company', 'email', 'subject', 'message'];
const fieldIds: Record<Field, string> = {
  firstName: 'contact-first-name',
  lastName: 'contact-last-name',
  company: 'contact-company',
  email: 'contact-email',
  subject: 'contact-subject',
  message: 'contact-message',
};
const totalFields = fieldOrder.length;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate() {
  const f = form.value;
  const next: Partial<Record<Field, string>> = {};
  if (!f.firstName.trim()) next.firstName = 'Votre prénom';
  if (!f.lastName.trim()) next.lastName = 'Votre nom';
  if (!f.company.trim()) next.company = 'Votre entreprise';
  if (!f.email.trim()) next.email = 'Votre email';
  else if (!EMAIL_RE.test(f.email.trim())) next.email = 'Un email valide';
  if (!f.subject) next.subject = 'Le sujet';
  if (f.message.trim().length < 10) next.message = f.message.trim() ? 'Un message un peu plus long' : 'Votre message';
  for (const key of fieldOrder) {
    if (next[key]) errors[key] = next[key];
    else delete errors[key];
  }
  return Object.keys(next).length === 0;
}

const errorList = computed(() =>
  fieldOrder.filter((f) => errors[f]).map((f) => ({ field: f, message: errors[f] as string })),
);

function isFilled(field: Field) {
  const v = form.value[field].trim();
  if (field === 'email') return EMAIL_RE.test(v);
  if (field === 'message') return v.length >= 10;
  return v.length > 0;
}

const filledCount = computed(() => fieldOrder.filter(isFilled).length);

function revalidate() {
  if (status.value === 'error' && sendError.value) {
    sendError.value = '';
  }
  if (!attempted.value) return;
  const ok = validate();
  if (ok && status.value === 'error') status.value = 'idle';
}

function fieldClass(field: Field) {
  return {
    'is-filled': !!form.value[field],
    'is-invalid': !!errors[field],
    'is-shaking': shaking.value && !!errors[field],
  };
}

function onFocusIn(e: FocusEvent) {
  const t = e.target as HTMLElement;
  const entry = (Object.entries(fieldIds) as [Field, string][]).find(([, id]) => id === t.id);
  if (entry) focusedField.value = entry[0];
  else if (t instanceof HTMLInputElement && t.name === 'contact-subject') focusedField.value = 'subject';
}

function onFocusOut() {
  focusedField.value = null;
}

function focusField(field: Field) {
  if (field === 'subject') {
    (document.querySelector('input[name="contact-subject"]') as HTMLInputElement | null)?.focus();
    return;
  }
  document.getElementById(fieldIds[field])?.focus();
}

function triggerShake() {
  if (prefersReducedMotion()) return;
  shaking.value = false;
  requestAnimationFrame(() => {
    shaking.value = true;
    window.setTimeout(() => (shaking.value = false), 520);
  });
}

// Envoi simulé (pas encore d'API côté serveur)
function sendMessage(payload: ReturnType<typeof emptyForm>) {
  console.log('Contact form:', payload);
  return new Promise<void>((resolve) => window.setTimeout(resolve, 1400));
}

async function handleSubmit() {
  if (status.value === 'loading') return;
  attempted.value = true;
  sendError.value = '';

  if (!validate()) {
    status.value = 'error';
    triggerShake();
    await nextTick();
    errorBox.value?.focus({ preventScroll: true });
    if (errorBox.value) scrollToElement(errorBox.value, -window.innerHeight * 0.35);
    return;
  }

  status.value = 'loading';
  try {
    await sendMessage({ ...form.value });
    sentName.value = form.value.firstName.trim();
    sentEmail.value = form.value.email.trim();
    status.value = 'success';
    form.value = emptyForm();
    attempted.value = false;
    await nextTick();
    successEl.value?.focus({ preventScroll: true });
    scrollToElement(formSection.value, -24);
  } catch {
    status.value = 'error';
    sendError.value = "L'envoi n'a pas abouti. Réessayez dans un instant, ou écrivez-nous directement à hello@moodflow.com.";
  }
}

function restart() {
  status.value = 'idle';
  sentName.value = '';
  sentEmail.value = '';
  nextTick(() => focusField('firstName'));
}

async function goToForm(focus: Field) {
  if (status.value === 'success') restart();
  scrollToElement(formSection.value, -24);
  await nextTick();
  window.setTimeout(() => {
    const el = focus === 'subject' ? null : document.getElementById(fieldIds[focus]);
    el?.focus({ preventScroll: true });
  }, 900);
}

function startConversation() {
  goToForm('firstName');
}

function askQuestion() {
  if (!form.value.subject) form.value.subject = 'other';
  goToForm(form.value.firstName ? 'message' : 'firstName');
}

/* ------------------------------------------------------------------
   Le soleil réagit à l'état du formulaire
   ------------------------------------------------------------------ */
const sunState = computed<FaceState>(() => {
  if (status.value === 'success') return 'very_happy';
  if (status.value === 'loading') return 'closed';
  if (status.value === 'error') return 'sad';
  if (focusedField.value) return 'peek';
  if (filledCount.value === totalFields) return 'very_happy';
  return 'happy';
});

const panel = computed(() => {
  switch (status.value) {
    case 'success':
      return { bg: '#FED94E', disc: '#FFF8EF', rays: ['#1A0E2B', '#FA4D52'], label: 'Message reçu' };
    case 'loading':
      return { bg: '#CDB8FF', disc: '#FED94E', rays: ['#8248FE', '#FFF8EF'], label: 'Envoi en cours' };
    case 'error':
      return { bg: '#5EDDE7', disc: '#FED94E', rays: ['#1A0E2B', '#8248FE'], label: 'Petit souci' };
    default:
      return focusedField.value
        ? { bg: '#FFE3D8', disc: '#FED94E', rays: ['#8248FE', '#FF5BBC'], label: 'Je vous écoute' }
        : { bg: '#FFE3D8', disc: '#FED94E', rays: ['#8248FE', '#FA4D52'], label: 'Bonjour' };
  }
});

const bubble = computed(() => {
  const name = form.value.firstName.trim();
  if (status.value === 'success') return sentName.value ? `Merci ${sentName.value}, à très vite !` : 'Merci, à très vite !';
  if (status.value === 'loading') return 'Je transmets votre message…';
  if (status.value === 'error') {
    if (sendError.value) return "Oups, l'envoi n'a pas abouti.";
    const n = errorList.value.length;
    return `Il me manque ${n} information${n > 1 ? 's' : ''}.`;
  }
  switch (focusedField.value) {
    case 'firstName':
      return 'Comment vous appelez-vous ?';
    case 'lastName':
      return name ? `Enchanté, ${name}. Et votre nom ?` : 'Et votre nom de famille ?';
    case 'company':
      return 'Dans quelle entreprise travaillez-vous ?';
    case 'email':
      return 'Où pouvons-nous vous répondre ?';
    case 'subject':
      return 'De quoi voulez-vous parler ?';
    case 'message':
      return 'Prenez votre temps, on lit tout.';
  }
  if (filledCount.value === totalFields) return 'Parfait, il ne reste qu’à envoyer.';
  if (name) return `Enchanté, ${name} !`;
  return 'Je vous écoute. Commencez par votre prénom.';
});

/* ------------------------------------------------------------------
   Canaux
   ------------------------------------------------------------------ */
const channels: {
  key: 'email' | 'chat' | 'phone';
  title: string;
  kicker: string;
  description: string;
  icon: IconName;
  color: string;
  dark?: boolean;
}[] = [
  {
    key: 'email',
    title: 'Email',
    kicker: 'Réponse sous 24h',
    description: 'Pour toutes vos questions générales, demandes de devis ou informations sur nos services.',
    icon: 'mail',
    color: '#FA4D52',
  },
  {
    key: 'chat',
    title: 'Chat en direct',
    kicker: 'Instantané',
    description: 'Support instantané 24/7. Obtenez des réponses immédiates à vos questions les plus urgentes.',
    icon: 'message',
    color: '#8248FE',
    dark: true,
  },
  {
    key: 'phone',
    title: 'Téléphone',
    kicker: 'En semaine',
    description: 'Pour les questions urgentes ou les discussions complexes nécessitant une approche personnalisée.',
    icon: 'phone',
    color: '#FED94E',
  },
];

const copied = ref(false);
let copiedTimer: number | undefined;

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch {
      /* rien à faire */
    }
    ta.remove();
  }
  copied.value = true;
  window.clearTimeout(copiedTimer);
  copiedTimer = window.setTimeout(() => (copied.value = false), 2200);
}

/* ------------------------------------------------------------------
   Horloge de Paris
   ------------------------------------------------------------------ */
const now = ref(new Date());
let clockTimer: number | undefined;

const timeFormatter = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});
const dayFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Paris', weekday: 'short' });

const clockParts = computed(() => {
  const parts = timeFormatter.formatToParts(now.value);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return { h: get('hour'), m: get('minute'), s: get('second') };
});
const clockChars = computed(() => `${clockParts.value.h}:${clockParts.value.m}:${clockParts.value.s}`.split(''));
const clockLabel = computed(() => `${clockParts.value.h}h${clockParts.value.m}`);

const isOpen = computed(() => {
  const day = dayFormatter.format(now.value);
  const hour = Number(clockParts.value.h);
  return !['Sat', 'Sun'].includes(day) && hour >= 9 && hour < 19;
});

/* ------------------------------------------------------------------
   Équipe & FAQ
   ------------------------------------------------------------------ */
const openFaqs = ref<number[]>([]);

const avatarColors = [
  { bg: '#8248FE', fg: '#FFF8EF' },
  { bg: '#FED94E', fg: '#1A0E2B' },
  { bg: '#FF5BBC', fg: '#1A0E2B' },
];

const team: {
  name: string;
  initial: string;
  role: string;
  email: string;
  linkedin: string;
  description: string;
  mood: MoodValue;
}[] = [
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    email: 'david@moodflow.com',
    linkedin: 'https://linkedin.com/in/david',
    description: 'Fondateur de MoodFlow, visionnaire du bien-être en entreprise.',
    mood: 'very_happy',
  },
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Head of Customer Success',
    email: 'sophie@moodflow.com',
    linkedin: 'https://linkedin.com/in/sophie',
    description: 'Experte en accompagnement client et transformation organisationnelle.',
    mood: 'happy',
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Head of Support',
    email: 'thomas@moodflow.com',
    linkedin: 'https://linkedin.com/in/thomas',
    description: 'Responsable du support technique et de la satisfaction client.',
    mood: 'neutral',
  },
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

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};

/* ------------------------------------------------------------------
   Animations liées au défilement
   ------------------------------------------------------------------ */
let ctx: gsap.Context | null = null;
let mm: gsap.MatchMedia | null = null;

onMounted(() => {
  // Scroll vers le haut au chargement de la page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  clockTimer = window.setInterval(() => (now.value = new Date()), 1000);

  ctx = gsap.context(() => {
    mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const scrollTrigger = { trigger: ctaSection.value, start: 'top bottom', end: 'bottom top', scrub: 0.6 };
      gsap.fromTo(ctaSun.value, { rotate: -14, yPercent: 10 }, { rotate: 12, yPercent: -8, ease: 'none', scrollTrigger });
      gsap.fromTo(ctaBig.value, { xPercent: 12 }, { xPercent: -4, ease: 'none', scrollTrigger: { ...scrollTrigger } });
    });
  }, rootEl.value ?? undefined);
});

onUnmounted(() => {
  window.clearInterval(clockTimer);
  window.clearTimeout(copiedTimer);
  mm?.revert();
  ctx?.revert();
});
</script>

<style scoped>
/* ---------- Phrase à trous ---------- */
.conv-sentence {
  font-family: 'Bricolage Grotesque Variable', 'Instrument Sans Variable', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 4.1vw, 4.1rem);
  line-height: 1.32;
  letter-spacing: -0.035em;
  text-wrap: pretty;
}

.conv-field {
  display: inline-flex;
  align-items: baseline;
  max-width: 100%;
  white-space: nowrap;
}

.conv-box {
  position: relative;
  display: inline-block;
  min-width: 0;
  max-width: 100%;
}

.conv-sizer,
.conv-input.field-line {
  padding: 0 0.12em 0.02em;
  font: inherit;
  letter-spacing: inherit;
  line-height: 1.15;
}

.conv-sizer {
  display: block;
  visibility: hidden;
  white-space: pre;
  overflow: clip;
  min-width: 2.5ch;
  max-width: 100%;
  padding-right: 0.16em;
  border-bottom: 0.06em solid transparent;
}

.conv-input.field-line {
  position: absolute;
  inset: 0;
  height: 100%;
}

.conv-sizer.is-empty,
.conv-input.field-line::placeholder {
  font-family: 'Instrument Serif', Georgia, serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.conv-input.field-line {
  width: 100%;
  min-width: 0;
  color: var(--grape);
  border-bottom-width: 0.06em;
  border-bottom-color: rgb(26 14 43 / 0.28);
  background:
    linear-gradient(var(--sun), var(--sun)) left bottom / 0% 0.26em no-repeat;
  transition:
    border-color 0.3s var(--ease-out-expo),
    background-size 0.6s var(--ease-out-expo),
    color 0.3s;
}

.conv-input.field-line::placeholder {
  color: rgb(26 14 43 / 0.32);
}

.conv-input.field-line:focus {
  border-bottom-color: var(--ink);
  background-size: 100% 0.26em;
}

.conv-field.is-filled .conv-input.field-line {
  border-bottom-color: var(--grape);
}

.conv-field.is-invalid .conv-input.field-line {
  border-bottom-color: var(--coral);
  background-image: linear-gradient(rgb(250 77 82 / 0.25), rgb(250 77 82 / 0.25));
  background-size: 100% 0.26em;
}

.conv-punct {
  flex-shrink: 0;
}

.conv-slot {
  display: inline-block;
  max-width: 100%;
  vertical-align: baseline;
}

.conv-slot-text {
  display: inline-block;
  font-family: 'Instrument Serif', Georgia, serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.01em;
  padding: 0 0.12em;
  border-radius: 0.2em;
  background: linear-gradient(var(--slot, transparent), var(--slot, transparent)) left 88% / 100% 0.34em no-repeat;
}

.conv-slot.is-empty .conv-slot-text {
  color: rgb(26 14 43 / 0.32);
  min-width: 2.2em;
  border-bottom: 0.06em dashed rgb(26 14 43 / 0.35);
}

.conv-slot.is-invalid .conv-slot-text {
  border-bottom-color: var(--coral);
  color: var(--coral);
}

.slot-enter-active,
.slot-leave-active {
  transition:
    opacity 0.3s var(--ease-out-expo),
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slot-enter-from {
  opacity: 0;
  transform: translateY(0.35em) rotate(-3deg);
}

.slot-leave-to {
  opacity: 0;
  transform: translateY(-0.3em);
}

.conv-textarea.field-line {
  font-size: clamp(1.2rem, 1.9vw, 1.6rem);
  line-height: 1.45;
  border-bottom-width: 2px;
}

.conv-textarea.field-line.is-invalid {
  border-bottom-color: var(--coral);
}

.is-shaking {
  animation: conv-shake 0.45s ease-in-out;
}

@keyframes conv-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-0.12em); }
  40% { transform: translateX(0.12em); }
  60% { transform: translateX(-0.08em); }
  80% { transform: translateX(0.06em); }
}

fieldset.is-shaking,
div.is-shaking {
  animation-name: conv-shake-px;
}

@keyframes conv-shake-px {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}

/* ---------- Pastilles de sujet ---------- */
.subject-chip {
  cursor: pointer;
}

.subject-chip-body {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: 999px;
  border: 1px solid rgb(26 14 43 / 0.2);
  padding: 0.8rem 1.25rem;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1;
  transition:
    background-color 0.35s var(--ease-out-expo),
    border-color 0.35s var(--ease-out-expo),
    color 0.35s var(--ease-out-expo),
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (min-width: 768px) {
  .subject-chip-body {
    font-size: 1.125rem;
    padding: 0.95rem 1.5rem;
  }
}

.subject-chip-dot {
  height: 0.65rem;
  width: 0.65rem;
  border-radius: 999px;
  background: var(--chip);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s;
}

.subject-chip:hover .subject-chip-body {
  border-color: var(--ink);
  transform: translateY(-2px);
}

.subject-chip:hover .subject-chip-dot {
  transform: scale(1.4);
}

.subject-chip input:checked + .subject-chip-body {
  background: var(--chip);
  border-color: var(--chip);
  color: var(--chip-fg);
  transform: rotate(-2deg);
}

.subject-chip input:checked + .subject-chip-body .subject-chip-dot {
  background: var(--chip-fg);
}

.subject-chip input:focus-visible + .subject-chip-body {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

.subject-chip input[aria-invalid='true'] + .subject-chip-body {
  border-color: rgb(250 77 82 / 0.6);
}

/* ---------- Panneau du soleil ---------- */
.sun-panel {
  transition: background-color 0.7s var(--ease-out-expo);
}

.sun-wrap {
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sun-wrap.is-success {
  animation: sun-jump 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sun-wrap.is-error {
  animation: conv-shake-px 0.45s ease-in-out;
}

.sun-wrap.is-loading {
  animation: sun-pulse 1s ease-in-out infinite;
}

@keyframes sun-jump {
  0% { transform: translateY(0) scale(1); }
  35% { transform: translateY(-12%) scale(1.06) rotate(-6deg); }
  70% { transform: translateY(2%) scale(0.98); }
  100% { transform: none; }
}

@keyframes sun-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.94); }
}

.progress-seg {
  transition: background-color 0.5s var(--ease-out-expo);
}

.bubble-enter-active,
.bubble-leave-active {
  transition:
    opacity 0.25s var(--ease-out-expo),
    transform 0.45s var(--ease-out-expo);
}

.bubble-enter-from {
  opacity: 0;
  transform: translateY(0.5rem);
}

.bubble-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.4s var(--ease-out-expo),
    transform 0.6s var(--ease-out-expo);
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(1.5rem);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.spinner {
  display: block;
  height: 0.9rem;
  width: 0.9rem;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---------- Canaux ---------- */
.channel {
  position: relative;
  overflow: hidden;
  transition: color 0.45s var(--ease-out-expo);
}

.channel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--c);
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.7s var(--ease-in-out-quart);
}

.channel-title {
  transition: transform 0.7s var(--ease-out-expo);
}

.channel-icon {
  color: var(--ink);
  transition:
    transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.4s,
    color 0.4s;
}

.channel.is-dark .channel-icon {
  color: var(--paper);
}

.channel-muted {
  opacity: 0.7;
}

.channel-value {
  letter-spacing: -0.035em;
}

.channel:has(:focus-visible)::before {
  clip-path: inset(0 0 0 0);
}

.channel.is-dark:has(:focus-visible) {
  color: var(--paper);
}

.channel:has(:focus-visible) .channel-icon {
  background-color: var(--ink) !important;
  color: var(--c);
}

@media (hover: hover) {
  .channel:hover::before {
    clip-path: inset(0 0 0 0);
  }

  .channel.is-dark:hover {
    color: var(--paper);
  }

  .channel:hover .channel-title {
    transform: translateX(0.18em);
  }

  .channel:hover .channel-icon {
    transform: rotate(-14deg) scale(1.08);
    background-color: var(--ink) !important;
    color: var(--c);
  }
}

.copy-btn {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35em 0.5em;
  max-width: 100%;
  letter-spacing: -0.035em;
  line-height: 1.05;
}

.copy-value {
  overflow-wrap: anywhere;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 2px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.5s var(--ease-out-expo);
}

.copy-btn:hover .copy-value,
.copy-btn:focus-visible .copy-value {
  background-size: 100% 2px;
}

.copy-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  padding: 0.55rem 0.8rem;
  letter-spacing: 0.12em;
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.copy-btn:hover .copy-tag {
  transform: rotate(-6deg);
}

.copy-tag.is-copied {
  background: var(--sun);
  color: var(--ink);
  transform: scale(1.04) rotate(-4deg);
}

/* ---------- Horloge ---------- */
.clock {
  display: flex;
  font-size: clamp(4.2rem, 15vw, 14rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: var(--sun);
}

.clock-cell {
  position: relative;
  display: inline-block;
  width: 0.62em;
  height: 1em;
  overflow: hidden;
  text-align: center;
}

.clock-cell.is-sep {
  width: 0.3em;
  color: var(--paper);
  opacity: 0.4;
}

.clock-digit {
  position: absolute;
  inset: 0;
  display: block;
}

.digit-enter-active,
.digit-leave-active {
  transition: transform 0.6s var(--ease-out-expo), opacity 0.6s var(--ease-out-expo);
}

.digit-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.digit-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.status-dot {
  position: relative;
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 999px;
  background: var(--lilac);
}

.status-dot.is-open {
  background: #5ee79a;
}

.status-dot.is-open::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  animation: status-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes status-ping {
  75%, 100% { transform: scale(2.6); opacity: 0; }
}

.clock-face {
  animation: drift 7s ease-in-out infinite;
}

/* ---------- Équipe ---------- */
.member {
  transition: transform 0.7s var(--ease-out-expo);
}

.member-initial {
  font-size: clamp(14rem, 22vw, 20rem);
  line-height: 1;
  opacity: 0.14;
  transition: transform 0.9s var(--ease-out-expo), opacity 0.6s;
}

.member-avatar-letter,
.member-avatar-face {
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.member-avatar-face {
  transform: translateY(110%) rotate(30deg);
}

.member-link {
  display: grid;
  height: 2.75rem;
  width: 2.75rem;
  place-items: center;
  border-radius: 999px;
  border: 1px solid currentColor;
  border-color: color-mix(in srgb, currentColor 30%, transparent);
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.member-link:hover,
.member-link:focus-visible {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--paper);
}

@media (hover: hover) {
  .member:hover {
    transform: translateY(-6px) rotate(-0.6deg);
  }

  .member:hover .member-initial {
    transform: translate(-6%, 8%) rotate(-8deg);
    opacity: 0.22;
  }

  .member:hover .member-avatar-letter {
    transform: translateY(-110%);
  }

  .member:hover .member-avatar-face {
    transform: none;
  }
}

/* ---------- CTA ---------- */
.cta-big {
  font-size: clamp(9rem, 26vw, 24rem);
  line-height: 0.8;
  letter-spacing: -0.07em;
  color: transparent;
  -webkit-text-stroke: 2px rgb(26 14 43 / 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .is-shaking,
  .sun-wrap,
  .clock-face,
  .status-dot.is-open::after {
    animation: none !important;
  }

  .member:hover,
  .member:hover .member-initial {
    transform: none;
  }
}
</style>
