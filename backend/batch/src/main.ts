import { PrismaClient } from "../../db/generated/prisma/index.js"
import { ArticleManager } from "./module/ArticleManager.ts"

const main = async () => {
  try {
    const articleManager = new ArticleManager()
    const prismaClient = new PrismaClient()

    await articleManager.createOrUpdateQiitaArticlesFromRssFeed(
      "https://qiita.com/popular-items/feed.atom",
      prismaClient
    )
  } catch (error) {
    console.error(error)
  }
}

await main()
