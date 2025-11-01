import { serve } from "@hono/node-server"
import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import superjson from "superjson"
import statusCode from "../constant-variable/status-code.ts"
import article from "./router/article.ts"

const honoServerPort = Number(process.env.HONO_SERVER_PORT) || 3000

const app = new Hono().route("/article", article).onError((error, context) => {
  console.error(error)

  const errorResponse = {
    statusCode: statusCode.InternalServerError.code,
    statusMessage: "API Server Error",
    message: error.message
  }

  return context.text(
    superjson.stringify(errorResponse),
    statusCode.InternalServerError.code as ContentfulStatusCode,
    { "Content-Type": "application/json" }
  )
})

serve({ fetch: app.fetch, port: honoServerPort })
