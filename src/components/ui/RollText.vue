<template>
  <span class="roll"><span>{{ text }}</span><span aria-hidden="true">{{ text }}</span></span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
