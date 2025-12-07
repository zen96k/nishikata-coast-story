<template>
  <div>
    <UApp>
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ colorMode: "dark" })
</script>
