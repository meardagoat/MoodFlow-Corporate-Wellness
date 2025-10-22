<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 -left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-40 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header with interactive logo -->
        <div class="text-center mb-16">
          <div class="mb-8 flex justify-center">
            <div class="relative group">
              <video 
                autoplay 
                muted 
                playsinline
                loop
                class="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
              >
                <source :src="logoVideo" type="video/mp4">
                <img :src="logoImage" alt="MoodFlow" class="w-full h-full object-contain" />
              </video>
              <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-purple-400/20 to-orange-400/20 rounded-full blur-2xl -z-10 group-hover:blur-3xl transition-all duration-500"></div>
            </div>
          </div>
          
          <h1 class="text-5xl sm:text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow cursor-default hover:scale-105 transition-transform duration-500">
            Tarifs transparents
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Choisissez l'offre qui correspond à votre entreprise. 
            <span class="text-orange-600 font-semibold">Aucun piège caché.</span>
          </p>
        </div>

        <!-- Interactive Pricing Cards -->
        <div class="grid md:grid-cols-3 gap-8 mb-20">
          <!-- Starter Card -->
          <div class="group relative">
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="mb-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                      🌱
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-neutral-900">Starter</h3>
                      <p class="text-neutral-600">Pour les petites équipes</p>
                    </div>
                  </div>
                </div>
                
                <div class="mb-8">
                  <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-black text-green-600">Gratuit</span>
                    <span class="text-neutral-500 text-lg">à vie</span>
                  </div>
                </div>
                
                <ul class="space-y-4 mb-8">
                  <li v-for="(feature, index) in starterFeatures" :key="index" 
                      class="flex items-start gap-3 group/item">
                    <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 group-hover/item:bg-green-200 transition-colors">
                      <span class="text-green-600 text-sm">✓</span>
                    </div>
                    <span class="text-neutral-700 group-hover/item:text-neutral-900 transition-colors">{{ feature }}</span>
                  </li>
                </ul>
                
                <button @click="goToRegister" 
                        class="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                  Commencer gratuitement
                </button>
              </div>
            </div>
          </div>

          <!-- Pro Card (Featured) -->
          <div class="group relative md:-mt-8">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
              ⭐ Populaire
            </div>
            
            <div class="bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600 rounded-3xl p-8 shadow-2xl transform scale-105 hover:scale-110 transition-all duration-500 relative overflow-hidden">
              <!-- Animated background pattern -->
              <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
              </div>
              
              <div class="relative z-10">
                <div class="mb-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl">
                      🚀
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-white">Pro</h3>
                      <p class="text-white/80">Pour les entreprises en croissance</p>
                    </div>
                  </div>
                </div>
                
                <div class="mb-8">
                  <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-black text-white">49€</span>
                    <span class="text-white/80 text-lg">/mois</span>
                  </div>
                  <p class="text-white/70 text-sm mt-2">Facturé mensuellement</p>
                </div>
                
                <ul class="space-y-4 mb-8">
                  <li v-for="(feature, index) in proFeatures" :key="index" 
                      class="flex items-start gap-3 group/item">
                    <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5 group-hover/item:bg-white/30 transition-colors">
                      <span class="text-white text-sm">✓</span>
                    </div>
                    <span class="text-white group-hover/item:text-white/90 transition-colors">{{ feature }}</span>
                  </li>
                </ul>
                
                <button @click="goToRegister" 
                        class="w-full px-6 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-white/25">
                  Démarrer l'essai gratuit
                </button>
              </div>
            </div>
          </div>

          <!-- Enterprise Card -->
          <div class="group relative">
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10">
                <div class="mb-6">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl">
                      🏢
                    </div>
                    <div>
                      <h3 class="text-2xl font-bold text-neutral-900">Enterprise</h3>
                      <p class="text-neutral-600">Pour les grandes organisations</p>
                    </div>
                  </div>
                </div>
                
                <div class="mb-8">
                  <div class="flex items-baseline gap-2">
                    <span class="text-5xl font-black text-purple-600">Sur mesure</span>
                  </div>
                  <p class="text-neutral-500 text-sm mt-2">Tarif personnalisé</p>
                </div>
                
                <ul class="space-y-4 mb-8">
                  <li v-for="(feature, index) in enterpriseFeatures" :key="index" 
                      class="flex items-start gap-3 group/item">
                    <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 group-hover/item:bg-purple-200 transition-colors">
                      <span class="text-purple-600 text-sm">✓</span>
                    </div>
                    <span class="text-neutral-700 group-hover/item:text-neutral-900 transition-colors">{{ feature }}</span>
                  </li>
                </ul>
                
                <router-link to="/contact" 
                             class="block w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-center">
                  Nous contacter
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive FAQ Section -->
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 text-center mb-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            Questions fréquentes
          </h2>
          
          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" 
                 class="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <button @click="toggleFAQ(index)"
                      class="w-full p-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 transition-all duration-300">
                <h3 class="font-bold text-neutral-900 text-lg group-hover:text-orange-600 transition-colors">
                  {{ faq.question }}
                </h3>
                <div class="w-8 h-8 bg-gradient-to-br from-orange-100 to-purple-100 rounded-full flex items-center justify-center transition-transform duration-300"
                     :class="openFAQs.includes(index) ? 'rotate-180' : ''">
                  <span class="text-orange-600 font-bold">▼</span>
                </div>
              </button>
              
              <div class="overflow-hidden transition-all duration-500"
                   :class="openFAQs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'">
                <div class="px-6 pb-6">
                  <p class="text-neutral-700 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600 rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div class="relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre entreprise ?
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'entreprises qui font confiance à MoodFlow
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="goToRegister" 
                      class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl">
                Commencer gratuitement
              </button>
              <router-link to="/demo" 
                           class="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30">
                Demander une démo
              </router-link>
            </div>
          </div>
        </div>

        <!-- Back button -->
        <div class="text-center pt-16">
          <router-link to="/" 
                       class="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-xl text-neutral-800 rounded-2xl font-semibold border border-white/60 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-lg">
            <span>←</span>
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logoVideo from '../assets/MoodFlow_final_logo.mp4';
import logoImage from '../assets/MoodFlow_final_logo.png';

