import zod from "zod"

const ArticleResponse = zod.object({
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

export type ArticleResponse = zod.infer<typeof ArticleResponse>
