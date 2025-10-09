import zod from "zod"

export const ArticleObjectSchema = zod.object({
  id: zod.string(),
  publisherId: zod.string(),
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  publishedAt: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type ArticleObject = zod.infer<typeof ArticleObjectSchema>
