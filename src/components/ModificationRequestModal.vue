<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
            <span class="text-2xl">📝</span>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Demande de Modification</h2>
            <p class="text-sm text-gray-600">Demandez un changement d'information</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitRequest" class="space-y-4">
          <!-- Type de demande -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Type de modification
            </label>
            <select
              v-model="requestType"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
            >
              <option value="">Sélectionnez un type</option>
              <option value="email_change">Changement d'email</option>
              <option value="service_change">Changement de département</option>
              <option value="display_name_change">Changement de nom d'affichage</option>
            </select>
          </div>

          <!-- Valeur actuelle -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Valeur actuelle
            </label>
            <input
              v-model="currentValue"
              type="text"
              required
              readonly
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <!-- Nouvelle valeur -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nouvelle valeur
            </label>
            <input
              v-model="requestedValue"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
              :placeholder="getPlaceholder()"
            />
          </div>

          <!-- Raison -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Raison de la demande
            </label>
            <textarea
              v-model="reason"
              required
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none"
              placeholder="Expliquez pourquoi vous souhaitez ce changement..."
            ></textarea>
          </div>

          <!-- Error message -->
          <div v-if="error" class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {{ error }}
          </div>

          <!-- Success message -->
          <div v-if="success" class="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
            {{ success }}
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition font-medium disabled:opacity-50"
            >
              {{ submitting ? 'Envoi...' : 'Envoyer la demande' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile, currentUser } from '../lib/auth';

const props = defineProps<{
  isOpen: boolean;
  type?: 'email_change' | 'service_change' | 'display_name_change';
}>();

const emit = defineEmits<{
  close: [];
  success: [];
}>();

const requestType = ref(props.type || '');
const currentValue = ref('');
const requestedValue = ref('');
const reason = ref('');
const submitting = ref(false);
const error = ref('');
const success = ref('');

// Computed pour la valeur actuelle
const currentProfileValue = computed(() => {
  if (!currentProfile.value) return '';
  
  switch (requestType.value) {
    case 'email_change':
      return currentUser.value?.email || '';
    case 'service_change':
      return currentProfile.value.service || '';
    case 'display_name_change':
      return currentProfile.value.display_name || '';
    default:
      return '';
  }
});

// Watch pour mettre à jour la valeur actuelle
watch(requestType, (newType) => {
  if (newType) {
    currentValue.value = currentProfileValue.value;
  }
});

// Watch pour la prop type
watch(() => props.type, (newType) => {
  if (newType) {
    requestType.value = newType;
    currentValue.value = currentProfileValue.value;
  }
});

function getPlaceholder() {
  switch (requestType.value) {
    case 'email_change':
      return 'nouveau.email@company.com';
    case 'service_change':
      return 'ex: Ingénierie, Ventes, RH';
    case 'display_name_change':
      return 'Votre nouveau nom d\'affichage';
    default:
      return '';
  }
}

async function submitRequest() {
  if (!currentProfile.value) {
    error.value = 'Profil non trouvé';
    return;
  }

  submitting.value = true;
  error.value = '';
  success.value = '';

  try {
    const { error: submitError } = await supabase
      .from('modification_requests')
      .insert({
        user_id: currentProfile.value.id,
        request_type: requestType.value,
        current_value: currentValue.value,
        requested_value: requestedValue.value,
        reason: reason.value
      });

    if (submitError) throw submitError;

    success.value = 'Demande envoyée avec succès !';
    
    setTimeout(() => {
      emit('success');
      closeModal();
    }, 2000);

  } catch (err) {
    console.error('Error submitting request:', err);
    error.value = 'Erreur lors de l\'envoi de la demande';
  } finally {
    submitting.value = false;
  }
}

function closeModal() {
  requestType.value = '';
  currentValue.value = '';
  requestedValue.value = '';
  reason.value = '';
  error.value = '';
  success.value = '';
  emit('close');
}
</script>
