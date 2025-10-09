import zod from "zod"

export const ErrorJsonSchema = zod.object({
  type: zod.string(),
  title: zod.string(),
  detail: zod.string(),
  instance: zod.string().nullable(),
  status: zod.number().nullable()
})

export type ErrorJson = zod.infer<typeof ErrorJsonSchema>
