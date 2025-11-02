import type { H3Error } from "h3"
import superjson from "superjson"

export default defineEventHandler(async (event) => {
  const { ncsApiBaseUrl: ncsApiBaseUrl } = useRuntimeConfig(event)
  console.log("ncsApiBaseUrl", ncsApiBaseUrl)

  try {
    const articles = await $fetch<DeserializedArticle[]>(
      `${ncsApiBaseUrl}/article`,
      { parseResponse: superjson.parse }
    )

    return superjson.stringify(articles)
  } catch (error) {
    console.error(error)

    handleNitroError(error as H3Error)
  }
})
