<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-32 -left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-blob animation-delay-1000"></div>
      <div class="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
      <div class="absolute top-1/3 left-1/2 w-56 h-56 bg-green-400/10 rounded-full blur-3xl animate-blob animation-delay-5000"></div>
    </div>

    <div class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
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
            Confidentialité
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Votre vie privée est notre priorité. 
            <span class="text-orange-600 font-semibold">Transparence totale.</span>
          </p>
        </div>

        <!-- Trust Badge -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-lg border border-white/60">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
              🔒
            </div>
            <div class="text-left">
              <h3 class="font-bold text-neutral-900">Certifié RGPD</h3>
              <p class="text-sm text-neutral-600">Conforme aux réglementations européennes</p>
            </div>
          </div>
        </div>

        <!-- Interactive Content Sections -->
        <div class="space-y-8 mb-20">
          <!-- Our Commitment -->
          <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                💙
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-orange-600 transition-colors">
                  Notre engagement
                </h2>
                <p class="text-lg text-neutral-700 leading-relaxed">
                  Chez MoodFlow, on prend la confidentialité très au sérieux. C'est pas juste une obligation légale 
                  pour nous, c'est au cœur de ce qu'on fait. On croit que la confiance se construit par la transparence, 
                  c'est pourquoi on vous explique tout clairement.
                </p>
              </div>
            </div>
          </div>

          <!-- Data Collection -->
          <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors">
                  Données collectées
                </h2>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-4">
                    <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
                      <h3 class="font-bold text-orange-800 mb-2 flex items-center gap-2">
                        <span class="text-orange-600">👤</span>
                        Informations de compte
                      </h3>
                      <ul class="text-orange-700 space-y-1 text-sm">
                        <li>• Email (uniquement pour la connexion)</li>
                        <li>• Département/Service</li>
                        <li>• Rôle (employé ou manager)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
                      <h3 class="font-bold text-purple-800 mb-2 flex items-center gap-2">
                        <span class="text-purple-600">📈</span>
                        Données d'usage
                      </h3>
                      <ul class="text-purple-700 space-y-1 text-sm">
                        <li>• Humeurs partagées (anonymisées)</li>
                        <li>• Messages dans l'app (chiffrés)</li>
                        <li>• Statistiques d'utilisation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Protection -->
          <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                🛡️
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors">
                  Comment on protège vos données
                </h2>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div v-for="(protection, index) in protections" :key="index" 
                       class="group/item bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:-translate-y-1">
                    <div class="flex items-start gap-4">
                      <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform duration-300">
                        {{ protection.icon }}
                      </div>
                      <div class="flex-1">
                        <h3 class="font-bold text-neutral-900 mb-2 group-hover/item:text-orange-600 transition-colors">
                          {{ protection.title }}
                        </h3>
                        <p class="text-neutral-700 text-sm group-hover/item:text-neutral-800 transition-colors">
                          {{ protection.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- User Rights -->
          <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                ⚖️
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-orange-600 transition-colors">
                  Vos droits
                </h2>
                <p class="text-lg text-neutral-700 leading-relaxed mb-6">
                  Conformément au RGPD, vous avez le droit de :
                </p>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div v-for="(right, index) in userRights" :key="index" 
                       class="flex items-center gap-3 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 hover:border-orange-300 transition-all duration-300">
                    <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {{ index + 1 }}
                    </div>
                    <span class="text-neutral-800 font-medium">{{ right }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Sharing -->
          <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                🚫
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-orange-600 transition-colors">
                  Partage des données
                </h2>
                <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                  <p class="text-lg text-red-800 leading-relaxed">
                    <span class="font-bold text-red-900">On ne vend jamais vos données. Jamais.</span> 
                    Les seules personnes qui y ont accès sont les managers de votre entreprise 
                    (et seulement sous forme de statistiques agrégées et anonymisées). 
                    Vos messages et humeurs individuels restent privés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact -->
          <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div class="flex items-start gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                💬
              </div>
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-neutral-900 mb-4 group-hover:text-orange-600 transition-colors">
                  Questions ?
                </h2>
                <p class="text-lg text-neutral-700 leading-relaxed mb-6">
                  Si vous avez des questions sur notre politique de confidentialité ou vos données, 
                  contactez-nous à :
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:privacy@moodflow.app" 
                     class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                    <span>📧</span>
                    privacy@moodflow.app
                  </a>
                  <router-link to="/contact" 
                               class="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm text-neutral-800 rounded-2xl font-semibold border border-neutral-200 hover:bg-white hover:scale-105 transition-all duration-300">
                    <span>💬</span>
                    Formulaire de contact
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive FAQ -->
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
          <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Votre confiance, notre priorité
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Découvrez MoodFlow en toute confiance, avec la garantie que vos données sont protégées
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link to="/demo" 
                           class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl">
                Demander une démo
              </router-link>
              <router-link to="/contact" 
                           class="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30">
                Nous contacter
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

        <!-- Last updated -->
        <div class="mt-12 text-center text-neutral-500 text-sm">
          <p>Dernière mise à jour : {{ lastUpdated }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logoVideo from '../assets/MoodFlow_final_logo.mp4';
import logoImage from '../assets/MoodFlow_final_logo.png';

const openFAQs = ref<number[]>([]);
const lastUpdated = '20 janvier 2025';

const protections = [
  {
    icon: '🔐',
    title: 'Chiffrement de bout en bout',
    description: 'Toutes les communications sont chiffrées. Même nous, on ne peut pas lire vos messages.'
  },
  {
    icon: '🎭',
    title: 'Anonymisation',
    description: 'Les humeurs et posts sont liés à un ID anonyme, pas à votre identité réelle.'
  },
  {
    icon: '🇪🇺',
    title: 'Hébergement européen',
    description: 'Vos données restent en Europe, conformes au RGPD.'
  },
  {
    icon: '🛡️',
    title: 'Accès limité',
    description: 'Seules les personnes autorisées peuvent accéder aux données (et uniquement les leurs).'
  }
];

const userRights = [
  'Accéder à vos données personnelles',
  'Rectifier vos informations',
  'Supprimer votre compte et toutes vos données',
  'Exporter vos données',
  'Vous opposer au traitement de vos données',
  'Limiter le traitement de vos données'
];

const faqs = [
  {
    question: "MoodFlow peut-il lire mes messages ?",
    answer: "Non, absolument pas. Tous vos messages sont chiffrés de bout en bout. Même nos développeurs ne peuvent pas les lire. Seuls vous et vos collègues autorisés y avez accès."
  },
  {
    question: "Mes humeurs sont-elles vraiment anonymes ?",
    answer: "Oui, totalement. Vos humeurs sont liées à un ID anonyme généré aléatoirement. Même les managers ne peuvent pas savoir qui a partagé quoi. Seules les statistiques globales sont visibles."
  },
  {
    question: "Où sont stockées mes données ?",
    answer: "Toutes vos données sont hébergées en Europe (France et Allemagne) sur des serveurs certifiés ISO 27001. On respecte strictement le RGPD et on ne transfère jamais vos données hors d'Europe."
  },
  {
    question: "Puis-je supprimer toutes mes données ?",
    answer: "Oui, à tout moment. Vous pouvez supprimer votre compte depuis les paramètres, et toutes vos données (messages, humeurs, informations personnelles) seront définitivement effacées sous 30 jours maximum."
  },
  {
    question: "MoodFlow vend-il mes données ?",
    answer: "Jamais. On ne vend, ne loue, ne partage jamais vos données avec des tiers. C'est un principe fondamental chez nous. Vos données restent les vôtres, point final."
  },
  {
    question: "Comment puis-je exercer mes droits RGPD ?",
    answer: "C'est simple : envoyez un email à privacy@moodflow.app avec votre demande. On vous répond sous 30 jours maximum et on vous aide à exercer vos droits (accès, rectification, suppression, etc.)."
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

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.animate-gradient-flow {
  background-size: 300% 300%;
  animation: gradient-flow 3s ease infinite;
}
</style>