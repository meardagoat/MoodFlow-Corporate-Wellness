<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out-expo"
      leave-active-class="transition duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal" @keydown.esc="closeModal">
        <div class="modal-panel sm:max-w-xl" role="dialog" aria-modal="true" aria-labelledby="modification-title" data-lenis-prevent>
          <!-- Barre supérieure -->
          <div class="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink/10 bg-paper/95 px-5 py-4 backdrop-blur sm:px-7">
            <p class="label flex items-center gap-2.5 text-ink/55">
              <span class="grid h-7 w-7 place-items-center rounded-full bg-sun text-ink"><Icon name="pen" class="h-3.5 w-3.5" /></span>
              Demande de modification
            </p>
            <button
              type="button"
              @click="closeModal"
              class="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-ink/[0.06]"
              aria-label="Fermer"
            >
              <Icon name="x" class="h-5 w-5" />
            </button>
          </div>

          <div class="p-5 sm:p-7">
            <h2 id="modification-title" class="display text-3xl tracking-[-0.04em] sm:text-[2.4rem]">
              Changer une <span class="accent text-grape">information</span>
            </h2>
            <p class="mt-3 text-pretty text-ink/65">
              Votre demande sera examinée par un administrateur. Vous serez informé·e dès qu'elle sera traitée.
            </p>

            <form @submit.prevent="submitRequest" class="mt-7 space-y-6">
              <!-- Type de demande -->
              <fieldset>
                <legend class="field-label">Que souhaitez-vous modifier&nbsp;?</legend>
                <div class="grid grid-cols-3 gap-2">
                  <label
                    v-for="opt in typeOptions"
                    :key="opt.value"
                    class="type-option relative cursor-pointer"
                  >
                    <input
                      v-model="requestType"
                      type="radio"
                      name="modification-type"
                      :value="opt.value"
                      required
                      class="peer sr-only"
                    />
                    <span
                      class="flex h-full flex-col items-start gap-3 rounded-3xl border border-ink/15 bg-white p-3 transition-[background-color,border-color,transform] duration-300 ease-out-back hover:-translate-y-0.5 hover:border-ink/35 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-4 peer-focus-visible:ring-grape/30 sm:p-4"
                    >
                      <span
                        class="grid h-9 w-9 place-items-center rounded-full transition-colors duration-300"
                        :class="requestType === opt.value ? 'bg-sun text-ink' : 'bg-ink/[0.06]'"
                      >
                        <Icon :name="opt.icon" class="h-4 w-4" />
                      </span>
                      <span class="text-sm font-semibold leading-tight">
                        <span class="sm:hidden">{{ opt.short }}</span>
                        <span class="hidden sm:inline">{{ opt.label }}</span>
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>

              <!-- Avant / après -->
              <div class="relative grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
                <div class="min-w-0">
                  <label for="modification-current" class="field-label">Valeur actuelle</label>
                  <input
                    id="modification-current"
                    v-model="currentValue"
                    type="text"
                    required
                    readonly
                    class="field cursor-not-allowed bg-paper-deep/60 text-ink/60"
                    :placeholder="requestType ? 'Non renseignée' : 'Choisissez un type'"
                  />
                </div>
                <span class="hidden h-[3.25rem] items-center justify-center sm:flex" aria-hidden="true">
                  <span class="grid h-9 w-9 place-items-center rounded-full bg-ink text-sun">
                    <Icon name="arrow-right" class="h-4 w-4" />
                  </span>
                </span>
                <div class="min-w-0">
                  <label for="modification-new" class="field-label">Nouvelle valeur</label>
                  <input
                    id="modification-new"
                    v-model="requestedValue"
                    :type="requestType === 'email_change' ? 'email' : 'text'"
                    required
                    class="field"
                    :placeholder="getPlaceholder()"
                  />
                </div>
              </div>

              <!-- Raison -->
              <div>
                <div class="flex items-baseline justify-between gap-4">
                  <label for="modification-reason" class="field-label">Raison de la demande</label>
                  <span class="mb-2 font-mono text-[11px] text-ink/40" aria-hidden="true">{{ reason.length }} car.</span>
                </div>
                <textarea
                  id="modification-reason"
                  v-model="reason"
                  required
                  rows="3"
                  class="field resize-none"
                  placeholder="Expliquez pourquoi vous souhaitez ce changement…"
                ></textarea>
              </div>

              <div v-if="error" class="notice notice-error" role="alert">
                {{ error }}
              </div>
              <div v-if="success" class="notice notice-success flex items-center gap-2" role="status">
                <Icon name="check" class="h-4 w-4 shrink-0" />
                {{ success }}
              </div>

              <!-- Actions -->
              <div class="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
                <button type="button" @click="closeModal" class="btn btn-outline flex-1">
                  Annuler
                </button>
                <button type="submit" :disabled="submitting" class="btn btn-ink flex-1">
                  <RollText :text="submitting ? 'Envoi…' : 'Envoyer la demande'" />
                  <span class="btn-dot"><Icon name="send" /></span>
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
import Icon, { type IconName } from './ui/Icon.vue';
import RollText from './ui/RollText.vue';

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

// Présélection du type à chaque ouverture
watch(() => props.isOpen, (open) => {
  if (open && props.type) {
    requestType.value = props.type;
    currentValue.value = currentProfileValue.value;
  }
});

const typeOptions: { value: 'email_change' | 'service_change' | 'display_name_change'; label: string; short: string; icon: IconName }[] = [
  { value: 'email_change', label: 'Adresse e-mail', short: 'E-mail', icon: 'mail' },
  { value: 'service_change', label: 'Service', short: 'Service', icon: 'building' },
  { value: 'display_name_change', label: "Nom d'affichage", short: 'Nom affiché', icon: 'user' },
];

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
      return 'ex. : Ingénierie, Ventes, RH';
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
