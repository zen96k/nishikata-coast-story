import zod from "zod"
import { DeserializedRssPublisherSchema } from "./deserialized-rss-publisher"

export const DeserializedArticleSchema = zod.object({
  id: zod.number(),
  publisherId: zod.number(),
  rssPublisher: DeserializedRssPublisherSchema.optional(),
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  publishedAt: zod.date(),
  createdAt: zod.date(),
  updatedAt: zod.date()
})

export type DeserializedArticle = zod.infer<typeof DeserializedArticleSchema>
