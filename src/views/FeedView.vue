<template>
  <div class="min-h-screen">
    <!-- ============================================================
         EN-TÊTE
         ============================================================ -->
    <section class="shell pt-6 md:pt-10">
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div class="min-w-0">
          <p class="label text-ink/55">(01) Fil d'humeurs<span v-if="currentProfile?.service"> · {{ currentProfile.service }}</span></p>
          <h1 id="feed-title" v-split="{ chars: true, immediate: true, delay: 0.1 }" class="display mt-5 text-display-lg">
            {{ greeting }}, <span class="accent text-grape">{{ firstName }}</span>
          </h1>
        </div>
        <p v-reveal="0.3" class="max-w-sm text-pretty text-lg leading-snug text-ink/65">
          Partagez votre humeur en dix secondes et prenez le pouls de votre équipe, en toute bienveillance.
        </p>
      </div>

      <!-- Check-in express -->
      <div v-reveal="0.15" class="relative mt-10 overflow-hidden rounded-[2.5rem] bg-ink p-6 text-paper sm:p-8 lg:p-10">
        <div class="checkin-glow pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-grape/40 blur-3xl" aria-hidden="true" />
        <div class="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p class="label text-paper/55">Check-in du jour</p>
            <h2 class="display mt-4 text-display-sm">Comment vous <span class="accent text-sun">sentez-vous</span> aujourd'hui&nbsp;?</h2>
          </div>
          <div class="grid grid-cols-5 gap-2 sm:gap-3" role="group" aria-label="Choisir mon humeur">
            <button
              v-for="(mood, i) in moods"
              :key="mood.value"
              type="button"
              class="checkin-mood group flex flex-col items-center gap-3 rounded-[1.75rem] px-1 py-4 transition-colors duration-300 hover:bg-paper/[0.08] sm:px-3"
              :style="{ '--i': i }"
              @click="openWithMood(mood.value)"
            >
              <MoodFace :mood="mood.value" class="h-12 w-12 transition-transform duration-500 ease-out-back group-hover:-translate-y-2 group-hover:scale-110 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
              <span class="text-xs font-semibold text-paper/70 transition-colors group-hover:text-paper sm:text-sm">{{ mood.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Météo de l'équipe -->
      <div v-reveal="0.2" class="mt-3 grid gap-3 md:grid-cols-12">
        <div class="rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 md:col-span-7 lg:col-span-8">
          <div class="flex flex-wrap items-baseline justify-between gap-3">
            <p class="label text-ink/55">Météo de l'équipe</p>
            <p class="font-mono text-xs text-ink/45">{{ weatherPosts.length }} partages récents</p>
          </div>
          <div class="mt-6 flex h-5 overflow-hidden rounded-full bg-ink/[0.06]" role="img" :aria-label="weatherLabel">
            <span
              v-for="m in distribution"
              :key="m.value"
              class="weather-bar h-full"
              :style="{ width: weatherReady ? `${m.pct}%` : '0%', backgroundColor: moodColor(m.value) }"
            />
          </div>
          <ul class="mt-6 grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-5">
            <li v-for="m in distribution" :key="m.value" class="min-w-0">
              <p class="display text-[clamp(1.4rem,3vw,2.4rem)] leading-none tracking-[-0.05em]">{{ m.pct }}<span class="text-[0.5em] text-ink/40">%</span></p>
              <p class="mt-2 flex items-center gap-1.5 truncate text-xs font-medium text-ink/60">
                <span class="h-2 w-2 shrink-0 rounded-full" :style="{ backgroundColor: moodColor(m.value) }" />
                {{ m.label }}
              </p>
            </li>
          </ul>
        </div>
        <div class="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] p-6 sm:p-8 md:col-span-5 lg:col-span-4" :style="{ backgroundColor: moodColor(teamMood) }">
          <div class="flex items-start justify-between gap-4">
            <p class="label" :style="{ color: moodOnColor(teamMood) }">Humeur moyenne</p>
            <span class="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-sun" />
              </span>
              {{ activeUsersCount }} actifs
            </span>
          </div>
          <div class="mt-8 flex items-end justify-between gap-4" :style="{ color: moodOnColor(teamMood) }">
            <div>
              <p class="display text-[clamp(3rem,6vw,5rem)] leading-[0.85] tracking-[-0.06em]">{{ teamScore }}<span class="text-[0.4em] opacity-50">/5</span></p>
              <p class="mt-3 text-sm font-semibold">{{ getMoodName(teamMood) }}</p>
            </div>
            <span class="grid h-24 w-24 shrink-0 animate-drift place-items-center rounded-full bg-paper/70 sm:h-28 sm:w-28"><MoodFace :mood="teamMood" class="h-16 w-16 sm:h-20 sm:w-20" /></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         FIL
         ============================================================ -->
    <section class="shell mt-16 grid gap-10 md:mt-20 xl:grid-cols-[minmax(0,1fr)_19rem]" aria-labelledby="feed-title">
      <div class="min-w-0">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 class="display text-display-md">Le <span class="accent">mur</span></h2>
          <p class="label text-ink/50">{{ posts.length }} {{ posts.length > 1 ? 'publications' : 'publication' }}</p>
        </div>

        <!-- Filtres d'humeur -->
        <div class="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide sm:mx-0 sm:px-0" role="group" aria-label="Filtrer par humeur">
          <button
            type="button"
            :aria-pressed="filterMood === ''"
            @click="setFilter('')"
            :class="[
              'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300',
              filterMood === '' ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'
            ]"
          >
            Toutes
          </button>
          <button
            v-for="mood in moods"
            :key="mood.value"
            type="button"
            :aria-pressed="filterMood === mood.value"
            @click="setFilter(mood.value)"
            :class="[
              'flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors duration-300',
              filterMood === mood.value ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'
            ]"
          >
            <MoodFace :mood="mood.value" class="h-7 w-7" />
            {{ mood.label }}
          </button>
        </div>

        <!-- Chargement -->
        <div v-if="loadingPosts" class="grid place-items-center py-24" role="status">
          <SunMark class="h-16 w-16 animate-spin-slow" :face="false" :ray-count="14" :ray-width="9" />
          <span class="sr-only">Chargement</span>
        </div>

        <!-- Vide -->
        <div v-else-if="posts.length === 0" class="mt-8 grid place-items-center rounded-[2.5rem] bg-paper-deep/70 px-6 py-20 text-center">
          <MoodFace mood="peek" class="h-20 w-20" />
          <p class="display mt-6 text-display-sm">Rien par ici pour l'instant</p>
          <p class="mt-3 max-w-sm text-ink/60">Soyez la première personne à partager son humeur.</p>
          <button type="button" class="btn btn-ink mt-8" @click="showPostModal = true">Partager mon humeur</button>
        </div>

        <!-- Publications -->
        <div v-else class="mt-8 gap-3 sm:columns-2 [&>*]:mb-3">
          <article
            v-for="(post, index) in posts"
            :key="post.id"
            v-reveal="(index % 4) * 0.06"
            class="post-card group/post relative break-inside-avoid overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-5 sm:p-6"
            :style="{ '--mood': moodColor(post.mood) }"
          >
            <span class="post-blob pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full" aria-hidden="true" />

            <div class="relative flex items-start gap-3">
              <MoodFace :mood="post.mood" class="h-12 w-12 shrink-0" :label="getMoodName(post.mood)" />
              <div class="min-w-0 flex-1">
                <p class="truncate font-semibold">
                  {{ post.is_anonymous ? 'Anonyme' : (post.profiles?.display_name || 'Collègue') }}
                </p>
                <p class="mt-0.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
                  <time :datetime="post.created_at">{{ formatDate(post.created_at) }}</time>
                  <span aria-hidden="true">·</span>
                  <span>{{ getMoodName(post.mood) }}</span>
                </p>
              </div>
              <button
                v-if="canDeletePost(post)"
                type="button"
                @click.stop="confirmDeletePost(post.id)"
                class="-mr-2 -mt-2 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/35 transition-colors hover:bg-coral/15 hover:text-coral"
                aria-label="Supprimer la publication"
              >
                <Icon name="trash" class="h-4 w-4" />
              </button>
            </div>

            <p class="relative mt-5 text-pretty text-[1.2rem] font-medium leading-snug tracking-[-0.01em]">{{ post.message }}</p>

            <div v-if="post.tags && post.tags.length > 0" class="relative mt-4 flex flex-wrap gap-1.5">
              <span v-for="tagId in post.tags" :key="tagId" class="tag">#{{ getTagLabel(tagId) }}</span>
            </div>

            <div class="relative mt-5 flex items-center gap-1.5 border-t border-ink/[0.07] pt-4">
              <button
                type="button"
                @click.stop="addReaction(post.id, '❤️')"
                :class="[
                  'group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                  hasUserReacted(post.id, '❤️') ? 'bg-coral/15 text-coral' : 'text-ink/55 hover:bg-coral/10 hover:text-coral'
                ]"
                :aria-pressed="hasUserReacted(post.id, '❤️')"
                aria-label="J'aime"
              >
                <Icon
                  name="heart"
                  :class="['h-4 w-4 transition-transform duration-300 ease-out-back group-active:scale-150', hasUserReacted(post.id, '❤️') ? 'fill-coral' : '']"
                />
                <span :class="hasUserReacted(post.id, '❤️') ? 'font-bold' : ''">{{ getReactionCount(post.id, '❤️') }}</span>
              </button>
              <button
                type="button"
                @click.stop="toggleReplyForm(post.id)"
                class="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                :class="isReplyFormOpen(post.id) ? 'bg-lilac text-ink' : 'text-ink/55 hover:bg-lilac/50 hover:text-ink'"
                :aria-expanded="isReplyFormOpen(post.id)"
                aria-label="Réponses"
              >
                <Icon name="message" class="h-4 w-4" />
                <span>{{ getReplies(post.id).length }}</span>
              </button>
            </div>

            <!-- Réponses -->
            <div v-if="isReplyFormOpen(post.id)" class="relative mt-4 space-y-4">
              <div v-if="getReplies(post.id).length > 0" class="space-y-3 border-l-2 border-lilac pl-4">
                <div v-for="reply in getReplies(post.id)" :key="reply.id">
                  <p class="flex items-baseline gap-2 text-xs">
                    <span class="font-semibold">{{ reply.is_anonymous ? 'Anonyme' : (reply.profiles?.display_name || 'Collègue') }}</span>
                    <time :datetime="reply.created_at" class="font-mono text-ink/45">{{ formatDate(reply.created_at) }}</time>
                  </p>
                  <p class="mt-1 text-sm leading-relaxed">{{ reply.message }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <input
                  v-model="replyText[post.id]"
                  @keyup.enter="submitReply(post.id)"
                  class="field min-w-0 flex-1 rounded-full py-2.5 text-sm"
                  placeholder="Écrire un mot bienveillant…"
                  aria-label="Répondre"
                />
                <button type="button" @click="submitReply(post.id)" :disabled="!replyText[post.id]" class="btn btn-ink btn-sm">
                  Envoyer
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Colonne latérale -->
      <aside class="hidden xl:block">
        <div class="sticky top-8 space-y-3">
          <div class="rounded-[2rem] bg-grape p-6 text-paper">
            <p class="label text-paper/65">Sujets du moment</p>
            <ol class="mt-4">
              <li
                v-for="(tag, i) in trendingTags"
                :key="tag.id"
                class="flex items-baseline gap-4 border-b border-paper/15 py-3.5 last:border-0"
              >
                <span class="display w-6 text-2xl leading-none text-sun">{{ i + 1 }}</span>
                <span class="min-w-0 flex-1 truncate font-semibold">{{ tag.label }}</span>
                <span class="font-mono text-xs text-paper/60">{{ tag.count }}</span>
              </li>
            </ol>
          </div>

          <div class="rounded-[2rem] bg-sun p-6">
            <div class="flex -space-x-2.5" aria-hidden="true">
              <MoodFace v-for="mood in moods" :key="mood.value" :mood="mood.value" class="h-10 w-10 rounded-full ring-[3px] ring-ink" />
            </div>
            <p class="display mt-6 text-[1.7rem] leading-[0.95] tracking-[-0.045em]">Un mot pour l'équipe&nbsp;?</p>
            <p class="mt-2 text-sm text-ink/70">Anonyme par défaut. Toujours.</p>
            <button type="button" @click="showPostModal = true" class="btn btn-ink mt-6 w-full">
              <RollText text="Partager mon humeur" />
            </button>
          </div>
        </div>
      </aside>
    </section>

    <!-- Post Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out-expo"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showPostModal"
          class="modal-backdrop"
          @click.self="showPostModal = false"
          @keydown.esc="showPostModal = false"
        >
          <div class="modal-panel sm:max-w-2xl" role="dialog" aria-modal="true" aria-labelledby="post-modal-title" data-lenis-prevent>
            <div class="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-paper/95 px-5 py-4 backdrop-blur">
              <button
                type="button"
                @click="showPostModal = false"
                class="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/[0.06]"
                aria-label="Fermer"
              >
                <Icon name="x" class="h-5 w-5" />
              </button>
              <button
                type="button"
                @click="createPost"
                :disabled="!selectedMood || loading"
                class="btn btn-ink btn-sm px-6"
              >
                {{ loading ? 'Publication…' : 'Publier' }}
              </button>
            </div>

            <div class="space-y-6 p-5 sm:p-7">
              <!-- Mood selector -->
              <div>
                <h2 id="post-modal-title" class="display text-3xl tracking-[-0.04em]">Comment vous sentez-vous&nbsp;?</h2>
                <div class="mt-5 grid grid-cols-5 gap-2" role="radiogroup" aria-labelledby="post-modal-title">
                  <button
                    v-for="mood in moods"
                    :key="mood.value"
                    type="button"
                    role="radio"
                    :aria-checked="selectedMood === mood.value"
                    @click="selectedMood = mood.value"
                    class="group flex flex-col items-center gap-2 rounded-3xl px-1 py-4 transition-[background-color,transform,box-shadow] duration-300 ease-out-expo"
                    :class="selectedMood === mood.value ? 'scale-[1.04] ring-2 ring-ink' : 'bg-ink/[0.04] hover:bg-ink/[0.08]'"
                    :style="selectedMood === mood.value ? { backgroundColor: moodColor(mood.value) } : undefined"
                  >
                    <MoodFace :mood="mood.value" class="h-11 w-11 transition-transform duration-500 ease-out-back group-hover:scale-110 sm:h-14 sm:w-14" :class="selectedMood === mood.value ? 'rounded-full ring-4 ring-paper' : ''" />
                    <span
                      class="text-xs font-semibold"
                      :style="selectedMood === mood.value ? { color: moodOnColor(mood.value) } : undefined"
                    >{{ mood.label }}</span>
                  </button>
                </div>
                <!-- Supportive message when selecting the most negative mood -->
                <div v-if="selectedMood === 'very_sad'" class="mt-4 flex gap-4 rounded-3xl bg-lilac/60 p-5" role="note">
                  <MoodFace mood="sleepy" class="h-10 w-10 shrink-0" />
                  <div>
                    <p class="font-semibold">Nous sommes là pour vous</p>
                    <p class="mt-1 text-sm leading-relaxed text-ink/75">
                      Si vous vous sentez dépassé·e, parlez-en à une personne de confiance
                      ou à un professionnel. En cas d'urgence, appelez le 15, le 112
                      ou le 3114 (prévention du suicide), gratuits et disponibles 24h/24.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div v-if="selectedMood">
                <p class="field-label">Qu'est-ce qui influence votre humeur ? (facultatif)</p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="tag in moodTags"
                    :key="tag.id"
                    type="button"
                    @click="toggleTag(tag.id)"
                    :aria-pressed="selectedTags.includes(tag.id)"
                    :class="[
                      'rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                      selectedTags.includes(tag.id)
                        ? 'bg-ink text-paper'
                        : 'bg-ink/[0.05] text-ink/75 hover:bg-ink/10'
                    ]"
                  >
                    {{ tag.label }}
                  </button>
                </div>
              </div>

              <!-- Message -->
              <div>
                <textarea
                  v-model="message"
                  rows="4"
                  class="field resize-none text-[16px]"
                  placeholder="Envie d'en dire plus ? (facultatif)"
                  aria-label="Message (facultatif)"
                ></textarea>
              </div>

              <!-- Anonymous toggle -->
              <label class="flex cursor-pointer items-center justify-between gap-4 rounded-3xl bg-ink/[0.04] p-4">
                <span class="flex items-center gap-3">
                  <span class="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper">
                    <Icon name="mask" class="h-5 w-5" />
                  </span>
                  <span>
                    <span class="block text-sm font-semibold">Publier anonymement</span>
                    <span class="block text-xs text-ink/55">Votre nom reste masqué</span>
                  </span>
                </span>
                <input v-model="isAnonymous" type="checkbox" class="peer sr-only">
                <span class="switch" aria-hidden="true" />
              </label>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Onboarding Guide for New Users -->
    <OnboardingGuide />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile } from '../lib/auth';
