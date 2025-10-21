<template>
  <div class="min-h-screen gradient-bg-calm safe-top safe-bottom">
    <div class="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p class="text-gray-600">Manage your account and privacy preferences</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Sidebar - Mobile Tabs -->
        <div class="md:hidden flex border-b border-gray-200 mb-6">
          <button
            @click="activeTab = 'account'"
            :class="[
              'flex-1 py-3 text-center border-b-2 transition',
              activeTab === 'account' ? 'border-primary-600 text-primary-700 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Account
          </button>
          <button
            @click="activeTab = 'privacy'"
            :class="[
              'flex-1 py-3 text-center border-b-2 transition',
              activeTab === 'privacy' ? 'border-primary-600 text-primary-700 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            Privacy
          </button>
          <button
            @click="activeTab = 'gdpr'"
            :class="[
              'flex-1 py-3 text-center border-b-2 transition',
              activeTab === 'gdpr' ? 'border-primary-600 text-primary-700 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            GDPR
          </button>
        </div>
        
        <!-- Sidebar - Desktop -->
        <div class="hidden md:block md:col-span-1">
          <div class="bg-white rounded-xl shadow overflow-hidden sticky top-8">
            <div class="p-4 bg-primary-600 text-white">
              <h2 class="font-semibold">Settings</h2>
            </div>
            <div class="p-2">
              <button
                @click="activeTab = 'account'"
                :class="[
                  'w-full text-left px-4 py-2 rounded-lg transition',
                  activeTab === 'account' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                ]"
              >
                Account
              </button>
              <button
                @click="activeTab = 'privacy'"
                :class="[
                  'w-full text-left px-4 py-2 rounded-lg transition',
                  activeTab === 'privacy' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                ]"
              >
                Privacy
              </button>
              <button
                @click="activeTab = 'gdpr'"
                :class="[
                  'w-full text-left px-4 py-2 rounded-lg transition',
                  activeTab === 'gdpr' ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                ]"
              >
                GDPR
              </button>
            </div>
          </div>
        </div>
        <!-- Content -->
        <div class="md:col-span-2">
          <div v-if="activeTab === 'account'" class="bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>

          <form @submit.prevent="updateProfileInfo" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                :value="currentUser?.email"
                type="email"
                disabled
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label for="display_name" class="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                id="display_name"
                v-model="displayName"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Your name (optional)"
              />
            </div>

            <div>
              <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                id="service"
                v-model="service"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                v-model="role"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                :disabled="!isSystemAdmin"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option v-if="isSystemAdmin" value="system_admin">Super Admin</option>
              </select>
              <p v-if="!isSystemAdmin" class="text-xs text-gray-500 mt-1">
                Seuls les Super Admins peuvent modifier les rôles
              </p>
            </div>

            <div v-if="updateError" class="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
              {{ updateError }}
            </div>

            <div v-if="updateSuccess" class="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg text-sm">
              Profile updated successfully!
            </div>

            <button
              type="submit"
              :disabled="updating"
              class="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ updating ? 'Updating...' : 'Update Profile' }}
            </button>
          </form>
        </div>

        <div v-if="activeTab === 'privacy'" class="bg-white rounded-xl shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Privacy & GDPR</h2>

          <div class="space-y-6">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Anonymous ID</h3>
              <p class="text-sm text-gray-600 mb-3">
                This unique identifier is used for anonymous posts and chats. It cannot be linked back to your account by other users.
              </p>
              <div class="bg-gray-50 px-4 py-3 rounded-lg font-mono text-sm text-gray-700 break-all">
                {{ currentProfile?.anonymous_id }}
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6">
              <h3 class="font-medium text-gray-900 mb-4">Data Management</h3>
              <div class="space-y-3">
                <button
                  @click="showExportModal = true"
                  class="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-left flex items-center justify-between"
                >
                  <div>
                    <p class="font-medium">Export My Data</p>
                    <p class="text-sm text-gray-500">Download all your data in JSON format</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>

                <button
                  @click="showDeleteModal = true"
                  class="w-full px-4 py-3 border border-error-300 text-error-700 rounded-lg hover:bg-error-50 transition text-left flex items-center justify-between"
                >
                  <div>
                    <p class="font-medium">Delete My Account</p>
                    <p class="text-sm text-error-600">Permanently delete your account and all data</p>
                  </div>
                  <svg class="w-5 h-5 text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <h3 class="font-medium text-gray-900 mb-4">Privacy Consents</h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="analytics_consent"
                      v-model="consents.analytics"
                      type="checkbox"
                      class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      @change="updateConsents"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="analytics_consent" class="font-medium text-gray-700">Analytics</label>
                    <p class="text-gray-500">Allow us to collect anonymous usage data to improve our service</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="marketing_consent"
                      v-model="consents.marketing"
                      type="checkbox"
                      class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      @change="updateConsents"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="marketing_consent" class="font-medium text-gray-700">Marketing</label>
                    <p class="text-gray-500">Receive updates about new features and improvements</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="third_party_consent"
                      v-model="consents.thirdParty"
                      type="checkbox"
                      class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      @change="updateConsents"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="third_party_consent" class="font-medium text-gray-700">Third-party Sharing</label>
                    <p class="text-gray-500">Allow sharing anonymized data with trusted third parties</p>
                  </div>
                </div>
                
                <div v-if="consentUpdateSuccess" class="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg text-sm">
                  Privacy preferences updated successfully!
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <h3 class="font-medium text-gray-900 mb-4">Data Retention Policy</h3>
              <p class="text-sm text-gray-600 mb-4">
                We store your data according to the following retention periods:
              </p>
              <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>Profile information: As long as your account is active</li>
                <li>Posts and messages: 12 months from creation</li>
                <li>Usage logs: 30 days</li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'gdpr'" class="bg-white rounded-xl shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">GDPR Rights</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Your Rights Under GDPR</h3>
              <p class="text-sm text-gray-600 mb-3">
                As a user, you have the following rights regarding your personal data:
              </p>
              <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restriction of processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <h3 class="font-medium text-gray-900 mb-4">Data Protection Officer</h3>
              <p class="text-sm text-gray-600">
                If you have any questions about how we handle your data or would like to exercise your rights, please contact our Data Protection Officer at:
              </p>
              <p class="text-sm font-medium mt-2">dpo@moodflow.com</p>
            </div>
            
            <div class="border-t border-gray-200 pt-6">
              <h3 class="font-medium text-gray-900 mb-4">Account Actions</h3>
              
              <!-- Admin Panel Link for System Admins -->
              <div v-if="isSystemAdmin" class="mb-4">
                <router-link
                  to="/admin"
                  class="w-full px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Panneau d'Administration
                </router-link>
              </div>
              
              <button
                @click="handleSignOut"
                class="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showExportModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showExportModal = false"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Export Your Data</h3>
        <p class="text-gray-600 mb-6">
          This will download all your data including profile information, posts, and chat messages in JSON format.
        </p>

        <div class="flex gap-3">
          <button
            @click="showExportModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="exportData"
            :disabled="exporting"
            class="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {{ exporting ? 'Exporting...' : 'Export' }}
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
        <h3 class="text-xl font-semibold text-error-700 mb-4">Delete Account</h3>
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <p class="text-gray-600 mb-6">
          All your data including posts and chat messages will be permanently deleted.
        </p>

        <div class="flex gap-3">
          <button
            @click="showDeleteModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="deleteAccount"
            :disabled="deleting"
            class="flex-1 px-4 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 transition disabled:opacity-50"
          >
            {{ deleting ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { currentUser, currentProfile, signOut, updateProfile, isSystemAdmin, isManager } from '../lib/auth';

const activeTab = ref('account');

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
</script>
