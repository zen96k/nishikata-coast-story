import { DateTime as luxon } from "luxon"
import type { Prisma } from "~~/type/prisma/client"
import { PrismaClient } from "~~/type/prisma/client"

export class ArticleManager {
  private client = new PrismaClient()

  public async findMany(transaction?: Prisma.TransactionClient) {
    const client = transaction || this.client

    const articles = (
      await client.article.findMany({ include: { rssPublisher: true } })
    ).map((article) => {
      return {
        id: article.id.toString(),
        publisherId: article.rssPublisherId.toString(),
        rssPublisher: { name: article.rssPublisher.name },
        title: article.title,
        link: article.link,
        author: article.author,
        summary: article.summary,
        publishedAt:
          luxon.fromJSDate(article.publishedAt).toUTC().toISO() ?? "",
        createdAt: luxon.fromJSDate(article.createdAt).toUTC().toISO() ?? "",
        updatedAt: luxon.fromJSDate(article.updatedAt).toUTC().toISO() ?? ""
      }
    })

    return articles
  }
}
