<template>
  <UApp>
    <UError :error="error" />
  </UApp>
</template>

<script setup lang="ts">
  import type { NuxtError } from "#app"

  const props = defineProps<{ error: NuxtError }>()
</script>
