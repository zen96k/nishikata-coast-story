import { DateTime as luxon } from "luxon"
import { afterEach, beforeEach, describe, expect, test, vitest } from "vitest"
import ArticleDao from "../../../app/module/article-dao.ts"
import RssParser from "../../../app/module/rss-parser.ts"
import QiitaBaseUrl from "../../../constant-variable/qiita.ts"
import ZennBaseUrl from "../../../constant-variable/zenn.ts"
import dbClient from "../../helper/db-client.ts"
import resetDb from "../../helper/reset-db.ts"

const rssParser = new RssParser()
const articleDao = new ArticleDao(rssParser, dbClient)

describe("ArticleDao", () => {
  describe("createOrUpdateByRss", () => {
    beforeEach(async () => {
      await resetDb()
    })

    afterEach(() => {
      vitest.restoreAllMocks()
    })

    test("Publisherが存在しない場合", async () => {
      await articleDao.createOrUpdateByRss()

      const articles = await dbClient.article.findMany({
        include: { rssPublisher: true }
      })

      expect(articles).toStrictEqual([])
    })

    test("Publisherが存在する場合", async () => {
      await dbClient.rssPublisher.create({ data: { url: "", name: "" } })

      const qiitaItem = {
        title: "Qiitaの記事",
        link: `${QiitaBaseUrl}/XXX/items/YYY`,
        author: "XXX",
        creator: "XXX",
        pubDate: "2025-10-01T09:00:00+09:00"
      }
      const zennItem = {
        title: "Zennの記事",
        link: `${ZennBaseUrl}/XXX/articles/YYY`,
        author: undefined,
        creator: "XXX",
        pubDate: "Wed, 01 Oct 2025 00:00:00 GMT"
      }
      vitest
        .spyOn(rssParser, "parseUrl")
        .mockResolvedValue({ items: [qiitaItem, zennItem] })

      await articleDao.createOrUpdateByRss()

      const qiitaArticle = await dbClient.article.findUniqueOrThrow({
        where: { link: qiitaItem.link },
        include: { rssPublisher: true }
      })
      expect(qiitaArticle.title).toBe(qiitaItem.title)
      expect(qiitaArticle.link).toBe(qiitaItem.link)
      expect(qiitaArticle.author).toBe(qiitaItem.author)
      expect(qiitaArticle.publishedAt).toStrictEqual(
        luxon.fromISO(qiitaItem.pubDate).toUTC().toJSDate()
      )

      const zennArticle = await dbClient.article.findUniqueOrThrow({
        where: { link: zennItem.link },
        include: { rssPublisher: true }
      })
      expect(zennArticle.title).toBe(zennItem.title)
      expect(zennArticle.link).toBe(zennItem.link)
      expect(zennArticle.author).toBe(zennItem.creator)
      expect(zennArticle.publishedAt).toStrictEqual(
        luxon.fromRFC2822(zennItem.pubDate).toUTC().toJSDate()
      )
    })
  })
})
