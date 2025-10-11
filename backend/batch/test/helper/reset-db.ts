import { PrismaClient } from "../../type/prisma/client.ts"

const client = new PrismaClient()

const resetDb = async () => {
  await client.$transaction(async (transaction) => {
    await transaction.rssPublisher.deleteMany()
    await transaction.article.deleteMany()
    await transaction.cronTaskSchedule.deleteMany()
  })
}

export default resetDb
