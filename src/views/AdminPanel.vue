<template>
  <div class="min-h-screen">
    <!-- ============================================================
         EN-TÊTE
         ============================================================ -->
    <section class="shell pt-6 md:pt-10" aria-labelledby="admin-title">
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div class="min-w-0">
          <p class="label flex flex-wrap items-center gap-x-3 gap-y-2 text-ink/55">
            <span>(04) Administration</span>
            <span class="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-paper">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-70" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
              </span>
              Super admin
            </span>
          </p>
          <h1 id="admin-title" v-split="{ chars: true, immediate: true, delay: 0.1 }" class="display mt-5 text-display-lg">
            La <span class="accent text-coral">console</span>
          </h1>
        </div>
        <p v-reveal="0.3" class="max-w-sm text-pretty text-lg leading-snug text-ink/65">
          Gérez les membres de l'organisation, leurs rôles et les demandes de modification, depuis un seul endroit.
        </p>
      </div>

      <!-- ============================================================
           KPI
           ============================================================ -->
      <div class="mt-10 grid grid-cols-2 gap-3 md:grid-cols-12">
        <!-- Utilisateurs -->
        <div
          v-reveal="0.1"
          class="kpi relative col-span-2 flex min-h-[17rem] flex-col overflow-hidden rounded-[2.5rem] bg-ink p-6 text-paper sm:p-8 md:col-span-12 lg:col-span-6 lg:row-span-2"
        >
          <div class="kpi-glow pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-coral/45 blur-3xl" aria-hidden="true" />
          <div class="relative flex items-start justify-between gap-4">
            <p class="label text-paper/60">Utilisateurs</p>
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-ink">
              <Icon name="users" class="h-5 w-5" />
            </span>
          </div>
          <div v-if="users.length" class="relative mt-6 flex items-center" aria-hidden="true">
            <span
              v-for="(u, i) in users.slice(0, 6)"
              :key="u.id"
              class="display -ml-2 grid h-11 w-11 place-items-center rounded-full text-xs ring-[3px] ring-ink first:ml-0"
              :style="{ ...avatarStyle(u.id), zIndex: 10 - i }"
            >{{ initialsFrom(u.display_name || u.email) }}</span>
            <span v-if="users.length > 6" class="-ml-2 grid h-11 min-w-[2.75rem] place-items-center rounded-full bg-paper/15 px-2 font-mono text-xs text-paper ring-[3px] ring-ink">+{{ users.length - 6 }}</span>
          </div>
          <div class="relative mt-auto pt-8">
            <p class="display text-[clamp(4.5rem,11vw,8.5rem)] leading-[0.8] tracking-[-0.06em]">
              <CountUp :key="`u-${stats.totalUsers}`" :value="String(stats.totalUsers)" />
            </p>
            <p class="mt-3 text-sm text-paper/65">membres actifs dans l'organisation</p>

            <div
              class="mt-6 flex h-3 overflow-hidden rounded-full bg-paper/10"
              role="img"
              :aria-label="`Répartition : ${stats.superAdmins} super admin, ${stats.managers} managers, ${stats.employees} employés`"
            >
              <span
                v-for="seg in roleSegments"
                :key="seg.key"
                class="role-bar h-full"
                :style="{ width: `${seg.pct}%`, backgroundColor: seg.color }"
              />
            </div>
            <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-paper/70">
              <li v-for="seg in roleSegments" :key="seg.key" class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: seg.color }" aria-hidden="true" />
                <span class="font-semibold text-paper">{{ seg.value }}</span> {{ seg.label }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Autres indicateurs -->
        <div
          v-for="(kpi, i) in kpiTiles"
          :key="kpi.key"
          v-reveal="0.15 + i * 0.06"
          class="kpi group relative flex min-h-[10rem] flex-col overflow-hidden rounded-[2rem] p-5 sm:min-h-[12rem] sm:p-6 md:col-span-6 lg:col-span-3"
          :class="kpi.bg"
        >
          <div class="flex items-start justify-between gap-3">
            <p class="label" :class="kpi.muted">{{ kpi.label }}</p>
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-out-back group-hover:rotate-12 group-hover:scale-110" :class="kpi.iconBg">
              <Icon :name="kpi.icon" class="h-[1.1rem] w-[1.1rem]" />
            </span>
          </div>
          <p class="display mt-auto pt-6 text-[clamp(3rem,6vw,4.75rem)] leading-[0.82] tracking-[-0.06em]">
            <CountUp :key="`${kpi.key}-${kpi.value}`" :value="String(kpi.value)" />
          </p>
          <p class="mt-2 text-xs sm:text-sm" :class="kpi.muted">{{ kpi.caption }}</p>
        </div>
      </div>
    </section>

    <!-- ============================================================
         DEMANDES + CRÉATION
         ============================================================ -->
    <section class="shell mt-16 grid gap-3 md:mt-20 lg:grid-cols-12" aria-labelledby="requests-title">
      <!-- File des demandes -->
      <div class="min-w-0 lg:col-span-7">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="requests-title" class="display text-display-md">Les <span class="accent text-coral">demandes</span></h2>
          <p class="label text-ink/50">{{ modificationRequests.length }} au total</p>
        </div>

        <div class="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide sm:mx-0 sm:px-0" role="group" aria-label="Filtrer les demandes par statut">
          <button
            v-for="f in requestFilters"
            :key="f.value"
            type="button"
            :aria-pressed="requestFilter === f.value"
            class="flex shrink-0 items-center gap-2 rounded-full py-2 pl-4 pr-2 text-sm font-semibold transition-colors duration-300"
            :class="requestFilter === f.value ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'"
            @click="requestFilter = f.value"
          >
            {{ f.label }}
            <span
              class="grid h-6 min-w-[1.5rem] place-items-center rounded-full px-1.5 font-mono text-[11px]"
              :class="requestFilter === f.value ? 'bg-paper/15 text-paper' : 'bg-white text-ink/60'"
            >{{ f.count }}</span>
          </button>
        </div>

        <div v-if="visibleRequests.length > 0" class="mt-6 space-y-3">
          <article
            v-for="(request, index) in visibleRequests"
            :key="request.id"
            v-reveal="(index % 4) * 0.06"
            class="request-card relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-5 sm:p-7"
            :style="{ '--status': statusMeta(request.status).color }"
          >
            <span class="request-strip absolute inset-y-0 left-0 w-1.5" aria-hidden="true" />

            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex min-w-0 flex-wrap items-center gap-2">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold leading-none"
                  :class="statusMeta(request.status).chip"
                >
                  <Icon :name="statusMeta(request.status).icon" class="h-3.5 w-3.5" />
                  {{ statusMeta(request.status).label }}
                </span>
                <span class="tag">{{ getRequestTypeLabel(request.request_type) }}</span>
              </div>
              <time :datetime="request.created_at" class="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/45">
                {{ formatDate(request.created_at) }}
              </time>
            </div>

            <!-- Valeur actuelle → nouvelle valeur -->
            <div class="mt-5 grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-3 lg:grid-cols-1 lg:gap-2 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-3">
              <div class="min-w-0 rounded-2xl bg-paper-deep/70 px-4 py-3">
                <p class="label text-ink/45">Valeur actuelle</p>
                <p class="mt-1.5 break-words font-medium text-ink/60 line-through decoration-ink/25">{{ formatRequestValue(request, request.current_value) }}</p>
              </div>
              <span class="mx-auto grid h-9 w-9 shrink-0 rotate-90 place-items-center rounded-full bg-ink text-paper sm:rotate-0 lg:rotate-90 xl:rotate-0" aria-hidden="true">
                <Icon name="arrow-right" class="h-4 w-4" />
              </span>
              <div class="min-w-0 rounded-2xl px-4 py-3" :class="statusMeta(request.status).soft">
                <p class="label text-ink/55">Nouvelle valeur</p>
                <p class="mt-1.5 break-words font-semibold">{{ formatRequestValue(request, request.requested_value) }}</p>
              </div>
            </div>

            <blockquote v-if="request.reason" class="mt-4 border-l-2 border-ink/15 pl-4 text-pretty text-ink/75">
              « {{ request.reason }} »
            </blockquote>

            <div class="mt-5 flex flex-col gap-4 border-t border-ink/[0.07] pt-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
              <div class="flex min-w-0 items-center gap-3">
                <span
                  class="display grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs"
                  :style="avatarStyle(request.user_email || request.id)"
                  aria-hidden="true"
                >{{ initialsFrom(request.user_email) }}</span>
                <div class="min-w-0">
                  <p class="label text-ink/45">Demandeur</p>
                  <p class="truncate text-sm font-semibold">{{ request.user_email || 'E-mail non disponible' }}</p>
                </div>
              </div>

              <div class="flex shrink-0 gap-2">
                <template v-if="request.status === 'pending'">
                  <button
                    type="button"
                    @click="processRequest(request.id, 'approved')"
                    class="btn btn-sm flex-1 bg-[#BDEBCB] text-[#0F3D22] hover:bg-ink hover:text-paper sm:flex-none lg:flex-1 xl:flex-none"
                  >
                    <Icon name="check" class="h-4 w-4" />
                    Approuver
                  </button>
                  <button
                    type="button"
                    @click="processRequest(request.id, 'rejected')"
                    class="btn btn-sm btn-coral flex-1 sm:flex-none lg:flex-1 xl:flex-none"
                  >
                    <Icon name="x" class="h-4 w-4" />
                    Rejeter
                  </button>
                </template>
                <button
                  type="button"
                  @click="showRequestDetails(request)"
                  class="btn btn-sm btn-outline shrink-0 px-3.5"
                  :aria-label="`Voir les détails de la demande de ${request.user_email || 'ce membre'}`"
                >
                  <Icon name="eye" class="h-4 w-4" />
                  <span :class="request.status === 'pending' ? 'sr-only md:not-sr-only' : ''">Détails</span>
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="mt-6 grid place-items-center rounded-[2.5rem] bg-paper-deep/70 px-6 py-16 text-center">
          <MoodFace mood="very_happy" class="h-16 w-16" />
          <p class="display mt-5 text-2xl tracking-[-0.04em]">{{ emptyRequestsTitle }}</p>
          <p class="mt-2 max-w-xs text-sm text-ink/60">Tout est à jour. Les nouvelles demandes des membres apparaîtront ici.</p>
        </div>
      </div>

      <!-- Créer un utilisateur -->
      <aside class="mt-10 min-w-0 lg:col-span-5 lg:mt-0" aria-labelledby="create-title">
        <div class="lg:sticky lg:top-8">
          <div v-reveal="0.15" class="relative overflow-hidden rounded-[2.5rem] bg-coral p-6 sm:p-8">
            <span class="pointer-events-none absolute -right-10 -top-10 grid h-40 w-40 place-items-center rounded-full bg-paper/70" aria-hidden="true">
              <MoodFace mood="peek" class="mr-4 mt-4 h-20 w-20" />
            </span>

            <div class="relative pr-28">
              <p class="label text-ink/65">Nouveau compte</p>
              <h2 id="create-title" class="display mt-4 text-[clamp(2rem,4vw,2.9rem)] leading-[0.92] tracking-[-0.045em]">
                Inviter un <span class="accent">membre</span>
              </h2>
            </div>
            <p class="relative mt-3 max-w-xs text-sm text-ink/75">Il recevra ses accès avec un mot de passe temporaire à modifier.</p>

            <form @submit.prevent="createUserHandler" class="relative mt-7 space-y-4">
              <div>
                <label for="newEmail" class="field-label text-ink">Adresse e-mail</label>
                <input
                  id="newEmail"
                  v-model="newUser.email"
                  type="email"
                  required
                  autocomplete="off"
                  class="field border-transparent"
                  placeholder="prenom.nom@entreprise.com"
                />
              </div>

              <div>
                <label for="newPassword" class="field-label text-ink">Mot de passe temporaire</label>
                <input
                  id="newPassword"
                  v-model="newUser.password"
                  type="password"
                  required
                  minlength="6"
                  autocomplete="new-password"
                  class="field border-transparent"
                  placeholder="6 caractères minimum"
                />
              </div>

              <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div class="min-w-0">
                  <label for="newService" class="field-label text-ink">Service</label>
                  <input
                    id="newService"
                    v-model="newUser.service"
                    type="text"
                    required
                    class="field border-transparent"
                    placeholder="Ex. Tech, Ventes, RH"
                  />
                </div>

                <div class="min-w-0">
                  <label for="newRole" class="field-label text-ink">Rôle</label>
                  <select id="newRole" v-model="newUser.role" required class="field border-transparent">
                    <option value="employee">Employé</option>
                    <option value="manager">Manager</option>
                    <option v-if="isSystemAdmin" value="system_admin">Super admin</option>
                  </select>
                </div>
              </div>

              <div v-if="createError" class="notice notice-error animate-shake" role="alert">
                {{ createError }}
              </div>

              <div v-if="createSuccess" class="notice notice-success" role="status">
                Utilisateur créé avec succès.
              </div>

              <button type="submit" :disabled="creating" class="btn btn-ink btn-lg mt-2 w-full">
                <span v-if="creating" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                <Icon v-else name="user-plus" class="h-5 w-5" />
                {{ creating ? 'Création…' : 'Créer l\'utilisateur' }}
              </button>
            </form>
          </div>

          <div class="mt-3 flex items-center gap-4 rounded-[2rem] border border-ink/10 bg-white p-5">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lilac">
              <Icon name="shield" class="h-5 w-5" />
            </span>
            <p class="text-sm text-ink/70">Chaque changement de rôle est journalisé. Attribuez le rôle super admin avec parcimonie.</p>
          </div>
        </div>
      </aside>
    </section>

    <!-- ============================================================
         ANNUAIRE
         ============================================================ -->
    <section class="shell mt-16 md:mt-20" aria-labelledby="users-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="users-title" class="display text-display-md">L'<span class="accent text-coral">annuaire</span></h2>
        <div class="relative w-full sm:w-72">
          <Icon name="search" class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45" />
          <input
            v-model="userQuery"
            type="search"
            class="field rounded-full py-3 pl-11"
            placeholder="Rechercher un membre…"
            aria-label="Rechercher un membre"
          />
        </div>
      </div>

      <!-- Filtres rôle -->
      <div class="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide sm:mx-0 sm:px-0" role="group" aria-label="Filtrer par rôle">
        <button
          v-for="f in roleFilters"
          :key="f.value"
          type="button"
          :aria-pressed="roleFilter === f.value"
          class="flex shrink-0 items-center gap-2 rounded-full py-2 pl-4 pr-2 text-sm font-semibold transition-colors duration-300"
          :class="roleFilter === f.value ? 'bg-ink text-paper' : 'bg-ink/[0.05] text-ink/70 hover:bg-ink/10 hover:text-ink'"
          @click="roleFilter = f.value"
        >
          {{ f.label }}
          <span
            class="grid h-6 min-w-[1.5rem] place-items-center rounded-full px-1.5 font-mono text-[11px]"
            :class="roleFilter === f.value ? 'bg-paper/15 text-paper' : 'bg-white text-ink/60'"
          >{{ f.count }}</span>
        </button>
      </div>

      <div v-reveal="0.1" class="mt-6 overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white">
        <!-- Tableau (très grand écran) -->
        <table class="hidden w-full table-fixed xl:table">
          <caption class="sr-only">Liste des utilisateurs</caption>
          <thead class="border-b border-ink/10 bg-paper/60">
            <tr>
              <th scope="col" class="label px-8 py-5 text-left font-normal text-ink/55">Membre</th>
              <th scope="col" class="label w-[18%] px-4 py-5 text-left font-normal text-ink/55">Service</th>
              <th scope="col" class="label w-[17%] px-4 py-5 text-left font-normal text-ink/55">Rôle</th>
              <th scope="col" class="label w-[15%] px-4 py-5 text-left font-normal text-ink/55">Créé le</th>
              <th scope="col" class="label w-[10rem] px-8 py-5 text-right font-normal text-ink/55"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ink/[0.07]">
            <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
              <td class="px-8 py-4">
                <div class="flex min-w-0 items-center gap-4">
                  <span
                    class="avatar display grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm"
                    :style="avatarStyle(user.id)"
                    aria-hidden="true"
                  >{{ initialsFrom(user.display_name || user.email) }}</span>
                  <div class="min-w-0">
                    <p class="truncate font-semibold">{{ user.display_name || 'Sans nom' }}</p>
                    <p class="truncate text-sm text-ink/55" :title="user.email || undefined">{{ user.email || 'Aucun e-mail' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <span class="tag max-w-full truncate">{{ user.service || 'Aucun service' }}</span>
              </td>
              <td class="px-4 py-4">
                <span :class="getRoleBadgeClass(user.role)">
                  <Icon :name="roleIcon(user.role)" class="h-3.5 w-3.5 shrink-0" />
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>
              <td class="px-4 py-4 font-mono text-xs text-ink/55">
                {{ user.created_at ? formatDate(user.created_at) : '—' }}
              </td>
              <td class="px-8 py-4 text-right">
                <button type="button" @click="editUser(user)" class="btn btn-sm btn-outline" :aria-label="`Modifier ${user.display_name || user.email || 'cet utilisateur'}`">
                  <Icon name="pen" class="h-3.5 w-3.5" />
                  Modifier
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Cartes (mobile / tablette) -->
        <ul class="grid gap-2 p-2 sm:grid-cols-2 sm:gap-3 sm:p-3 lg:grid-cols-3 xl:hidden">
          <li v-for="user in filteredUsers" :key="user.id" class="min-w-0 rounded-[1.75rem] bg-paper p-4 sm:p-5">
            <div class="flex items-center gap-3">
              <span
                class="display grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm"
                :style="avatarStyle(user.id)"
                aria-hidden="true"
              >{{ initialsFrom(user.display_name || user.email) }}</span>
              <div class="min-w-0 flex-1">
                <p class="truncate font-semibold">{{ user.display_name || 'Sans nom' }}</p>
                <p class="break-all text-xs text-ink/55">{{ user.email || 'Aucun e-mail' }}</p>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-1.5">
              <span :class="getRoleBadgeClass(user.role)">
                <Icon :name="roleIcon(user.role)" class="h-3.5 w-3.5 shrink-0" />
                {{ getRoleLabel(user.role) }}
              </span>
              <span class="tag">{{ user.service || 'Aucun service' }}</span>
            </div>

            <div class="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
              <span class="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
                <Icon name="calendar" class="h-3.5 w-3.5 shrink-0" />
                <span class="sr-only">Créé le</span>
                <span class="whitespace-nowrap">{{ user.created_at ? formatDate(user.created_at) : '—' }}</span>
              </span>
              <button type="button" @click="editUser(user)" class="btn btn-sm btn-ink" :aria-label="`Modifier ${user.display_name || user.email || 'cet utilisateur'}`">
                Modifier
              </button>
            </div>
          </li>
        </ul>

        <div v-if="filteredUsers.length === 0" class="grid place-items-center px-6 py-16 text-center">
          <MoodFace mood="peek" class="h-14 w-14" />
          <p class="mt-4 text-ink/65">Aucun membre ne correspond à votre recherche.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../lib/supabase';
import { createUser } from '../lib/auth';
import { isSystemAdmin } from '../lib/auth';
import MoodFace from '../components/brand/MoodFace.vue';
import CountUp from '../components/ui/CountUp.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';

const users = ref<any[]>([]);
const modificationRequests = ref<any[]>([]);
const stats = ref({
  totalUsers: 0,
  superAdmins: 0,
  managers: 0,
  employees: 0
});


const newUser = ref({
  email: '',
  password: '',
  service: '',
  role: 'employee' as 'employee' | 'manager' | 'system_admin'
});

const creating = ref(false);
const createError = ref('');
const createSuccess = ref(false);

// Computed pour les demandes
const pendingRequests = computed(() =>
  modificationRequests.value.filter(req => req.status === 'pending')
);
const approvedRequests = computed(() =>
  modificationRequests.value.filter(req => req.status === 'approved')
);
const rejectedRequests = computed(() =>
  modificationRequests.value.filter(req => req.status === 'rejected')
);

// --- Présentation (purement visuel) ---
const roleSegments = computed(() => {
  const total = stats.value.totalUsers || 1;
  return [
    { key: 'system_admin', label: 'super admin', value: stats.value.superAdmins, color: '#FA4D52' },
    { key: 'manager', label: 'managers', value: stats.value.managers, color: '#FF8944' },
    { key: 'employee', label: 'employés', value: stats.value.employees, color: '#CDB8FF' },
  ].map(seg => ({ ...seg, pct: (seg.value / total) * 100 }));
});

const kpiTiles = computed<{ key: string; label: string; value: number; caption: string; icon: IconName; bg: string; iconBg: string; muted: string }[]>(() => [
  { key: 'managers', label: 'Managers', value: stats.value.managers, caption: 'responsables d\'équipe', icon: 'badge', bg: 'bg-tangerine', iconBg: 'bg-paper/70', muted: 'text-ink/70' },
  { key: 'pending', label: 'En attente', value: pendingRequests.value.length, caption: 'demandes à traiter', icon: 'hourglass', bg: 'bg-sun', iconBg: 'bg-ink text-sun', muted: 'text-ink/70' },
  { key: 'approved', label: 'Approuvées', value: approvedRequests.value.length, caption: 'demandes validées', icon: 'check', bg: 'bg-[#BDEBCB]', iconBg: 'bg-paper/70', muted: 'text-ink/70' },
  { key: 'rejected', label: 'Rejetées', value: rejectedRequests.value.length, caption: 'demandes refusées', icon: 'x', bg: 'bg-[#FFD3D4]', iconBg: 'bg-coral', muted: 'text-ink/70' },
]);

type RequestFilter = 'pending' | 'approved' | 'rejected' | 'all';
const requestFilter = ref<RequestFilter>('pending');
const requestFilters = computed<{ value: RequestFilter; label: string; count: number }[]>(() => [
  { value: 'pending', label: 'En attente', count: pendingRequests.value.length },
  { value: 'approved', label: 'Approuvées', count: approvedRequests.value.length },
  { value: 'rejected', label: 'Rejetées', count: rejectedRequests.value.length },
  { value: 'all', label: 'Toutes', count: modificationRequests.value.length },
]);
const visibleRequests = computed(() => {
  switch (requestFilter.value) {
    case 'pending': return pendingRequests.value;
    case 'approved': return approvedRequests.value;
    case 'rejected': return rejectedRequests.value;
    default: return modificationRequests.value;
  }
});
const emptyRequestsTitle = computed(() => {
  switch (requestFilter.value) {
    case 'pending': return 'Aucune demande en attente';
    case 'approved': return 'Aucune demande approuvée';
    case 'rejected': return 'Aucune demande rejetée';
    default: return 'Aucune demande';
  }
});

function statusMeta(status: string): { label: string; icon: IconName; color: string; chip: string; soft: string } {
  switch (status) {
    case 'approved': return { label: 'Approuvée', icon: 'check', color: '#5CC98A', chip: 'bg-[#BDEBCB] text-[#0F3D22]', soft: 'bg-[#BDEBCB]/60' };
    case 'rejected': return { label: 'Rejetée', icon: 'x', color: '#FA4D52', chip: 'bg-coral text-ink', soft: 'bg-[#FFD3D4]/70' };
    default: return { label: 'En attente', icon: 'hourglass', color: '#FED94E', chip: 'bg-sun text-ink', soft: 'bg-sun/45' };
  }
}

function formatRequestValue(request: any, value: string | null | undefined) {
  if (value === null || value === undefined || value === '') return '—';
  return String(request.request_type || '').includes('role') ? getRoleLabel(value) : value;
}

type RoleFilter = 'all' | 'system_admin' | 'manager' | 'employee';
const roleFilter = ref<RoleFilter>('all');
const userQuery = ref('');
const roleFilters = computed<{ value: RoleFilter; label: string; count: number }[]>(() => [
  { value: 'all', label: 'Tous', count: stats.value.totalUsers },
  { value: 'system_admin', label: 'Super admin', count: stats.value.superAdmins },
  { value: 'manager', label: 'Managers', count: stats.value.managers },
  { value: 'employee', label: 'Employés', count: stats.value.employees },
]);
const filteredUsers = computed(() => {
  const q = userQuery.value.trim().toLowerCase();
  return users.value.filter(u => {
    if (roleFilter.value !== 'all' && u.role !== roleFilter.value) return false;
    if (!q) return true;
    return [u.display_name, u.email, u.service].some((v: unknown) => typeof v === 'string' && v.toLowerCase().includes(q));
  });
});

const AVATAR_COLORS: [string, string][] = [
  ['#FED94E', '#1A0E2B'],
  ['#FF8944', '#1A0E2B'],
  ['#FA4D52', '#1A0E2B'],
  ['#CDB8FF', '#1A0E2B'],
  ['#5EDDE7', '#1A0E2B'],
  ['#8248FE', '#FFF8EF'],
  ['#FF5BBC', '#1A0E2B'],
  ['#1A0E2B', '#FED94E'],
];

function avatarStyle(seed: string | null | undefined) {
  const str = seed || 'x';
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const [bg, fg] = AVATAR_COLORS[h % AVATAR_COLORS.length];
  return { backgroundColor: bg, color: fg };
}

function initialsFrom(value: string | null | undefined) {
  if (!value) return 'U';
  const base = value.includes('@') ? value.split('@')[0] : value;
  const parts = base.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : base.slice(0, 1);
  return letters.toUpperCase();
}

function roleIcon(role: string): IconName {
  switch (role) {
    case 'system_admin': return 'crown';
    case 'manager': return 'badge';
    default: return 'user';
  }
}

// Load users and stats
async function loadUsers() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    users.value = data || [];

    // Calculate stats
    stats.value = {
      totalUsers: data?.length || 0,
      superAdmins: data?.filter(u => u.role === 'system_admin').length || 0,
      managers: data?.filter(u => u.role === 'manager').length || 0,
      employees: data?.filter(u => u.role === 'employee').length || 0
    };
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

// Load modification requests
async function loadModificationRequests() {
  try {
    // Charger les demandes avec les emails via la vue
    const { data: requests, error: requestsError } = await supabase
      .from('modification_requests_with_email')
      .select('*')
      .order('created_at', { ascending: false });

    if (requestsError) throw requestsError;

    modificationRequests.value = requests || [];
  } catch (error) {
    console.error('Error loading modification requests:', error);
    modificationRequests.value = [];
  }
}

// Create new user
async function createUserHandler() {
  creating.value = true;
  createError.value = '';
  createSuccess.value = false;

  try {
    const { data, error } = await createUser(
      newUser.value.email,
      newUser.value.password,
      newUser.value.role,
      newUser.value.service
    );

    if (error) {
      createError.value = error.message;
    } else {
      createSuccess.value = true;
      newUser.value = { email: '', password: '', service: '', role: 'employee' };
      await loadUsers();

      // Hide success message after 3 seconds
      setTimeout(() => {
        createSuccess.value = false;
      }, 3000);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    createError.value = error?.message || 'Une erreur est survenue lors de la création de l\'utilisateur';
  } finally {
    creating.value = false;
  }
}

// Helper functions
function getRoleLabel(role: string) {
  switch (role) {
    case 'system_admin': return 'Super admin';
    case 'manager': return 'Manager';
    case 'employee': return 'Employé';
    default: return role;
  }
}

function getRoleBadgeClass(role: string) {
  switch (role) {
    case 'system_admin': return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-coral px-3 py-1.5 text-xs font-semibold leading-none text-ink';
    case 'manager': return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tangerine/30 px-3 py-1.5 text-xs font-semibold leading-none text-ink';
    case 'employee': return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-lilac/70 px-3 py-1.5 text-xs font-semibold leading-none text-ink';
    default: return 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink/[0.06] px-3 py-1.5 text-xs font-semibold leading-none text-ink';
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function editUser(user: any) {
  // TODO: Implement user editing functionality
  console.log('Edit user:', user);
}

// Process modification request
async function processRequest(requestId: string, status: 'approved' | 'rejected') {
  try {
    const { error } = await supabase.rpc('process_modification_request', {
      request_id: requestId,
      new_status: status,
      admin_notes: null
    });

    if (error) throw error;

    // Recharger les demandes
    await loadModificationRequests();

    alert(`Demande ${status === 'approved' ? 'approuvée' : 'rejetée'} avec succès !`);
  } catch (error) {
    console.error('Error processing request:', error);
    alert('Erreur lors du traitement de la demande');
  }
}

// Show request details
function showRequestDetails(request: any) {
  alert(`Détails de la demande\n\nType : ${getRequestTypeLabel(request.request_type)}\nStatut : ${statusMeta(request.status).label}\nValeur actuelle : ${formatRequestValue(request, request.current_value)}\nNouvelle valeur : ${formatRequestValue(request, request.requested_value)}\nRaison : ${request.reason || '—'}\nDemandeur : ${request.user_email || 'E-mail non disponible'}`);
}

// Get request type label
function getRequestTypeLabel(type: string) {
  switch (type) {
    case 'email_change':
    case 'email': return 'Changement d\'e-mail';
    case 'service_change':
    case 'service': return 'Changement de service';
    case 'display_name_change':
    case 'display_name': return 'Changement de nom';
    case 'role_change':
    case 'role': return 'Changement de rôle';
    default: return type;
  }
}

onMounted(() => {
  loadUsers();
  loadModificationRequests();
});
</script>

<style scoped>
.kpi {
  transition: transform 0.6s var(--ease-out-expo);
}
.kpi:hover {
  transform: translateY(-4px);
}
.kpi-glow {
  animation: drift 9s ease-in-out infinite;
}
.role-bar {
  transition: width 1.4s var(--ease-out-expo);
}
.role-bar + .role-bar {
  box-shadow: inset 2px 0 0 #1a0e2b;
}
.request-strip {
  background: var(--status);
}
.request-card {
  transition:
    transform 0.6s var(--ease-out-expo),
    box-shadow 0.6s var(--ease-out-expo),
    border-color 0.4s ease;
}
.request-card:hover {
  transform: translateY(-3px);
  border-color: transparent;
  box-shadow: 0 30px 60px -36px rgba(26, 14, 43, 0.5);
}
.user-row {
  transition: background-color 0.3s ease;
}
.user-row:hover {
  background-color: rgba(255, 248, 239, 0.8);
}
.user-row .avatar {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.user-row:hover .avatar {
  transform: scale(1.1) rotate(-6deg);
}
@media (prefers-reduced-motion: reduce) {
  .kpi:hover,
  .request-card:hover,
  .user-row:hover .avatar {
    transform: none;
  }
  .kpi-glow {
    animation: none;
  }
}
</style>
