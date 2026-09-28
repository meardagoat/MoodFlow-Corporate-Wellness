<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-500 ease-out-expo"
      leave-active-class="transition duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="showGuide" class="modal-backdrop">
        <div
          class="modal-panel flex max-h-[94vh] flex-col overflow-hidden sm:max-w-3xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
        >
          <!-- Header -->
          <div class="relative overflow-hidden bg-grape px-5 pb-6 pt-5 text-paper sm:px-8 sm:pt-7">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3 sm:gap-4">
                <SunMark class="h-12 w-12 shrink-0 sm:h-14 sm:w-14" state="very_happy" :ray-colors="['#FED94E', '#FF5BBC']" :ray-count="16" :ray-width="7" />
                <div class="min-w-0">
                  <h2 id="onboarding-title" class="display text-2xl leading-tight tracking-[-0.04em] sm:text-3xl">Bienvenue sur MoodFlow !</h2>
                  <p class="text-sm text-paper/75 sm:text-base">Découvrons ensemble les fonctionnalités</p>
                </div>
              </div>
              <button
                type="button"
                @click="closeGuide"
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/10 transition-colors hover:bg-paper hover:text-ink"
                aria-label="Fermer"
              >
                <Icon name="x" class="h-5 w-5" />
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="mt-6">
              <div class="label mb-2 flex justify-between text-paper/70">
                <span>Étape {{ currentStep }} sur {{ totalSteps }}</span>
                <span>{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
              </div>
              <div
                class="h-1.5 w-full overflow-hidden rounded-full bg-paper/20"
                role="progressbar"
                :aria-valuenow="currentStep"
                aria-valuemin="1"
                :aria-valuemax="totalSteps"
              >
                <div
                  class="h-full rounded-full bg-sun transition-[width] duration-700 ease-out-expo"
                  :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Interactive Content -->
          <div class="flex-1 overflow-y-auto p-5 sm:p-8">
            <Transition name="page-fade" mode="out-in">
              <!-- Step 1: Mood Selection Interactive -->
              <div v-if="currentStep === 1" key="s1" class="space-y-6">
                <div>
                  <h3 class="display text-3xl tracking-[-0.04em]">Comment vous sentez-vous ?</h3>
                  <p class="mt-2 text-ink/65">Cliquez sur l'humeur qui vous correspond le mieux</p>
                </div>

                <div class="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3" role="radiogroup" aria-label="Comment vous sentez-vous ?">
                  <button
                    v-for="mood in interactiveMoods"
                    :key="mood.value"
                    type="button"
                    role="radio"
                    :aria-checked="selectedMood === mood.value"
                    @click="selectMood(mood.value)"
                    class="group flex flex-col items-center gap-2 rounded-3xl px-2 py-4 transition-[background-color,transform,box-shadow] duration-300 ease-out-expo sm:py-5"
                    :class="selectedMood === mood.value ? 'scale-[1.04] ring-2 ring-ink' : 'bg-ink/[0.04] hover:bg-ink/[0.08]'"
                    :style="selectedMood === mood.value ? { backgroundColor: moodColor(mood.value), color: moodOnColor(mood.value) } : undefined"
                  >
                    <MoodFace :mood="mood.value" class="h-12 w-12 transition-transform duration-500 ease-out-back group-hover:scale-110 sm:h-14 sm:w-14" :class="selectedMood === mood.value ? 'rounded-full ring-4 ring-paper' : ''" />
                    <span class="text-sm font-semibold">{{ mood.label }}</span>
                  </button>
                </div>

                <p v-if="selectedMood" class="text-ink/75">
                  Parfait ! Vous avez choisi : <span class="font-semibold text-ink">{{ getMoodLabel(selectedMood) }}</span>
                </p>
              </div>

              <!-- Step 2: Tag Selection Interactive -->
              <div v-else-if="currentStep === 2" key="s2" class="space-y-6">
                <div>
                  <h3 class="display text-3xl tracking-[-0.04em]">Qu'est-ce qui influence votre humeur ?</h3>
                  <p class="mt-2 text-ink/65">Sélectionnez les éléments qui vous concernent (optionnel)</p>
                </div>

                <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    v-for="tag in interactiveTags"
                    :key="tag.id"
                    type="button"
                    @click="toggleTag(tag.id)"
                    :aria-pressed="selectedTags.includes(tag.id)"
                    :class="[
                      'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors duration-300',
                      selectedTags.includes(tag.id)
                        ? 'bg-ink text-paper'
                        : 'bg-ink/[0.04] hover:bg-ink/[0.08]'
                    ]"
                  >
                    <Icon :name="tag.icon" class="h-5 w-5 shrink-0" />
                    <span class="flex-1 text-sm font-semibold">{{ tag.label }}</span>
                    <Icon v-if="selectedTags.includes(tag.id)" name="check" class="h-4 w-4 text-sun" stroke-width="2.5" />
                  </button>
                </div>

                <p v-if="selectedTags.length > 0" class="text-ink/75">Excellent ! Vous avez sélectionné {{ selectedTags.length }} élément(s)</p>
              </div>

              <!-- Step 3: Anonymous Toggle Interactive -->
              <div v-else-if="currentStep === 3" key="s3" class="space-y-6">
                <div>
                  <h3 class="display text-3xl tracking-[-0.04em]">Confidentialité</h3>
                  <p class="mt-2 text-ink/65">Choisissez comment vous souhaitez partager</p>
                </div>

                <div class="max-w-md">
                  <label class="flex cursor-pointer items-center justify-between gap-4 rounded-3xl bg-ink/[0.04] p-5">
                    <span class="flex min-w-0 items-center gap-3">
                      <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper">
                        <Icon name="mask" class="h-6 w-6" />
                      </span>
                      <span class="min-w-0">
                        <span class="block font-semibold">Poster anonymement</span>
                        <span class="block text-sm text-ink/60">Votre identité restera cachée</span>
                      </span>
                    </span>
                    <input v-model="isAnonymous" type="checkbox" class="peer sr-only">
                    <span class="switch" aria-hidden="true" />
                  </label>

                  <p class="mt-4 text-sm text-ink/70">
                    {{ isAnonymous ? 'Vos publications seront anonymes.' : 'Votre nom sera visible sur vos publications.' }}
                  </p>
                </div>
              </div>

              <!-- Step 4: Interaction Demo -->
              <div v-else key="s4" class="space-y-6">
                <div>
                  <h3 class="display text-3xl tracking-[-0.04em]">Interagissez avec l'équipe</h3>
                  <p class="mt-2 text-ink/65">Découvrez les fonctionnalités d'interaction</p>
                </div>

                <div class="rounded-[1.75rem] border border-ink/10 bg-white p-5">
                  <div class="flex items-center gap-4">
                    <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper-deep text-ink/60">
                      <Icon name="user" class="h-5 w-5" />
                    </span>
                    <div class="min-w-0 flex-1">
                      <p class="font-mono text-xs text-ink/50">Anonyme · il y a 2 h</p>
                      <p class="truncate">Super journée d'équipe !</p>
                    </div>
                  </div>

                  <div class="mt-4 flex items-center gap-2">
                    <button
                      type="button"
                      @click="demoReaction = !demoReaction"
                      :aria-pressed="demoReaction"
                      :class="[
                        'flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                        demoReaction ? 'bg-coral/15 text-coral' : 'bg-ink/[0.05] text-ink/60 hover:bg-coral/10 hover:text-coral'
                      ]"
                    >
                      <Icon name="heart" :class="['h-4 w-4', demoReaction ? 'fill-coral' : '']" />
                      <span>{{ demoReaction ? '1' : '0' }}</span>
                    </button>

                    <button type="button" class="flex items-center gap-2 rounded-full bg-ink/[0.05] px-3.5 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-lilac/50 hover:text-ink">
                      <Icon name="message" class="h-4 w-4" />
                      <span>Répondre</span>
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Navigation -->
          <div class="flex items-center justify-between gap-3 border-t border-ink/10 px-5 py-4 sm:px-8">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="previousStep"
              class="btn btn-ghost btn-sm"
            >
              <Icon name="arrow-left" class="h-4 w-4" />
              Précédent
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < totalSteps"
              type="button"
              @click="nextStep"
              :disabled="!canProceed"
              class="btn btn-ink"
            >
              {{ getNextButtonText() }}
              <span class="btn-dot"><Icon name="arrow-right" /></span>
            </button>
            <button
              v-else
              type="button"
              @click="completeGuide"
              class="btn btn-sun"
            >
              Commencer
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { currentProfile } from '../lib/auth';
import SunMark from './brand/SunMark.vue';
import MoodFace from './brand/MoodFace.vue';
import Icon, { type IconName } from './ui/Icon.vue';
import { moodColor, moodOnColor } from '../lib/moods';

