import { serve } from "@hono/node-server"
import { Hono } from "hono"
import superjson from "superjson"
import article from "./router/article.ts"

const honoServerBasePath = process.env.HONO_SERVER_BASE_PATH || ""
const honoServerPort = Number(process.env.HONO_SERVER_PORT) || 3000

const app = new Hono()
  .basePath(honoServerBasePath)
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

    return context.text(superjson.stringify(errorResponse), 500, {
      "Content-Type": "application/json"
    })
  })

serve({ fetch: app.fetch, port: honoServerPort })
