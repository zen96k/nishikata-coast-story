import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import superjson from "superjson"
import statusCode from "../../constant-variable/status-code.ts"
import Article from "../module/article.ts"
import dbClient from "../module/db-client.ts"

const article = new Hono()
  .post("/new/fetch", async (context) => {
    const article = new Article(dbClient)

    const {
      page: page,
      limit: limit,
      order: order
    } = (await context.req.json()) as {
      page?: number
      limit?: number
      order?: object
    }
    const skip = page && limit && (page - 1) * limit
    const take = limit

    const { count: count, articles: articles } = await article.readAll(
      {
        where: {
          articleLabelRelations: {
            some: { articleLabel: { is: { value: "new" } } }
          }
        }
      },
      {
        skip: skip,
        take: take,
        include: {
          articleLabelRelations: {
            where: { articleLabel: { is: { value: "new" } } }
          }
        },
        orderBy: order || { publishedAt: "desc" }
      }
    )

    return context.json(
      { superjson: superjson.stringify({ count: count, articles: articles }) },
      statusCode.OK.code as ContentfulStatusCode
    )
  })
  .post("/popular/fetch", async (context) => {
    const article = new Article(dbClient)

    const {
      page: page,
      limit: limit,
      order: order
    } = (await context.req.json()) as {
      page?: number
      limit?: number
      order?: object
    }
    const skip = page && limit && (page - 1) * limit
    const take = limit

    const { count: count, articles: articles } = await article.readAll(
      {
        where: {
          articleLabelRelations: {
            some: { articleLabel: { is: { value: "popular" } } }
          }
        }
      },
      {
        skip: skip,
        take: take,
        include: {
          publisher: true,
          articleLabelRelations: {
            where: { articleLabel: { is: { value: "popular" } } }
          }
        },
        orderBy: order || { publishedAt: "desc" }
      }
    )

    return context.json(
      { superjson: superjson.stringify({ count: count, articles: articles }) },
      statusCode.OK.code as ContentfulStatusCode
    )
  })

export default article
