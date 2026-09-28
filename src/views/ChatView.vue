<template>
  <div class="min-h-screen safe-top safe-bottom">
    <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header class="mb-8 sm:mb-10">
        <h1 class="display text-display-md">Anonymous Chat</h1>
        <p class="mt-3 max-w-2xl text-lg text-ink/65">Connect with colleagues anonymously and share your thoughts in a safe space</p>

        <!-- Chat benefits -->
        <ul class="mt-6 flex flex-wrap gap-2">
          <li class="chip">
            <span class="h-2.5 w-2.5 rounded-full bg-sun" />
            100% Anonymous
          </li>
          <li class="chip">
            <span class="h-2.5 w-2.5 rounded-full bg-aqua" />
            Safe Space
          </li>
          <li class="chip">
            <span class="h-2.5 w-2.5 rounded-full bg-grape" />
            Real-time
          </li>
        </ul>
      </header>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <!-- Conversations -->
        <div class="md:col-span-1" :class="selectedConversationId ? 'hidden md:block' : ''">
          <div class="flex h-[min(640px,calc(100svh-12rem))] min-h-[420px] flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white">
            <div class="flex items-center justify-between bg-grape px-5 py-4 text-paper">
              <h2 class="display text-2xl tracking-[-0.04em]">Conversations</h2>
              <button
                type="button"
                @click="showNewChatModal = true"
                class="grid h-10 w-10 place-items-center rounded-full bg-paper/15 transition-colors hover:bg-paper hover:text-ink md:hidden"
                aria-label="New Chat"
              >
                <Icon name="plus" class="h-5 w-5" />
              </button>
            </div>

            <div v-if="loadingConversations" class="grid flex-1 place-items-center p-8 text-ink/50" role="status">
              Loading...
            </div>

            <div v-else-if="conversations.length === 0" class="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <MoodFace mood="sleepy" class="h-16 w-16" />
              <p class="mt-5 text-ink/60">No conversations yet</p>
              <button
                type="button"
                @click="showNewChatModal = true"
                class="btn btn-ink mt-6"
              >
                Start Chat
              </button>
            </div>

            <div v-else class="flex-1 divide-y divide-ink/[0.07] overflow-y-auto">
              <button
                v-for="conv in conversations"
                :key="conv.id"
                type="button"
                @click="selectConversation(conv.id)"
                :aria-current="selectedConversationId === conv.id ? 'true' : undefined"
                :class="[
                  'relative w-full px-5 py-4 text-left transition-colors duration-300',
                  selectedConversationId === conv.id ? 'bg-sun/40' : 'hover:bg-paper-deep/60'
                ]"
              >
                <span
                  v-if="selectedConversationId === conv.id"
                  class="absolute inset-y-3 left-0 w-1 rounded-r-full bg-ink"
                  aria-hidden="true"
                />
                <div class="flex items-center gap-4">
                  <div class="display relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lilac text-lg">
                    A
                    <span
                      v-if="conv.unread_count && conv.unread_count > 0"
                      class="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-coral px-1.5 font-sans text-xs font-bold text-ink ring-2 ring-white"
                    >
                      {{ conv.unread_count > 9 ? '9+' : conv.unread_count }}
                    </span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <p class="truncate font-semibold">Anonymous User</p>
                      <p class="shrink-0 font-mono text-[11px] text-ink/45">
                        {{ formatDate(conv.last_message_at) }}
                      </p>
                    </div>
                    <p class="truncate text-sm text-ink/55">
                      {{ getLastMessagePreview(conv.id) }}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div class="border-t border-ink/10 p-4">
              <button
                type="button"
                @click="showNewChatModal = true"
                class="btn btn-ink w-full"
              >
                <RollText text="💬 New Chat" />
              </button>
            </div>
          </div>
        </div>

        <!-- Discussion -->
        <div class="md:col-span-2" :class="!selectedConversationId ? 'hidden md:block' : ''">
          <div
            v-if="!selectedConversationId"
            class="relative flex h-[min(640px,calc(100svh-12rem))] min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] bg-paper-deep/70 p-8"
          >
            <div class="relative z-10 max-w-sm text-center">
              <SunMark class="mx-auto h-32 w-32" state="sleepy" :ray-colors="['#8248FE', '#FA4D52']" />
              <p class="display mt-8 text-3xl leading-tight tracking-[-0.04em]">Select a conversation to start chatting</p>
              <p class="mt-3 text-ink/60">Or start a new conversation to connect with colleagues</p>
              <button
                type="button"
                @click="showNewChatModal = true"
                class="btn btn-ink mt-6 md:hidden"
              >
                Start New Chat
              </button>
            </div>
          </div>

          <div v-else class="flex h-[min(640px,calc(100svh-12rem))] min-h-[420px] flex-col overflow-hidden rounded-[2rem] border border-ink/10 bg-white">
            <div class="flex items-center gap-3 border-b border-ink/10 px-4 py-3.5 sm:px-5">
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/[0.06] md:hidden"
                @click="selectedConversationId = ''"
                aria-label="Back"
              >
                <Icon name="chevron-left" class="h-5 w-5" />
              </button>
              <div class="display grid h-11 w-11 place-items-center rounded-full bg-lilac text-lg">
                A
              </div>
              <div>
                <p class="font-semibold">Anonymous User</p>
                <p class="flex items-center gap-1.5 text-xs text-ink/55">
                  <Icon name="lock" class="h-3 w-3" />
                  All messages are anonymous
                </p>
              </div>
            </div>

            <div ref="messagesContainer" class="flex-1 space-y-3 overflow-y-auto bg-paper/60 p-4 sm:p-5" aria-live="polite">
              <div v-if="loadingMessages" class="text-center text-sm text-ink/50" role="status">
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
                    'max-w-[78%] px-4 py-2.5 sm:max-w-[70%]',
                    message.sender_id === currentProfile?.id
                      ? 'rounded-3xl rounded-br-lg bg-grape text-paper'
                      : 'rounded-3xl rounded-bl-lg border border-ink/10 bg-white text-ink'
                  ]"
                >
                  <p class="break-words leading-relaxed">{{ message.message }}</p>
                  <p
                    :class="[
                      'mt-1 font-mono text-[10px]',
                      message.sender_id === currentProfile?.id ? 'text-paper/65' : 'text-ink/45'
                    ]"
                  >
                    {{ formatTime(message.created_at) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="border-t border-ink/10 p-3 sm:p-4">
              <form @submit.prevent="sendMessage" class="flex gap-2">
                <input
                  v-model="newMessage"
                  type="text"
                  placeholder="Type a message..."
                  aria-label="Type a message..."
                  class="field min-w-0 flex-1 rounded-full"
                />
                <button
                  type="submit"
                  :disabled="!newMessage.trim() || sending"
                  class="btn btn-ink px-5"
                >
                  <span class="hidden sm:inline">Send</span>
                  <Icon name="send" class="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out-expo"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showNewChatModal"
          class="modal-backdrop"
          @click.self="showNewChatModal = false"
        >
          <div class="modal-panel p-6 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="new-chat-title">
            <div class="flex items-center gap-4">
              <span class="grid h-12 w-12 place-items-center rounded-full bg-grape text-paper">
                <Icon name="message" class="h-5 w-5" />
              </span>
              <h3 id="new-chat-title" class="display text-3xl tracking-[-0.04em]">Start New Chat</h3>
            </div>

            <div class="mb-8 mt-8">
              <label for="new-chat-user" class="field-label">
                Select a colleague
              </label>
              <select
                id="new-chat-user"
                v-model="selectedUserId"
                class="field"
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
                type="button"
                @click="showNewChatModal = false"
                class="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="startNewChat"
                :disabled="!selectedUserId || creating"
                class="btn btn-ink flex-1"
              >
                {{ creating ? 'Creating...' : 'Start Chat' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile } from '../lib/auth';
import type { Database } from '../lib/database.types';
import MoodFace from '../components/brand/MoodFace.vue';
import SunMark from '../components/brand/SunMark.vue';
import Icon from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';

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
