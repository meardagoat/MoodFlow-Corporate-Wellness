// filepath: src/views/RegisterView.vue
<template>
  <div class="register-view">
    <h2>Inscription</h2>

    <label>Email</label>
    <input v-model="email" type="email" />

    <label>Mot de passe</label>
    <input v-model="password" type="password" />

    <label>Service (optionnel)</label>
    <input v-model="service" type="text" placeholder="Ex: my-company" />

    <!-- Afficher le sélecteur uniquement pour utilisateurs connectés qui peuvent créer des rôles -->
    <div v-if="currentProfile?.value && availableRoles.length">
      <label>Rôle</label>
      <select v-model="selectedRole">
        <option v-for="r in availableRoles" :key="r" :value="r">{{ r }}</option>
      </select>
    </div>

    <button @click="submit">S'inscrire</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { signUpPublic, createUser, isSystemAdmin, canCreateRole } from '@/lib/auth'
import { currentProfile } from '@/lib/store'

const email = ref('')
const password = ref('')
const service = ref('')
const selectedRole = ref('employee')
const message = ref('')

// Rôles disponibles selon rôle du créateur
const availableRoles = computed(() => {
  const r = currentProfile?.value?.role
  if (!r) return []
  if (r === 'system_admin') return ['employee', 'manager', 'system_admin']
  if (r === 'manager') return ['employee']
  return []
})

// initialiser selectedRole si nécessaire
watch(availableRoles, (val) => {
  if (val && val.length && !val.includes(selectedRole.value)) {
    selectedRole.value = val[0]
  }
})

async function submit() {
  message.value = ''
  try {
    if (!currentProfile?.value) {
      // inscription publique : toujours employee
      await signUpPublic(email.value, password.value, service.value || undefined)
      message.value = 'Inscription envoyée. Vérifiez votre email.'
      return
    }

    // vérification des permissions côté client avant appel
    if (!canCreateRole(currentProfile.value.role, selectedRole.value)) {
      message.value = 'Permissions insuffisantes pour créer ce rôle.'
      return
    }

    const { data, error } = await createUser(email.value, password.value, selectedRole.value, service.value || undefined)
    if (error) {
      message.value = 'Erreur création: ' + JSON.stringify(error)
    } else {
      message.value = 'Utilisateur créé avec succès.'
      email.value = ''
      password.value = ''
      service.value = ''
      // reset selectedRole to a safe default
      if (availableRoles.value.length) selectedRole.value = availableRoles.value[0]
    }
  } catch (err) {
    message.value = String(err)
  }
}
</script>

<style scoped>
.register-view { max-width: 480px; margin: 0 auto; padding: 16px; }
label { display: block; margin-top: 8px; }
input, select { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; }
button { margin-top: 12px; padding: 8px 12px; }
</style>
