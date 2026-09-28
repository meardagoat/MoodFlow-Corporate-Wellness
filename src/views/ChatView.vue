<template>
  <div class="min-h-screen">
    <!-- ============================================================
         EN-TÊTE (masqué sur mobile quand une conversation est ouverte)
         ============================================================ -->
    <section class="shell pt-6 md:pt-10" :class="selectedConversationId ? 'hidden md:block' : ''">
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div class="min-w-0">
          <p class="label text-ink/55">(03) Messages<span v-if="totalUnread"> · {{ totalUnread }} non {{ totalUnread > 1 ? 'lus' : 'lu' }}</span></p>
          <h1 id="chat-title" v-split="{ chars: true, immediate: true, delay: 0.1 }" class="display mt-5 text-display-lg">
            Parlez <span class="accent text-grape">librement</span>
          </h1>
        </div>
        <div v-reveal="0.3" class="max-w-sm">
          <p class="text-pretty text-lg leading-snug text-ink/65">
            Échangez avec vos collègues en toute confiance&nbsp;: votre identité reste masquée, vos mots restent libres.
          </p>
          <ul class="mt-5 flex flex-wrap gap-2" aria-label="Garanties de la messagerie">
            <li class="chip"><span class="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />100&nbsp;% anonyme</li>
            <li class="chip"><span class="h-2 w-2 rounded-full bg-aqua" aria-hidden="true" />Espace bienveillant</li>
            <li class="chip"><span class="h-2 w-2 rounded-full bg-grape" aria-hidden="true" />Temps réel</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============================================================
         MESSAGERIE
         ============================================================ -->
    <section
      class="shell"
      :class="selectedConversationId ? 'pt-3 md:mt-10 md:pt-0' : 'mt-8 md:mt-10'"
      aria-labelledby="chat-title"
    >
      <div class="grid gap-3 md:grid-cols-[minmax(0,18.5rem)_minmax(0,1fr)] lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
        <!-- Liste des conversations -->
        <aside
          class="chat-list flex-col overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white"
          :class="selectedConversationId ? 'hidden md:flex' : 'flex'"
          aria-label="Conversations"
        >
          <div class="flex items-start justify-between gap-4 px-6 pb-4 pt-6">
            <div class="min-w-0">
              <p class="label text-ink/50">Boîte de réception</p>
              <h2 class="display mt-3 text-[1.9rem] leading-none tracking-[-0.045em]">
                Discussions<sup class="ml-1 font-mono text-xs font-medium tracking-normal text-ink/45">{{ conversations.length }}</sup>
              </h2>
            </div>
            <button
              type="button"
              class="new-btn grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 ease-out-back hover:scale-110"
              aria-label="Nouvelle conversation"
              title="Nouvelle conversation"
              @click="showNewChatModal = true"
            >
              <Icon name="plus" class="h-5 w-5 transition-transform duration-500 ease-out-back" />
            </button>
          </div>

          <div v-if="loadingConversations && conversations.length === 0" class="grid flex-1 place-items-center p-8" role="status">
            <SunMark class="h-12 w-12 animate-spin-slow" :face="false" :ray-count="14" :ray-width="9" />
            <span class="sr-only">Chargement des conversations</span>
          </div>

          <div v-else-if="conversations.length === 0" class="flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-4 text-center">
            <span class="grid h-24 w-24 place-items-center rounded-full bg-lilac/60">
              <MoodFace mood="sleepy" class="h-16 w-16 animate-drift" />
            </span>
            <p class="display mt-6 text-2xl tracking-[-0.04em]">C'est bien calme ici</p>
            <p class="mt-2 max-w-[16rem] text-sm text-ink/60">Aucune conversation pour l'instant. Lancez la première&nbsp;!</p>
          </div>

          <ul v-else class="flex-1 space-y-1 overflow-y-auto px-2.5 pb-3" role="list">
            <li v-for="conv in conversations" :key="conv.id">
              <button
                type="button"
                class="conv-row group relative flex w-full items-center gap-3.5 rounded-[1.6rem] px-3.5 py-3 text-left transition-colors duration-300"
                :class="selectedConversationId === conv.id ? 'bg-ink text-paper' : 'hover:bg-paper-deep/70'"
                :aria-current="selectedConversationId === conv.id ? 'true' : undefined"
                :aria-label="`Conversation avec ${aliasOf(conv.id).name}${conv.unread_count ? `, ${conv.unread_count} non lu${conv.unread_count > 1 ? 's' : ''}` : ''}`"
                @click="selectConversation(conv.id)"
              >
                <span
                  class="display grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg transition-transform duration-500 ease-out-back group-hover:scale-105"
                  :class="aliasOf(conv.id).tone"
                  aria-hidden="true"
                >{{ aliasOf(conv.id).name.charAt(0) }}</span>
                <span class="min-w-0 flex-1">
                  <span class="flex items-baseline justify-between gap-2">
                    <span class="truncate font-semibold">{{ aliasOf(conv.id).name }}</span>
                    <span
                      class="shrink-0 font-mono text-[11px] uppercase tracking-[0.06em]"
                      :class="selectedConversationId === conv.id ? 'text-paper/55' : 'text-ink/45'"
                    >{{ formatDate(conv.last_message_at) }}</span>
                  </span>
                  <span class="mt-0.5 flex items-center justify-between gap-2">
                    <span
                      class="truncate text-sm"
                      :class="[
                        selectedConversationId === conv.id ? 'text-paper/65' : 'text-ink/55',
                        conv.unread_count && selectedConversationId !== conv.id ? 'font-semibold !text-ink' : ''
                      ]"
                    >{{ getLastMessagePreview(conv.id) }}</span>
                    <span
                      v-if="conv.unread_count && conv.unread_count > 0"
                      class="grid h-6 min-w-6 shrink-0 place-items-center rounded-full bg-sun px-1.5 text-xs font-bold text-ink"
                      aria-hidden="true"
                    >{{ conv.unread_count > 9 ? '9+' : conv.unread_count }}</span>
                  </span>
                </span>
              </button>
            </li>
          </ul>

          <div class="border-t border-ink/[0.08] p-3">
            <button type="button" class="btn btn-ink w-full" @click="showNewChatModal = true">
              <Icon name="pen" class="h-4 w-4" />
              <RollText text="Nouvelle conversation" />
            </button>
          </div>
        </aside>

        <!-- Panneau vide (desktop) -->
        <div
          v-if="!selectedConversationId"
          v-reveal="0.2"
          class="chat-panel relative hidden overflow-hidden rounded-[2.5rem] bg-grape p-8 text-paper md:flex md:items-center md:justify-center"
        >
          <span class="empty-glow pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-coral/40 blur-3xl" aria-hidden="true" />
          <span class="pointer-events-none absolute right-10 top-10 grid h-16 w-16 animate-drift place-items-center rounded-full bg-paper/85 lg:h-20 lg:w-20" aria-hidden="true">
            <MoodFace mood="happy" class="h-11 w-11 lg:h-14 lg:w-14" />
          </span>
          <span class="pointer-events-none absolute bottom-12 right-16 hidden h-12 w-12 animate-drift place-items-center rounded-full bg-paper/85 [animation-delay:-3s] lg:grid" aria-hidden="true">
            <MoodFace mood="peek" class="h-9 w-9" />
          </span>
          <div class="relative z-10 max-w-md text-center">
            <SunMark class="mx-auto h-32 w-32 lg:h-40 lg:w-40" state="sleepy" :ray-colors="['#FED94E', '#FF8944']" />
            <p class="label mt-8 text-paper/60">Aucune conversation ouverte</p>
            <p class="display mt-4 text-display-sm">Choisissez une <span class="accent text-sun">discussion</span></p>
            <p class="mx-auto mt-4 max-w-xs text-paper/70">Sélectionnez une conversation à gauche, ou brisez la glace avec un·e collègue.</p>
            <button type="button" class="btn btn-sun mt-8" @click="showNewChatModal = true">
              <Icon name="plus" class="h-4 w-4" />
              <RollText text="Nouvelle conversation" />
            </button>
          </div>
        </div>

        <!-- Conversation ouverte -->
        <div
          v-else
          class="chat-panel flex flex-col overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white"
        >
          <header class="flex items-center gap-3 border-b border-ink/[0.08] px-3 py-3 sm:px-5 sm:py-4">
            <button
              type="button"
              class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/[0.05] transition-colors hover:bg-ink hover:text-paper md:hidden"
              aria-label="Retour aux conversations"
              @click="selectedConversationId = ''"
            >
              <Icon name="arrow-left" class="h-5 w-5" />
            </button>
            <span
              class="display grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg"
              :class="currentAlias.tone"
              aria-hidden="true"
            >{{ currentAlias.name.charAt(0) }}</span>
            <div class="min-w-0 flex-1">
              <h2 class="display truncate text-xl leading-tight tracking-[-0.035em]">{{ currentAlias.name }}</h2>
              <p class="mt-1 flex items-center gap-1.5 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                <Icon name="lock" class="h-3 w-3 shrink-0" />
                Identité masquée
              </p>
            </div>
            <span class="hidden shrink-0 items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold text-ink/70 sm:flex">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-75" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
              </span>
              En direct
            </span>
          </header>

          <div
            ref="messagesContainer"
            class="chat-scroll relative flex-1 overflow-y-auto overscroll-contain px-3 py-5 sm:px-6"
            aria-live="polite"
            aria-label="Messages de la conversation"
          >
            <div v-if="loadingMessages && timeline.length === 0" class="grid h-full place-items-center" role="status">
              <SunMark class="h-12 w-12 animate-spin-slow" :face="false" :ray-count="14" :ray-width="9" />
              <span class="sr-only">Chargement des messages</span>
            </div>

            <div v-else-if="timeline.length === 0" class="flex h-full flex-col items-center justify-center px-4 text-center">
              <span class="grid h-24 w-24 place-items-center rounded-full bg-lilac/70">
                <MoodFace mood="peek" class="h-16 w-16" />
              </span>
              <p class="display mt-6 text-2xl tracking-[-0.04em]">Brisez la <span class="accent text-grape">glace</span></p>
              <p class="mt-2 max-w-xs text-sm text-ink/60">Un premier mot suffit. Quelques idées pour commencer&nbsp;:</p>
              <div class="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  v-for="idea in icebreakers"
                  :key="idea"
                  type="button"
                  class="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  @click="newMessage = idea"
                >{{ idea }}</button>
              </div>
            </div>

            <ol v-else class="flex flex-col" role="list">
              <template v-for="row in timeline" :key="row.key">
                <li v-if="row.kind === 'day'" class="my-4 flex items-center gap-3 first:mt-0" role="separator">
                  <span class="h-px flex-1 bg-ink/10" aria-hidden="true" />
                  <span class="label rounded-full bg-paper px-3 py-1.5 text-ink/55">{{ row.label }}</span>
                  <span class="h-px flex-1 bg-ink/10" aria-hidden="true" />
                </li>
                <li
                  v-else
                  class="bubble-row flex items-end gap-2"
                  :class="[row.mine ? 'justify-end' : 'justify-start', row.first ? 'mt-3' : 'mt-1']"
                >
                  <span
                    v-if="!row.mine"
                    class="display grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs"
                    :class="row.last ? currentAlias.tone : 'invisible'"
                    aria-hidden="true"
                  >{{ currentAlias.name.charAt(0) }}</span>
                  <div
                    class="bubble max-w-[82%] px-4 py-2.5 sm:max-w-[68%] sm:px-5 sm:py-3"
                    :class="bubbleClass(row)"
                  >
                    <span class="sr-only">{{ row.mine ? 'Vous' : currentAlias.name }}&nbsp;:</span>
                    <p class="whitespace-pre-line break-words text-[15px] leading-relaxed">{{ row.message.message }}</p>
                    <p
                      v-if="row.last"
                      class="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] uppercase tracking-[0.08em]"
                      :class="row.mine ? 'text-paper/55' : 'text-ink/45'"
                    >
                      <time :datetime="row.message.created_at">{{ formatTime(row.message.created_at) }}</time>
                      <Icon v-if="row.mine" name="check" class="h-3 w-3" />
                    </p>
                  </div>
                </li>
              </template>
            </ol>
          </div>

          <div class="border-t border-ink/[0.08] bg-white p-2.5 sm:p-4">
            <form class="composer flex items-center gap-2 rounded-full border border-ink/15 bg-paper/70 p-1.5 pl-5 transition-[border-color,box-shadow] duration-200" @submit.prevent="sendMessage">
              <label for="chat-input" class="sr-only">Écrire un message</label>
              <input
                id="chat-input"
                v-model="newMessage"
                type="text"
                autocomplete="off"
                placeholder="Écrire un message…"
                class="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-ink placeholder:text-ink/40 focus:outline-none"
              />
              <button
                type="submit"
                :disabled="!newMessage.trim() || sending"
                class="send-btn grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink transition-[transform,background-color,opacity] duration-500 ease-out-back hover:scale-110 hover:bg-ink hover:text-sun disabled:scale-100 disabled:cursor-not-allowed disabled:bg-ink/[0.07] disabled:text-ink/35"
                aria-label="Envoyer le message"
              >
                <span v-if="sending" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <Icon v-else name="send" class="send-icon h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         MODALE : NOUVELLE CONVERSATION
         ============================================================ -->
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
          @keydown.esc="showNewChatModal = false"
        >
          <div
            ref="modalPanel"
            class="modal-panel flex flex-col !overflow-hidden p-0 focus:outline-none sm:max-w-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-chat-title"
            tabindex="-1"
          >
            <div class="relative shrink-0 overflow-hidden bg-ink px-6 pb-7 pt-6 text-paper sm:px-8 sm:pt-8">
              <span class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-grape/60 blur-3xl" aria-hidden="true" />
              <div class="relative flex items-start justify-between gap-4">
                <p class="label text-paper/55">Nouvelle conversation</p>
                <button
                  type="button"
                  class="-mr-2 -mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-paper/70 transition-colors hover:bg-paper hover:text-ink"
                  aria-label="Fermer"
                  @click="showNewChatModal = false"
                >
                  <Icon name="x" class="h-5 w-5" />
                </button>
              </div>
              <div class="relative mt-4 flex items-end justify-between gap-4">
                <h3 id="new-chat-title" class="display text-[clamp(2rem,6vw,2.6rem)] leading-[0.95] tracking-[-0.05em]">
                  À qui voulez-vous <span class="accent text-sun">écrire</span>&nbsp;?
                </h3>
                <span class="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-paper/90" aria-hidden="true">
                  <MoodFace mood="very_happy" class="h-11 w-11" />
                </span>
              </div>
              <p class="relative mt-4 flex items-center gap-2 text-sm text-paper/65">
                <Icon name="shield" class="h-4 w-4 shrink-0 text-sun" />
                Seul le service est visible. Votre identité reste masquée des deux côtés.
              </p>
            </div>

            <div class="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <div v-if="modalServices.length > 1" class="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 scrollbar-hide sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filtrer par service">
                <button
                  v-for="s in ['', ...modalServices]"
                  :key="s || 'all'"
                  type="button"
                  class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                  :class="serviceFilter === s ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'"
                  :aria-pressed="serviceFilter === s"
                  @click="serviceFilter = s"
                >{{ s || 'Tous les services' }}</button>
              </div>

              <fieldset class="mt-5">
                <legend class="field-label">Choisir un·e collègue</legend>
                <p v-if="filteredUsers.length === 0" class="mt-2 rounded-2xl bg-paper-deep/70 px-4 py-6 text-center text-sm text-ink/60">
                  Aucun·e collègue disponible pour le moment.
                </p>
                <div v-else class="mt-2 grid gap-2 sm:grid-cols-2">
                  <label
                    v-for="user in filteredUsers"
                    :key="user.id"
                    class="colleague group relative flex cursor-pointer items-center gap-3 rounded-[1.4rem] border px-3 py-3 transition-[border-color,background-color,transform] duration-300 ease-out-back hover:-translate-y-0.5"
                    :class="selectedUserId === user.id ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-white hover:border-ink/40'"
                  >
                    <input v-model="selectedUserId" type="radio" name="new-chat-user" :value="user.id" class="peer sr-only" />
                    <span
                      class="display grid h-11 w-11 shrink-0 place-items-center rounded-full text-base"
                      :class="toneAt(hashOf(user.service || ''))"
                      aria-hidden="true"
                    >{{ (user.service || '?').charAt(0).toUpperCase() }}</span>
                    <span class="min-w-0 flex-1">
                      <span class="block truncate font-semibold">{{ user.service || 'Service inconnu' }}</span>
                      <span class="block truncate text-xs" :class="selectedUserId === user.id ? 'text-paper/60' : 'text-ink/50'">Collègue anonyme</span>
                    </span>
                    <span
                      class="grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors"
                      :class="selectedUserId === user.id ? 'border-sun bg-sun text-ink' : 'border-ink/20 text-transparent'"
                      aria-hidden="true"
                    >
                      <Icon name="check" class="h-3.5 w-3.5" />
                    </span>
                    <span class="pointer-events-none absolute inset-0 rounded-[1.4rem] peer-focus-visible:ring-4 peer-focus-visible:ring-grape/40" aria-hidden="true" />
                  </label>
                </div>
              </fieldset>
            </div>

            <div class="flex shrink-0 gap-3 border-t border-ink/[0.08] bg-paper px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 sm:pb-6">
              <button type="button" class="btn btn-outline flex-1" @click="showNewChatModal = false">Annuler</button>
              <button
                type="button"
                class="btn btn-ink flex-1"
                :disabled="!selectedUserId || creating"
                @click="startNewChat"
              >
                {{ creating ? 'Création…' : 'Démarrer' }}
                <Icon v-if="!creating" name="arrow-right" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, onMounted, nextTick, watch } from 'vue';
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

