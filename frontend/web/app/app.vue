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
  defineOgImageComponent("Nuxt", {
    headline: "/",
    title: "西方コーストストーリー",
    description: "技術記事をまとめる学習用アプリ"
  })
  definePageMeta({ colorMode: "dark" })
</script>
