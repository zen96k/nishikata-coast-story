import type { H3Error } from "h3"

export default defineEventHandler(async (event) => {
  const { ncsApiBaseUrl: ncsApiBaseUrl } = useRuntimeConfig(event)

  try {
    const articleResponse = await $fetch<DeserializedArticle[]>(
      `${ncsApiBaseUrl}/article`
    )

    return articleResponse
  } catch (error) {
    console.error(error)

    handleNitroError(error as H3Error)
  }
})
