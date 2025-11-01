<template>
  <div>
    <UPageGrid>
      <UPageCard
        v-for="(article, index) of articles"
        :key="index"
        variant="soft"
        :to="article.link"
        target="_blank"
      >
        <template #header>
          <div class="h-16 font-bold">
            {{ article.title }}
          </div>
        </template>
        <template #description>
          <div>{{ article.summary ?? "" }}</div>
        </template>
        <template #body>
          <div>
            <img
              v-if="article.link.includes(QiitaBaseUrl)"
              src="assets/image/qiita/logo-background-color.png"
            />
            <img
              v-else-if="article.link.includes(ZennBaseUrl)"
              src="assets/image/zenn/logo.png"
            />
            <img
              v-else
              src="https://nuxt.com/assets/design-kit/logo-green-white.png"
            />
          </div>
        </template>
        <template #footer>
          <ClientOnly>
            <div>
              公開日時:
              {{
                useDateFormat(
                  luxon.fromJSDate(article.publishedAt).toLocal().toISO() ?? "",
                  "YYYY-MM-DD HH:mm"
                )
              }}
            </div>
          </ClientOnly>
        </template>
      </UPageCard>
    </UPageGrid>
  </div>
</template>

<script setup lang="ts">
  import { useDateFormat } from "@vueuse/core"
  import type { H3Error } from "h3"
  import { DateTime as luxon } from "luxon"
  import superjson from "superjson"
  import QiitaBaseUrl from "../../../../../common/constant-variable/qiita"
  import ZennBaseUrl from "../../../../../common/constant-variable/zenn"

  const articles = ref<DeserializedArticle[]>()

  const { data: data, error: error } = await useFetch<
    DeserializedArticle[],
    H3Error
  >("/api/article", { parseResponse: superjson.parse })

  if (data.value) {
    articles.value = data.value
  }
  if (error.value) {
    console.error(error.value)

    const toast = useToast()
    toast.add({
      title: `${error.value.statusCode} Error`,
      description: error.value.statusMessage
    })
  }
</script>
