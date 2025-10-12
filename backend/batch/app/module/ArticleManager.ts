import { DateTime as luxon } from "luxon"
import { PrismaClient } from "../../type/prisma/client.ts"
import { RssParser } from "./RssParser.ts"

export class ArticleManager {
  private rssParser: RssParser
  private dbClient: PrismaClient

  public constructor(rssParser: RssParser, dbClient: PrismaClient) {
    this.rssParser = rssParser
    this.dbClient = dbClient
  }

  public async createOrUpdateByRss() {
    await this.dbClient.$transaction(async (transaction) => {
      const rssPublishers = await transaction.rssPublisher.findMany()

      const articles = (
        await Promise.all(
          rssPublishers.map(async (rssPublisher) => {
            const { items: items } = await this.rssParser.parseUrl(
              rssPublisher.url
            )
            const articles = (
              await Promise.all(
                items.map((item) => {
                  const {
                    title: title,
                    link: link,
                    author: author,
                    creator: creator,
                    pubDate: pubDate
                  } = item

                  const qiitaPattern =
                    !!title && !!link && !!author && !!pubDate
                  if (qiitaPattern) {
                    return {
                      rssPublisherId: rssPublisher.id,
                      title: title,
                      link: link,
                      author: author,
                      publishedAt: luxon.fromISO(pubDate).toUTC().toJSDate()
                    }
                  }

                  const zennPattern =
                    !!title && !!link && !!creator && !!pubDate
                  if (zennPattern) {
                    return {
                      rssPublisherId: rssPublisher.id,
                      title: title,
                      link: link,
                      author: creator,
                      publishedAt: luxon.fromRFC2822(pubDate).toUTC().toJSDate()
                    }
                  }
                })
              )
            ).filter((article) => article !== undefined)

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
