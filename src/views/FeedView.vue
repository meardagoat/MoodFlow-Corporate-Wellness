<template>
  <div class="min-h-screen gradient-bg-light">
    <div class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
      <h1 class="text-3xl font-bold text-neutral-800">MoodFlow</h1>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div class="relative w-full sm:w-auto">
          <select
            v-model="filterMood"
            @change="loadPosts"
            class="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All moods</option>
            <option
              v-for="mood in moods"
              :key="mood.value"
              :value="mood.value"
            >
              {{ mood.emoji }} {{ mood.label }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <button
          @click="loadRecentPosts"
          class="w-full sm:w-auto btn-secondary"
          :class="{ 'ring-2 ring-accent-400': showOnlyRecent }"
        >
          🆕 New Posts
        </button>
      </div>
    </div>

      <div class="card-gradient mb-8">
        <form @submit.prevent="createPost" class="space-y-6">
          <div>
            <label class="block text-lg font-semibold text-neutral-700 mb-6">
            💭 How are you feeling today?
          </label>
          <!-- Version desktop: affichage normal des émojis -->
          <div class="hidden sm:flex justify-between gap-4">
            <button
              v-for="mood in moods"
              :key="mood.value"
              type="button"
              @click="selectedMood = mood.value"
              :class="[
                'flex-1 p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                selectedMood === mood.value
                  ? 'border-primary-400 bg-primary-100 shadow-lg scale-105'
                  : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
              ]"
            >
              <div class="text-5xl mb-3 float">{{ mood.emoji }}</div>
              <div class="text-sm font-medium text-neutral-700">{{ mood.label }}</div>
            </button>
          </div>
          
          <!-- Version mobile: carousel pour les émojis -->
          <div class="sm:hidden">
            <div class="text-center mb-6">
              <div class="text-6xl mb-2 animate-bounce">{{ currentMoodEmoji }}</div>
              <div class="text-lg font-semibold text-neutral-700">{{ currentMoodLabel }}</div>
            </div>
            
            <!-- Carousel d'emojis -->
            <div class="relative">
              <div 
                class="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-2"
                style="scroll-snap-type: x mandatory;"
                ref="emojiCarousel"
                @scroll="updateSelectedMoodFromCarousel"
              >
                <div 
                  v-for="(mood, index) in moods" 
                  :key="mood.value"
                  :ref="`emoji-${index}`"
                  @click="selectMoodFromCarousel(index)"
                  :class="[
                    'flex-shrink-0 w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 cursor-pointer',
                    selectedMood === mood.value
                      ? 'border-primary-400 bg-primary-100 shadow-lg scale-110'
                      : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                  ]"
                  style="scroll-snap-align: center;"
                >
                  <span class="text-3xl">{{ mood.emoji }}</span>
                </div>
              </div>
              
              <!-- Indicateurs de pagination -->
              <div class="flex justify-center mt-4 gap-2">
                <div 
                  v-for="(mood, index) in moods" 
                  :key="index"
                  :class="[
                    'w-2 h-2 rounded-full transition-all duration-300',
                    selectedMood === mood.value ? 'bg-primary-500 scale-125' : 'bg-neutral-300'
                  ]"
                ></div>
              </div>
            </div>
          </div>
          </div>
          
          <div v-if="selectedMood">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Add tags (optional)
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tag in moodTags"
                :key="tag.id"
                type="button"
                @click="toggleTag(tag.id)"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium transition-all',
                  selectedTags.includes(tag.id)
                    ? `bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-300`
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                ]"
              >
                {{ tag.label }}
              </button>
            </div>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Share your thoughts (optional)
            </label>
            <textarea
              id="message"
              v-model="message"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
              placeholder="What's on your mind?"
            ></textarea>
          </div>

          <div class="flex items-center">
            <input
              id="anonymous"
              v-model="isAnonymous"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="anonymous" class="ml-2 text-sm text-gray-700">
              Post anonymously
            </label>
          </div>

          <button
            type="submit"
            :disabled="!selectedMood || loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? '✨ Sharing...' : '🌟 Share Your Mood' }}
          </button>
        </form>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-neutral-800">💫 Recent Moods</h2>
          <div v-if="showOnlyRecent" class="flex items-center gap-2 text-sm">
            <span class="px-3 py-1 bg-accent-100 text-accent-700 rounded-full font-medium">
              🔥 Last 5 minutes only
            </span>
            <button 
              @click="loadPosts" 
              class="text-gray-600 hover:text-gray-800 underline"
            >
              Show all
            </button>
          </div>
        </div>

        <div v-if="loadingPosts" class="text-center py-8 text-gray-500">
          Loading posts...
        </div>

        <div v-else-if="posts.length === 0" class="bg-white rounded-xl p-8 text-center">
          <p class="text-gray-500">No posts yet. Be the first to share!</p>
        </div>

        <div
          v-for="post in posts"
          :key="post.id"
          class="card hover:scale-[1.02] transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <div class="text-5xl float">{{ getMoodEmoji(post.mood) }}</div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-gray-900">
                    {{ post.is_anonymous ? 'Anonymous' : (post.profiles?.display_name || 'User') }}
                  </span>
                  <span class="text-sm text-gray-500">•</span>
                  <span class="text-sm text-gray-500">{{ post.service }}</span>
                  <span class="text-sm text-gray-500">•</span>
                  <span class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</span>
                  <span v-if="post.anonymous_id" class="text-xs text-gray-400 ml-1">#{{ post.anonymous_id.substring(0, 8) }}</span>
                </div>
                
                <!-- Bouton de suppression (seulement pour le propriétaire du post) -->
                <button 
                  v-if="canDeletePost(post)"
                  @click="confirmDeletePost(post.id)"
                  class="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50"
                  title="Delete post"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              <p class="text-gray-700">{{ post.message }}</p>
              
              <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-1 mt-3">
                <span 
                  v-for="tagId in post.tags" 
                  :key="tagId"
                  :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    `bg-${getTagColor(tagId)}-100 text-${getTagColor(tagId)}-800`
                  ]"
                >
                  {{ getTagLabel(tagId) }}
                </span>
              </div>
              
              <!-- Réactions -->
              <div class="flex items-center gap-2 mt-4">
                <button 
                  v-for="reaction in reactions" 
                  :key="reaction.emoji"
                  @click="addReaction(post.id, reaction.emoji)"
                  class="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
                  :class="{'bg-gray-100': hasUserReacted(post.id, reaction.emoji)}"
                >
                  <span>{{ reaction.emoji }}</span>
                  <span class="text-xs text-gray-600">{{ getReactionCount(post.id, reaction.emoji) }}</span>
                </button>
              </div>
              
              <!-- Bouton pour répondre -->
              <div class="mt-3">
                <button 
                  @click="toggleReplyForm(post.id)"
                  class="text-sm text-primary-600 hover:text-primary-700 transition"
                >
                  {{ isReplyFormOpen(post.id) ? 'Cancel' : 'Reply' }}
                </button>
              </div>
              
              <!-- Formulaire de réponse -->
              <div v-if="isReplyFormOpen(post.id)" class="mt-3">
                <div class="flex gap-2">
                  <input 
                    v-model="replyText[post.id]" 
                    class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Write a reply..."
                  />
                  <button 
                    @click="submitReply(post.id)"
                    :disabled="!replyText[post.id]"
                    class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
              
              <!-- Réponses (thread) - Style Reddit -->
              <div v-if="getReplies(post.id).length > 0" class="mt-4">
                <div 
                  v-for="(reply, index) in getReplies(post.id)" 
                  :key="reply.id"
                  class="reply-thread"
                >
                  <!-- Ligne de connexion verticale -->
                  <div class="reply-connector">
                    <div class="reply-line"></div>
                    <div class="reply-dot"></div>
                  </div>
                  
                  <!-- Contenu de la réponse -->
                  <div class="reply-content">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <span class="font-medium text-gray-900 text-sm">
                          {{ reply.is_anonymous ? 'Anonymous' : (reply.profiles?.display_name || 'User') }}
                        </span>
                        <span class="text-xs text-gray-500">{{ formatDate(reply.created_at) }}</span>
                        <span v-if="reply.anonymous_id" class="text-xs text-gray-400">#{{ reply.anonymous_id.substring(0, 6) }}</span>
                      </div>
                      
                      <!-- Bouton de suppression pour les réponses -->
                      <button 
                        v-if="canDeleteReply(reply)"
                        @click="confirmDeleteReply(reply.id, post.id)"
                        class="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50"
                        title="Delete reply"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                    <p class="text-gray-700 text-sm leading-relaxed">{{ reply.message }}</p>
                    
                    <!-- Réactions pour les réponses -->
                    <div class="flex items-center gap-2 mt-3">
                      <button 
                        v-for="reaction in reactions" 
                        :key="reaction.emoji"
                        @click="addReaction(reply.id, reaction.emoji)"
                        class="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition text-xs"
                        :class="{'bg-gray-100': hasUserReacted(reply.id, reaction.emoji)}"
                      >
                        <span class="text-sm">{{ reaction.emoji }}</span>
                        <span class="text-xs text-gray-600">{{ getReactionCount(reply.id, reaction.emoji) }}</span>
                      </button>
                      
                      <!-- Bouton pour répondre à une réponse -->
                      <button 
                        @click="toggleReplyToReply(reply.id)"
                        class="text-xs text-primary-600 hover:text-primary-700 transition px-2 py-1 rounded hover:bg-primary-50"
                      >
                        {{ isReplyToReplyOpen(reply.id) ? 'Cancel' : 'Reply' }}
                      </button>
                    </div>
                    
                    <!-- Formulaire de réponse à une réponse -->
                    <div v-if="isReplyToReplyOpen(reply.id)" class="mt-3">
                      <div class="flex gap-2">
                        <input 
                          v-model="replyToReplyText[reply.id]" 
                          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Reply to this comment..."
                        />
                        <button 
                          @click="submitReplyToReply(reply.id, post.id)"
                          :disabled="!replyToReplyText[reply.id]"
                          class="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 text-sm"
                        >
                          Send
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
  { id: 'workload', label: 'Workload', color: 'blue' },
  { id: 'team', label: 'Team Spirit', color: 'green' },
  { id: 'work_life', label: 'Work-Life', color: 'yellow' },
  { id: 'management', label: 'Management', color: 'purple' },
  { id: 'environment', label: 'Environment', color: 'pink' },
  { id: 'growth', label: 'Growth', color: 'indigo' },
  { id: 'recognition', label: 'Recognition', color: 'orange' },
];

