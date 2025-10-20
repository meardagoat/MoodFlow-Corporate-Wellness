// filepath: src/views/ProfileView.vue
<template>
  <div class="profile-view">
    <h2>Mon profil</h2>

    <div class="profile-info">
      <!-- Exemple d'affichage simplifié -->
      <p>Nom: {{ currentProfile?.value?.email || '—' }}</p>
      <p>Rôle: {{ currentProfile?.value?.role || '—' }}</p>
    </div>

    <div v-if="isSystemAdmin">
      <router-link to="/admin">Accéder à l'Admin Panel</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentProfile } from '@/lib/store'
import { isSystemAdmin } from '@/lib/auth'

const isSystemAdmin = isSystemAdmin
</script>

<style scoped>
.profile-view { max-width: 720px; margin: 0 auto; padding: 16px; }
.profile-info p { margin: 4px 0; }
</style>
