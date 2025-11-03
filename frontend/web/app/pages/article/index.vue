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
              src="~/assets/image/qiita/logo-background-color.png"
              class="min-h-32"
            />
            <img
              v-else-if="article.link.includes(ZennBaseUrl)"
              src="~/assets/image/zenn/logo.png"
              class="min-h-32"
            />
            <img
              v-else
              src="https://nuxt.com/assets/design-kit/logo-green-white.png"
              class="min-h-32"
            />
          </div>
        </template>
        <template #footer>
          <div>投稿者: {{ article.author }} さん</div>
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

  const page = ref(1)
  const limit = ref(30)
  const articles = ref<DeserializedArticle[]>()

  const { data: data, error: error } = await useLazyFetch<
    { superjson: string },
    H3Error
  >("/api/article", { body: { page: page.value, limit: limit.value } })

  if (data.value) {
    const { articles: superjsonArticles } = superjson.parse(
      data.value.superjson
    ) as { articles: DeserializedArticle[] }
    console.log(superjsonArticles)
    articles.value = superjsonArticles
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
