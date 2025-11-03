import type { H3Error } from "h3"

export default defineEventHandler(async (event) => {
  const { ncsApiBaseUrl: ncsApiBaseUrl } = useRuntimeConfig(event)

  try {
    const response = await $fetch<NcsApiResponse>(`${ncsApiBaseUrl}/article`)

    return response
  } catch (error) {
    console.error(error)

    handleNitroError(error as H3Error)
  }
})
