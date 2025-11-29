import { DateTime as luxon } from "luxon"
import ZennBaseUrl from "../../constant-variable/zenn.ts"
import { PrismaClient } from "../../type/prisma/client.ts"
import QiitaApi from "./qiita-api.ts"
import RssParser from "./rss-parser.ts"
import ZennApi from "./zenn-api.ts"

class Article {
  private rssParser: RssParser
  private dbClient: PrismaClient

  public constructor(rssParser: RssParser, dbClient: PrismaClient) {
    this.rssParser = rssParser
    this.dbClient = dbClient
  }

  public async createOrUpdateWithApi() {
    const qiitaItems = await this.fetchQiitaItem()
    const zennItems = await this.fetchZennArticle()

    const qiitaArticles = await Promise.all(
      qiitaItems.map(async (item) => {
        return {
          title: item.title,
          link: item.url,
          author: item.user.id,
          publishedAt: luxon.fromISO(item.created_at).toUTC().toJSDate()
        }
      })
    )
    const zennArticles = await Promise.all(
      zennItems.map(async (item) => {
        return {
          title: item.title,
          link: `${ZennBaseUrl}${item.path}`,
          author: item.user.name,
          publishedAt: luxon.fromISO(item.published_at).toUTC().toJSDate()
        }
      })
    )

    const articles = [...qiitaArticles, ...zennArticles]

    await this.dbClient.$transaction(async (transaction) => {
      const newArticleLabel = await transaction.articleLabel.findUniqueOrThrow({
        where: { value: "new" }
      })

      await Promise.all(
        articles.map(async (article) => {
          const upsertedArticle = await transaction.article.upsert({
            where: { link: article.link },
            update: {
              title: article.title,
              author: article.author,
              publishedAt: article.publishedAt
            },
            create: article
          })

          await transaction.articleLabelRelation.upsert({
            where: {
              articleId_articleLabelId: {
                articleId: upsertedArticle.id,
                articleLabelId: newArticleLabel.id
              }
            },
            update: {},
            create: {
              articleId: upsertedArticle.id,
              articleLabelId: newArticleLabel.id
            }
          })

          return void 0
        })
      )
    })
  }

  public async createOrUpdateWithRss() {
    await this.dbClient.$transaction(async (transaction) => {
      const popularArticleLabel =
        await transaction.articleLabel.findUniqueOrThrow({
          where: { value: "popular" }
        })
      const rssPublishers = await transaction.rssPublisher.findMany()

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
                    const url = new URL(link)

                    return {
                      title: title,
                      link: url.origin + url.pathname,
                      author: author,
                      publishedAt: luxon.fromISO(pubDate).toUTC().toJSDate()
                    }
                  }

                  const zennPattern =
                    !!title && !!link && !!creator && !!pubDate
                  if (zennPattern) {
                    return {
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
            update: {
              title: article.title,
              author: article.author,
              publishedAt: article.publishedAt
            },
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

  private async fetchQiitaItem() {
    const maxPage = 100
    const maxPerPage = 100
    const query = "tag:個人開発"

    const qiitaApi = new QiitaApi()
    const qiitaArticles = []
    for (let page = 1; page <= maxPage; page++) {
      const qiitaItems = await qiitaApi.fetchItem(page, maxPerPage, query)
      qiitaArticles.push(...qiitaItems)

      if (qiitaItems.length < maxPerPage) {
        break
      }
    }

    return qiitaArticles
  }

  private async fetchZennArticle() {
    const maxCount = 100
    const topic = "個人開発"

    const zennApi = new ZennApi()
    let page = 1
    const zennArticles = []
    while (true) {
      const { articles: zennItems, next_page: nextPage } =
        await zennApi.fetchArticle(page, maxCount, topic)
      zennArticles.push(...zennItems)

      if (nextPage) {
        page = nextPage
      } else {
        break
      }
    }

    return zennArticles
  }
}

export default Article
