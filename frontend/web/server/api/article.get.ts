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

    throw createError({
      statusMessage: "Internal Server Error",
      statusCode: 500
    })
  }
})
