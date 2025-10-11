import { DateTime as luxon } from "luxon"
import { PrismaClient } from "../../type/prisma/client.ts"
import { RssParser } from "./RssParser.ts"

export class ArticleManager {
  private client: PrismaClient
  private parser: RssParser

  public constructor(client: PrismaClient) {
    this.client = client
    this.parser = new RssParser()
  }

  public async createOrUpdateByRss() {
    await this.client.$transaction(async (transaction) => {
      const publishers = await transaction.rssPublisher.findMany()

      const articles = (
        await Promise.all(
          publishers.map(async (publisher) => {
            const { items: items } = await this.parser.parseUrl(publisher.url)
            const articles = await Promise.all(
              items.map((item) => {
                const isIso8601 = luxon.fromISO(item.pubDate).isValid

                return {
                  rssPublisherId: publisher.id,
                  title: item.title,
                  link: item.link,
                  author: item.author || item.creator,
                  publishedAt: isIso8601
                    ? luxon.fromISO(item.pubDate).toUTC().toJSDate()
                    : luxon.fromRFC2822(item.pubDate).toUTC().toJSDate()
                }
              })
            )

            return articles
          })
        )
      ).flatMap((articles) => articles)

      await Promise.all(
        articles.map((article) => {
          return transaction.article.upsert({
            where: { link: article.link },
            update: { title: article.title },
            create: article
          })
        })
      )
    })
  }
}
