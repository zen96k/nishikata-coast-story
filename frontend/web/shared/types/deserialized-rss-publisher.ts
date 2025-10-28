import zod from "zod"

const DeserializedRssPublisherSchema = zod.object({
  id: zod.bigint(),
  name: zod.string(),
  url: zod.string(),
  createdAt: zod.date(),
  updatedAt: zod.date()
})

export default DeserializedRssPublisherSchema
export type DeserializedRssPublisher = zod.infer<
  typeof DeserializedRssPublisherSchema
>
