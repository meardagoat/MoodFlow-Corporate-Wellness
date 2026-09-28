<template>
  <div class="min-h-screen safe-top safe-bottom">
    <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <header class="mb-10">
        <h1 class="display text-display-md">Profile Settings</h1>
        <p class="mt-3 max-w-2xl text-lg text-ink/65">Manage your account, privacy preferences, and data settings</p>

        <!-- Profile benefits -->
        <ul class="mt-6 flex flex-wrap gap-2">
          <li class="chip">
            <span class="h-2.5 w-2.5 rounded-full bg-aqua" />
            Secure & Private
          </li>
          <li class="chip">
            <span class="h-2.5 w-2.5 rounded-full bg-sun" />
            Full Control
          </li>
          <li class="chip">
            <span class="h-2.5 w-2.5 rounded-full bg-grape" />
            GDPR Compliant
          </li>
        </ul>
      </header>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-[15rem_minmax(0,1fr)]">
        <!-- Onglets mobiles -->
        <div class="relative grid grid-cols-3 rounded-full bg-ink/[0.06] p-1.5 md:hidden" role="tablist" aria-label="Settings">
          <span
            class="absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-ink transition-transform duration-500 ease-out-expo"
            :style="{ transform: `translateX(${tabIndex * 100}%)` }"
            aria-hidden="true"
          />
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab.id"
            @click="activeTab = tab.id"
            class="relative z-10 rounded-full py-3 text-center text-sm font-semibold transition-colors duration-300"
            :class="activeTab === tab.id ? 'text-paper' : 'text-ink/65'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Navigation desktop -->
        <nav class="hidden md:block" aria-label="Settings">
          <div class="sticky top-24 overflow-hidden rounded-[2rem] bg-grape p-3 text-paper">
            <h2 class="display px-3 pb-3 pt-2 text-2xl tracking-[-0.04em]">Settings</h2>
            <div class="space-y-1">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                type="button"
                @click="activeTab = tab.id"
                :aria-current="activeTab === tab.id ? 'true' : undefined"
                class="flex w-full items-center gap-3 rounded-full px-3 py-2.5 text-left font-semibold transition-colors duration-300"
                :class="activeTab === tab.id ? 'bg-paper text-ink' : 'text-paper/80 hover:bg-paper/10 hover:text-paper'"
              >
                <span
                  class="grid h-8 w-8 place-items-center rounded-full"
                  :class="activeTab === tab.id ? 'bg-sun' : 'bg-paper/10'"
                >
                  <Icon :name="tab.icon" class="h-4 w-4" />
                </span>
                {{ tab.label }}
              </button>
            </div>
          </div>
        </nav>

        <!-- Contenu -->
        <div class="min-w-0">
          <Transition name="page-fade" mode="out-in">
            <!-- Account -->
            <section v-if="activeTab === 'account'" key="account" class="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8">
              <h2 class="display text-3xl tracking-[-0.04em]">Account Information</h2>

              <form @submit.prevent="updateProfileInfo" class="mt-8 space-y-6">
                <div>
                  <label for="email" class="field-label">
                    Email
                  </label>
                  <input
                    id="email"
                    :value="currentUser?.email"
                    type="email"
                    disabled
                    class="field"
                  />
                  <p class="mt-2 text-xs text-ink/50">Email cannot be changed</p>
                </div>

                <div class="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label for="display_name" class="field-label">
                      Display Name
                    </label>
                    <input
                      id="display_name"
                      v-model="displayName"
                      type="text"
                      class="field"
                      placeholder="Your name (optional)"
                    />
                  </div>

                  <div>
                    <label for="service" class="field-label">
                      Department
                    </label>
                    <input
                      id="service"
                      v-model="service"
                      type="text"
                      class="field"
                    />
                  </div>
                </div>

                <div>
                  <label for="role" class="field-label">
                    Role
                  </label>
                  <select
                    id="role"
                    v-model="role"
                    class="field"
                    :disabled="!isSystemAdmin"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option v-if="isSystemAdmin" value="system_admin">Super Admin</option>
                  </select>
                  <p v-if="!isSystemAdmin" class="mt-2 text-xs text-ink/50">
                    Seuls les Super Admins peuvent modifier les rôles
                  </p>
                </div>

                <div v-if="updateError" class="notice notice-error" role="alert">
                  {{ updateError }}
                </div>

                <div v-if="updateSuccess" class="notice notice-success" role="status">
                  Profile updated successfully!
                </div>

                <div class="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    :disabled="updating"
                    class="btn btn-ink flex-1"
                  >
                    <RollText :text="updating ? 'Updating...' : 'Update Profile'" />
                  </button>
                  <button
                    type="button"
                    @click="showModificationRequest = true"
                    class="btn btn-sun"
                  >
                    📝 Demande
                  </button>
                </div>
              </form>
            </section>

            <!-- Privacy -->
            <section v-else-if="activeTab === 'privacy'" key="privacy" class="space-y-3">
              <div class="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8">
                <h2 class="display text-3xl tracking-[-0.04em]">Privacy & GDPR</h2>

                <div class="mt-8">
                  <h3 class="font-semibold">Anonymous ID</h3>
                  <p class="mt-1 text-sm text-ink/65">
                    This unique identifier is used for anonymous posts and chats. It cannot be linked back to your account by other users.
                  </p>
                  <div class="mt-3 flex items-center gap-3 rounded-2xl bg-paper-deep/70 px-4 py-3">
                    <Icon name="mask" class="h-5 w-5 shrink-0 text-ink/50" />
                    <code class="break-all font-mono text-sm text-ink/80">{{ currentProfile?.anonymous_id }}</code>
                  </div>
                </div>

                <div class="mt-8 border-t border-ink/10 pt-8">
                  <h3 class="font-semibold">Data Management</h3>
                  <div class="mt-4 space-y-2">
                    <button
                      type="button"
                      @click="showExportModal = true"
                      class="group flex w-full items-center justify-between gap-4 rounded-2xl border border-ink/10 px-4 py-4 text-left transition-colors hover:border-ink/25 hover:bg-paper"
                    >
                      <span class="flex items-center gap-4">
                        <span class="grid h-10 w-10 place-items-center rounded-full bg-aqua">
                          <Icon name="download" class="h-5 w-5" />
                        </span>
                        <span>
                          <span class="block font-semibold">Export My Data</span>
                          <span class="block text-sm text-ink/60">Download all your data in JSON format</span>
                        </span>
                      </span>
                      <Icon name="arrow-right" class="h-5 w-5 text-ink/35 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      @click="showDeleteModal = true"
                      class="group flex w-full items-center justify-between gap-4 rounded-2xl border border-coral/30 px-4 py-4 text-left transition-colors hover:bg-coral/10"
                    >
                      <span class="flex items-center gap-4">
                        <span class="grid h-10 w-10 place-items-center rounded-full bg-coral">
                          <Icon name="trash" class="h-5 w-5" />
                        </span>
                        <span>
                          <span class="block font-semibold text-[#9F1239]">Delete My Account</span>
                          <span class="block text-sm text-[#9F1239]/75">Permanently delete your account and all data</span>
                        </span>
                      </span>
                      <Icon name="arrow-right" class="h-5 w-5 text-coral transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <div class="mt-8 border-t border-ink/10 pt-8">
                  <h3 class="font-semibold">Privacy Consents</h3>
                  <div class="mt-4 divide-y divide-ink/[0.07]">
                    <label for="analytics_consent" class="flex cursor-pointer items-center justify-between gap-6 py-4">
                      <span>
                        <span class="block font-medium">Analytics</span>
                        <span class="block text-sm text-ink/60">Allow us to collect anonymous usage data to improve our service</span>
                      </span>
                      <input
                        id="analytics_consent"
                        v-model="consents.analytics"
                        type="checkbox"
                        class="peer sr-only"
                        @change="updateConsents"
                      />
                      <span class="switch" aria-hidden="true" />
                    </label>

                    <label for="marketing_consent" class="flex cursor-pointer items-center justify-between gap-6 py-4">
                      <span>
                        <span class="block font-medium">Marketing</span>
                        <span class="block text-sm text-ink/60">Receive updates about new features and improvements</span>
                      </span>
                      <input
                        id="marketing_consent"
                        v-model="consents.marketing"
                        type="checkbox"
                        class="peer sr-only"
                        @change="updateConsents"
                      />
                      <span class="switch" aria-hidden="true" />
                    </label>

                    <label for="third_party_consent" class="flex cursor-pointer items-center justify-between gap-6 py-4">
                      <span>
                        <span class="block font-medium">Third-party Sharing</span>
                        <span class="block text-sm text-ink/60">Allow sharing anonymized data with trusted third parties</span>
                      </span>
                      <input
                        id="third_party_consent"
                        v-model="consents.thirdParty"
                        type="checkbox"
                        class="peer sr-only"
                        @change="updateConsents"
                      />
                      <span class="switch" aria-hidden="true" />
                    </label>
                  </div>

                  <div v-if="consentUpdateSuccess" class="notice notice-success mt-3" role="status">
                    Privacy preferences updated successfully!
                  </div>
                </div>
              </div>

              <div class="rounded-[2rem] bg-paper-deep/70 p-6 sm:p-8">
                <h3 class="font-semibold">Data Retention Policy</h3>
                <p class="mt-1 text-sm text-ink/65">
                  We store your data according to the following retention periods:
                </p>
                <ul class="mt-4 space-y-2 text-sm">
                  <li class="flex items-center gap-3"><span class="h-1.5 w-1.5 rounded-full bg-ink/40" />Profile information: As long as your account is active</li>
                  <li class="flex items-center gap-3"><span class="h-1.5 w-1.5 rounded-full bg-ink/40" />Posts and messages: 12 months from creation</li>
                  <li class="flex items-center gap-3"><span class="h-1.5 w-1.5 rounded-full bg-ink/40" />Usage logs: 30 days</li>
                </ul>
              </div>
            </section>

            <!-- GDPR -->
            <section v-else key="gdpr" class="space-y-3">
              <div class="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8">
                <h2 class="display text-3xl tracking-[-0.04em]">GDPR Rights</h2>

                <div class="mt-8">
                  <h3 class="font-semibold">Your Rights Under GDPR</h3>
                  <p class="mt-1 text-sm text-ink/65">
                    As a user, you have the following rights regarding your personal data:
                  </p>
                  <ol class="mt-4 grid gap-2 sm:grid-cols-2">
                    <li
                      v-for="(right, i) in gdprRights"
                      :key="right"
                      class="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 text-sm"
                    >
                      <span class="font-mono text-xs text-ink/45">{{ String(i + 1).padStart(2, '0') }}</span>
                      {{ right }}
                    </li>
                  </ol>
                </div>

                <div class="mt-8 border-t border-ink/10 pt-8">
                  <h3 class="font-semibold">Data Protection Officer</h3>
                  <p class="mt-1 text-sm text-ink/65">
                    If you have any questions about how we handle your data or would like to exercise your rights, please contact our Data Protection Officer at:
                  </p>
                  <a href="mailto:dpo@moodflow.com" class="link mt-3 inline-flex items-center gap-2 font-semibold">
                    <Icon name="mail" class="h-4 w-4" />
                    dpo@moodflow.com
                  </a>
                </div>
              </div>

              <div class="rounded-[2rem] bg-ink p-6 text-paper sm:p-8">
                <h3 class="font-semibold">Account Actions</h3>
                <div class="mt-5 flex flex-col gap-3 sm:flex-row">
                  <!-- Admin Panel Link for System Admins -->
                  <router-link
                    v-if="isSystemAdmin"
                    to="/admin"
                    class="btn btn-sun flex-1"
                  >
                    <Icon name="crown" class="h-4 w-4" />
                    Panneau d'Administration
                  </router-link>

                  <button
                    type="button"
                    @click="handleSignOut"
                    class="btn btn-outline-light flex-1"
                  >
                    <Icon name="logout" class="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </section>
          </Transition>
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
          v-if="showExportModal"
          class="modal-backdrop"
          @click.self="showExportModal = false"
        >
          <div class="modal-panel p-6 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="export-title">
            <span class="grid h-12 w-12 place-items-center rounded-full bg-aqua">
              <Icon name="download" class="h-5 w-5" />
            </span>
            <h3 id="export-title" class="display mt-6 text-3xl tracking-[-0.04em]">Export Your Data</h3>
            <p class="mt-3 text-ink/70">
              This will download all your data including profile information, posts, and chat messages in JSON format.
            </p>

            <div class="mt-8 flex gap-3">
              <button
                type="button"
                @click="showExportModal = false"
                class="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="exportData"
                :disabled="exporting"
                class="btn btn-ink flex-1"
              >
                {{ exporting ? 'Exporting...' : 'Export' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition duration-300 ease-out-expo"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDeleteModal"
          class="modal-backdrop"
          @click.self="showDeleteModal = false"
        >
          <div class="modal-panel p-6 sm:p-8" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
            <span class="grid h-12 w-12 place-items-center rounded-full bg-coral">
              <Icon name="trash" class="h-5 w-5" />
            </span>
            <h3 id="delete-title" class="display mt-6 text-3xl tracking-[-0.04em] text-[#9F1239]">Delete Account</h3>
            <p class="mt-3 text-ink/70">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <p class="mt-3 text-ink/70">
              All your data including posts and chat messages will be permanently deleted.
            </p>

            <div class="mt-8 flex gap-3">
              <button
                type="button"
                @click="showDeleteModal = false"
                class="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="deleteAccount"
                :disabled="deleting"
                class="btn btn-danger flex-1"
              >
                {{ deleting ? 'Deleting...' : 'Delete Account' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Modification Request Modal -->
    <ModificationRequestModal
      :is-open="showModificationRequest"
      @close="showModificationRequest = false"
      @success="handleRequestSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { currentUser, currentProfile, signOut, updateProfile, isSystemAdmin } from '../lib/auth';
import ModificationRequestModal from '../components/ModificationRequestModal.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';

const activeTab = ref('account');
const showModificationRequest = ref(false);

const tabs: { id: string; label: string; icon: IconName }[] = [
  { id: 'account', label: 'Account', icon: 'user' },
  { id: 'privacy', label: 'Privacy', icon: 'lock' },
  { id: 'gdpr', label: 'GDPR', icon: 'clipboard' },
];

const tabIndex = computed(() => Math.max(0, tabs.findIndex((t) => t.id === activeTab.value)));

const gdprRights = [
  'Right to access your personal data',
  'Right to rectification of inaccurate data',
  'Right to erasure ("right to be forgotten")',
  'Right to restriction of processing',
  'Right to data portability',
  'Right to object to processing',
];

const router = useRouter();

const displayName = ref('');
const service = ref('');
const role = ref<'employee' | 'manager' | 'system_admin'>('employee');
const updating = ref(false);
const updateError = ref('');
const updateSuccess = ref(false);
const showExportModal = ref(false);
const showDeleteModal = ref(false);
const exporting = ref(false);
const deleting = ref(false);
const consentUpdateSuccess = ref(false);

const consents = reactive({
  analytics: false,
  marketing: false,
  thirdParty: false
});

onMounted(() => {
  if (currentProfile.value) {
    displayName.value = currentProfile.value.display_name || '';
    service.value = currentProfile.value.service;
    role.value = currentProfile.value.role;

    // Charger les consentements existants
    if (currentProfile.value.consents) {
      consents.analytics = currentProfile.value.consents.analytics || false;
      consents.marketing = currentProfile.value.consents.marketing || false;
      consents.thirdParty = currentProfile.value.consents.thirdParty || false;
    }
  }
});

async function updateProfileInfo() {
  updating.value = true;
  updateError.value = '';
  updateSuccess.value = false;

  const { error } = await updateProfile({
    display_name: displayName.value || null,
    service: service.value,
    role: role.value,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    updateError.value = error.message;
  } else {
    updateSuccess.value = true;
    setTimeout(() => {
      updateSuccess.value = false;
    }, 3000);
  }

  updating.value = false;
}

async function updateConsents() {
  if (!currentProfile.value) return;

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        consents: consents,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentProfile.value.id);

    if (error) {
      console.error('Error updating consents:', error);
    } else {
      consentUpdateSuccess.value = true;
      setTimeout(() => {
        consentUpdateSuccess.value = false;
      }, 3000);
    }
  } catch (error) {
    console.error('Error updating consents:', error);
  }
}

async function exportData() {
  if (!currentProfile.value) return;

  exporting.value = true;

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', currentProfile.value.id);

  const { data: messages } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('sender_id', currentProfile.value.id);

  const exportData = {
    profile: currentProfile.value,
    posts: posts || [],
    messages: messages || [],
    exported_at: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `moodflow-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  exporting.value = false;
  showExportModal.value = false;
}

async function deleteAccount() {
  if (!currentUser.value) return;

  deleting.value = true;

  try {
    // Supprimer d'abord les données du profil
    await supabase
      .from('profiles')
      .delete()
      .eq('id', currentUser.value.id);

    // Supprimer le compte utilisateur via l'API client
    await supabase.auth.updateUser({
      data: { deleted: true }
    });

    await signOut();
    router.push('/login');
  } catch (error) {
    alert('Error deleting account. Please contact support.');
    deleting.value = false;
  }
}

async function handleSignOut() {
  await signOut();
  router.push('/login');
}

function handleRequestSuccess() {
  // Optionnel: recharger les données du profil
  console.log('Modification request submitted successfully');
}
</script>
