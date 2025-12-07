<template>
  <div>
    <div class="flex justify-center">
      <UPagination
        v-model:page="articlePage"
        :total="articleCount"
        :items-per-page="articleLimit"
        @update:page="updatePage"
      />
    </div>
    <div class="my-8"></div>
    <div v-if="isLoading">
      <UProgress :max="['読込中']" />
    </div>
    <div v-else>
      <div v-if="articles.length === 0">
        <UAlert
          color="error"
          title="記事が見つかりません"
          description="アプリケーションにエラーが発生している可能性があります"
        />
      </div>
      <div v-else>
        <UPageGrid>
          <UPageCard
            v-for="(article, index) of articles"
            :key="index"
            variant="soft"
            target="_blank"
            :to="article.link"
          >
            <template #body>
              <NuxtImg
                class="min-h-32"
                :src="
                  article.imageUrl ||
                  'https://nuxt.com/assets/design-kit/logo-green-white.png'
                "
              />
            </template>
            <template #footer>
              <ClientOnly>
                <div>
                  公開日時:
                  {{
                    useDateFormat(
                      luxon.fromJSDate(article.publishedAt).toLocal().toISO() ??
                        "",
                      "YYYY-MM-DD HH:mm"
                    )
                  }}
                </div>
              </ClientOnly>
            </template>
          </UPageCard>
        </UPageGrid>
      </div>
    </div>
    <div class="my-8"></div>
    <div class="flex justify-center">
      <UPagination
        v-model:page="articlePage"
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
  import type { operations } from "../../../../type/ogp-scanner/schema"
  import type { Prisma } from "../../../../type/prisma/client"

  const { public: publicRuntimeConfig } = useRuntimeConfig()
  const { y: windowScrollY } = useWindowScroll()

  const articles = ref<
    (Prisma.ArticleGetPayload<{
      skip: number
      take: number
      include: {
        publisher: true
        articleLabelRelations: {
          where: { articleLabel: { is: { value: "popular" } } }
        }
      }
      orderBy: { publishedAt: string }
    }> & { imageUrl: string })[]
  >([])
  const articleCount = ref(0)
  const articlePage = ref(1)
  const articleLimit = ref(15)
  const isLoading = ref(true)

  const { data: data, error: error } = await useLazyFetch<
    { superjson: string },
    H3Error
  >("/api/article/popular/fetch", {
    method: "POST",
    body: { page: articlePage, limit: articleLimit }
  })

  const fetchImageUrl = async (url: string) => {
    const data = await $fetch<
      operations["ogp_info_v1_ogp_info_get"]["responses"]["200"]["content"]["application/json"]
    >(`${publicRuntimeConfig.ogpScannerApiBaseUrl}/ogp_info`, {
      query: { url: url }
    })

    return data.ogp?.["og:image"]?.[0] || ""
  }

  const updatePage = (page: number) => {
    windowScrollY.value = 0
    isLoading.value = true
    articles.value = []
    articlePage.value = page
  }

  watch(
    data,
    async (value) => {
      if (value) {
        const { count: superjsonCount, articles: superjsonArticles } =
          superjson.parse(value.superjson) as {
            count: number
            articles: Prisma.ArticleGetPayload<{
              skip: number
              take: number
              include: {
                publisher: true
                articleLabelRelations: {
                  where: { articleLabel: { is: { value: "popular" } } }
                }
              }
              orderBy: { publishedAt: string }
            }>[]
          }

        articleCount.value = superjsonCount
        articles.value = await Promise.all(
          superjsonArticles.map(async (superjsonArticle) => {
            const imageUrl = await fetchImageUrl(superjsonArticle.link)
            return { ...superjsonArticle, imageUrl: imageUrl }
          })
        )

        isLoading.value = false
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

        isLoading.value = false
      }
    },
    { immediate: true }
  )
</script>
