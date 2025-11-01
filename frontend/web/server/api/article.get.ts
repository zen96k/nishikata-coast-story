import type { H3Error } from "h3"
import superjson from "superjson"

export default defineEventHandler(async (event) => {
  // const { ncsApiBaseUrl: ncsApiBaseUrl } = useRuntimeConfig(event)
  console.log(event)

  try {
    // const articles = await $fetch<DeserializedArticle[]>(
    //   `${ncsApiBaseUrl}/article`,
    //   { parseResponse: superjson.parse }
    // )
    const articles = [
      {
        id: BigInt(1),
        rssPublisherId: BigInt(1),
        title: "test",
        link: "https://qiita.com",
        author: "test",
        summary: "test",
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return superjson.stringify(articles)
  } catch (error) {
    console.error(error)

    handleNitroError(error as H3Error)
  }
})
