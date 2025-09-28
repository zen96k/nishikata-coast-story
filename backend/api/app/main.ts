import { serve } from "@hono/node-server"
import fs from "fs"
import { Hono } from "hono"
import { generateSpecs } from "hono-openapi"
import * as zod from "zod"
import article from "./router/article.js"

export const errorResponseSchema = zod
  .object({
    type: zod.string(),
    title: zod.string(),
    detail: zod.string(),
    instance: zod.string().nullable(),
    status: zod.number().nullable()
  })
  .describe("ErrorResponse")
  .meta({ ref: "ErrorResponse" })

console.info("APIサーバーを起動します")

const app = new Hono()

app.route("/article", article)
app.onError((error, context) => {
  console.error(error)

  const errorResponse: zod.infer<typeof errorResponseSchema> = {
    type: context.req.url,
    title: "Internal Server Error",
    detail: error.message,
    instance: null,
    status: 500
  }

  return context.json(errorResponse, 500)
})

const server = serve({
  fetch: app.fetch,
  port: process.env.HONO_APP_PORT
    ? Number(process.env.HONO_APP_PORT)
    : undefined
})

const specs = await generateSpecs(app)
fs.writeFileSync("spec/ncs-api.json", JSON.stringify(specs, null, 2))

process.on("SIGINT", () => {
  server.close()
  process.exit(0)
})
process.on("SIGTERM", () => {
  server.close((error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    process.exit(0)
  })
})

export default app
