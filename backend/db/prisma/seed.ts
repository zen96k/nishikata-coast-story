import QiitaBaseUrl from "../constant-variable/qiita.ts"
import ZennBaseUrl from "../constant-variable/zenn.ts"
import { PrismaClient } from "../type/prisma/client.ts"

const main = async () => {
  const dbClient = new PrismaClient()

  await dbClient.$transaction(async (transaction) => {
    await transaction.rssPublisher.createMany({
      data: [
        { name: "Qiita", url: `${QiitaBaseUrl}/popular-items/feed.atom` },
        { name: "Zenn", url: `${ZennBaseUrl}/feed` }
      ],
      skipDuplicates: true
    })
  })
}

await main()
