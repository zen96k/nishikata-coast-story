import { DateTime as luxon } from "luxon"
import { PrismaClient } from "../../type/prisma/client.ts"
import RssParser from "./rss-parser.ts"

class Article {
  private rssParser: RssParser
  private dbClient: PrismaClient

  public constructor(rssParser: RssParser, dbClient: PrismaClient) {
    this.rssParser = rssParser
    this.dbClient = dbClient
  }

  public async createOrUpdateByRss() {
    await this.dbClient.$transaction(async (transaction) => {
      const rssPublishers = await transaction.rssPublisher.findMany()
      const popularArticleLabel =
        await transaction.articleLabel.findUniqueOrThrow({
          where: { value: "popular" }
        })

      const articles = (
        await Promise.all(
          rssPublishers.map(async (rssPublisher) => {
            const { items: items } = await this.rssParser.parseUrl(
              rssPublisher.url
            )

            const articles = (
              await Promise.all(
                items.map(async (item) => {
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

                  return void 0
                })
              )
            ).filter((article) => article !== undefined)

            return articles
          })
        )
      ).flatMap((article) => article)

      await Promise.all(
        articles.map(async (article) => {
          const upsertedArticle = await transaction.article.upsert({
            where: { link: article.link },
            update: { title: article.title },
            create: article
          })

          await transaction.articleLabelRelation.upsert({
            where: {
              articleId_articleLabelId: {
                articleId: upsertedArticle.id,
                articleLabelId: popularArticleLabel.id
              }
            },
            update: {},
            create: {
              articleId: upsertedArticle.id,
              articleLabelId: popularArticleLabel.id
            }
          })

          return void 0
        })
      )
    })
  }
}

export default Article
