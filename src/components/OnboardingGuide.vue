<template>
  <div v-if="showGuide" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
    <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-4 animate-slideUp">
      <!-- Header -->
      <div class="bg-gradient-to-r from-orange-500 to-purple-500 px-3 sm:px-6 py-3 sm:py-4 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span class="text-lg sm:text-2xl">🚀</span>
            </div>
            <div>
              <h2 class="text-lg sm:text-2xl font-bold">Bienvenue sur MoodFlow !</h2>
              <p class="text-orange-100 text-sm sm:text-base">Découvrons ensemble les fonctionnalités</p>
            </div>
          </div>
          <button
            @click="closeGuide"
            class="p-1 sm:p-2 hover:bg-white/20 rounded-full transition"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div class="mt-3 sm:mt-4">
          <div class="flex justify-between text-xs sm:text-sm mb-2">
            <span>Étape {{ currentStep }} sur {{ totalSteps }}</span>
            <span>{{ Math.round((currentStep / totalSteps) * 100) }}%</span>
          </div>
          <div class="w-full bg-white/20 rounded-full h-1.5 sm:h-2">
            <div 
              class="bg-white h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Interactive Content -->
      <div class="p-3 sm:p-6">
        <!-- Step 1: Mood Selection Interactive -->
        <div v-if="currentStep === 1" class="space-y-4 sm:space-y-6">
          <div class="text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Comment vous sentez-vous ?</h3>
            <p class="text-gray-600 text-sm sm:text-base">Cliquez sur l'humeur qui vous correspond le mieux</p>
          </div>
          
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
            <button
              v-for="(mood, index) in interactiveMoods"
              :key="mood.value"
              @click="selectMood(mood.value)"
              :class="[
                'p-3 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105',
                selectedMood === mood.value
                  ? 'bg-gradient-to-br from-orange-500 to-purple-500 text-white shadow-xl scale-105'
                  : 'bg-gray-100 hover:bg-gray-200'
              ]"
            >
              <div class="text-2xl sm:text-4xl mb-1 sm:mb-2">{{ mood.emoji }}</div>
              <div class="text-xs sm:text-sm font-semibold">{{ mood.label }}</div>
            </button>
          </div>
          
          <div v-if="selectedMood" class="text-center">
            <p class="text-sm sm:text-lg text-gray-700">Parfait ! Vous avez choisi : <span class="font-bold">{{ getMoodLabel(selectedMood) }}</span></p>
          </div>
        </div>

        <!-- Step 2: Tag Selection Interactive -->
        <div v-if="currentStep === 2" class="space-y-4 sm:space-y-6">
          <div class="text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Qu'est-ce qui influence votre humeur ?</h3>
            <p class="text-gray-600 text-sm sm:text-base">Sélectionnez les éléments qui vous concernent (optionnel)</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button
              v-for="tag in interactiveTags"
              :key="tag.id"
              @click="toggleTag(tag.id)"
              :class="[
                'p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105',
                selectedTags.includes(tag.id)
                  ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              <div class="text-xl sm:text-2xl mb-1 sm:mb-2">{{ tag.emoji }}</div>
              <div class="text-xs sm:text-sm font-semibold">{{ tag.label }}</div>
            </button>
          </div>
          
          <div v-if="selectedTags.length > 0" class="text-center">
            <p class="text-sm sm:text-lg text-gray-700">Excellent ! Vous avez sélectionné {{ selectedTags.length }} élément(s)</p>
          </div>
        </div>

        <!-- Step 3: Anonymous Toggle Interactive -->
        <div v-if="currentStep === 3" class="space-y-4 sm:space-y-6">
          <div class="text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Confidentialité</h3>
            <p class="text-gray-600 text-sm sm:text-base">Choisissez comment vous souhaitez partager</p>
          </div>
          
          <div class="max-w-md mx-auto">
            <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div class="flex items-center justify-between mb-3 sm:mb-4">
                <div class="flex items-center gap-2 sm:gap-3">
                  <span class="text-2xl sm:text-3xl">🕶️</span>
                  <div>
                    <h4 class="font-semibold text-gray-900 text-sm sm:text-base">Poster anonymement</h4>
                    <p class="text-xs sm:text-sm text-gray-600">Votre identité restera cachée</p>
                  </div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="isAnonymous" type="checkbox" class="sr-only peer">
                  <div class="w-12 h-6 sm:w-14 sm:h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-purple-500"></div>
                </label>
              </div>
              
              <div class="text-center">
                <p class="text-xs sm:text-sm text-gray-600">
                  {{ isAnonymous ? '✅ Vos posts seront anonymes' : '⚠️ Vos posts seront publics' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Interaction Demo -->
        <div v-if="currentStep === 4" class="space-y-4 sm:space-y-6">
          <div class="text-center">
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Interagissez avec l'équipe</h3>
            <p class="text-gray-600 text-sm sm:text-base">Découvrez les fonctionnalités d'interaction</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-sm sm:text-lg">👤</span>
              </div>
              <div class="flex-1">
                <p class="text-xs sm:text-sm text-gray-600">Anonymous • il y a 2h</p>
                <p class="text-gray-900 text-sm sm:text-base">Super journée d'équipe ! 🎉</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3 sm:gap-6">
              <button 
                @click="demoReaction = !demoReaction"
                :class="[
                  'flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all',
                  demoReaction ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                <span class="text-sm sm:text-lg">{{ demoReaction ? '❤️' : '🤍' }}</span>
                <span class="text-xs sm:text-sm font-medium">{{ demoReaction ? '1' : '0' }}</span>
              </button>
              
              <button class="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition">
                <span class="text-sm sm:text-lg">💬</span>
                <span class="text-xs sm:text-sm font-medium">Répondre</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between pt-4 sm:pt-6 border-t border-gray-200">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-200 transition text-sm sm:text-base"
          >
            ← Précédent
          </button>
          <div v-else></div>
          
          <div class="flex gap-2 sm:gap-3">
            <button
              v-if="currentStep < totalSteps"
              @click="nextStep"
              :disabled="!canProceed"
              class="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {{ getNextButtonText() }} →
            </button>
            <button
              v-else
              @click="completeGuide"
              class="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition text-sm sm:text-base"
            >
              🎉 Commencer à utiliser MoodFlow
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { currentProfile } from '../lib/auth';

const showGuide = ref(false);
const currentStep = ref(1);
const totalSteps = 4;

// Interactive data
const selectedMood = ref('');
const selectedTags = ref<string[]>([]);
const isAnonymous = ref(true);
const demoReaction = ref(false);

const interactiveMoods = [
  { value: 'very_happy', emoji: '😄', label: 'Great' },
  { value: 'happy', emoji: '😊', label: 'Good' },
  { value: 'neutral', emoji: '😐', label: 'Okay' },
  { value: 'sad', emoji: '😟', label: 'Bad' },
  { value: 'very_sad', emoji: '😢', label: 'Awful' },
];

const interactiveTags = [
  { id: 'workload', emoji: '💼', label: 'Workload' },
  { id: 'team', emoji: '👥', label: 'Team Spirit' },
  { id: 'work_life', emoji: '⚖️', label: 'Work-Life Balance' },
  { id: 'management', emoji: '👔', label: 'Management' },
  { id: 'environment', emoji: '🏢', label: 'Environment' },
  { id: 'growth', emoji: '📈', label: 'Growth' },
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
  successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideInRight';
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

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.5s ease-out;
}

/* Amélioration des transitions pour les boutons */
button {
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.98);
}

/* Amélioration du focus pour l'accessibilité */
button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

/* Amélioration du toggle switch */
input[type="checkbox"]:focus + div {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.3);
}
</style>
