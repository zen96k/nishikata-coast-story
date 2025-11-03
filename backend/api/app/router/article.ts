import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import superjson from "superjson"
import statusCode from "../../constant-variable/status-code.mts"
import { Prisma } from "../../type/prisma/client.ts"
import Article from "../module/article.ts"
import dbClient from "../module/db-client.ts"

const article = new Hono().get("/", async (context) => {
  const article = new Article(dbClient)

  const { page: page, limit: limit } = context.req.query()
  const skip = page ? (Number(page) - 1) * Number(limit) : 0
  const take = limit ? Number(limit) : 30

  const articles = (await article.readAll({
    skip: skip,
    take: take,
    include: { rssPublisher: true },
    orderBy: { publishedAt: "desc" }
  })) as Prisma.ArticleGetPayload<{
    skip: number
    take: number
    include: { rssPublisher: boolean }
    orderBy: { publishedAt: string }
  }>[]

  return context.json(
    { superjson: superjson.stringify({ articles: articles }) },
    statusCode.OK.code as ContentfulStatusCode
  )
})

export default article
