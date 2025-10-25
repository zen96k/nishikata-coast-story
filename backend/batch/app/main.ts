import cron from "node-cron"
import ArticleDao from "./module/article-dao.ts"
import CronTaskScheduleDao from "./module/cron-task-schedule-dao.ts"
import dbClient from "./module/db-client.ts"
import RssParser from "./module/rss-parser.ts"

const main = async () => {
  console.info("バッチ処理(cron)を開始します")

  const rssParser = new RssParser()
  const articleDao = new ArticleDao(rssParser, dbClient)
  const cronTaskScheduleDao = new CronTaskScheduleDao(articleDao, dbClient)

  try {
    await cronTaskScheduleDao.deleteTaskSchedule()

    await cronTaskScheduleDao.manageTaskSchedule(
      cron.schedule(
        "*/15 * * * *",
        async (context) => {
          const task = context.task

          console.info(`${task?.name}を開始します`)
          await cronTaskScheduleDao.runCreateOrUpdateArticlesByRss()
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
