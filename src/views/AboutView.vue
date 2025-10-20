<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          À propos
        </h1>
        <p class="text-xl text-neutral-600">L'histoire derrière MoodFlow</p>
      </div>

      <!-- Content -->
      <div class="space-y-12">
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Notre mission</h2>
          <p class="text-lg text-neutral-700 leading-relaxed">
            MoodFlow est né d'une conviction simple : le bien-être au travail ne devrait pas être compliqué. 
            On a voulu créer un outil qui permet aux équipes de s'exprimer librement, aux managers de comprendre 
            leurs équipes, et aux entreprises de prendre soin de leurs collaborateurs. Le tout sans bureaucratie, 
            sans lourdeur, juste de l'authenticité.
          </p>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-3xl font-bold text-neutral-900 mb-6">L'équipe</h2>
          <p class="text-lg text-neutral-700 leading-relaxed mb-8">
            On est une petite équipe passionnée qui croit au pouvoir de l'écoute et de l'empathie en entreprise.
          </p>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="member in team" :key="member.name" 
                 class="flex items-center gap-4 p-4 bg-white/40 rounded-2xl hover:bg-white/60 transition-all">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {{ member.initial }}
              </div>
              <div>
                <h3 class="font-bold text-neutral-900 text-lg">{{ member.name }}</h3>
                <p class="text-neutral-600">{{ member.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-3xl font-bold text-neutral-900 mb-4">Nos valeurs</h2>
          <div class="space-y-4">
            <div v-for="value in values" :key="value.title" class="flex gap-4">
              <div class="text-3xl">{{ value.icon }}</div>
              <div>
                <h3 class="font-bold text-neutral-900 text-xl mb-2">{{ value.title }}</h3>
                <p class="text-neutral-700">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back button -->
        <div class="text-center pt-8">
          <router-link to="/" 
                       class="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const team = [
  { name: 'Abdoul', initial: 'A', role: 'Lead Developer' },
  { name: 'Mathieu', initial: 'M', role: 'Frontend Developer' },
  { name: 'Amaury', initial: 'A', role: 'UI/UX Designer' },
  { name: 'Jerobel', initial: 'J', role: 'Backend Developer' },
  { name: 'Mehmet', initial: 'M', role: 'Full Stack Developer' }
];

const values = [
  {
    icon: '🔒',
    title: 'Confidentialité',
    description: 'La vie privée de vos collaborateurs est sacrée. On ne fait aucun compromis là-dessus.'
  },
  {
    icon: '💙',
    title: 'Empathie',
    description: 'On croit que l\'écoute sincère peut transformer une entreprise de l\'intérieur.'
  },
  {
    icon: '✨',
    title: 'Simplicité',
    description: 'Pas besoin de 10 clics pour exprimer ce qu\'on ressent. On garde ça simple.'
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'On repense le bien-être en entreprise avec des outils modernes et accessibles.'
  }
];
</script>

