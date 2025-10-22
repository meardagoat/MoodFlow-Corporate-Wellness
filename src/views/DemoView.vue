<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 mb-6">
            Demander une démo
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Découvrez MoodFlow en action avec notre équipe. 30 minutes qui changent tout.
          </p>
        </div>
      </div>
    </section>

    <!-- What you'll get -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Ce que vous obtiendrez
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Une démo personnalisée adaptée à votre entreprise et vos besoins spécifiques
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🎯
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Démo personnalisée</h3>
            <p class="text-neutral-600">Notre équipe vous montre exactement comment MoodFlow peut s'adapter à votre organisation et vos besoins spécifiques.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              ⚡
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Setup en 30 minutes</h3>
            <p class="text-neutral-600">On vous aide à démarrer en moins de 30 minutes, de A à Z. Configuration, formation, premiers pas... tout est inclus.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              💡
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Questions & Réponses</h3>
            <p class="text-neutral-600">Toutes vos questions techniques, sécurité, intégrations, RGPD... on répond à tout. Aucune question n'est bête.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🎁
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">30 jours d'essai gratuit</h3>
            <p class="text-neutral-600">Testez avec vos équipes pendant 30 jours, sans engagement. Si ça ne vous convient pas, on vous rembourse.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🤝
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Support dédié</h3>
            <p class="text-neutral-600">Un account manager dédié pour vous accompagner dans votre transformation et répondre à tous vos besoins.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🔒
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Sécurité garantie</h3>
            <p class="text-neutral-600">Découvrez nos mesures de sécurité et conformité RGPD pour protéger vos données et celles de vos équipes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Comment ça se passe
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Un processus simple et transparent pour découvrir MoodFlow
          </p>
        </div>
        
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-purple-500 rounded-full hidden lg:block"></div>
          
          <div class="space-y-12">
            <div v-for="(step, index) in timeline" :key="index" 
                 class="relative flex items-center"
                 :class="index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'">
              <!-- Timeline dot -->
              <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>
              
              <!-- Content -->
              <div class="w-full lg:w-1/2 p-6"
                   :class="index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'">
                <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                      {{ step.icon }}
                    </div>
                    <h3 class="font-bold text-neutral-900 text-xl">{{ step.title }}</h3>
                  </div>
                  <p class="text-neutral-700">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Form -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Réservez votre démo
          </h2>
          <p class="text-xl text-neutral-600">
            Remplissez le formulaire et on vous recontacte sous 24h
          </p>
        </div>
        
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-200">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Prénom
                </label>
                <input v-model="form.firstName" type="text" required
                       class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
              </div>
              <div>
                <label class="block text-sm font-semibold text-neutral-700 mb-2">
                  Nom
                </label>
                <input v-model="form.lastName" type="text" required
                       class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Email professionnel
              </label>
              <input v-model="form.email" type="email" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Entreprise
              </label>
              <input v-model="form.company" type="text" required
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Nombre d'employés
              </label>
              <select v-model="form.size" required
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                <option value="">Sélectionnez la taille de votre entreprise</option>
                <option value="1-50">1-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="201-1000">201-1000 employés</option>
                <option value="1000+">1000+ employés</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Téléphone (optionnel)
              </label>
              <input v-model="form.phone" type="tel"
                     class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Message (optionnel)
              </label>
              <textarea v-model="form.message" rows="4"
                        class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Dites-nous ce qui vous intéresse le plus..."></textarea>
            </div>

            <button type="submit" :disabled="submitted"
                    class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {{ submitted ? '🎉 Demande envoyée !' : 'Réserver ma démo gratuite' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Trust indicators -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Pourquoi nous faire confiance
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              ✓
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Garantie satisfait ou remboursé</h3>
            <p class="text-neutral-600">Si après 30 jours vous n'êtes pas convaincu, on vous rembourse intégralement. Aucun risque.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🔒
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Sécurité certifiée</h3>
            <p class="text-neutral-600">Conformité RGPD, chiffrement de bout en bout, hébergement européen. Vos données sont protégées.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              ⚡
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Support 24/7</h3>
            <p class="text-neutral-600">Notre équipe est là pour vous accompagner à tout moment. Réponse garantie sous 24h.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
          Prêt à voir MoodFlow en action ?
        </h2>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Rejoignez des milliers d'entreprises qui ont déjà transformé leur bien-être au travail
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="scrollToForm" 
                  class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl">
            Réserver ma démo
          </button>
          <router-link to="/pricing" 
                       class="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30">
            Voir les tarifs
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const submitted = ref(false);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  size: '',
  phone: '',
  message: ''
});

const timeline = [
  {
    icon: '📧',
    title: 'Vous remplissez le formulaire',
    description: 'Quelques informations sur votre entreprise et vos besoins. Simple et rapide.'
  },
  {
    icon: '📅',
    title: 'On planifie votre démo',
    description: 'Notre équipe vous recontacte sous 24h pour planifier un créneau qui vous convient.'
  },
  {
    icon: '🎬',
    title: 'Démo personnalisée (30 min)',
    description: 'Découverte de MoodFlow adaptée à votre contexte, avec exemples concrets et cas d\'usage.'
  },
  {
    icon: '🚀',
    title: 'Essai gratuit 30 jours',
    description: 'Vous testez MoodFlow avec vos équipes, accompagné par notre équipe de support.'
  },
  {
    icon: '✅',
    title: 'Décision éclairée',
    description: 'Vous décidez en toute connaissance de cause, avec toutes les informations nécessaires.'
  }
];

const handleSubmit = () => {
  console.log('Demo request:', form.value);
  submitted.value = true;
  
  setTimeout(() => {
    submitted.value = false;
    form.value = { 
      firstName: '', 
      lastName: '', 
      email: '', 
      company: '', 
      size: '', 
      phone: '', 
      message: '' 
    };
  }, 3000);
};

const scrollToForm = () => {
  const formElement = document.querySelector('form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>