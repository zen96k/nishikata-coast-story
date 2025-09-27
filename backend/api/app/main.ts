import { serve } from "@hono/node-server"
import { Hono } from "hono"
import article from "./router/article.js"

console.info("APIサーバーを起動します")

const app = new Hono()

app.route("/article", article)

const server = serve({
  fetch: app.fetch,
  port: process.env.HONO_APP_PORT
    ? Number(process.env.HONO_APP_PORT)
    : undefined
})

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
