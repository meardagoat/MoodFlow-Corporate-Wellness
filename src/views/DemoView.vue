<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          Demander une démo
        </h1>
        <p class="text-xl text-neutral-600">Découvrez MoodFlow en action avec notre équipe</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Form -->
        <div class="bg-white rounded-3xl p-8 shadow-xl">
          <h2 class="text-2xl font-bold text-neutral-900 mb-6">Réservez votre démo personnalisée</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Nom complet</label>
              <input v-model="form.name" type="text" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Email professionnel</label>
              <input v-model="form.email" type="email" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Entreprise</label>
              <input v-model="form.company" type="text" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Nombre d'employés</label>
              <select v-model="form.size" required
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                <option value="">Sélectionnez</option>
                <option value="1-50">1-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Téléphone (optionnel)</label>
              <input v-model="form.phone" type="tel"
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <button type="submit" :disabled="submitted"
                    class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50">
              {{ submitted ? 'Demande envoyée !' : 'Réserver ma démo' }}
            </button>
          </form>
        </div>

        <!-- Benefits -->
        <div class="space-y-6">
          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <div class="text-4xl mb-3">🎯</div>
            <h3 class="font-bold text-neutral-900 text-xl mb-2">Démo personnalisée</h3>
            <p class="text-neutral-700">Notre équipe vous montre exactement comment MoodFlow peut s'adapter à votre organisation</p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <div class="text-4xl mb-3">⚡</div>
            <h3 class="font-bold text-neutral-900 text-xl mb-2">Setup rapide</h3>
            <p class="text-neutral-700">On vous aide à démarrer en moins de 30 minutes, de A à Z</p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <div class="text-4xl mb-3">💡</div>
            <h3 class="font-bold text-neutral-900 text-xl mb-2">Questions & Réponses</h3>
            <p class="text-neutral-700">Toutes vos questions techniques, sécurité, intégrations... on répond à tout</p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <div class="text-4xl mb-3">🎁</div>
            <h3 class="font-bold text-neutral-900 text-xl mb-2">Essai gratuit</h3>
            <p class="text-neutral-700">30 jours d'essai gratuit pour tester avec vos équipes, sans engagement</p>
          </div>
        </div>
      </div>

      <!-- Back button -->
      <div class="text-center">
        <router-link to="/" 
                     class="inline-block px-8 py-4 bg-white rounded-full font-semibold border border-neutral-200 hover:bg-neutral-50 transition-all duration-300">
          Retour à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  name: '',
  email: '',
  company: '',
  size: '',
  phone: ''
});

const submitted = ref(false);

const handleSubmit = () => {
  console.log('Demo request:', form.value);
  submitted.value = true;
  
  setTimeout(() => {
    submitted.value = false;
    form.value = { name: '', email: '', company: '', size: '', phone: '' };
  }, 3000);
};

const goToRegister = () => {
  router.push('/register');
};
</script>

