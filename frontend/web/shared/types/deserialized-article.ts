import zod from "zod"
import DeserializedRssPublisherSchema from "./deserialized-rss-publisher"

const DeserializedArticleSchema = zod.object({
  id: zod.bigint(),
  publisherId: zod.bigint(),
  rssPublisher: DeserializedRssPublisherSchema.optional(),
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  publishedAt: zod.date(),
  createdAt: zod.date(),
  updatedAt: zod.date()
})

export default DeserializedArticleSchema
export type DeserializedArticle = zod.infer<typeof DeserializedArticleSchema>