import type { Database } from '../lib/database.types';
import OnboardingGuide from '../components/OnboardingGuide.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import SunMark from '../components/brand/SunMark.vue';
import Icon from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import { moodColor, moodOnColor, moodFromScore, type MoodValue } from '../lib/moods';

type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles?: {
    display_name: string | null;
  };
};

const moods = [
  { value: 'very_happy', label: 'Radieux' },
  { value: 'happy', label: 'Bien' },
  { value: 'neutral', label: 'Correct' },
  { value: 'sad', label: 'Pas top' },
  { value: 'very_sad', label: 'Difficile' },
];

const moodTags = [
  { id: 'workload', label: 'Charge de travail' },
  { id: 'team', label: 'Esprit d\'équipe' },
  { id: 'work_life', label: 'Équilibre pro/perso' },
  { id: 'management', label: 'Management' },
  { id: 'environment', label: 'Environnement' },
  { id: 'growth', label: 'Évolution' },
  { id: 'recognition', label: 'Reconnaissance' },
];

const filterMood = ref('');
const selectedMood = ref('');
const selectedTags = ref<string[]>([]);
const message = ref('');
const isAnonymous = ref(true);
const loading = ref(false);
const loadingPosts = ref(true);
const posts = ref<Post[]>([]);
const replyText = reactive<Record<string, string>>({});
const openReplyForms = ref<string[]>([]);
const postReplies = ref<Record<string, any[]>>({});
const postReactions = ref<Record<string, any[]>>({});
const showPostModal = ref(false);
const activeUsersCount = ref(12); // Valeur fixe pour éviter Math.random()

