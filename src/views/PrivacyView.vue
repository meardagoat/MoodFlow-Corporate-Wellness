<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-cream-50 to-purple-50 py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
          Politique de confidentialité
        </h1>
        <p class="text-xl text-neutral-600">Votre vie privée est notre priorité</p>
      </div>

      <!-- Content -->
      <div class="space-y-8">
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-2xl font-bold text-neutral-900 mb-4">Notre engagement</h2>
          <p class="text-lg text-neutral-700 leading-relaxed">
            Chez MoodFlow, on prend la confidentialité très au sérieux. C'est pas juste une obligation légale 
            pour nous, c'est au cœur de ce qu'on fait. Voici comment on protège vos données.
          </p>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-2xl font-bold text-neutral-900 mb-4">Données collectées</h2>
          <div class="space-y-4 text-neutral-700">
            <div>
              <h3 class="font-semibold mb-2">Informations de compte :</h3>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Email (uniquement pour la connexion)</li>
                <li>Département/Service</li>
                <li>Rôle (employé ou manager)</li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-2">Données d'usage :</h3>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Humeurs partagées (anonymisées)</li>
                <li>Messages dans l'app (chiffrés)</li>
                <li>Statistiques d'utilisation</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-2xl font-bold text-neutral-900 mb-4">Comment on protège vos données</h2>
          <div class="space-y-4">
            <div v-for="protection in protections" :key="protection.title" class="flex gap-4">
              <div class="text-2xl">{{ protection.icon }}</div>
              <div>
                <h3 class="font-bold text-neutral-900 mb-1">{{ protection.title }}</h3>
                <p class="text-neutral-700">{{ protection.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-2xl font-bold text-neutral-900 mb-4">Vos droits</h2>
          <p class="text-neutral-700 leading-relaxed mb-4">
            Conformément au RGPD, vous avez le droit de :
          </p>
          <ul class="list-disc list-inside space-y-2 text-neutral-700 ml-4">
            <li>Accéder à vos données personnelles</li>
            <li>Rectifier vos informations</li>
            <li>Supprimer votre compte et toutes vos données</li>
            <li>Exporter vos données</li>
            <li>Vous opposer au traitement de vos données</li>
          </ul>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-2xl font-bold text-neutral-900 mb-4">Partage des données</h2>
          <p class="text-neutral-700 leading-relaxed">
            On ne vend jamais vos données. Jamais. Les seules personnes qui y ont accès sont les managers 
            de votre entreprise (et seulement sous forme de statistiques agrégées et anonymisées). 
            Vos messages et humeurs individuels restent privés.
          </p>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/60">
          <h2 class="text-2xl font-bold text-neutral-900 mb-4">Questions ?</h2>
          <p class="text-neutral-700 leading-relaxed mb-4">
            Si vous avez des questions sur notre politique de confidentialité ou vos données, 
            contactez-nous à :
          </p>
          <a href="mailto:privacy@moodflow.app" 
             class="text-orange-600 hover:text-orange-700 font-semibold text-lg">
            privacy@moodflow.app
          </a>
        </div>

        <!-- Back button -->
        <div class="text-center pt-8">
          <router-link to="/" 
                       class="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
            Retour à l'accueil
          </router-link>
        </div>
      </div>

      <div class="mt-12 text-center text-neutral-500 text-sm">
        <p>Dernière mise à jour : 20 octobre 2025</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const protections = [
  {
    icon: '🔐',
    title: 'Chiffrement de bout en bout',
    description: 'Toutes les communications sont chiffrées. Même nous, on ne peut pas lire vos messages.'
  },
  {
    icon: '🎭',
    title: 'Anonymisation',
    description: 'Les humeurs et posts sont liés à un ID anonyme, pas à votre identité réelle.'
  },
  {
    icon: '🇪🇺',
    title: 'Hébergement européen',
    description: 'Vos données restent en Europe, conformes au RGPD.'
  },
  {
    icon: '🛡️',
    title: 'Accès limité',
    description: 'Seules les personnes autorisées peuvent accéder aux données (et uniquement les leurs).'
  }
];
</script>