const modalPanel = ref<HTMLElement | null>(null);
const serviceFilter = ref('');

// --- Aides purement visuelles -------------------------------------------

const DAY = 86400000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const daysAgo = (d: Date) => Math.round((startOfDay(new Date()) - startOfDay(d)) / DAY);

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const diff = daysAgo(date);
  if (diff <= 0) return formatTime(dateString);
  if (diff === 1) return 'Hier';
  if (diff < 7) return date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '');
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).replace('.', '');
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function formatDay(dateString: string): string {
  const date = new Date(dateString);
  const diff = daysAgo(date);
  if (diff <= 0) return "Aujourd'hui";
  if (diff === 1) return 'Hier';
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

// Pseudonymes stables par conversation : l'identité réelle n'est jamais affichée
const ALIASES = ['Colibri', 'Lagune', 'Mistral', 'Pivoine', 'Comète', 'Galet', 'Figue', 'Nuage', 'Sirocco', 'Agrume', 'Opale', 'Cerf-volant'];
const TONES = ['bg-sun text-ink', 'bg-lilac text-ink', 'bg-aqua text-ink', 'bg-tangerine text-ink', 'bg-grape text-paper', 'bg-coral text-ink'];

function hashOf(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  h ^= h >>> 13;
  return Math.imul(h, 2654435761) >>> 0;
}

function toneAt(index: number): string {
  return TONES[Math.abs(index) % TONES.length];
}

function aliasOf(conversationId: string) {
  const h = hashOf(conversationId || '');
  const i = h % ALIASES.length;
  return { name: ALIASES[i], tone: toneAt(i) };
}

const currentAlias = computed(() => aliasOf(selectedConversationId.value));
const totalUnread = computed(() => conversations.value.reduce((sum, c) => sum + (c.unread_count || 0), 0));

const icebreakers = ['Salut, comment ça va ?', 'Tu as un moment pour échanger ?', 'Merci pour ton aide !'];

type TimelineRow =
  | { kind: 'day'; key: string; label: string }
  | { kind: 'msg'; key: string; message: Message; mine: boolean; first: boolean; last: boolean };

const timeline = computed<TimelineRow[]>(() => {
  const list = messages.value.filter((m) => m.conversation_id === selectedConversationId.value);
  const rows: TimelineRow[] = [];
  const GAP = 5 * 60000;
  list.forEach((m, i) => {
    const prev = list[i - 1];
    const next = list[i + 1];
    const t = new Date(m.created_at).getTime();
    const sameDayAsPrev = prev && startOfDay(new Date(prev.created_at)) === startOfDay(new Date(m.created_at));
    if (!sameDayAsPrev) rows.push({ kind: 'day', key: `d-${m.id}`, label: formatDay(m.created_at) });
    const groupedWithPrev = !!prev && sameDayAsPrev && prev.sender_id === m.sender_id && t - new Date(prev.created_at).getTime() < GAP;
    const groupedWithNext =
      !!next &&
      next.sender_id === m.sender_id &&
      startOfDay(new Date(next.created_at)) === startOfDay(new Date(m.created_at)) &&
      new Date(next.created_at).getTime() - t < GAP;
    rows.push({
      kind: 'msg',
      key: m.id,
      message: m,
      mine: m.sender_id === currentProfile.value?.id,
      first: !groupedWithPrev,
      last: !groupedWithNext,
    });
  });
  return rows;
});

function bubbleClass(row: Extract<TimelineRow, { kind: 'msg' }>): string {
  const base = row.mine ? 'bg-ink text-paper rounded-[1.5rem]' : 'bg-white text-ink border border-ink/10 rounded-[1.5rem]';
  const side = row.mine
    ? `${row.first ? '' : 'rounded-tr-md'} ${row.last ? 'rounded-br-[0.35rem]' : 'rounded-br-md'}`
    : `${row.first ? '' : 'rounded-tl-md'} ${row.last ? 'rounded-bl-[0.35rem]' : 'rounded-bl-md'}`;
  return `${base} ${side}`;
}

// Dernier message connu par conversation (alimenté par les messages déjà chargés)
const previews = shallowRef<Record<string, Message>>({});
watch(messages, () => {
  const list = messages.value as Message[];
  const last = list[list.length - 1];
  if (last) previews.value = { ...previews.value, [last.conversation_id]: last };
});

const modalServices = computed<string[]>(() => {
  const set = new Set<string>();
  for (const u of availableUsers.value as unknown as Profile[]) if (u.service) set.add(String(u.service));
  return [...set].sort((a, b) => a.localeCompare(b, 'fr'));
});
const filteredUsers = computed<Profile[]>(() => {
  const users = availableUsers.value as unknown as Profile[];
  return serviceFilter.value ? users.filter((u) => u.service === serviceFilter.value) : users;
});

watch(showNewChatModal, async (open) => {
  if (open) {
    serviceFilter.value = '';
    await nextTick();
    modalPanel.value?.focus();
  }
});

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
  // Dernier message connu de cette conversation
  const lastMessage = previews.value[conversationId];

  // Si aucun message connu, retourner un texte par défaut
  if (!lastMessage) {
    const conv = conversations.value.find((c) => c.id === conversationId);
    return conv?.unread_count ? 'Nouveau message' : 'Ouvrir la discussion';
  }

  // Vérifier si c'est l'utilisateur actuel qui a envoyé le message
  const isCurrentUser = lastMessage.sender_id === currentProfile.value?.id;

  // Formater le préfixe en fonction de l'expéditeur
  const prefix = isCurrentUser ? 'Vous : ' : '';

  // Tronquer le message s'il est trop long
  const messageText = lastMessage.message.length > 60
    ? lastMessage.message.substring(0, 60) + '…'
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
    // Sur mobile, remonter en haut pour afficher le panneau de conversation en entier
    if (window.matchMedia('(max-width: 767px)').matches) window.scrollTo({ top: 0 });
  }
});
</script>

