import cron from "node-cron"
import Article from "./module/article.ts"
import CronTaskSchedule from "./module/cron-task-schedule.ts"
import dbClient from "./module/db-client.ts"
import RssParser from "./module/rss-parser.ts"

const main = async () => {
  console.info("バッチ処理(cron)を開始します")

  const rssParser = new RssParser()
  const article = new Article(rssParser, dbClient)
  const cronTaskSchedule = new CronTaskSchedule(article, dbClient)

  try {
    await cronTaskSchedule.deleteAll()

    // await cronTaskSchedule.manage(
    //   cron.schedule(
    //     process.env.NCS_ENV === "dev" ? "*/15 * * * *" : "00 */1 * * *",
    //     async (context) => {
    //       const task = context.task

    //       console.info(`${task?.name}を開始します`)
    //       await cronTaskSchedule.runCreateOrUpdateArticlesWithApi()
    //       console.info(`${task?.name}を終了します`)
    //     },
    //     {
    //       name: "CreateOrUpdateArticlesWithApi",
    //       timezone: "Asia/Tokyo",
    //       noOverlap: true
    //     }
    //   )
    // )

    await cronTaskSchedule.manage(
      cron.schedule(
        process.env.NCS_ENV === "dev" ? "*/15 * * * *" : "00 */1 * * *",
        async (context) => {
          const task = context.task

          console.info(`${task?.name}を開始します`)
          await cronTaskSchedule.runCreateOrUpdateArticlesWithRss()
          console.info(`${task?.name}を終了します`)
        },
        {
          name: "CreateOrUpdateArticlesWithRss",
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
