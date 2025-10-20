<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-purple-50">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated background blobs -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-float-slow"></div>
        <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div class="animate-fade-in">
          <h1 class="text-7xl md:text-8xl font-bold text-neutral-900 mb-6 leading-tight">
            Le bien-être au travail,
            <span class="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              simplifié
            </span>
          </h1>
          <p class="text-2xl md:text-3xl text-neutral-600 mb-12 font-light max-w-3xl mx-auto">
            MoodFlow aide vos équipes à cultiver leur santé mentale avec une approche moderne et bienveillante
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button @click="goToRegister" class="btn-primary text-lg px-10 py-4 shadow-2xl">
              Commencer gratuitement
            </button>
            <button @click="scrollToFeatures" class="btn-ghost text-lg px-10 py-4">
              En savoir plus
            </button>
          </div>
        </div>

        <!-- Hero Image/Animation -->
        <div class="mt-20 animate-scale-in" style="animation-delay: 0.3s">
          <div class="relative">
            <div class="card-glass p-8 max-w-4xl mx-auto">
              <div class="grid grid-cols-5 gap-4 mb-6">
                <div v-for="i in 5" :key="i" 
                     class="aspect-square rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 animate-pulse-soft"
                     :style="`animation-delay: ${i * 0.1}s`">
                </div>
              </div>
              <div class="h-3 bg-gradient-to-r from-orange-200 to-purple-200 rounded-full mb-3"></div>
              <div class="h-3 bg-gradient-to-r from-purple-200 to-yellow-200 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="featuresSection" class="py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Tout ce dont vos équipes ont besoin
          </h2>
          <p class="text-xl text-neutral-600 font-light max-w-2xl mx-auto">
            Une solution complète pour améliorer le bien-être et la productivité de vos collaborateurs
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" 
               class="card hover:scale-105 transition-all duration-500"
               :class="{ 'animate-slide-up': isVisible }"
               :style="`animation-delay: ${index * 0.1}s`">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center mb-6 text-3xl">
              {{ feature.icon }}
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-4">{{ feature.title }}</h3>
            <p class="text-neutral-600 font-light leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-32 px-6 bg-gradient-to-br from-purple-50 to-orange-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Ils nous font confiance
          </h2>
          <p class="text-xl text-neutral-600 font-light">
            Découvrez ce que nos utilisateurs pensent de MoodFlow
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="card-solid">
            <div class="flex items-center mb-6">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 mr-4"></div>
              <div>
                <h4 class="font-bold text-neutral-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-neutral-600">{{ testimonial.role }}</p>
              </div>
            </div>
            <div class="flex mb-4">
              <span v-for="i in 5" :key="i" class="text-yellow-400 text-xl">★</span>
            </div>
            <p class="text-neutral-700 italic leading-relaxed">"{{ testimonial.text }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Companies Section -->
    <section class="py-32 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h3 class="text-xl text-neutral-600 font-light mb-12">
          Des entreprises innovantes utilisent MoodFlow
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60">
          <div v-for="(company, index) in companies" :key="index" 
               class="flex items-center justify-center hover:opacity-100 transition-opacity duration-300">
            <div class="text-4xl font-bold text-neutral-400">{{ company }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 px-6 bg-gradient-to-br from-orange-500 via-purple-500 to-pink-500 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          Prêt à transformer votre entreprise ?
        </h2>
        <p class="text-xl font-light mb-12 opacity-90">
          Rejoignez les milliers d'entreprises qui améliorent le bien-être de leurs équipes avec MoodFlow
        </p>
        <button @click="goToRegister" class="bg-white text-neutral-900 px-12 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl">
          Commencer maintenant
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 bg-neutral-900 text-white">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-neutral-400">&copy; 2025 MoodFlow. Cultivez votre bien-être au travail.</p>
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

const features = [
  {
    icon: '😊',
    title: 'Suivi des humeurs',
    description: 'Permettez à vos équipes d\'exprimer leur état d\'esprit quotidien de manière simple et anonyme.'
  },
  {
    icon: '📊',
    title: 'Analytics en temps réel',
    description: 'Visualisez la santé mentale de votre organisation avec des tableaux de bord intuitifs.'
  },
  {
    icon: '💬',
    title: 'Communication bienveillante',
    description: 'Favorisez les échanges anonymes et le soutien entre collègues dans un espace sûr.'
  },
  {
    icon: '🎯',
    title: 'Interventions ciblées',
    description: 'Identifiez rapidement les équipes qui ont besoin de soutien et agissez en conséquence.'
  },
  {
    icon: '🔒',
    title: 'Confidentialité totale',
    description: 'Les données de vos employés sont protégées avec les plus hauts standards de sécurité.'
  },
  {
    icon: '📱',
    title: 'Mobile-first',
    description: 'Une expérience fluide sur tous les appareils, accessible partout, à tout moment.'
  }
];

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'DRH chez TechCorp',
    text: 'MoodFlow a transformé notre approche du bien-être. Nos équipes se sentent enfin écoutées et comprises.'
  },
  {
    name: 'Thomas Dubois',
    role: 'CEO chez StartupXYZ',
    text: 'Depuis qu\'on utilise MoodFlow, on a vu une amélioration de 40% de l\'engagement des employés. Incroyable !'
  },
  {
    name: 'Marie Lefebvre',
    role: 'Manager chez Digital Co',
    text: 'L\'anonymat permet aux gens de s\'exprimer vraiment. C\'est exactement ce dont on avait besoin.'
  }
];

const companies = ['AIRBNB', 'SPOTIFY', 'STRIPE', 'NOTION', 'FIGMA', 'SLACK', 'UBER', 'TESLA'];

const goToRegister = () => {
  router.push('/register');
};

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};

// Intersection Observer for scroll animations
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

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style scoped>
/* Additional custom animations if needed */
</style>

