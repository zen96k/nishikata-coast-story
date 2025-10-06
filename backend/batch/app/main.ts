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