// Définition des réactions disponibles
const reactions = [
  { emoji: '👍', name: 'like' },
  { emoji: '❤️', name: 'love' },
  { emoji: '😂', name: 'laugh' },
  { emoji: '😮', name: 'wow' },
  { emoji: '😢', name: 'sad' }
];

// Variables pour le filtre (en haut)
const filterMood = ref('');
const showOnlyRecent = ref(false);

// Variables pour le formulaire de création
const selectedMood = ref('');
const selectedTags = ref<string[]>([]);
const message = ref('');
const isAnonymous = ref(true);
const loading = ref(false);

// Variables pour les posts
const loadingPosts = ref(true);
const posts = ref<Post[]>([]);
const replyText = reactive<Record<string, string>>({});
const replyToReplyText = reactive<Record<string, string>>({});
const openReplyForms = ref<string[]>([]);
const openReplyToReplyForms = ref<string[]>([]);
const postReplies = ref<Record<string, any[]>>({});
const postReactions = ref<Record<string, any[]>>({});

// Variables pour le carousel d'emoji sur mobile
const emojiCarousel = ref<HTMLElement | null>(null);
const currentMoodEmoji = ref(moods[2].emoji);
const currentMoodLabel = ref(moods[2].label);

function getMoodEmoji(mood: string): string {
  return moods.find(m => m.value === mood)?.emoji || '😐';
}

