<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out-expo"
      leave-active-class="transition duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modification-title">
          <div class="p-6 sm:p-8">
            <!-- Header -->
            <div class="flex items-center gap-4">
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun">
                <Icon name="pen" class="h-5 w-5" />
              </span>
              <div>
                <h2 id="modification-title" class="display text-2xl tracking-[-0.04em]">Demande de Modification</h2>
                <p class="text-sm text-ink/60">Demandez un changement d'information</p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitRequest" class="mt-8 space-y-5">
              <!-- Type de demande -->
              <div>
                <label for="modification-type" class="field-label">
                  Type de modification
                </label>
                <select
                  id="modification-type"
                  v-model="requestType"
                  required
                  class="field"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="email_change">Changement d'email</option>
                  <option value="service_change">Changement de département</option>
                  <option value="display_name_change">Changement de nom d'affichage</option>
                </select>
              </div>

              <!-- Valeur actuelle -->
              <div>
                <label for="modification-current" class="field-label">
                  Valeur actuelle
                </label>
                <input
                  id="modification-current"
                  v-model="currentValue"
                  type="text"
                  required
                  readonly
                  class="field cursor-not-allowed bg-paper-deep/60 text-ink/60"
                />
              </div>

              <!-- Nouvelle valeur -->
              <div>
                <label for="modification-new" class="field-label">
                  Nouvelle valeur
                </label>
                <input
                  id="modification-new"
                  v-model="requestedValue"
                  type="text"
                  required
                  class="field"
                  :placeholder="getPlaceholder()"
                />
              </div>

              <!-- Raison -->
              <div>
                <label for="modification-reason" class="field-label">
                  Raison de la demande
                </label>
                <textarea
                  id="modification-reason"
                  v-model="reason"
                  required
                  rows="3"
                  class="field resize-none"
                  placeholder="Expliquez pourquoi vous souhaitez ce changement..."
                ></textarea>
              </div>

              <!-- Error message -->
              <div v-if="error" class="notice notice-error" role="alert">
                {{ error }}
              </div>

              <!-- Success message -->
              <div v-if="success" class="notice notice-success" role="status">
                {{ success }}
              </div>

              <!-- Actions -->
              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  @click="closeModal"
                  class="btn btn-outline flex-1"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn btn-ink flex-1"
                >
                  {{ submitting ? 'Envoi...' : 'Envoyer la demande' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { supabase } from '../lib/supabase';
import { currentProfile, currentUser } from '../lib/auth';
import Icon from './ui/Icon.vue';

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
