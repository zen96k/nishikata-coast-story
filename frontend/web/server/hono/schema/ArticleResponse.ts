import zod from "zod"
import { RssPublisherResponseSchema } from "./RssPublisherResponse"

export const ArticleResponseSchema = zod.object({
  id: zod.string(),
  publisherId: zod.string(),
  rssPublisher: RssPublisherResponseSchema,
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  publishedAt: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type ArticleResponse = zod.infer<typeof ArticleResponseSchema>
