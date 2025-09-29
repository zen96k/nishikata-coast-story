import { Hono } from "hono"
import { DateTime as luxon } from "luxon"
import type { ArticleResponse } from "~~/server/hono/schema/ArticleResponse"

export const article = new Hono().get("/", async (context) => {
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
