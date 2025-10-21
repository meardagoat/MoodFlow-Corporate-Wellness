<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50">
    <!-- Header moderne avec glassmorphism -->
    <div class="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Your Wellness Feed
            </h1>
            <p class="text-sm text-gray-600 mt-0.5">Share and connect with your team</p>
          </div>
          
          <!-- Filtres modernes -->
          <div class="flex items-center gap-3">
            <select
              v-model="filterMood"
              @change="loadPosts"
              class="px-4 py-2.5 bg-white/80 backdrop-blur border border-orange-100 rounded-2xl text-sm font-medium text-gray-700 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">All moods</option>
              <option v-for="mood in moods" :key="mood.value" :value="mood.value">
                {{ mood.emoji }} {{ mood.label }}
              </option>
            </select>
            
            <button
              @click="loadRecentPosts"
              :class="[
                'px-4 py-2.5 rounded-2xl text-sm font-medium transition-all',
                showOnlyRecent
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200'
                  : 'bg-white/80 backdrop-blur border border-orange-100 text-gray-700 hover:bg-white'
              ]"
            >
              ✨ New
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <!-- Card de création de mood - Design moderne -->
      <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-orange-100/50 overflow-hidden">
        <div class="p-6 sm:p-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <span class="text-2xl">💭</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">How are you feeling?</h2>
              <p class="text-sm text-gray-600">Share your mood with the team</p>
            </div>
          </div>

          <form @submit.prevent="createPost" class="space-y-6">
            <!-- Sélecteur de mood moderne - Desktop -->
            <div class="hidden sm:grid grid-cols-5 gap-3">
              <button
                v-for="mood in moods"
                :key="mood.value"
                type="button"
                @click="selectedMood = mood.value"
                :class="[
                  'relative group p-5 rounded-2xl transition-all duration-300',
                  selectedMood === mood.value
                    ? 'bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-xl shadow-purple-200 scale-105'
                    : 'bg-white/80 hover:bg-white border border-gray-100 hover:border-purple-200 hover:shadow-lg'
                ]"
              >
                <div class="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {{ mood.emoji }}
                </div>
                <div :class="[
                  'text-sm font-semibold',
                  selectedMood === mood.value ? 'text-white' : 'text-gray-700'
                ]">
                  {{ mood.label }}
                </div>
                <div
                  v-if="selectedMood === mood.value"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>

            <!-- Sélecteur de mood mobile - Carousel amélioré -->
            <div class="sm:hidden">
              <div class="text-center mb-6">
                <div class="text-7xl mb-3 animate-bounce-soft">{{ currentMoodEmoji }}</div>
                <div class="text-lg font-bold text-gray-900">{{ currentMoodLabel }}</div>
              </div>
              
              <div class="relative">
                <div 
                  class="flex overflow-x-auto scrollbar-hide gap-3 px-4 py-2 snap-x snap-mandatory"
                  ref="emojiCarousel"
                  @scroll="updateSelectedMoodFromCarousel"
                >
                  <div 
                    v-for="(mood, index) in moods" 
                    :key="mood.value"
                    @click="selectMoodFromCarousel(index)"
                    :class="[
                      'flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center transition-all snap-center',
                      selectedMood === mood.value
                        ? 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-xl scale-110'
                        : 'bg-white/80 border border-gray-100'
                    ]"
                  >
                    <span class="text-3xl">{{ mood.emoji }}</span>
                  </div>
                </div>
                
                <div class="flex justify-center mt-4 gap-1.5">
                  <div 
                    v-for="(mood, index) in moods" 
                    :key="index"
                    :class="[
                      'h-1.5 rounded-full transition-all',
                      selectedMood === mood.value ? 'w-8 bg-purple-500' : 'w-1.5 bg-gray-300'
                    ]"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Tags modernes -->
            <div v-if="selectedMood" class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700">
                What's affecting your mood? (optional)
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in moodTags"
                  :key="tag.id"
                  type="button"
                  @click="toggleTag(tag.id)"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    selectedTags.includes(tag.id)
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'bg-white/80 border border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                  ]"
                >
                  {{ tag.label }}
                </button>
              </div>
            </div>

            <!-- Message avec design moderne -->
            <div>
              <textarea
                v-model="message"
                rows="3"
                class="w-full px-5 py-4 bg-white/80 backdrop-blur border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none text-gray-900 placeholder-gray-400"
                placeholder="Share more about how you're feeling... (optional)"
              ></textarea>
            </div>

            <!-- Anonymous toggle moderne -->
            <div class="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <span class="text-xl">🕶️</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900 text-sm">Post anonymously</div>
                  <div class="text-xs text-gray-600">Your identity will be hidden</div>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="isAnonymous" type="checkbox" class="sr-only peer">
                <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-purple-500"></div>
              </label>
            </div>

            <!-- Bouton d'envoi moderne -->
            <button
              type="submit"
              :disabled="!selectedMood || loading"
              class="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-2xl shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {{ loading ? '✨ Sharing...' : '🚀 Share Your Mood' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Posts section -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">Team Moods</h2>
          <div v-if="showOnlyRecent" class="flex items-center gap-2 text-sm">
            <span class="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-medium shadow-lg">
              🔥 Last 5 minutes
            </span>
            <button 
              @click="loadPosts" 
              class="text-purple-600 hover:text-purple-700 font-medium underline"
            >
              Show all
            </button>
          </div>
        </div>

        <div v-if="loadingPosts" class="text-center py-12">
          <div class="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p class="text-gray-600 mt-4">Loading moods...</p>
        </div>

        <div v-else-if="posts.length === 0" class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 p-12 text-center">
          <div class="text-6xl mb-4">🌟</div>
          <p class="text-gray-600 text-lg">No posts yet. Be the first to share!</p>
        </div>

        <!-- Post cards avec design premium -->
        <div
          v-for="(post, index) in posts"
          :key="post.id"
          class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/30 hover:shadow-xl hover:shadow-purple-200/40 transition-all duration-300 overflow-hidden group"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <div class="p-6">
            <div class="flex items-start gap-4">
              <!-- Mood emoji avec design premium -->
              <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span class="text-4xl">{{ getMoodEmoji(post.mood) }}</span>
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <!-- Header du post -->
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-gray-900">
                      {{ post.is_anonymous ? 'Anonymous' : (post.profiles?.display_name || 'User') }}
                    </span>
                    <span class="text-gray-400">•</span>
                    <span class="text-sm text-gray-600">{{ post.service }}</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</span>
                  </div>
                  
                  <button 
                    v-if="canDeletePost(post)"
                    @click="confirmDeletePost(post.id)"
                    class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>

                <!-- Message -->
                <p class="text-gray-700 leading-relaxed mb-4">{{ post.message }}</p>
                
                <!-- Tags -->
                <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                  <span 
                    v-for="tagId in post.tags" 
                    :key="tagId"
                    class="px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 text-purple-700 rounded-full text-xs font-medium"
                  >
                    {{ getTagLabel(tagId) }}
                  </span>
                </div>
                
                <!-- Réactions modernisées -->
                <div class="flex items-center gap-2 mb-4">
                  <button 
                    v-for="reaction in reactions" 
                    :key="reaction.emoji"
                    @click="addReaction(post.id, reaction.emoji)"
                    :class="[
                      'flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all',
                      hasUserReacted(post.id, reaction.emoji)
                        ? 'bg-gradient-to-r from-violet-100 to-purple-100 shadow-md scale-105'
                        : 'bg-white/80 hover:bg-white hover:shadow-md'
                    ]"
                  >
                    <span class="text-lg">{{ reaction.emoji }}</span>
                    <span class="text-sm font-semibold text-gray-700">{{ getReactionCount(post.id, reaction.emoji) }}</span>
                  </button>
                </div>
                
                <!-- Bouton reply -->
                <button 
                  @click="toggleReplyForm(post.id)"
                  class="text-sm font-medium text-purple-600 hover:text-purple-700 px-3 py-1.5 hover:bg-purple-50 rounded-lg transition"
                >
                  {{ isReplyFormOpen(post.id) ? '✕ Cancel' : '💬 Reply' }}
                </button>
                
                <!-- Formulaire de réponse -->
                <div v-if="isReplyFormOpen(post.id)" class="mt-4">
                  <div class="flex gap-2">
                    <input 
                      v-model="replyText[post.id]" 
                      class="flex-1 px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                      placeholder="Write a reply..."
                    />
                    <button 
                      @click="submitReply(post.id)"
                      :disabled="!replyText[post.id]"
                      class="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium rounded-2xl hover:shadow-lg disabled:opacity-50 transition-all"
                    >
                      Send
                    </button>
                  </div>
                </div>
                
                <!-- Replies (threads) -->
                <div v-if="getReplies(post.id).length > 0" class="mt-4 space-y-3">
                  <div 
                    v-for="reply in getReplies(post.id)" 
                    :key="reply.id"
                    class="flex gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50"
                  >
                    <div class="w-1 bg-gradient-to-b from-violet-400 to-purple-400 rounded-full flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2 text-sm">
                          <span class="font-semibold text-gray-900">
                            {{ reply.is_anonymous ? 'Anonymous' : (reply.profiles?.display_name || 'User') }}
                          </span>
                          <span class="text-gray-400">•</span>
                          <span class="text-gray-500">{{ formatDate(reply.created_at) }}</span>
                        </div>
                        
                        <button 
                          v-if="canDeleteReply(reply)"
                          @click="confirmDeleteReply(reply.id, post.id)"
                          class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                      <p class="text-gray-700 text-sm">{{ reply.message }}</p>
                      
                      <!-- Réactions pour les replies -->
                      <div class="flex items-center gap-2 mt-3">
                        <button 
                          v-for="reaction in reactions" 
                          :key="reaction.emoji"
                          @click="addReaction(reply.id, reaction.emoji)"
                          :class="[
                            'flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition',
                            hasUserReacted(reply.id, reaction.emoji)
                              ? 'bg-white shadow'
                              : 'hover:bg-white/50'
                          ]"
                        >
                          <span>{{ reaction.emoji }}</span>
                          <span class="font-medium text-gray-600">{{ getReactionCount(reply.id, reaction.emoji) }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile } from '../lib/auth';
