import zod from "zod"

export const DeserializedRssPublisherSchema = zod.object({
  id: zod.number(),
  name: zod.string(),
  url: zod.string(),
  createdAt: zod.date(),
  updatedAt: zod.date()
})

export type DeserializedRssPublisher = zod.infer<
  typeof DeserializedRssPublisherSchema
>
