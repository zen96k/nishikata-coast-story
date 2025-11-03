import zod from "zod"
import ArticleSchema from "./article"

const ArticleGetAllPagingResponseSchema = zod.object({
  pageCount: zod.number(),
  articles: ArticleSchema.array()
})

export default ArticleGetAllPagingResponseSchema
export type ArticleGetAllPagingResponse = zod.infer<
  typeof ArticleGetAllPagingResponseSchema
>
