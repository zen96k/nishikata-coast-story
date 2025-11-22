import { serve } from "@hono/node-server"
import { Hono } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import statusCode from "../constant-variable/status-code.mts"
import article from "./router/article.ts"

const honoServerPort = Number(process.env.HONO_SERVER_PORT) || 3000

const app = new Hono().route("/article", article).onError((error, context) => {
  console.error(error)

  const errorResponse = {
    statusCode: statusCode.InternalServerError.code,
    statusMessage: "API Server Error",
    message: error.message
  }

  return context.json(
    errorResponse,
    statusCode.InternalServerError.code as ContentfulStatusCode
  )
})

serve({ fetch: app.fetch, port: honoServerPort })
