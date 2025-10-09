<template>
  <div>
    <UPageGrid>
      <UPageCard
        v-for="(article, index) of articles"
        :key="index"
        :title="article.title"
        :description="article.summary ?? ''"
        variant="soft"
        :to="article.link"
        target="_blank"
      >
        <NuxtImg
          v-if="article.rssPublisher.name === 'Qiita'"
          src="/qiita/logo-background-color.png"
        />
        <NuxtImg
          v-else-if="article.rssPublisher.name === 'Zenn'"
          src="/zenn/logo.png"
        />
        <NuxtImg
          v-else
          src="https://nuxt.com/assets/design-kit/logo-green-white.png"
        />
      </UPageCard>
    </UPageGrid>
  </div>
</template>

<script setup lang="ts">
  import type { ArticleResponse } from "~~/server/hono/schema/ArticleResponse"
  import type { ErrorResponse } from "~~/server/hono/schema/ErrorResponse"

  const runtimeConfig = useRuntimeConfig()

  const { data: articles, error: error } = await useFetch<
    ArticleResponse[],
    ErrorResponse
  >(`${runtimeConfig.public.ncsApiBaseUrl}/api/article`)

  if (error.value) {
    console.error(error.value)
  }
</script>
