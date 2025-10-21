<template>
  <div class="min-h-screen gradient-bg-calm safe-top safe-bottom">
    <div class="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Panneau d'Administration</h1>
        <p class="text-gray-600">Gérez les utilisateurs et les permissions de votre organisation</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Utilisateurs</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Managers</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.managers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Employés</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.employees }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Create User Section -->
      <div class="bg-white rounded-xl shadow p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Créer un nouvel utilisateur</h2>
        
        <form @submit.prevent="createUser" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="newEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="newEmail"
                v-model="newUser.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="nouvel.utilisateur@entreprise.com"
              />
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe temporaire
              </label>
              <input
                id="newPassword"
                v-model="newUser.password"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label for="newService" class="block text-sm font-medium text-gray-700 mb-2">
                Département
              </label>
              <input
                id="newService"
                v-model="newUser.service"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="ex: Ingénierie, Ventes, RH"
              />
            </div>

            <div>
              <label for="newRole" class="block text-sm font-medium text-gray-700 mb-2">
                Rôle
              </label>
              <select
                id="newRole"
                v-model="newUser.role"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              >
                <option value="employee">Employé</option>
                <option value="manager">Manager</option>
                <option v-if="isSystemAdmin" value="system_admin">Super Admin</option>
              </select>
            </div>
          </div>

          <div v-if="createError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {{ createError }}
          </div>

          <div v-if="createSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Utilisateur créé avec succès !
          </div>

          <button
            type="submit"
            :disabled="creating"
            class="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ creating ? 'Création...' : 'Créer l\'utilisateur' }}
          </button>
        </form>
      </div>

      <!-- Users List -->
      <div class="bg-white rounded-xl shadow">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Utilisateurs</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.service }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getRoleBadgeClass(user.role)"
                  >
                    {{ getRoleLabel(user.role) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="editUser(user)"
                    class="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    v-if="user.id !== currentProfile?.id"
                    @click="deleteUser(user)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile, isSystemAdmin, createUser } from '../lib/auth';

const users = ref([]);
const loading = ref(true);
const creating = ref(false);
const createError = ref('');
const createSuccess = ref(false);

const newUser = ref({
  email: '',
  password: '',
  service: '',
  role: 'employee'
});

const stats = computed(() => {
  const total = users.value.length;
  const managers = users.value.filter(u => u.role === 'manager').length;
  const employees = users.value.filter(u => u.role === 'employee').length;
  
  return { totalUsers: total, managers, employees };
});

onMounted(async () => {
  await loadUsers();
});

async function loadUsers() {
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    users.value = data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error);
  } finally {
    loading.value = false;
  }
}

async function createUserHandler() {
  creating.value = true;
  createError.value = '';
  createSuccess.value = false;

  try {
    const { error } = await createUser(
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
      
      setTimeout(() => {
        createSuccess.value = false;
      }, 3000);
    }
  } catch (error) {
    createError.value = error.message;
  } finally {
    creating.value = false;
  }
}

function getRoleLabel(role: string): string {
  switch (role) {
    case 'system_admin': return 'Super Admin';
    case 'manager': return 'Manager';
    case 'employee': return 'Employé';
    default: return role;
  }
}

function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'system_admin': return 'bg-purple-100 text-purple-800';
    case 'manager': return 'bg-green-100 text-green-800';
    case 'employee': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR');
}

function editUser(user: any) {
  // TODO: Implémenter l'édition d'utilisateur
  console.log('Éditer utilisateur:', user);
}

function deleteUser(user: any) {
  // TODO: Implémenter la suppression d'utilisateur
  console.log('Supprimer utilisateur:', user);
}
</script>
