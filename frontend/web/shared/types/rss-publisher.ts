import zod from "zod"

const RssPublisherSchema = zod.object({
  id: zod.bigint(),
  name: zod.string(),
  url: zod.string(),
  createdAt: zod.date(),
  updatedAt: zod.date()
})

export default RssPublisherSchema
export type RssPublisher = zod.infer<typeof RssPublisherSchema>
