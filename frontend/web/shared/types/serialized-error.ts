import zod from "zod"

export const SerializedErrorSchema = zod.object({
  type: zod.string(),
  title: zod.string(),
  detail: zod.string(),
  instance: zod.string().nullable(),
  status: zod.number().nullable()
})

export type SerializedError = zod.infer<typeof SerializedErrorSchema>
