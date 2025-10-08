import zod from "zod"

export const RssPublisherResponseSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  url: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type RssPublisherResponse = zod.infer<typeof RssPublisherResponseSchema>
