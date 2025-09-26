import { Prisma, Publisher } from "../../../db/generated/prisma/index.js"
import { QiitaRSSParser } from "../rss-parser/QiitaRSSParser.ts"
export class ArticleManager {
  private qiitaParser = new QiitaRSSParser()

  public async createOrUpdateQiitaArticlesByRss(
    url: string,
    transaction: Prisma.TransactionClient
  ) {
    const existingArticles = []
    const insertingArticles = []
    const feed = await this.qiitaParser.parseUrl(url)

    for (const item of feed.items) {
      const url = new URL(item.link)
      const id = url.pathname.split("/").pop()

      if (!id) {
        throw new Error("記事IDを取得できません")
      }

      const existingArticle = await transaction.article.findUnique({
        where: {
          uq_article_publisher_publisher_article_id: {
            publisher: "Qiita",
            publisherArticleId: id
          }
        }
      })

      if (existingArticle && existingArticle.updated < new Date(item.updated)) {
        existingArticles.push({
          id: existingArticle.id,
          title: item.title,
          updated: item.updated
        })
      } else {
        insertingArticles.push({
          publisher: "Qiita" as Publisher,
          publisherArticleId: id,
          title: item.title,
          link: item.link,
          author: item.author,
          published: new Date(item.published),
          updated: new Date(item.updated)
        })
      }
    }

    for (const article of existingArticles) {
      await transaction.article.update({
        where: { id: article.id },
        data: { title: article.title, updated: article.updated }
      })
    }
    if (insertingArticles.length > 0) {
      await transaction.article.createMany({
        data: insertingArticles,
        skipDuplicates: true
      })
    }
  }
}
