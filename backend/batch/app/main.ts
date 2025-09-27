import cron from "node-cron"
import { CronTaskScheduler } from "./module/CronTaskScheduler.ts"

const main = async () => {
  console.info("バッチ処理(cron)を開始します")

  const cronTaskScheduler = new CronTaskScheduler()

  try {
    await cronTaskScheduler.deleteTaskSchedule()

    await cronTaskScheduler.manageTaskSchedule(
      cron.schedule(
        "*/15 * * * *",
        async () => {
          console.info("CreateOrUpdateQiitaArticlesByRssを開始します")
          await cronTaskScheduler.runCreateOrUpdateQiitaArticlesByRss()
          console.info("CreateOrUpdateQiitaArticlesByRssを終了します")
        },
        {
          name: "CreateOrUpdateQiitaArticlesByRss",
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
