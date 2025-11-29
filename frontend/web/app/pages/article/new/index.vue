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
            <div class="line-clamp-3 leading-snug">
              {{ article.title }}
            </div>
          </div>
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
  import type { Prisma } from "../../../../type/prisma/client"

  const { y: windowScrollY } = useWindowScroll()

  const articles = ref<
    Prisma.ArticleGetPayload<{
      skip: number
      take: number
      include: {
        articleLabelRelations: {
          where: { articleLabel: { is: { value: "new" } } }
        }
      }
      orderBy: { publishedAt: string }
    }>[]
  >([])
  const articleCount = ref(0)
  const articlePage = ref(1)
  const articleLimit = ref(15)

  const { data: data, error: error } = await useLazyFetch<
    { superjson: string },
    H3Error
  >("/api/article/new/fetch", {
    method: "POST",
    body: { page: articlePage, limit: articleLimit }
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
          superjson.parse(value.superjson) as {
            count: number
            articles: Prisma.ArticleGetPayload<{
              skip: number
              take: number
              include: {
                articleLabelRelations: {
                  where: { articleLabel: { is: { value: "new" } } }
                }
              }
              orderBy: { publishedAt: string }
            }>[]
          }

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
