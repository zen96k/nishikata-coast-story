import zod from "zod"
import ArticleSchema from "./article"

const ArticleGetResponseSchema = zod.object({ articles: ArticleSchema.array() })

export default ArticleGetResponseSchema
export type ArticleGetResponse = zod.infer<typeof ArticleGetResponseSchema>
