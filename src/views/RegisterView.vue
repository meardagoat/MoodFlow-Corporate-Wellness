// filepath: src/views/RegisterView.vue
<template>
  <div class="register-view">
    <h2>Inscription</h2>

    <label>Email</label>
    <input v-model="email" type="email" />

    <label>Mot de passe</label>
    <input v-model="password" type="password" />

    <div v-if="canChooseRole">
      <label>Rôle</label>
      <select v-model="selectedRole">
        <option value="employee">Employee</option>
        <option v-if="isManagerOrAdmin" value="manager">Manager</option>
        <option v-if="isSystemAdmin" value="system_admin">System Admin</option>
      </select>
    </div>

    <button @click="submit">S'inscrire</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { signUpPublic, createUser, isSystemAdmin, canCreateRole } from '@/lib/auth'
import { currentProfile } from '@/lib/store'

const email = ref('')
const password = ref('')
const selectedRole = ref('employee')
const message = ref('')

const isSysAdmin = isSystemAdmin
const isManagerOrAdmin = computed(() => {
  const r = currentProfile?.value?.role
  return r === 'manager' || r === 'system_admin'
})
const canChooseRole = computed(() => !!currentProfile?.value)

async function submit() {
  message.value = ''
  try {
    if (!currentProfile?.value) {
      // inscription publique : toujours employee
      await signUpPublic(email.value, password.value)
      message.value = 'Inscription envoyée. Vérifiez votre email.'
      return
    }

    // utilisateur connecté crée un autre user
    if (!canCreateRole(currentProfile.value.role, selectedRole.value)) {
      message.value = 'Permissions insuffisantes pour créer ce rôle.'
      return
    }

    const { data, error } = await createUser(email.value, password.value, selectedRole.value)
    if (error) {
      message.value = 'Erreur création: ' + JSON.stringify(error)
    } else {
      message.value = 'Utilisateur créé avec succès.'
    }
  } catch (err) {
    message.value = String(err)
  }
}
</script>

<style scoped>
/* styles minimaux */
.register-view { max-width: 480px; margin: 0 auto; padding: 16px; }
label { display: block; margin-top: 8px; }
input, select { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; }
button { margin-top: 12px; padding: 8px 12px; }
</style>
