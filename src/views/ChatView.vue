<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Anonymous Chat</h1>
        <p class="text-gray-600">Connect with colleagues anonymously</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <div class="bg-white rounded-xl shadow overflow-hidden">
            <div class="p-4 bg-primary-600 text-white flex justify-between items-center">
              <h2 class="font-semibold">Conversations</h2>
              <button
                @click="showNewChatModal = true"
                class="md:hidden bg-white bg-opacity-20 p-1 rounded-full hover:bg-opacity-30 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>

            <div v-if="loadingConversations" class="p-8 text-center text-gray-500">
              Loading...
            </div>

            <div v-else-if="conversations.length === 0" class="p-8 text-center">
              <p class="text-gray-500 text-sm mb-4">No conversations yet</p>
              <button
                @click="showNewChatModal = true"
                class="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition"
              >
                Start Chat
              </button>
            </div>

            <div v-else class="divide-y divide-gray-100">
              <button
                v-for="conv in conversations"
                :key="conv.id"
                @click="selectConversation(conv.id)"
                :class="[
                  'w-full p-4 text-left hover:bg-gray-50 transition',
                  selectedConversationId === conv.id ? 'bg-primary-50' : ''
                ]"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold relative">
                    A
                    <span 
                      v-if="conv.unread_count && conv.unread_count > 0" 
                      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {{ conv.unread_count > 9 ? '9+' : conv.unread_count }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center">
                      <p class="font-medium text-gray-900 truncate">Anonymous User</p>
                      <p class="text-xs text-gray-500">
                        {{ formatDate(conv.last_message_at) }}
                      </p>
                    </div>
                    <p class="text-sm text-gray-500 truncate">
                      {{ getLastMessagePreview(conv.id) }}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div class="p-4 border-t border-gray-100">
              <button
                @click="showNewChatModal = true"
                class="w-full px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition"
              >
                + New Chat
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div v-if="!selectedConversationId" class="bg-white rounded-xl shadow h-[600px] flex items-center justify-center">
            <div class="text-center text-gray-500">
              <div class="text-6xl mb-4">💬</div>
              <p>Select a conversation to start chatting</p>
              <button
                @click="showNewChatModal = true"
                class="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition md:hidden"
              >
                Start New Chat
              </button>
            </div>
          </div>

          <div v-else class="bg-white rounded-xl shadow h-[600px] flex flex-col">
            <div class="p-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                  <button 
                    class="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
                    @click="selectedConversationId = ''"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Anonymous User</p>
                    <p class="text-xs text-gray-500">All messages are anonymous</p>
                  </div>
                </div>
              </div>
            </div>

            <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
              <div v-if="loadingMessages" class="text-center text-gray-500">
                Loading messages...
              </div>

              <div
                v-for="message in messages"
                :key="message.id"
                :class="[
                  'flex',
                  message.sender_id === currentProfile?.id ? 'justify-end' : 'justify-start'
                ]"
              >
                <div
                  :class="[
                    'max-w-[70%] rounded-2xl px-4 py-2',
                    message.sender_id === currentProfile?.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  ]"
                >
                  <p class="break-words">{{ message.message }}</p>
                  <p
                    :class="[
                      'text-xs mt-1',
                      message.sender_id === currentProfile?.id ? 'text-primary-100' : 'text-gray-500'
                    ]"
                  >
                    {{ formatTime(message.created_at) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-gray-200">
              <form @submit.prevent="sendMessage" class="flex gap-2">
                <input
                  v-model="newMessage"
                  type="text"
                  placeholder="Type a message..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  :disabled="!newMessage.trim() || sending"
                  class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showNewChatModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showNewChatModal = false"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Start New Chat</h3>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Select a colleague
          </label>
          <select
            v-model="selectedUserId"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Choose...</option>
            <option
              v-for="user in availableUsers"
              :key="user.id"
              :value="user.id"
            >
              {{ user.service }} - Anonymous User
            </option>
          </select>
        </div>

        <div class="flex gap-3">
          <button
            @click="showNewChatModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="startNewChat"
            :disabled="!selectedUserId || creating"
            class="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ creating ? 'Creating...' : 'Start Chat' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile } from '../lib/auth';
import type { Database } from '../lib/database.types';

// Function to show notifications
function showNotification(title: string, message: string) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body: message });
      }
    });
  }
}

type Conversation = Database['public']['Tables']['chat_conversations']['Row'] & {
  unread_count?: number;
};
type Message = Database['public']['Tables']['chat_messages']['Row'] & {
  read?: boolean;
};
type Profile = Database['public']['Tables']['profiles']['Row'];

const conversations = ref<Conversation[]>([]);
const messages = ref<Message[]>([]);
const availableUsers = ref<Profile[]>([]);
const selectedConversationId = ref('');
const selectedUserId = ref('');
const newMessage = ref('');
const showNewChatModal = ref(false);
const loadingConversations = ref(true);
const loadingMessages = ref(false);
const sending = ref(false);
const creating = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