// Salutation personnalisée
const firstName = computed(() => (currentProfile.value?.display_name || '').split(' ')[0] || 'vous');
const greeting = computed(() => {
  const h = new Date().getHours();
  return h >= 18 || h < 5 ? 'Bonsoir' : 'Bonjour';
});

// Météo de l'équipe, calculée sur les dernières publications non filtrées
const weatherPosts = ref<Post[]>([]);
const weatherReady = ref(false);
const MOOD_SCORES: Record<string, number> = { very_happy: 5, happy: 4, neutral: 3, sad: 2, very_sad: 1 };

const distribution = computed(() => {
  const total = weatherPosts.value.length || 1;
  return moods.map(m => {
    const count = weatherPosts.value.filter(p => p.mood === m.value).length;
    return { ...m, count, pct: Math.round((count / total) * 100) };
  });
});

const teamAverage = computed(() => {
  if (!weatherPosts.value.length) return 3;
  return weatherPosts.value.reduce((sum, p) => sum + (MOOD_SCORES[p.mood] ?? 3), 0) / weatherPosts.value.length;
});
const teamScore = computed(() => teamAverage.value.toFixed(1).replace('.', ','));
const teamMood = computed<MoodValue>(() => moodFromScore(teamAverage.value));
const weatherLabel = computed(() => distribution.value.map(m => `${m.label} ${m.pct} %`).join(', '));

