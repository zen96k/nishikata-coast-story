import type { H3Error } from "h3"

export default defineEventHandler(async (event) => {
  const { private: privateRuntimeConfig } = useRuntimeConfig(event)
  const { ncsApiBaseUrl: ncsApiBaseUrl } = privateRuntimeConfig

  try {
    const response = await $fetch<{ superjson: string }>(
      `${ncsApiBaseUrl}/article/new/fetch`,
      { method: "POST", body: await readBody(event) }
    )

    return response
  } catch (error) {
    console.error(error)

    handleNitroError(error as H3Error)
  }
})
