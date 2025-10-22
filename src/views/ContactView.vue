<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-32 -left-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-blob animation-delay-1000"></div>
      <div class="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
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
            Contact
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Une question ? Une suggestion ? Un projet ? 
            <span class="text-orange-600 font-semibold">On vous écoute.</span>
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <!-- Interactive Contact Form -->
          <div class="order-2 lg:order-1">
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60 relative overflow-hidden">
              <!-- Animated background pattern -->
              <div class="absolute inset-0 opacity-5">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500 to-purple-500"></div>
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-orange-400 rounded-full blur-2xl animate-pulse"></div>
                <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
              </div>
              
              <div class="relative z-10">
                <h2 class="text-3xl font-bold text-neutral-900 mb-2">Envoyez-nous un message</h2>
                <p class="text-neutral-600 mb-8">On vous répond sous 24h, promis !</p>
                
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
                      Email
                    </label>
                    <input v-model="form.email" type="email" required
                           class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Entreprise (optionnel)
                    </label>
                    <input v-model="form.company" type="text"
                           class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Sujet
                    </label>
                    <select v-model="form.subject" required
                            class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300">
                      <option value="">Sélectionnez un sujet</option>
                      <option value="demo">Demander une démo</option>
                      <option value="pricing">Question sur les tarifs</option>
                      <option value="support">Support technique</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div class="group">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2 group-hover:text-orange-600 transition-colors">
                      Message
                    </label>
                    <textarea v-model="form.message" rows="5" required
                              class="w-full px-4 py-3 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80 hover:bg-white group-hover:border-orange-300 resize-none"
                              placeholder="Dites-nous tout..."></textarea>
                  </div>

                  <button type="submit" :disabled="submitted"
                          class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="relative z-10">
                      {{ submitted ? '🎉 Message envoyé !' : 'Envoyer le message' }}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Contact Information & Features -->
          <div class="order-1 lg:order-2 space-y-6">
            <div class="text-center lg:text-left mb-8">
              <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Autres façons de nous contacter
              </h2>
              <p class="text-lg text-neutral-600">
                Choisissez le canal qui vous convient le mieux
              </p>
            </div>

            <!-- Contact Methods -->
            <div class="space-y-4">
              <div v-for="(contact, index) in contactMethods" :key="index" 
                   class="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/60 hover:bg-white/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {{ contact.icon }}
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-neutral-900 text-lg mb-2 group-hover:text-orange-600 transition-colors">
                      {{ contact.title }}
                    </h3>
                    <p class="text-neutral-700 group-hover:text-neutral-800 transition-colors mb-2">
                      {{ contact.description }}
                    </p>
                    <a v-if="contact.link" :href="contact.link" 
                       class="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                      {{ contact.action }}
                    </a>
                    <span v-else class="text-neutral-500 text-sm">
                      {{ contact.action }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Response Time -->
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                  ⚡
                </div>
                <h3 class="font-bold text-green-800 text-lg">Réponse rapide garantie</h3>
              </div>
              <p class="text-green-700">
                On s'engage à vous répondre sous 
                <span class="font-semibold">24h maximum</span>. 
                En général, c'est beaucoup plus rapide ! 😊
              </p>
            </div>

            <!-- FAQ Quick Access -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                  💡
                </div>
                <h3 class="font-bold text-blue-800 text-lg">Questions fréquentes</h3>
              </div>
              <p class="text-blue-700 mb-4">
                Vous cherchez une réponse rapide ? Consultez notre FAQ :
              </p>
              <router-link to="/pricing" 
                           class="inline-block px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors text-sm">
                Voir les questions fréquentes
              </router-link>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="max-w-4xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 text-center mb-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            L'équipe qui vous accompagne
          </h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(member, index) in team" :key="index" 
                 class="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div class="text-center">
                <div class="w-20 h-20 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {{ member.initial }}
                </div>
                <h3 class="font-bold text-neutral-900 text-lg mb-1">{{ member.name }}</h3>
                <p class="text-orange-600 font-semibold mb-3">{{ member.role }}</p>
                <p class="text-neutral-600 text-sm group-hover:text-neutral-800 transition-colors">
                  {{ member.description }}
                </p>
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
              Prêt à nous parler ?
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              On a hâte d'entendre votre projet et de voir comment on peut vous aider
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="scrollToForm" 
                      class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-xl">
                Envoyer un message
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
import logoVideo from '../assets/MoodFlow_final_logo.mp4';
import logoImage from '../assets/MoodFlow_final_logo.png';

const submitted = ref(false);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: ''
});

const contactMethods = [
  {
    icon: '📧',
    title: 'Email',
    description: 'Pour toutes vos questions, demandes de démo ou support technique.',
    action: 'contact@moodflow.app',
    link: 'mailto:contact@moodflow.app'
  },
  {
    icon: '💬',
    title: 'Chat en direct',
    description: 'Disponible du lundi au vendredi, 9h-18h. Réponse immédiate !',
    action: 'Ouvrir le chat',
    link: null
  },
  {
    icon: '📞',
    title: 'Téléphone',
    description: 'Pour les urgences ou si vous préférez parler directement.',
    action: '+33 1 23 45 67 89',
    link: 'tel:+33123456789'
  },
  {
    icon: '🎯',
    title: 'Démo personnalisée',
    description: '30 minutes pour découvrir MoodFlow adapté à votre entreprise.',
    action: 'Réserver une démo',
    link: '/demo'
  }
];

const team = [
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Customer Success',
    description: 'Votre interlocutrice privilégiée pour toutes vos questions et votre accompagnement.'
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Technical Support',
    description: 'Expert technique qui résout tous vos problèmes d\'intégration et de configuration.'
  },
  {
    name: 'Marie',
    initial: 'M',
    role: 'Sales Manager',
    description: 'Spécialiste des démos et de l\'accompagnement commercial personnalisé.'
  },
  {
    name: 'Alex',
    initial: 'A',
    role: 'Product Manager',
    description: 'En charge du développement produit et des nouvelles fonctionnalités.'
  },
  {
    name: 'Julie',
    initial: 'J',
    role: 'Marketing',
    description: 'Responsable des partenariats et des relations presse.'
  },
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    description: 'Fondateur de MoodFlow, disponible pour les projets stratégiques.'
  }
];

const handleSubmit = () => {
  console.log('Contact form submitted:', form.value);
  submitted.value = true;
  
  setTimeout(() => {
    submitted.value = false;
    form.value = { 
      firstName: '', 
      lastName: '', 
      email: '', 
      company: '', 
      subject: '', 
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

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient-flow {
  background-size: 300% 300%;
  animation: gradient-flow 3s ease infinite;
}
</style>