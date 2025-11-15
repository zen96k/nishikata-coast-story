import type { H3Error } from "h3"

export default defineEventHandler(async (event) => {
  const { private: privateRuntimeConfig } = useRuntimeConfig(event)
  const { ncsApiBaseUrl: ncsApiBaseUrl } = privateRuntimeConfig

  try {
    const response = await $fetch<NcsApiResponse>(
      `${ncsApiBaseUrl}/article/all/paging`,
      { query: getQuery(event) }
    )

    return response
  } catch (error) {
    console.error(error)

    handleNitroError(error as H3Error)
  }
})
