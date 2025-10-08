import { PrismaClient } from "../type/prisma/client.ts"

const main = async () => {
  const client = new PrismaClient()

  await client.rssPublisher.createMany({
    data: [
      { name: "Qiita", url: "https://qiita.com/popular-items/feed.atom" },
      { name: "Zenn", url: "https://zenn.dev/feed" }
    ],
    skipDuplicates: true
  })
}

await main()