<style scoped>
/* Hauteurs : sur mobile, le panneau tient entre la barre du haut (5rem) et le dock (~7rem) */
.chat-panel {
  height: calc(100svh - 5rem - 0.75rem - 7.25rem);
  min-height: 24rem;
}

@media (min-width: 768px) {
  .chat-list,
  .chat-panel {
    height: min(50rem, calc(100svh - 8rem));
    min-height: 34rem;
  }
}

.chat-scroll {
  background-color: #fff8ef;
  background-image: radial-gradient(rgba(26, 14, 43, 0.07) 1px, transparent 1px);
  background-size: 22px 22px;
}

.composer:focus-within {
  border-color: #1a0e2b;
  box-shadow: 0 0 0 4px rgba(130, 72, 254, 0.15);
}

.new-btn:hover :deep(svg) {
  transform: rotate(90deg);
}

.send-btn:not(:disabled):hover .send-icon {
  transform: translate(2px, -2px) rotate(-8deg);
}

.send-icon {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bubble-row {
  animation: bubble-in 0.45s var(--ease-out-expo) both;
}

@keyframes bubble-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}

.empty-glow {
  animation: drift 10s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .bubble-row,
  .empty-glow {
    animation: none;
  }
  .send-icon,
  .new-btn :deep(svg) {
    transition: none;
  }
}
</style>
