<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 py-20 px-6">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          Contact
        </h1>
        <p class="text-xl text-neutral-600">Une question ? Une suggestion ? On vous écoute</p>
      </div>

      <!-- Content -->
      <div class="space-y-8">
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Nom
              </label>
              <input v-model="form.name" type="text" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Email
              </label>
              <input v-model="form.email" type="email" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Entreprise
              </label>
              <input v-model="form.company" type="text"
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Message
              </label>
              <textarea v-model="form.message" rows="6" required
                        class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 resize-none"></textarea>
            </div>

            <button type="submit" :disabled="submitted"
                    class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {{ submitted ? 'Message envoyé !' : 'Envoyer' }}
            </button>
          </form>
        </div>

        <!-- Contact info -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <div class="text-3xl mb-3">📧</div>
            <h3 class="font-bold text-neutral-900 mb-2">Email</h3>
            <a href="mailto:contact@moodflow.app" class="text-orange-600 hover:text-orange-700">
              contact@moodflow.app
            </a>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <div class="text-3xl mb-3">💬</div>
            <h3 class="font-bold text-neutral-900 mb-2">Support</h3>
            <p class="text-neutral-600">Réponse sous 24h</p>
          </div>
        </div>

        <!-- Back button -->
        <div class="text-center pt-8">
          <router-link to="/" 
                       class="inline-block px-8 py-4 bg-white/60 backdrop-blur-sm text-neutral-800 rounded-full font-semibold border border-neutral-200 hover:bg-white/80 transition-all duration-300">
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  company: '',
  message: ''
});

const submitted = ref(false);

const handleSubmit = () => {
  // Ici tu pourrais envoyer le formulaire à un backend
  console.log('Form submitted:', form.value);
  submitted.value = true;
  
  setTimeout(() => {
    submitted.value = false;
    form.value = { name: '', email: '', company: '', message: '' };
  }, 3000);
};
</script>

