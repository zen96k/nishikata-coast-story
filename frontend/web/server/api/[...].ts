import { Hono } from "hono"
import { DateTime as luxon } from "luxon"
import type { ArticleResponse } from "../hono/schema/ArticleResponse"
import type { ErrorResponse } from "../hono/schema/ErrorResponse"

const app = new Hono()
  .basePath("/api")
  // .route("/article", article)
  .get("/article", async (context) => {
    const articleManager = new ArticleManager()

    const articles = await articleManager.findMany()

    const transformedArticles: ArticleResponse[] = articles.map((article) => {
      return {
        ...article,
        id: article.id.toString(),
        published: luxon.fromJSDate(article.published).toUTC().toISO() ?? "",
        updated: luxon.fromJSDate(article.updated).toUTC().toISO() ?? "",
        createdAt: luxon.fromJSDate(article.createdAt).toUTC().toISO() ?? "",
        updatedAt: luxon.fromJSDate(article.updatedAt).toUTC().toISO() ?? ""
      }
    })

    return context.json({ articles: transformedArticles }, 200)
  })
  .onError((error, context) => {
    console.error(error)

    const errorResponse: ErrorResponse = {
      type: context.req.url,
      title: "Internal Server Error",
      detail: error.message,
      instance: null,
      status: 500
    }

    return context.json(errorResponse, 500)
  })

export type App = typeof app

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)
  return app.fetch(request)
})
