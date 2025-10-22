<template>
  <div class="min-h-screen bg-white">
    <!-- Home Button -->
    <div class="fixed top-6 left-6 z-50">
      <router-link to="/" 
                   class="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-white/20">
        <span class="text-2xl">🏠</span>
      </router-link>
    </div>

    <!-- Hero Section - Enhanced Headspace Style -->
    <section class="relative py-24 md:py-40 px-4 md:px-6 bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 overflow-hidden">
      <!-- Background decorative elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200/30 rounded-full blur-2xl animate-pulse" style="animation-delay: 2s"></div>
      </div>
      
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-20">
          <h1 class="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 leading-tight">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Tarifs MoodFlow
            </span>
          </h1>
          <p class="text-2xl md:text-3xl text-neutral-600 max-w-5xl mx-auto leading-relaxed mb-12">
            Des tarifs transparents et flexibles pour toutes les tailles d'entreprise. 
            Commencez gratuitement, évoluez selon vos besoins.
          </p>
          
          <!-- Value proposition -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-neutral-500">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-lg font-medium">Essai gratuit 14 jours</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-lg font-medium">Sans engagement</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span class="text-lg font-medium">Support inclus</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Pricing Toggle -->
    <section class="py-12 px-4 md:px-6 bg-white">
      <div class="max-w-5xl mx-auto">
        <div class="flex justify-center mb-12">
          <div class="bg-neutral-100 rounded-3xl p-3 flex shadow-lg border border-neutral-200">
            <button @click="billingCycle = 'monthly'" 
                    :class="billingCycle === 'monthly' ? 'bg-white text-orange-600 shadow-xl scale-105' : 'text-neutral-600 hover:text-neutral-800'"
                    class="px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-2">
              <span>Mensuel</span>
            </button>
            <button @click="billingCycle = 'yearly'" 
                    :class="billingCycle === 'yearly' ? 'bg-white text-orange-600 shadow-xl scale-105' : 'text-neutral-600 hover:text-neutral-800'"
                    class="px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-2">
              <span>Annuel</span>
              <span class="text-sm bg-gradient-to-r from-orange-500 to-purple-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg">-20%</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced Pricing Cards -->
    <section class="py-24 md:py-40 px-4 md:px-6 bg-gradient-to-br from-neutral-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8 md:gap-12">
          <!-- Starter Plan -->
          <div class="group relative bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  🚀
                </div>
                <h3 class="text-3xl font-bold text-neutral-900 mb-3">Starter</h3>
                <p class="text-lg text-neutral-600 mb-8">Parfait pour les petites équipes qui commencent</p>
                <div class="mb-8">
                  <span class="text-6xl font-bold text-neutral-900">{{ billingCycle === 'yearly' ? '€8' : '€10' }}</span>
                  <span class="text-lg text-neutral-600">/employé/mois</span>
                </div>
                <button class="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  Commencer gratuitement
                </button>
              </div>
              
              <div class="space-y-5">
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Jusqu'à 50 employés</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Expression libre anonyme</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Dashboard de base</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Support email</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Rapports mensuels</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Professional Plan - Enhanced -->
          <div class="group relative bg-white rounded-3xl p-8 border-2 border-orange-500 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 scale-105 lg:scale-110">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-purple-50 rounded-3xl opacity-100"></div>
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
              <span class="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl animate-pulse">
                ⭐ Populaire
              </span>
            </div>
            
            <div class="relative z-10">
              <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  💎
                </div>
                <h3 class="text-4xl font-bold text-neutral-900 mb-3">Professional</h3>
                <p class="text-xl text-neutral-600 mb-8">Pour les entreprises en croissance</p>
                <div class="mb-8">
                  <span class="text-7xl font-bold text-neutral-900">{{ billingCycle === 'yearly' ? '€16' : '€20' }}</span>
                  <span class="text-xl text-neutral-600">/employé/mois</span>
                </div>
                <button class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-xl">
                  Essayer 30 jours gratuits
                </button>
              </div>
              
              <div class="space-y-5">
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Jusqu'à 500 employés</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Tout Starter +</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Insights en temps réel</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Actions ciblées</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Support prioritaire</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Rapports hebdomadaires</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Intégrations API</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enterprise Plan - Enhanced -->
          <div class="group relative bg-white rounded-3xl p-8 border border-neutral-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="text-center mb-8">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  🏢
                </div>
                <h3 class="text-3xl font-bold text-neutral-900 mb-3">Enterprise</h3>
                <p class="text-lg text-neutral-600 mb-8">Pour les grandes organisations</p>
                <div class="mb-8">
                  <span class="text-6xl font-bold text-neutral-900">Sur mesure</span>
                </div>
                <button class="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  Nous contacter
                </button>
              </div>
              
              <div class="space-y-5">
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Employés illimités</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Tout Professional +</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Déploiement sur site</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Support dédié 24/7</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Formation personnalisée</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">SLA garantie</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                  <span class="text-neutral-700 text-lg">Conformité avancée</span>
                </div>
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
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Comparaison des fonctionnalités
            </span>
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
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Questions fréquentes
            </span>
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
          <span class="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent animate-gradient-flow">
            Prêt à commencer ?
          </span>
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
@keyframes gradient-flow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-flow {
  background-size: 200% 200%;
  animation: gradient-flow 3s ease-in-out infinite;
}
</style>