const showGuide = ref(false);
const currentStep = ref(1);
const totalSteps = 4;

// Interactive data
const selectedMood = ref('');
const selectedTags = ref<string[]>([]);
const isAnonymous = ref(true);
const demoReaction = ref(false);

const interactiveMoods = [
  { value: 'very_happy', label: 'Radieux' },
  { value: 'happy', label: 'Bien' },
  { value: 'neutral', label: 'Correct' },
  { value: 'sad', label: 'Pas top' },
  { value: 'very_sad', label: 'Difficile' },
];

const interactiveTags: { id: string; icon: IconName; label: string }[] = [
  { id: 'workload', icon: 'clipboard', label: 'Charge de travail' },
  { id: 'team', icon: 'users', label: 'Esprit d\'équipe' },
  { id: 'work_life', icon: 'repeat', label: 'Équilibre pro/perso' },
  { id: 'management', icon: 'badge', label: 'Management' },
  { id: 'environment', icon: 'building', label: 'Environnement' },
  { id: 'growth', icon: 'trending', label: 'Évolution' },
];

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return selectedMood.value !== '';
    case 2: return true; // Tags are optional
    case 3: return true; // Anonymous toggle is always valid
    case 4: return true; // Demo step
    default: return false;
  }
});

// Vérifier si l'utilisateur a déjà vu le guide
function hasSeenGuide(): boolean {
  if (!currentProfile.value) return true; // Pas de profil = pas de guide

  const userId = currentProfile.value.id;
  const hasSeen = localStorage.getItem(`moodflow-onboarding-seen-${userId}`) === 'true';
  console.log('OnboardingGuide: Has seen guide for user', userId, '?', hasSeen);
  return hasSeen;
}

