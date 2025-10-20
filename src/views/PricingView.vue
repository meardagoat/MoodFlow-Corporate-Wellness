<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          Tarifs simples et transparents
        </h1>
        <p class="text-xl text-neutral-600">Choisissez l'offre qui correspond à votre entreprise</p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <!-- Starter -->
        <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-neutral-900 mb-2">Starter</h3>
            <p class="text-neutral-600">Pour les petites équipes</p>
          </div>
          
          <div class="mb-8">
            <span class="text-5xl font-bold text-neutral-900">Gratuit</span>
          </div>
          
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Jusqu'à 50 employés</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Suivi des humeurs</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Dashboard basique</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Chat anonyme</span>
            </li>
          </ul>
          
          <button @click="goToRegister" 
                  class="w-full px-6 py-3 bg-neutral-100 text-neutral-900 rounded-full font-semibold hover:bg-neutral-200 transition-colors">
            Commencer
          </button>
        </div>

        <!-- Pro (Featured) -->
        <div class="bg-gradient-to-br from-orange-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-neutral-900 px-4 py-1 rounded-full text-sm font-bold">
            Populaire
          </div>
          
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-white mb-2">Pro</h3>
            <p class="text-white/80">Pour les entreprises en croissance</p>
          </div>
          
          <div class="mb-8">
            <span class="text-5xl font-bold text-white">49€</span>
            <span class="text-white/80">/mois</span>
          </div>
          
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3">
              <span class="text-white text-xl">✓</span>
              <span class="text-white">Jusqu'à 500 employés</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-white text-xl">✓</span>
              <span class="text-white">Analytics avancées</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-white text-xl">✓</span>
              <span class="text-white">Export de données</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-white text-xl">✓</span>
              <span class="text-white">Support prioritaire</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-white text-xl">✓</span>
              <span class="text-white">Intégrations (Slack, Teams)</span>
            </li>
          </ul>
          
          <button @click="goToRegister" 
                  class="w-full px-6 py-3 bg-white text-orange-600 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
            Démarrer l'essai
          </button>
        </div>

        <!-- Enterprise -->
        <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="mb-6">
            <h3 class="text-2xl font-bold text-neutral-900 mb-2">Enterprise</h3>
            <p class="text-neutral-600">Pour les grandes organisations</p>
          </div>
          
          <div class="mb-8">
            <span class="text-5xl font-bold text-neutral-900">Sur mesure</span>
          </div>
          
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Employés illimités</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">API complète</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">SSO / SAML</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Support dédié 24/7</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-neutral-700">Hébergement privé possible</span>
            </li>
          </ul>
          
          <router-link to="/contact" 
                       class="block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform text-center">
            Nous contacter
          </router-link>
        </div>
      </div>

      <!-- FAQ -->
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-neutral-900 text-center mb-12">Questions fréquentes</h2>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-2xl p-6 shadow-md">
            <h3 class="font-bold text-neutral-900 mb-2">{{ faq.question }}</h3>
            <p class="text-neutral-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <!-- Back button -->
      <div class="text-center pt-16">
        <router-link to="/" 
                     class="inline-block px-8 py-4 bg-white rounded-full font-semibold border border-neutral-200 hover:bg-neutral-50 transition-all duration-300">
          Retour à l'accueil
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const faqs = [
  {
    question: "Puis-je essayer MoodFlow gratuitement ?",
    answer: "Oui ! L'offre Starter est gratuite à vie pour jusqu'à 50 employés. Pas besoin de carte bancaire."
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer: "On facture mensuellement ou annuellement selon votre choix. Vous pouvez annuler à tout moment."
  },
  {
    question: "Les données sont-elles sécurisées ?",
    answer: "Absolument. Toutes les données sont chiffrées et hébergées en Europe conformément au RGPD."
  },
  {
    question: "Peut-on changer d'offre ?",
    answer: "Oui, vous pouvez upgrader ou downgrader à tout moment. Les changements prennent effet immédiatement."
  }
];

const goToRegister = () => {
  router.push('/register');
};
</script>

