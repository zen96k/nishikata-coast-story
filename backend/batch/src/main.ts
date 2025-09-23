import cron from "node-cron"
import { CronTaskScheduler } from "./module/CronTaskScheduler.ts"

const main = async () => {
  const cronTaskScheduler = new CronTaskScheduler()

  try {
    await cronTaskScheduler.deleteTaskSchedule()

    await cronTaskScheduler.manageTaskSchedule(
      cron.schedule(
        "*/15 * * * *",
        async () => {
          await cronTaskScheduler.runCreateOrUpdateQiitaArticlesByRss()
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
