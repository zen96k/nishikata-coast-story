import cron from "node-cron"
import { PrismaClient } from "../type/prisma/client.ts"
import { ArticleManager } from "./module/ArticleManager.ts"
import { CronTaskScheduler } from "./module/CronTaskScheduler.ts"
import { RssParser } from "./module/RssParser.ts"

const main = async () => {
  console.info("バッチ処理(cron)を開始します")

  const rssParser = new RssParser()
  const dbClient = new PrismaClient()

  const articleManager = new ArticleManager(rssParser, dbClient)
  const cronTaskScheduler = new CronTaskScheduler(articleManager, dbClient)

  try {
    await cronTaskScheduler.deleteTaskSchedule()

    await cronTaskScheduler.manageTaskSchedule(
      cron.schedule(
        "* * * * *",
        async (context) => {
          const task = context.task

          console.info(`${task?.name}を開始します`)
          await cronTaskScheduler.runCreateOrUpdateArticlesByRss()
          console.info(`${task?.name}を終了します`)
        },
        {
          name: "CreateOrUpdateArticlesByRss",
          timezone: "Asia/Tokyo",
          noOverlap: true
        }
      )
    )
  } catch (error) {
    console.error(error)
  }
}

await main()
