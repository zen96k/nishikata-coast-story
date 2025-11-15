import dbClient from "./db-client.ts"

const resetDb = async () => {
  await dbClient.$transaction(async (transaction) => {
    await transaction.article.deleteMany()
    await transaction.articleLabel.deleteMany()
    await transaction.articleLabelRelation.deleteMany()
    await transaction.cronTaskSchedule.deleteMany()
    await transaction.rssPublisher.deleteMany()
  })
}

export default resetDb
