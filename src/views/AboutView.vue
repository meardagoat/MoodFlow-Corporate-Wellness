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
      <div class="absolute top-2/3 right-1/3 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl animate-blob animation-delay-6000"></div>
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
            À propos
          </h1>
          <p class="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            L'histoire derrière MoodFlow. 
            <span class="text-orange-600 font-semibold">Des humains, pour des humains.</span>
          </p>
        </div>

        <!-- Mission Section -->
        <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 mb-16">
          <div class="flex items-start gap-8">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-100 to-purple-100 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <div class="flex-1">
              <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors">
                Notre mission
              </h2>
              <p class="text-xl text-neutral-700 leading-relaxed mb-6">
                MoodFlow est né d'une conviction simple : le bien-être au travail ne devrait pas être compliqué. 
                On a voulu créer un outil qui permet aux équipes de s'exprimer librement, aux managers de comprendre 
                leurs équipes, et aux entreprises de prendre soin de leurs collaborateurs.
              </p>
              <p class="text-lg text-neutral-600 leading-relaxed">
                Le tout sans bureaucratie, sans lourdeur, juste de l'authenticité. Parce qu'on croit que 
                <span class="text-orange-600 font-semibold">l'écoute sincère peut transformer une entreprise de l'intérieur.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 text-center mb-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            L'équipe
          </h2>
          
          <div class="text-center mb-12">
            <p class="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              On est une petite équipe passionnée qui croit au pouvoir de l'écoute et de l'empathie en entreprise.
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(member, index) in team" :key="index" 
                 class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {{ member.initial }}
                </div>
                <h3 class="font-bold text-neutral-900 text-2xl mb-2 group-hover:text-orange-600 transition-colors">
                  {{ member.name }}
                </h3>
                <p class="text-orange-600 font-semibold text-lg mb-4">{{ member.role }}</p>
                <p class="text-neutral-600 leading-relaxed group-hover:text-neutral-800 transition-colors">
                  {{ member.description }}
                </p>
                
                <!-- Social links -->
                <div class="flex justify-center gap-3 mt-6">
                  <a v-if="member.linkedin" :href="member.linkedin" 
                     class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                    💼
                  </a>
                  <a v-if="member.github" :href="member.github" 
                     class="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                    💻
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 text-center mb-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            Nos valeurs
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(value, index) in values" :key="index" 
                 class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div class="flex items-start gap-6">
                <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {{ value.icon }}
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-neutral-900 text-2xl mb-3 group-hover:text-orange-600 transition-colors">
                    {{ value.title }}
                  </h3>
                  <p class="text-neutral-700 leading-relaxed group-hover:text-neutral-800 transition-colors">
                    {{ value.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Story Section -->
        <div class="group bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/60 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 mb-20">
          <div class="flex items-start gap-8">
            <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              📖
            </div>
            <div class="flex-1">
              <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 group-hover:text-orange-600 transition-colors">
                Notre histoire
              </h2>
              <div class="space-y-6 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Tout a commencé par une observation simple : dans nos expériences professionnelles, 
                  on a vu trop d'équipes souffrir en silence. Des managers qui ne savaient pas comment 
                  leurs équipes allaient, des collaborateurs qui n'osaient pas s'exprimer, des entreprises 
                  qui découvraient les problèmes trop tard.
                </p>
                <p>
                  On s'est dit qu'il devait y avoir une meilleure façon. Une façon plus humaine, plus simple, 
                  plus authentique. C'est comme ça qu'est né MoodFlow : un outil qui permet à chacun de 
                  s'exprimer librement, sans jugement, dans un environnement sécurisé.
                </p>
                <p>
                  Aujourd'hui, des milliers d'entreprises nous font confiance. Mais notre mission reste la même : 
                  <span class="text-orange-600 font-semibold">rendre le bien-être au travail accessible à tous.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-bold text-neutral-900 text-center mb-12 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
            MoodFlow en chiffres
          </h2>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div v-for="(stat, index) in stats" :key="index" 
                 class="group text-center bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {{ stat.icon }}
              </div>
              <div class="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 group-hover:text-orange-600 transition-colors">
                {{ stat.value }}
              </div>
              <div class="text-neutral-600 group-hover:text-neutral-800 transition-colors">
                {{ stat.label }}
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
              Rejoignez l'aventure MoodFlow
            </h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
import logoVideo from '../assets/MoodFlow_final_logo.mp4';
import logoImage from '../assets/MoodFlow_final_logo.png';

const team = [
  {
    name: 'Abdoul',
    initial: 'A',
    role: 'Lead Developer',
    description: 'Architecte technique passionné, il veille à ce que MoodFlow soit robuste, sécurisé et évolutif. Expert en backend et en sécurité des données.',
    linkedin: 'https://linkedin.com/in/abdoul',
    github: 'https://github.com/abdoul'
  },
  {
    name: 'Mathieu',
    initial: 'M',
    role: 'Frontend Developer',
    description: 'Maître de l\'interface utilisateur, il transforme nos idées en expériences fluides et intuitives. Passionné par l\'UX et les animations.',
    linkedin: 'https://linkedin.com/in/mathieu',
    github: 'https://github.com/mathieu'
  },
  {
    name: 'Amaury',
    initial: 'A',
    role: 'UI/UX Designer',
    description: 'Créateur de l\'identité visuelle de MoodFlow, il imagine des interfaces qui parlent au cœur. Expert en design thinking et en psychologie des couleurs.',
    linkedin: 'https://linkedin.com/in/amaury',
    github: null
  },
  {
    name: 'Jerobel',
    initial: 'J',
    role: 'Backend Developer',
    description: 'Génie de l\'infrastructure, il s\'assure que MoodFlow fonctionne parfaitement 24h/24. Spécialiste des bases de données et de l\'optimisation.',
    linkedin: 'https://linkedin.com/in/jerobel',
    github: 'https://github.com/jerobel'
  },
  {
    name: 'Mehmet',
    initial: 'M',
    role: 'Full Stack Developer',
    description: 'Polyvalent et créatif, il fait le lien entre frontend et backend. Toujours à l\'affût des dernières technologies pour améliorer MoodFlow.',
    linkedin: 'https://linkedin.com/in/mehmet',
    github: 'https://github.com/mehmet'
  }
];

const values = [
  {
    icon: '🔒',
    title: 'Confidentialité',
    description: 'La vie privée de vos collaborateurs est sacrée. On ne fait aucun compromis là-dessus. Chaque ligne de code est pensée pour protéger vos données.'
  },
  {
    icon: '💙',
    title: 'Empathie',
    description: 'On croit que l\'écoute sincère peut transformer une entreprise de l\'intérieur. MoodFlow est conçu pour créer du lien, pas de la distance.'
  },
  {
    icon: '✨',
    title: 'Simplicité',
    description: 'Pas besoin de 10 clics pour exprimer ce qu\'on ressent. On garde ça simple, intuitif, accessible à tous, même aux moins tech-savvy.'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'On repense le bien-être en entreprise avec des outils modernes et accessibles. On innove pour que la technologie serve l\'humain.'
  }
];

const stats = [
  {
    icon: '🏢',
    value: '10K+',
    label: 'Entreprises'
  },
  {
    icon: '👥',
    value: '2M+',
    label: 'Utilisateurs'
  },
  {
    icon: '😊',
    value: '98%',
    label: 'Satisfaction'
  },
  {
    icon: '🌍',
    value: '15',
    label: 'Pays'
  }
];
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

.animation-delay-6000 {
  animation-delay: 6s;
}

.animate-gradient-flow {
  background-size: 300% 300%;
  animation: gradient-flow 3s ease infinite;
}
</style>