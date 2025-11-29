<template>
  <UHeader class="bg-teal-600">
    <template #title>
      <div>西方コーストストーリー</div>
    </template>
    <template #default>
      <UNavigationMenu :items="items" />
    </template>
    <template #right>
      <UButton
        color="neutral"
        target="_blank"
        variant="ghost"
        aria-label="GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/zen96k/nishikata-coast-story"
      />
    </template>
    <template #body>
      <UNavigationMenu
        :items="items"
        class="-mx-2.5"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from "@nuxt/ui"

  const route = useRoute()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: "新着記事",
      to: "/article/new",
      class: "text-white",
      active: route.path.startsWith("/article/new")
    }
  ])
</script>
