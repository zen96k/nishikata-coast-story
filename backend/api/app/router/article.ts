import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import superjson from "superjson"
import statusCode from "../../constant-variable/status-code.mts"
import Article from "../module/article.ts"
import dbClient from "../module/db-client.ts"

const article = new Hono()
  .get("/all", async (context) => {
    const article = new Article(dbClient)

    const articles = await article.readAll()

    return context.json(
      { superjson: superjson.stringify({ articles: articles }) },
      statusCode.OK.code as ContentfulStatusCode
    )
  })
  .get("/all/paging", async (context) => {
    const article = new Article(dbClient)

    const { page: page, limit: limit } = context.req.query()
    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    const {
      count: count,
      pageCount: pageCount,
      articles: articles
    } = await article.readAllWithPaging(
      {},
      {
        skip: skip,
        take: take,
        include: { rssPublisher: true },
        orderBy: { publishedAt: "desc" }
      }
    )

    return context.json(
      {
        superjson: superjson.stringify({
          count: count,
          pageCount: pageCount,
          articles: articles
        })
      },
      statusCode.OK.code as ContentfulStatusCode
    )
  })

export default article