// Fonction pour sélectionner un mood depuis le carousel
function selectMoodFromCarousel(index: number) {
  selectedMood.value = moods[index].value;
  currentMoodEmoji.value = moods[index].emoji;
  currentMoodLabel.value = moods[index].label;
  
  // Centrer l'emoji sélectionné dans le carousel
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

// Fonction pour mettre à jour le mood sélectionné depuis le scroll du carousel
function updateSelectedMoodFromCarousel() {
  if (!emojiCarousel.value) return;
  
  const scrollLeft = emojiCarousel.value.scrollLeft;
  const itemWidth = 96; // w-20 + gap-4 = 80px + 16px
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

function getTagColor(tagId: string): string {
  const tag = moodTags.find(t => t.id === tagId);
  return tag ? tag.color : 'gray';
}

// Fonctions pour les réactions
function addReaction(contentId, emoji) {
  if (!currentProfile.value) return;
  
  const existingReaction = postReactions.value[contentId]?.find(
    r => r.user_id === currentProfile.value.id && r.emoji === emoji
  );
  
  if (existingReaction) {
    // Supprimer la réaction si elle existe déjà
    removeReaction(existingReaction.id, contentId, emoji);
  } else {
    // Ajouter une nouvelle réaction
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
    
    // Mettre à jour l'état local
    if (!postReactions.value[contentId]) {
      postReactions.value[contentId] = [];
    }
    
    postReactions.value[contentId].push(data);
  } catch (error) {
    console.error('Error adding reaction - table may not exist yet:', error);
    alert('Fonctionnalité de réaction temporairement indisponible. Veuillez appliquer la migration dans Supabase.');
  }
}

async function removeReaction(reactionId, contentId, emoji) {
  try {
    const { error } = await supabase
      .from('post_reactions')
      .delete()
      .eq('id', reactionId);
      
    if (error) throw error;
    
    // Mettre à jour l'état local
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

// Fonctions pour les réponses (thread)
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

// Fonction pour vérifier si l'utilisateur peut supprimer le post
function canDeletePost(post) {
  if (!currentProfile.value) return false;
  return post.user_id === currentProfile.value.id;
}

// Fonction pour confirmer la suppression
function confirmDeletePost(postId) {
  showDeleteConfirmation(
    'Delete Post',
    'Are you sure you want to delete this post? This action cannot be undone.',
    () => deletePost(postId)
  );
}

// Fonction pour supprimer le post
async function deletePost(postId) {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', currentProfile.value.id); // Double sécurité
      
    if (error) throw error;
    
    // Supprimer le post de la liste locale
    posts.value = posts.value.filter(post => post.id !== postId);
    
    // Supprimer aussi les réponses associées de l'état local
    delete postReplies.value[postId];
    delete postReactions.value[postId];
    
    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Error deleting post. Please try again.');
  }
}

// Fonction pour vérifier si l'utilisateur peut supprimer la réponse
function canDeleteReply(reply) {
  if (!currentProfile.value) return false;
  return reply.user_id === currentProfile.value.id;
}

// Fonction pour confirmer la suppression d'une réponse
function confirmDeleteReply(replyId, postId) {
  showDeleteConfirmation(
    'Delete Reply',
    'Are you sure you want to delete this reply? This action cannot be undone.',
    () => deleteReply(replyId, postId)
  );
}

// Fonction pour supprimer une réponse
async function deleteReply(replyId, postId) {
  try {
    const { error } = await supabase
      .from('post_replies')
      .delete()
      .eq('id', replyId)
      .eq('user_id', currentProfile.value.id); // Double sécurité
      
    if (error) throw error;
    
    // Supprimer la réponse de la liste locale
    if (postReplies.value[postId]) {
      postReplies.value[postId] = postReplies.value[postId].filter(reply => reply.id !== replyId);
    }
    
    // Supprimer aussi les réactions associées
    delete postReactions.value[replyId];
    
    console.log('Reply deleted successfully');
  } catch (error) {
    console.error('Error deleting reply:', error);
    alert('Error deleting reply. Please try again.');
  }
}

// Fonction pour afficher une confirmation de suppression stylée
function showDeleteConfirmation(title, message, onConfirm) {
  // Créer une modal de confirmation personnalisée
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
      </div>
      <p class="text-gray-600 mb-6">${message}</p>
      <div class="flex gap-3 justify-end">
        <button id="cancel-btn" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition">
          Cancel
        </button>
        <button id="confirm-btn" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Delete
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Gérer les clics
  modal.querySelector('#cancel-btn').onclick = () => {
    document.body.removeChild(modal);
  };
  
  modal.querySelector('#confirm-btn').onclick = () => {
    document.body.removeChild(modal);
    onConfirm();
  };
  
  // Fermer en cliquant sur le fond
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
    
    // Ajouter la réponse à l'état local
    if (!postReplies.value[postId]) {
      postReplies.value[postId] = [];
    }
    
    // Récupérer les informations du profil
    const { data: profileData } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', currentProfile.value.id)
      .single();
    
    postReplies.value[postId].push({
      ...data,
      profiles: profileData
    });
    
    // Réinitialiser le formulaire
    replyText[postId] = '';
    toggleReplyForm(postId);
  } catch (error) {
    console.error('Error submitting reply - table may not exist yet:', error);
    alert('Fonctionnalité de réponse temporairement indisponible. Veuillez appliquer la migration dans Supabase.');
  }
}

async function submitReplyToReply(replyId, postId) {
  if (!currentProfile.value || !replyToReplyText[replyId]) return;
  
  try {
    const { data, error } = await supabase
      .from('post_replies')
      .insert({
        user_id: currentProfile.value.id,
        post_id: postId,
        parent_reply_id: replyId,
        message: replyToReplyText[replyId],
        is_anonymous: true
      })
      .select()
      .single();
      
    if (error) throw error;
    
    // Ajouter la réponse à l'état local
    if (!postReplies.value[postId]) {
      postReplies.value[postId] = [];
    }
    postReplies.value[postId].push(data);
    
    replyToReplyText[replyId] = '';
    toggleReplyToReply(replyId);
  } catch (error) {
    console.error('Error submitting reply to reply:', error);
    alert('Erreur lors de l\'envoi de la réponse.');
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
      
    // Filtre par mood si sélectionné
    if (filterMood.value) {
      query = query.eq('mood', filterMood.value);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    posts.value = data || [];
    
    // Charger les réponses et réactions pour chaque post
    await loadRepliesAndReactions();
  } catch (error) {
    console.error('Error loading posts:', error);
  } finally {
    loadingPosts.value = false;
  }
}

// Fonction pour charger uniquement les posts récents (< 5 minutes)
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
      
    // Appliquer aussi le filtre de mood si actif
    if (filterMood.value) {
      query = query.eq('mood', filterMood.value);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    posts.value = data || [];
    
    if (posts.value.length === 0) {
      // Si aucun post récent, revenir à tous les posts
      showOnlyRecent.value = false;
      await loadPosts();
    } else {
      // Charger les réponses et réactions
      await loadRepliesAndReactions();
    }
  } catch (error) {
    console.error('Error loading recent posts:', error);
  } finally {
    loadingPosts.value = false;
  }
}

// Charger les réponses et réactions
async function loadRepliesAndReactions() {
  try {
    // Charger les réponses (temporairement désactivé jusqu'à ce que la migration soit appliquée)
    try {
      const { data: repliesData } = await supabase
        .from('post_replies')
        .select('*, profiles(display_name)')
        .order('created_at', { ascending: true });
      
      if (repliesData) {
        // Organiser les réponses par post parent
        postReplies.value = {};
        repliesData.forEach(reply => {
          if (!postReplies.value[reply.post_id]) {
            postReplies.value[reply.post_id] = [];
          }
          postReplies.value[reply.post_id].push(reply);
        });
      }
    } catch (repliesError) {
      console.log('Table post_replies not yet created, skipping replies loading');
    }
    
    // Charger les réactions (temporairement désactivé jusqu'à ce que la migration soit appliquée)
    try {
      const { data: reactionsData } = await supabase
        .from('post_reactions')
        .select('*');
      
      if (reactionsData) {
        // Organiser les réactions par post/réponse
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
      console.log('Table post_reactions not yet created, skipping reactions loading');
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
