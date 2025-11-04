<template>
  <div>
    <div class="flex justify-center">
      <UPagination
        v-model:page="articlePage"
        show-edges
        :total="articleCount"
        :items-per-page="articleLimit"
        @update:page="updatePage"
      />
    </div>
    <div class="mb-8"></div>
    <UPageGrid>
      <UPageCard
        v-for="(article, index) of articles"
        :key="index"
        variant="soft"
        target="_blank"
        :to="article.link"
      >
        <template #header>
          <div class="h-16 font-bold">
            {{
              article.title.length > 50
                ? `${article.title.substring(0, 49)}...`
                : article.title
            }}
          </div>
        </template>
        <template #description>
          <div>{{ article.summary ?? "" }}</div>
        </template>
        <template #body>
          <div>
            <img
              v-if="article.link.includes(QiitaBaseUrl)"
              class="min-h-32"
              src="~/assets/image/qiita/logo-background-color.png"
            />
            <img
              v-else-if="article.link.includes(ZennBaseUrl)"
              class="min-h-32"
              src="~/assets/image/zenn/logo.png"
            />
            <img
              v-else
              class="min-h-32"
              src="https://nuxt.com/assets/design-kit/logo-green-white.png"
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
    <div class="mt-8"></div>
    <div class="flex justify-center">
      <UPagination
        v-model:page="articlePage"
        show-edges
        :total="articleCount"
        :items-per-page="articleLimit"
        @update:page="updatePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDateFormat, useWindowScroll } from "@vueuse/core"
  import type { H3Error } from "h3"
  import { DateTime as luxon } from "luxon"
  import superjson from "superjson"
  import QiitaBaseUrl from "../../../../../../common/constant-variable/qiita"
  import ZennBaseUrl from "../../../../../../common/constant-variable/zenn"

  const { y: windowScrollY } = useWindowScroll()

  const articles = ref<Article[]>()
  const articleCount = ref(0)
  const articlePage = ref(1)
  const articleLimit = ref(30)

  const { data: data, error: error } = await useLazyFetch<
    NcsApiResponse,
    H3Error
  >("/api/article/all/paging", {
    query: { page: articlePage, limit: articleLimit }
  })

  const updatePage = (page: number) => {
    articlePage.value = page
    windowScrollY.value = 0
  }

  watch(
    data,
    (value) => {
      if (value) {
        const { count: superjsonCount, articles: superjsonArticles } =
          superjson.parse(value.superjson) as ArticleGetAllPagingResponse

        articleCount.value = superjsonCount
        articles.value = superjsonArticles
      }
    },
    { immediate: true }
  )
  watch(
    error,
    (value) => {
      if (value) {
        console.error(value)

        const toast = useToast()
        toast.add({
          title: `${value.statusCode} Error`,
          description: value.statusMessage,
          color: "error"
        })
      }
    },
    { immediate: true }
  )
</script>
