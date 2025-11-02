<template>
  <UApp>
    <UError :error="error" />
  </UApp>
</template>

<script setup lang="ts">
  import type { NuxtError } from "#app"

  definePageMeta({ colorMode: "dark" })

  const props = defineProps<{ error: NuxtError }>()
</script>
