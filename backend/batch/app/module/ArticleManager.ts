import { DateTime as luxon } from "luxon"
import { Prisma, PrismaClient } from "../../type/prisma/client.ts"
import { RssParser } from "./RssParser.ts"

export class ArticleManager {
  private client = new PrismaClient()
  private parser = new RssParser()

  public async createOrUpdateByRss(transaction?: Prisma.TransactionClient) {
    const client = transaction || this.client

    const publishers = await client.rssPublisher.findMany()
    const articles = (
      await Promise.all(
        publishers.map(async (publisher) => {
          const { items: items } = await this.parser.parseUrl(publisher.url)
          const articles = items.map((item) => {
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

          return articles
        })
      )
    ).flatMap((articles) => articles)

    for (const article of articles) {
      await client.article.upsert({
        where: { link: article.link },
        update: { title: article.title },
        create: article
      })
    }
  }
}
