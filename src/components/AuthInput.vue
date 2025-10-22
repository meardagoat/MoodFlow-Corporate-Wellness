<template>
  <div class="space-y-2">
    <label 
      :for="id" 
      class="block text-sm font-semibold text-gray-700 ml-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative group">
      <!-- Icon gauche -->
      <div 
        v-if="icon"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors"
      >
        <component :is="icon" class="w-5 h-5" />
      </div>

      <!-- Input -->
      <input
        :id="id"
        :type="currentType"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :required="required"
        :minlength="minlength"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full px-4 py-3.5 bg-white/80 backdrop-blur border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 font-medium"
        :class="{
          'pl-12': icon,
          'pr-12': type === 'password'
        }"
      />

      <!-- Toggle password visibility -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
      >
        <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
        </svg>
      </button>

      <!-- Focus ring animé -->
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-focus-within:opacity-20 blur transition-opacity pointer-events-none"></div>
    </div>

    <!-- Helper text -->
    <p v-if="helper" class="text-xs text-gray-500 ml-1">{{ helper }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  id: string;
  label: string;
  type: string;
  modelValue: string;
  required?: boolean;
  minlength?: number;
  placeholder?: string;
  autocomplete?: string;
  helper?: string;
  icon?: any;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();

const showPassword = ref(false);

const currentType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>

