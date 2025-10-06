import { Hono } from "hono"
import { DateTime as luxon } from "luxon"
import type { ArticleResponse } from "~~/server/hono/schema/ArticleResponse"

export const article = new Hono().get("/", async (context) => {
  const articleManager = new ArticleManager()

  const articles = await articleManager.findMany()

  const transformedArticles: ArticleResponse[] = articles.map((article) => {
    return {
      id: article.id.toString(),
      publisherId: article.rssPublisherId.toString(),
      title: article.title,
      link: article.link,
      author: article.author,
      summary: article.summary,
      publishedAt: luxon.fromJSDate(article.publishedAt).toUTC().toISO() ?? "",
      createdAt: luxon.fromJSDate(article.createdAt).toUTC().toISO() ?? "",
      updatedAt: luxon.fromJSDate(article.updatedAt).toUTC().toISO() ?? ""
    }
  })

  return context.json({ articles: transformedArticles }, 200)
})
