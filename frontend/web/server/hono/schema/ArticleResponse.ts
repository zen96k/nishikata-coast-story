import zod from "zod"
import { Publisher } from "~~/type/prisma/enums"

const ArticleResponse = zod.object({
  id: zod.string(),
  publisher: zod.enum(Publisher),
  publisherArticleId: zod.string(),
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  published: zod.string(),
  updated: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type ArticleResponse = zod.infer<typeof ArticleResponse>
