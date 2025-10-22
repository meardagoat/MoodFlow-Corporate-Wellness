<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 mb-6">
            Tarifs MoodFlow
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Des tarifs transparents et flexibles pour toutes les tailles d'entreprise. 
            Commencez gratuitement, évoluez selon vos besoins.
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Toggle -->
    <section class="py-8 px-4 md:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-center mb-8">
          <div class="bg-neutral-100 rounded-2xl p-2 flex">
            <button @click="billingCycle = 'monthly'" 
                    :class="billingCycle === 'monthly' ? 'bg-white text-orange-600 shadow-lg' : 'text-neutral-600'"
                    class="px-6 py-3 rounded-xl font-semibold transition-all duration-300">
              Mensuel
            </button>
            <button @click="billingCycle = 'yearly'" 
                    :class="billingCycle === 'yearly' ? 'bg-white text-orange-600 shadow-lg' : 'text-neutral-600'"
                    class="px-6 py-3 rounded-xl font-semibold transition-all duration-300">
              Annuel
              <span class="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Starter Plan -->
          <div class="bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 relative">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-neutral-900 mb-2">Starter</h3>
              <p class="text-neutral-600 mb-6">Parfait pour les petites équipes</p>
              <div class="mb-6">
                <span class="text-5xl font-bold text-neutral-900">{{ billingCycle === 'yearly' ? '€8' : '€10' }}</span>
                <span class="text-neutral-600">/employé/mois</span>
              </div>
              <button class="w-full px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300">
                Commencer gratuitement
              </button>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Jusqu'à 50 employés</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Expression libre anonyme</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Dashboard de base</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Support email</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Rapports mensuels</span>
              </div>
            </div>
          </div>

          <!-- Professional Plan -->
          <div class="bg-white rounded-3xl p-8 border-2 border-orange-500 hover:shadow-xl transition-all duration-300 relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                Populaire
              </span>
            </div>
            
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-neutral-900 mb-2">Professional</h3>
              <p class="text-neutral-600 mb-6">Pour les entreprises en croissance</p>
              <div class="mb-6">
                <span class="text-5xl font-bold text-neutral-900">{{ billingCycle === 'yearly' ? '€16' : '€20' }}</span>
                <span class="text-neutral-600">/employé/mois</span>
              </div>
              <button class="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                Essayer 30 jours gratuits
              </button>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Jusqu'à 500 employés</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Tout Starter +</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Insights en temps réel</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Actions ciblées</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Support prioritaire</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Rapports hebdomadaires</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Intégrations API</span>
              </div>
            </div>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 relative">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-neutral-900 mb-2">Enterprise</h3>
              <p class="text-neutral-600 mb-6">Pour les grandes organisations</p>
              <div class="mb-6">
                <span class="text-5xl font-bold text-neutral-900">Sur mesure</span>
              </div>
              <button class="w-full px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300">
                Nous contacter
              </button>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Employés illimités</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Tout Professional +</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Déploiement sur site</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Support dédié 24/7</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Formation personnalisée</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">SLA garantie</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                <span class="text-neutral-700">Conformité avancée</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Comparison -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Comparaison des fonctionnalités
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Découvrez toutes les fonctionnalités incluses dans chaque plan
          </p>
        </div>
        
        <div class="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="text-left p-6 font-semibold text-neutral-900">Fonctionnalités</th>
                  <th class="text-center p-6 font-semibold text-neutral-900">Starter</th>
                  <th class="text-center p-6 font-semibold text-orange-600">Professional</th>
                  <th class="text-center p-6 font-semibold text-neutral-900">Enterprise</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200">
                <tr v-for="feature in features" :key="feature.name" class="hover:bg-neutral-50">
                  <td class="p-6 font-medium text-neutral-900">{{ feature.name }}</td>
                  <td class="p-6 text-center">
                    <span v-if="feature.starter" class="text-green-600 font-bold">✓</span>
                    <span v-else class="text-neutral-400">-</span>
                  </td>
                  <td class="p-6 text-center">
                    <span v-if="feature.professional" class="text-green-600 font-bold">✓</span>
                    <span v-else class="text-neutral-400">-</span>
                  </td>
                  <td class="p-6 text-center">
                    <span v-if="feature.enterprise" class="text-green-600 font-bold">✓</span>
                    <span v-else class="text-neutral-400">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Questions fréquentes
          </h2>
        </div>
        
        <div class="space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" 
               class="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <button @click="toggleFaq(index)"
                    class="w-full p-6 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors">
              <h3 class="font-semibold text-neutral-900">{{ faq.question }}</h3>
              <div class="w-6 h-6 flex items-center justify-center">
                <span class="text-neutral-500 transform transition-transform duration-300"
                      :class="openFaqs.includes(index) ? 'rotate-180' : ''">▼</span>
              </div>
            </button>
            <div v-if="openFaqs.includes(index)" 
                 class="px-6 pb-6 text-neutral-600 leading-relaxed">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
          Prêt à commencer ?
        </h2>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Rejoignez des milliers d'entreprises qui ont déjà transformé leur bien-être au travail
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/demo" 
                       class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl">
            Essayer gratuitement
          </router-link>
          <router-link to="/contact" 
                       class="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30">
            Nous contacter
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const billingCycle = ref('monthly');
const openFaqs = ref<number[]>([]);

const features = [
  { name: 'Expression libre anonyme', starter: true, professional: true, enterprise: true },
  { name: 'Dashboard de base', starter: true, professional: true, enterprise: true },
  { name: 'Rapports mensuels', starter: true, professional: true, enterprise: true },
  { name: 'Support email', starter: true, professional: true, enterprise: true },
  { name: 'Insights en temps réel', starter: false, professional: true, enterprise: true },
  { name: 'Actions ciblées', starter: false, professional: true, enterprise: true },
  { name: 'Support prioritaire', starter: false, professional: true, enterprise: true },
  { name: 'Rapports hebdomadaires', starter: false, professional: true, enterprise: true },
  { name: 'Intégrations API', starter: false, professional: true, enterprise: true },
  { name: 'Déploiement sur site', starter: false, professional: false, enterprise: true },
  { name: 'Support dédié 24/7', starter: false, professional: false, enterprise: true },
  { name: 'Formation personnalisée', starter: false, professional: false, enterprise: true },
  { name: 'SLA garantie', starter: false, professional: false, enterprise: true },
  { name: 'Conformité avancée', starter: false, professional: false, enterprise: true }
];

const faqs = [
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement et nous ajustons la facturation en conséquence.'
  },
  {
    question: 'Y a-t-il des frais de configuration ?',
    answer: 'Non, il n\'y a aucun frais de configuration. Vous payez uniquement le montant mensuel ou annuel selon votre plan choisi.'
  },
  {
    question: 'Que se passe-t-il si je dépasse le nombre d\'employés de mon plan ?',
    answer: 'Nous vous contacterons pour discuter de l\'upgrade de votre plan. En attendant, vous pouvez continuer à utiliser MoodFlow sans interruption.'
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument. Nous utilisons un chiffrement de bout en bout, hébergeons nos serveurs en Europe et sommes conformes au RGPD. Vos données ne sont jamais partagées avec des tiers.'
  },
  {
    question: 'Puis-je annuler à tout moment ?',
    answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Aucun frais d\'annulation ne s\'applique.'
  },
  {
    question: 'Offrez-vous des remises pour les organisations à but non lucratif ?',
    answer: 'Oui, nous offrons des tarifs préférentiels pour les organisations à but non lucratif et les établissements d\'enseignement. Contactez-nous pour plus d\'informations.'
  }
];

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>