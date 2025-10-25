import { Hono } from "hono"
import superjson from "superjson"
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

  return context.text(superjson.stringify(articles), 200, {
    "Content-Type": "application/json"
  })
})

export default article
