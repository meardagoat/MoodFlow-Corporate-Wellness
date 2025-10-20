<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-6">
      <!-- Animated organic blobs -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-32 -left-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-blob"></div>
        <div class="absolute top-20 right-10 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <div class="space-y-8 mb-16">
          <!-- Logo/Nom de l'app -->
          <div class="mb-6 md:mb-8">
            <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-4 px-4 animate-gradient-flow cursor-default hover:scale-105 transition-transform duration-500">
              MoodFlow
            </h1>
          </div>
          
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight px-4">
            <span class="block text-neutral-900 mb-2">Prendre soin de</span>
            <span class="block bg-gradient-to-r from-orange-500 via-orange-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              vos équipes
            </span>
          </h2>
          
          <p class="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-light px-4">
            MoodFlow transforme le bien-être en entreprise avec une approche simple, anonyme et bienveillante
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button @click="goToRegister" 
                    class="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span class="relative z-10">Essayer gratuitement</span>
              <div class="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button @click="scrollToFeatures" 
                    class="px-8 py-4 bg-white/60 backdrop-blur-sm text-neutral-800 rounded-full text-lg font-semibold border border-neutral-200 hover:bg-white/80 transition-all duration-300">
              Découvrir
            </button>
          </div>
        </div>

        <!-- Interactive Mood Selector - Dribbble Style -->
        <div class="relative max-w-6xl mx-auto mt-20 md:mt-24">
          <!-- Main selector -->
          <div class="text-center mb-12">
            <p class="text-lg md:text-xl text-neutral-600 mb-8 font-light">Comment vous sentez-vous ?</p>
            
            <!-- Large interactive mood buttons -->
            <div class="flex justify-center items-center gap-4 md:gap-6 mb-12">
              <button v-for="(mood, i) in moods" :key="i"
                      @click="selectedMoodIndex = i"
                      class="mood-button group relative transition-all duration-500 ease-out"
                      :class="selectedMoodIndex === i ? 'selected' : ''">
                <div class="relative w-20 h-20 md:w-32 md:h-32 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-xl"
                     :class="[
                       mood.gradient,
                       selectedMoodIndex === i ? 'scale-125 shadow-2xl' : 'scale-90 opacity-40 hover:opacity-70 hover:scale-100'
                     ]">
                  <span class="text-4xl md:text-6xl transition-all duration-300 group-hover:scale-110">
                    {{ mood.emoji }}
                  </span>
                  
                  <!-- Ripple effect when selected -->
                  <div v-if="selectedMoodIndex === i" 
                       class="absolute inset-0 rounded-[2rem] bg-white/20 animate-ping"></div>
                </div>
                
                <!-- Label -->
                <p v-if="selectedMoodIndex === i" 
                   class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-neutral-700 whitespace-nowrap animate-fade-in">
                  {{ mood.label }}
                </p>
              </button>
            </div>
          </div>
          
          <!-- Dynamic content based on selection -->
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/60">
            <div class="text-center mb-8">
              <h3 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                {{ moods[selectedMoodIndex].title }}
              </h3>
              <p class="text-neutral-600 text-lg max-w-2xl mx-auto">
                {{ moods[selectedMoodIndex].description }}
              </p>
            </div>
            
            <!-- Animated stats bar -->
            <div class="relative h-3 bg-neutral-100 rounded-full overflow-hidden mb-4">
              <div class="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                   :class="mood.gradient"
                   :style="`width: ${moods[selectedMoodIndex].percentage}%`">
              </div>
            </div>
            
            <div class="flex justify-between text-sm text-neutral-500">
              <span>{{ moods[selectedMoodIndex].percentage }}% de vos collègues</span>
              <span>se sentent {{ moods[selectedMoodIndex].label.toLowerCase() }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section - Style Headspace Tabs -->
    <section ref="featuresSection" class="py-16 md:py-24 lg:py-32 relative bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900">
            L'app bien-être pour chaque moment
          </h2>
        </div>

        <!-- Tabs -->
        <div class="overflow-x-auto scrollbar-hide mb-12">
          <div class="flex gap-2 justify-center min-w-max mx-auto pb-4">
            <button v-for="(feature, index) in features" :key="index"
                    @click="currentFeature = index"
                    class="px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap"
                    :class="currentFeature === index 
                      ? 'bg-neutral-900 text-white shadow-lg' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'">
              {{ feature.title }}
            </button>
          </div>
        </div>

        <!-- Slides -->
        <div class="relative">
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500 ease-out"
                 :style="`transform: translateX(-${currentFeature * 100}%)`">
              <div v-for="(feature, index) in features" :key="index" 
                   class="min-w-full">
                <div class="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                  <!-- Image/Mockup -->
                  <div class="order-2 md:order-1">
                    <div class="rounded-3xl overflow-hidden shadow-2xl"
                         :class="getFeatureGradient(index)">
                      <div class="aspect-[4/5] flex items-center justify-center p-12">
                        <div class="text-9xl">{{ feature.icon }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="order-1 md:order-2 text-center md:text-left">
                    <h3 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                      {{ feature.title }}
                    </h3>
                    <p class="text-xl text-neutral-600 leading-relaxed mb-8">
                      {{ feature.description }}
                    </p>
                    <button @click="goToRegister"
                            class="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                      Découvrir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Indicators -->
          <div class="flex justify-center gap-3 mt-12">
            <button v-for="(_, index) in features" :key="index"
                    @click="currentFeature = index"
                    class="transition-all duration-300"
                    :class="currentFeature === index 
                      ? 'w-10 h-2 bg-orange-500 rounded-full' 
                      : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400 rounded-full'">
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Carousel -->
    <section class="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gradient-to-br from-purple-50/50 to-orange-50/50 relative overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-3 md:mb-4 px-4">
            Ce qu'ils en pensent
          </h2>
          <p class="text-lg md:text-xl text-neutral-600 px-4">Des milliers d'entreprises nous font confiance</p>
        </div>

        <div class="relative">
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-700 ease-out"
                 :style="`transform: translateX(-${currentTestimonial * 100}%)`">
              <div v-for="(testimonial, index) in testimonials" :key="index" 
                   class="min-w-full px-4 sm:px-6 md:px-8">
                <!-- Clean card style Headspace -->
                <div class="max-w-4xl mx-auto h-full flex items-center">
                  <div class="w-full bg-white rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-shadow duration-300 min-h-[400px] md:min-h-[450px] flex flex-col justify-center">
                    
                    <div class="flex justify-center mb-6 md:mb-8 gap-1.5">
                      <div v-for="i in 5" :key="i" class="text-2xl md:text-3xl text-orange-500">★</div>
                    </div>
                    
                    <p class="text-xl sm:text-2xl md:text-3xl text-neutral-800 mb-8 md:mb-10 leading-relaxed text-center font-light flex-grow flex items-center justify-center">
                      {{ testimonial.text }}
                    </p>
                    
                    <div class="flex items-center justify-center gap-4">
                      <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                        {{ testimonial.name.charAt(0) }}
                      </div>
                      <div class="text-left">
                        <h4 class="font-semibold text-neutral-900 text-base md:text-lg">{{ testimonial.name }}</h4>
                        <p class="text-neutral-600 text-sm md:text-base">{{ testimonial.role }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel dots -->
          <div class="flex justify-center gap-3 mt-10">
            <button v-for="(_, index) in testimonials" :key="index"
                    @click="currentTestimonial = index"
                    class="transition-all duration-300"
                    :class="currentTestimonial === index ? 'w-10 h-2 bg-orange-500 rounded-full' : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400 rounded-full'">
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Companies Carousel -->
    <section class="py-16 md:py-20 lg:py-24 px-4 md:px-6 bg-white/40 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto">
        <h3 class="text-center mb-12 md:mb-16 px-4">
          <span class="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-text hover:scale-105 transition-transform duration-300 cursor-default">
            Ils font confiance à MoodFlow
          </span>
        </h3>
        
        <div class="relative overflow-hidden">
          <div class="flex animate-scroll">
            <div class="flex gap-16 items-center min-w-max">
              <!-- First set -->
              <div v-for="logo in [...companyLogos, ...companyLogos]" :key="logo.name" 
                   class="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                <div v-html="logo.svg" class="w-32 h-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section - Style Headspace -->
    <section class="relative py-32 px-6 overflow-hidden">
      <!-- Sky background -->
      <div class="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-orange-200"></div>
      
      <!-- Floating avatars -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-orange-400 opacity-80 animate-float"></div>
        <div class="absolute top-40 right-20 w-24 h-24 rounded-full bg-purple-400 opacity-70 animate-float-slow"></div>
        <div class="absolute bottom-32 left-1/4 w-28 h-28 rounded-full bg-yellow-400 opacity-75 animate-float animation-delay-1000"></div>
        <div class="absolute bottom-40 right-1/3 w-20 h-20 rounded-full bg-pink-400 opacity-80 animate-float-slow"></div>
      </div>
      
      <div class="relative z-10 max-w-6xl mx-auto text-center">
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div class="flex justify-center mb-3">
              <div class="text-4xl">⭐</div>
            </div>
            <p class="text-3xl font-bold text-neutral-900 mb-1">4.8</p>
            <p class="text-sm text-neutral-600">Note App Store</p>
          </div>
          
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div class="flex justify-center mb-3">
              <div class="text-4xl">👥</div>
            </div>
            <p class="text-3xl font-bold text-neutral-900 mb-1">10K+</p>
            <p class="text-sm text-neutral-600">Entreprises</p>
          </div>
          
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div class="flex justify-center mb-3">
              <div class="text-4xl">😊</div>
            </div>
            <p class="text-3xl font-bold text-neutral-900 mb-1">2M+</p>
            <p class="text-sm text-neutral-600">Humeurs partagées</p>
          </div>
          
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div class="flex justify-center mb-3">
              <div class="text-4xl">🏆</div>
            </div>
            <p class="text-3xl font-bold text-neutral-900 mb-1">98%</p>
            <p class="text-sm text-neutral-600">Satisfaction</p>
          </div>
        </div>
        
        <h2 class="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
          Rejoignez les milliers qui utilisent MoodFlow chaque jour
        </h2>
        
        <button @click="goToPricing" 
                class="px-12 py-5 bg-white text-orange-600 rounded-full text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl">
          Voir les tarifs
        </button>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 lg:py-32 px-4 md:px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-purple-500"></div>
      <div class="absolute inset-0">
        <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <div class="relative z-10 max-w-4xl mx-auto text-center text-white space-y-6 md:space-y-8 px-4">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
          Prêt à transformer votre entreprise ?
        </h2>
        <p class="text-lg sm:text-xl md:text-2xl font-light opacity-90">
          Découvrez MoodFlow en action avec une démo personnalisée
        </p>
        <button @click="goToDemo" 
                class="px-8 sm:px-10 md:px-12 py-4 md:py-5 bg-white text-orange-600 rounded-full text-lg md:text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-900/50">
          Demander une démo
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-16 px-6 bg-neutral-900 text-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start gap-12">
          <div class="text-center md:text-left">
            <h3 class="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-purple-400 to-orange-400 bg-clip-text text-transparent animate-gradient-flow cursor-default hover:scale-105 transition-transform duration-300 inline-block">
              MoodFlow
            </h3>
            <p class="text-neutral-400 max-w-sm">Le bien-être au travail, simplifié</p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-12 sm:gap-16">
            <div>
              <h4 class="font-semibold mb-4">Produit</h4>
              <div class="space-y-2">
                <router-link to="/pricing" class="block text-neutral-400 hover:text-orange-400 transition-colors">Tarifs</router-link>
                <router-link to="/demo" class="block text-neutral-400 hover:text-orange-400 transition-colors">Demander une démo</router-link>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Entreprise</h4>
              <div class="space-y-2">
                <router-link to="/about" class="block text-neutral-400 hover:text-orange-400 transition-colors">À propos</router-link>
                <router-link to="/contact" class="block text-neutral-400 hover:text-orange-400 transition-colors">Contact</router-link>
                <router-link to="/privacy" class="block text-neutral-400 hover:text-orange-400 transition-colors">Confidentialité</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-400">
          <p class="mb-2">&copy; 2025 MoodFlow</p>
          <p class="text-sm">
            Codé avec ❤️ et du Flow par 
            <span class="text-orange-400 font-semibold">A</span>bdoul, 
            <span class="text-purple-400 font-semibold">M</span>athieu, 
            <span class="text-yellow-400 font-semibold">A</span>maury, 
            <span class="text-orange-400 font-semibold">J</span>erobel et 
            <span class="text-purple-400 font-semibold">M</span>ehmet
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isVisible = ref(false);
const featuresSection = ref<HTMLElement | null>(null);
const currentTestimonial = ref(0);
const currentFeature = ref(0);
const selectedMoodIndex = ref(1);

const moods = [
  { 
    emoji: '😄', 
    label: 'Excellent',
    gradient: 'bg-gradient-to-br from-green-400 to-green-500',
    percentage: 45,
    title: 'Votre équipe est au top',
    description: 'Un climat positif favorise la productivité et l\'innovation. Continuez à cultiver cette dynamique.'
  },
  { 
    emoji: '😊', 
    label: 'Bien',
    gradient: 'bg-gradient-to-br from-yellow-300 to-orange-400',
    percentage: 32,
    title: 'L\'ambiance est bonne',
    description: 'Vos collaborateurs se sentent globalement bien. Quelques ajustements peuvent encore améliorer le quotidien.'
  },
  { 
    emoji: '😐', 
    label: 'Neutre',
    gradient: 'bg-gradient-to-br from-purple-300 to-purple-400',
    percentage: 15,
    title: 'Une attention nécessaire',
    description: 'Certains signaux neutres méritent d\'être explorés. C\'est le moment d\'écouter vos équipes.'
  },
  { 
    emoji: '😔', 
    label: 'Difficile',
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-500',
    percentage: 6,
    title: 'Agir rapidement',
    description: 'Des collaborateurs expriment des difficultés. Un accompagnement bienveillant est recommandé.'
  },
  { 
    emoji: '😢', 
    label: 'Très difficile',
    gradient: 'bg-gradient-to-br from-red-400 to-orange-500',
    percentage: 2,
    title: 'Intervention urgente',
    description: 'Ces signaux nécessitent une action immédiate. Contactez vos équipes RH ou de soutien psychologique.'
  }
];

const features = [
  {
    icon: '💬',
    title: 'Expression libre',
    description: 'Vos équipes partagent leur ressenti quotidien en toute confidentialité, sans jugement.'
  },
  {
    icon: '📊',
    title: 'Insights en temps réel',
    description: 'Comprenez instantanément le climat de votre organisation avec des données claires.'
  },
  {
    icon: '🎯',
    title: 'Actions ciblées',
    description: 'Identifiez rapidement les signaux faibles et agissez avant que ça devienne critique.'
  },
  {
    icon: '🔒',
    title: 'Anonymat garanti',
    description: 'Architecture pensée pour protéger l\'identité de vos collaborateurs. Toujours.'
  },
  {
    icon: '✨',
    title: 'Simple d\'utilisation',
    description: 'Pas besoin de formation. Intuitif dès le premier jour, sur mobile et desktop.'
  },
  {
    icon: '🚀',
    title: 'Déploiement rapide',
    description: 'Opérationnel en quelques minutes. Vos équipes peuvent commencer immédiatement.'
  }
];

const testimonials = [
  {
    name: 'Sophie Durand',
    role: 'DRH chez Doctolib',
    text: 'Depuis qu\'on utilise MoodFlow, on a vraiment vu la différence. Les gens osent enfin dire ce qu\'ils ressentent. C\'est devenu un réflexe quotidien.'
  },
  {
    name: 'Thomas Rivière',
    role: 'CEO chez Alan',
    text: 'Le retour sur investissement est impressionnant. En 3 mois, on a réduit le turnover de 35% et l\'engagement a explosé.'
  },
  {
    name: 'Marie Leclerc',
    role: 'Manager chez Blablacar',
    text: 'L\'interface est tellement simple que tout le monde l\'utilise. Même les plus réticents à la tech. C\'est rare de voir ça.'
  },
  {
    name: 'Alexandre Chen',
    role: 'Head of People chez Qonto',
    text: 'MoodFlow nous a permis d\'anticiper des problèmes qu\'on n\'aurait jamais vus autrement. Un vrai game changer.'
  }
];

const companyLogos = [
  {
    name: 'Spotify',
    svg: '<svg viewBox="0 0 168 168" class="h-full"><path fill="currentColor" d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.802c-1.89 3.072-5.91 4.042-8.98 2.152-22.51-13.836-56.823-17.843-83.448-9.759-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.003zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"/></svg>'
  },
  {
    name: 'Airbnb',
    svg: '<svg viewBox="0 0 2500 2500" class="h-full"><path fill="currentColor" d="M1237.2 2344.7c-183.1 0-336.4-49.7-433.9-137.8-84.2-76-131.3-179-131.3-297.2 0-118.2 47.1-221.2 137.8-297.2l636.7-532.2c90.7-76 222.1-76 312.8 0l636.7 532.2c90.7 76 137.8 179 137.8 297.2 0 118.2-47.1 221.2-131.3 297.2-97.5 88.1-250.8 137.8-433.9 137.8H1237.2zm0-1751.5c-183.1 0-336.4 49.7-433.9 137.8-84.2 76-131.3 179-131.3 297.2s47.1 221.2 137.8 297.2l636.7 532.2c90.7 76 222.1 76 312.8 0l636.7-532.2c90.7-76 137.8-179 137.8-297.2s-47.1-221.2-131.3-297.2c-97.5-88.1-250.8-137.8-433.9-137.8H1237.2z"/></svg>'
  },
  {
    name: 'Stripe',
    svg: '<svg viewBox="0 0 60 25" class="h-full"><path fill="currentColor" fill-rule="evenodd" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 013.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 01-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 01-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 00-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z" clip-rule="evenodd"/></svg>'
  },
  {
    name: 'Notion',
    svg: '<svg viewBox="0 0 100 100" class="h-full"><path fill="currentColor" d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"/></svg>'
  },
  {
    name: 'Figma',
    svg: '<svg viewBox="0 0 200 300" class="h-full"><path fill="currentColor" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/><path fill="currentColor" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/><path fill="currentColor" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/><path fill="currentColor" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/><path fill="currentColor" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/></svg>'
  },
  {
    name: 'Slack',
    svg: '<svg viewBox="0 0 127 127" class="h-full"><path fill="currentColor" d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"/><path fill="currentColor" d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z"/><path fill="currentColor" d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z"/><path fill="currentColor" d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z"/></svg>'
  }
];

const goToRegister = () => {
  router.push('/register');
};

const goToPricing = () => {
  router.push('/pricing');
};

const goToDemo = () => {
  router.push('/demo');
};

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};

const getFeatureGradient = (index: number) => {
  const gradients = [
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-orange-400 to-purple-500',
    'bg-gradient-to-br from-yellow-400 to-orange-500',
    'bg-gradient-to-br from-purple-400 to-pink-500',
    'bg-gradient-to-br from-orange-500 to-yellow-500'
  ];
  return gradients[index % gradients.length];
};

// Auto-scroll testimonials
let testimonialInterval: number;

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    { threshold: 0.1 }
  );

  if (featuresSection.value) {
    observer.observe(featuresSection.value);
  }

  // Auto-scroll testimonials every 5 seconds
  testimonialInterval = window.setInterval(() => {
    currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length;
  }, 5000);

  onUnmounted(() => {
    observer.disconnect();
    if (testimonialInterval) {
      clearInterval(testimonialInterval);
    }
  });
});
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

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gradient-text {
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

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

.animate-scroll {
  animation: scroll 40s linear infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-text 4s ease-in-out infinite;
}

.animate-gradient-flow {
  background-size: 300% 300%;
  animation: gradientFlow 3s ease infinite;
}

@keyframes gradientFlow {
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

</style>
