import zod from "zod"
import RssPublisherSchema from "./rss-publisher"

const ArticleSchema = zod.object({
  id: zod.bigint(),
  publisherId: zod.bigint(),
  rssPublisher: RssPublisherSchema.optional(),
  title: zod.string(),
  link: zod.string(),
  author: zod.string(),
  summary: zod.string().nullable(),
  publishedAt: zod.date(),
  createdAt: zod.date(),
  updatedAt: zod.date()
})

export default ArticleSchema
export type Article = zod.infer<typeof ArticleSchema>
