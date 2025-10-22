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
              Contactez-nous
            </span>
          </h1>
          <p class="text-2xl md:text-3xl text-neutral-600 max-w-5xl mx-auto leading-relaxed mb-12">
            Notre équipe d'experts est là pour vous accompagner dans votre transformation digitale du bien-être en entreprise.
          </p>
          
          <!-- Trust indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-neutral-500">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-lg font-medium">Réponse sous 24h</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-lg font-medium">Support dédié</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span class="text-lg font-medium">Accompagnement personnalisé</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Methods - Enhanced Headspace Style -->
    <section class="py-24 md:py-40 px-4 md:px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Comment nous joindre
            </span>
          </h2>
          <p class="text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Choisissez la méthode qui vous convient le mieux. Notre équipe est là pour vous accompagner.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <!-- Email Card -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-100">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                📧
              </div>
              <h3 class="text-2xl font-bold text-neutral-900 mb-4 text-center">Email</h3>
              <p class="text-neutral-600 mb-6 text-center leading-relaxed">
                Pour toutes vos questions générales, demandes de devis ou informations sur nos services.
              </p>
              <div class="text-center">
                <a href="mailto:hello@moodflow.com" 
                   class="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-2xl hover:bg-orange-600 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span>hello@moodflow.com</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Chat Card -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-100">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                💬
              </div>
              <h3 class="text-2xl font-bold text-neutral-900 mb-4 text-center">Chat en direct</h3>
              <p class="text-neutral-600 mb-6 text-center leading-relaxed">
                Support instantané 24/7. Obtenez des réponses immédiates à vos questions les plus urgentes.
              </p>
              <div class="text-center">
                <button class="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-semibold rounded-2xl hover:bg-purple-600 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span>Ouvrir le chat</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Phone Card -->
          <div class="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-100 md:col-span-2 lg:col-span-1">
            <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                📞
              </div>
              <h3 class="text-2xl font-bold text-neutral-900 mb-4 text-center">Téléphone</h3>
              <p class="text-neutral-600 mb-6 text-center leading-relaxed">
                Pour les questions urgentes ou les discussions complexes nécessitant une approche personnalisée.
              </p>
              <div class="text-center">
                <a href="tel:+33123456789" 
                   class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-2xl hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span>+33 1 23 45 67 89</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Notre équipe
            </span>
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Rencontrez les personnes qui vous accompagneront dans votre transformation
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(member, index) in team" :key="index" class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
              {{ member.initial }}
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">{{ member.name }}</h3>
            <p class="text-orange-600 font-semibold mb-4">{{ member.role }}</p>
            <p class="text-neutral-600 text-sm mb-4">{{ member.description }}</p>
            <div class="flex justify-center gap-4">
              <a :href="`mailto:${member.email}`" 
                 class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors">
                📧
              </a>
              <a :href="member.linkedin" target="_blank"
                 class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors">
                💼
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Envoyez-nous un message
            </span>
          </h2>
          <p class="text-xl text-neutral-600">
            Remplissez le formulaire et nous vous recontacterons sous 24h
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
                Email
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
                Sujet
              </label>
              <select v-model="form.subject" required
                      class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all">
                <option value="">Sélectionnez un sujet</option>
                <option value="demo">Demande de démo</option>
                <option value="pricing">Question sur les tarifs</option>
                <option value="support">Support technique</option>
                <option value="partnership">Partenariat</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Message
              </label>
              <textarea v-model="form.message" rows="6" required
                        class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        placeholder="Décrivez votre demande en détail..."></textarea>
            </div>

            <button type="submit" :disabled="submitted"
                    class="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {{ submitted ? '🎉 Message envoyé !' : 'Envoyer le message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Questions fréquentes
            </span>
          </h2>
          <p class="text-xl text-neutral-600">
            Trouvez rapidement les réponses à vos questions
          </p>
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

    <!-- Response Time -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-gradient-to-br from-orange-100 to-purple-100 rounded-3xl p-12">
          <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-8">
            ⚡
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Réponse garantie sous 24h
            </span>
          </h2>
          <p class="text-xl text-neutral-600 mb-8">
            Notre équipe s'engage à vous répondre dans les 24 heures, 
            même le weekend pour les questions urgentes.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/demo" 
                         class="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg">
              Demander une démo
            </router-link>
            <a href="mailto:hello@moodflow.com" 
               class="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all duration-300 border border-orange-200">
              Nous écrire
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const submitted = ref(false);
const openFaqs = ref<number[]>([]);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: ''
});

const team = [
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    email: 'david@moodflow.com',
    linkedin: 'https://linkedin.com/in/david',
    description: 'Fondateur de MoodFlow, visionnaire du bien-être en entreprise.'
  },
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Head of Customer Success',
    email: 'sophie@moodflow.com',
    linkedin: 'https://linkedin.com/in/sophie',
    description: 'Experte en accompagnement client et transformation organisationnelle.'
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Head of Support',
    email: 'thomas@moodflow.com',
    linkedin: 'https://linkedin.com/in/thomas',
    description: 'Responsable du support technique et de la satisfaction client.'
  }
];

const faqs = [
  {
    question: 'Quel est le délai de réponse ?',
    answer: 'Nous nous engageons à vous répondre dans les 24 heures, même le weekend pour les questions urgentes. Pour le support technique, la réponse est généralement plus rapide.'
  },
  {
    question: 'Puis-je programmer un appel de démonstration ?',
    answer: 'Absolument ! Utilisez notre formulaire de contact en sélectionnant "Demande de démo" comme sujet, ou contactez-nous directement par email.'
  },
  {
    question: 'Offrez-vous un support en français ?',
    answer: 'Oui, notre équipe est entièrement francophone et nous offrons un support complet en français pour tous nos clients.'
  },
  {
    question: 'Comment puis-je signaler un problème technique ?',
    answer: 'Vous pouvez nous contacter par email à support@moodflow.com, via le chat en direct sur notre site, ou utiliser le formulaire de contact en sélectionnant "Support technique".'
  },
  {
    question: 'Proposez-vous des formations pour nos équipes ?',
    answer: 'Oui, nous proposons des formations personnalisées pour vos équipes, incluant l\'utilisation de la plateforme et les bonnes pratiques du bien-être en entreprise.'
  },
  {
    question: 'Puis-je parler directement à un expert ?',
    answer: 'Bien sûr ! Notre équipe d\'experts est disponible pour des consultations personnalisées. Contactez-nous pour planifier un appel avec un spécialiste.'
  }
];

const handleSubmit = () => {
  console.log('Contact form:', form.value);
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