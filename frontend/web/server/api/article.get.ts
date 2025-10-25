import type { H3Error } from "h3"
import superjson from "superjson"

export default defineEventHandler(async (event) => {
  const { ncsApiBaseUrl: ncsApiBaseUrl } = useRuntimeConfig(event)

  try {
    const articles = await $fetch<DeserializedArticle[]>(
      `${ncsApiBaseUrl}/article`,
      { parseResponse: superjson.parse }
    )

    return superjson.stringify(articles)
  } catch (error) {
    console.error(error)

    const h3Error = error as H3Error
    if (h3Error.statusCode && h3Error.statusMessage && h3Error.message) {
      throw createError(h3Error)
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error"
      })
    }
  }
})