const trendingTags = computed(() => {
  const counts: Record<string, number> = {};
  weatherPosts.value.forEach(p => p.tags?.forEach(t => (counts[t] = (counts[t] || 0) + 1)));
  return moodTags
    .map(t => ({ ...t, count: counts[t.id] || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
});

function setFilter(value: string) {
  filterMood.value = filterMood.value === value ? '' : value;
  loadPosts();
}

function openWithMood(value: string) {
  selectedMood.value = value;
  showPostModal.value = true;
}

function getMoodName(mood: string): string {
  return moods.find(m => m.value === mood)?.label || 'Correct';
}

function getTagLabel(tagId: string): string {
  const tag = moodTags.find(t => t.id === tagId);
  return tag ? tag.label : tagId;
}

function toggleTag(tagId: string) {
  if (selectedTags.value.includes(tagId)) {
    selectedTags.value = selectedTags.value.filter(id => id !== tagId);
  } else {
    selectedTags.value.push(tagId);
  }
}

function addReaction(contentId: string, emoji: string) {
  if (!currentProfile.value) return;

  const existingReaction = postReactions.value[contentId]?.find(
    r => r.user_id === currentProfile.value.id && r.emoji === emoji
  );

  if (existingReaction) {
    removeReaction(existingReaction.id, contentId, emoji);
  } else {
    addNewReaction(contentId, emoji);
  }
}

async function addNewReaction(contentId: string, emoji: string) {
  try {
    const { data, error } = await supabase
      .from('post_reactions')
      .insert({
        user_id: currentProfile.value.id,
        post_id: contentId,
        emoji: emoji
      })
      .select()
      .single();

    if (error) throw error;

    if (!postReactions.value[contentId]) {
      postReactions.value[contentId] = [];
    }

    postReactions.value[contentId].push(data);
  } catch (error) {
    console.error('Error adding reaction:', error);
  }
}

async function removeReaction(reactionId: string, contentId: string, emoji: string) {
  try {
    const { error } = await supabase
      .from('post_reactions')
      .delete()
      .eq('id', reactionId);

    if (error) throw error;

    if (postReactions.value[contentId]) {
      postReactions.value[contentId] = postReactions.value[contentId].filter(
        r => !(r.user_id === currentProfile.value.id && r.emoji === emoji)
      );
    }
  } catch (error) {
    console.error('Error removing reaction:', error);
  }
}

function getReactionCount(contentId: string, emoji: string): number {
  return postReactions.value[contentId]?.filter(r => r.emoji === emoji).length || 0;
}

function hasUserReacted(contentId: string, emoji: string): boolean {
  if (!currentProfile.value) return false;
  return postReactions.value[contentId]?.some(
    r => r.user_id === currentProfile.value.id && r.emoji === emoji
  ) || false;
}

function toggleReplyForm(postId: string) {
  const index = openReplyForms.value.indexOf(postId);
  if (index === -1) {
    openReplyForms.value.push(postId);
  } else {
    openReplyForms.value.splice(index, 1);
  }
}

function isReplyFormOpen(postId: string): boolean {
  return openReplyForms.value.includes(postId);
}

function getReplies(postId: string) {
  return postReplies.value[postId] || [];
}

function canDeletePost(post: Post): boolean {
  if (!currentProfile.value) return false;
  return post.user_id === currentProfile.value.id;
}

function confirmDeletePost(postId: string) {
  if (confirm('Supprimer cette publication ?')) {
    deletePost(postId);
  }
}

async function deletePost(postId: string) {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', currentProfile.value.id);

    if (error) throw error;

    posts.value = posts.value.filter(post => post.id !== postId);
    delete postReplies.value[postId];
    delete postReactions.value[postId];
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Impossible de supprimer la publication. Réessayez.');
  }
}

async function submitReply(postId: string) {
  if (!currentProfile.value || !replyText[postId]) return;

  try {
    const { data, error } = await supabase
      .from('post_replies')
      .insert({
        post_id: postId,
        user_id: currentProfile.value.id,
        message: replyText[postId],
        is_anonymous: isAnonymous.value
      })
      .select()
      .single();

    if (error) throw error;

    if (!postReplies.value[postId]) {
      postReplies.value[postId] = [];
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', currentProfile.value.id)
      .single();

    postReplies.value[postId].push({
      ...data,
      profiles: profileData
    });

    replyText[postId] = '';
  } catch (error) {
    console.error('Error submitting reply:', error);
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'à l\'instant';
  if (diffMins < 60) return `il y a ${diffMins} min`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `il y a ${diffHours} h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `il y a ${diffDays} j`;

  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

async function loadPosts() {
  loadingPosts.value = true;

  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          display_name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(50);

    if (filterMood.value) {
      query = query.eq('mood', filterMood.value);
    }

    const { data, error } = await query;

    if (error) throw error;

    posts.value = data || [];
    if (!filterMood.value) weatherPosts.value = posts.value;
    await loadRepliesAndReactions();
  } catch (error) {
    console.error('Error loading posts:', error);
  } finally {
    loadingPosts.value = false;
    requestAnimationFrame(() => (weatherReady.value = true));
  }
}

async function loadRepliesAndReactions() {
  try {
    try {
      const { data: repliesData } = await supabase
        .from('post_replies')
        .select('*, profiles(display_name)')
        .order('created_at', { ascending: true });

      if (repliesData) {
        postReplies.value = {};
        repliesData.forEach(reply => {
          if (!postReplies.value[reply.post_id]) {
            postReplies.value[reply.post_id] = [];
          }
          postReplies.value[reply.post_id].push(reply);
        });
      }
    } catch (repliesError) {
      console.log('Table post_replies not yet created');
    }

    try {
      const { data: reactionsData } = await supabase
        .from('post_reactions')
        .select('*');

      if (reactionsData) {
        postReactions.value = {};
        reactionsData.forEach(reaction => {
          const contentId = reaction.post_id || reaction.reply_id;
          if (!postReactions.value[contentId]) {
            postReactions.value[contentId] = [];
          }
          postReactions.value[contentId].push(reaction);
        });
      }
    } catch (reactionsError) {
      console.log('Table post_reactions not yet created');
    }
  } catch (error) {
    console.error('Error loading replies and reactions:', error);
  }
}

async function createPost() {
  if (!selectedMood.value || !currentProfile.value) return;

  loading.value = true;

  try {
    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: currentProfile.value.id,
        mood: selectedMood.value as any,
        message: message.value || `Humeur du jour : ${moods.find(m => m.value === selectedMood.value)?.label.toLowerCase()}`,
        is_anonymous: isAnonymous.value,
        anonymous_id: currentProfile.value.anonymous_id,
        service: currentProfile.value.service,
        tags: selectedTags.value.length > 0 ? selectedTags.value : null
      } as any);

    if (!error) {
      selectedMood.value = '';
      message.value = '';
      selectedTags.value = [];
      isAnonymous.value = true;
      showPostModal.value = false;
      await loadPosts();
    } else {
      console.error('Error creating post:', error);
    }
  } catch (error) {
    console.error('Error creating post:', error);
  }

  loading.value = false;
}

onMounted(() => {
  loadPosts();

  const subscription = supabase
    .channel('posts_channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, () => {
      loadPosts();
    })
    .subscribe();

  // Écouter l'événement pour ouvrir le modal depuis le guide d'onboarding
  const handleOpenPostModal = () => {
    showPostModal.value = true;
  };

  window.addEventListener('open-post-modal', handleOpenPostModal);

  return () => {
    subscription.unsubscribe();
    window.removeEventListener('open-post-modal', handleOpenPostModal);
  };
});
</script>

<style scoped>
.post-card {
  transition:
    transform 0.6s var(--ease-out-expo),
    box-shadow 0.6s var(--ease-out-expo),
    border-color 0.4s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  border-color: transparent;
  box-shadow: 0 30px 60px -36px rgba(26, 14, 43, 0.5);
}

/* Tache de couleur de l'humeur qui s'étend au survol */
.post-blob {
  background: var(--mood);
  opacity: 0.35;
  transform: scale(1);
  transition:
    transform 0.9s var(--ease-out-expo),
    opacity 0.6s ease;
}

.post-card:hover .post-blob {
  transform: scale(1.7);
  opacity: 0.5;
}

.weather-bar {
  transition: width 1.4s var(--ease-out-expo);
}

.weather-bar + .weather-bar {
  box-shadow: inset 2px 0 0 #fff;
}

.checkin-glow {
  animation: drift 9s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .post-card:hover {
    transform: none;
  }
}
</style>