async function loadConversations() {
  if (!currentProfile.value) return;

  loadingConversations.value = true;

  const { data } = await supabase
    .from('chat_conversations')
    .select('*')
    .or(`participant_1_id.eq.${currentProfile.value.id},participant_2_id.eq.${currentProfile.value.id}`)
    .order('last_message_at', { ascending: false });

  if (data) {
    // Récupérer les messages non lus pour chaque conversation
    const conversationsWithUnread = await Promise.all(data.map(async (conv) => {
      const { count } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conv.id)
        .eq('read', false)
        .neq('sender_id', currentProfile.value?.id);
      
      return {
        ...conv,
        unread_count: count || 0
      };
    }));
    
    conversations.value = conversationsWithUnread;
  }

  loadingConversations.value = false;
}

async function loadMessages(conversationId: string) {
  loadingMessages.value = true;

  const { data } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (data) {
    messages.value = data;
    await nextTick();
    scrollToBottom();
  }

  loadingMessages.value = false;
}

async function loadAvailableUsers() {
  if (!currentProfile.value) return;

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .neq('id', currentProfile.value.id);

  if (data) {
    availableUsers.value = data;
  }
}

async function selectConversation(conversationId: string) {
  selectedConversationId.value = conversationId;
  await loadMessages(conversationId);
  
  // Marquer tous les messages comme lus lorsqu'une conversation est sélectionnée
  if (currentProfile.value) {
    await supabase
      .from('chat_messages')
      .update({ read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', currentProfile.value.id);
    
    // Recharger les conversations pour mettre à jour les compteurs
    await loadConversations();
  }
}

async function startNewChat() {
  if (!currentProfile.value || !selectedUserId.value) return;

  creating.value = true;

  const { data: existing } = await supabase
    .from('chat_conversations')
    .select('id')
    .or(`and(participant_1_id.eq.${currentProfile.value.id},participant_2_id.eq.${selectedUserId.value}),and(participant_1_id.eq.${selectedUserId.value},participant_2_id.eq.${currentProfile.value.id})`)
    .maybeSingle();

  if (existing) {
    selectedConversationId.value = (existing as any).id;
    await loadMessages((existing as any).id);
  } else {
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        participant_1_id: currentProfile.value.id,
        participant_2_id: selectedUserId.value,
      } as any)
      .select()
      .single();

    if (!error && data) {
      await loadConversations();
      selectedConversationId.value = (data as any).id;
      await loadMessages((data as any).id);
    }
  }

  showNewChatModal.value = false;
  selectedUserId.value = '';
  creating.value = false;
}

async function sendMessage() {
  if (!currentProfile.value || !selectedConversationId.value || !newMessage.value.trim()) return;

  sending.value = true;

  const { error } = await supabase
    .from('chat_messages')
    .insert({
      conversation_id: selectedConversationId.value,
      sender_id: currentProfile.value.id,
      message: newMessage.value.trim(),
      read: false
    } as any);

  if (!error) {
    const updateData: any = { last_message_at: new Date().toISOString() };
    await supabase
      .from('chat_conversations')
      .update(updateData)
      .eq('id', selectedConversationId.value);

    newMessage.value = '';
    await loadMessages(selectedConversationId.value);
    await loadConversations();
  }

  sending.value = false;
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

function getLastMessagePreview(conversationId: string): string {
  // Trouver les messages de cette conversation
  const conversationMessages = messages.value.filter(msg => msg.conversation_id === conversationId);
  
  // Si aucun message, retourner un texte par défaut
  if (conversationMessages.length === 0) {
    return "Démarrer une nouvelle conversation...";
  }
  
  // Récupérer le dernier message
  const lastMessage = conversationMessages[conversationMessages.length - 1];
  
  // Vérifier si c'est l'utilisateur actuel qui a envoyé le message
  const isCurrentUser = lastMessage.sender_id === currentProfile.value?.id;
  
  // Formater le préfixe en fonction de l'expéditeur
  const prefix = isCurrentUser ? "Vous: " : "";
  
  // Tronquer le message s'il est trop long
  const messageText = lastMessage.message.length > 25 
    ? lastMessage.message.substring(0, 25) + "..." 
    : lastMessage.message;
  
  return prefix + messageText;
}

onMounted(async () => {
  await loadConversations();
  await loadAvailableUsers();

  if (currentProfile.value) {
    // Écouter les nouveaux messages
    const messageChannel = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
      }, async (payload) => {
        const newMessage = payload.new as Message;
        
        // Si le message est pour la conversation actuellement ouverte
        if (selectedConversationId.value === newMessage.conversation_id) {
          await loadMessages(selectedConversationId.value);
          
          // Marquer comme lu si ce n'est pas l'utilisateur actuel qui l'a envoyé
          if (newMessage.sender_id !== currentProfile.value?.id) {
            await supabase
              .from('chat_messages')
              .update({ read: true })
              .eq('id', newMessage.id);
          }
        } 
        // Sinon, afficher une notification
        else if (newMessage.sender_id !== currentProfile.value?.id) {
          showNotification('Nouveau message', 'Vous avez reçu un nouveau message');
          
          // Recharger les conversations pour mettre à jour les compteurs
          await loadConversations();
        }
      })
      .subscribe();

    return () => {
      messageChannel.unsubscribe();
    };
  }
});
watch(selectedConversationId, (newId) => {
  if (newId) {
    loadMessages(newId);
  }
});
</script>
