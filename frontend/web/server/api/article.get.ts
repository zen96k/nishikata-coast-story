import type { H3Error } from "h3"
import superjson from "superjson"
import handleNitroError from "../utils/handle-nitro-error"

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

    handleNitroError(error as H3Error)
  }
})
