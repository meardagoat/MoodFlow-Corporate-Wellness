// filepath: src/components/AdminPanel.vue
<template>
  <div class="admin-panel">
    <h2>Admin Panel</h2>
    <p>Créer / gérer utilisateurs (actions serveurs uniquement)</p>

    <label>Email</label>
    <input v-model="email" type="email" />

    <label>Password</label>
    <input v-model="password" type="password" />

    <label>Rôle</label>
    <select v-model="role">
      <option value="employee">Employee</option>
      <option value="manager">Manager</option>
      <option value="system_admin">System Admin</option>
    </select>

    <button @click="create">Créer</button>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUser } from '@/lib/auth'

const email = ref('')
const password = ref('')
const role = ref('employee')
const msg = ref('')

async function create() {
  msg.value = ''
  try {
    const { data, error } = await createUser(email.value, password.value, role.value)
    if (error) {
      msg.value = 'Erreur: ' + JSON.stringify(error)
    } else {
      msg.value = 'Créé avec succès.'
      email.value = ''
      password.value = ''
      role.value = 'employee'
    }
  } catch (e) {
    msg.value = String(e)
  }
}
</script>

<style scoped>
.admin-panel { max-width: 640px; margin: 0 auto; padding: 16px; }
label { display: block; margin-top: 8px; }
input, select { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; }
button { margin-top: 12px; padding: 8px 12px; }
</style>
