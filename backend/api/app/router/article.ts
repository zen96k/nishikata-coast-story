import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
// import { streamSSE } from "hono/streaming"
import superjson from "superjson"
import statusCode from "../../constant-variable/status-code.mts"
import { Prisma } from "../../type/prisma/client.ts"
import ArticleDao from "../module/article-dao.ts"
import dbClient from "../module/db-client.ts"

const article = new Hono().get("/", async (context) => {
  console.log("API呼び出し開始")
  const articleDao = new ArticleDao(dbClient)

  const articles = (await articleDao.findMany({
    include: { rssPublisher: true },
    orderBy: { publishedAt: "desc" }
  })) as Prisma.ArticleGetPayload<{
    include: { rssPublisher: true }
    orderBy: { publishedAt: "desc" }
  }>[]

  // for (const article of articles) {
  //   return streamSSE(context, async (stream) => {
  //     await stream.writeSSE({ data: superjson.stringify(article) })
  //   })
  // }
  return context.text(
    superjson.stringify(articles),
    statusCode.OK.code as ContentfulStatusCode,
    { "Content-Type": "application/json" }
  )
})

export default article
