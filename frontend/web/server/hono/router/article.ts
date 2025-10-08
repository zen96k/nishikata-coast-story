import { Hono } from "hono"

export const article = new Hono().get("/", async (context) => {
  const articleManager = new ArticleManager()

  const articles = await articleManager.findMany()

  return context.json(articles, 200)
})
