<template>
  <div>{{ articles }}</div>
</template>

<script setup lang="ts">
  import { hc } from "hono/client"
  import type { App } from "../../server/api/[...]"

  const runtimeConfig = useRuntimeConfig()
  const client = hc<App>(runtimeConfig.public.ncsApiBaseUrl)

  const response = await client.api.article.$get()
  const { articles } = await response.json()
</script>