import type { Database } from '../lib/database.types';

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

const reactions = [
  { emoji: '👍', name: 'like' },
  { emoji: '❤️', name: 'love' },
  { emoji: '😂', name: 'laugh' },
  { emoji: '😮', name: 'wow' },
  { emoji: '😢', name: 'sad' }
];

const filterMood = ref('');
const showOnlyRecent = ref(false);
const selectedMood = ref('');
const selectedTags = ref<string[]>([]);
const message = ref('');
const isAnonymous = ref(true);
const loading = ref(false);
const loadingPosts = ref(true);
const posts = ref<Post[]>([]);
const replyText = reactive<Record<string, string>>({});
const replyToReplyText = reactive<Record<string, string>>({});
const openReplyForms = ref<string[]>([]);
const openReplyToReplyForms = ref<string[]>([]);
const postReplies = ref<Record<string, any[]>>({});
const postReactions = ref<Record<string, any[]>>({});
const emojiCarousel = ref<HTMLElement | null>(null);
const currentMoodEmoji = ref(moods[2].emoji);
const currentMoodLabel = ref(moods[2].label);

function getMoodEmoji(mood: string): string {
  return moods.find(m => m.value === mood)?.emoji || '😐';
}

function selectMoodFromCarousel(index: number) {
  selectedMood.value = moods[index].value;
  currentMoodEmoji.value = moods[index].emoji;
  currentMoodLabel.value = moods[index].label;
  
  if (emojiCarousel.value) {
    const emojiElement = emojiCarousel.value.children[index] as HTMLElement;
    if (emojiElement) {
      emojiElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      });
    }
  }
}