const router = useRouter();
const openFAQs = ref<number[]>([]);

const starterFeatures = [
  'Jusqu\'à 50 employés',
  'Suivi des humeurs quotidien',
  'Dashboard basique',
  'Chat anonyme',
  'Support par email',
  'Données sécurisées'
];

const proFeatures = [
  'Jusqu\'à 500 employés',
  'Analytics avancées',
  'Export de données',
  'Support prioritaire',
  'Intégrations (Slack, Teams)',
  'Formations personnalisées',
  'API complète',
  'Hébergement dédié'
];

const enterpriseFeatures = [
  'Employés illimités',
  'API complète + webhooks',
  'SSO / SAML',
  'Support dédié 24/7',
  'Hébergement privé possible',
  'Formations sur site',
  'SLA personnalisé',
  'Intégrations sur mesure'
];

const faqs = [
  {
    question: "Puis-je essayer MoodFlow gratuitement ?",
    answer: "Oui ! L'offre Starter est gratuite à vie pour jusqu'à 50 employés. Pas besoin de carte bancaire, pas d'engagement. Vous pouvez commencer immédiatement et upgrader quand vous voulez."
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer: "On facture mensuellement ou annuellement selon votre choix. Vous pouvez annuler à tout moment, sans frais cachés. Les changements d'offre prennent effet immédiatement."
  },
  {
    question: "Les données sont-elles sécurisées ?",
    answer: "Absolument. Toutes les données sont chiffrées de bout en bout et hébergées en Europe conformément au RGPD. Vos collaborateurs restent anonymes, même nous ne pouvons pas identifier qui a écrit quoi."
  },
  {
    question: "Peut-on changer d'offre facilement ?",
    answer: "Oui, vous pouvez upgrader ou downgrader à tout moment depuis votre dashboard. Les changements prennent effet immédiatement et on ajuste la facturation automatiquement."
  },
  {
    question: "Quel support proposez-vous ?",
    answer: "Starter : support par email. Pro : support prioritaire par email et chat. Enterprise : support dédié 24/7 avec un account manager personnel."
  },
  {
    question: "MoodFlow s'intègre-t-il avec nos outils ?",
    answer: "Oui ! On s'intègre avec Slack, Microsoft Teams, et on a une API complète. Pour Enterprise, on peut créer des intégrations sur mesure selon vos besoins."
  }
];

const toggleFAQ = (index: number) => {
  const faqIndex = openFAQs.value.indexOf(index);
  if (faqIndex > -1) {
    openFAQs.value.splice(faqIndex, 1);
  } else {
    openFAQs.value.push(index);
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient-flow {
  background-size: 300% 300%;
  animation: gradient-flow 3s ease infinite;
}
</style>