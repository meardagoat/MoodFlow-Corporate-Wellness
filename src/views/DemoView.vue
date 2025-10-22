<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-32 -left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-blob animation-delay-1000"></div>
    </div>

    <div class="relative z-10 py-20 px-6">
      <div class="max-w-6xl mx-auto">
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
            Demander une démo
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez MoodFlow en action avec notre équipe. 
            <span class="text-orange-600 font-semibold">30 minutes qui changent tout.</span>
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <!-- Interactive Form -->
          <div class="order-2 lg:order-1">
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60 relative overflow-hidden">
              <!-- Animated background pattern -->
              <div class="absolute inset-0 opacity-5">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500 to-purple-500"></div>
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-orange-400 rounded-full blur-2xl animate-pulse"></div>
                <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
              </div>
              
              <div class="relative z-10">
                <h2 class="text-3xl font-bold text-neutral-900 mb-2">Réservez votre démo personnalisée</h2>
                <p class="text-neutral-600 mb-8">Remplissez le formulaire et on vous recontacte sous 24h</p>
                
                <form @submit.prevent="handleSubmit" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="group">
                      <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                        Prénom
                      </label>
                      <input v-model="form.firstName" type="text" required
                             class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                    </div>
                    <div class="group">
                      <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                        Nom
                      </label>
                      <input v-model="form.lastName" type="text" required
                             class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                    </div>
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Email professionnel
                    </label>
                    <input v-model="form.email" type="email" required
                           class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Entreprise
                    </label>
                    <input v-model="form.company" type="text" required
                           class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Nombre d'employés
                    </label>
                    <select v-model="form.size" required
                            class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                      <option value="">Sélectionnez la taille de votre entreprise</option>
                      <option value="1-50">1-50 employés</option>
                      <option value="51-200">51-200 employés</option>
                      <option value="201-1000">201-1000 employés</option>
                      <option value="1000+">1000+ employés</option>
                    </select>
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Téléphone (optionnel)
                    </label>
                    <input v-model="form.phone" type="tel"
                           class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Message (optionnel)
                    </label>
                    <textarea v-model="form.message" rows="3"
                              class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300 resize-none"
                              placeholder="Dites-nous ce qui vous intéresse le plus..."></textarea>
                  </div>

                  <button type="submit" :disabled="submitted"
                          class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10">
                      {{ submitted ? '🎉 Demande envoyée !' : 'Réserver ma démo gratuite' }}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Interactive Benefits -->
          <div class="order-1 lg:order-2 space-y-6">
            <div class="text-center lg:text-left mb-8">
              <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Pourquoi réserver une démo ?
              </h2>
              <p class="text-lg text-neutral-600">
                Découvrez comment MoodFlow peut transformer votre entreprise
              </p>
            </div>

            <div class="space-y-4">
              <div v-for="(benefit, index) in benefits" :key="index" 
                   class="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {{ benefit.icon }}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-neutral-900 text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      {{ benefit.title }}
                    </h3>
                    <p class="text-neutral-700 group-hover:text-neutral-800 transition-colors">
                      {{ benefit.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trust indicators -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                  ✓
                </div>
                <h3 class="font-bold text-green-800 text-lg">Garantie satisfait ou remboursé</h3>
              </div>
              <p class="text-green-700">
                Si après 30 jours vous n'êtes pas convaincu, on vous rembourse intégralement. 
                <span class="font-semibold">Aucun risque.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Interactive Timeline -->
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 text-center mb-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            Comment ça se passe ?
          </h2>
          
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-purple-500 rounded-full"></div>
            
            <div class="space-y-12">
              <div v-for="(step, index) in timeline" :key="index" 
                   class="relative flex items-center"
                   :class="index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'">
                <!-- Timeline dot -->
                <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <!-- Content -->
                <div class="w-1/2 p-6"
                     :class="index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'">
                  <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div class="flex items-center gap-3 mb-3"
                         :class="index % 2 === 0 ? 'justify-end' : 'justify-start'">
                      <div class="w-10 h-10 bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl flex items-center justify-center text-xl">
                        {{ step.icon }}
                      </div>
                      <h3 class="font-bold text-neutral-900 text-lg">{{ step.title }}</h3>
                    </div>
                    <p class="text-neutral-700">{{ step.description }}</p>
                  </div>
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
              Prêt à voir MoodFlow en action ?
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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

const benefits = [
  {
    icon: '🎯',
    title: 'Démo personnalisée',
    description: 'Notre équipe vous montre exactement comment MoodFlow peut s\'adapter à votre organisation et vos besoins spécifiques.'
  },
  {
    icon: '⚡',
    title: 'Setup en 30 minutes',
    description: 'On vous aide à démarrer en moins de 30 minutes, de A à Z. Configuration, formation, premiers pas... tout est inclus.'
  },
  {
    icon: '💡',
    title: 'Questions & Réponses',
    description: 'Toutes vos questions techniques, sécurité, intégrations, RGPD... on répond à tout. Aucune question n\'est bête.'
  },
  {
    icon: '🎁',
    title: '30 jours d\'essai gratuit',
    description: 'Testez avec vos équipes pendant 30 jours, sans engagement. Si ça ne vous convient pas, on vous rembourse.'
  },
  {
    icon: '🤝',
    title: 'Support dédié',
    description: 'Un account manager dédié pour vous accompagner dans votre transformation et répondre à tous vos besoins.'
  }
];

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