function updateSelectedMoodFromCarousel() {
  if (!emojiCarousel.value) return;
  
  const scrollLeft = emojiCarousel.value.scrollLeft;
  const itemWidth = 96;
  const centerIndex = Math.round(scrollLeft / itemWidth);
  
  if (centerIndex >= 0 && centerIndex < moods.length) {
    selectedMood.value = moods[centerIndex].value;
    currentMoodEmoji.value = moods[centerIndex].emoji;
    currentMoodLabel.value = moods[centerIndex].label;
  }
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

function addReaction(contentId, emoji) {
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

async function addNewReaction(contentId, emoji) {
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

async function removeReaction(reactionId, contentId, emoji) {
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

function getReactionCount(contentId, emoji) {
  return postReactions.value[contentId]?.filter(r => r.emoji === emoji).length || 0;
}

function hasUserReacted(contentId, emoji) {
  if (!currentProfile.value) return false;
  return postReactions.value[contentId]?.some(
    r => r.user_id === currentProfile.value.id && r.emoji === emoji
  ) || false;
}

function toggleReplyForm(postId) {
  const index = openReplyForms.value.indexOf(postId);
  if (index === -1) {
    openReplyForms.value.push(postId);
  } else {
    openReplyForms.value.splice(index, 1);
  }
}

function isReplyFormOpen(postId) {
  return openReplyForms.value.includes(postId);
}

function toggleReplyToReply(replyId) {
  const index = openReplyToReplyForms.value.indexOf(replyId);
  if (index === -1) {
    openReplyToReplyForms.value.push(replyId);
  } else {
    openReplyToReplyForms.value.splice(index, 1);
  }
}

function isReplyToReplyOpen(replyId) {
  return openReplyToReplyForms.value.includes(replyId);
}

function getReplies(postId) {
  return postReplies.value[postId] || [];
}

function canDeletePost(post) {
  if (!currentProfile.value) return false;
  return post.user_id === currentProfile.value.id;
}

function confirmDeletePost(postId) {
  showDeleteConfirmation(
    'Delete Post',
    'Are you sure you want to delete this post? This action cannot be undone.',
    () => deletePost(postId)
  );
}

async function deletePost(postId) {
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

function canDeleteReply(reply) {
  if (!currentProfile.value) return false;
  return reply.user_id === currentProfile.value.id;
}

function confirmDeleteReply(replyId, postId) {
  showDeleteConfirmation(
    'Delete Reply',
    'Are you sure you want to delete this reply? This action cannot be undone.',
    () => deleteReply(replyId, postId)
  );
}

async function deleteReply(replyId, postId) {
  try {
    const { error } = await supabase
      .from('post_replies')
      .delete()
      .eq('id', replyId)
      .eq('user_id', currentProfile.value.id);
      
    if (error) throw error;
    
    if (postReplies.value[postId]) {
      postReplies.value[postId] = postReplies.value[postId].filter(reply => reply.id !== replyId);
    }
    
    delete postReactions.value[replyId];
  } catch (error) {
    console.error('Error deleting reply:', error);
    alert('Error deleting reply. Please try again.');
  }
}

function showDeleteConfirmation(title, message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8">
      <div class="flex items-center mb-6">
        <div class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mr-4">
          <svg class="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900">${title}</h3>
      </div>
      <p class="text-gray-600 mb-8 leading-relaxed">${message}</p>
      <div class="flex gap-3">
        <button id="cancel-btn" class="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-2xl hover:bg-gray-100 transition">
          Cancel
        </button>
        <button id="confirm-btn" class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-2xl hover:shadow-lg transition">
          Delete
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.querySelector('#cancel-btn').onclick = () => {
    document.body.removeChild(modal);
  };
  
  modal.querySelector('#confirm-btn').onclick = () => {
    document.body.removeChild(modal);
    onConfirm();
  };
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  };
}

async function submitReply(postId) {
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
    toggleReplyForm(postId);
  } catch (error) {
    console.error('Error submitting reply:', error);
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

async function loadPosts() {
  loadingPosts.value = true;
  showOnlyRecent.value = false;
  
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

async function loadRecentPosts() {
  loadingPosts.value = true;
  showOnlyRecent.value = true;
  
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          display_name
        )
      `)
      .gte('created_at', fiveMinutesAgo)
      .order('created_at', { ascending: false });
      
    if (filterMood.value) {
      query = query.eq('mood', filterMood.value);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    posts.value = data || [];
    
    if (posts.value.length === 0) {
      showOnlyRecent.value = false;
      await loadPosts();
    } else {
      await loadRepliesAndReactions();
    }
  } catch (error) {
    console.error('Error loading recent posts:', error);
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

  return () => {
    subscription.unsubscribe();
  };
});
</script>

<style scoped>
@keyframes bounce-soft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce-soft {
  animation: bounce-soft 2s ease-in-out infinite;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
