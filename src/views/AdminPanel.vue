<template>
  <div class="min-h-screen">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <!-- En-tête Super Admin -->
      <header class="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div class="flex items-center gap-4 sm:gap-5">
          <span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-coral sm:h-16 sm:w-16">
            <Icon name="crown" class="h-7 w-7" />
          </span>
          <div>
            <h1 class="display text-display-md">Super Admin</h1>
            <p class="mt-1 text-ink/65">Gestion complète de l'organisation</p>
          </div>
        </div>

        <!-- Status Badge -->
        <div class="chip self-start sm:self-auto">
          <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          </span>
          System Admin
        </div>
      </header>

      <!-- Compteurs -->
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <section
          v-for="tile in statTiles"
          :key="tile.label"
          class="flex min-h-[9.5rem] flex-col rounded-[1.75rem] p-5 sm:min-h-[11rem] sm:p-6"
          :style="{ backgroundColor: tile.color }"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold">{{ tile.label }}</h2>
            <Icon :name="tile.icon" class="h-5 w-5" />
          </div>
          <p class="display mt-auto text-5xl leading-none tracking-[-0.05em]">{{ tile.value }}</p>
          <p class="mt-2 hidden text-xs text-ink/65 sm:block">{{ tile.caption }}</p>
        </section>
      </div>

      <!-- Créer un utilisateur -->
      <section class="mt-3 rounded-[2rem] border border-ink/10 bg-white p-5 sm:p-8">
        <div class="flex items-center gap-4">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun">
            <Icon name="user-plus" class="h-5 w-5" />
          </span>
          <div>
            <h2 class="display text-2xl tracking-[-0.04em] sm:text-3xl">Créer un utilisateur</h2>
            <p class="hidden text-ink/60 sm:block">Ajoutez des membres à votre organisation</p>
          </div>
        </div>

        <form @submit.prevent="createUserHandler" class="mt-8 space-y-6">
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label for="newEmail" class="field-label">
                Email
              </label>
              <input
                id="newEmail"
                v-model="newUser.email"
                type="email"
                required
                class="field"
                placeholder="nouvel.utilisateur@entreprise.com"
              />
            </div>

            <div>
              <label for="newPassword" class="field-label">
                Mot de passe temporaire
              </label>
              <input
                id="newPassword"
                v-model="newUser.password"
                type="password"
                required
                minlength="6"
                autocomplete="new-password"
                class="field"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label for="newService" class="field-label">
                Département
              </label>
              <input
                id="newService"
                v-model="newUser.service"
                type="text"
                required
                class="field"
                placeholder="ex: Ingénierie, Ventes, RH"
              />
            </div>

            <div>
              <label for="newRole" class="field-label">
                Rôle
              </label>
              <select
                id="newRole"
                v-model="newUser.role"
                required
                class="field"
              >
                <option value="employee">👤 Employé</option>
                <option value="manager">👔 Manager</option>
                <option v-if="isSystemAdmin" value="system_admin">👑 Super Admin</option>
              </select>
            </div>
          </div>

          <div v-if="createError" class="notice notice-error animate-shake" role="alert">
            {{ createError }}
          </div>

          <div v-if="createSuccess" class="notice notice-success" role="status">
            ✅ Utilisateur créé avec succès !
          </div>

          <button
            type="submit"
            :disabled="creating"
            class="btn btn-ink w-full md:w-auto"
          >
            <span v-if="creating" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {{ creating ? 'Création...' : 'Créer l\'utilisateur' }}
          </button>
        </form>
      </section>

      <!-- Demandes de modification -->
      <section class="mt-3 rounded-[2rem] border border-ink/10 bg-white p-5 sm:p-8">
        <div class="flex items-center gap-4">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lilac">
            <Icon name="pen" class="h-5 w-5" />
          </span>
          <div>
            <h2 class="display text-2xl tracking-[-0.04em] sm:text-3xl">Demandes</h2>
            <p class="hidden text-ink/60 sm:block">Traitez les demandes de changement d'informations</p>
          </div>
        </div>

        <!-- Stats des demandes -->
        <div class="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <div class="rounded-2xl bg-sun/35 p-3 sm:p-4">
            <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Icon name="hourglass" class="h-5 w-5" />
              <div>
                <p class="text-xs sm:text-sm">Attente</p>
                <p class="display text-2xl leading-none sm:text-3xl">{{ pendingRequests.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-[#D9F5E4] p-3 text-[#14532D] sm:p-4">
            <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Icon name="check" class="h-5 w-5" />
              <div>
                <p class="text-xs sm:text-sm">Validées</p>
                <p class="display text-2xl leading-none sm:text-3xl">{{ approvedRequests.length }}</p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-coral/20 p-3 text-[#9F1239] sm:p-4">
            <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Icon name="x" class="h-5 w-5" />
              <div>
                <p class="text-xs sm:text-sm">Rejetées</p>
                <p class="display text-2xl leading-none sm:text-3xl">{{ rejectedRequests.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Liste des demandes en attente -->
        <div v-if="pendingRequests.length > 0" class="mt-8 space-y-3">
          <h3 class="label text-ink/55">Demandes en attente</h3>
          <article v-for="request in pendingRequests" :key="request.id" class="rounded-[1.5rem] border border-ink/10 bg-paper p-4 sm:p-6">
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-full bg-sun px-3 py-1 text-sm font-semibold">
                {{ getRequestTypeLabel(request.request_type) }}
              </span>
              <span class="font-mono text-xs text-ink/55">{{ formatDate(request.created_at) }}</span>
            </div>
            <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p class="text-sm text-ink/55">Valeur actuelle:</p>
                <p class="font-medium">{{ request.current_value }}</p>
              </div>
              <div>
                <p class="text-sm text-ink/55">Nouvelle valeur demandée:</p>
                <p class="font-medium">{{ request.requested_value }}</p>
              </div>
            </div>
            <div class="mt-3">
              <p class="text-sm text-ink/55">Raison:</p>
              <p>{{ request.reason }}</p>
            </div>
            <div class="mt-3">
              <p class="text-sm text-ink/55">Demandeur:</p>
              <p class="font-medium">{{ request.user_email || 'Email non disponible' }}</p>
            </div>

            <!-- Actions -->
            <div class="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                @click="processRequest(request.id, 'approved')"
                class="btn btn-sm flex-1 bg-[#22C55E] text-ink hover:bg-ink hover:text-paper"
              >
                <Icon name="check" class="h-4 w-4" />
                <span class="hidden sm:inline">Approuver</span>
              </button>
              <button
                type="button"
                @click="processRequest(request.id, 'rejected')"
                class="btn btn-sm btn-danger flex-1"
              >
                <Icon name="x" class="h-4 w-4" />
                <span class="hidden sm:inline">Rejeter</span>
              </button>
              <button
                type="button"
                @click="showRequestDetails(request)"
                class="btn btn-sm btn-outline flex-1"
              >
                <Icon name="eye" class="h-4 w-4" />
                <span class="hidden sm:inline">Détails</span>
              </button>
            </div>
          </article>
        </div>

        <div v-else class="mt-8 flex flex-col items-center rounded-[1.5rem] bg-paper py-10 text-center">
          <MoodFace mood="very_happy" class="h-14 w-14" />
          <p class="mt-4 text-ink/65">Aucune demande en attente</p>
        </div>
      </section>

      <!-- Utilisateurs -->
      <section class="mt-3 overflow-hidden rounded-[2rem] border border-ink/10 bg-white">
        <div class="flex items-center gap-4 p-5 sm:p-8">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-aqua">
            <Icon name="users" class="h-5 w-5" />
          </span>
          <div>
            <h2 class="display text-2xl tracking-[-0.04em] sm:text-3xl">Utilisateurs</h2>
            <p class="hidden text-ink/60 sm:block">Gérez les rôles et permissions</p>
          </div>
        </div>

        <!-- Desktop Table -->
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full">
            <thead class="border-y border-ink/10 bg-paper/60">
              <tr>
                <th scope="col" class="label px-8 py-4 text-left text-ink/55">Utilisateur</th>
                <th scope="col" class="label px-4 py-4 text-left text-ink/55">Département</th>
                <th scope="col" class="label px-4 py-4 text-left text-ink/55">Rôle</th>
                <th scope="col" class="label px-4 py-4 text-left text-ink/55">Créé</th>
                <th scope="col" class="label px-4 py-4 text-left text-ink/55 pr-8">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-ink/[0.07]">
              <tr v-for="user in users" :key="user.id" class="transition-colors hover:bg-paper/70">
                <td class="whitespace-nowrap px-8 py-4">
                  <div class="flex items-center gap-3">
                    <span class="display grid h-10 w-10 place-items-center rounded-full bg-paper-deep text-sm">
                      {{ user.email?.charAt(0)?.toUpperCase() || 'U' }}
                    </span>
                    <div>
                      <div class="text-sm font-semibold">{{ user.email || 'No email' }}</div>
                      <div class="text-sm text-ink/55">{{ user.display_name || 'No display name' }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-4">
                  <span class="tag">
                    {{ user.service || 'No service' }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-4 py-4">
                  <span :class="getRoleBadgeClass(user.role)">
                    {{ getRoleLabel(user.role) }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-4 py-4 font-mono text-xs text-ink/55">
                  {{ user.created_at ? formatDate(user.created_at) : 'No date' }}
                </td>
                <td class="whitespace-nowrap px-4 py-4 pr-8">
                  <button
                    type="button"
                    @click="editUser(user)"
                    class="link text-sm font-semibold"
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="space-y-2 px-4 pb-4 md:hidden">
          <div v-for="user in users" :key="user.id" class="rounded-[1.5rem] bg-paper p-4">
            <div class="flex items-center gap-3">
              <span class="display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper-deep text-sm">
                {{ user.email?.charAt(0)?.toUpperCase() || 'U' }}
              </span>
              <div class="min-w-0">
                <div class="truncate text-sm font-semibold">{{ user.email || 'No email' }}</div>
                <div class="text-xs text-ink/55">{{ user.display_name || 'No name' }}</div>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <div>
                <p class="mb-1 text-xs text-ink/55">Département</p>
                <span class="tag">
                  {{ user.service || 'No service' }}
                </span>
              </div>
              <div>
                <p class="mb-1 text-xs text-ink/55">Rôle</p>
                <span :class="getRoleBadgeClass(user.role)">
                  {{ getRoleLabel(user.role) }}
                </span>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
              <span class="font-mono text-xs text-ink/55">{{ user.created_at ? formatDate(user.created_at) : 'No date' }}</span>
              <button
                type="button"
                @click="editUser(user)"
                class="btn btn-sm btn-ink"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../lib/supabase';
import { createUser } from '../lib/auth';
import { isSystemAdmin } from '../lib/auth';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';

const users = ref<any[]>([]);
const modificationRequests = ref<any[]>([]);
const stats = ref({
  totalUsers: 0,
  superAdmins: 0,
  managers: 0,
  employees: 0
});

const statTiles = computed<{ label: string; value: number; caption: string; icon: IconName; color: string }[]>(() => [
  { label: 'Total', value: stats.value.totalUsers, caption: 'Active members', icon: 'users', color: '#FED94E' },
  { label: 'Admins', value: stats.value.superAdmins, caption: 'System administrators', icon: 'crown', color: '#FA4D52' },
  { label: 'Managers', value: stats.value.managers, caption: 'Team leaders', icon: 'badge', color: '#FF8944' },
  { label: 'Employees', value: stats.value.employees, caption: 'Team members', icon: 'user', color: '#CDB8FF' },
]);

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
    case 'system_admin': return '👑 Super Admin';
    case 'manager': return '👔 Manager';
    case 'employee': return '👤 Employé';
    default: return role;
  }
}

function getRoleBadgeClass(role: string) {
  switch (role) {
    case 'system_admin': return 'inline-flex rounded-full bg-coral/20 px-3 py-1 text-xs font-semibold text-[#9F1239]';
    case 'manager': return 'inline-flex rounded-full bg-tangerine/25 px-3 py-1 text-xs font-semibold text-ink';
    case 'employee': return 'inline-flex rounded-full bg-lilac/60 px-3 py-1 text-xs font-semibold text-ink';
    default: return 'inline-flex rounded-full bg-ink/[0.06] px-3 py-1 text-xs font-semibold text-ink';
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
  alert(`Détails de la demande:\n\nType: ${getRequestTypeLabel(request.request_type)}\nValeur actuelle: ${request.current_value}\nNouvelle valeur: ${request.requested_value}\nRaison: ${request.reason}\nDemandeur: ${request.user_email}`);
}

// Get request type label
function getRequestTypeLabel(type: string) {
  switch (type) {
    case 'email_change': return 'Changement d\'email';
    case 'service_change': return 'Changement de département';
    case 'display_name_change': return 'Changement de nom';
    default: return type;
  }
}

onMounted(() => {
  loadUsers();
  loadModificationRequests();
});
</script>
