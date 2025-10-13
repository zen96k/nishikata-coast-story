import zod from "zod"
import { SerializedRssPublisherSchema } from "./serialized-rss-publisher"

export const SerializedArticleSchema = zod.object({
  id: zod.number(),
  publisherId: zod.number(),
  rssPublisher: SerializedRssPublisherSchema.optional(),
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  publishedAt: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type SerializedArticle = zod.infer<typeof SerializedArticleSchema>
