import zod from "zod"

const NcsApiResponseSchema = zod.object({ superjson: zod.string() })

export default NcsApiResponseSchema
export type NcsApiResponse = zod.infer<typeof NcsApiResponseSchema>
