import zod from "zod"
import ArticleSchema from "./article"

const ArticleGetAllPagingResponseSchema = zod.object({
  count: zod.number(),
  pageCount: zod.number(),
  articles: ArticleSchema.array()
})

export default ArticleGetAllPagingResponseSchema
export type ArticleGetAllPagingResponse = zod.infer<
  typeof ArticleGetAllPagingResponseSchema
>
