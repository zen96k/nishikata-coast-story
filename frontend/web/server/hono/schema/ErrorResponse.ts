import zod from "zod"

const ErrorResponse = zod.object({
  type: zod.string(),
  title: zod.string(),
  detail: zod.string(),
  instance: zod.string().nullable(),
  status: zod.number().nullable()
})

export type ErrorResponse = zod.infer<typeof ErrorResponse>
