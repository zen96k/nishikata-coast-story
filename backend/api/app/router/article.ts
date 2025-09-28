import { Hono } from "hono"
import { describeResponse } from "hono-openapi"
import { DateTime as luxon } from "luxon"
import * as zod from "zod"
import {
  Prisma,
  PrismaClient,
  Publisher
} from "../../type/prisma-client/index.js"

const articleResponseSchema = zod
  .object({
    id: zod.string(),
    publisher: zod.enum(Publisher),
    publisherArticleId: zod.string(),
    title: zod.string(),
    link: zod.string(),
    author: zod.string(),
    summary: zod.string().nullable(),
    published: zod.string(),
    updated: zod.string(),
    createdAt: zod.string(),
    updatedAt: zod.string()
  })
  .describe("ArticleResponse")
  .meta({ ref: "ArticleResponse" })

const app = new Hono()

app.get(
  "/",
  describeResponse(
    async (context) => {
      const articleManager = new ArticleManager()

      const articles = await articleManager.findMany()

      const transformedArticles = articles.map((article) => {
        return {
          ...article,
          id: article.id.toString(),
          published: luxon.fromJSDate(article.published).toUTC().toISO() ?? "",
          updated: luxon.fromJSDate(article.updated).toUTC().toISO() ?? "",
          createdAt: luxon.fromJSDate(article.createdAt).toUTC().toISO() ?? "",
          updatedAt: luxon.fromJSDate(article.updatedAt).toUTC().toISO() ?? ""
        }
      })

      return context.json({ articles: transformedArticles })
    },
    {
      200: {
        description: "OK",
        content: {
          "application/json": {
            vSchema: zod.object({ articles: zod.array(articleResponseSchema) })
          }
        }
      }
    }
  )
)

class ArticleManager {
  private client = new PrismaClient()

  public async findMany(transaction?: Prisma.TransactionClient) {
    const client = transaction || this.client

    const articles = await client.article.findMany()

    return articles
  }
}

export default app
