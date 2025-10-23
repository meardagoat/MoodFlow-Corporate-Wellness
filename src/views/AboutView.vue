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
              À propos de MoodFlow
            </span>
          </h1>
          <p class="text-2xl md:text-3xl text-neutral-600 max-w-5xl mx-auto leading-relaxed mb-12">
            Notre mission est de fournir à chaque entreprise un accès à un support continu pour le bien-être mental de ses équipes.
          </p>
          
          <!-- Mission indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-neutral-500">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span class="text-lg font-medium">Bien-être mental</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span class="text-lg font-medium">Support continu</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-lg font-medium">Équipes saines</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Who we are - Enhanced -->
    <section class="py-24 md:py-40 px-4 md:px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <h2 class="text-5xl md:text-6xl font-bold mb-8">
              <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
                Qui nous sommes
              </span>
            </h2>
            <p class="text-xl text-neutral-600 leading-relaxed mb-8">
              Considérez MoodFlow comme votre guide de confiance pour un meilleur bien-être en entreprise. 
              Nous sommes là pour vous, quand vous en avez besoin, où que vous soyez, vous aidant à traverser 
              les moments difficiles et à trouver la joie dans chaque journée de travail.
            </p>
            <p class="text-xl text-neutral-600 leading-relaxed mb-8">
              Notre équipe d'experts va des cliniciens en santé mentale aux développeurs primés, 
              travaillant ensemble pour aider des milliers d'entreprises dans le monde à être plus saines et productives.
            </p>
            
            <!-- Key stats -->
            <div class="grid grid-cols-2 gap-6 mt-12">
              <div class="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                <div class="text-3xl font-bold text-orange-600 mb-2">1000+</div>
                <div class="text-neutral-600">Entreprises</div>
              </div>
              <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div class="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                <div class="text-neutral-600">Employés</div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="group relative bg-gradient-to-br from-orange-100 to-purple-100 rounded-3xl p-12 h-96 flex items-center justify-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-200/50 to-purple-200/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 text-center">
                <div class="w-40 h-40 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-7xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  💙
                </div>
                <h3 class="text-3xl font-bold text-neutral-900 mb-3">Notre Mission</h3>
                <p class="text-xl text-neutral-600">Transformer le bien-être en entreprise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What we do -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="relative order-2 lg:order-1">
            <div class="bg-gradient-to-br from-purple-100 to-orange-100 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 bg-gradient-to-br from-purple-500 to-orange-600 rounded-full flex items-center justify-center text-white text-6xl font-bold mx-auto mb-6">
                  🎯
                </div>
                <h3 class="text-2xl font-bold text-neutral-900 mb-2">Notre Approche</h3>
                <p class="text-neutral-600">Solutions éprouvées et personnalisées</p>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-4xl md:text-5xl font-bold mb-8">
              <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
                Ce que nous faisons
              </span>
            </h2>
            <p class="text-lg text-neutral-600 leading-relaxed mb-8">
              Grâce à des outils d'expression libre et de mindfulness basés sur des preuves, 
              du coaching en santé mentale et des insights en temps réel, MoodFlow vous aide 
              à créer des habitudes transformatrices pour soutenir le bien-être mental de vos équipes 
              et trouver un environnement de travail plus sain et plus heureux.
            </p>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <span class="text-neutral-700">Expression libre et anonyme</span>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <span class="text-neutral-700">Insights en temps réel</span>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <span class="text-neutral-700">Actions ciblées et personnalisées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How we do it -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Comment nous procédons
            </span>
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            Nos quatre valeurs guident nos décisions et notre façon d'opérer au quotidien
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🎯
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Faire compter la mission</h3>
            <p class="text-neutral-600">Chaque décision est guidée par notre mission de transformer le bien-être en entreprise.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🔄
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Itérer vers l'excellence</h3>
            <p class="text-neutral-600">Nous améliorons constamment nos solutions basées sur vos retours.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              🎯
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Assumer le résultat</h3>
            <p class="text-neutral-600">Nous nous engageons pleinement dans le succès de votre transformation.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6">
              💙
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Se connecter avec courage</h3>
            <p class="text-neutral-600">Nous créons des liens authentiques avec nos clients et leurs équipes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
            <span class="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent animate-gradient-flow">
              MoodFlow en chiffres
            </span>
          </h2>
        </div>
        
        <div class="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div class="text-6xl md:text-7xl font-bold text-white mb-4">200+</div>
            <div class="text-xl text-white/90">Entreprises dans le monde</div>
          </div>
          
          <div>
            <div class="text-6xl md:text-7xl font-bold text-white mb-4">100K+</div>
            <div class="text-xl text-white/90">Vies transformées</div>
          </div>
          
          <div>
            <div class="text-6xl md:text-7xl font-bold text-white mb-4">70K+</div>
            <div class="text-xl text-white/90">Téléchargements d'app</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Evidence-based outcomes -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Résultats basés sur des preuves
            </span>
          </h2>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-600 mb-2">32%</div>
            <div class="text-neutral-600">Réduction du stress</div>
          </div>
          
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-600 mb-2">14%</div>
            <div class="text-neutral-600">Amélioration de l'engagement</div>
          </div>
          
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-600 mb-2">59%</div>
            <div class="text-neutral-600">Satisfaction des employés</div>
          </div>
          
          <div class="text-center">
            <div class="text-5xl font-bold text-orange-600 mb-2">70%</div>
            <div class="text-neutral-600">Rétention des talents</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Team -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-neutral-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Notre équipe dirigeante
            </span>
          </h2>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(member, index) in leadership" :key="index" class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
              {{ member.initial }}
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">{{ member.name }}</h3>
            <p class="text-orange-600 font-semibold mb-4">{{ member.role }}</p>
            <p class="text-neutral-600 text-sm">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Team -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-8">
            <span class="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-gradient-flow">
              Notre équipe
            </span>
          </h2>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(member, index) in team" :key="index" class="text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              {{ member.initial }}
            </div>
            <h3 class="text-lg font-bold text-neutral-900 mb-2">{{ member.name }}</h3>
            <p class="text-orange-600 font-semibold mb-4">{{ member.role }}</p>
            <p class="text-neutral-600 text-sm">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-orange-500 via-purple-500 to-orange-600">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
          <span class="bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent animate-gradient-flow">
            Rejoignez l'aventure MoodFlow
          </span>
        </h2>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Découvrez comment MoodFlow peut transformer votre entreprise et le bien-être de vos équipes
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Scroll vers le haut au chargement de la page
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const leadership = [
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    description: 'Fondateur de MoodFlow, visionnaire du bien-être en entreprise avec plus de 10 ans d\'expérience.'
  },
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Chief Clinical Officer',
    description: 'Experte en santé mentale, elle s\'assure de la qualité et de l\'efficacité de nos solutions.'
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Chief Technology Officer',
    description: 'Architecte technique passionné, il veille à la sécurité et à l\'évolutivité de notre plateforme.'
  }
];

const team = [
  {
    name: 'Abdoul',
    initial: 'A',
    role: 'Lead Developer',
    description: 'Architecte technique passionné, expert en backend et sécurité des données.'
  },
  {
    name: 'Mathieu',
    initial: 'M',
    role: 'Frontend Developer',
    description: 'Maître de l\'interface utilisateur, passionné par l\'UX et les animations.'
  },
  {
    name: 'Amaury',
    initial: 'A',
    role: 'UI/UX Designer',
    description: 'Créateur de l\'identité visuelle, expert en design thinking et psychologie des couleurs.'
  },
  {
    name: 'Jerobel',
    initial: 'J',
    role: 'Backend Developer',
    description: 'Génie de l\'infrastructure, spécialiste des bases de données et optimisation.'
  },
  {
    name: 'Mehmet',
    initial: 'M',
    role: 'Full Stack Developer',
    description: 'Polyvalent et créatif, toujours à l\'affût des dernières technologies.'
  }
];
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