// Vérifier si l'utilisateur est un nouveau utilisateur (créé dans les dernières 24h)
function isNewUser(): boolean {
  if (!currentProfile.value) return false;

  const createdAt = new Date(currentProfile.value.created_at);
  const now = new Date();
  const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  console.log('OnboardingGuide: User created', hoursSinceCreation, 'hours ago');
  return hoursSinceCreation < 24; // Nouveau si créé dans les dernières 24h
}

// Marquer le guide comme vu
function markGuideAsSeen(): void {
  if (!currentProfile.value) return;

  const userId = currentProfile.value.id;
  localStorage.setItem(`moodflow-onboarding-seen-${userId}`, 'true');
  console.log('OnboardingGuide: Guide marked as seen for user', userId);
}

onMounted(() => {
  console.log('OnboardingGuide: Component mounted');
  console.log('OnboardingGuide: Current profile:', currentProfile.value);

  // Afficher le guide seulement si l'utilisateur est nouveau ET ne l'a pas encore vu
  if (currentProfile.value && isNewUser() && !hasSeenGuide()) {
    console.log('OnboardingGuide: Showing guide for new user');
    // Petit délai pour laisser l'interface se charger
    setTimeout(() => {
      showGuide.value = true;
    }, 1000); // Délai plus long pour une meilleure UX
  } else {
    console.log('OnboardingGuide: Not showing guide - not new user, already seen, or no profile');
  }

  // Bouton de debug pour forcer l'affichage (à supprimer en production)
  window.showOnboardingGuide = () => {
    console.log('OnboardingGuide: Forced display via debug function');
    showGuide.value = true;
  };

  // Fonction de debug pour simuler un nouvel utilisateur
  window.simulateNewUser = () => {
    if (currentProfile.value) {
      const userId = currentProfile.value.id;
      localStorage.removeItem(`moodflow-onboarding-seen-${userId}`);
      console.log('OnboardingGuide: Simulated new user - guide will show on next page load');
    }
  };

  // Fonction de debug pour réinitialiser le guide
  window.resetOnboardingGuide = () => {
    if (currentProfile.value) {
      const userId = currentProfile.value.id;
      localStorage.removeItem(`moodflow-onboarding-seen-${userId}`);
      console.log('OnboardingGuide: Reset guide for user', userId);
    }
  };
});

// Interactive functions
function selectMood(mood: string): void {
  selectedMood.value = mood;
}

function toggleTag(tagId: string): void {
  if (selectedTags.value.includes(tagId)) {
    selectedTags.value = selectedTags.value.filter(id => id !== tagId);
  } else {
    selectedTags.value.push(tagId);
  }
}

function getMoodLabel(mood: string): string {
  return interactiveMoods.find(m => m.value === mood)?.label || mood;
}

function getNextButtonText(): string {
  switch (currentStep.value) {
    case 1: return 'Continuer';
    case 2: return 'Suivant';
    case 3: return 'Découvrir';
    default: return 'Suivant';
  }
}

function nextStep(): void {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
}

function previousStep(): void {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function closeGuide(): void {
  showGuide.value = false;
  markGuideAsSeen();
}

function completeGuide(): void {
  // Animation de fermeture avec succès
  const successMessage = document.createElement('div');
  successMessage.className = 'fixed right-4 top-4 z-[80] animate-fade-up rounded-full bg-ink px-6 py-3 font-semibold text-paper shadow-lg';
  successMessage.innerHTML = '🎉 Bienvenue dans MoodFlow !';
  document.body.appendChild(successMessage);

  // Supprimer le message après 3 secondes
  setTimeout(() => {
    successMessage.remove();
  }, 3000);

  closeGuide();
  // Déclencher l'ouverture du modal de création de post
  window.dispatchEvent(new CustomEvent('open-post-modal'));
}
</script>
