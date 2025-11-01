import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import superjson from "superjson"
import statusCode from "../../constant-variable/status-code.mts"
import { Prisma } from "../../type/prisma/client.ts"
import ArticleDao from "../module/article-dao.ts"
import dbClient from "../module/db-client.ts"

const article = new Hono().get("/", async (context) => {
  const articleDao = new ArticleDao(dbClient)

  const articles = (await articleDao.findMany({
    include: { rssPublisher: true },
    orderBy: { publishedAt: "desc" }
  })) as Prisma.ArticleGetPayload<{
    include: { rssPublisher: true }
    orderBy: { publishedAt: "desc" }
  }>[]

  return context.text(
    superjson.stringify(articles),
    statusCode.OK.code as ContentfulStatusCode,
    { "Content-Type": "application/json" }
  )
})

export default article
