import zod from "zod"

export const SerializedRssPublisherSchema = zod.object({
  id: zod.number(),
  name: zod.string(),
  url: zod.string(),
  createdAt: zod.string(),
  updatedAt: zod.string()
})

export type SerializedRssPublisher = zod.infer<
  typeof SerializedRssPublisherSchema
>
