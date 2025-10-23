<template>
  <div class="min-h-screen bg-white">
    <!-- Mobile Navigation -->
    <div class="lg:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div class="flex items-center justify-between p-4">
        <h1 class="text-xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
          MoodFlow
        </h1>
        <div class="flex items-center gap-3">
          <router-link
            to="/chat"
            class="p-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </router-link>
          <router-link
            to="/profile"
            class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm"
          >
            {{ currentProfile?.email?.charAt(0).toUpperCase() }}
          </router-link>
        </div>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto flex">
      <!-- Enhanced Sidebar - Headspace Style -->
      <aside class="hidden lg:flex flex-col w-64 xl:w-72 px-6 py-6 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 sticky top-0 h-screen">
        <div class="flex-1 space-y-3">
          <!-- Enhanced Logo -->
          <div class="px-4 py-4 mb-6">
            <h1 class="text-3xl font-black bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              MoodFlow
            </h1>
          </div>

          <!-- Enhanced Navigation items -->
          <button
            class="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span class="text-2xl">🏠</span>
            <span>Feed</span>
          </button>

          <!-- Enhanced Post button -->
          <button
            @click="showPostModal = true"
            class="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-[length:200%_auto] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 hover:scale-105 active:scale-95 animate-gradient-flow"
          >
            ✨ Share Mood
          </button>
        </div>

        <!-- Enhanced User profile -->
        <div class="p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 transition-all duration-300 cursor-pointer hover:shadow-lg">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-purple-400 flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">{{ currentProfile?.email?.charAt(0).toUpperCase() }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-base font-bold text-gray-900 truncate">{{ currentProfile?.display_name || 'You' }}</p>
              <p class="text-sm text-gray-500 truncate">{{ currentProfile?.service }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Fil central - Posts -->
      <main class="flex-1 max-w-2xl border-r border-gray-200">
        <!-- Enhanced Header sticky -->
        <div class="sticky top-0 z-20 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div class="px-6 py-4">
            <h2 class="text-2xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Wellness Feed
            </h2>
            <p class="text-sm text-gray-500 mt-1">Partagez votre humeur et découvrez celle de votre équipe</p>
          </div>
          
          <!-- Enhanced Mood Filter Tabs -->
          <div class="flex border-b border-gray-200/50 overflow-x-auto scrollbar-hide px-6">
            <button
              @click="filterMood = ''; loadPosts()"
              :class="[
                'flex-shrink-0 px-6 py-4 text-sm font-semibold transition-all duration-300 relative rounded-t-2xl',
                filterMood === '' ? 'text-orange-600 bg-orange-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              ]"
            >
              All Moods
              <div v-if="filterMood === ''" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-gradient-flow bg-[length:200%_auto]"></div>
            </button>
            <button
              v-for="mood in moods.slice(0, 3)"
              :key="mood.value"
              @click="filterMood = mood.value; loadPosts()"
              :class="[
                'flex-shrink-0 px-6 py-4 text-sm font-semibold transition-all duration-300 relative rounded-t-2xl',
                filterMood === mood.value ? 'text-orange-600 bg-orange-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              ]"
            >
              {{ mood.emoji }} {{ mood.label }}
              <div v-if="filterMood === mood.value" class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-gradient-flow bg-[length:200%_auto]"></div>
            </button>
          </div>
        </div>

        <!-- Enhanced Post creation (mobile) -->
        <div class="border-b border-gray-200/50 p-6 lg:hidden">
          <button
            @click="showPostModal = true"
            class="w-full py-4 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-[length:200%_auto] text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 animate-gradient-flow"
          >
            ✨ Share Your Mood
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loadingPosts" class="flex justify-center py-12">
          <div class="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
        </div>

        <!-- Posts -->
        <div v-else>
          <article
            v-for="post in posts"
            :key="post.id"
            class="border-b border-gray-200 p-4 hover:bg-gray-50/50 transition cursor-pointer"
          >
            <div class="flex gap-3">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span class="text-lg">{{ getMoodEmoji(post.mood) }}</span>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <!-- Header -->
                <div class="flex items-start justify-between mb-1">
                  <div class="flex items-center gap-1 text-sm">
                    <span class="font-bold text-gray-900">
                      {{ post.is_anonymous ? 'Anonymous' : (post.profiles?.display_name || 'User') }}
                    </span>
                    <span class="text-gray-500">·</span>
                    <span class="text-gray-500">{{ formatDate(post.created_at) }}</span>
                  </div>
                  
                  <button
                    v-if="canDeletePost(post)"
                    @click.stop="confirmDeletePost(post.id)"
                    class="p-1.5 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>

                <!-- Message -->
                <p class="text-gray-900 text-[15px] leading-normal mb-3">{{ post.message }}</p>

                <!-- Tags -->
                <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-1.5 mb-3">
                  <span
                    v-for="tagId in post.tags"
                    :key="tagId"
                    class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                  >
                    {{ getTagLabel(tagId) }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-between max-w-md">
                  <button
                    @click.stop="toggleReplyForm(post.id)"
                    class="flex items-center gap-2 group"
                  >
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition">
                      <svg class="w-4 h-4 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                    </div>
                    <span class="text-xs text-gray-500 group-hover:text-blue-500">{{ getReplies(post.id).length }}</span>
                  </button>

                  <button
                    @click.stop="addReaction(post.id, '❤️')"
                    :class="[
                      'flex items-center gap-2 group',
                      hasUserReacted(post.id, '❤️') ? 'text-red-500' : ''
                    ]"
                  >
                    <div class="p-2 rounded-full group-hover:bg-red-50 transition-all group-hover:scale-110">
                      <svg :class="['w-4 h-4 transition-all', hasUserReacted(post.id, '❤️') ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-500 group-hover:text-red-500']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                    <span :class="['text-xs transition-all', hasUserReacted(post.id, '❤️') ? 'text-red-500 font-bold' : 'text-gray-500 group-hover:text-red-500']">{{ getReactionCount(post.id, '❤️') }}</span>
                  </button>
                </div>

                <!-- Reply form -->
                <div v-if="isReplyFormOpen(post.id)" class="mt-3 pt-3 border-t border-gray-200">
                  <div class="flex gap-2">
                    <input
                      v-model="replyText[post.id]"
                      @keyup.enter="submitReply(post.id)"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                      placeholder="Tweet your reply"
                    />
                    <button
                      @click="submitReply(post.id)"
                      :disabled="!replyText[post.id]"
                      class="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold rounded-full disabled:opacity-50 text-sm"
                    >
                      Reply
                    </button>
                  </div>
                </div>

                <!-- Replies (threads) -->
                <div v-if="getReplies(post.id).length > 0 && isReplyFormOpen(post.id)" class="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
                  <div
                    v-for="reply in getReplies(post.id)"
                    :key="reply.id"
                    class="flex gap-2"
                  >
                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span class="text-xs">👤</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-1 text-xs mb-1">
                        <span class="font-bold text-gray-900">
                          {{ reply.is_anonymous ? 'Anonymous' : (reply.profiles?.display_name || 'User') }}
                        </span>
                        <span class="text-gray-500">·</span>
                        <span class="text-gray-500">{{ formatDate(reply.created_at) }}</span>
                      </div>
                      <p class="text-sm text-gray-900">{{ reply.message }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <!-- Sidebar droite - Widgets -->
      <aside class="hidden xl:block w-80 px-4 py-4">
        <div class="sticky top-4 space-y-4">
          <!-- Search -->
          <div class="relative">
            <input
              type="text"
              placeholder="Search moods"
              class="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
            <svg class="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <!-- Mood filter -->
          <div class="bg-gray-50 rounded-2xl p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Filter by Mood</h3>
            <div class="space-y-2">
              <button
                v-for="mood in moods"
                :key="mood.value"
                @click="filterMood = filterMood === mood.value ? '' : mood.value; loadPosts()"
                :class="[
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl transition',
                  filterMood === mood.value ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg' : 'hover:bg-gray-100'
                ]"
              >
                <span class="text-xl">{{ mood.emoji }}</span>
                <span class="text-sm font-medium">{{ mood.label }}</span>
              </button>
            </div>
          </div>

          <!-- Stats -->
          <div class="bg-gray-50 rounded-2xl p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Team Pulse</h3>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Total Posts</span>
                <span class="font-bold text-gray-900">{{ posts.length }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Active Now</span>
                <span class="font-bold text-green-600">{{ activeUsersCount }}</span>
              </div>
            </div>
          </div>

          <!-- Tags trending -->
          <div class="bg-gray-50 rounded-2xl p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Trending Topics</h3>
            <div class="space-y-3">
              <div v-for="(tag, i) in moodTags.slice(0, 5)" :key="tag.id" class="hover:bg-gray-100 -mx-2 px-2 py-2 rounded-xl cursor-pointer transition">
                <p class="text-xs text-gray-500">{{ i + 1 }} · Trending</p>
                <p class="text-sm font-bold text-gray-900">{{ tag.label }}</p>
                <p class="text-xs text-gray-500">{{ tag.mentionCount || 42 }} mentions</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Post Modal -->
    <div v-if="showPostModal" class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-16 px-4" @click.self="showPostModal = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button @click="showPostModal = false" class="p-2 hover:bg-gray-100 rounded-full transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <button
            @click="createPost"
            :disabled="!selectedMood || loading"
            class="px-6 py-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-bold rounded-full disabled:opacity-50"
          >
            {{ loading ? 'Posting...' : 'Post' }}
          </button>
        </div>

        <div class="p-4">
          <!-- Mood selector -->
          <div class="mb-4">
            <label class="text-sm font-semibold text-gray-700 mb-2 block">How are you feeling?</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="mood in moods"
                :key="mood.value"
                type="button"
                @click="selectedMood = mood.value"
                :class="[
                  'p-4 rounded-xl transition text-center',
                  selectedMood === mood.value
                    ? 'bg-gradient-to-br from-orange-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 hover:bg-gray-200'
                ]"
              >
                <div class="text-3xl mb-1">{{ mood.emoji }}</div>
                <div class="text-xs font-semibold">{{ mood.label }}</div>
              </button>
            </div>
            <!-- Supportive message when selecting the most negative mood -->
            <div v-if="selectedMood === 'very_sad'" class="mt-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p class="text-sm font-semibold text-red-800">We're here for you 💛</p>
              <p class="text-xs text-red-700 mt-1">
                If you're feeling overwhelmed, don't hesitate to talk to someone you trust
                or a professional. In case of emergency, contact emergency services
                in your country immediately.
              </p>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="selectedMood" class="mb-4">
            <label class="text-sm font-semibold text-gray-700 mb-2 block">What's affecting your mood? (optional)</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in moodTags"
                :key="tag.id"
                type="button"
                @click="toggleTag(tag.id)"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-medium transition',
                  selectedTags.includes(tag.id)
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ tag.label }}
              </button>
            </div>
          </div>

          <!-- Message -->
          <div class="mb-4">
            <textarea
              v-model="message"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none text-[15px]"
              placeholder="What's happening? (optional)"
            ></textarea>
          </div>

          <!-- Anonymous toggle -->
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-3">
              <span class="text-xl">🕶️</span>
              <div>
                <p class="text-sm font-semibold text-gray-900">Post anonymously</p>
                <p class="text-xs text-gray-500">Hide your identity</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-model="isAnonymous" type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-purple-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

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

function getMoodEmoji(mood: string): string {
  return moods.find(m => m.value === mood)?.emoji || '😐';
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

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
