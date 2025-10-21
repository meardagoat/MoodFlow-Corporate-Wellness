<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-purple-50">
    <!-- Header Super Admin -->
    <div class="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Logo Super Admin -->
            <div class="w-16 h-16 rounded-3xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-200">
              <span class="text-3xl">👑</span>
            </div>
            <div>
              <h1 class="text-3xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient-flow">
                Super Admin Panel
              </h1>
              <p class="text-sm text-gray-600 mt-0.5">Gestion complète de l'organisation</p>
            </div>
          </div>
          
          <!-- Status Badge -->
          <div class="flex items-center gap-3">
            <div class="px-4 py-2 bg-red-100/50 rounded-2xl border border-red-200">
              <span class="text-sm font-semibold text-red-700">System Administrator</span>
            </div>
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <!-- Stats Cards Premium -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Total Users -->
        <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-red-100/50 p-6 hover:shadow-2xl transition-all group">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Users</h3>
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-2xl">👥</span>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900 mb-1">{{ stats.totalUsers }}</p>
          <p class="text-xs text-gray-500">Active members</p>
        </div>

        <!-- Super Admins -->
        <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-red-100/50 p-6 hover:shadow-2xl transition-all group">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Super Admins</h3>
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-2xl">👑</span>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900 mb-1">{{ stats.superAdmins }}</p>
          <p class="text-xs text-gray-500">System administrators</p>
        </div>

        <!-- Managers -->
        <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-orange-100/50 p-6 hover:shadow-2xl transition-all group">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Managers</h3>
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-2xl">👔</span>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900 mb-1">{{ stats.managers }}</p>
          <p class="text-xs text-gray-500">Team leaders</p>
        </div>

        <!-- Employees -->
        <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-purple-100/50 p-6 hover:shadow-2xl transition-all group">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Employees</h3>
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-2xl">👤</span>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900 mb-1">{{ stats.employees }}</p>
          <p class="text-xs text-gray-500">Team members</p>
        </div>
      </div>

      <!-- Create User Section Premium -->
      <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-red-100/50 p-8 mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
            <span class="text-2xl">➕</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Créer un nouvel utilisateur</h2>
            <p class="text-gray-600">Ajoutez des membres à votre organisation</p>
          </div>
        </div>
        
        <form @submit.prevent="createUserHandler" class="space-y-6">
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
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
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
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
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
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
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
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              >
                <option value="employee">👤 Employé</option>
                <option value="manager">👔 Manager</option>
                <option v-if="isSystemAdmin" value="system_admin">👑 Super Admin</option>
              </select>
            </div>
          </div>

          <div v-if="createError" class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake">
            {{ createError }}
          </div>

          <div v-if="createSuccess" class="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            ✅ Utilisateur créé avec succès !
          </div>

          <button
            type="submit"
            :disabled="creating"
            class="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span v-if="creating" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              {{ creating ? 'Création...' : 'Créer l\'utilisateur' }}
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>

      <!-- Users Management Table Premium -->
      <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl shadow-red-100/50 overflow-hidden">
        <div class="p-6 border-b border-white/20">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span class="text-2xl">👥</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
              <p class="text-gray-600">Gérez les rôles et permissions</p>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200/50">
              <tr v-for="user in users" :key="user.id" class="hover:bg-white/40 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mr-3">
                      <span class="text-sm font-bold text-gray-600">{{ user.email?.charAt(0)?.toUpperCase() || 'U' }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ user.email || 'No email' }}</div>
                      <div class="text-sm text-gray-500">{{ user.display_name || 'No display name' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                    {{ user.service || 'No service' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRoleBadgeClass(user.role)">
                    {{ getRoleLabel(user.role) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.created_at ? formatDate(user.created_at) : 'No date' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="editUser(user)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                  >
                    Modifier
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
import { createUser } from '../lib/auth';
import { isSystemAdmin } from '../lib/auth';

const users = ref<any[]>([]);
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
    createError.value = 'Une erreur est survenue lors de la création de l\'utilisateur';
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
    case 'system_admin': return 'px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full';
    case 'manager': return 'px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full';
    case 'employee': return 'px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full';
    default: return 'px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full';
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

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-flow {
  background-size: 200% 200%;
  animation: gradient-flow 3s ease infinite;
}
</style>