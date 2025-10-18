import { Hono } from "hono"
import type { Prisma } from "~~/type/prisma/client"

export const article = new Hono().get("/", async (context) => {
  const articleManager = new ArticleManager(dbClient)

  const articles = (await articleManager.findMany({
    include: { rssPublisher: true },
    orderBy: { publishedAt: "desc" }
  })) as Prisma.ArticleGetPayload<{
    include: { rssPublisher: true }
    orderBy: { publishedAt: "desc" }
  }>[]

  return context.json(articles, 200)
})
