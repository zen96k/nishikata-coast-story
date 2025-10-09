import zod from "zod"

export const RssPublisherJsonSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  url: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type RssPublisherJson = zod.infer<typeof RssPublisherJsonSchema>
