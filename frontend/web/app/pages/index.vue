<template>
  <div>{{ articles }}</div>
</template>

<script setup lang="ts">
  import type { ArticleResponse } from "~~/server/hono/schema/ArticleResponse"
  import type { ErrorResponse } from "~~/server/hono/schema/ErrorResponse"

  const runtimeConfig = useRuntimeConfig()

  const { data: articles, error } = await useFetch<
    ArticleResponse,
    ErrorResponse
  >(`${runtimeConfig.public.ncsApiBaseUrl}/api/article`)

  if (error.value) {
    console.error(error.value)
  }
</script>
