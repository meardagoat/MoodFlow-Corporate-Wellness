<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-neutral-900 mb-6">
            Contactez-nous
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter pour toute question.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Comment nous joindre
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Plusieurs façons de nous contacter selon vos besoins
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              📧
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Email</h3>
            <p class="text-neutral-600 mb-4">Pour toutes vos questions générales</p>
            <a href="mailto:hello@moodflow.com" 
               class="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
              hello@moodflow.com
            </a>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              💬
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Chat en direct</h3>
            <p class="text-neutral-600 mb-4">Support instantané 24/7</p>
            <button class="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              Ouvrir le chat
            </button>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              📞
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Téléphone</h3>
            <p class="text-neutral-600 mb-4">Pour les questions urgentes</p>
            <a href="tel:+33123456789" 
               class="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
              +33 1 23 45 67 89
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Notre équipe
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
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Envoyez-nous un message
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
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Questions fréquentes
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
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Réponse garantie sous 24h
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
/* Custom styles if needed */
</style>