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
              Politique de confidentialité
            </span>
          </h1>
          <p class="text-2xl md:text-3xl text-neutral-600 max-w-5xl mx-auto leading-relaxed mb-12">
            Votre vie privée est notre priorité. Découvrez comment nous protégeons vos données.
          </p>
          
          <!-- Privacy indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-neutral-500">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-lg font-medium">RGPD conforme</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-lg font-medium">Chiffrement SSL</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span class="text-lg font-medium">Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Badge - Enhanced -->
    <section class="py-24 md:py-40 px-4 md:px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl px-12 py-6 mb-12 shadow-xl border border-green-200">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
              ✓
            </div>
            <div class="text-left">
              <h3 class="font-bold text-green-800 text-2xl">Certifié RGPD</h3>
              <p class="text-green-700 text-lg">Conformité européenne garantie</p>
            </div>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Notre engagement envers votre vie privée
            </span>
          </h2>
          <p class="text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Chez MoodFlow, nous croyons que la confidentialité est un droit fondamental. 
            Nous nous engageons à protéger vos données avec les plus hauts standards de sécurité.
          </p>
        </div>
      </div>
    </section>

    <!-- Data Protection Cards -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Comment nous protégeons vos données
            </span>
          </h2>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🔒
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Chiffrement de bout en bout</h3>
            <p class="text-neutral-600">Toutes vos données sont chiffrées avec AES-256, le standard militaire de sécurité.</p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🇪🇺
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Hébergement européen</h3>
            <p class="text-neutral-600">Vos données restent en Europe, conformément au RGPD et aux réglementations françaises.</p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              👥
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Anonymat garanti</h3>
            <p class="text-neutral-600">Vos réponses sont anonymisées et ne peuvent jamais être liées à votre identité.</p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🛡️
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Audits réguliers</h3>
            <p class="text-neutral-600">Nos systèmes sont audités régulièrement par des experts en cybersécurité indépendants.</p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              📋
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Conformité RGPD</h3>
            <p class="text-neutral-600">Nous respectons intégralement le Règlement Général sur la Protection des Données.</p>
          </div>
          
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
            <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🚫
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Aucune revente</h3>
            <p class="text-neutral-600">Nous ne vendons jamais vos données à des tiers. Jamais.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy FAQ -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Questions sur la confidentialité
            </span>
          </h2>
          <p class="text-xl text-neutral-600">
            Les réponses aux questions les plus fréquentes sur la protection de vos données
          </p>
        </div>
        
        <div class="space-y-6">
          <div v-for="(faq, index) in privacyFaqs" :key="index" 
               class="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-lg">
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

    <!-- Your Rights -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Vos droits
            </span>
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            En tant qu'utilisateur de MoodFlow, vous disposez de droits spécifiques sur vos données
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="(right, index) in userRights" :key="index" 
               class="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-neutral-900 mb-3">{{ right.title }}</h3>
                <p class="text-neutral-600 leading-relaxed">{{ right.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Usage -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Utilisation de vos données
            </span>
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Transparence totale sur l'utilisation de vos données personnelles
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-6">Données que nous collectons</h3>
            <div class="space-y-4">
              <div v-for="dataType in dataTypes" :key="dataType.type" 
                   class="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl">
                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {{ dataType.icon }}
                </div>
                <div>
                  <h4 class="font-semibold text-neutral-900">{{ dataType.type }}</h4>
                  <p class="text-sm text-neutral-600">{{ dataType.purpose }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-orange-100 to-purple-100 rounded-3xl p-8">
            <h3 class="text-2xl font-bold text-neutral-900 mb-6">Pourquoi nous les collectons</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">✓</div>
                <p class="text-neutral-700">Améliorer votre expérience utilisateur</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">✓</div>
                <p class="text-neutral-700">Fournir un support technique efficace</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">✓</div>
                <p class="text-neutral-700">Assurer la sécurité de la plateforme</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">✓</div>
                <p class="text-neutral-700">Respecter nos obligations légales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Privacy -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
          <span class="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent animate-gradient-flow">
            Questions sur la confidentialité ?
          </span>
        </h2>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Notre équipe est là pour répondre à toutes vos questions sur la protection de vos données
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:privacy@moodflow.com" 
             class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl">
            Contacter notre DPO
          </a>
          <router-link to="/contact" 
                       class="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30">
            Nous contacter
          </router-link>
        </div>
      </div>
    </section>

    <!-- Last Updated -->
    <section class="py-12 px-4 md:px-6 bg-neutral-100">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-neutral-600">
          Dernière mise à jour : {{ lastUpdated }}
        </p>
        <p class="text-sm text-neutral-500 mt-2">
          Cette politique de confidentialité peut être mise à jour. Nous vous informerons de tout changement significatif.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const openFaqs = ref<number[]>([]);
const lastUpdated = '15 janvier 2025';

const privacyFaqs = [
  {
    question: 'MoodFlow est-il conforme au RGPD ?',
    answer: 'Oui, MoodFlow est entièrement conforme au Règlement Général sur la Protection des Données (RGPD). Nous avons mis en place toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles.'
  },
  {
    question: 'Mes réponses sont-elles vraiment anonymes ?',
    answer: 'Absolument. Vos réponses sont cryptées et anonymisées dès leur saisie. Même notre équipe technique ne peut pas les relier à votre identité. Seuls des statistiques agrégées sont utilisées pour les rapports.'
  },
  {
    question: 'Où sont stockées mes données ?',
    answer: 'Toutes vos données sont stockées sur des serveurs sécurisés situés en Europe, conformément aux réglementations européennes et françaises. Nous ne transférons aucune donnée en dehors de l\'Union Européenne.'
  },
  {
    question: 'Puis-je supprimer mes données ?',
    answer: 'Oui, vous avez le droit de demander la suppression de vos données personnelles à tout moment. Vous pouvez le faire depuis votre profil ou en nous contactant directement. La suppression sera effective dans les 30 jours.'
  },
  {
    question: 'MoodFlow vend-il mes données ?',
    answer: 'Non, jamais. Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers à des fins commerciales. Vos données restent strictement confidentielles.'
  },
  {
    question: 'Comment puis-je exercer mes droits ?',
    answer: 'Vous pouvez exercer vos droits (accès, rectification, suppression, portabilité) en nous contactant à privacy@moodflow.com ou via votre espace personnel. Nous répondons à toutes les demandes dans les 30 jours.'
  }
];

const userRights = [
  {
    title: 'Droit d\'accès',
    description: 'Vous pouvez demander à tout moment quelles données personnelles nous détenons sur vous et comment nous les utilisons.'
  },
  {
    title: 'Droit de rectification',
    description: 'Vous pouvez corriger ou mettre à jour vos données personnelles si elles sont inexactes ou incomplètes.'
  },
  {
    title: 'Droit à l\'effacement',
    description: 'Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances prévues par la loi.'
  },
  {
    title: 'Droit à la portabilité',
    description: 'Vous pouvez recevoir vos données dans un format structuré et lisible par machine pour les transférer à un autre service.'
  },
  {
    title: 'Droit d\'opposition',
    description: 'Vous pouvez vous opposer au traitement de vos données personnelles pour des raisons liées à votre situation particulière.'
  },
  {
    title: 'Droit de limitation',
    description: 'Vous pouvez demander la limitation du traitement de vos données dans certaines circonstances.'
  }
];

const dataTypes = [
  {
    type: 'Informations de compte',
    icon: '👤',
    purpose: 'Nom, email, entreprise pour créer votre compte'
  },
  {
    type: 'Réponses anonymes',
    icon: '💭',
    purpose: 'Vos réponses aux questions de bien-être (anonymisées)'
  },
  {
    type: 'Données d\'utilisation',
    icon: '📊',
    purpose: 'Comment vous utilisez la plateforme pour l\'améliorer'
  },
  {
    type: 'Données techniques',
    icon: '🔧',
    purpose: 'Adresse IP, type de navigateur pour la sécurité'
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