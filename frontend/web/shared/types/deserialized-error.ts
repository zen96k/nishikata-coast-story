import zod from "zod"

const DeserializedErrorSchema = zod.object({
  type: zod.string(),
  title: zod.string(),
  detail: zod.string(),
  instance: zod.object().nullable(),
  status: zod.number()
})

export default DeserializedErrorSchema
export type DeserializedError = zod.infer<typeof DeserializedErrorSchema>
