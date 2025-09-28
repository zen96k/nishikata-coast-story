import { DateTime as luxon } from "luxon"
import { Prisma, PrismaClient, Publisher } from "../../type/prisma/client.ts"
import { QiitaRSSParser } from "../rss-parser/QiitaRSSParser.ts"

export class ArticleManager {
  private client = new PrismaClient()
  private qiitaParser = new QiitaRSSParser()

  public async createOrUpdateQiitaByRss(
    url: string,
    transaction?: Prisma.TransactionClient
  ) {
    const client = transaction || this.client

    const existingArticles = []
    const insertingArticles = []
    const feed = await this.qiitaParser.parseUrl(url)

    for (const item of feed.items) {
      const url = new URL(item.link)
      const id = url.pathname.split("/").pop()

      if (!id) {
        throw new Error("記事IDを取得できません")
      }

      const existingArticle = await client.article.findUnique({
        where: {
          uq_article_publisher_publisher_article_id: {
            publisher: "Qiita",
            publisherArticleId: id
          }
        }
      })

      if (
        existingArticle &&
        luxon.fromJSDate(existingArticle.updated).toUTC() <
          luxon.fromISO(item.updated).toUTC()
      ) {
        existingArticles.push({
          id: existingArticle.id,
          title: item.title,
          updated: luxon.fromISO(item.updated).toUTC().toJSDate()
        })
      } else {
        insertingArticles.push({
          publisher: "Qiita" as Publisher,
          publisherArticleId: id,
          title: item.title,
          link: item.link,
          author: item.author,
          published: luxon.fromISO(item.published).toUTC().toJSDate(),
          updated: luxon.fromISO(item.updated).toUTC().toJSDate()
        })
      }
    }

    for (const article of existingArticles) {
      await client.article.update({
        where: { id: article.id },
        data: { title: article.title, updated: article.updated }
      })
    }
    if (insertingArticles.length > 0) {
      await client.article.createMany({
        data: insertingArticles,
        skipDuplicates: true
      })
    }
  }
}
