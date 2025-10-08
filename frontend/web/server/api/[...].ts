import { Hono } from "hono"
import { article } from "~~/server/hono/router/article"

const app = new Hono()
  .basePath("/api")
  .route("/article", article)
  .onError((error, context) => {
    console.error(error)

    const errorResponse = {
      type: context.req.url,
      title: "Internal Server Error",
      detail: error.message,
      instance: null,
      status: 500
    }

    return context.json(errorResponse, 500)
  })

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)
  return app.fetch(request)
})
