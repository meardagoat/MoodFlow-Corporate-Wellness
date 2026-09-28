<template>
  <div class="min-h-screen">
    <div
      class="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:py-10 xl:grid-cols-[15rem_minmax(0,1fr)_19rem]"
    >
      <!-- Colonne gauche -->
      <aside class="hidden lg:block">
        <div class="sticky top-24 space-y-3">
          <div class="relative overflow-hidden rounded-[2rem] bg-sun p-6">
            <div class="flex -space-x-2.5" aria-hidden="true">
              <MoodFace
                v-for="mood in moods"
                :key="mood.value"
                :mood="mood.value"
                class="h-10 w-10 rounded-full ring-[3px] ring-sun transition-transform duration-500 ease-out-back hover:-translate-y-1.5"
              />
            </div>
            <p class="display mt-8 text-[1.9rem] leading-[0.95] tracking-[-0.045em]">How are you feeling?</p>
            <button
              type="button"
              @click="showPostModal = true"
              class="btn btn-ink mt-6 w-full"
            >
              <RollText text="✨ Share Mood" />
            </button>
          </div>

          <div class="flex items-center gap-3 rounded-[2rem] border border-ink/10 bg-white p-4">
            <span class="display grid h-12 w-12 shrink-0 place-items-center rounded-full bg-grape text-lg text-paper">
              {{ currentProfile?.email?.charAt(0).toUpperCase() }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate font-semibold">{{ currentProfile?.display_name || 'You' }}</p>
              <p class="label mt-1 truncate text-ink/50">{{ currentProfile?.service }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Fil central - Posts -->
      <section class="min-w-0" aria-labelledby="feed-title">
        <header>
          <h1 id="feed-title" class="display text-display-md">Wellness Feed</h1>
          <p class="mt-3 text-lg text-ink/65">Partagez votre humeur et découvrez celle de votre équipe</p>

          <!-- Filtres d'humeur -->
          <div class="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:px-0" role="tablist" aria-label="Filtrer par humeur">
            <button
              type="button"
              role="tab"
              :aria-selected="filterMood === ''"
              @click="filterMood = ''; loadPosts()"
              :class="[
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300',
                filterMood === '' ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'
              ]"
            >
              All Moods
            </button>
            <button
              v-for="mood in moods.slice(0, 3)"
              :key="mood.value"
              type="button"
              role="tab"
              :aria-selected="filterMood === mood.value"
              @click="filterMood = mood.value; loadPosts()"
              :class="[
                'flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors duration-300',
                filterMood === mood.value ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'
              ]"
            >
              <MoodFace :mood="mood.value" class="h-7 w-7" />
              {{ mood.label }}
            </button>
          </div>
        </header>

        <!-- Création de post (mobile) -->
        <button
          type="button"
          @click="showPostModal = true"
          class="btn btn-sun btn-lg mt-6 w-full lg:hidden"
        >
          ✨ Share Your Mood
        </button>

        <!-- Loading -->
        <div v-if="loadingPosts" class="grid place-items-center py-20" role="status">
          <SunMark class="h-16 w-16 animate-spin-slow" :face="false" :ray-count="14" :ray-width="9" />
          <span class="sr-only">Loading</span>
        </div>

        <!-- Posts -->
        <div v-else class="mt-6 space-y-3">
          <article
            v-for="post in posts"
            :key="post.id"
            class="rounded-[1.75rem] border border-ink/10 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(26,14,43,0.45)] sm:p-6"
          >
            <div class="flex gap-4">
              <!-- Avatar -->
              <MoodFace :mood="post.mood" class="h-11 w-11 shrink-0" :label="getMoodName(post.mood)" />

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <!-- Header -->
                <div class="flex items-start justify-between gap-3">
                  <div class="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span class="truncate font-semibold">
                      {{ post.is_anonymous ? 'Anonymous' : (post.profiles?.display_name || 'User') }}
                    </span>
                    <span class="text-ink/30" aria-hidden="true">·</span>
                    <time :datetime="post.created_at" class="font-mono text-xs text-ink/50">{{ formatDate(post.created_at) }}</time>
                  </div>

                  <button
                    v-if="canDeletePost(post)"
                    type="button"
                    @click.stop="confirmDeletePost(post.id)"
                    class="-mr-1.5 -mt-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/35 transition-colors hover:bg-coral/15 hover:text-coral"
                    aria-label="Delete post"
                  >
                    <Icon name="trash" class="h-4 w-4" />
                  </button>
                </div>

                <!-- Message -->
                <p class="mt-2 text-pretty text-[16px] leading-relaxed">{{ post.message }}</p>

                <!-- Tags -->
                <div v-if="post.tags && post.tags.length > 0" class="mt-3 flex flex-wrap gap-1.5">
                  <span
                    v-for="tagId in post.tags"
                    :key="tagId"
                    class="tag"
                  >
                    {{ getTagLabel(tagId) }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    @click.stop="toggleReplyForm(post.id)"
                    class="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                    :class="isReplyFormOpen(post.id) ? 'bg-lilac text-ink' : 'text-ink/55 hover:bg-lilac/50 hover:text-ink'"
                    :aria-expanded="isReplyFormOpen(post.id)"
                    aria-label="Replies"
                  >
                    <Icon name="message" class="h-4 w-4" />
                    <span>{{ getReplies(post.id).length }}</span>
                  </button>

                  <button
                    type="button"
                    @click.stop="addReaction(post.id, '❤️')"
                    :class="[
                      'group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                      hasUserReacted(post.id, '❤️') ? 'bg-coral/15 text-coral' : 'text-ink/55 hover:bg-coral/10 hover:text-coral'
                    ]"
                    :aria-pressed="hasUserReacted(post.id, '❤️')"
                    aria-label="Like"
                  >
                    <Icon
                      name="heart"
                      :class="['h-4 w-4 transition-transform duration-300 ease-out-back group-active:scale-125', hasUserReacted(post.id, '❤️') ? 'fill-coral' : '']"
                    />
                    <span :class="hasUserReacted(post.id, '❤️') ? 'font-bold' : ''">{{ getReactionCount(post.id, '❤️') }}</span>
                  </button>
                </div>

                <!-- Reply form -->
                <div v-if="isReplyFormOpen(post.id)" class="mt-4 border-t border-ink/10 pt-4">
                  <div class="flex gap-2">
                    <input
                      v-model="replyText[post.id]"
                      @keyup.enter="submitReply(post.id)"
                      class="field min-w-0 flex-1 rounded-full py-2.5 text-sm"
                      placeholder="Tweet your reply"
                      aria-label="Tweet your reply"
                    />
                    <button
                      type="button"
                      @click="submitReply(post.id)"
                      :disabled="!replyText[post.id]"
                      class="btn btn-ink btn-sm"
                    >
                      Reply
                    </button>
                  </div>
                </div>

                <!-- Replies (threads) -->
                <div v-if="getReplies(post.id).length > 0 && isReplyFormOpen(post.id)" class="mt-4 space-y-4 border-l-2 border-lilac pl-4">
                  <div
                    v-for="reply in getReplies(post.id)"
                    :key="reply.id"
                    class="flex gap-3"
                  >
                    <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper-deep text-ink/60">
                      <Icon name="user" class="h-4 w-4" />
                    </span>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-baseline gap-2 text-xs">
                        <span class="font-semibold">
                          {{ reply.is_anonymous ? 'Anonymous' : (reply.profiles?.display_name || 'User') }}
                        </span>
                        <span class="text-ink/30" aria-hidden="true">·</span>
                        <time :datetime="reply.created_at" class="font-mono text-ink/50">{{ formatDate(reply.created_at) }}</time>
                      </div>
                      <p class="mt-1 text-sm leading-relaxed">{{ reply.message }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Colonne droite - Widgets -->
      <aside class="hidden xl:block">
        <div class="sticky top-24 space-y-3">
          <!-- Search -->
          <div class="relative">
            <Icon name="search" class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" />
            <input
              type="text"
              placeholder="Search moods"
              aria-label="Search moods"
              class="field rounded-full py-3 pl-11 text-sm"
            />
          </div>

          <!-- Mood filter -->
          <div class="rounded-[2rem] border border-ink/10 bg-white p-5">
            <h3 class="label text-ink/55">Filter by Mood</h3>
            <div class="mt-4 space-y-1">
              <button
                v-for="mood in moods"
                :key="mood.value"
                type="button"
                @click="filterMood = filterMood === mood.value ? '' : mood.value; loadPosts()"
                :aria-pressed="filterMood === mood.value"
                class="flex w-full items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-left transition-colors duration-300"
                :class="filterMood === mood.value ? 'bg-ink text-paper' : 'hover:bg-ink/[0.05]'"
              >
                <MoodFace :mood="mood.value" class="h-8 w-8" />
                <span class="text-sm font-semibold">{{ mood.label }}</span>
              </button>
            </div>
          </div>

          <!-- Stats -->
          <div class="rounded-[2rem] bg-grape p-5 text-paper">
            <h3 class="label text-paper/65">Team Pulse</h3>
            <dl class="mt-5 grid grid-cols-2 gap-3">
              <div>
                <dt class="text-xs text-paper/70">Total Posts</dt>
                <dd class="display mt-1 text-4xl tracking-[-0.05em]">{{ posts.length }}</dd>
              </div>
              <div>
                <dt class="text-xs text-paper/70">Active Now</dt>
                <dd class="display mt-1 flex items-center gap-2 text-4xl tracking-[-0.05em] text-sun">
                  <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-sun" />
                  </span>
                  {{ activeUsersCount }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Tags trending -->
          <div class="rounded-[2rem] border border-ink/10 bg-white p-5">
            <h3 class="label text-ink/55">Trending Topics</h3>
            <ol class="mt-3">
              <li
                v-for="(tag, i) in moodTags.slice(0, 5)"
                :key="tag.id"
                class="flex items-center gap-3 border-b border-ink/[0.07] py-3 last:border-0"
              >
                <span class="display w-6 text-xl text-ink/25">{{ i + 1 }}</span>
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold">{{ tag.label }}</p>
                  <p class="font-mono text-[11px] text-ink/45">{{ i + 1 }} · Trending · {{ (tag as any).mentionCount || 42 }} mentions</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </aside>
    </div>

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
                aria-label="Close"
              >
                <Icon name="x" class="h-5 w-5" />
              </button>
              <button
                type="button"
                @click="createPost"
                :disabled="!selectedMood || loading"
                class="btn btn-ink btn-sm px-6"
              >
                {{ loading ? 'Posting...' : 'Post' }}
              </button>
            </div>

            <div class="space-y-6 p-5 sm:p-7">
              <!-- Mood selector -->
              <div>
                <h2 id="post-modal-title" class="display text-3xl tracking-[-0.04em]">How are you feeling?</h2>
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
                    <MoodFace :mood="mood.value" class="h-11 w-11 transition-transform duration-500 ease-out-back group-hover:scale-110 sm:h-14 sm:w-14" />
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
                    <p class="font-semibold">We're here for you 💛</p>
                    <p class="mt-1 text-sm leading-relaxed text-ink/75">
                      If you're feeling overwhelmed, don't hesitate to talk to someone you trust
                      or a professional. In case of emergency, contact emergency services
                      in your country immediately.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div v-if="selectedMood">
                <p class="field-label">What's affecting your mood? (optional)</p>
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
                  placeholder="What's happening? (optional)"
                  aria-label="What's happening? (optional)"
                ></textarea>
              </div>

              <!-- Anonymous toggle -->
              <label class="flex cursor-pointer items-center justify-between gap-4 rounded-3xl bg-ink/[0.04] p-4">
                <span class="flex items-center gap-3">
                  <span class="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper">
                    <Icon name="mask" class="h-5 w-5" />
                  </span>
                  <span>
                    <span class="block text-sm font-semibold">Post anonymously</span>
                    <span class="block text-xs text-ink/55">Hide your identity</span>
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
import { ref, onMounted, reactive } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile } from '../lib/auth';
import type { Database } from '../lib/database.types';
import OnboardingGuide from '../components/OnboardingGuide.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import SunMark from '../components/brand/SunMark.vue';
import Icon from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import { moodColor, moodOnColor } from '../lib/moods';

type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles?: {
    display_name: string | null;
  };
};

const moods = [
  { value: 'very_happy', emoji: '😄', label: 'Great' },
  { value: 'happy', emoji: '😊', label: 'Good' },
  { value: 'neutral', emoji: '😐', label: 'Okay' },
  { value: 'sad', emoji: '😟', label: 'Bad' },
  { value: 'very_sad', emoji: '😢', label: 'Awful' },
];

const moodTags = [
  { id: 'workload', label: '💼 Workload' },
  { id: 'team', label: '👥 Team Spirit' },
  { id: 'work_life', label: '⚖️ Work-Life Balance' },
  { id: 'management', label: '👔 Management' },
  { id: 'environment', label: '🏢 Environment' },
  { id: 'growth', label: '📈 Growth' },
  { id: 'recognition', label: '🌟 Recognition' },
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

function getMoodName(mood: string): string {
  return moods.find(m => m.value === mood)?.label || 'Okay';
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
  if (confirm('Delete this post?')) {
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
    alert('Error deleting post. Please try again.');
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

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    await loadRepliesAndReactions();
  } catch (error) {
    console.error('Error loading posts:', error);
  } finally {
    loadingPosts.value = false;
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
        message: message.value || `Feeling ${moods.find(m => m.value === selectedMood.value)?.label.toLowerCase()}`,
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
