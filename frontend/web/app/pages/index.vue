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
          v-if="article.link.includes(QiitaBaseUrl)"
          src="/qiita/logo-background-color.png"
        />
        <NuxtImg
          v-else-if="article.link.includes(ZennBaseUrl)"
          src="/zenn/logo.png"
        />
        <NuxtImg
          v-else
          src="https://nuxt.com/assets/design-kit/logo-green-white.png"
        />
        <div>{{ article.publishedAt }}</div>
      </UPageCard>
    </UPageGrid>
  </div>
</template>

<script setup lang="ts">
  import { QiitaBaseUrl } from "../../../../common/constant-variable/qiita"
  import { ZennBaseUrl } from "../../../../common/constant-variable/zenn"

  const runtimeConfig = useRuntimeConfig()

  const articles = ref<ArticleObject[]>()

  const { data: data, error: error } = await useFetch<ArticleJson[], ErrorJson>(
    `${runtimeConfig.public.ncsApiBaseUrl}/api/article`
  )

  if (data.value) {
    articles.value = data.value.map((article) => {
      return {
        id: article.id,
        publisherId: article.publisherId,
        title: article.title,
        link: article.link,
        summary: article.summary,
        author: article.author,
        publishedAt: article.publishedAt,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt
      }
    })
  }
  if (error.value) {
    console.error(error.value)
  }
</script>
