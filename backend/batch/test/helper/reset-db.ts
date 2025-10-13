import dbClient from "./db-client.ts"

const resetDb = async () => {
  await dbClient.$transaction(async (transaction) => {
    await transaction.rssPublisher.deleteMany()
    await transaction.article.deleteMany()
    await transaction.cronTaskSchedule.deleteMany()
  })
}

export default resetDb
