import { PrismaClient } from "../type/prisma/client.ts"

const main = async () => {
  const dbClient = new PrismaClient()

  await dbClient.$transaction(async (transaction) => {
    await transaction.rssPublisher.createMany({
      data: [
        { name: "Qiita", url: "https://qiita.com/popular-items/feed.atom" },
        { name: "Zenn", url: "https://zenn.dev/feed" }
      ],
      skipDuplicates: true
    })
  })
}

await main()
